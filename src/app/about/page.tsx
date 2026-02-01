import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "About | Oil Painting Commissions",
  description: "Learn about the artist and the commission process",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Artist Bio Section */}
      <section className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">About the Artist</h1>
        <div className="mt-8 flex flex-col gap-8 md:flex-row">
          <div className="aspect-square w-full max-w-xs shrink-0 rounded-lg bg-muted" />
          <div>
            <p className="text-muted-foreground">
              With over a decade of experience in oil painting, I specialize in creating
              custom portraits and landscapes that capture the essence of my subjects.
              Each painting is crafted with traditional techniques passed down through
              generations of master painters.
            </p>
            <p className="mt-4 text-muted-foreground">
              My work has been exhibited in galleries across the region, and I&apos;ve had the
              privilege of creating meaningful pieces for collectors worldwide. I believe
              that every commission tells a unique story, and I&apos;m honored to be part of
              bringing those stories to life on canvas.
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="mt-24">
        <h2 className="text-center text-3xl font-bold tracking-tight">
          The Commission Process
        </h2>
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="space-y-8">
            {[
              {
                title: "Initial Consultation",
                description:
                  "We begin with a conversation about your vision. Share your reference photos, discuss the style you prefer, and choose the size of your canvas. This is where we establish the foundation for your piece.",
              },
              {
                title: "Proposal & Deposit",
                description:
                  "After our consultation, I&apos;ll provide a detailed proposal including timeline and pricing. A 50% deposit secures your spot in my commission queue.",
              },
              {
                title: "Creation Phase",
                description:
                  "I&apos;ll send you progress updates as your painting develops. This allows for feedback and ensures the final piece aligns with your expectations.",
              },
              {
                title: "Final Approval & Delivery",
                description:
                  "Once complete, I&apos;ll share high-resolution images for your approval. After the final payment, your painting will be carefully packaged and shipped to you.",
              },
            ].map((step, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">
                      {index + 1}
                    </span>
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="mt-24">
        <h2 className="text-center text-3xl font-bold tracking-tight">
          Pricing Guide
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Pricing varies based on size, complexity, and number of subjects.
          Below is a general guide to help you plan your commission.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              size: "Small",
              dimensions: "Up to 11x14\"",
              price: "Starting at $400",
            },
            {
              size: "Medium",
              dimensions: "16x20\" to 18x24\"",
              price: "Starting at $800",
            },
            {
              size: "Large",
              dimensions: "24x30\" and above",
              price: "Starting at $1,500",
            },
          ].map((tier) => (
            <Card key={tier.size} className="text-center">
              <CardHeader>
                <CardTitle>{tier.size}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{tier.dimensions}</p>
                <p className="mt-2 text-lg font-semibold">{tier.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
