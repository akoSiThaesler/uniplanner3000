"use client";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Uniplanner!</h1>
      <p className="mb-6">
        Plan your university courses and schedule with ease.
      </p>
      {/*     
        A[Landing Page] -->|User enters| B[Introduction/Welcome]
        B -->|Navigate via Sidebar| C[Main Web Application]
        C -->|Toggle Menu| D[Sidebar Navigation]
        D -->|Select| E[Dashboard View]        
        D -->|Select| F[Schedule Management]  
        D -->|Select| G[Course Management]     
        D -->|Select| H[Settings])    */}
      <Link
        href="/webapp"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Enter WebApp
      </Link>
    </div>
  );
}
