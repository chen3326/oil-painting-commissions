import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Gallery | Oil Painting Commissions",
  description: "Browse our collection of custom oil paintings",
};

export default function GalleryPage() {
  // Placeholder data - replace with actual gallery items
  const paintings = [
    { id: 1, title: "Portrait Commission", medium: "Oil on canvas", year: "2024" },
    { id: 2, title: "Landscape Study", medium: "Oil on canvas", year: "2024" },
    { id: 3, title: "Pet Portrait", medium: "Oil on panel", year: "2024" },
    { id: 4, title: "Family Portrait", medium: "Oil on canvas", year: "2023" },
    { id: 5, title: "Still Life", medium: "Oil on canvas", year: "2023" },
    { id: 6, title: "Abstract Composition", medium: "Oil on canvas", year: "2023" },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Gallery</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Explore a collection of completed commissions and personal works.
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {paintings.map((painting) => (
          <Card key={painting.id} className="overflow-hidden">
            <div className="aspect-[4/3] bg-muted" />
            <CardHeader>
              <CardTitle>{painting.title}</CardTitle>
              <CardDescription>
                {painting.medium}, {painting.year}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
