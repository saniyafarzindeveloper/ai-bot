import Image from "next/image";
import { rings } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

// The props are being destructured. 
// Destructuring is a JavaScript/TypeScript feature that allows you to unpack values from objects or arrays into individual variables.
// Object Destructuring: This works when props is an object. In React, 
// the props object is automatically passed to functional components.
export default function Avatar({seed, className} : {seed: string, className?: string}) {
    const avatar = createAvatar(rings, {
        seed,
        // ... other options
      });
      const svg = avatar.toString(); //converting to string
      const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString(
        "base64"
      )}` //converting svg to base64 image 
    return (
    
   <Image src={dataUrl} alt="user avatar" width={100} height={100} className={className}/>
  )
}
