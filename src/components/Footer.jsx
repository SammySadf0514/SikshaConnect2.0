import React from 'react'
import sdgLogo from '../assets/sdg.png'   // ✅ Import the SDG logo

export default function Footer(){
  return (
    <footer className="mt-12 p-6 bg-white/60 dark:bg-gray-800/60">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-300">
        
        {/* Left side: normal footer text */}
        <div>© {new Date().getFullYear()} SikshaConnect</div>
        
        {/* Center: SDG logo (bigger) */}
        <div className="flex flex-col items-center">
          <img src={sdgLogo} alt="SDG Logo" className="h-20 w-auto" />   {/* bigger */}
          <span className="text-xs mt-1">United Nations SDG 4</span>
        </div>
        
        {/* Right side */}
        <div>Built for SDG 4 — Prototype</div>
      </div>
    </footer>
  )
}
