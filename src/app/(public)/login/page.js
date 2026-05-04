"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "../../context/userContext";
import Spinner from "../../components/spinner";
import InputField from "@/app/components/inputField";
import CustomButton from "@/app/components/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUser } = useUserContext();
  const router = useRouter();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return email.length <= 254 && emailRegex.test(email.trim());
  };

  const validatePassword = (password) => {
    return password && password.length >= 8 && password.length <= 128;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateEmail(email)) {
      setLoading(false);
      setError("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      setLoading(false);
      setError("Password must be between 8 and 128 characters");
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('🎉 Login successful for user:', data.user.email);
        console.log('🚀 Redirecting to dashboard...');
        setUser(data.user);
        router.push("/dashboard");
      } else {
        console.error('❌ Login failed:', response.status);
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error('❌ Login error:', error.message);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-77px)] bg-bone flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-10">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-onboarding-text-muted mb-3">
              <span className="text-cinnabar">●</span> Welcome back
            </div>
            <h1 className="font-display uppercase tracking-[0.02em] text-3xl leading-tight text-onboarding-text-primary">
              Step on
              <br />
              the mat.
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            {loading ? (
              <div className="flex justify-center py-12">
                <Spinner />
              </div>
            ) : (
              <>
                <InputField
                  name="email"
                  type="email"
                  value={email}
                  onChange={(value) => {
                    setEmail(value.trim());
                    if (error && typeof error === 'string' && error.includes('email')) setError('');
                  }}
                  placeholder="you@example.com"
                  label="Email"
                  maxLength={254}
                  required
                  validate={(email) => ({
                    isValid: validateEmail(email),
                    error: 'Please enter a valid email address'
                  })}
                />
                <InputField
                  name="password"
                  type="password"
                  value={password}
                  onChange={(value) => {
                    setPassword(value);
                    if (error && typeof error === 'string' && error.includes('Password')) setError('');
                  }}
                  placeholder="••••••••"
                  label="Password"
                  maxLength={128}
                  minLength={8}
                  required
                  validate={(password) => ({
                    isValid: validatePassword(password),
                    error: 'Password must be between 8 and 128 characters'
                  })}
                />
                {error && (
                  <p className="font-mono uppercase tracking-[0.1em] text-[11px] text-cinnabar text-center mb-4">
                    {error}
                  </p>
                )}
                <CustomButton callBack={handleSubmit} text="Sign in" disabled={loading} type="submit" />
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
