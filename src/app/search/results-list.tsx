"use client";

import { IKImage } from "imagekitio-next";
import { FileObject } from "imagekit/dist/libs/interfaces";
import { urlEndpoint } from "../providers";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ResultsList({ files }: { files: FileObject[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4 mt-2">
      {Array.isArray(files) &&
        files.map((file) => (
          <Card key={file.fileId}>
            <CardHeader>
              <CardTitle>{file.customMetadata?.displayname ?? file.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <IKImage
                key={file.fileId}
                path={file.filePath}
                urlEndpoint={urlEndpoint}
                alt={file.name}
                width={300}
                height={300}
              />
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/customize/${file.fileId}`}>Customize</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}
