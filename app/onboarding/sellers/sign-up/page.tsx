"use client";

import { User, Mail, Phone, CreditCard, Lock } from "lucide-react";
import FormInput from "@/app/components/FormInput";
import AuthContainer from "@/app/components/AuthContainer";

export default function SellerSignUpPage() {
  const handleSignUp = () => {
    // Implement sign-up logic
  };

  return (
    <AuthContainer
      roleType="seller"
      type="register"
      title={<>Start selling on<br />Campus Mart in seconds.</>}
      onSubmit={handleSignUp}
    >
      <FormInput icon={User} type="text" placeholder="Store / business name" autoComplete="organization" />
      <FormInput icon={Mail} type="email" placeholder="Personal email address" autoComplete="email" />
      <FormInput icon={Mail} type="email" placeholder="School email address" />
      <FormInput icon={CreditCard} type="text" placeholder="Matric / student ID number" />
      <FormInput icon={Phone} type="tel" placeholder="Phone number" autoComplete="tel" />
      <FormInput icon={Lock} type="password" placeholder="Password" autoComplete="new-password" />
      <FormInput icon={Lock} type="password" placeholder="Confirm password" autoComplete="new-password" />
    </AuthContainer>
  );
}
