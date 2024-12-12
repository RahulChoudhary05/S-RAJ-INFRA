import React, { useState, useRef } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { cn } from "../../lib/utils";
import Layout from "../layout/layout";
import { collection, addDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { WavyBackground } from "../common/WavyBackground/wavy-background";
import Loader from "../Loader/Loader";
import AnimatedHeader from "../Header/AnimatedHeader";
import { ContactInfo } from "./ContactInfo";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    message: "",
    isError: false
  });
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      firstName: e.target.firstname.value,
      lastName: e.target.lastname.value,
      email: e.target.email.value,
      contactNo: e.target.number.value,
      message: e.target.message.value,
      access_key: "41c2fe69-d194-46d4-a07a-ee02634de180",
      // Custom email subject and notification settings
      subject: "New Contact Form Submission - S RAJ INFRA PROJECTS",
      from_name: "S RAJ INFRA Contact Form",
      notification_recipient: "Contact Form Submission",
      submission_type: "contact",
      company_name: "S RAJ INFRA PROJECTS PRIVATE LIMITED"
    };

    try {
      // Send to Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();

      if (response.status === 200) {
        // Save to Firestore
        await addDoc(collection(fireDB, "contactFormSubmissions"), formData);
        
        setSubmitStatus({
          message: `Thank you. We will review it and get back to you soon.`,
          isError: false
        });
        setShowPopup(true);
        formRef.current.reset();
      } else {
        throw new Error(responseData.message || "Something went wrong!");
      }

      setTimeout(() => setShowPopup(false), 5000);
    } catch (error) {
      console.error("Error during form submission: ", error);
      setSubmitStatus({
        message: error.message || "Something went wrong!",
        isError: true
      });
      setShowPopup(true);
    } finally {
      setLoading(false);
      setTimeout(() => setShowPopup(false), 5000);
    }
  };

  return (
    <Layout>
      {loading && <Loader />}
      <AnimatedHeader />
      <ContactInfo />
      <div className="relative flex items-center justify-center h-screen">
        <div className="absolute inset-0 -z-10">
          <WavyBackground />
        </div>
        <div className="relative z-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white bg-opacity-85 backdrop-blur-lg dark:bg-black">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            WELCOME TO S RAJ INFRA PROJECTS PRIVATE LIMITED
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Have a question or just want to say hello? Get in touch
          </p>
          <form className="my-8" ref={formRef} onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input id="firstname" name="firstname" placeholder="Shree" type="text" required />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input id="lastname" name="lastname" placeholder="Ram" type="text" required />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" placeholder="headoffice@srajinfra.com" type="email" required />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="number">Contact No</Label>
              <Input id="number" name="number" placeholder="••••••••" type="tel" required />
            </LabelInputContainer>
            <LabelInputContainer className="mb-8">
              <Label htmlFor="message">Your message</Label>
              <Input
                id="message"
                name="message"
                placeholder="Write your message here..."
                className="flex h-24 w-full bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600"
                required
              />
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit →"}
              <BottomGradient />
            </button>
          </form>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-2xl transform transition-all ease-in-out duration-300 scale-100 opacity-100">
            <div className="text-center">
              <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${
                submitStatus.isError ? "bg-red-100" : "bg-green-100"
              }`}>
                {submitStatus.isError ? (
                  <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                ) : (
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </div>
              <h3 className={`mt-2 text-xl font-medium text-gray-900 dark:text-white`}>
                {submitStatus.isError ? "Error!" : "Submitted!"}
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {submitStatus.message}
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    submitStatus.isError 
                      ? "bg-red-100 text-red-900 hover:bg-red-200 focus-visible:ring-red-500"
                      : "bg-green-100 text-green-900 hover:bg-green-200 focus-visible:ring-green-500"
                  }`}
                  onClick={() => setShowPopup(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>
    {children}
  </div>
);