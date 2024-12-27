import Link from "next/link";
import Avatar from "./Avatar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
   <header className="bg-white shadow-sm text-gray-800 flex justify-between p-5">
    <Link href='/' className="flex items-center text-4xl font-thin">
    {/* AVATAR */}
    <Avatar seed="support agent" className=""/>
    <div className="space-y-1">
    <h1>Assistly</h1>
    <h2 className="text-sm">Your cutomiseable chat bot</h2>
    </div>
    </Link>

    {/* auth section */}
    <div className="flex items-center">
   <SignedIn>
    <UserButton showName />
   </SignedIn>

   <SignedOut>
    <SignInButton />
   </SignedOut>
    </div>
   </header>
  )
}
