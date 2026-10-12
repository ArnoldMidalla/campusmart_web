export type UserStatus = "ACTIVE" | "SUSPENDED" | "FLAGGED";
export type UserRole = "SELLER" | "BUYER" | "RIDER" | "ADMIN";

export interface DispatchUser {
  id: number;
  initials: string;
  colorTheme: "orange" | "blue" | "green" | "gray";
  name: string;
  role: string;
  email: string;
  date: string;
  status: UserStatus;
  phone?: string;
  store?: string;
  institution?: string;
  stats?: {
    orders: number | string;
    listings: number | string;
    rating: string;
  };
}

export type ApplicationStatus = "pending" | "approved" | "rejected";

export interface VerificationDocument {
  id: string;
  title: string;
  subtitle: string;
  isEmail?: boolean;
  status: "VERIFIED" | "REVIEW";
  iconName?: "CreditCard" | "Mail" | "User";
}

export interface VerificationApplication {
  id: number;
  initials: string;
  name: string;
  store: string;
  docsCount: number;
  timeLabel: string;
  timeType: "amber" | "blue";
  status: ApplicationStatus;
  rejectionReason?: string;
  details?: {
    institution: string;
    matricNumber: string;
    department: string;
    submitted: string;
    storeCategory: string;
  };
  documents?: VerificationDocument[];
}

export type OrderStatus = "DISPUTE" | "IN TRANSIT" | "DELIVERED" | "CANCELLED" | "FAILED";
export type OrderTab = "all" | "in_progress" | "cancelled" | "failed" | "disputes";

export interface DispatchOrder {
  id: string;
  orderNumber: string;
  buyer: string;
  store: string;
  itemCount: number;
  price: string;
  status: OrderStatus;
  tabType: OrderTab;
  assignedRiderId?: string | number;
  assignedRiderName?: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  disputeReason?: string;
  disputeResolution?: string;
  date?: string;
}

export interface DispatchRider {
  id: number;
  name: string;
  initials: string;
  vehicle: string;
  rating: string;
  activeCount: number;
  status: "ONLINE" | "OFFLINE";
  phone: string;
  distance?: string;
}

export interface ActiveDelivery {
  id: string;
  orderNumber: string;
  riderId?: number | string;
  riderName: string;
  initials: string;
  statusText: string;
  phone?: string;
  isIssue?: boolean;
  avatarColor: "blue" | "gray" | "green";
  pickupPoint?: string;
  dropoffPoint?: string;
  estArrival?: string;
  remainingDistance?: string;
}

export type ProductStatus = "LIVE" | "REPORTED" | "DUPLICATE" | "PROHIBITED";
export type ProductTab = "all" | "reported" | "duplicates" | "prohibited";

export interface DispatchProduct {
  id: number;
  name: string;
  store: string;
  category: string;
  price: string;
  status: ProductStatus;
  tabType: ProductTab;
  reportReason?: string;
  reportedBy?: string;
  reportedAt?: string;
  views?: number;
  listedDate?: string;
  stock?: number;
  description?: string;
}

export type TransactionStatus = "SUCCESS" | "FAILED" | "REFUNDED";

export interface DispatchTransaction {
  id: string;
  txCode: string;
  orderNumber: string;
  gateway: string;
  time: string;
  amount: string;
  status: TransactionStatus;
  failureReason?: string;
}
