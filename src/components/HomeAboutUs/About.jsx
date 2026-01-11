'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

import Welcome from './Welcome'
import Vision from './Vision'
import Mission from './Mission'

const sections = [
  { id: 'welcome', title: 'Welcome', component: Welcome },
  { id: 'vision', title: 'Our Vision', component: Vision },
  { id: 'mission', title: 'Our Mission', component: Mission },
]

export default function About() {
  const [activeSection, setActiveSection] = useState('welcome')

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold font-playfair text-center mb-8">About S Raj Infra Projects</h1>
      <div className="space-y-4">
        {sections.map((section) => (
          <motion.div key={section.id} layout>
            <button
              onClick={() => setActiveSection(activeSection === section.id ? '' : section.id)}
              className="w-full flex justify-between items-center bg-gray-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span className="text-xl font-semibold">{section.title}</span>
              <ChevronDown
                className={`transform transition-transform ${
                  activeSection === section.id ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {activeSection === section.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <section.component />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

