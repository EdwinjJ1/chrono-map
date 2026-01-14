import { Metadata } from "next";
import { notFound } from "next/navigation";
import { locations, getLocationById } from "@/data/locations";
import LocationDetailClient from "./LocationDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return locations.map((location) => ({
    id: String(location.id),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const location = getLocationById(Number(id));

  if (!location) {
    return {
      title: "Location Not Found | Chrono-Map",
    };
  }

  return {
    title: `${location.name} | Chrono-Map Sydney`,
    description: location.description,
    openGraph: {
      title: `${location.name} - Sydney's Historical Heritage`,
      description: location.fullDescription,
      type: "article",
    },
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { id } = await params;
  const location = getLocationById(Number(id));

  if (!location) {
    notFound();
  }

  return <LocationDetailClient location={location} />;
}
