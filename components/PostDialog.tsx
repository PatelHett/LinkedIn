import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProfilePhoto from "./shared/ProfilePhoto";
import { Textarea } from "./ui/textarea";
import { Images } from "lucide-react";
import { useRef, useState } from "react";
import { readFileAsDataURL } from "@/lib/utils";
import Image from "next/image";
import { createPostAction } from "@/lib/serverActions";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";

export function PostDialog({
  setOpen,
  open,
  src,
}: {
  setOpen: any;
  open: boolean;
  src: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const changeHandler = (e: any) => {
    setInputText(e.target.value);
  };

  const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await readFileAsDataURL(file);
      setSelectedFile(dataUrl);
    }
  };

  const postActionHandler = async (formdata: FormData) => {
    setError(null);
    try {
      await createPostAction(inputText, selectedFile);
      setInputText("");
      setSelectedFile("");
      setOpen(false); // Close the dialog after a successful post
    } catch (error) {
      console.error("Error creating post:", error);
      setError("Failed to create post. Please try again.");
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle className="flex gap-2">
            <ProfilePhoto src={src} />
            <div>
              <h1>Patel Stack</h1>
              <p className="text-xs">Post to Anyone</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <form
          action={(formdata) => {
            const promisee = postActionHandler(formdata);
            toast.promise(promisee, {
              loading: "Posting...",
              position: "top-right",
              success: "Post created successfully",
              error: "Failed to create post. Please try again.",
            });
          }}
        >
          <div className="flex flex-col">
            <Textarea
              id="name"
              name="inputText"
              onChange={changeHandler}
              value={inputText}
              className="border-none text-lg focus-visible:ring-0"
              placeholder="Type your message here."
            />
            <div className="my-4">
              {selectedFile && (
                <Image
                  src={selectedFile}
                  alt="Preview-image"
                  width={400}
                  height={200}
                  className="m-auto"
                />
              )}
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <DialogFooter>
            <div className="flex items-center gap-4">
              <input
                ref={inputRef}
                onChange={fileChangeHandler}
                type="file"
                name="image"
                className="hidden"
                accept="image/*"
              />
              <Button type="submit">Post</Button>
            </div>
          </DialogFooter>
        </form>
        <Button className="gap-2" onClick={() => inputRef?.current?.click()}>
          <Images className="text-blue-500" />
          <p className="ml-1">Media</p>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
