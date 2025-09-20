import React, { useEffect, useRef } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const START = [{id:'b0',from:'bot',text:'Hi! Im SikshaBot — ask me about courses, enrollment, or instructors.'}]

export default function Chatbot(){
  const [open, setOpen] = useLocalStorage('sc_chat_open', false)
  const [messages, setMessages] = useLocalStorage('sc_chat_msgs', START)
  const [input, setInput] = React.useState('')
  const [typing, setTyping] = React.useState(false)
  const endRef = useRef()

  useEffect(()=> {
    if(open) endRef.current?.scrollIntoView({behavior:'smooth'})
  },[open,messages,typing])

  function send(text){
    if(!text.trim()) return
    const user = {id:'u'+Date.now(), from:'user', text}
    const next = [...messages, user].slice(-50)
    setMessages(next)
    setInput('')
    respond(text)
  }
  function respond(text){
    setTyping(true)
    setTimeout(()=> {
      const q = text.toLowerCase()
      let reply = "Sorry, I didn't catch that. Try 'What courses do you offer?'"
      if(q.includes('course')) {
        const nodes = Array.from(document.querySelectorAll('[data-course-title]')).map(n=>n.getAttribute('data-course-title'))
        reply = nodes.length ? `We offer: ${nodes.join(', ')}` : 'We have many courses — check the Courses page.'
      } else if(q.includes('enroll')) {
        reply = 'Steps: 1) Go to Courses → 2) Click Enroll → 3) Fill form (demo).'
      } else if(q.includes('instructor') || q.includes('who')) {
        const names = Array.from(document.querySelectorAll('[data-team-name]')).map(n=>n.getAttribute('data-team-name'))
        reply = names.length ? `Our team: ${names.join(', ')}` : 'Visit About page for instructor info.'
      }
      const bot = {id:'b'+Date.now(), from:'bot', text:reply}
      setMessages(prev=>[...prev, bot].slice(-50))
      setTyping(false)
    }, 600 + Math.random()*700)
  }

  return (
    <>
      <button onClick={()=>setOpen(true)} className="chat-fab bg-accent text-white">
        💬
      </button>
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96 bg-white dark:bg-gray-800/90 rounded-lg shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 flex flex-col">
          <div className="p-3 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
            <div className="font-semibold">SikshaBot</div>
            <small className="text-xs text-gray-500">AI Tutor (demo)</small>
            <button onClick={()=>setOpen(false)}>✕</button>
          </div>
          <div className="p-3 flex-1 overflow-y-auto space-y-3">
            {messages.map(m=>(
              <div key={m.id} className={`max-w-[85%] ${m.from==='user' ? 'ml-auto text-right' : ''}`}>
                <div className={`inline-block p-2 rounded-lg ${m.from==='user' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100'}`}>{m.text}</div>
              </div>
            ))}
            {typing && <div className="text-sm text-gray-500">SikshaBot is typing...</div>}
            <div ref={endRef}></div>
          </div>
          <form className="p-3 border-t border-gray-100 dark:border-gray-700" onSubmit={(e)=>{e.preventDefault(); send(input)}}>
            <div className="flex gap-2">
              <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask about courses, enrollment..." className="flex-1 px-3 py-2 rounded-md ring-1 ring-gray-200 dark:ring-gray-700" />
              <button className="px-3 py-2 rounded-md bg-primary text-white">Send</button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
