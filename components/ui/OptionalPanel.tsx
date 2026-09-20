"use client";

import { useEffect, useId, useState } from "react";
import clsx from "clsx";
import { ChevronDown } from "@/components/icons/LineIcons";
import { OPEN_MATERIAL_EVENT, type OpenMaterialDetail } from "@/components/ui/ReadMore";

/**
 * The "extra practice" drawer. Nothing inside it is required for the export —
 * it exists so a learner who wants more can do more, and so nothing that was
 * built is thrown away. Closed by default. The children stay mounted while it
 * is closed (just hidden), so their anchors, state and listeners are always
 * live: a MaterialRefs chip or the mini-nav that points at a card inside opens
 * the drawer first via `anchorIds`.
 */
export function OptionalPanel({
  id,
  title,
  summary,
  anchorIds = [],
  children,
}: {
  id: string;
  title: string;
  /** One line under the button: what is inside and how long it takes. */
  summary: string;
  /** DOM ids of material cards inside; a jump to any of them opens the drawer. */
  anchorIds?: string[];
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const bodyId = useId();

  useEffect(() => {
    const handler = (e: Event) => {
      const d = (e as CustomEvent<OpenMaterialDetail>).detail;
      if (d && anchorIds.includes(d.id)) setOpen(true);
    };
    window.addEventListener(OPEN_MATERIAL_EVENT, handler);
    return () => window.removeEventListener(OPEN_MATERIAL_EVENT, handler);
  }, [anchorIds]);

  return (
    <section id={id} className="scroll-mt-24 rounded-2xl border border-dashed border-line bg-canvas p-5 print:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={bodyId}
        className="flex w-full items-start justify-between gap-3 text-left"
      >
        <span>
          <span className="block text-micro font-semibold uppercase tracking-wide text-ash">Optional</span>
          <span className="block text-h3 text-ink">{title}</span>
          <span className="mt-0.5 block max-w-prose text-caption text-ash">{summary}</span>
        </span>
        <span className="mt-1 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-caption font-semibold text-accent">
          <ChevronDown className={clsx("h-3.5 w-3.5 transition-transform duration-150", open && "rotate-180")} />
          {open ? "Hide" : "Show"}
        </span>
      </button>
      <div id={bodyId} hidden={!open} className="mt-6 space-y-10">
        {children}
      </div>
    </section>
  );
}
