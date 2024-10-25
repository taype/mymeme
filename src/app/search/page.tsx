import ImageKit from "imagekit";
import { IKImage } from "imagekitio-next";
import { unstable_noStore } from "next/cache";
import { ResultsList } from "./results-list";
import { Button } from "@/components/ui/button";
import { UploadMemeButton } from "./upload-meme-button";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY ?? "",
  privateKey: process.env.PRIVATE_KEY ?? "",
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT ?? "",
});
export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  unstable_noStore();
  const files = await imagekit
    .listFiles({
      //searchQuery: `name:${searchParams.q}`,
      tags: searchParams.q
    })
    .catch((error) => {
      console.log(error);
    });
  return (
    <div className="container mx-auto space-y-8 py-8 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mt-2">Search Results</h1>
        <UploadMemeButton />
      </div>
      <ResultsList files={files ?? []} />
    </div>
  );
}
