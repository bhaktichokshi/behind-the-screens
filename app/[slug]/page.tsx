import { notFound } from "next/navigation";
import Link from "next/link";

import { centerEntry, interestNodes } from "@/content/portfolio";

type TopicPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return interestNodes.map((node) => ({ slug: node.id }));
}

export function generateMetadata({ params }: TopicPageProps) {
  const node = interestNodes.find((item) => item.id === params.slug);

  if (!node) {
    return {
      title: "Not found"
    };
  }

  return {
    title: `${node.label} | Bhakti Chokshi`,
    description: node.body
  };
}

export default function TopicPage({ params }: TopicPageProps) {
  const node = interestNodes.find((item) => item.id === params.slug);

  if (!node) {
    notFound();
  }

  return (
    <main className="min-h-dvh bg-[var(--paper)] px-5 py-8 text-[var(--ink)] sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <Link
          href="/"
          className="w-fit font-mono text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)] underline decoration-1 underline-offset-4"
        >
          back to desk
        </Link>

        <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--card)] p-6 shadow-[0_16px_34px_rgba(43,41,36,0.12)] sm:p-8">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--ink-soft)]">diary entry</p>
          <h1 className="mt-4 font-serif text-5xl leading-[0.9] tracking-[-0.05em] sm:text-6xl">{node.label}</h1>
          <p
            className="mt-6 max-w-2xl text-[1.35rem] leading-[1.55] text-[var(--ink)]"
            style={{ fontFamily: "var(--hand)" }}
          >
            {node.body}
          </p>
        </section>

        <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--card)] p-6 sm:p-8">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--ink-soft)]">
            centered note
          </p>
          <p
            className="mt-4 max-w-2xl text-[1.1rem] leading-[1.65] text-[var(--ink)]"
            style={{ fontFamily: "var(--hand)" }}
          >
            {centerEntry.body}
          </p>
        </section>

        {"entries" in node && node.entries?.length ? (
          <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--card)] p-6 sm:p-8">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--ink-soft)]">
              notes
            </p>
            <div className="mt-4 grid gap-4">
              {node.entries.map((entry) => (
                <article key={`${entry.title}-${entry.date ?? "undated"}`} className="border-t border-[var(--line)] pt-4">
                  {entry.date ? (
                    <time className="block font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--ink-soft)]">
                      {entry.date}
                    </time>
                  ) : null}
                  <h2 className="mt-2 font-serif text-2xl leading-tight">{entry.title}</h2>
                  <p className="mt-3 text-base leading-7" style={{ fontFamily: "var(--body)" }}>
                    {entry.body}
                  </p>
                  {entry.tags?.length ? (
                    <ul className="mt-3 flex flex-wrap gap-2 p-0">
                      {entry.tags.map((tag) => (
                        <li
                          key={tag}
                          className="list-none rounded-full border border-[var(--line)] px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-[var(--ink-soft)]"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
