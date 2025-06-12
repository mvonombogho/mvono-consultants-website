"use client";

<<<<<<< HEAD
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Shield, Mail, Lock, AlertCircle } from "lucide-react";
=======
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Mail, Lock, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
>>>>>>> f3fdf5fe94b4c05bc250053eb106d87d9ed6b7fa

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

<<<<<<< HEAD
// Test credentials
const TEST_EMAIL = "admin@mvonoconsultants.com";
const TEST_PASSWORD = "Test@123";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isClientSide, setIsClientSide] = useState(false);

  // Only enable client-side features after hydration
  useEffect(() => {
    setIsClientSide(true);
  }, []);
=======
export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
>>>>>>> f3fdf5fe94b4c05bc250053eb106d87d9ed6b7fa

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
<<<<<<< HEAD
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
=======
      email: "",
      password: "",
>>>>>>> f3fdf5fe94b4c05bc250053eb106d87d9ed6b7fa
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
<<<<<<< HEAD
    setErrorMessage("");

    try {
      // Use NextAuth for authentication
=======

    try {
>>>>>>> f3fdf5fe94b4c05bc250053eb106d87d9ed6b7fa
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
<<<<<<< HEAD
        setErrorMessage("Authentication failed: " + result.error);
      } else {
        // Successful login
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage("An error occurred during login. Please try again.");
=======
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "Invalid email or password",
        });
      } else {
        // Check user role and redirect accordingly
        router.push("/dashboard");
        toast({
          variant: "success",
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "An error occurred. Please try again.",
      });
>>>>>>> f3fdf5fe94b4c05bc250053eb106d87d9ed6b7fa
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  // Simple login for testing/development
  const handleSimpleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    window.location.href = '/dashboard';
  };

=======
>>>>>>> f3fdf5fe94b4c05bc250053eb106d87d9ed6b7fa
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <Shield className="h-10 w-10 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Access the Mvono Consultants dashboard
        </p>
<<<<<<< HEAD
        
        {/* Test credentials info */}
        <div className="mt-3 bg-blue-50 border border-blue-200 rounded-md p-3 max-w-xs mx-auto">
          <p className="text-xs text-blue-800 text-center font-medium">Test Credentials:</p>
          <p className="text-xs text-blue-700 mt-1 text-center">Email: {TEST_EMAIL}</p>
          <p className="text-xs text-blue-700 text-center">Password: {TEST_PASSWORD}</p>
        </div>
        
        {/* Direct dashboard link for development */}
        {isClientSide && (
          <div className="mt-3 text-center">
            <button 
              onClick={handleSimpleLogin}
              className="text-sm text-blue-600 hover:text-blue-500 underline"
            >
              Bypass Auth (Development Only)
            </button>
          </div>
        )}
=======
>>>>>>> f3fdf5fe94b4c05bc250053eb106d87d9ed6b7fa
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-100">
<<<<<<< HEAD
          {errorMessage && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {errorMessage}
            </div>
          )}
          
=======
>>>>>>> f3fdf5fe94b4c05bc250053eb106d87d9ed6b7fa
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={`pl-10 ${errors.email ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  className={`pl-10 ${errors.password ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-6 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link 
          href="/" 
          className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to website
        </Link>
      </div>
    </div>
  );
}
