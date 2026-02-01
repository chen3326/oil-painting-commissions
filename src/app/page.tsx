import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Custom Oil Paintings
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Transform your cherished memories into timeless works of art.
          Each painting is carefully crafted with attention to detail and a passion for artistry.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" asChild>
            <Link href="/contact">Start Your Commission</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/gallery">View Gallery</Link>
          </Button>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="bg-muted/50 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Featured Work
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            A selection of recent commissions showcasing various styles and subjects.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-[4/3] bg-muted" />
                <CardHeader>
                  <CardTitle>Portrait Study {i}</CardTitle>
                  <CardDescription>Oil on canvas, 2024</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline" asChild>
              <Link href="/gallery">View All Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="text-center text-3xl font-bold tracking-tight">
          How It Works
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Consultation",
              description: "Share your vision and reference photos. We&apos;ll discuss size, style, and timeline.",
            },
            {
              step: "2",
              title: "Creation",
              description: "Watch your painting come to life with progress updates throughout the process.",
            },
            {
              step: "3",
              title: "Delivery",
              description: "Receive your finished artwork, carefully packaged and shipped to your door.",
            },
          ].map((item) => (
            <Card key={item.step} className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  {item.step}
                </div>
                <CardTitle className="mt-4">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/50 py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to Begin?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Let&apos;s create something beautiful together. Reach out to discuss your commission.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
