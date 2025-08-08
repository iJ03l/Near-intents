import Layout from "../components/Layout";
import { useRouter } from 'next/router';

const sectionTitles: Record<string, string> = {
  "get-started": "Getting Started",
  "core-concepts": "Core Concepts",
  "smart-contracts": "Smart Contracts",
  "rest-web-apis": "REST & Web APIs",
  "tutorials": "Tutorials & Recipes",
  "security": "Security",
  "operations": "Operations",
  "reference": "Reference",
};

export default function SectionPage() {
  const router = useRouter();
  const { section } = router.query;
  return (
    <Layout>
      <h1 className="font-extrabold text-3xl mb-4">{sectionTitles[section as string] || "Section"}</h1>
      {/* Placeholder: You’ll fill with actual content/documentation */}
      <p>Content for <b>{sectionTitles[section as string]}</b> goes here!</p>
    </Layout>
  );
}
