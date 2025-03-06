import React from 'react'
import { useState } from 'react';
import { useAuthStore } from "../store/useAuthStore.js";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageCircleMore, User } from "lucide-react";
import { Link } from "react-router-dom"; 
import { toast } from 'react-hot-toast';
import AuthImagePattern from '../components/AuthImagePattern';


function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const {signup, isSigningUp} = useAuthStore();

  const validateForm = () => {
    if (!formData.fullname.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
    {/* left side */}
    <div className="flex flex-col justify-center items-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8">
        {/* LOGO */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div
              className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
            group-hover:bg-primary/20 transition-colors"
            >
             <MessageCircleMore size={40} color="#581093" strokeWidth={2.5} absoluteStrokeWidth />
            </div>
            <h1 className="text-2xl font-semibold font-sans text-[#ab358b] mt-2">Create Account</h1>
            {/* <p className="text-base-content/60">Get started with your free account</p> */}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium m-1 text-fuchsia-800">Full Name</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User color="#581093" className="size-5 text-base-content/40" />
              </div>
              <input
                type="text"
                className={`input  focus:border-purple-800 input-bordered w-full pl-10 border-purple-800`}
                placeholder=""
                value={formData.fullname}
                onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium m-1 text-fuchsia-800">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail color="#581093" className="size-5 text-base-content/40 "/>
              </div>
              <input
                type="email"
                className={`input input-bordered w-full pl-10 border-purple-800`}
                placeholder="you@example.com "
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium m-1  text-fuchsia-800">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock color="#581093" className="size-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className={`input input-bordered w-full pl-10  border-purple-800`}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff color="#581093" className="size-5 text-base-content/40 " />
                ) : (
                  <Eye color="#60097d" className="size-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary bg-purple-800 border-purple-800 hover:bg-fuchsia-800 font-sans w-full" disabled={isSigningUp}>
            {isSigningUp ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-base-content/60">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary text-fuchsia-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>

    {/* right side */}

    <AuthImagePattern
      title="Join our community"
      subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
    />
  </div>
  )
}

export default SignUpPage
