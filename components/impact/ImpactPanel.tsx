import { HeartHandshake, PawPrint, Syringe, Stethoscope } from "lucide-react";
import type { ImpactoStats } from "@/lib/types";
import { CountUp } from "@/components/ui/CountUp";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function ImpactPanel({ stats }: { stats: ImpactoStats }) {
  const items = [
    {
      icon: PawPrint,
      value: stats.totalRescatados,
      suffix: "+",
      label: "Huellitas rescatadas",
    },
    {
      icon: HeartHandshake,
      value: stats.adoptados,
      suffix: "+",
      label: "Con una segunda oportunidad",
    },
    {
      icon: Syringe,
      value: stats.esterilizaciones,
      suffix: "+",
      label: "Esterilizaciones realizadas",
    },
    {
      icon: Stethoscope,
      value: stats.enTratamiento,
      suffix: "",
      label: "En tratamiento ahora mismo",
    },
  ];

  return (
    <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {items.map((item) => (
        <RevealItem key={item.label}>
          <div className="flex h-full flex-col items-center gap-2 rounded-2xl border border-ink/10 bg-white p-6 text-center shadow-sm">
            <item.icon className="h-6 w-6 text-brand" />
            <CountUp
              value={item.value}
              suffix={item.suffix}
              className="font-display text-3xl font-semibold text-ink"
            />
            <p className="text-xs text-ink-soft">{item.label}</p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
