import React from 'react'
import { useLocation } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'
import logo from '../assets/logo.png'   // ✅ your logo

export default function Header(){
  const [dark, setDark] = useLocalStorage('sc_dark', false)
  const loc = useLocation()

  React.useEffect(()=> {
    document.documentElement.classList.toggle('dark', dark)
  },[dark])

  return (
    <header className="sticky top-0 z-40 bg-white/70 dark:bg-gray-800/70 backdrop-blur">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          {/* ✅ Logo image instead of SC text box */}
          <img 
            src={logo} 
            alt="SikshaConnect Logo" 
            className="w-12 h-12 object-contain"
          />
          <div>
            <div className="font-semibold">SikshaConnect</div>
            <div className="text-xs text-gray-500 dark:text-gray-300">
              Quality Education — SDG 4
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-3">
          <NavLink to="/" active={loc.pathname === '/'}>Home</NavLink>
          <NavLink to="/courses" active={loc.pathname.startsWith('/courses')}>Courses</NavLink>
          <NavLink to="/about" active={loc.pathname === '/about'}>About</NavLink>
          <NavLink to="/contact" active={loc.pathname === '/contact'}>Contact</NavLink>
          <button 
            aria-label="toggle dark" 
            onClick={()=>setDark(!dark)} 
            className="p-2 rounded-md ring-1 ring-gray-200 dark:ring-gray-700"
          >
            {dark ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  )
}

function NavLink({to, children, active}){
  return (
    <a 
      href={to} 
      className={`px-3 py-2 rounded-md ${
        active 
          ? 'bg-gray-100 dark:bg-gray-700' 
          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      {children}
    </a>
  )
}
