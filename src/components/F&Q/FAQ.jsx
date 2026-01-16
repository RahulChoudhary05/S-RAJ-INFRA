"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      id: "01",
      question: "What is S Raj Infra Projects' vision?",
      answer:
        "Our time is now. We are on a continuous journey of growth; developing our brands, building on our assets, and expanding our distribution reach systems. Our focus is on leveraging our strengths to become one of the most successful companies in the region. The strong commitment of our people across the organization fuels us forward.",
    },
    {
      id: "02",
      question: "What do you offer to employees?",
      answer:
        "We offer three key benefits: 1) The challenge of meaningful work – Our dynamic workplace gives all employees an interesting and rewarding role. You will be working with a team of people who are committed to meeting the business objectives. 2) The chance to grow and develop – Our diversified business portfolio offers the exciting opportunity to move across various industries and add to your skillset. 3) A healthy work-life balance – at S Raj Infra Projects we nurture our people and allow them to enjoy family life and all that the country has to offer.",
    },
    {
      id: "03",
      question: "What do you look for in candidates?",
      answer:
        "We look for people who can make a tangible impact with positive differences to our organization. We value creative and fresh thinking regardless of your role - someone who can bring new ideas to make things more effective for the team. Team spirit is essential; we need someone who thrives when collaborating with a diverse range of people with different views, perspectives and priorities. We also value positivity, determination, a pragmatic mindset, and willingness to embrace our philosophy.",
    },
    {
      id: "04",
      question: "How can I join your team?",
      answer:
        "We're looking for talented people who share our core values and are ready to make a difference. Bring your spark to our corporate office and make an impact in the business world. You can apply through our careers page by submitting your application with relevant details about your experience and skills.",
    },
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 rounded-lg shadow-sm">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-zinc-800 bg-opacity-10 border border-[#866A04] text-zinc-800 mb-4">
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </span>
          CAREERS FAQ
        </div>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          Learn more about career opportunities at S Raj Infra Projects and what makes us a great place to work.
        </p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border-b border-neutral-200 pb-6 transition-all duration-300 ${
              openIndex === index ? "bg-neutral-50 rounded-lg p-6 -mx-6 shadow-sm" : "p-6 -mx-6"
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left flex items-start justify-between focus:outline-none group"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl font-playfair text-zinc-800">{faq.id}</span>
                <h3 className="text-xl font-medium text-neutral-950 group-hover:text-zinc-800 transition-colors">
                  {faq.question}
                </h3>
              </div>
              <span
                className={`ml-6 flex-shrink-0 mt-1 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
              >
                {openIndex === index ? (
                  <div className="h-6 w-6 rounded-full bg-zinc-800 text-white flex items-center justify-center">
                    <Minus size={14} />
                  </div>
                ) : (
                  <div className="h-6 w-6 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center group-hover:bg-zinc-800 group-hover:text-white transition-colors">
                    <Plus size={14} />
                  </div>
                )}
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
              }`}
            >
              <div className="pl-10 pr-6 text-neutral-600">
                <p className="whitespace-pre-line">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQSection
