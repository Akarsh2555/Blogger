import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css'
import service from "./appwrite/auth"
import { useSelector } from "react-redux"
import { login, logout } from "./store/authslice"
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const authStatus = useSelector((state) => state.auth.status)
  const dispatch = useDispatch()
  const text = "Creating Your Blog...";

  // checks if user is Logged-In
  useEffect(() => {
    service.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className={`min-h-screen flex flex-wrap 
    content-between' ${!authStatus ? 'bg-[#bc382e]' : 'bg-gradient-to-b from-bg-gray-900 to-bg-gray-800'}`}>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900">
    <div className="text-center space-y-8">
      {/* Animated Blog Icon */}
      <div className="relative w-24 h-24 mx-auto">
        <div className="absolute w-full h-full rounded-full bg-yellow-500 animate-ping"></div>
        <div className="absolute w-full h-full rounded-full bg-yellow-500 opacity-75 animate-pulse"></div>
        <div className="absolute w-full h-full flex justify-center items-center">
          <img
            src="/img9.png"
            alt="Blog Icon"
            className="w-12 h-12 animate-spin-slow"
          />
        </div>
      </div>

      {/* Fancy Loading Text with Fade-In */}
      <h1 className="text-4xl font-bold text-white">
        {text.split("").map((letter, index) => (
          <span
            key={index}
            className="inline-block animate-bounce-in"
            style={{
              animationDelay: `${index * 0.15}s`,
              animationDuration: "1s",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </h1>

      {/* Tagline Animation */}
      <p className="text-xl text-gray-200 animate-fade-in">
        Create Exciting Posts...
      </p>
    </div>
  </div>
  );
}

export default App
