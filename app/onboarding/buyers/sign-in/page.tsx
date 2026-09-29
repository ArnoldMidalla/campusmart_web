"use client";

import { User, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/app/store/useAuthStore";
import FormInput from "@/app/components/FormInput";
import AuthContainer from "@/app/components/AuthContainer";

export default function SignInPage() {
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await login(email, password);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer
      roleType="buyer"
      type="login"
      title={<>Welcome back!<br />Log in to continue.</>}
      onSubmit={handleLogin}
      loading={loading}
    >
      <FormInput
        icon={User}
        type="text"
        placeholder="Email or username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="username"
      />
      <FormInput
        icon={Lock}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      />
    </AuthContainer>
  );
}
