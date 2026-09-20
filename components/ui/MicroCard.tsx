"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import type { MicroCard as MicroCardData } from "@/lib/materialSection";
import { ChevronDown, Icon } from "@/components/icons/LineIcons";
import { Reveal } from "@/components/ui/Reveal";
import { OPEN_MATERIAL_EVENT, ReadMore, type OpenMaterialDetail } from "@/components/ui/ReadMore";
import { GlossedText } from "@/components/ui/Glossed";

/**
 * One material micro-card. It is a row until the learner opens it: kicker,
 * title and a one-line standfirst are always on screen, and a tap opens the live
 * diagram and the definition, with a Read more inside for the decision rules,
 * depth and sources. Material is there when it is wanted, never in the way.
 *
 * A task's MaterialRefs chip (or the mini-nav) that points at this card opens it
 * — and, for a chip, its Read more too, because the decision rules live there.
 */
export function MicroCard({
  card,
  anchorId,
  total,
  index,
  optional = false,
  children,
  extra,
}: {
  card: MicroCardData;
  /** DOM id the mini-nav and MaterialRefs chips scroll to. */
  anchorId: string;
  /** How many cards are in this card's own block — the "of N" in the kicker. */
  total: number;
  /** 1-based position inside its own block. Defaults to the card's own `n`. */
  index?: number;
  /** An optional card is marked as such; it is never needed for the export. */
  optional?: boolean;
  /** The card's live diagram and its micro-interaction. */
  children: React.ReactNode;
  /** Extra depth rendered inside Read more, after the decision rules. */
  extra?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [readMoreSignal, setReadMoreSignal] = useState(0);

  useEffect(() => {
    const handler = (e: Event) => {
      const d = (e as CustomEvent<OpenMaterialDetail>).detail;
      if (!d || d.id !== anchorId) return;
      setOpen(true);
      if (d.readMore) setReadMoreSignal((n) => n + 1);
    };
    window.addEventListener(OPEN_MATERIAL_EVENT, handler);
    return () => window.removeEventListener(OPEN_MATERIAL_EVENT, handler);
  }, [anchorId]);

  return (
    <Reveal as="section" id={anchorId} className="scroll-mt-24">
      <div className="card p-5 md:p-6">
        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="flex w-full items-start gap-3 text-left">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accentSoft text-accent">
            <Icon name={card.icon} className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-micro font-semibold uppercase tracking-wide text-accent">
                {card.code} · Card {index ?? card.n} of {total}
              </span>
              <span className="rounded-full border border-line px-2 py-0.5 text-micro text-ash">~{card.minutes} min</span>
              {optional && <span className="rounded-full border border-dashed border-line px-2 py-0.5 text-micro text-ash">Optional</span>}
            </span>
            <span className="block text-h2 text-ink">{card.title}</span>
            <span className="mt-1 block max-w-prose text-body text-ash">{card.standfirst}</span>
          </span>
          <span className="mt-1 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-caption font-semibold text-accent">
            <ChevronDown className={clsx("h-3.5 w-3.5 transition-transform duration-150", open && "rotate-180")} />
            {open ? "Close" : "Open"}
          </span>
        </button>

        {open && (
          <div className="reveal-in mt-4 space-y-4">
            {/* The diagram — the primary teaching artifact */}
            <div className="overflow-hidden rounded-2xl border border-line bg-canvas p-4 md:p-5">{children}</div>

            {/* The definition — deliberately short */}
            <div className="max-w-prose space-y-2 text-body text-ash">
              <p className="text-micro font-semibold uppercase tracking-wide text-ink">Definition</p>
              {card.definition.map((s, i) => (
                <GlossedText key={i} text={s} />
              ))}
            </div>

            {/* Everything else, one tap away */}
            <ReadMore hint={card.readMoreHint} openSignal={readMoreSignal}>
              {card.reasoning.length > 0 && (
                <div className="rounded-2xl border-y border-r border-l-4 border-accent/25 border-l-accent bg-accentSoft/50 p-4">
                  <p className="text-micro font-semibold uppercase tracking-wide text-accent">How to decide when this comes up in the task</p>
                  <ul className="mt-2 space-y-1.5">
                    {card.reasoning.map((rule, i) => (
                      <li key={i} className="flex gap-2 text-caption text-ink">
                        <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {card.more.map((sub) => (
                <div key={sub.heading} className="max-w-prose space-y-2">
                  <h3 className="text-h3 text-ink">{sub.heading}</h3>
                  {sub.paragraphs.map((p, i) => (
                    <GlossedText key={i} text={p} className="text-body text-ash" />
                  ))}
                </div>
              ))}

              {extra}

              {card.sources.length > 0 && (
                <div className="border-t border-line pt-3">
                  <p className="text-micro font-semibold uppercase tracking-wide text-ash">Sources</p>
                  <ul className="mt-1.5 space-y-1">
                    {card.sources.map((s) => (
                      <li key={s.label} className="text-micro text-ash">
                        {s.url ? (
                          <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline decoration-dotted underline-offset-2 hover:text-accent">
                            {s.label} ↗
                          </a>
                        ) : (
                          <span className="font-semibold text-ink">{s.label}</span>
                        )}
                        {s.detail ? ` — ${s.detail}` : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </ReadMore>
          </div>
        )}
      </div>
    </Reveal>
  );
}
