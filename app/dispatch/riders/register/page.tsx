"use client";

import { useState, useRef } from "react";
import { Upload, ChevronDown, Check, X, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DispatchHeader } from "../../components";
import { useDispatchContext } from "../../context";

const VEHICLE_OPTIONS = [
  "Motorcycle",
  "Bicycle",
  "Electric Scooter",
  "Delivery Van",
  "Walking Courier",
];

export default function RegisterRiderPage() {
  const router = useRouter();
  const { registerRider } = useDispatchContext();

  // Form states initialized to match the design mockup
  const [fullName, setFullName] = useState("Peace Nnamdi");
  const [phone, setPhone] = useState("+234 803 221 4478");
  const [email, setEmail] = useState("peace.nnamdi@mail");
  const [vehicleType, setVehicleType] = useState("Motorcycle");
  const [isVehicleDropdownOpen, setIsVehicleDropdownOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
  } | null>(null);

  // Field focus tracking for accurate visual styling
  const [focusedField, setFocusedField] = useState<string | null>("phone");

  // Success modal state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showErrorTip, setShowErrorTip] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validation
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setUploadedFile({
        name: file.name,
        size: `${sizeMB} MB`,
      });
    }
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    setShowErrorTip(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
  };

  const handleAutofillValidEmail = () => {
    setEmail("peace.nnamdi@campusmart.ng");
    setShowErrorTip(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid) {
      setShowErrorTip(true);
      setFocusedField("email");
      return;
    }
    registerRider({
      fullName,
      phone,
      email,
      vehicleType,
    });
    setIsSubmitted(true);
  };

  return (
    <main className="flex-1 flex flex-col pb-32">
      {/* Header */}
      <DispatchHeader
        variant="detail"
        title="Register Rider"
        backHref="/dispatch/riders"
      />

        {/* Subtitle / Notice */}
        <div className="px-6 mb-6">
          <p className="text-[13px] text-foreground-muted leading-relaxed">
            Riders receive a login once approved. All fields are required.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="px-6 space-y-4">
          {/* 1. Full Name */}
          <div>
            <label htmlFor="rider-fullName" className="text-[12px] font-semibold text-foreground/80 block mb-1.5">
              Full name
            </label>
            <input
              id="rider-fullName"
              type="text"
              required
              value={fullName}
              onFocus={() => setFocusedField("fullName")}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Peace Nnamdi"
              className={`w-full bg-white rounded-[14px] px-4 py-3.5 text-[14px] font-medium text-foreground transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)] outline-none border ${
                focusedField === "fullName"
                  ? "border-main ring-1 ring-main/30"
                  : "border-border-default/80"
              }`}
            />
          </div>

          {/* 2. Phone Number */}
          <div>
            <label htmlFor="rider-phone" className="text-[12px] font-semibold text-foreground/80 block mb-1.5">
              Phone number
            </label>
            <input
              id="rider-phone"
              type="tel"
              required
              value={phone}
              onFocus={() => setFocusedField("phone")}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+234 803 221 4478"
              className={`w-full bg-white rounded-[14px] px-4 py-3.5 text-[14px] font-medium text-foreground transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)] outline-none border ${
                focusedField === "phone"
                  ? "border-main ring-1 ring-main/30"
                  : "border-border-default/80"
              }`}
            />
          </div>

          {/* 3. Email Address */}
          <div>
            <label htmlFor="rider-email" className="text-[12px] font-semibold text-foreground/80 block mb-1.5">
              Email address
            </label>
            <input
              id="rider-email"
              type="email"
              required
              value={email}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="peace.nnamdi@example.com"
              className={`w-full bg-white rounded-[14px] px-4 py-3.5 text-[14px] font-medium text-foreground transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)] outline-none border ${
                showErrorTip && !isEmailValid
                  ? "border-[#EF4444] ring-1 ring-[#EF4444]/20"
                  : focusedField === "email"
                  ? "border-main ring-1 ring-main/30"
                  : "border-border-default/80"
              }`}
            />
            {showErrorTip && !isEmailValid && (
              <p className="text-[12px] text-[#EF4444] mt-1.5 flex items-center gap-1 font-normal">
                <span>Enter a valid email address, e.g.</span>
                <button
                  type="button"
                  onClick={handleAutofillValidEmail}
                  className="text-[#2563EB] hover:underline cursor-pointer font-medium"
                >
                  peace.nnamdi@campusmart.ng
                </button>
              </p>
            )}
          </div>

          {/* 4. Vehicle Type */}
          <div className="relative">
            <label id="rider-vehicleType-label" className="text-[12px] font-semibold text-foreground/80 block mb-1.5">
              Vehicle type
            </label>
            <button
              type="button"
              id="rider-vehicleType-button"
              aria-labelledby="rider-vehicleType-label rider-vehicleType-button"
              aria-haspopup="listbox"
              aria-expanded={isVehicleDropdownOpen}
              onClick={() => setIsVehicleDropdownOpen(!isVehicleDropdownOpen)}
              className="w-full bg-white rounded-[14px] px-4 py-3.5 text-[14px] font-medium text-foreground border border-border-default/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between text-left hover:border-gray-300 transition-colors"
            >
              <span>{vehicleType}</span>
              <ChevronDown
                size={18}
                className={`text-foreground-muted transition-transform duration-200 ${
                  isVehicleDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Options */}
            {isVehicleDropdownOpen && (
              <div 
                role="listbox"
                aria-labelledby="rider-vehicleType-label"
                className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-border-default py-1 z-20 animate-in fade-in zoom-in-95 duration-150"
              >
                {VEHICLE_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    role="option"
                    aria-selected={vehicleType === option}
                    onClick={() => {
                      setVehicleType(option);
                      setIsVehicleDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-[13px] font-medium text-left flex items-center justify-between transition-colors ${
                      vehicleType === option
                        ? "bg-orange-50/70 text-main font-semibold"
                        : "text-foreground hover:bg-gray-50"
                    }`}
                  >
                    <span>{option}</span>
                    {vehicleType === option && (
                      <Check size={16} className="text-main" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 5. Government ID */}
          <div>
            <label htmlFor="rider-id-upload" className="text-[12px] font-semibold text-foreground/80 block mb-1.5">
              Government ID
            </label>

            <input
              id="rider-id-upload"
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*,.pdf"
              className="hidden"
            />

            {!uploadedFile ? (
              <div
                role="button"
                tabIndex={0}
                aria-label="Upload a clear photo of government ID"
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                className="border-[1.5px] border-dashed border-[#D0D5DD] bg-transparent rounded-[16px] py-7 px-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-main/60 transition-colors group focus:outline-none focus:ring-2 focus:ring-main/40"
              >
                <div className="w-9 h-9 rounded-full bg-gray-50 group-hover:bg-orange-50 flex items-center justify-center mb-2 transition-colors">
                  <Upload
                    size={20}
                    className="text-[#667085] group-hover:text-main stroke-[1.8] transition-colors"
                  />
                </div>
                <p className="text-[13px] text-[#667085] font-medium">
                  Upload a clear photo of the ID
                </p>
              </div>
            ) : (
              <div className="bg-white border border-border-default/80 rounded-[16px] p-4 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-main flex items-center justify-center shrink-0">
                    <FileText size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-foreground truncate">
                      {uploadedFile.name}
                    </p>
                    <p className="text-[11px] text-foreground-muted">
                      {uploadedFile.size} &middot; Ready to upload
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="Change uploaded document"
                    className="text-[12px] font-semibold text-main hover:underline px-2 py-1"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadedFile(null)}
                    aria-label="Remove uploaded document"
                    className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>

        {/* Bottom CTA Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-border-default/50 px-6 py-4 pb-8 z-30">
          <div className="max-w-md mx-auto">
            <button
              onClick={handleSubmit}
              className="w-full bg-main text-white py-4 rounded-2xl font-bold text-[15px] hover:bg-main-light transition-colors shadow-[0_4px_15px_rgba(255,104,31,0.25)] active:scale-[0.99] flex items-center justify-center"
            >
              Submit for approval
            </button>
          </div>
        </div>

        {/* Submission Confirmation Modal */}
        {isSubmitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200">
            <div className="bg-white rounded-[2rem] p-6 w-full max-w-[340px] text-center shadow-2xl animate-in zoom-in duration-200">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-[20px] mx-auto flex items-center justify-center mb-4">
                <Check size={32} strokeWidth={2.5} />
              </div>
              <h4 className="text-[18px] font-bold text-foreground mb-1">
                Application Submitted
              </h4>
              <p className="text-[13px] text-foreground-muted mb-6 leading-relaxed">
                <strong className="text-foreground">{fullName}</strong> has been
                queued for rider review. Login credentials will be sent once approved.
              </p>
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => router.push("/dispatch/riders")}
                  className="w-full bg-main text-white rounded-xl py-3.5 font-bold text-[14px] hover:bg-main-light transition-colors shadow-sm"
                >
                  Return to Fleet
                </button>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="w-full bg-gray-50 text-foreground-muted rounded-xl py-3 font-semibold text-[13px] hover:bg-gray-100 transition-colors"
                >
                  Edit details
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
  );
}
