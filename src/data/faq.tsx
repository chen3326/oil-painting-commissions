import React from "react";

export const faqItems: { question: string; answer: React.ReactNode }[] = [
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
          If you prefer a shorter timeline, ready-made pieces are also available
          across a range of subjects and styles at a lower price point.
        </p>
        <p className="mb-4">
          Timeline and pricing depend on size, complexity, and technique. Below
          is a general guide:
        </p>
        <table className="w-full mb-4 text-base md:text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 pr-4">Size</th>
              <th className="text-left py-2 pr-4">Dimensions</th>
              <th className="text-left py-2 pr-4">Typical Timeline</th>
              <th className="text-left py-2">Estimate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="pt-2 pr-4">Classic</td>
              <td className="pt-2 pr-4">24&quot; × 36&quot;</td>
              <td className="pt-2 pr-4">2–4 weeks</td>
              <td className="pt-2">$3,000–$5,000</td>
            </tr>
            <tr className="border-b">
              <td colSpan={4} className="pb-2 text-sm text-muted-foreground">The standard size for wall-mounted pieces</td>
            </tr>
            <tr>
              <td className="pt-2 pr-4">Statement</td>
              <td className="pt-2 pr-4">36&quot; × 48&quot;</td>
              <td className="pt-2 pr-4">4–6 weeks</td>
              <td className="pt-2">$5,000–$12,000</td>
            </tr>
            <tr className="border-b">
              <td colSpan={4} className="pb-2 text-sm text-muted-foreground">A commanding presence for larger wall spaces</td>
            </tr>
            <tr>
              <td className="pt-2 pr-4">Grand</td>
              <td className="pt-2 pr-4">48&quot; × 64&quot;+</td>
              <td className="pt-2 pr-4">6+ weeks</td>
              <td className="pt-2">$8,000–$25,000</td>
            </tr>
            <tr className="border-b">
              <td colSpan={4} className="pb-2 text-sm text-muted-foreground">Gallery-scale works for grand interiors</td>
            </tr>
            <tr>
              <td className="pt-2 pr-4">Indirect technique</td>
              <td className="pt-2 pr-4">Any of the above</td>
              <td className="pt-2 pr-4">Varies</td>
              <td className="pt-2">3–5× the above</td>
            </tr>
            <tr>
              <td colSpan={4} className="pb-2 text-sm text-muted-foreground">Old Masters&apos; indirect painting method with multi-layered transparent glazes</td>
            </tr>
          </tbody>
        </table>
        <p className="mb-4">
          Custom dimensions within any size category can be accommodated.
        </p>
        <p className="mb-4">
          <strong>Choosing a size:</strong> For most paintings,
          clients find the Classic size perfectly suited—the standard for
          wall-mounted pieces. For compositions with multiple subjects, a
          larger size is recommended to allow sufficient space for detail.
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
          Complexity and technique both affect time and cost—a single-subject piece
          differs from a multi-figure composition, and the Old Masters&apos;
          indirect glazing method requires significantly more time and material.
          Contact me with your details for an accurate quote.
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
    question: "Are ready-made pieces available?",
    answer: (
      <>
        <p className="mb-4">
          Yes, I carry ready-made pieces across a wide range of subjects and
          styles. If you are interested, please inquire for available works.
        </p>
        <p>
          Even for ready-made pieces, please allow 1–2 weeks for delivery—each
          piece is removed from its current frame, fitted into a custom new
          frame, secured in a custom-built crate, and shipped with insurance.
        </p>
      </>
    ),
  },
  {
    question: "Can you work from old or low-quality photos?",
    answer:
      "Yes, I have done it before and it is not an issue. A high-quality reference photo is always preferred, but not required.",
  },
  {
    question: "Can the painting differ from my photo?",
    answer:
      "Absolutely. I can adjust the subject, posture, lighting, background—nearly everything—based on your needs. For example, if you have separate photos of different people, I can combine them into a single composition. This is not an issue.",
  },
  {
    question:
      "Can you match a specific style or replicate another artist's work?",
    answer:
      "I am able to paint in various styles. If there is a piece you admire, please share it with me—I am able to recreate it or draw close to the style and settings you have in mind.",
  },
  {
    question: "Do you paint from life?",
    answer:
      "Yes, if you are located in Colorado. Please contact me at least one month in advance, and I may be able to accommodate a sitting.",
  },
  {
    question: "Can I expedite my commission?",
    answer:
      "If your commission is a gift and you have a specific date in mind, I will do my best to accommodate your timeline at no additional charge. However, please allow a minimum of two weeks even for simpler and smaller pieces.",
  },
  {
    question: "Do you offer framing?",
    answer:
      "Yes, a standard frame is included with your painting. Once the piece is finished, custom framing options are also available at additional cost.",
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
