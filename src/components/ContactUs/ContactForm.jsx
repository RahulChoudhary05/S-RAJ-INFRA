"use client"

import { useState, useRef } from "react"
import { Label } from "./label"
import { Input } from "./input"
import { cn } from "../../lib/utils"
import Layout from "../layout/layout"
import { collection, addDoc } from "firebase/firestore"
import { fireDB } from "../../firebase/FirebaseConfig"
import { WavyBackground } from "../common/WavyBackground/wavy-background"
import Loader from "../Loader/Loader"
import AnimatedHeader from "../Header/AnimatedHeader"
import { ContactInfo } from "./ContactInfo"
import { Mail, Phone, MessageSquare, User, Send, CheckCircle, AlertCircle } from "lucide-react"

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition-opacity duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition-opacity duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-primaryYellow to-transparent" />
  </>
)

const StatusPopup = ({ show, status, onClose }) => {
  if (!show) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl transform transition-all ease-in-out duration-300 scale-100 opacity-100 max-w-md mx-4">
        <div className="text-center">
          <div
            className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4 ${
              status.isError ? "bg-red-100" : "bg-green-100"
            }`}
          >
            {status.isError ? (
              <AlertCircle className="h-8 w-8 text-red-600" />
            ) : (
              <CheckCircle className="h-8 w-8 text-green-600" />
            )}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {status.isError ? "Oops! Something went wrong" : "Message Sent Successfully!"}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{status.message}</p>
          <button
            type="button"
            className={`inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              status.isError
                ? "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
                : "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
            }`}
            onClick={onClose}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({
    message: "",
    isError: false,
  })
  const formRef = useRef(null)
  const [formErrors, setFormErrors] = useState({})
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    message: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required"
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!formData.contactNo.trim()) {
      errors.contactNo = "Contact number is required"
    } else if (!/^\d{10}$/.test(formData.contactNo.replace(/[^0-9]/g, ""))) {
      errors.contactNo = "Please enter a valid 10-digit phone number"
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      errors.message = "Please provide a more detailed message (at least 10 characters)"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    const submissionData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      contactNo: formData.contactNo.trim(),
      message: formData.message.trim(),
      access_key: "41c2fe69-d194-46d4-a07a-ee02634de180",
      subject: "New Contact Form Submission - S RAJ INFRA PROJECTS",
      from_name: "S RAJ INFRA Contact Form",
      notification_recipient: "Contact Form Submission",
      submission_type: "contact",
      company_name: "S RAJ INFRA PROJECTS PRIVATE LIMITED",
      createdAt: new Date().toISOString(),
    }

    try {
      // Send to Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(submissionData),
      })

      const responseData = await response.json()

      if (response.status === 200) {
        // Save to Firestore
        await addDoc(collection(fireDB, "contactFormSubmissions"), submissionData)

        setSubmitStatus({
          message: "Thank you for reaching out! We've received your message and will get back to you within 24 hours.",
          isError: false,
        })

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          contactNo: "",
          message: "",
        })
        formRef.current?.reset()
        setShowPopup(true)
      } else {
        throw new Error(responseData.message || "Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error("Error during form submission: ", error)
      setSubmitStatus({
        message: error.message || "Something went wrong! Please try again or contact us directly.",
        isError: true,
      })
      setShowPopup(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      {loading && <Loader />}
      <AnimatedHeader />
      <ContactInfo />

      <div className="relative min-h-screen flex items-center justify-center py-20 px-4">
        <div className="absolute inset-0 -z-10">
          <WavyBackground
            colors={["#F1C40F", "#3498db", "#9b59b6", "#2ecc71"]}
            waveWidth={70}
            blur={15}
            speed="slow"
            waveOpacity={0.3}
            backgroundFill="rgba(30, 41, 59, 0.7)"
          />
        </div>

        <div className="relative z-10 max-w-2xl w-full mx-auto rounded-none md:rounded-2xl p-6 md:p-10 shadow-2xl bg-white bg-opacity-95 backdrop-blur-lg dark:bg-black dark:bg-opacity-90 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-primaryYellow bg-opacity-20 p-3 rounded-full">
                <MessageSquare className="h-8 w-8 text-primaryYellow" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">Get In Touch</h2>
            <p className="text-neutral-600 dark:text-neutral-300 max-w-md mx-auto leading-relaxed">
              Have a question or want to discuss a project? We'd love to hear from you. Send us a message and we'll
              respond as soon as possible.
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LabelInputContainer>
                <Label htmlFor="firstname" className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-primaryYellow" />
                  First Name
                </Label>
                <Input
                  id="firstname"
                  name="firstName"
                  placeholder="John"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`transition-all duration-300 ease-in-out focus:ring-2 focus:ring-primaryYellow focus:outline-none ${
                    formErrors.firstName ? "border-red-500 bg-red-50" : ""
                  }`}
                  required
                />
                {formErrors.firstName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {formErrors.firstName}
                  </p>
                )}
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="lastname" className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-primaryYellow" />
                  Last Name
                </Label>
                <Input
                  id="lastname"
                  name="lastName"
                  placeholder="Doe"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`transition-all duration-300 ease-in-out focus:ring-2 focus:ring-primaryYellow focus:outline-none ${
                    formErrors.lastName ? "border-red-500 bg-red-50" : ""
                  }`}
                  required
                />
                {formErrors.lastName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {formErrors.lastName}
                  </p>
                )}
              </LabelInputContainer>
            </div>

            <LabelInputContainer>
              <Label htmlFor="email" className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-primaryYellow" />
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="john.doe@example.com"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`transition-all duration-300 ease-in-out focus:ring-2 focus:ring-primaryYellow focus:outline-none ${
                  formErrors.email ? "border-red-500 bg-red-50" : ""
                }`}
                required
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {formErrors.email}
                </p>
              )}
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="number" className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-primaryYellow" />
                Contact Number
              </Label>
              <Input
                id="number"
                name="contactNo"
                placeholder="+91 98765 43210"
                type="tel"
                value={formData.contactNo}
                onChange={handleInputChange}
                className={`transition-all duration-300 ease-in-out focus:ring-2 focus:ring-primaryYellow focus:outline-none ${
                  formErrors.contactNo ? "border-red-500 bg-red-50" : ""
                }`}
                required
              />
              {formErrors.contactNo && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {formErrors.contactNo}
                </p>
              )}
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="message" className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-primaryYellow" />
                Your Message
              </Label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us about your project, questions, or how we can help you..."
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className={`w-full border rounded-lg bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input px-4 py-3 text-sm placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-primaryYellow transition-all duration-300 ease-in-out resize-none ${
                  formErrors.message ? "border-red-500 bg-red-50" : "border-gray-200"
                }`}
                required
              />
              {formErrors.message && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {formErrors.message}
                </p>
              )}
            </LabelInputContainer>

            <div className="pt-4">
              <button
                className="w-full bg-gradient-to-br from-primaryYellow to-yellow-500 text-white rounded-lg py-4 px-6 font-semibold shadow-lg hover:shadow-xl hover:from-yellow-500 hover:to-primaryYellow transition-all duration-300 relative group/btn flex items-center justify-center text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
                <BottomGradient />
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Need immediate assistance? Call us at{" "}
              <a href="tel:+918777806040" className="text-primaryYellow hover:underline font-medium">
                +91-8777806040
              </a>{" "}
              or email{" "}
              <a href="mailto:headoffice@srajinfra.com" className="text-primaryYellow hover:underline font-medium">
                headoffice@srajinfra.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <StatusPopup show={showPopup} status={submitStatus} onClose={() => setShowPopup(false)} />
    </Layout>
  )
}

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>
)
