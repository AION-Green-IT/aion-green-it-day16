"use client";

import { useEffect, useId, useState } from "react";
import { OPEN_MATERIAL_EVENT, type OpenMaterialDetail } from "@/components/ui/ReadMore";

/**
 * The "extra practice" drawer. Nothing inside it is required for the export, and
 * while it is closed it takes almost no room: one small, quiet link at the foot
 * of the page and nothing else — no card, no teaser. The learner has to go looking
 * for it. Opened, it shows a short note and the extras.
 *
 * The children stay mounted while it is closed (just hidden), so their anchors,
 * state and listeners are always live: a MaterialRefs chip or the mini-nav that
 * points at a card inside opens the drawer first via `anchorIds`.
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
  /** One line shown only once the drawer is open. */
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
    <section id={id} className="scroll-mt-24 print:hidden">
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={bodyId}
          className="text-micro text-ash/70 underline decoration-dotted underline-offset-2 transition-colors duration-150 hover:text-ash"
        >
          {open ? `Hide ${title.toLowerCase()}` : `${title} (optional)`}
        </button>
      </div>
      <div id={bodyId} hidden={!open} className="mt-6 space-y-10 rounded-2xl border border-dashed border-line bg-canvas p-5">
        <p className="max-w-prose text-caption text-ash">{summary}</p>
        {children}
      </div>
    </section>
  );
}
