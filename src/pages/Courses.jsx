import React, { useState } from 'react'
import CourseCard from '../ui/CourseCard'
const ALL = [
  {id:'c1',title:'Foundations of Python',category:'Programming',difficulty:'Beginner',pop:95,summary:'Python basics and problem solving.'},
  {id:'c2',title:'React for Web',category:'Web Development',difficulty:'Intermediate',pop:90,summary:'Build apps using React, hooks and router.'},
  {id:'c3',title:'Data Science Intro',category:'Data Science',difficulty:'Intermediate',pop:85,summary:'Pandas, NumPy and visualizations.'},
  {id:'c4',title:'Machine Learning 101',category:'AI/ML',difficulty:'Advanced',pop:80,summary:'Intro to ML workflows.'},
  {id:'c5',title:'Digital Literacy',category:'General',difficulty:'Beginner',pop:88,summary:'Essential digital skills.'},
  {id:'c6',title:'Communication Skills',category:'Soft Skills',difficulty:'Beginner',pop:75,summary:'Presentation and storytelling.'}
]

export default function Courses(){
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')
  const [dif, setDif] = useState('All')

  const cats = ['All', ...new Set(ALL.map(c=>c.category))]
  const difs = ['All', ...new Set(ALL.map(c=>c.difficulty))]

  const filtered = ALL.filter(c=>{
    if(cat !== 'All' && c.category !== cat) return false
    if(dif !== 'All' && c.difficulty !== dif) return false
    if(q && !(`${c.title} ${c.summary} ${c.category}`.toLowerCase().includes(q.toLowerCase()))) return false
    return true
  })

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-semibold">Courses</h2>
        <div className="flex gap-3 items-center">
          <input
          placeholder="Search courses..."
          value={q}
          onChange={e => setQ(e.target.value)}
          className="px-3 py-2 rounded-md 
             bg-white dark:bg-gray-800 
             text-gray-900 dark:text-gray-100 
             ring-1 ring-gray-200 dark:ring-gray-700"
/>

            <select
            value={cat}
            onChange={e => setCat(e.target.value)}
            className="px-3 py-2 rounded-md 
             bg-white dark:bg-gray-800 
             text-gray-900 dark:text-gray-100 
             ring-1 ring-gray-200 dark:ring-gray-700"
            >
  {cats.map(c=> <option key={c}>{c}</option>)}
</select>

          <select
          value={dif}
          onChange={e => setDif(e.target.value)}
          className="px-3 py-2 rounded-md 
             bg-white dark:bg-gray-800 
             text-gray-900 dark:text-gray-100 
             ring-1 ring-gray-200 dark:ring-gray-700"
        >
        {difs.map(d=> <option key={d}>{d}</option>)}
        </select>

        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filtered.map(c=> <CourseCard key={c.id} course={c} />)}
      </section>
      {filtered.length===0 && <div className="text-center text-gray-500 mt-6">No courses matched.</div>}
    </div>
  )
}
