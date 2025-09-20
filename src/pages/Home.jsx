import React from 'react'
import { motion } from 'framer-motion'
import hero from '../assets/logo.png'
import CourseCard from '../ui/CourseCard'

const COURSES = [
  {id:'c1',title:'Foundations of Python',category:'Programming',difficulty:'Beginner',pop:95,summary:'Python basics and problem solving.'},
  {id:'c2',title:'React for Web',category:'Web Development',difficulty:'Intermediate',pop:90,summary:'Build apps using React, hooks and router.'},
  {id:'c3',title:'Data Science Intro',category:'Data Science',difficulty:'Intermediate',pop:85,summary:'Pandas, NumPy and visualizations.'}
]

export default function Home(){
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <section className="grid md:grid-cols-2 gap-6 items-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold">Learn without limits — anywhere, anytime</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">SikshaConnect brings quality, inclusive learning to every learner. Optimized for low-bandwidth and mobile-first experiences.</p>
          <div className="mt-6 flex gap-3">
            <a href="/courses" className="btn-primary">Start Learning</a>
            <a href="/about" className="px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700">About</a>
          </div>
        </div>
        <div className="flex justify-center">
          <img src={hero} alt="Illustration" className="w-full max-w-md rounded-lg shadow-lg" />
        </div>
      </section>

      <motion.section initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="space-y-4">
        <h2 className="text-2xl font-semibold">Popular Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {COURSES.map(c=> <CourseCard key={c.id} course={c} />)}
        </div>
      </motion.section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="col-span-2 rounded-lg p-6 bg-white dark:bg-gray-800/60 shadow">
          <h3 className="text-xl font-semibold">Our Impact</h3>
          <p className="text-sm mt-2 text-gray-500">Measured in learners, lessons and languages — showing scale and inclusivity.</p>
          <div className="mt-6 grid grid-cols-3 gap-4">
            <Stat label="Students" value="12,000" />
            <Stat label="Lessons" value="4,500" />
            <Stat label="Languages" value="13" />
          </div>
        </div>
        <aside className="rounded-lg p-6 bg-gradient-to-b from-primary/5 to-accent/5 shadow">
          <h4 className="font-semibold">Quick stats</h4>
          <ul className="mt-3 text-sm text-gray-600">
            <li>Optimized for low bandwidth</li>
            <li>Offline-friendly UI</li>
            <li>Keyboard & screen reader friendly</li>
          </ul>
        </aside>
      </section>
    </div>
  )
}

function Stat({label,value}) {
  return <div className="text-center">
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-sm text-gray-500">{label}</div>
  </div>
}
