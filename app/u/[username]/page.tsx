import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { PortfolioRenderer } from "@/components/PortfolioRenderer";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  
  const portfolio = await prisma.digitalPortfolio.findUnique({
    where: { slug: username }
  });

  if (!portfolio || !portfolio.isPublished) {
    return { title: "Portfolio Not Found" };
  }

  const data = portfolio.data as any;
  const profileName = data?.profile?.name || username;
  
  return {
    title: `${profileName} - Digital Portfolio`,
    description: data?.profile?.about || `Professional portfolio of ${profileName}`,
    robots: portfolio.isSearchable ? "index, follow" : "noindex, nofollow",
  };
}

export default async function PublicPortfolioPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  
  const portfolio = await prisma.digitalPortfolio.findUnique({
    where: { slug: username }
  });

  if (!portfolio || !portfolio.isPublished) {
    notFound();
  }

  return <PortfolioRenderer data={portfolio.data} />;
}
