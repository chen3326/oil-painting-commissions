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

const CONTACT_EMAIL = "hello@anthonydunnatelier.com";

const STEPS = [
  {
    question: "What would you like painted?",
    key: "subject" as const,
    options: [
      { value: "individual", label: "Individual portrait" },
      { value: "group", label: "Group or couple portrait" },
      { value: "pet", label: "Pet or animal" },
      { value: "landscape", label: "Landscape" },
      { value: "other", label: "Something else" },
    ],
  },
  {
    question: "Budget range?",
    key: "budget" as const,
    options: [
      { value: "under-1000", label: "Under $1,000" },
      { value: "1000-3000", label: "$1,000–$3,000" },
      { value: "3000-10000", label: "$3,000–$10,000" },
      { value: "10000+", label: "$10,000+" },
      { value: "not-sure", label: "Not sure" },
    ],
  },
  {
    question: "Timeline?",
    key: "timeline" as const,
    options: [
      { value: "no-rush", label: "No rush" },
      { value: "6-weeks", label: "Within 6 weeks" },
      { value: "specific-date", label: "For a specific date" },
      { value: "not-sure", label: "Not sure" },
    ],
  },
  {
    question: "Are you ready to begin a commission?",
    key: "ready" as const,
    options: [
      { value: "yes", label: "Yes, I'm ready to proceed" },
      { value: "considering", label: "I'm considering one" },
      { value: "browsing", label: "Just browsing" },
    ],
  },
];

type Answers = {
  subject: string;
  budget: string;
  timeline: string;
  ready: string;
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
    budget: "",
    timeline: "",
    ready: "",
  });

  const currentStep = STEPS[step - 1];
  const isLastStep = step === STEPS.length;
  const isFinalScreen = step === STEPS.length + 1;

  const canProceed = !isFinalScreen && answers[currentStep?.key];

  const handleNext = () => {
    if (isLastStep) {
      setStep(step + 1);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSendInquiry = () => {
    // Fire Lead event only if qualified
    const isQualified =
      answers.budget !== "under-1000" && answers.ready !== "browsing";
    if (isQualified) {
      trackLead();
    }

    window.location.href = `mailto:${CONTACT_EMAIL}`;
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      // Reset state when dialog closes
      setStep(1);
      setAnswers({ subject: "", budget: "", timeline: "", ready: "" });
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isFinalScreen ? "Almost there!" : `Step ${step} of 4`}
          </DialogTitle>
        </DialogHeader>

        {!isFinalScreen && currentStep && (
          <div className="py-4">
            <p className="text-lg mb-6">{currentStep.question}</p>
            <RadioGroup
              value={answers[currentStep.key]}
              onValueChange={(v) =>
                setAnswers({ ...answers, [currentStep.key]: v })
              }
              className="space-y-3"
            >
              {currentStep.options.map((option) => (
                <div key={option.value} className="flex items-center gap-3">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="cursor-pointer text-base">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {isFinalScreen && (
          <div className="py-4 space-y-4">
            <p>Please email me with the following:</p>
            <ul className="space-y-1">
              <li>• A brief description of who or what you'd like painted</li>
              <li>• Reference photos (if available)</li>
              <li>• Any details about the occasion or purpose</li>
              <li>• Your preferred size, or let me know if you'd like guidance</li>
            </ul>
            <p>I'll reply with a quote and any questions I may have.</p>
            <p className="text-sm text-muted-foreground">
              Most inquiries are answered within 12 hours.
            </p>
          </div>
        )}

        <div className="flex justify-between pt-4">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <div />
          )}

          {isFinalScreen ? (
            <Button
              onClick={handleSendInquiry}
              className="bg-[rgb(68,68,68)] hover:bg-[rgb(88,88,88)]"
            >
              Email Now
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="bg-[rgb(68,68,68)] hover:bg-[rgb(88,88,88)]"
            >
              Next
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
