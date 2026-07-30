"use client";

import { Phone } from "lucide-react";
import Nav from "../../../components/nav";
import PageHeader from "../../../components/PageHeader";
import PageHero from "../../../components/PageHero";
import InfoBanner from "../../../components/InfoBanner";
import { phoneLines } from "../../../lib/data";

/* Check if within working hours (12:00 AM – 11:59 PM = always open for demo) */
function isOpenNow() {
  const h = new Date().getHours();
  return h >= 0 && h < 24; // always open per the mockup schedule
}

export default function CallUsPage() {
  const open = isOpenNow();

  return (
    <>
      <main className="pb-28 pt-8 px-6 md:ml-64">
        <PageHeader title="Call Us" showBack={true} />

        <PageHero
          icon={Phone}
          title="Get in Touch"
          subtitle="Our team is available to assist you"
        />

        <div className="flex flex-col gap-7">

          {/* Working hours */}
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
              <Phone size={16} className="text-main" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-800">Working Hours</p>
              <p className="text-xs text-neutral-500">Monday – Sunday: 12:00 AM – 11:59 PM</p>
            </div>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 ${
                open ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"
              }`}
            >
              {open ? "Open now" : "Closed"}
            </span>
          </div>

          {/* Phone lines */}
          <section className="flex flex-col gap-1">
            <p className="text-xs font-semibold tracking-widest text-neutral-400 uppercase mb-3">
              Phone Lines
            </p>

            {phoneLines.map((line) => {
              const Icon = line.icon;
              return (
                <a
                  key={line.label}
                  href={line.tel}
                  className="flex items-center gap-4 py-3 group"
                >
                  <div
                    className={`size-10 rounded-full flex items-center justify-center shrink-0 ${line.iconBg}`}
                  >
                    <Icon size={18} className={line.iconColor} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-800">{line.label}</p>
                    <p className={`text-sm font-medium ${line.numColor}`}>{line.number}</p>
                  </div>
                </a>
              );
            })}
          </section>

          {/* Disclaimer banner */}
          <InfoBanner
            text="Standard call rates may apply. WhatsApp messages are free with internet connection."
          />

        </div>
      </main>

      <Nav />
    </>
  );
}
