"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { CheckCircle2 } from "lucide-react";
import type { CurriculumModule } from "@/lib/types/course";

interface Props {
  modules: CurriculumModule[];
}

export default function CurriculumAccordion({ modules }: Props) {
  return (
    <Accordion type="multiple" className="space-y-3">
      {modules.map((mod, i) => (
        <AccordionItem
          key={i}
          value={`module-${i}`}
          className="bg-white rounded-[16px] border border-slate-200 px-5 shadow-sm overflow-hidden"
        >
          <AccordionTrigger className="text-base font-bold text-slate-900 py-4 hover:no-underline hover:text-[#0166A7] transition-colors">
            {mod.subheading}
          </AccordionTrigger>
          <AccordionContent className="pb-5">
            {mod.points && mod.points.length > 0 && (
              <ul className="space-y-2 mb-3">
                {mod.points.map((pt, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle2
                      size={15}
                      className="text-[#0166A7] shrink-0 mt-0.5"
                    />
                    {pt}
                  </li>
                ))}
              </ul>
            )}
            {mod.summary && (
              <p className="text-xs text-slate-400 italic border-t border-slate-100 pt-3 mt-3">
                {mod.summary}
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
