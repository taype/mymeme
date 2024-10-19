"use client";

import { useState } from "react";
import { IKImage, IKUpload } from "imagekitio-next";
import { Button } from "@/components/ui/button";
import { urlEndpoint } from "./providers";


export default function Home() {
  const [name, setName] = useState<string | null>(null);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-center text-4xl sm:text-6xl font-bold">
        Welcome to My Meme Generator
      </h1>
      <h1 className="text-center text-4xl font-bold">
        ImageKit Next.js quick start
      </h1>
      <Button variant={"destructive"}>Click me</Button>
        <div>
          <h2>File upload</h2>
          <IKUpload
            fileName="test-upload.png"
            onError={(error) => {
              console.log("Error", error);
            }}
            onSuccess={(response) => {
              console.log("Success", response);
              setName(response.filePath);
            }}
          />
        </div>
      {/* <img src="https://ik.imagekit.io/mymemeimages/default-image.jpg?tr:w-300,h-300,l-text,i-hello,l-end" /> */}
      {name && (
        <IKImage
          urlEndpoint={urlEndpoint}
          path={name}
          width={300}
          height={300}
          alt="Alt text"
        />
      )}
    </div>
  );
}
