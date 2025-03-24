'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [isSignUp, setIsSignUp] = useState(false)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSignUp) {
      // Call your custom signup API to create user
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        await signIn("credentials", {
          email: form.email,
          password: form.password,
          callbackUrl: "/home",
        })
      }
    } else {
      // Sign in with credentials
      await signIn("credentials", {
        email: form.email,
        password: form.password,
        callbackUrl: "/home",
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignUp ? "Sign Up" : "Login"} to Bookworm
        </h2>

        {isSignUp && (
          <>
            <input name="firstName" placeholder="First Name" onChange={handleChange} className="input" required />
            <input name="lastName" placeholder="Last Name" onChange={handleChange} className="input" required />
          </>
        )}
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input" required />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700">
          {isSignUp ? "Sign Up" : "Login"}
        </button>

        <p className="text-sm text-center mt-4">
          {isSignUp ? "Already have an account?" : "New here?"}{" "}
          <button type="button" className="text-blue-600 underline" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Log in" : "Sign up"}
          </button>
        </p>
      </form>
    </div>
  )
}

