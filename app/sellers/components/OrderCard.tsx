"use client";

import { useState } from "react";
import Image from "next/image";
import { MoreVertical } from "lucide-react";
import { useOrdersStore, type OrderStatus, type SellerOrder } from "@/app/store/useOrdersStore";

// ─── Status Badge ─────────────────────────────────────────────────────────────

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const styles: Record<OrderStatus, string> = {
    "Awaiting drop-off": "border-red-400 text-red-500",
    "Dropped off": "border-yellow-500 text-yellow-600",
    "Completed": "border-green-500 text-green-600",
  };
  return (
    <span
      className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${styles[status]} whitespace-nowrap`}
    >
      {status}
    </span>
  );
}

// ─── Order Card ───────────────────────────────────────────────────────────────

export default function OrderCard({ order }: { order: SellerOrder }) {
  const { updateOrderStatus } = useOrdersStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuActions: { label: string; status: OrderStatus }[] = [
    { label: "Mark as Awaiting drop-off", status: "Awaiting drop-off" },
    { label: "Mark as Dropped off", status: "Dropped off" },
    { label: "Mark as Completed", status: "Completed" },
  ];

  return (
    <div className="bg-white rounded-lg px-3 py-3 flex flex-col gap-2 shadow-sm">
      {/* Top row */}
      <div className="flex items-start gap-3">
        {/* Thumbnail */}
        <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-neutral-100">
          <Image src={order.productImage} alt={order.productName} fill className="object-cover" />
        </div>

        {/* Name + ID */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-neutral-900 truncate">{order.productName}</p>
          <p className="text-[11px] text-neutral-400 mt-0.5">ID {order.orderId}</p>
        </div>

        {/* Badge + menu */}
        <div className="flex items-center gap-1 shrink-0">
          <OrderStatusBadge status={order.status} />
          <div className="relative">
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="p-1 rounded-full hover:bg-neutral-100 transition"
            >
              <MoreVertical size={20} />
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-7 z-20 bg-white rounded-xl shadow-xl border border-neutral-100 py-1 w-52 overflow-hidden">
                  {menuActions.map((a) => (
                    <button
                      key={a.label}
                      onClick={() => { updateOrderStatus(order.id, a.status); setMenuOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-neutral-50 transition ${
                        order.status === a.status ? "text-[#13368B] font-semibold" : "text-neutral-700"
                      }`}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-3 gap-2 pt-1 border-t border-neutral-100">
        <div>
          <p className="text-[10px] text-neutral-400">Category</p>
          <p className="text-xs font-semibold text-neutral-800 mt-0.5">{order.category}</p>
        </div>
        <div>
          <p className="text-[10px] text-neutral-400">Price</p>
          <p className="text-xs font-semibold text-neutral-800 mt-0.5">
            ₦{order.price.toLocaleString("en-NG")}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-neutral-400">Quantity</p>
          <p className="text-xs font-semibold text-neutral-800 mt-0.5">{order.quantity}</p>
        </div>
      </div>
    </div>
  );
}
