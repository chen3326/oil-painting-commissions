"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { InquiryDialog } from "@/components/InquiryDialog";
import ImageViewer_Basic from "@/components/commerce-ui/image-viewer-basic";

const CONTACT_EMAIL = "hello@anthonydunnatelier.com";

const galleryItems = [
  "/gallery/1.jpg",
  "/gallery/2.jpg",
  "/gallery/3.jpg",
  "/gallery/4.jpg",
  "/gallery/6.JPG",
  "/gallery/7 .jpg",
  "/gallery/8.jpg",
  "/gallery/9.jpg",
  "/gallery/10.jpg",
  "/gallery/11.JPG",
  "/gallery/12.jpg",
  "/gallery/13.jpg",
  "/gallery/14.JPG",
  "/gallery/15.jpg",
  "/gallery/16.jpg",
  "/gallery/17.jpg",
  "/gallery/18.JPG",
  "/gallery/19.JPG",
  "/gallery/20.jpg",
  "/gallery/21.jpg",
  "/gallery/22.JPG",
  "/gallery/23.JPG",
  "/gallery/24.JPG",
  "/gallery/25.JPG",
];

const faqItems: { question: string; answer: React.ReactNode }[] = [
  {
    question: "What is the commission process like?",
    answer: (
      <>
        <p className="mb-4">
          It begins with a conversation. Send me your inquiry—ideally with the
          details outlined in &quot;What do you need from me to get
          started?&quot;—and I will reply with a quote. If anything is missing,
          I will reach out for additional details.
        </p>
        <p className="mb-4">
          A 20% deposit is required to begin work after I gather all the details
          from you. I will then provide a preliminary draft for your review. At
          this stage, significant changes can still be made, and I welcome your
          input. Once the direction is confirmed, I proceed with the final
          painting. For larger or more complex works, I will share progress
          images along the way.
        </p>
        <p>
          When the painting is complete, the remaining balance is due. Then
          shipping will be arranged.
        </p>
      </>
    ),
  },
  {
    question: "How long does a commission take, and how much does it cost?",
    answer: (
      <>
        <p className="mb-4">
          For most paintings, it takes 2–6 weeks to complete the work. Shipping
          can take up to an additional week.
        </p>
        <p className="mb-4">
          Timeline and pricing depend on size and complexity. Below is a general
          guide:
        </p>
        <table className="w-full mb-4 text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 pr-4">Size</th>
              <th className="text-left py-2 pr-4">Dimensions</th>
              <th className="text-left py-2 pr-4">Typical Timeline</th>
              <th className="text-left py-2">Starting At</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 pr-4">Intimate</td>
              <td className="py-2 pr-4">12&quot; x 16&quot;</td>
              <td className="py-2 pr-4">2–4 weeks</td>
              <td className="py-2">$1,200</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4">Classic</td>
              <td className="py-2 pr-4">18&quot; x 24&quot;</td>
              <td className="py-2 pr-4">2–4 weeks</td>
              <td className="py-2">$3,000</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4">Statement</td>
              <td className="py-2 pr-4">30&quot; x 40&quot;</td>
              <td className="py-2 pr-4">4–6 weeks</td>
              <td className="py-2">$12,000</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">Grand</td>
              <td className="py-2 pr-4">48&quot; x 60&quot;+</td>
              <td className="py-2 pr-4">6+ weeks</td>
              <td className="py-2">$30,000+</td>
            </tr>
          </tbody>
        </table>
        <p className="mb-4">
          Custom dimensions within any size category can be accommodated.
        </p>
        <p className="mb-4">
          <strong>Choosing a size:</strong> For pets or lighthearted portraits,
          most clients find the Intimate size perfectly suited—a piece that can
          rest on a table or fit comfortably in a study. For serious portraits
          or compositions with multiple subjects, a minimum of Classic is
          required to allow sufficient space for detail.
        </p>
        <p className="mb-4">
          The Statement and Grand sizes are designed for psychological impact
          and the greatest level of detail. When displayed in a well-chosen
          location with proper lighting, these pieces command everyone for close
          admiration.
        </p>
        <p className="mb-4">
          If displayed prominently in its dedicated space, use lighting with
          appropriate color temperature and a high color rendering index to
          allow the colors of the painting to be shown faithfully. I have
          experience with museum lighting solutions and am happy to advise if
          you wish to display such a piece properly but don&apos;t know where to
          start.
        </p>
        <p>
          Complexity affects both time and cost—a single portrait differs from a
          multi-figure composition. Contact me with your details for an accurate
          quote.
        </p>
      </>
    ),
  },
  {
    question: "What do you need from me to get started?",
    answer: (
      <>
        <p className="mb-4">
          To begin, please share a reference photo—this is what the painting
          will be based on. Multiple angles are helpful if available.
        </p>
        <p className="mb-4">
          Let me know the style you have in mind. If you admire a particular
          painting or artist, include it as a reference.
        </p>
        <p className="mb-4">
          Tell me the size you are considering and where the painting will be
          displayed.
        </p>
        <p className="mb-4">
          Finally, share the background and purpose of the piece—who is the
          subject, what the occasion is, and what you want the painting to
          convey.
        </p>
        <p>If you are unsure about any of the above, I am happy to advise.</p>
      </>
    ),
  },
  {
    question: "What subjects are accepted, and what subjects are not?",
    answer:
      "My passion is creating dignified portraits of people and animals that celebrate their lives. Many of my clients commission family portraits intended to be passed down as heirlooms. That said, I am skilled in most subjects. I do not accept commissions intended to satirize or mock the person being portrayed, regardless of whether they are a public figure. For animals, I paint most common subjects—cats, dogs, birds, horses—without issue. Exotic animals are evaluated on a case-by-case basis.",
  },
  {
    question: "Can you work from old or low-quality photos?",
    answer:
      "Yes. I have created pieces from old black-and-white family photos, and it is not an issue.",
  },
  {
    question: "Can the painting differ from my photo?",
    answer:
      "Absolutely. In fact, a photo is not strictly required for me to begin working. If you do provide a reference photo, I can adjust the subject, posture, lighting, background—nearly everything—based on your needs. For example, if you have separate photos of different people, I can combine them into a group portrait. This is not an issue.",
  },
  {
    question:
      "Can you match a specific style or replicate another artist's work?",
    answer:
      "I am able to paint in various styles. While I cannot replicate another artist's work exactly, I welcome references—if there is a piece you admire, please share it with me. I am often able to draw close to the style or settings you have in mind.",
  },
  {
    question: "Do you paint from life?",
    answer:
      "Yes, if you are located in Colorado. Please contact me at least one month in advance, and I may be able to accommodate a sitting.",
  },
  {
    question: "Can I expedite my commission?",
    answer:
      "If your commission is a gift and you have a specific date in mind, I will do my best to accommodate your timeline at no additional charge. However, please allow a minimum of two weeks even for simpler pieces—this is the nature of oil painting, which requires time for the paint to dry between layers. I do not deliver incomplete work under any circumstances.",
  },
  {
    question: "Do you offer framing?",
    answer:
      "Yes, a standard frame is included with your painting. If you would prefer a custom frame or need guidance selecting one, feel free to reach out.",
  },
  {
    question: "How is the painting delivered?",
    answer:
      "Paintings are delivered worldwide, framed and secured in a custom crate.",
  },
  {
    question: "How should I care for the painting?",
    answer:
      "Oil paintings are durable when cared for properly. The essentials: hang away from direct sunlight, heat sources, and moisture. Keep temperature and humidity stable. Dust occasionally with a soft, natural-hair brush—NEVER use water or household cleaners. Handle by the frame, not the canvas, and avoid touching the paint surface. If you ever notice flaking, discoloration, or damage, contact me or a professional conservator rather than attempting repairs yourself.",
  },
];

// Group gallery items into slides of 6 (2 rows × 3 columns)
const gallerySlides: string[][] = [];
for (let i = 0; i < galleryItems.length; i += 6) {
  gallerySlides.push(galleryItems.slice(i, i + 6));
}

export default function Home() {
  return (
    <div>
      {/* Gallery Section */}
      <section className="container mx-auto px-4 py-16">
        <Carousel className="w-full">
          <div className="flex justify-between mb-4 md:hidden">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
          <CarouselContent>
            {gallerySlides.map((slide, slideIndex) => (
              <CarouselItem key={slideIndex}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {slide.map((src, index) => (
                    <div key={index} className="overflow-hidden">
                      <ImageViewer_Basic
                        imageUrl={src}
                        imageTitle={`Gallery painting ${slideIndex * 6 + index + 1}`}
                      >
                        <Image
                          src={src}
                          alt={`Gallery painting ${slideIndex * 6 + index + 1}`}
                          width={800}
                          height={600}
                          className="w-full h-auto transition-opacity hover:opacity-90"
                          sizes="(max-width: 640px) 50vw, 33vw"
                        />
                      </ImageViewer_Basic>
                    </div>
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <InquiryDialog />
        <p className="text-sm text-muted-foreground mt-4">
          *Currently accepting commissions for February and March 2026.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {faqItems.map((item, index) => (
              <Accordion key={index} type="single" collapsible>
                <AccordionItem value={`item-${index}`} className="border-b-0">
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="text-sm text-muted-foreground mt-2">
            &copy; {new Date().getFullYear()} Anthony Dunn Atelier. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
