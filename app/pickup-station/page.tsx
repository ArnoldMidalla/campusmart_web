"use client";

import { useState, useEffect } from "react";
import { Check, Copy, MapPin } from "lucide-react";
import AppShell from "../components/AppShell";
import PageHeader from "../components/PageHeader";
import { usePickupStore, type PickupStation } from "../store/usePickupStore";
import { useRouter } from "next/navigation";

const PICKUP_STATIONS: PickupStation[] = [
  {
    id: 1,
    name: "Ireti Bakare Complex - Unilag",
    address: "Unilag Main Shopping Complex, Dan Fodio St, University of Lagos Campus, Yaba, Lagos.",
    contactName: "Ireti Bakare",
    contactPhone: "07012345678",
    openingHours: ["Mon - Fri: 8am - 6pm", "Sat: 9am - 5pm"],
  },
  {
    id: 2,
    name: "Gate Plaza - Unilag",
    address: "Main Gate Area, University of Lagos, Akoka, Yaba, Lagos.",
    contactName: "Emeka Chukwu",
    contactPhone: "08034567890",
    openingHours: ["Mon - Fri: 7am - 7pm", "Sat: 8am - 4pm"],
  },
  {
    id: 3,
    name: "Faculty of Science Hub",
    address: "Faculty of Science Building, University of Lagos, Yaba, Lagos.",
    contactName: "Amaka Osei",
    contactPhone: "09011223344",
    openingHours: ["Mon - Fri: 9am - 5pm", "Sat: Closed"],
  },
  {
    id: 4,
    name: "Student Union Hub",
    address: "Student Union Building, University of Lagos, Akoka, Lagos.",
    contactName: "Tunde Adeyemi",
    contactPhone: "08123456789",
    openingHours: ["Mon - Sat: 8am - 8pm", "Sun: 10am - 4pm"],
  },
  {
    id: 5,
    name: "Yaba Tech Station",
    address: "Yaba College of Technology, Herbert Macaulay Way, Yaba, Lagos.",
    contactName: "Ngozi Eze",
    contactPhone: "07055667788",
    openingHours: ["Mon - Fri: 8am - 5pm", "Sat: 9am - 1pm"],
  },
  {
    id: 6,
    name: "Moremi Hall Pickup Point",
    address: "Moremi Hall of Residence, University of Lagos, Yaba, Lagos.",
    contactName: "Fatima Bello",
    contactPhone: "08099887766",
    openingHours: ["Mon - Fri: 7am - 9pm", "Sat - Sun: 9am - 6pm"],
  },
  {
    id: 7,
    name: "Mariere Hall Pickup Point",
    address: "Mariere Hall, University of Lagos Campus, Yaba, Lagos.",
    contactName: "David Okonkwo",
    contactPhone: "07033445566",
    openingHours: ["Mon - Fri: 8am - 7pm", "Sat: 9am - 3pm"],
  },
  {
    id: 8,
    name: "Babs Fafunwa Multipurpose Centre",
    address: "Babs Fafunwa Complex, University of Lagos, Akoka, Yaba, Lagos.",
    contactName: "Chisom Nwachukwu",
    contactPhone: "08144556677",
    openingHours: ["Mon - Fri: 9am - 6pm", "Sat: 10am - 2pm"],
  },
  {
    id: 9,
    name: "Engineering Faculty Station",
    address: "Faculty of Engineering, University of Lagos, Yaba, Lagos.",
    contactName: "Seun Ajayi",
    contactPhone: "08077889900",
    openingHours: ["Mon - Fri: 8am - 6pm", "Sat: Closed"],
  },
];

export default function PickupStationPage() {
  const router = useRouter();
  const { selectedStation, setSelectedStation } = usePickupStore();
  const [localSelected, setLocalSelected] = useState<PickupStation | null>(null);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLocalSelected(selectedStation);
  }, [selectedStation]);

  if (!mounted) return null;

  const handleSelect = (station: PickupStation) => {
    setLocalSelected((prev) =>
      prev?.id === station.id ? null : station
    );
  };

  const handleConfirm = () => {
    if (localSelected) {
      setSelectedStation(localSelected);
      router.back();
    }
  };

  const handleCopy = (text: string) => {
    const succeed = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(succeed).catch(() => fallbackCopy(text, succeed));
    } else {
      fallbackCopy(text, succeed);
    }
  };

  const fallbackCopy = (text: string, onSuccess: () => void) => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand("copy");
      onSuccess();
    } catch (_) {}
    document.body.removeChild(ta);
  };

  return (
    <>
      <AppShell noBottomPad>
        {/* Page header */}
        <div className="flex flex-col gap-2 pb-4">
          <div className="px-5">
            <PageHeader title="Select Pickup Station" />
          </div>
          <div className="w-full h-0.5 rounded-full bg-neutral-200" />
        </div>

        {/* Station list */}
        <div className="flex flex-col gap-3 px-5 pb-32">
          {PICKUP_STATIONS.map((station) => {
            const isSelected = localSelected?.id === station.id;

            return (
              <div
                key={station.id}
                role="button"
                tabIndex={0}
                onClick={() => handleSelect(station)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleSelect(station)}
                className="w-full text-left cursor-pointer"
              >
                <div
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isSelected
                      ? "border-neutral-300 shadow-sm"
                      : "border-neutral-200 bg-neutral-50"
                  }`}
                >
                  {/* Top row — radio + name + address */}
                  <div className="flex gap-3 items-start p-4">
                    {/* Radio circle */}
                    <div className="shrink-0 mt-0.5">
                      {isSelected ? (
                        <div className="size-6 rounded-full bg-main flex items-center justify-center shadow-md shadow-orange-200">
                          <Check size={13} color="white" strokeWidth={3} />
                        </div>
                      ) : (
                        <div className="size-6 rounded-full border-2 border-neutral-300 bg-white" />
                      )}
                    </div>

                    {/* Name + address */}
                    <div className="flex flex-col gap-0.5">
                      <p className="font-semibold text-sm leading-tight text-neutral-900">
                        {station.name}
                      </p>
                      <p className="text-xs text-neutral-500 leading-relaxed">
                        {station.address}
                      </p>
                    </div>
                  </div>

                  {/* Expanded dropdown when selected */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isSelected ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="mx-4 mb-4 border-t border-neutral-200 pt-3 flex flex-col gap-3">
                      {/* Contact Information */}
                      <div className="flex flex-col gap-1">
                        <p className="text-xs font-semibold text-neutral-800">
                          Contact Information
                        </p>
                        <p className="text-xs text-neutral-500">
                          {station.contactName}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-neutral-500">
                            {station.contactPhone}
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(station.contactPhone);
                            }}
                            className="text-main transition-transform active:scale-90"
                            aria-label="Copy phone number"
                          >
                            {copied ? (
                              <Check size={16} strokeWidth={2.5} />
                            ) : (
                              <Copy size={16} strokeWidth={2} />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Opening Hours */}
                      <div className="flex flex-col gap-1">
                        <p className="text-xs font-semibold text-neutral-800">
                          Opening Hours
                        </p>
                        {station.openingHours.map((line, i) => (
                          <p key={i} className="text-xs text-neutral-500">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AppShell>

      {/* Sticky confirm button */}
      <main className="fixed bottom-0 left-0 lg:left-60 xl:left-64 right-0 flex justify-center pb-6 font-dmSans tracking-tight z-50">
        <div className="backdrop-blur-xs flex justify-center items-center py-2 px-2 rounded-full border border-neutral-200 w-[80%] bg-white/30 max-w-sm gap-2">
          <div className="w-full flex justify-center">
            <p className="text-neutral-700 font-medium text-sm truncate px-2">
              {localSelected ? localSelected.name : "No station selected"}
            </p>
          </div>
          <button
            className="w-full h-10 rounded-full border bg-main border-neutral-200 disabled:opacity-40 transition-all duration-300"
            onClick={handleConfirm}
            disabled={!localSelected}
          >
            <p className="font-medium text-sm text-white">Confirm</p>
          </button>
        </div>
      </main>
    </>
  );
}
