"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { faqItems } from "@/data/faq";

const pricingFaq = faqItems.find((item) =>
  item.question.includes("how much does it cost")
)!;

const STEPS = [
  {
    question: "What would you like painted?",
    key: "subject" as const,
    type: "radio" as const,
    options: [
      { value: "individual", label: "Individual portrait" },
      { value: "group", label: "Group or couple portrait" },
      { value: "pet", label: "Pet or animal" },
      { value: "landscape", label: "Landscape" },
      { value: "other", label: "Something else" },
    ],
  },
  {
    question: "Which size are you considering?",
    key: "size" as const,
    type: "radio" as const,
    options: [
      {
        value: "classic",
        label: 'Classic — 24" × 36"',
        description: "The standard size for wall-mounted pieces",
      },
      {
        value: "statement",
        label: 'Statement — 36" × 48"',
        description: "A commanding presence for larger wall spaces",
      },
      {
        value: "grand",
        label: 'Grand — 48" × 64" and above',
        description: "Gallery-scale works for grand interiors",
      },
      {
        value: "not-sure",
        label: "Not sure yet",
        description: "I'd like guidance on the right size",
      },
    ],
  },
  {
    question: "Do you have a budget range in mind?",
    key: "budget" as const,
    type: "radio" as const,
    options: [
      { value: "under-3k", label: "Under $3,000" },
      { value: "3k-10k", label: "$3,000 – $10,000" },
      { value: "10k-25k", label: "$10,000 – $25,000" },
      { value: "25k-plus", label: "$25,000+" },
      { value: "flexible", label: "Flexible / not sure yet" },
    ],
  },
  {
    question: "Tell me about the subject.",
    subtitle: "The occasion or purpose, any background that might help.",
    key: "description" as const,
    type: "textarea" as const,
  },
  {
    question: "Timeline?",
    key: "timeline" as const,
    type: "radio" as const,
    options: [
      { value: "no-rush", label: "No rush" },
      { value: "6-weeks", label: "Within 6 weeks" },
      { value: "specific-date", label: "For a specific date" },
      { value: "not-sure", label: "Not sure" },
    ],
  },
  {
    question: "Do you have a reference photo ready?",
    key: "reference" as const,
    type: "radio" as const,
    options: [
      { value: "yes", label: "Yes, I have one ready" },
      { value: "soon", label: "I will pick one soon" },
      { value: "not-yet", label: "Not yet" },
    ],
  },
  {
    question: "Are you ready to begin a commission?",
    key: "ready" as const,
    type: "radio" as const,
    options: [
      { value: "yes", label: "Yes, I'm ready to proceed" },
      { value: "considering", label: "I'm considering one" },
      { value: "browsing", label: "Just browsing" },
    ],
  },
];

type Answers = {
  subject: string;
  description: string;
  size: string;
  budget: string;
  timeline: string;
  reference: string;
  ready: string;
  contactPreference: string;
};

function trackLead() {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead");
  }
}

export function InquiryDialog() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    subject: "",
    description: "",
    size: "",
    budget: "",
    timeline: "",
    reference: "",
    ready: "",
    contactPreference: "",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const totalQualificationSteps = STEPS.length;
  const isQualificationStep = step <= totalQualificationSteps;
  const isContactStep = step === totalQualificationSteps + 1;
  const isSuccessScreen = step === totalQualificationSteps + 2;

  const currentStep = isQualificationStep ? STEPS[step - 1] : null;
  const canProceedQualification = currentStep && answers[currentStep.key];
  const canSubmitContact =
    name.trim() && email.trim() && phone.trim() && answers.contactPreference && !submitting;

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setError("");
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    setError("");
    setSubmitting(true);

    // Fire Lead event for qualified leads before API call
    const isQualified = answers.ready !== "browsing" && answers.budget !== "under-3k";
    if (isQualified) {
      trackLead();
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          ...answers,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
      setStep(totalQualificationSteps + 2); // success screen
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setStep(1);
      setAnswers({
        subject: "",
        description: "",
        size: "",
        budget: "",
        timeline: "",
        reference: "",
        ready: "",
        contactPreference: "",
      });
      setName("");
      setEmail("");
      setPhone("");
      setSubmitting(false);
      setSubmitted(false);
      setError("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="rounded-none bg-[rgb(68,68,68)] hover:bg-[rgb(88,88,88)]"
        >
          Commission Inquiry
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isSuccessScreen
              ? "Thank you!"
              : isContactStep
                ? `Step ${totalQualificationSteps + 1} of ${totalQualificationSteps + 1}`
                : `Step ${step} of ${totalQualificationSteps + 1}`}
          </DialogTitle>
        </DialogHeader>

        {/* Qualification steps */}
        {isQualificationStep && currentStep && (
          <div className="py-4">
            <p className="text-lg mb-1">{currentStep.question}</p>
            {"subtitle" in currentStep && currentStep.subtitle && (
              <p className="text-sm text-muted-foreground mb-6">{currentStep.subtitle}</p>
            )}
            {!("subtitle" in currentStep && currentStep.subtitle) && <div className="mb-5" />}
            {currentStep.type === "radio" && "options" in currentStep && (
              <RadioGroup
                value={answers[currentStep.key]}
                onValueChange={(v) =>
                  setAnswers({ ...answers, [currentStep.key]: v })
                }
                className="space-y-3"
              >
                {currentStep.options.map((option) => (
                  <label
                    key={option.value}
                    htmlFor={option.value}
                    className="flex items-center gap-3 min-h-[44px] py-1 cursor-pointer"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                    />
                    <div>
                      <span className="text-base">{option.label}</span>
                      {"description" in option && option.description && (
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {option.description}
                        </p>
                      )}
                    </div>
                  </label>
                ))}
              </RadioGroup>
            )}
            {currentStep.type === "textarea" && (
              <Textarea
                value={answers[currentStep.key]}
                onChange={(e) =>
                  setAnswers({ ...answers, [currentStep.key]: e.target.value })
                }
                className="min-h-[200px]"
                placeholder="e.g. A 50th wedding anniversary gift featuring my parents in their garden…"
              />
            )}
          </div>
        )}

        {/* Contact info step */}
        {isContactStep && (
          <div className="py-4">
            <p className="text-lg mb-1">Your contact details</p>
            <div className="mb-5" />
            <div className="space-y-5">
              <div>
                <Label htmlFor="lead-name" className="mb-1.5">
                  Name
                </Label>
                <Input
                  id="lead-name"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lead-email" className="mb-1.5">
                  Email
                </Label>
                <Input
                  id="lead-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lead-phone" className="mb-1.5">
                  Phone
                </Label>
                <Input
                  id="lead-phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="border-t pt-4 mt-4">
              <p className="text-base font-medium mb-1.5">How would you prefer to be contacted?</p>
              <RadioGroup
                value={answers.contactPreference}
                onValueChange={(v) =>
                  setAnswers({ ...answers, contactPreference: v })
                }
                className="space-y-3 mt-2"
              >
                {[
                  { value: "email", label: "Email" },
                  { value: "phone", label: "Phone call" },
                  { value: "sms", label: "Text message (SMS)" },
                ].map((option) => (
                  <label
                    key={option.value}
                    htmlFor={`contact-pref-${option.value}`}
                    className="flex items-center gap-3 min-h-[44px] py-1 cursor-pointer"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`contact-pref-${option.value}`}
                    />
                    <span className="text-base">{option.label}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>
        )}

        {/* Success screen */}
        {isSuccessScreen && (
          <div className="py-4 space-y-4">
            <p className="text-lg">
              I&apos;ll reach out to you shortly.
            </p>
            <p className="text-sm text-muted-foreground">
              You&apos;re also welcome to reach me first directly at{" "}
              <a href="mailto:hello@anthonydunnatelier.com" className="underline hover:text-foreground transition-colors">
                hello@anthonydunnatelier.com
              </a>
            </p>
            <p className="text-sm text-muted-foreground">
              Most inquiries are answered within 12 hours.
            </p>
          </div>
        )}

        {/* Pricing FAQ on budget step only */}
        {currentStep?.key === "budget" && (
          <div className="border-t pt-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="pricing-faq" className="border-b-0">
                <AccordionTrigger className="text-left text-sm text-muted-foreground hover:text-foreground">
                  {pricingFaq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm">
                  {pricingFaq.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        <div className="flex justify-between pt-4">
          {step > 1 && !isSuccessScreen ? (
            <Button variant="outline" className="rounded-none min-w-[120px]" onClick={handleBack} disabled={submitting}>
              Back
            </Button>
          ) : (
            <div />
          )}

          {isQualificationStep && (
            <Button
              onClick={handleNext}
              disabled={!canProceedQualification}
              className="rounded-none min-w-[120px] bg-[rgb(68,68,68)] hover:bg-[rgb(88,88,88)]"
            >
              Next
            </Button>
          )}

          {isContactStep && (
            <Button
              onClick={handleSubmit}
              disabled={!canSubmitContact}
              className="rounded-none min-w-[120px] bg-[rgb(68,68,68)] hover:bg-[rgb(88,88,88)]"
            >
              {submitting ? "Submitting\u2026" : "Submit"}
            </Button>
          )}

          {isSuccessScreen && (
            <Button
              onClick={() => handleOpenChange(false)}
              className="rounded-none min-w-[120px] bg-[rgb(68,68,68)] hover:bg-[rgb(88,88,88)]"
            >
              Close
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
