"use client";

import React, { useState } from "react";
import { certificatesData, getCertificateCategories } from "@/data/certificatesData";
import CertificateCard from "./CertificateCard";

export default function CertificatesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...getCertificateCategories()];

  const filteredCertificates =
    selectedCategory === "All"
      ? certificatesData
      : certificatesData.filter((cert) => cert.category === selectedCategory);

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs font-barlow-condensed tracking-widest uppercase font-semibold px-4 py-2 rounded-full border transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-orange text-background border-orange font-bold"
                : "bg-white/5 text-foreground/70 border-white/10 hover:border-white/20 hover:text-white"
            }`}
          >
            {cat}
            <span className="ml-1.5 opacity-60 text-[10px]">
              (
              {cat === "All"
                ? certificatesData.length
                : certificatesData.filter((c) => c.category === cat).length}
              )
            </span>
          </button>
        ))}
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertificates.map((cert) => (
          <CertificateCard key={cert.id} cert={cert} />
        ))}
      </div>
    </div>
  );
}
