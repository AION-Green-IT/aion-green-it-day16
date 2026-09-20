import type { Metadata } from "next";
import { ROUTES } from "@/lib/routes";
import { EXTRA_DRAWER, MATERIAL1_ORDER, MATERIAL2_ORDER, MATERIAL_NAV, PAGE_INTRO, materialAnchorId } from "@/lib/route1";
import { LeafMark } from "@/components/chrome/Icons";
import { MiniNav } from "@/components/ui/MiniNav";
import { OptionalPanel } from "@/components/ui/OptionalPanel";
import { CaseBrief } from "@/components/route1/CaseBrief";
import { Material1 } from "@/components/route1/Material1";
import { Material2 } from "@/components/route1/Material2";
import { Task1, Task1Extra } from "@/components/route1/Task1";
import { Task2 } from "@/components/route1/Task2";
import { MentorTools } from "@/components/route1/MentorTools";

const R1_TRACK_ID = "r1-track";

/** The required material only: the four cards the required task draws on. */
const MATERIAL_NAV_ITEMS = MATERIAL1_ORDER.map((id) => ({
  id,
  code: MATERIAL_NAV[id].code,
  label: MATERIAL_NAV[id].label,
  anchorId: materialAnchorId(id),
}));

const EXTRA_ANCHORS = MATERIAL2_ORDER.map((id) => materialAnchorId(id));

const ROUTE = ROUTES[0];

export const metadata: Metadata = {
  title: `AION Green IT — Day 16 · ${ROUTE.tag}`,
  description:
    "Why data collected isn't the same as data managed, the three metric layers, the six areas a Green IT metric system needs, and what makes a KPI management-effective — then diagnose Clarity Digital Services' scattered metrics. Optional extras add a second task on prioritising a line of measures.",
};

/**
 * Route 1: four short cards and one required task (the diagnosis board), with
 * its own export. Everything else — two more classification exercises, three
 * more cards and a second task with its own export — sits in an optional
 * drawer at the end, kept but never required.
 */
export default function Route1Page() {
  return (
    <div id={R1_TRACK_ID} className="space-y-16 py-12">
      <MiniNav items={MATERIAL_NAV_ITEMS} trackId={R1_TRACK_ID} />
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

      <Material1 />

      <div className="rounded-2xl border border-accent/30 bg-accentSoft p-6 text-center">
        <p className="text-body font-semibold text-ink">That's the material. Now use it — ten signals from Clarity Digital Services, and the question of why the data isn't steering anything yet.</p>
        <a href="#task1" className="btn-accent mt-3 inline-flex">
          Start your task — Diagnose
        </a>
      </div>

      <Task1 />

      <OptionalPanel id="r1-extra" title={EXTRA_DRAWER.title} summary={EXTRA_DRAWER.summary} anchorIds={EXTRA_ANCHORS}>
        <Task1Extra />

        <hr className="border-line" />

        <Material2 />

        <div className="rounded-2xl border border-accent/30 bg-accentSoft p-6 text-center">
          <p className="text-body font-semibold text-ink">Now use it — three candidate lines of measures, and only one budget to fund first.</p>
          <a href="#task2" className="btn-accent mt-3 inline-flex">
            Start the extra task — Decide
          </a>
        </div>

        <Task2 />
      </OptionalPanel>
    </div>
  );
}
