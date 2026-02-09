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

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
        value: "intimate",
        label: 'Intimate — Up to 12" × 16"',
        description: "Perfect for tabletop display or smaller spaces",
        detail: "From $1,200 · 2–4 weeks",
      },
      {
        value: "classic",
        label: 'Classic — Up to 18" × 24"',
        description: "The standard size for wall-mounted portraits",
        detail: "From $3,000 · 2–4 weeks",
      },
      {
        value: "statement",
        label: 'Statement — Up to 30" × 40"',
        description: "A commanding presence for larger wall spaces",
        detail: "From $12,000 · 4–6 weeks",
      },
      {
        value: "grand",
        label: 'Grand — 48" × 60" and above',
        description: "Gallery-scale works for grand interiors",
        detail: "From $30,000+ · 6+ weeks",
      },
      {
        value: "not-sure",
        label: "Not sure yet",
        description: "I'd like guidance on the right size",
        detail: "",
      },
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
  timeline: string;
  reference: string;
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
    description: "",
    size: "",
    timeline: "",
    reference: "",
    ready: "",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const totalQualificationSteps = STEPS.length; // 3
  const isQualificationStep = step <= totalQualificationSteps;
  const isContactStep = step === totalQualificationSteps + 1; // step 4
  const isSuccessScreen = step === totalQualificationSteps + 2; // step 5

  const currentStep = isQualificationStep ? STEPS[step - 1] : null;
  const canProceedQualification = currentStep && answers[currentStep.key];
  const canSubmitContact =
    name.trim() && email.trim() && phone.trim() && !submitting;

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
    const isQualified = answers.ready !== "browsing";
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
      setAnswers({ subject: "", description: "", size: "", timeline: "", reference: "", ready: "" });
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
      <DialogContent className="sm:max-w-md">
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
                      {"detail" in option && option.detail && (
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {option.detail}
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

        {/* Step 4: Contact info */}
        {isContactStep && (
          <div className="py-4 space-y-4">
            <p className="text-lg mb-6">How can I reach you?</p>
            <div className="space-y-3">
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
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>
        )}

        {/* Success screen */}
        {isSuccessScreen && (
          <div className="py-4 space-y-4">
            <p className="text-lg">
              I&apos;ll reach out to you shortly via email.
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
