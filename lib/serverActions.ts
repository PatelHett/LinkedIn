"use server";

import { Post } from "@/models/post.model";
import { IUser, User } from "@/models/user.model";
import { currentUser } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "./db";
import { revalidatePath } from "next/cache";
import { Comment, IComment } from "@/models/comment.model";
import { NextRequest, NextResponse } from "next/server";
import { toast } from "sonner";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// creating post using server action
export const createPostAction = async (
  inputText: string,
  selectedFile: string
) => {
  await connectDB();

  const user = await currentUser();

  if (!user)
    throw new Error("User not Authenticated... Please Login to continue...");

  if (!inputText) throw new Error("Please enter some text to post...");

  const image = selectedFile;

  const userDatabase: IUser = {
    firstName: user.firstName || "Patel",
    lastName: user.lastName || "Stack",
    userId: user.id,
    profilePhoto: user.imageUrl,
  };

  let uploadResponse;

  try {
    if (image) {
      //1. create post with image
      uploadResponse = await cloudinary.uploader.upload(image);
      await Post.create({
        description: inputText,
        user: userDatabase,
        imageUrl: uploadResponse?.secure_url, // yaha pr image url from cloudinary
      });
    } else {
      //2. create post with text only
      await Post.create({
        description: inputText,
        user: userDatabase,
      });
    }
    revalidatePath("/"); // revalidate the home page
  } catch (error: any) {
    throw new Error(error);
  }
};

// Get all posts using server action
export const getAllPosts = async () => {
  await connectDB();
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "comments", options: { sort: { createdAt: -1 } } });
      if(!posts) return [];
    return JSON.parse(JSON.stringify(posts)); // Convert Mongoose documents to plain objects
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving posts");
  }
};

//delete post by id
export const deletePostAction = async (postId: string) => {
  await connectDB();
  const user = await currentUser();
  if (!user) throw new Error("User not authenticated...");

  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found...");

  //delete post only if the user is the owner of the post
  if (post.user.userId != user.id)
    throw new Error("You are not authorized to delete this post...");

  try {
    await Post.deleteOne({ _id: postId });
    revalidatePath("/");
  } catch (error) {
    throw new Error("Error deleting post...");
  }
};

//create comment Action
export const createCommentAction = async (postId: string, formData: FormData) => {
  try {
      const user = await currentUser();
      if (!user) throw new Error("User not authenticated");
      const inputText = formData.get('inputText') as string;
      if (!inputText) throw new Error("Field is required");
      if (!postId) throw new Error("Post id required");

      const userDatabase: IUser = {
          firstName: user.firstName || "Patel",
          lastName: user.lastName || "Mern Stack",
          userId: user.id,
          profilePhoto: user.imageUrl
      }
      const post = await Post.findById({ _id: postId });
      if (!post) throw new Error('Post not found');

      const comment = await Comment.create({
          textMessage: inputText,
          user: userDatabase,
      });

      if (post.comments) {
        post.comments.push(comment._id as unknown as IComment);
      } else {
        post.comments = [comment._id as unknown as IComment];
      }
      await post.save();

      revalidatePath("/");
  } catch (error) {
      throw new Error('An error occurred')
  }
}

// export default async function handler(email:string) {
//   await connectDB();

//   try {
//     const user = await User.findById({email:email});
//     console.log(user);
//     if (!user) {
//       toast.error('User not found');
//     }
//     NextResponse.json(user);
//   } catch (error) {
//     console.error(error);
//     toast.error('An error occurred');
//   }
// }