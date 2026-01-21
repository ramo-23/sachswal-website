import PageContainer from "../../src/components/PageContainer/PageContainer";
import GalleryClient from "../../src/components/Gallery/GalleryClient";

export default function GalleryPage() {
  return (
    <main className="bg-white text-gray-900">
      <PageContainer>
        <section className="py-8">
          <GalleryClient />
        </section>
      </PageContainer>
    </main>
  );
}
