"use client";

import { use, useState } from "react";
import Image from "next/image";
import { MoreVertical, Check } from "lucide-react";
import PageHeader from "@/app/components/PageHeader";
import { useSellerOrder, useUpdateOrderStatus } from "@/lib/api/hooks/useSellerOrders";
import { type OrderStatus } from "@/types";
import { cn } from "@/lib/utils/cn";
import Modal from "@/app/components/Modal";

// --- Types & Constants ---
const MOCK_EXTRA = {
  buyerPhone: "+234 801 234 5678",
  buyerAddress: "12 Allen Avenue, Ikeja, Lagos\nNigeria",
  deliveryFee: 1500,
  serviceFee: 200,
  productSize: "L",
  productColor: "Black",
  placedAt: "June 22, 2026 • 2:30 PM",
};

const STEPS: { label: string; status: OrderStatus | "In Transit" | "Delivered" }[] = [
  { label: "Confirmed",  status: "Awaiting drop-off" },
  { label: "Picked Up",  status: "Dropped off" },
  { label: "In Transit", status: "In Transit" },
  { label: "Delivered",  status: "Delivered" },
];

function stepIndex(status: OrderStatus): number {
  if (status === "Awaiting drop-off") return 0;
  if (status === "Dropped off")       return 1;
  if (status === "Completed")         return 2;
  return -1;
}

// --- Components ---
function ProgressTracker({ status }: { status: OrderStatus }) {
  const reached = stepIndex(status);

  return (
    <div className="flex items-start justify-between relative px-2">
      {STEPS.map((_, i) =>
        i < STEPS.length - 1 ? (
          <div
            key={`line-${i}`}
            className={cn(
              "absolute top-[14px] h-[2px] transition-colors",
              i < reached ? "bg-seller-main" : "bg-neutral-200"
            )}
            style={{
              left: `calc(${(i / (STEPS.length - 1)) * 100}% + 14px)`,
              width: `calc(${100 / (STEPS.length - 1)}% - 28px)`,
            }}
          />
        ) : null
      )}

      {STEPS.map((step, i) => {
        const done = i <= reached;
        return (
          <div key={step.label} className="flex flex-col items-center gap-1.5 z-10">
            <div
              className={cn(
                "size-7 rounded-full flex items-center justify-center border-2 transition-colors",
                done ? "bg-seller-main border-seller-main" : "bg-card border-border-default"
              )}
            >
              {done && <Check size={13} strokeWidth={3} className="text-white" />}
            </div>
            <p className={cn("text-[11px] font-semibold text-center", done ? "text-seller-main" : "text-foreground-muted")}>
              {step.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const styles: Record<OrderStatus, string> = {
    "Awaiting drop-off": "bg-amber-100 text-amber-600",
    "Dropped off":       "bg-blue-100 text-blue-600",
    "Completed":         "bg-green-100 text-green-600",
    "Cancelled":         "bg-red-100 text-red-600",
  };
  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-bold w-fit", styles[status])}>
      {status}
    </span>
  );
}

function ctaLabel(status: OrderStatus): string {
  if (status === "Awaiting drop-off") return "Mark as Picked Up";
  if (status === "Dropped off")       return "Mark as Delivered";
  return "Order Completed";
}

function nextStatus(status: OrderStatus): OrderStatus | null {
  if (status === "Awaiting drop-off") return "Dropped off";
  if (status === "Dropped off")       return "Completed";
  return null;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-bold text-foreground-muted uppercase tracking-widest px-1">{children}</p>;
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: order, isLoading, isError } = useSellerOrder(id);
  const { mutate: updateStatus, isPending } = useUpdateOrderStatus();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);

  if (isLoading) {
    return (
      <main className="flex flex-col w-full max-w-md min-h-dvh bg-surface-muted">
        <div className="bg-card px-4 pt-10 pb-4">
          <PageHeader title="Order Details" showBack />
        </div>
        <div className="flex items-center justify-center py-32 text-foreground-muted text-sm">Loading...</div>
      </main>
    );
  }

  if (isError || !order) {
    return (
      <main className="flex flex-col w-full max-w-md min-h-dvh bg-surface-muted">
        <div className="bg-card px-4 pt-10 pb-4">
          <PageHeader title="Order Details" showBack />
        </div>
        <div className="flex items-center justify-center py-32 text-red-400 text-sm">Order not found.</div>
      </main>
    );
  }

  const subtotal = order.price * order.quantity;
  const total    = subtotal + MOCK_EXTRA.deliveryFee + MOCK_EXTRA.serviceFee;
  const next     = nextStatus(order.status);
  const initials = order.buyerName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <main className="flex flex-col w-full max-w-md min-h-dvh bg-surface-muted pb-40">
      <div className="bg-card px-4 pt-10 pb-4">
        <PageHeader
          title="Order Details"
          showBack
          rightItems={
            <button onClick={() => setIsCancelModalOpen(true)} className="p-1 rounded-full hover:bg-surface-muted transition">
              <MoreVertical size={20} />
            </button>
          }
        />
      </div>

      <div className="flex flex-col gap-4 px-4 py-4">
        <div className="bg-card rounded-3xl p-5 border border-border-default flex flex-col gap-3">
          <div>
            <p className="text-base font-bold text-foreground">Order #{order.orderId}</p>
            <p className="text-xs text-foreground-muted mt-0.5">Placed {MOCK_EXTRA.placedAt}</p>
          </div>
          <StatusBadge status={order.status} />
        </div>

        <div className="bg-card rounded-3xl p-5 border border-border-default">
          <ProgressTracker status={order.status} />
        </div>

        <SectionLabel>Buyer Information</SectionLabel>
        <div className="bg-card rounded-3xl p-4 border border-border-default flex items-start gap-4">
          <div className="size-11 rounded-full bg-seller-main/15 flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-seller-main">{initials}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-bold text-foreground">{order.buyerName}</p>
            <p className="text-xs text-foreground-muted">{MOCK_EXTRA.buyerPhone}</p>
            <p className="text-xs text-foreground-muted leading-relaxed whitespace-pre-line">{MOCK_EXTRA.buyerAddress}</p>
          </div>
        </div>

        <SectionLabel>Item Ordered</SectionLabel>
        <div className="bg-card rounded-3xl p-4 border border-border-default flex items-center gap-4">
          <div className="relative size-14 rounded-2xl overflow-hidden bg-surface-muted shrink-0">
            <Image src={order.productImage} alt={order.productName} fill className="object-cover" sizes="56px" />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-bold text-foreground">{order.productName}</p>
            <p className="text-xs text-foreground-muted">Qty: {order.quantity} • Size: {MOCK_EXTRA.productSize} • Color: {MOCK_EXTRA.productColor}</p>
            <p className="text-sm font-bold text-seller-main mt-1">₦{order.price.toLocaleString("en-NG")}</p>
          </div>
        </div>

        <SectionLabel>Payment Summary</SectionLabel>
        <div className="bg-card rounded-3xl p-5 border border-border-default flex flex-col gap-0">
          {[
            { label: "Subtotal",     value: subtotal,                    bold: false },
            { label: "Delivery Fee", value: MOCK_EXTRA.deliveryFee,      bold: false },
            { label: "Service Fee",  value: MOCK_EXTRA.serviceFee,       bold: false },
          ].map(({ label, value, bold }) => (
            <div key={label} className="flex items-center justify-between py-3 border-b border-border-default">
              <p className={cn("text-sm text-foreground-muted", bold && "font-bold text-foreground")}>{label}</p>
              <p className={cn("text-sm text-foreground", bold && "font-bold text-seller-main")}>₦{value.toLocaleString("en-NG")}</p>
            </div>
          ))}
          <div className="flex items-center justify-between pt-3">
            <p className="text-sm font-bold text-foreground">Total</p>
            <p className="text-base font-bold text-seller-main">₦{total.toLocaleString("en-NG")}</p>
          </div>
        </div>
      </div>

      {next && (
        <div className="fixed bottom-0 left-0 w-full flex justify-center pb-8 px-4 z-30 pointer-events-none">
          <div className="w-full max-w-md pointer-events-auto">
            <button disabled={isPending} onClick={() => setIsActionModalOpen(true)} className="w-full py-4 rounded-full bg-seller-main text-white font-bold text-sm disabled:opacity-50 transition active:scale-[0.98]">
              {isPending ? "Updating..." : ctaLabel(order.status)}
            </button>
          </div>
        </div>
      )}

      <Modal isOpen={isCancelModalOpen} onClose={() => setIsCancelModalOpen(false)} title="Cancel this Order?">
        <p className="text-sm text-foreground-muted mb-6 mt-2">
          Are you sure you want to cancel this order? This action cannot be undone.
        </p>
        <div className="flex flex-col gap-3">
          <button onClick={() => { updateStatus({ id: order.id, status: "Cancelled" }); setIsCancelModalOpen(false); }} className="w-full py-4 rounded-full bg-red-500 text-white font-bold text-sm transition active:scale-[0.98]">
            Yes, Cancel Order
          </button>
          <button onClick={() => setIsCancelModalOpen(false)} className="w-full py-4 rounded-full bg-card border border-border-default text-foreground font-bold text-sm transition active:scale-[0.98]">
            No, Keep Order
          </button>
        </div>
      </Modal>

      <Modal isOpen={isActionModalOpen} onClose={() => setIsActionModalOpen(false)} title={ctaLabel(order.status) + "?"}>
        <p className="text-sm text-foreground-muted mb-6 mt-2">
          Confirm that this order has been {next === "Dropped off" ? "dropped off at the hub" : next === "Completed" ? "delivered to the buyer" : "processed"}.
        </p>
        <div className="flex flex-col gap-3">
          <button disabled={isPending} onClick={() => { if (next) { updateStatus({ id: order.id, status: next }); setIsActionModalOpen(false); } }} className="w-full py-4 rounded-full bg-seller-main text-white font-bold text-sm disabled:opacity-50 transition active:scale-[0.98]">
            Yes, {ctaLabel(order.status)}
          </button>
          <button onClick={() => setIsActionModalOpen(false)} className="w-full py-4 rounded-full bg-card border border-border-default text-foreground font-bold text-sm transition active:scale-[0.98]">
            Cancel
          </button>
        </div>
      </Modal>
    </main>
  );
}
