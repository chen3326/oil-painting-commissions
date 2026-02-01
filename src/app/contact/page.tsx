import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Contact | Oil Painting Commissions",
  description: "Get in touch to start your custom oil painting commission",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">Get in Touch</h1>
        <p className="mt-4 text-muted-foreground">
          Ready to start your commission? Have questions about the process?
          I&apos;d love to hear from you.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Reach out via email to discuss your commission
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium">Email</h3>
              <p className="mt-1 text-muted-foreground">
                <a
                  href="mailto:hello@example.com"
                  className="text-primary hover:underline"
                >
                  hello@example.com
                </a>
              </p>
            </div>
            <div>
              <h3 className="font-medium">Response Time</h3>
              <p className="mt-1 text-muted-foreground">
                I typically respond within 24-48 hours.
              </p>
            </div>
            <div>
              <h3 className="font-medium">What to Include</h3>
              <ul className="mt-2 list-inside list-disc text-muted-foreground">
                <li>Reference photos (if available)</li>
                <li>Desired size and style</li>
                <li>Any specific details or requirements</li>
                <li>Your timeline</li>
              </ul>
            </div>
            <Button className="w-full" asChild>
              <a href="mailto:hello@example.com">Send an Email</a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <section className="mx-auto mt-24 max-w-2xl">
        <h2 className="text-center text-3xl font-bold tracking-tight">
          Frequently Asked Questions
        </h2>
        <div className="mt-12 space-y-8">
          {[
            {
              question: "How long does a commission take?",
              answer:
                "Most commissions take 4-8 weeks depending on size and complexity. Rush orders may be available for an additional fee.",
            },
            {
              question: "What is your revision policy?",
              answer:
                "I provide progress updates throughout the painting process. Minor adjustments can be made during creation. Major changes after completion may incur additional fees.",
            },
            {
              question: "Do you ship internationally?",
              answer:
                "Yes, I ship worldwide. International shipping costs vary by destination and will be quoted separately.",
            },
            {
              question: "What payment methods do you accept?",
              answer:
                "I accept payment via bank transfer, PayPal, or check. A 50% deposit is required to begin work, with the balance due before shipping.",
            },
          ].map((faq, index) => (
            <div key={index}>
              <h3 className="font-semibold">{faq.question}</h3>
              <p className="mt-2 text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
