import Site from "@/components/site/Site";
import { getContent } from "@/lib/store";

export default async function Home() {
  return <Site c={await getContent()} />;
}
