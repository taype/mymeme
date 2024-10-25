"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IKImage, IKUpload } from "imagekitio-next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UploadMemeButton() {
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const route = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [isUpLoading, setIsUploading] = useState(false);
  const [tags, setTags] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Upload Base Meme</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload your meme image</DialogTitle>
          <DialogDescription>
            This is a meme image that will be used as a base for all memes.
          </DialogDescription>
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              setIsUploading(true);
              uploadInputRef.current?.click();
            }}
          >
            <div>
              <div className="mb-4">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  className="mt-2"
                  id="displayName"
                  name="displayName"
                  placeholder="Display Name"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  className="mt-2"
                  id="tags"
                  name="tags"
                  placeholder="a comma separated list of tags"
                  required
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
              <IKUpload
                fileName="test-upload.png"
                customMetadata={{
                  displayName,
                }}
                tags={[displayName, ...tags.split(",")]}
                onError={(error) => {
                  setIsUploading(false);
                  console.log("Error", error);
                }}
                onSuccess={(response) => {
                  setIsUploading(false);
                  route.push(`/customize/${response.fileId}`);
                  console.log("Success", response);
                }}
                style={{ display: "none" }}
                ref={uploadInputRef}
              />
            </div>
            <DialogFooter className="flex justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button disabled={isUpLoading} type="submit">
                {isUpLoading && <Spinner />}
                Select & Upload Image
              </Button>
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}
