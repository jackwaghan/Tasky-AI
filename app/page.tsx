import Image from "next/image";
import Link from "next/link";
import Source from "../public/Tasky-AI-Image.png";
export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden ">
      <nav className="w-full bg-foreground/10 border-b border-foreground/20 p-4">
        <div className="w-full h-full flex justify-between items-center px-4">
          <div className="text-xl font-geist-mono text-orange-500">
            Tasky AI
          </div>
          <div className="flex gap-4">
            <Link href="/auth/login" legacyBehavior>
              <a className="text-foreground hover:text-orange-500 duration-300 ">
                Login
              </a>
            </Link>
            <Link href="/auth/signup" legacyBehavior>
              <a className="text-foreground hover:text-orange-500 duration-300">
                Sign Up
              </a>
            </Link>
          </div>
        </div>
      </nav>
      <div className="w-full pb-10  flex justify-center px-5">
        <div className="max-w-6xl text-pretty">
          <p className="text-2xl md:text-6xl font-bold mt-20 md:mt-20  font-geist-mono ">
            A Simple task management
          </p>
          <p className="text-2xl md:text-6xl font-bold  md:mt-10 font-geist-mono ">
            {" "}
            application with AI Powered
          </p>
        </div>
      </div>
      <div className=" mt-20 w-full flex justify-center items-center md:mt-20 px-5">
        <div className="md:p-2.5 p-2  border border-white/10 rounded-lg bg-white/15 w-full md:w-[85%]">
          <Image
            alt="Chatty AI Image source"
            src={Source}
            className="rounded-lg h-full"
          />
        </div>
      </div>
    </div>
  );
}
