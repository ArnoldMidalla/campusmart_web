"use client";

import { useState } from "react";
import {
  Bike,
  Truck,
  MoreVertical,
  Plus,
  MapPin,
  X,
  Check,
} from "lucide-react";
import DispatchNav from "../../components/DispatchNav";
import Link from "next/link";
import { DispatchHeader, DispatchAvatar, DispatchBadge } from "../components";
import { useDispatchContext } from "../context";

export default function DispatchRidersPage() {
  const {
    riders,
    activeDeliveries,
    onlineRidersCount,
    activeDeliveriesCount,
    registerRider,
  } = useDispatchContext();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isMapViewModalOpen, setIsMapViewModalOpen] = useState(false);
  const [newRiderName, setNewRiderName] = useState("");
  const [newRiderPhone, setNewRiderPhone] = useState("");
  const [newRiderVehicle, setNewRiderVehicle] = useState("Bike");

  const handleRegisterRider = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRiderName.trim()) return;
    registerRider({
      fullName: newRiderName,
      phone: newRiderPhone || "+234 800 000 0000",
      email: `${newRiderName.toLowerCase().replace(/\s+/g, ".")}@campusmart.ng`,
      vehicleType: newRiderVehicle,
    });
    setIsRegisterModalOpen(false);
    setNewRiderName("");
    setNewRiderPhone("");
  };

  return (
    <main className="flex-1 flex flex-col pb-36">
      {/* Header */}
      <DispatchHeader
        variant="root"
        title="Dispatch"
        subtitle="Riders, deliveries and issues"
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
                    Broadcast alert to riders
                  </button>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-[13px] font-medium text-foreground text-left hover:bg-gray-50 transition-colors"
                  >
                    Dispatch settings
                  </button>
                </div>
              </div>
            )}
          </div>
        }
      />

      {/* Top 2 Metric Cards */}
      <div className="px-6 grid grid-cols-2 gap-4 mb-6">
        {/* Riders Online Card */}
        <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-border-default/50 flex flex-col justify-between">
          <div className="w-10 h-10 bg-orange-50 text-main rounded-[12px] flex items-center justify-center mb-4">
            <Bike size={20} />
          </div>
          <div>
            <h2 className="text-[26px] font-bold text-foreground leading-none mb-1">
              {onlineRidersCount}
            </h2>
            <p className="text-xs text-foreground-muted">Riders online</p>
          </div>
        </div>

        {/* Active Deliveries Card */}
        <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-border-default/50 flex flex-col justify-between">
          <div className="w-10 h-10 bg-orange-50 text-main rounded-[12px] flex items-center justify-center mb-4">
            <Truck size={20} />
          </div>
          <div>
            <h2 className="text-[26px] font-bold text-foreground leading-none mb-1">
              {activeDeliveriesCount}
            </h2>
            <p className="text-xs text-foreground-muted">Active deliveries</p>
          </div>
        </div>
      </div>

      {/* Active Deliveries Section */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[16px] font-bold text-foreground">
            Active deliveries
          </h2>
          <button
            onClick={() => setIsMapViewModalOpen(true)}
            className="text-[13px] font-semibold text-main hover:opacity-80 transition-opacity"
          >
            Map view
          </button>
        </div>

        <div className="bg-white rounded-[1.5rem] shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-border-default/50 overflow-hidden">
          {activeDeliveries.map((delivery, index) => {
            const isLast = index === activeDeliveries.length - 1;

            return (
              <div
                key={delivery.id}
                className={`p-4 flex items-center justify-between gap-3 transition-colors hover:bg-gray-50/50 ${
                  !isLast ? "border-b border-border-default/60" : ""
                }`}
              >
                <Link
                  href={`/dispatch/deliveries/${delivery.id}`}
                  className="flex items-center gap-3.5 min-w-0 flex-1"
                >
                  {/* Initials Avatar */}
                  <DispatchAvatar
                    initials={delivery.initials}
                    colorTheme={delivery.avatarColor === "blue" ? "blue" : "gray"}
                    size="md"
                  />

                  {/* Info */}
                  <div className="min-w-0">
                    <h3 className="text-[14px] font-bold text-foreground truncate">
                      {delivery.orderNumber} &middot; {delivery.riderName}
                    </h3>
                    <p className="text-[12px] text-foreground-muted truncate">
                      {delivery.statusText}
                    </p>
                  </div>
                </Link>

                {/* Action Button */}
                <div className="shrink-0">
                  {delivery.isIssue ? (
                    <Link
                      href={`/dispatch/orders/${delivery.id}`}
                      className="bg-red-50/50 border border-red-100 hover:bg-red-50 text-[#E34149] rounded-xl px-3 py-1.5 text-xs font-semibold shadow-sm inline-block transition-colors"
                    >
                      Review
                    </Link>
                  ) : (
                    <Link
                      href={`/dispatch/deliveries/${delivery.id}?reassign=true`}
                      className="bg-white border border-border-default hover:bg-gray-50 rounded-xl px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm transition-colors inline-block"
                    >
                      Reassign
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Riders Section */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[16px] font-bold text-foreground">Riders</h2>
          <span className="text-[13px] font-semibold text-main cursor-pointer hover:opacity-80">
            See all
          </span>
        </div>

        <div className="bg-white rounded-[1.5rem] shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-border-default/50 overflow-hidden">
          {riders.map((rider, index) => {
            const isLast = index === riders.length - 1;

            return (
              <div
                key={rider.id}
                className={`p-4 flex items-center justify-between gap-3 transition-colors hover:bg-gray-50/50 ${
                  !isLast ? "border-b border-border-default/60" : ""
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Avatar */}
                  <DispatchAvatar
                    initials={rider.initials}
                    colorTheme="green"
                    size="md"
                  />

                  {/* Info */}
                  <div className="min-w-0">
                    <h3 className="text-[14px] font-bold text-foreground truncate">
                      {rider.name}
                    </h3>
                    <p className="text-[12px] text-foreground-muted truncate">
                      {rider.vehicle} &middot; ★ {rider.rating} &middot;{" "}
                      {rider.activeCount} active
                    </p>
                  </div>
                </div>

                {/* Online Badge */}
                <DispatchBadge status={rider.status} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed Register Rider CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-border-default/50 px-6 py-4 pb-8 z-30">
        <div className="max-w-md mx-auto">
          <Link
            href="/dispatch/riders/register"
            className="w-full bg-main text-white py-4 rounded-2xl font-bold text-[14px] flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(255,104,31,0.25)] hover:bg-main-light transition-colors"
          >
            <Plus size={18} strokeWidth={2.5} />
            Register Rider
          </Link>
        </div>
      </div>

      {/* Register Rider Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] p-6 w-full max-w-[340px] shadow-2xl animate-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[18px] font-bold text-foreground">
                Register New Rider
              </h3>
              <button
                onClick={() => setIsRegisterModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-foreground-muted"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleRegisterRider} className="space-y-3.5">
              <div>
                <label className="text-[12px] font-semibold text-foreground-muted block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Ade"
                  value={newRiderName}
                  onChange={(e) => setNewRiderName(e.target.value)}
                  className="w-full bg-gray-50 border border-border-default rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-main"
                />
              </div>

              <div>
                <label className="text-[12px] font-semibold text-foreground-muted block mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+234..."
                  value={newRiderPhone}
                  onChange={(e) => setNewRiderPhone(e.target.value)}
                  className="w-full bg-gray-50 border border-border-default rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-main"
                />
              </div>

              <div>
                <label className="text-[12px] font-semibold text-foreground-muted block mb-1">
                  Vehicle Type
                </label>
                <select
                  value={newRiderVehicle}
                  onChange={(e) => setNewRiderVehicle(e.target.value)}
                  className="w-full bg-gray-50 border border-border-default rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-main"
                >
                  <option value="Bike">Bicycle / Bike</option>
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="On Foot">On Foot</option>
                </select>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="flex-1 border border-border-default py-3.5 rounded-xl font-bold text-sm text-foreground hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-main text-white py-3.5 rounded-xl font-bold text-sm hover:bg-main-light transition-colors"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Map View Telemetry Modal */}
      {isMapViewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] p-6 w-full max-w-[340px] text-center shadow-2xl animate-in zoom-in duration-200">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-[18px] mx-auto flex items-center justify-center mb-4">
              <MapPin size={26} />
            </div>
            <h4 className="text-[18px] font-bold text-foreground mb-1">
              Campus Fleet Map
            </h4>
            <p className="text-[13px] text-foreground-muted mb-6 leading-relaxed">
              18 active couriers distributed across University of Lagos campus zones.
            </p>
            <div className="bg-gray-50 rounded-xl p-3 text-left text-xs text-foreground-muted mb-6 space-y-2">
              <p>• <strong>Zone A (Hostels)</strong>: 8 riders</p>
              <p>• <strong>Zone B (Faculties)</strong>: 6 riders</p>
              <p>• <strong>Zone C (Main Gate)</strong>: 4 riders</p>
            </div>
            <button
              onClick={() => setIsMapViewModalOpen(false)}
              className="w-full bg-[#222222] text-white rounded-xl py-3.5 font-bold text-[14px] hover:bg-black transition-colors"
            >
              Close Map
            </button>
          </div>
        </div>
      )}

      <DispatchNav />
    </main>
  );
}
