"use client";

import React from "react";
import { techStackData } from "@/data/techStackData";
import { Cpu, HelpCircle, Sparkles } from "lucide-react";

export default function TechStackSection() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
      {techStackData.map((category) => (
        <div
          key={category.id}
          className={`relative rounded-xl border p-6 flex flex-col justify-between transition-all duration-300 hover:border-orange/40 ${
            category.isUnconfirmed
              ? "bg-[#161414] border-dashed border-amber-400/20"
              : "bg-[#171616] border-white/10"
          }`}
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <h4 className="text-lg font-bold font-barlow-condensed tracking-wider uppercase text-foreground flex items-center gap-2">
                <Cpu className="w-4 h-4 text-orange" />
                {category.category}
              </h4>

              {category.isUnconfirmed && (
                <span className="inline-flex items-center gap-1 text-[11px] font-barlow-condensed tracking-wider uppercase text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  <HelpCircle className="w-3 h-3" /> In Progress
                </span>
              )}
            </div>

            {category.description && (
              <p className="text-xs text-foreground/50 font-barlow-condensed uppercase tracking-wider mb-3">
                {category.description}
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              {category.items.map((skill) => (
                <span
                  key={skill}
                  className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all ${
                    category.isUnconfirmed
                      ? "bg-amber-400/[0.04] text-amber-200/80 border-amber-400/10"
                      : "bg-white/[0.03] text-foreground/80 border-white/10 hover:border-orange/40 hover:text-white hover:bg-orange/5"
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
