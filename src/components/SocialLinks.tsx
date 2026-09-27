import { useState } from "react";
import {
  Linkedin,
  Github,
  Youtube,
  Mail,
  ArrowUpRight,
  Send,
  MessageCircle,
  Copy,
  Check,
  X,
  Code2,
  Phone,
} from "lucide-react";

const EMAIL = "ece24123@iiitkalyani.ac.in";
const phoneNumber = "6302968849";

const socialLinks = [
  {
    name: "LinkedIn",
    description: "Professional network",
    url: "https://www.linkedin.com/in/charan-kumar-ab5568311",
    icon: Linkedin,
  },
  {
    name: "GitHub",
    description: "Code and projects",
    url: "https://github.com/ethyne2666",
    icon: Github,
  },
  {
    name: "Leetcode",
    description: "Learn and Compete",
    url: "https://leetcode.com/u/RDpJ4imLKh/",
    icon: Code2,
  },
  {
    name: "X",
    description: "Connect and Share",
    url: "https://x.com/Charan_2666",
    icon: X,
  },
  {
    name: "YouTube",
    description: "NullLogic and Bits&Facts",
    url: "https://youtube.com/@charankumar_2666",
    icon: Youtube,
  },
];

const prompts = [
  "I have a project idea",
  "I'd like to discuss an opportunity",
  "I have a question",
];

const SocialLinks = () => {
  const [message, setMessage] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handlePromptClick = (prompt: string) => {
    setSelectedPrompt(prompt);
    setMessage((current) => current || `${prompt}. `);
  };

  const handleSendEmail = () => {
    const subject = selectedPrompt || "Hello, Charan";
    const body = message.trim() || "Hi Charan, ";

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };


  const handleCopyphoneNumber = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `call:${phoneNumber}`;
    }
  };

  return (
    <section
      id="social"
      className="relative overflow-hidden bg-white px-5 py-20 text-neutral-950 sm:px-8 sm:py-24"
    >
      {/* Soft monochrome grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e5e5e5 1px, transparent 1px), linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Heading */}
        <header className="mb-12 text-center sm:mb-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-neutral-500">
            Start a conversation
          </p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Let’s connect
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-neutral-600 sm:text-base">
            Have a project, opportunity, or question? Send me a message or find
            me on one of these platforms.
          </p>
          <div className="mx-auto mt-6 h-px w-16 bg-neutral-950" />
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* Chat-inspired contact panel */}
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_20px_70px_-45px_rgba(0,0,0,0.35)]">
            <div className="flex items-center gap-3 border-b border-neutral-200 px-5 py-4 sm:px-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950 text-white">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Message Charan</h3>
                <p className="mt-0.5 text-xs text-neutral-500">
                  Choose a topic or write your own message
                </p>
              </div>
              <span className="ml-auto flex items-center gap-2 text-xs text-neutral-500">
                <span className="h-2 w-2 rounded-full bg-neutral-900" />
                Available for conversations
              </span>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div className="flex">
                <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-neutral-100 px-4 py-3 text-sm leading-6 text-neutral-700">
                  Hi! What would you like to talk about?
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {prompts.map((prompt) => {
                  const isSelected = selectedPrompt === prompt;

                  return (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handlePromptClick(prompt)}
                      className={`rounded-full border px-3 py-2 text-xs transition ${
                        isSelected
                          ? "border-neutral-950 bg-neutral-950 text-white"
                          : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-500 hover:bg-neutral-50"
                      }`}
                    >
                      {prompt}
                    </button>
                  );
                })}
              </div>

              <label htmlFor="contact-message" className="sr-only">
                Your message
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Write a message..."
                rows={5}
                className="w-full resize-y rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm leading-6 text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200"
              />

              <div className="flex flex-col gap-3 border-t border-neutral-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-neutral-500">
                  This opens your email app with your message ready to send.
                </p>
                <button
                  type="button"
                  onClick={handleSendEmail}
                  className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-lg bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
                >
                  <Send className="h-4 w-4" />
                  Send email
                </button>
              </div>
            </div>
          </div>

          {/* Social links and direct email */}
          <aside className="flex flex-col gap-5">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
              <h3 className="text-lg font-semibold tracking-tight">
                Find me elsewhere
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Explore my work, connect professionally, or watch my educational
                content.
              </p>

              <div className="mt-5 space-y-2">
                {socialLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-3 transition hover:border-neutral-200 hover:bg-neutral-50"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-800 transition group-hover:border-neutral-300">
                        <Icon className="h-5 w-5" />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-neutral-900">
                          {link.name}
                        </span>
                        <span className="mt-0.5 block text-xs text-neutral-500">
                          {link.description}
                        </span>
                      </span>

                      <ArrowUpRight className="h-4 w-4 text-neutral-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900" />
                    </a>
                  );
                })}
              </div>
            </div>




            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
                Prefer email?
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-2 block break-all text-base font-semibold text-neutral-950 underline decoration-neutral-300 underline-offset-4 transition hover:decoration-neutral-900"
              >
                {EMAIL}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs font-medium text-neutral-700 transition hover:border-neutral-500 hover:text-neutral-950"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy email
                  </>
                )}
              </button>
            </div>




             <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
                Prefer Mobile Number?
              </p>
              <a
                href={`call/message:+91 ${phoneNumber}`}
                className="mt-2 block break-all text-base font-semibold text-neutral-950 underline decoration-neutral-300 underline-offset-4 transition hover:decoration-neutral-900"
              >
                {phoneNumber}
              </a>
              <button
                type="button"
                onClick={handleCopyphoneNumber}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs font-medium text-neutral-700 transition hover:border-neutral-500 hover:text-neutral-950"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy phoneNumber
                  </>
                )}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default SocialLinks;