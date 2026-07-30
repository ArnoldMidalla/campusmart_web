"use client";

import { User, Mail, Phone, Lock } from "lucide-react";
import FormInput from "@/app/components/FormInput";
import AuthContainer from "@/app/components/AuthContainer";

export default function SignUpTwoPage() {
  const handleSignUp = () => {
    // Implement sign-up logic
  };

  return (
    <AuthContainer
      roleType="buyer"
      type="register"
      title={<>Join your campus<br />marketplace in seconds.</>}
      onSubmit={handleSignUp}
    >
      <FormInput icon={User} type="text" placeholder="Username" autoComplete="username" />
      <FormInput icon={Mail} type="email" placeholder="Email address" autoComplete="email" />
      <FormInput icon={Phone} type="tel" placeholder="Phone number" autoComplete="tel" />
      <FormInput icon={Lock} type="password" placeholder="Password" autoComplete="new-password" />
      <FormInput icon={Lock} type="password" placeholder="Confirm password" autoComplete="new-password" />
    </AuthContainer>
  );
}
