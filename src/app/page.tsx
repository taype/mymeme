"use client";

import React from "react";
import { ImageKitProvider, IKImage, IKUpload } from "imagekitio-next";
import { Button } from "@/components/ui/button";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (err) {
    const error = err as Error;
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

export default function Home() {
  const [filePath, setFilePath] = React.useState("");
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-center text-4xl sm:text-6xl font-bold">
        Welcome to My Meme Generator
      </h1>
      <h1 className="text-center text-4xl font-bold">
        ImageKit Next.js quick start
      </h1>
      <Button variant={"destructive"}>Click me</Button>
      <ImageKitProvider
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator}
      >
        <div>
          <h2>File upload</h2>
          <IKUpload
            fileName="test-upload.png"
            onError={(error) => {
              console.log("Error", error);
            }}
            onSuccess={(response) => {
              console.log("Success", response);
              setFilePath(response.filePath);
            }}
          />
        </div>
      </ImageKitProvider>
      {/* <img src="https://ik.imagekit.io/mymemeimages/default-image.jpg?tr:w-300,h-300,l-text,i-hello,l-end" /> */}
      {filePath && (
        <IKImage
          urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
          path={filePath}
          width={300}
          height={300}
          alt="Alt text"
        />
      )}
    </div>
  );
}
