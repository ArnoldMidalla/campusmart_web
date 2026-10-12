"use client";

import { useState, Suspense } from "react";
import {
  MoreVertical,
  Phone,
  MapPin,
  Clock,
  Check,
} from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import {
  DispatchHeader,
  DispatchBottomSheet,
  DispatchRadioOption,
  DispatchAvatar,
  DispatchBadge,
} from "../../components";
import { useDispatchContext } from "../../context";

function ActiveDeliveryContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const deliveryId = String(params.id || "4820");
  const { riders, activeDeliveries, reassignDelivery } = useDispatchContext();

  const matchedDelivery = activeDeliveries.find(
    (d) => d.id === deliveryId || d.orderNumber === `#CM-${deliveryId}`
  );

  // Current assigned rider state
  const [currentAssignment, setCurrentAssignment] = useState({
    orderNumber: matchedDelivery?.orderNumber || `#CM-${deliveryId}`,
    riderName: matchedDelivery?.riderName || "Tunde Okafor",
    initials: matchedDelivery?.initials || "TU",
    statusText: matchedDelivery?.statusText || "In transit · 2.1 km left",
    phone: matchedDelivery?.phone || "+234 802 334 5566",
  });

  // Reassign sheet state - open by default or when reassign param is true
  const [isReassignSheetOpen, setIsReassignSheetOpen] = useState<boolean>(
    searchParams.get("reassign") !== "false"
  );
  const [selectedRiderId, setSelectedRiderId] = useState<string>(
    String(riders[1]?.id || "2")
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleConfirmReassign = () => {
    const selected = riders.find((r) => String(r.id) === String(selectedRiderId));
    if (selected) {
      reassignDelivery(deliveryId, selected.id);
      setCurrentAssignment({
        orderNumber: currentAssignment.orderNumber,
        riderName: selected.name,
        initials: selected.initials,
        statusText: `Reassigned · ${selected.distance || "Near campus"}`,
        phone: selected.phone,
      });
      setIsReassignSheetOpen(false);
      setSuccessToast(`Delivery reassigned to ${selected.name}`);
      setTimeout(() => setSuccessToast(null), 3000);
    }
  };

  return (
    <main className="flex-1 flex flex-col pb-32">
      {/* Header */}
      <DispatchHeader
        variant="detail"
        title="Active Delivery"
        backHref="/dispatch/riders"
        rightAction={
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="More options"
              className="w-12 h-12 bg-white rounded-[14px] flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-border-default shrink-0 transition-active hover:bg-gray-50"
            >
              <MoreVertical size={20} className="text-foreground" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-border-default overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <div className="flex flex-col">
                  <a
                    href={`tel:${currentAssignment.phone}`}
                    className="px-4 py-3 text-[13px] font-medium text-foreground text-left hover:bg-gray-50 transition-colors border-b border-border-default/50"
                  >
                    Call assigned rider
                  </a>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsReassignSheetOpen(true);
                    }}
                    className="px-4 py-3 text-[13px] font-medium text-main text-left hover:bg-gray-50 transition-colors border-b border-border-default/50"
                  >
                    Reassign rider
                  </button>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-[13px] font-medium text-red-600 text-left hover:bg-gray-50 transition-colors"
                  >
                    Report delivery issue
                  </button>
                </div>
              </div>
            )}
          </div>
        }
      />

      {/* Success Toast */}
      {successToast && (
        <div className="px-6 mb-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0">
              <Check size={16} strokeWidth={3} />
            </div>
            <p className="text-[13px] font-semibold">{successToast}</p>
          </div>
        </div>
      )}

      {/* Current Assignment Section */}
      <div className="px-6 mb-6">
        <h2 className="text-[14px] font-bold text-foreground mb-3">
          Current assignment
        </h2>

        <div className="bg-white rounded-[1.5rem] p-4 shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-border-default/50 flex items-center justify-between">
          <div className="flex items-center gap-3.5 min-w-0">
            <DispatchAvatar
              initials={currentAssignment.initials}
              colorTheme="blue"
              size="md"
            />
            <div className="min-w-0">
              <h3 className="text-[14px] font-bold text-foreground truncate">
                {currentAssignment.orderNumber} &middot;{" "}
                {currentAssignment.riderName}
              </h3>
              <p className="text-[12px] text-foreground-muted truncate">
                {currentAssignment.statusText}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsReassignSheetOpen(true)}
            className="bg-white border border-border-default hover:bg-gray-50 text-foreground text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors shrink-0 shadow-sm"
          >
            Change
          </button>
        </div>
      </div>

      {/* Route & Delivery Details */}
      <div className="px-6 mb-6">
        <h2 className="text-[14px] font-bold text-foreground mb-3">
          Route details
        </h2>

        <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-border-default/50 space-y-4">
          {/* Waypoints */}
          <div className="relative pl-6 space-y-4 border-l-2 border-dashed border-gray-200 ml-2">
            <div className="relative">
              <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-main border-2 border-white" />
              <p className="text-[11px] font-bold uppercase tracking-wider text-main">
                Pickup Point
              </p>
              <p className="text-[13px] font-bold text-foreground">
                Faculty of Science (Lab 3)
              </p>
              <p className="text-[12px] text-foreground-muted">
                Seller: Kemi&apos;s Thrift Corner
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />
              <p className="text-[11px] font-bold uppercase tracking-wider text-green-600">
                Drop-off Location
              </p>
              <p className="text-[13px] font-bold text-foreground">
                Moremi Hall, Block B, Room 204
              </p>
              <p className="text-[12px] text-foreground-muted">
                Recipient: Bola Ogun
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border-default/60">
            <div className="bg-gray-50/70 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-foreground-muted text-xs mb-1">
                <Clock size={14} className="text-main" />
                <span>Est. Arrival</span>
              </div>
              <p className="text-[14px] font-bold text-foreground">6 mins</p>
            </div>
            <div className="bg-gray-50/70 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-foreground-muted text-xs mb-1">
                <MapPin size={14} className="text-blue-500" />
                <span>Remaining</span>
              </div>
              <p className="text-[14px] font-bold text-foreground">2.1 km</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-border-default/50 px-6 py-4 pb-8 z-30">
        <div className="max-w-md mx-auto flex gap-3">
          <a
            href={`tel:${currentAssignment.phone}`}
            aria-label="Call assigned rider"
            className="w-14 h-14 bg-white border border-border-default rounded-2xl flex items-center justify-center shrink-0 hover:bg-gray-50 transition-colors shadow-sm text-foreground"
          >
            <Phone size={20} />
          </a>
          <button
            onClick={() => setIsReassignSheetOpen(true)}
            className="flex-1 bg-main hover:bg-main-light text-white py-4 rounded-2xl font-bold text-[15px] transition-colors shadow-[0_4px_15px_rgba(255,104,31,0.25)] flex items-center justify-center"
          >
            Reassign rider
          </button>
        </div>
      </div>

      {/* Choose a Rider Bottom Sheet */}
      <DispatchBottomSheet
        isOpen={isReassignSheetOpen}
        onClose={() => setIsReassignSheetOpen(false)}
        title="Choose a rider"
        subtitle="Showing riders online near Yaba campus."
      >
        <div className="space-y-3 mb-6">
          {riders.map((rider) => (
            <DispatchRadioOption
              key={rider.id}
              isSelected={String(selectedRiderId) === String(rider.id)}
              onSelect={() => setSelectedRiderId(String(rider.id))}
              title={rider.name}
              subtitle={`★ ${rider.rating} · ${rider.activeCount} active · ${rider.distance || "Near campus"}`}
              icon={
                <DispatchAvatar
                  initials={rider.initials}
                  colorTheme="green"
                  size="md"
                />
              }
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleConfirmReassign}
          className="w-full bg-main hover:bg-main-light text-white py-4 rounded-2xl font-bold text-[15px] transition-colors shadow-[0_4px_15px_rgba(255,104,31,0.25)] flex items-center justify-center"
        >
          Reassign delivery
        </button>
      </DispatchBottomSheet>
    </main>
  );
}

export default function ActiveDeliveryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-surface-muted flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-main border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ActiveDeliveryContent />
    </Suspense>
  );
}
