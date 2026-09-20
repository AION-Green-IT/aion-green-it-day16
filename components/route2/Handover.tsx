"use client";

import { LAYERS, SEQUENCE_POSITIONS } from "@/lib/route2";
import { scrollToAndFlash } from "@/lib/scrollToAndFlash";
import { domId, useRoute2 } from "./useRoute2";

/**
 * A small inline panel between Part 1 and Part 2 — not a section of content and
 * never a gate. It draws the learner's own Part 1 output (their build order and
 * first move) so Part 2 reads as caused by it: the responsibilities below are
 * the ones that make that first move happen.
 */
export function Handover() {
  const r2 = useRoute2();
  const ordered = SEQUENCE_POSITIONS.map((pos) => LAYERS.find((l) => r2.sequence[l.id] === pos) ?? null);
  const any = ordered.some(Boolean) || !!r2.firstMove;

  return (
    <div className="rounded-2xl border border-accent/30 bg-accentSoft/50 p-4" aria-live="polite">
      <p className="text-micro font-semibold uppercase tracking-wide text-accent">From Part 1 to Part 2</p>
      {any ? (
        <>
          <svg viewBox="0 0 360 56" preserveAspectRatio="xMidYMid meet" className="mt-2 h-auto w-full max-w-md" role="img" aria-label={`Your build order: ${ordered.map((l) => (l ? l.name : "not placed")).join(", then ")}.`}>
            {ordered.map((layer, i) => {
              const x = 6 + i * 118;
              return (
                <g key={i}>
                  <rect x={x} y="8" width="108" height="34" rx="8" className={layer ? "fill-paper stroke-accent" : "fill-paper stroke-line"} strokeWidth="1.4" strokeDasharray={layer ? undefined : "3 3"} />
                  <text x={x + 54} y="29" textAnchor="middle" className={layer ? "fill-ink text-[11px] font-semibold" : "fill-ash text-[10px]"}>
                    {i + 1}. {layer ? layer.name : "not placed"}
                  </text>
                  {i < 2 && <path d={`M${x + 108} 25 h10`} stroke="currentColor" className="text-accent" strokeWidth="1.6" />}
                </g>
              );
            })}
          </svg>
          <p className="mt-2 text-caption text-ink">
            <span className="font-semibold">Your first move: </span>
            {r2.firstMove ? <>&ldquo;{r2.firstMove}&rdquo;</> : <span className="text-ash">not written yet</span>}
          </p>
        </>
      ) : (
        <p className="mt-1 text-caption text-ash">Part 1 isn&apos;t started yet — Part 2 stays open, and you can come back to it.</p>
      )}
      <p className="mt-1.5 text-caption text-ash">
        Part 2 asks who makes this happen: four responsibilities, four roles, and the call you would take now.
        {!r2.stageCComplete && any && (
          <>
            {" "}
            <button type="button" onClick={() => scrollToAndFlash(domId.sequenceBoard)} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
              Finish Part 1
            </button>
          </>
        )}
      </p>
    </div>
  );
}
