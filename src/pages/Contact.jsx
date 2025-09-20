import React, { useState } from 'react'

export default function Contact(){
  const [form, setForm] = useState({name:'',email:'',message:''})
  const [status, setStatus] = useState(null)

  function validate(){
    if(!form.name.trim()) return 'Enter name'
    if(!/\S+@\S+\.\S+/.test(form.email)) return 'Valid email required'
    if(!form.message.trim()) return 'Enter a message'
    return null
  }

  function submit(e){
    e.preventDefault()
    const err = validate()
    if(err){ setStatus({type:'error',text:err}); return }
    setStatus({type:'success', text:'Message sent (simulated).'})
    setForm({name:'',email:'',message:''})
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold">Contact Us</h2>
      <form onSubmit={submit} className="mt-4 space-y-4">
        <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name" className="w-full px-3 py-2 rounded-md ring-1 ring-gray-200" />
        <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Your email" className="w-full px-3 py-2 rounded-md ring-1 ring-gray-200" />
        <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Message" className="w-full px-3 py-2 rounded-md ring-1 ring-gray-200 h-32" />
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-md bg-primary text-white">Send Message</button>
          <div className="text-sm text-gray-500">Or email <a href="mailto:hello@sikshaconnect.org" className="underline">hello@sikshaconnect.org</a></div>
        </div>
        {status && <div className={`mt-2 text-sm ${status.type==='error' ? 'text-red-500' : 'text-green-500'}`}>{status.text}</div>}
      </form>

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="rounded-lg p-4 bg-white dark:bg-gray-800/60">
          <h4 className="font-semibold">Get in touch</h4>
          <p className="text-sm mt-2">Phone: <a href="tel:+911234567890" className="underline">+91 12345 67890</a></p>
          <p className="text-sm">Address: 72 Main Road, Patna</p>
        </div>
        <div className="rounded-lg overflow-hidden">
          <iframe title="map" src="https://maps.google.com/maps?q=patna&t=&z=13&ie=UTF8&iwloc=&output=embed" className="w-full h-48"></iframe>
        </div>
      </div>
    </div>
  )
}
