"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { MicroCard } from "@/components/ui/MicroCard";
import { MiniNav } from "@/components/ui/MiniNav";
import { MATERIAL, MATERIAL_INTRO, MATERIAL_NAV, MATERIAL_REQUIRED, materialAnchorId } from "@/lib/route2";
import {
  GuidingOptionsGuide,
  LayeredStaircase,
  LeadershipInstrumentToggle,
  ResponsibilitiesGuide,
  RoleChips,
  RoleGuide,
  TerraMetricsExample,
  TradeoffPentagon,
} from "./MaterialDiagrams";

export const MATERIAL_TRACK_ID = "r2-material";

/** The required teaching block: two cards, D2 and D4, about 6 minutes — exactly what Part 1 and Part 2 draw on. */
export function Material() {
  const [d1, d2, d3, d4] = MATERIAL;
  void d1;
  void d3;

  const navItems = MATERIAL_REQUIRED.map((id) => ({
    id,
    code: MATERIAL_NAV[id].code,
    label: MATERIAL_NAV[id].label,
    anchorId: materialAnchorId(id),
  }));

  return (
    <div id={MATERIAL_TRACK_ID} className="space-y-8">
      <MiniNav items={navItems} trackId={MATERIAL_TRACK_ID} />

      <SectionHeading kicker={MATERIAL_INTRO.kicker} title={MATERIAL_INTRO.title} intro={MATERIAL_INTRO.intro} />

      <MicroCard
        card={d2}
        anchorId={materialAnchorId("layeredModel")}
        total={2}
        index={1}
        extra={
          <>
            <GuidingOptionsGuide />
            <TerraMetricsExample />
          </>
        }
      >
        <LayeredStaircase />
      </MicroCard>

      <MicroCard
        card={d4}
        anchorId={materialAnchorId("rolePriorities")}
        total={2}
        index={2}
        extra={
          <>
            <RoleGuide />
            <ResponsibilitiesGuide />
          </>
        }
      >
        <RoleChips />
      </MicroCard>
    </div>
  );
}

/** The two optional cards, D1 and D3 — kept, never required. Rendered inside the extra-practice drawer. */
export function MaterialExtra() {
  const [d1, , d3] = MATERIAL;

  return (
    <div className="space-y-8">
      <SectionHeading kicker="Optional material · two cards · about 5 minutes" title="Two more cards for the extra stages" />

      <MicroCard card={d1} anchorId={materialAnchorId("leadershipInstrument")} total={2} index={1} optional>
        <LeadershipInstrumentToggle />
      </MicroCard>

      <MicroCard card={d3} anchorId={materialAnchorId("tradeoffPentagon")} total={2} index={2} optional>
        <TradeoffPentagon />
      </MicroCard>
    </div>
  );
}
