import React from 'react'
const TEAM = [
  {id:'t1', name:'Md Sameer Sadar', role:'Head of Team', bio:'Enthusiast Developer, Working on the FrontEnd', img:'/src/assets/team/sameer.jpg'},
  {id:'t2', name:'Md Asadul Haque', role:'Lead Frontend Dev', bio:'Builds accessible interfaces.', img:'/src/assets/team/asad.jpg'},
  {id:'t3', name:'Md Saif', role:'Learning Designer', bio:'Working on the chatBot with proper support', img:'/src/assets/team/saif.jpg'}
]


export default function About(){
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <section className="rounded-lg p-6 bg-white dark:bg-gray-800/60 shadow">
        <h2 className="text-2xl font-semibold">Mission & Vision</h2>
        <p className="mt-3 text-gray-600 dark:text-gray-300">Remove barriers to quality education by building accessible, multilingual and low-bandwidth learning experiences.</p>
      </section>

      <section className="rounded-lg p-6 bg-white dark:bg-gray-800/60 shadow">
        <h3 className="text-xl font-semibold">Meet the Team</h3>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TEAM.map(m=>(
            <div key={m.id} className="p-4 rounded-lg ring-1 ring-gray-200 dark:ring-gray-700 hover:shadow-lg transition" data-team-name={m.name}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  {m.img ? (
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-primary to-accent text-white font-semibold">
            {m.name.split(' ').map(s=>s[0]).slice(0,2).join('')}
    </div>
  )}
</div>

                <div>
                  <div className="font-semibold">{m.name}</div>
                  <div className="text-xs text-gray-500">{m.role}</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg p-6 bg-white dark:bg-gray-800/60 shadow">
        <h3 className="text-lg font-semibold">Accessibility</h3>
        <ul className="mt-3 list-disc ml-5 text-sm text-gray-600">
          <li>Semantic HTML & ARIA-friendly roles</li>
          <li>High-contrast, keyboard-focusable components</li>
          <li>Progressive enhancement and low-bandwidth optimization</li>
        </ul>
      </section>
    </div>
  )
}
