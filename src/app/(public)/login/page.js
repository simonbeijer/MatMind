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

  // Enhanced email validation
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return email.length <= 254 && emailRegex.test(email.trim());
  };

  // Password validation
  const validatePassword = (password) => {
    return password && password.length >= 8 && password.length <= 128;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Enhanced validation
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-onboarding-bg-primary via-onboarding-bg-secondary to-onboarding-bg-primary">
      <div className="w-full max-w-sm mx-4 p-8 bg-onboarding-card-bg rounded-2xl shadow-lg border border-onboarding-border-subtle backdrop-blur-sm">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-onboarding-text-primary mb-2">Welcome Back</h2>
          <p className="text-sm text-onboarding-text-muted">Sign in to your account to continue</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {loading ? (
            <div className="flex justify-center py-8">
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
                  if (error && typeof error === 'string' && error.includes('email')) {
                    setError('');
                  }
                }}
                placeholder="Enter your email"
                label="Email"
                maxLength={254}
                required={true}
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
                  if (error && typeof error === 'string' && error.includes('Password')) {
                    setError('');
                  }
                }}
                placeholder="Enter your password"
                label="Password"
                maxLength={128}
                minLength={8}
                required={true}
                validate={(password) => ({
                  isValid: validatePassword(password),
                  error: 'Password must be between 8 and 128 characters'
                })}
              />
              {error && (
                <p className="text-red-500 text-sm text-center">
                  {error}
                </p>
              )}
              <CustomButton 
                callBack={handleSubmit} 
                text="Sign In" 
                disabled={loading} 
                type="submit"
              />
            </>
          )}
        </form>
      </div>
    </div>
  );
}
