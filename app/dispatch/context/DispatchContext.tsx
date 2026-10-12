"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import {
  DispatchUser,
  VerificationApplication,
  DispatchOrder,
  DispatchRider,
  ActiveDelivery,
  DispatchProduct,
  DispatchTransaction,
} from "../types";
import {
  INITIAL_USERS,
  INITIAL_VERIFICATIONS,
  INITIAL_ORDERS,
  INITIAL_RIDERS,
  INITIAL_ACTIVE_DELIVERIES,
  INITIAL_PRODUCTS,
  INITIAL_TRANSACTIONS,
} from "../data/mockData";

interface DispatchContextType {
  // State
  users: DispatchUser[];
  verifications: VerificationApplication[];
  orders: DispatchOrder[];
  riders: DispatchRider[];
  activeDeliveries: ActiveDelivery[];
  products: DispatchProduct[];
  transactions: DispatchTransaction[];

  // Computed metrics
  pendingVerificationsCount: number;
  reportedProductsCount: number;
  openDisputesCount: number;
  onlineRidersCount: number;
  activeDeliveriesCount: number;

  // Actions
  suspendUser: (userId: number, reason: string, note?: string) => void;
  activateUser: (userId: number) => void;
  flagUser: (userId: number) => void;
  deleteUser: (userId: number) => void;

  approveVerification: (appId: number) => void;
  rejectVerification: (appId: number, reason: string) => void;

  resolveDispute: (
    orderId: string,
    resolution: "refund_buyer" | "release_escrow" | "split_50_50",
    note?: string
  ) => void;

  reassignDelivery: (orderId: string, newRiderId: number | string) => void;

  moderateProduct: (
    productId: number,
    action: "approve" | "delete" | "change_category",
    newCategory?: string
  ) => void;

  registerRider: (data: {
    fullName: string;
    phone: string;
    email: string;
    vehicleType: string;
  }) => void;
}

const DispatchContext = createContext<DispatchContextType | undefined>(undefined);

export function DispatchProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<DispatchUser[]>(INITIAL_USERS);
  const [verifications, setVerifications] =
    useState<VerificationApplication[]>(INITIAL_VERIFICATIONS);
  const [orders, setOrders] = useState<DispatchOrder[]>(INITIAL_ORDERS);
  const [riders, setRiders] = useState<DispatchRider[]>(INITIAL_RIDERS);
  const [activeDeliveries, setActiveDeliveries] = useState<ActiveDelivery[]>(
    INITIAL_ACTIVE_DELIVERIES
  );
  const [products, setProducts] = useState<DispatchProduct[]>(INITIAL_PRODUCTS);
  const [transactions, setTransactions] =
    useState<DispatchTransaction[]>(INITIAL_TRANSACTIONS);

  // Computed counts
  const pendingVerificationsCount = useMemo(
    () => verifications.filter((v) => v.status === "pending").length,
    [verifications]
  );

  const reportedProductsCount = useMemo(
    () => products.filter((p) => p.status === "REPORTED").length,
    [products]
  );

  const openDisputesCount = useMemo(
    () => orders.filter((o) => o.status === "DISPUTE").length,
    [orders]
  );

  const onlineRidersCount = useMemo(
    () => riders.filter((r) => r.status === "ONLINE").length,
    [riders]
  );

  const activeDeliveriesCount = useMemo(
    () => activeDeliveries.length,
    [activeDeliveries]
  );

  // 1. User mutations
  const suspendUser = (userId: number, _reason: string, _note?: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: "SUSPENDED" } : u))
    );
  };

  const activateUser = (userId: number) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: "ACTIVE" } : u))
    );
  };

  const flagUser = (userId: number) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: "FLAGGED" } : u))
    );
  };

  const deleteUser = (userId: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  // 2. Verification mutations
  const approveVerification = (appId: number) => {
    setVerifications((prev) =>
      prev.map((v) => (v.id === appId ? { ...v, status: "approved" } : v))
    );
    // Also update matching user if exists
    setUsers((prev) =>
      prev.map((u) =>
        u.id === appId
          ? { ...u, role: "SELLER (VERIFIED)", colorTheme: "orange" }
          : u
      )
    );
  };

  const rejectVerification = (appId: number, reason: string) => {
    setVerifications((prev) =>
      prev.map((v) =>
        v.id === appId
          ? { ...v, status: "rejected", rejectionReason: reason }
          : v
      )
    );
  };

  // 3. Dispute mutations
  const resolveDispute = (
    orderId: string,
    resolution: "refund_buyer" | "release_escrow" | "split_50_50",
    _note?: string
  ) => {
    const isRefund = resolution === "refund_buyer";
    const targetOrder = orders.find((o) => o.id === orderId);

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            status: isRefund ? "CANCELLED" : "DELIVERED",
            tabType: isRefund ? "cancelled" : "all",
            disputeResolution: resolution,
          };
        }
        return o;
      })
    );

    // Record resolution transaction
    if (targetOrder) {
      const newTx: DispatchTransaction = {
        id: `tx-${Date.now()}`,
        txCode: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
        orderNumber: targetOrder.orderNumber,
        gateway: "Escrow Wallet",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        amount: targetOrder.price,
        status: isRefund ? "REFUNDED" : "SUCCESS",
        failureReason: isRefund ? "Dispute settled in escrow" : undefined,
      };
      setTransactions((prev) => [newTx, ...prev]);
    }
  };

  // 4. Delivery reassignment
  const reassignDelivery = (orderId: string, newRiderId: number | string) => {
    const selectedRider = riders.find((r) => String(r.id) === String(newRiderId));
    if (!selectedRider) return;

    setActiveDeliveries((prev) =>
      prev.map((delivery) => {
        if (delivery.id === orderId || delivery.orderNumber === `#CM-${orderId}`) {
          return {
            ...delivery,
            riderId: selectedRider.id,
            riderName: selectedRider.name,
            initials: selectedRider.initials,
            statusText: `Reassigned · ${selectedRider.distance || "Near campus"}`,
            phone: selectedRider.phone,
          };
        }
        return delivery;
      })
    );

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            assignedRiderId: selectedRider.id,
            assignedRiderName: selectedRider.name,
          };
        }
        return o;
      })
    );

    setRiders((prev) =>
      prev.map((r) => {
        if (String(r.id) === String(newRiderId)) {
          return { ...r, activeCount: r.activeCount + 1 };
        }
        return r;
      })
    );
  };

  // 5. Product moderation
  const moderateProduct = (
    productId: number,
    action: "approve" | "delete" | "change_category",
    newCategory?: string
  ) => {
    if (action === "delete") {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId
            ? { ...p, status: "PROHIBITED", tabType: "prohibited" }
            : p
        )
      );
    } else if (action === "approve") {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, status: "LIVE", tabType: "all" } : p
        )
      );
    } else if (action === "change_category" && newCategory) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, category: newCategory } : p
        )
      );
    }
  };

  // 6. Rider registration
  const registerRider = (data: {
    fullName: string;
    phone: string;
    email: string;
    vehicleType: string;
  }) => {
    const initials = data.fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const newRider: DispatchRider = {
      id: Date.now(),
      name: data.fullName,
      initials: initials || "RD",
      vehicle: data.vehicleType,
      rating: "5.0",
      activeCount: 0,
      status: "ONLINE",
      phone: data.phone,
      distance: "At campus gate",
    };

    setRiders((prev) => [newRider, ...prev]);
  };

  return (
    <DispatchContext.Provider
      value={{
        users,
        verifications,
        orders,
        riders,
        activeDeliveries,
        products,
        transactions,
        pendingVerificationsCount,
        reportedProductsCount,
        openDisputesCount,
        onlineRidersCount,
        activeDeliveriesCount,
        suspendUser,
        activateUser,
        flagUser,
        deleteUser,
        approveVerification,
        rejectVerification,
        resolveDispute,
        reassignDelivery,
        moderateProduct,
        registerRider,
      }}
    >
      {children}
    </DispatchContext.Provider>
  );
}

export function useDispatchContext() {
  const context = useContext(DispatchContext);
  if (!context) {
    throw new Error("useDispatchContext must be used within a DispatchProvider");
  }
  return context;
}
