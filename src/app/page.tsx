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
import { faqItems } from "@/data/faq";

const CONTACT_EMAIL = "hello@anthonydunnatelier.com";

const galleryItems: { src: string; footnote?: string }[] = [
  { src: "/gallery/b1.jpg", footnote: "Old Masters\u2019 indirect painting method with multi-layered transparent glazes. Please inquire separately." },
  { src: "/gallery/b2.jpg" },
  { src: "/gallery/b3.jpg", footnote: "Old Masters\u2019 indirect painting method with multi-layered transparent glazes. Please inquire separately." },
  { src: "/gallery/b4.JPG" },
  { src: "/gallery/b5.jpg" },
  { src: "/gallery/b6.JPG" },
  { src: "/gallery/b7.jpg" },
  { src: "/gallery/b8.jpg" },
  { src: "/gallery/b9.JPG" },
  { src: "/gallery/b10.JPG" },
  { src: "/gallery/b11.jpg" },
  { src: "/gallery/b12.jpg" },
  { src: "/gallery/b13.jpg" },
  { src: "/gallery/b14.jpg" },
  { src: "/gallery/b15.jpg" },
  { src: "/gallery/b16.jpg" },
  { src: "/gallery/b17.jpg" },
  { src: "/gallery/b18.jpg" },
  { src: "/gallery/b19.jpg" },
  { src: "/gallery/b20.jpg" },
  { src: "/gallery/b21.jpg" },
  { src: "/gallery/b22.JPG" },
  { src: "/gallery/b23.JPG" },
  { src: "/gallery/b24.jpg" },
  { src: "/gallery/b25.jpg" },
  { src: "/gallery/b26.JPG" },
];


// Group gallery items into columns of 2 (vertical pairs)
const galleryColumns: { src: string; footnote?: string }[][] = [];
for (let i = 0; i < galleryItems.length; i += 2) {
  galleryColumns.push(galleryItems.slice(i, i + 2));
}

export default function Home() {
  return (
    <div>
      {/* Gallery Section */}
      <section className="py-16">
        <Carousel opts={{ align: "start", loop: false, dragFree: true, containScroll: "trimSnaps" }} className="w-full">
          <CarouselContent className="-ml-14 py-8">
            <CarouselItem className="basis-0 min-w-8 pl-0" />
            {galleryColumns.map((pair, colIndex) => (
              <CarouselItem key={colIndex} className="basis-[38%] sm:basis-[25%] lg:basis-[18%] xl:basis-[14%] 2xl:basis-[11%] pl-14">
                <div className="flex flex-col gap-14">
                  {pair.map((item, imgIndex) => (
                    <div key={imgIndex}>
                      <div className="h-[250px] flex items-center justify-center">
                        <ImageViewer_Basic
                          imageUrl={item.src}
                          imageTitle={`Gallery painting ${colIndex * 2 + imgIndex + 1}`}
                        >
                          <Image
                            src={item.src}
                            alt={`Gallery painting ${colIndex * 2 + imgIndex + 1}`}
                            width={800}
                            height={600}
                            className="max-w-full max-h-[250px] w-auto h-auto object-contain transition-opacity hover:opacity-90"
                            sizes="33vw"
                          />
                        </ImageViewer_Basic>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 text-center italic h-[2.5rem]">{item.footnote ?? "\u00A0"}</p>
                    </div>
                  ))}
                </div>
              </CarouselItem>
            ))}
            <CarouselItem className="basis-0 min-w-8 pl-0" />
          </CarouselContent>
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
