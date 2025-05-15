import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import Input from './Input';
import { useDispatch } from "react-redux";
import { login } from "../store/authslice";
import { useForm } from "react-hook-form";
import { 
  Pen, 
  Globe, 
  Users, 
  Book 
} from 'lucide-react';

function SignupComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();

  const blogInterests = [
    { name: "Technology", icon: <Globe className="mr-2" />, description: "Explore the latest tech trends" },
    { name: "Lifestyle", icon: <Users className="mr-2" />, description: "Share personal experiences" },
    { name: "Travel", icon: <Book className="mr-2" />, description: "Discover and share adventures" }
  ];

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount({ ...data, blogInterest: selectedInterest });
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(login(currentUser));
          navigate('/');
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen relative bg-red-100 flex items-center justify-center p-4 overflow-hidden">
      {/* Background Image Elements */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center" 
        style={{
          backgroundImage: "url('https://clickfirstmarketing.com/wp-content/uploads/Purpose-of-Blogging.jpeg')",
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
          <p className="text-red-600 text-center">Create. Share. Connect.</p>
        </div>

        {error && <div className="bg-red-500/20 text-red-700 p-3 rounded-lg mb-4">{error}</div>}

        <form onSubmit={handleSubmit(create)} className="space-y-4">
          <Input 
            label="Full Name" 
            placeholder="Your full name" 
            className="border-red-300 focus:border-red-500" 
            {...register("name", { 
              required: "Name is required", 
              minLength: { value: 2, message: "Name must be at least 2 characters" } 
            })} 
            error={errors.name?.message} 
          />
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
            placeholder="Create a password" 
            className="border-red-300 focus:border-red-500" 
            {...register("password", { 
              required: "Password is required", 
              minLength: { value: 8, message: "Password must be at least 8 characters" } 
            })} 
            error={errors.password?.message} 
          />

          <div>
            <label className="block text-red-700 mb-2">Choose Your Blogging Interest</label>
            <div className="grid grid-cols-3 gap-2">
              {blogInterests.map((interest) => (
                <button 
                  key={interest.name} 
                  type="button" 
                  onClick={() => setSelectedInterest(interest.name)} 
                  className={`p-3 rounded-lg border-2 text-sm flex flex-col items-center ${
                    selectedInterest === interest.name 
                      ? 'bg-red-500 text-white border-red-600' 
                      : 'border-red-300 text-red-700 hover:bg-red-100'
                  }`}
                >
                  {interest.icon}
                  {interest.name}
                </button>
              ))}
            </div>
            {!selectedInterest && <p className="text-red-500 text-sm mt-1">Please select an interest</p>}
          </div>

          <Button 
            type="submit" 
            disabled={!selectedInterest} 
            className="w-full bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-red-600">
            Already a member? <Link to="/login" className="text-red-800 font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupComponent;