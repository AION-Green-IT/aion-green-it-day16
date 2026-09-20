import type { Metadata } from "next";
import { ROUTES } from "@/lib/routes";
import { EXTRA_DRAWER, MATERIAL_OPTIONAL, PAGE_INTRO, materialAnchorId } from "@/lib/route2";
import { LeafMark } from "@/components/chrome/Icons";
import { RouteGate } from "@/components/chrome/RouteGate";
import { OptionalPanel } from "@/components/ui/OptionalPanel";
import { CaseBrief } from "@/components/route2/CaseBrief";
import { Material, MaterialExtra } from "@/components/route2/Material";
import { Task, TaskExtra } from "@/components/route2/Task";
import { MentorTools } from "@/components/route2/MentorTools";

const ROUTE = ROUTES[1];
const EXTRA_ANCHORS = MATERIAL_OPTIONAL.map((id) => materialAnchorId(id));

export const metadata: Metadata = {
  title: `AION Green IT — Day 16 · ${ROUTE.tag}`,
  description: ROUTE.cardBlurb,
};

/**
 * Route 2: two short cards and one task in two connected parts (sequence the
 * build, then govern it), with one export. Everything else — two more cards and
 * three more stages — sits in an optional drawer at the end, kept but never
 * required; whatever the learner fills in there is added to the export.
 */
export default function Route2Page() {
  return (
    <RouteGate routeN={2}>
      <div className="space-y-16 py-12">
        <MentorTools />

        <div className="max-w-prose">
          <p className="mb-2 flex items-center gap-2 text-micro font-semibold uppercase tracking-wide text-accent">
            <LeafMark className="h-4 w-4" /> {PAGE_INTRO.tag}
          </p>
          <h1 className="text-display text-ink">{PAGE_INTRO.title}</h1>
          <p className="mt-4 text-body text-ash">{PAGE_INTRO.body}</p>
        </div>

        <CaseBrief />

        <hr className="border-line" />

        <Material />

        <div className="rounded-2xl border border-accent/30 bg-accentSoft p-6 text-center">
          <p className="text-body font-semibold text-ink">That&apos;s the material. Now use it — sequence the build for Verdeon, then govern it.</p>
          <a href="#task" className="btn-accent mt-3 inline-flex">
            Start your tasks
          </a>
        </div>

        <Task />

        <OptionalPanel id="r2-extra" title={EXTRA_DRAWER.title} summary={EXTRA_DRAWER.summary} anchorIds={EXTRA_ANCHORS}>
          <MaterialExtra />

          <hr className="border-line" />

          <TaskExtra />
        </OptionalPanel>
      </div>
    </RouteGate>
  );
}
