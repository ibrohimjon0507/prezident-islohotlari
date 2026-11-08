import Site from "@/components/site/Site";
import { PHOTO_SLOTS, photo } from "@/lib/content";
import { getContent } from "@/lib/store";

export default async function Home() {
  const c = await getContent();
  const photos = Object.fromEntries(PHOTO_SLOTS.map((s) => [s.key, photo(c, s.key)]));
  return <Site photos={photos} />;
}
