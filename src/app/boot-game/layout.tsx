'use client';

// biome-ignore lint/style/useImportType: <explanation>
import React from 'react';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen bg-neutral-200 text-black relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/fondo-navidad.jpg')] bg-cover bg-no-repeat bg-center z-[-1]" />
        <div className="absolute inset-0 bg-black opacity-50 z-[-1]" />{/* Capa negra opaca */}
      </div>
      <div className='z-10 relative'>
        {children}
      </div>
    </div>
  );
}