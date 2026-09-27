import { ArrowUpRight, Play, Youtube } from "lucide-react";

const NULLLOGIC_CHANNEL =
  "https://www.youtube.com/@charankumar-c1c";

const BITSFACTS_CHANNEL =
  "https://www.youtube.com/@charankumar_2666";

const nullLogicTopics = [
  {
    title: "Core Java",
    description:
      "Programming fundamentals, explained with a focus on concepts that matter in computer science.",
    search: "Core Java",
    thumbnail: "/uploads/nullLogic logo.jpeg",
  },
  {
    title: "Docker",
    description:
      "Learn the basics of containers and how Docker fits into modern software development.",
    search: "Docker",
    thumbnail: "/uploads/nullLogic logo.jpeg",
  },
  {
    title: "Git & GitHub",
    description:
      "A practical introduction to version control, repositories, and collaborating with GitHub.",
    search: "Git GitHub",
    thumbnail: "/uploads/nullLogic logo.jpeg",
  },
];

const bitsFactsTopics = [
  {
    title: "Digital Electronics",
    description:
      "Explore digital circuits, logic gates, and core electronics concepts.",
    search: "Digital Electronics",
  },
  {
    title: "Flip-Flops",
    description:
      "Understand sequential logic circuits and the role of flip-flops.",
    search: "Flip Flops",
  },
  {
    title: "Karnaugh Maps",
    description:
      "Learn how K-maps help simplify Boolean expressions and logic designs.",
    search: "Karnaugh Maps",
  },
];

const openYouTubeSearch = (channel: string, topic: string) => {
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${channel} ${topic}`
  )}`;

  window.open(url, "_blank", "noopener,noreferrer");
};

const openExternalLink = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const NullLogic = () => {
  return (
    <section
      id="nulllogic"
      className="relative overflow-hidden bg-white px-5 py-20 text-neutral-950 sm:px-8 sm:py-24"
    >
      {/* Subtle monochrome grid */}
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
        {/* NullLogic — primary channel */}
        <div className="mb-20">
          <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-neutral-600">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />
              Computer science, made clearer
            </div>

            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="text-neutral-400">Channel /</span> NullLogic
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
              NullLogic is my channel for computer science and software
              development. Explore topics like Java, Docker, Git, and the
              concepts behind building software.
            </p>

            <button
              type="button"
              onClick={() => openExternalLink(NULLLOGIC_CHANNEL)}
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
            >
              <Youtube className="h-4 w-4" />
              Visit NullLogic
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </header>

          <div className="grid gap-5 md:grid-cols-3">
            {nullLogicTopics.map((topic, index) => (
              <article
                key={topic.title}
                className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_16px_50px_-38px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_22px_60px_-38px_rgba(0,0,0,0.4)]"
              >
                <button
                  type="button"
                  onClick={() =>
                    openYouTubeSearch("NullLogic Charan Kumar", topic.search)
                  }
                  aria-label={`Search NullLogic for ${topic.title} videos`}
                  className="block w-full text-left"
                >
                  <div className="relative aspect-video overflow-hidden bg-neutral-100">
                    <img
                      src={topic.thumbnail}
                      alt="NullLogic channel"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      loading={index === 0 ? "eager" : "lazy"}
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/25">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-neutral-950 opacity-90 shadow-lg transition group-hover:scale-110">
                        <Play className="ml-0.5 h-5 w-5 fill-current" />
                      </span>
                    </div>
                    <span className="absolute left-3 top-3 rounded-full border border-white/70 bg-white/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-neutral-700 backdrop-blur">
                      NullLogic
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {topic.title}
                    </h3>
                    <p className="mt-2 min-h-[3rem] text-sm leading-6 text-neutral-600">
                      {topic.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-neutral-800">
                      Find videos on YouTube
                      <ArrowUpRight className="h-4 w-4 text-neutral-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </div>

        {/* Bits&Facts — secondary channel */}
        <div className="border-t border-neutral-200 pt-12 sm:pt-16">
          <header className="mx-auto mb-8 max-w-2xl text-center">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-neutral-500">
              Also on YouTube
            </p>
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Bits&amp;Facts
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-neutral-600">
              Short, approachable lessons on digital electronics, including
              flip-flops and Karnaugh maps.
            </p>
          </header>

          <div className="grid gap-3 sm:grid-cols-3">
            {bitsFactsTopics.map((topic) => (
              <button
                key={topic.title}
                type="button"
                onClick={() =>
                  openYouTubeSearch("Bits and Facts Charan Kumar", topic.search)
                }
                className="group rounded-xl border border-neutral-200 bg-white/80 p-4 text-left transition hover:border-neutral-400 hover:bg-white"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-neutral-900">
                    {topic.title}
                  </span>
                  <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-neutral-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                <span className="mt-2 block text-sm leading-5 text-neutral-600">
                  {topic.description}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-7 text-center">
            <button
              type="button"
              onClick={() => openExternalLink(BITSFACTS_CHANNEL)}
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-800 transition hover:border-neutral-500 hover:bg-neutral-50"
            >
              <Youtube className="h-4 w-4" />
              Visit Bits&amp;Facts
              <ArrowUpRight className="h-4 w-4 text-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NullLogic;