import Feed from "@/components/Feed";
import News from "@/components/News";
import SideBar from "@/components/SideBar";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {

  const user = await currentUser();
  if (!user) {
    return <div>loading...</div>;
  }

  return (
    <div className="pt-20">
      <div className="max-w-6xl mx-auto flex justify-between gap-8">
        {/* Sidebar */}
        <SideBar  user={user}/>

        {/* Feed */}
        <Feed user={user}/>
        
        {/* News */}
        <News/>

      </div> 
    </div>
  );
}
