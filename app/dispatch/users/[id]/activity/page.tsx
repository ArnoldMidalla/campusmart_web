"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { DispatchHeader } from "../../../components";

const FILTERS = ["All", "Orders", "Listings", "Login", "Disputes"];

const activities = [
  { id: 1, title: 'Listed "Nike Air Force 1"', time: 'Today · 09:12' },
  { id: 2, title: 'Completed order #CM-4820', time: 'Today · 08:04' },
  { id: 3, title: 'Logged in · Chrome on Android', time: 'Today · 07:58' },
  { id: 4, title: 'Dispute opened on #CM-4788', time: 'Yesterday · 18:22' },
  { id: 5, title: 'Verification approved', time: '2 March · 11:40' },
  { id: 6, title: 'Account created', time: '2 March · 11:02' },
];

export default function AccountActivityPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <main className="flex-1 flex flex-col pb-10">
      {/* Header */}
      <DispatchHeader
        variant="detail"
        title="Account Activity"
      />

      {/* Filter Tags */}
      <div className="px-6 mb-6 flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-[12px] text-[13px] font-medium transition-colors border shadow-[0_2px_8px_rgba(0,0,0,0.02)] ${
              activeFilter === filter
                ? "bg-[#222222] text-white border-[#222222]"
                : "bg-white text-foreground-muted border-border-default hover:bg-gray-50"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="px-6">
        <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-border-default/50">
          {activities.map((item, idx) => {
            const isLast = idx === activities.length - 1;
            return (
              <div key={item.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-[22px] h-[22px] bg-[#10B981] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-white" strokeWidth={3.5} />
                  </div>
                  {!isLast && (
                    <div className="w-[1.5px] h-full bg-border-default -mb-1 mt-1 rounded-full" />
                  )}
                </div>
                <div className="pb-6">
                  <h4 className="text-[14px] font-bold text-foreground mb-1 leading-none">
                    {item.title}
                  </h4>
                  <p className="text-[12px] text-foreground-muted">
                    {item.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
