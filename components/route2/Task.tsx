"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { LivePanel } from "@/components/ui/LivePanel";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { ANSWER_KEY, EXTRA_STAGES, PART_ONE, PART_TWO, TASK_FRAMING, TASK_MATERIAL_REFS, materialRefs } from "@/lib/route2";
import { StageFrame } from "./StageFrame";
import { StageGuiding } from "./StageGuiding";
import { StageSequence } from "./StageSequence";
import { StageAllocate } from "./StageAllocate";
import { StageGovernance } from "./StageGovernance";
import { Handover } from "./Handover";
import { ReportPanel } from "./ReportPanel";
import { ExportBar } from "./ExportBar";
import { useRoute2, domId } from "./useRoute2";

/**
 * The required task: two connected parts on one scroll — sequence the build,
 * then govern it — with the live memo assembling beside them and one export.
 */
export function Task() {
  const r2 = useRoute2();
  const done = [r2.stageCComplete, r2.stageEComplete].filter(Boolean).length;

  return (
    <section id={domId.task} className="scroll-mt-24 space-y-6">
      <SectionHeading kicker={`${TASK_FRAMING.tag} · about ${TASK_FRAMING.minutes} minutes`} title={TASK_FRAMING.title} />

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-6">
          <div className="rounded-2xl border border-accent/30 bg-accentSoft/60 p-5">
            <p className="max-w-prose text-body text-ink">{TASK_FRAMING.instruction}</p>
          </div>

          <MaterialRefs refs={materialRefs(TASK_MATERIAL_REFS)} />

          <div>
            <p className="mb-2 text-micro font-semibold uppercase tracking-wide text-accent">
              {PART_ONE.kicker} · about {PART_ONE.minutes} minutes
            </p>
            <StageSequence />
          </div>

          <Handover />

          <div>
            <p className="mb-2 text-micro font-semibold uppercase tracking-wide text-accent">
              {PART_TWO.kicker} · about {PART_TWO.minutes} minutes
            </p>
            <StageGovernance />
          </div>

          <AnswerKey block={ANSWER_KEY} />
        </div>

        <LivePanel title="Verdeon Management Proposal" summary={`${done}/2 parts complete`}>
          <ReportPanel />
        </LivePanel>
      </div>

      <ExportBar />
    </section>
  );
}

/** Optional extras: Stage A, B and D. Nothing here is needed for the export; whatever is filled in is added to it. */
export function TaskExtra() {
  return (
    <section className="space-y-8">
      <div>
        <p className="mb-2 text-micro font-semibold uppercase tracking-wide text-accent">{EXTRA_STAGES.frame.kicker}</p>
        <StageFrame />
      </div>
      <div>
        <p className="mb-2 text-micro font-semibold uppercase tracking-wide text-accent">{EXTRA_STAGES.guiding.kicker}</p>
        <StageGuiding />
      </div>
      <div>
        <p className="mb-2 text-micro font-semibold uppercase tracking-wide text-accent">{EXTRA_STAGES.allocate.kicker}</p>
        <StageAllocate />
      </div>
    </section>
  );
}
