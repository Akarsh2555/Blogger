import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authslice';
import Button from './Button';
import Input from './Input';
import { useDispatch } from "react-redux";
import service from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { Pen } from 'lucide-react';

function LoginComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await service.login(data);
      const userData = await service.getCurrentUser();
      
      if (userData) {
        dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen relative bg-red-100 flex items-center justify-center p-4 overflow-hidden">
      {/* Background Image Elements */}
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-10 bg-cover bg-center transform rotate-180" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1516259762381-22954d7d9261?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1889&q=80')",
          zIndex: 1
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-full h-full opacity-10 bg-cover bg-center" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80')",
          zIndex: 1
        }}
      />

      <div className="relative z-10 w-full max-w-md bg-white/90 rounded-2xl shadow-2xl border border-red-100 p-8">
        <div className="flex flex-col items-center mb-6">
          <Pen size={60} className="text-red-600 mb-4" />
          <h2 className="text-3xl font-bold text-red-800 text-center mb-2">Blogger</h2>
          <p className="text-red-600 text-center">Connect. Share. Inspire.</p>
        </div>

        {error && <div className="bg-red-500/20 text-red-700 p-3 rounded-lg mb-4">{error}</div>}

        <form onSubmit={handleSubmit(login)} className="space-y-4">
          <Input 
            label="Email" 
            type="email" 
            placeholder="Your email" 
            className="border-red-300 focus:border-red-500" 
            {...register("email", { 
              required: "Email is required", 
              pattern: { 
                value: /^\S+@\S+$/i, 
                message: "Invalid email address" 
              } 
            })} 
            error={errors.email?.message} 
          />

          <Input 
            label="Password" 
            type="password" 
            placeholder="Enter your password" 
            className="border-red-300 focus:border-red-500" 
            {...register("password", { 
              required: "Password is required" 
            })} 
            error={errors.password?.message} 
          />

          <Button 
            type="submit" 
            className="w-full bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-red-600">
            Don't have an account? <Link to="/signup" className="text-red-800 font-bold hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;