import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryView from "@/components/site/CategoryView";
import { getContent } from "@/lib/store";

type P = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const c = await getContent();
  const k = c.categories.find((x) => x.slug === slug);
  return { title: k ? `${k.title} — Islohotdan natijaga` : "Boʻlim topilmadi" };
}

export default async function CategoryPage({ params }: P) {
  const { slug } = await params;
  const c = await getContent();
  const k = c.categories.find((x) => x.slug === slug);
  if (!k) notFound();
  return <CategoryView c={c} k={k} />;
}
