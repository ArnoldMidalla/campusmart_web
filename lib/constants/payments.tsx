import React from "react";
import { CreditCard, Landmark, LucideIcon } from "lucide-react";
import Image from "next/image";

export interface PaymentOption {
  id: number;
  title: string;
  Icon?: LucideIcon;
  subLogos?: React.ReactNode;
  rightLogo?: React.ReactNode;
}

export const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: 1,
    title: "Add a card",
    Icon: CreditCard,
    subLogos: (
      <div className="flex gap-1 items-center ml-1">
        <Image src="/Visa_Inc.png" alt="Visa" width={36} height={12} className="object-contain h-4 w-auto" />
        <Image src="/Mastercard.png" alt="Mastercard" width={32} height={20} className="object-contain h-5 w-auto" />
        <Image src="/Verve_Card.png" alt="Verve" width={40} height={16} className="object-contain h-4 w-auto" />
      </div>
    ),
  },
  { 
    id: 2, 
    title: "Bank Transfer", 
    Icon: Landmark 
  },
  { 
    id: 3, 
    title: "Opay", 
    rightLogo: (
      <Image src="/OPay.png" alt="OPay" width={52} height={20} className="object-contain h-6 w-auto" />
    ) 
  },
  { 
    id: 4, 
    title: "Palmpay", 
    rightLogo: (
      <Image src="/palmpay.png" alt="PalmPay" width={52} height={20} className="object-contain h-6 w-auto" />
    ) 
  },
];
