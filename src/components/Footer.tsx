import {
  ArrowUp,
  ArrowUpRight,
  Code2,
  Github,
  Heart,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Tech Stack", href: "#tech-stack" },
    { name: "Projects", href: "#projects" },
    { name: "NullLogic", href: "#nulllogic" },
    { name: "Contact", href: "#social" },
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-neutral-200 bg-white px-5 pb-5 pt-16 text-neutral-950 sm:px-8 sm:pt-20">
      {/* Subtle background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e5e5e5 1px, transparent 1px), linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "linear-gradient(to bottom, black, black 55%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black, black 55%, transparent 100%)",
        }}
      />

      {/* Back to top */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-900 shadow-lg transition hover:-translate-y-1 hover:border-neutral-950 hover:bg-neutral-950 hover:text-white sm:bottom-8 sm:right-8"
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Footer information */}
        <div className="grid gap-10 border-b border-neutral-200 pb-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="#home"
              onClick={(event) => {
                event.preventDefault();
                scrollToTop();
              }}
              className="inline-flex items-center gap-2 text-lg font-bold tracking-tight"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-950 text-white">
                <Code2 className="h-5 w-5" />
              </span>
              Charan Kumar
            </a>

            <p className="mt-4 max-w-xs text-sm leading-6 text-neutral-600">
              Building thoughtful software across full-stack development,
              backend systems, and DevOps.
            </p>

            <p className="mt-4 flex items-center gap-2 text-xs text-neutral-500">
              <MapPin className="h-3.5 w-3.5" />
              Kalyani, West Bengal, India
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Explore
            </h3>
            <nav aria-label="Footer navigation" className="mt-4 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => scrollToSection(link.href.slice(1))}
                  className="group flex w-fit items-center gap-1 text-left text-sm text-neutral-700 transition hover:text-black"
                >
                  {link.name}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </button>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Get in touch
            </h3>
            <div className="mt-4 flex flex-col gap-4">
              <a
                href="mailto:ece24123@iiitkalyani.ac.in"
                className="flex items-start gap-3 text-sm text-neutral-700 transition hover:text-black"
              >
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-500" />
                <span className="break-all">ece24123@iiitkalyani.ac.in</span>
              </a>

              <a
                href="tel:+916302968849"
                className="flex items-center gap-3 text-sm text-neutral-700 transition hover:text-black"
              >
                <Phone className="h-4 w-4 flex-shrink-0 text-neutral-500" />
                +91 6302968849
              </a>

              <span className="flex items-center gap-3 text-sm text-neutral-600">
                <span className="h-2 w-2 rounded-full bg-neutral-900" />
                Open to opportunities
              </span>
            </div>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Follow along
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="https://www.linkedin.com/in/charan-kumar-ab5568311"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-700 transition hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
              </a>

              <a
                href="https://github.com/ethyne2666"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-700 transition hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
              >
                <Github className="h-4 w-4" />
              </a>

              <a
                href="https://youtube.com/@charankumar_2666"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-700 transition hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>

            <p className="mt-4 text-sm leading-6 text-neutral-600">
              ECE student at IIIT Kalyani, interested in building useful
              technology.
            </p>
          </div>
        </div>

        {/* Small footer note */}
        <div className="flex flex-col gap-3 py-5 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-1.5">
            © {new Date().getFullYear()} Charan Kumar. Made with
            <Heart className="h-3.5 w-3.5 fill-neutral-950 text-neutral-950" />
            and React.
          </p>
          <p>Designed and built with care.</p>
        </div>

        {/* Oversized bottom wordmark */}
        <div
          aria-label="Charan Kumar"
          className="select-none overflow-hidden text-center font-black uppercase leading-[0.76] tracking-[-0.075em] text-neutral-200"
          style={{ fontSize: "clamp(4.5rem, 19vw, 15rem)" }}
        >
          <div>Charan</div>
          <div>Kumar</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;