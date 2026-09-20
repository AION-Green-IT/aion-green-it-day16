"use client";

import { useEffect, useId, useState } from "react";
import clsx from "clsx";
import { ChevronDown } from "@/components/icons/LineIcons";

/**
 * Event that opens a material card (and, when `readMore` is true, its Read
 * more). A task's MaterialRefs chip fires it with `readMore: true` because the
 * decision rules live there; the sticky mini-nav fires it with `readMore:
 * false`. Listeners: `MicroCard` and `OptionalPanel`.
 */
export const OPEN_MATERIAL_EVENT = "aion:open-material";
export type OpenMaterialDetail = { id: string; readMore: boolean };

export function openMaterial(id: string, readMore: boolean) {
  window.dispatchEvent(new CustomEvent<OpenMaterialDetail>(OPEN_MATERIAL_EVENT, { detail: { id, readMore } }));
}

/**
 * A collapsed "read more" disclosure for optional depth. The definition stays
 * on screen; everything behind this is a deep dive the learner opens on
 * purpose. Closed by default, no animation library — the open state reuses
 * the shared `reveal-in` keyframe.
 *
 * `openSignal` is bumped by the card that owns this disclosure when a task's
 * MaterialRefs chip points at it: any change to a non-zero value opens it.
 */
export function ReadMore({
  label = "Read more",
  hint,
  openSignal = 0,
  children,
  className,
}: {
  label?: string;
  /** What is inside, so the learner knows what they would be opening. */
  hint?: string;
  openSignal?: number;
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(openSignal > 0);
  const panelId = useId();

  useEffect(() => {
    if (openSignal > 0) setOpen(true);
  }, [openSignal]);

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-paper px-3 py-1.5 text-caption font-semibold text-accent transition-colors duration-150 hover:border-accent hover:bg-accentSoft"
        >
          <ChevronDown className={clsx("h-3.5 w-3.5 transition-transform duration-150", open && "rotate-180")} />
          {open ? "Show less" : label}
        </button>
        {!open && hint ? <span className="text-micro text-ash">{hint}</span> : null}
      </div>

      {open && (
        <div id={panelId} className="reveal-in mt-4 space-y-5">
          {children}
        </div>
      )}
    </div>
  );
}
