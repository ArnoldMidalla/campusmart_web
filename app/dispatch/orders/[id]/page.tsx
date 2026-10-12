"use client";

import { useState } from "react";
import {
  MoreVertical,
  Check,
  Phone,
  Truck,
  MapPin,
  Clock,
  ShieldAlert,
} from "lucide-react";
import { useParams } from "next/navigation";
import { DispatchHeader, DispatchBadge } from "../../components";
import { useDispatchContext } from "../../context";

const DEFAULT_TIMELINE = [
  { id: 1, title: "Payment confirmed", time: "24 Mar · 08:02" },
  { id: 2, title: "Order accepted", time: "24 Mar · 08:11" },
  { id: 3, title: "Preparing", time: "24 Mar · 08:24" },
  { id: 4, title: "Ready for pickup", time: "24 Mar · 09:05" },
  { id: 5, title: "Rider assigned", time: "24 Mar · 09:12" },
  { id: 6, title: "Picked up", time: "24 Mar · 09:31" },
];

export default function OrderDetailPage() {
  const params = useParams();
  const { orders } = useDispatchContext();
  const matchedOrder = orders.find(
    (o) => String(o.id) === String(params.id) || o.orderNumber === `#CM-${params.id}` || o.orderNumber === params.id
  );
  const order = matchedOrder || {
    id: "4821",
    orderNumber: "#CM-4821",
    price: "₦28,000",
    status: "IN TRANSIT" as const,
    buyer: "Bola Ogun",
    store: "Kemi's Thrift Corner",
    assignedRiderName: "Tunde Okafor",
    itemCount: 2,
    tabType: "live" as const,
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInvestigateModalOpen, setIsInvestigateModalOpen] = useState(false);

  return (
    <main className="flex-1 flex flex-col pb-32">
      {/* Header */}
      <DispatchHeader
        variant="detail"
        title={`Order ${order.orderNumber}`}
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
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-[13px] font-medium text-foreground text-left hover:bg-gray-50 transition-colors border-b border-border-default/50"
                  >
                    Contact buyer
                  </button>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-[13px] font-medium text-foreground text-left hover:bg-gray-50 transition-colors border-b border-border-default/50"
                  >
                    Contact seller
                  </button>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-[13px] font-bold text-red-600 text-left hover:bg-red-50 transition-colors"
                  >
                    Cancel & refund
                  </button>
                </div>
              </div>
            )}
          </div>
        }
      />

      {/* Order Total & Summary Card */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-[1.5rem] p-6 border border-border-default/50 shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-[13px] text-foreground-muted block mb-1">
                Order total
              </span>
              <span className="text-[24px] font-bold text-foreground">
                {order.price}
              </span>
            </div>
            <DispatchBadge status={order.status} />
          </div>

          <div className="border-t border-border-default/40 pt-4 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-foreground-muted">Buyer</span>
              <span className="text-[13px] font-bold text-foreground">
                {order.buyer}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[13px] text-foreground-muted">Seller</span>
              <span className="text-[13px] font-bold text-foreground">
                {order.store}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[13px] text-foreground-muted">Rider</span>
              <span className="text-[13px] font-bold text-foreground">
                {order.assignedRiderName || "Tunde Okafor"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="px-6">
        <h3 className="text-[16px] font-bold text-foreground mb-3">
          Status timeline
        </h3>
        <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-border-default/50">
          {DEFAULT_TIMELINE.map((item, idx) => {
            const isLast = idx === DEFAULT_TIMELINE.length - 1;

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

      {/* Investigate Delivery Modal */}
      {isInvestigateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] p-6 w-full max-w-[340px] text-center shadow-2xl animate-in zoom-in duration-200">
            <div className="w-14 h-14 bg-orange-50 text-main rounded-[18px] mx-auto flex items-center justify-center mb-4">
              <Truck size={26} />
            </div>
            <h4 className="text-[17px] font-bold text-foreground mb-1">
              Live Delivery Telemetry
            </h4>
            <p className="text-[13px] text-foreground-muted mb-4 leading-relaxed">
              Rider {order.assignedRiderName || "Tunde Okafor"} is currently 450m from Faculty of Arts Drop-off.
            </p>
            <div className="bg-gray-50 rounded-xl p-3 text-left text-xs text-foreground-muted mb-6 space-y-2">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-main" />
                <span>ETA: <strong>6 minutes</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-blue-500" />
                <span>Speed: <strong>22 km/h</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldAlert size={14} className="text-green-600" />
                <span>GPS Signal: <strong>Strong</strong></span>
              </div>
            </div>
            <button
              onClick={() => setIsInvestigateModalOpen(false)}
              className="w-full bg-[#222222] text-white rounded-xl py-3.5 font-bold text-[14px] hover:bg-black transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-border-default/50 px-6 py-4 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] z-30">
        <div className="max-w-md mx-auto flex gap-3">
          <a
            href="tel:+2348012345678"
            aria-label="Call rider"
            className="w-14 h-14 bg-white border border-border-default rounded-2xl flex items-center justify-center shrink-0 hover:bg-gray-50 transition-colors shadow-sm text-foreground"
          >
            <Phone size={20} />
          </a>
          <button
            onClick={() => setIsInvestigateModalOpen(true)}
            className="flex-1 bg-[#222222] text-white hover:bg-black py-4 rounded-2xl font-bold text-[14px] transition-colors shadow-sm text-center flex items-center justify-center"
          >
            Investigate Delivery
          </button>
        </div>
      </div>
    </main>
  );
}
