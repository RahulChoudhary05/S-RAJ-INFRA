import React, { useState, useRef } from 'react';
import Layout from '../layout/layout';
import { WavyBackground } from "../common/WavyBackground/wavy-background";
import { Label } from "../ContactUs/label";
import { Input } from "../ContactUs/input";
import { cn } from "../../lib/utils";
import { collection, addDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { HeroVideo } from './HeroVideo';
import Loader from '../Loader/Loader';
import ModernFAQ from '../F&Q/FAQ';

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition-opacity duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition-opacity duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

function ApplyForm() {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    message: '',
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
      functionalArea: e.target.functionalArea.value,
      careerLevel: e.target.careerLevel.value,
      access_key: "41c2fe69-d194-46d4-a07a-ee02634de180",
      // Custom email subject and notification settings
      subject: "New Job Application - S RAJ INFRA PROJECTS",
      from_name: "S RAJ INFRA Careers",
      notification_recipient: "Career Application Submission",
      submission_type: "career",
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
        await addDoc(collection(fireDB, "applyFormSubmissions"), formData);
        
        setSubmitStatus({
          message: "Thank you for your application. We will review it and get back to you soon",
          isError: false
        });
        setShowPopup(true);
        formRef.current.reset();
      } else {
        throw new Error(responseData.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error during form submission: ", error);
      setSubmitStatus({
        message: error.message || "An error occurred. Please try again.",
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
      <HeroVideo/>
      <ModernFAQ/>
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600">
        {/* Full-screen background */}
        <div className="absolute inset-0 h-screen -z-5">
          <WavyBackground />
        </div>

        <div className="relative z-10 max-w-3xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white bg-opacity-80 backdrop-blur-lg dark:bg-black">
          <h2 className="text-3xl font-extrabold text-neutral-800 text-center mb-8 animate-pulse">Apply Now</h2>

          <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input 
                  id="firstname" 
                  placeholder="John" 
                  type="text" 
                  className="transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input 
                  id="lastname" 
                  placeholder="Doe" 
                  type="text" 
                  className="transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </LabelInputContainer>
            </div>

            <LabelInputContainer>
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                placeholder="you@example.com" 
                type="email" 
                className="transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="number">Contact No</Label>
              <Input 
                id="number" 
                placeholder="••••••••" 
                type="tel" 
                className="transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </LabelInputContainer>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LabelInputContainer>
                <Label className="block text-gray-700 font-semibold">Functional Area</Label>
                <select
                  id="functionalArea"
                  name="functionalArea"
                  className="w-full p-3 rounded-lg bg-gray-50 dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:[#FF6347] transition duration-300 ease-in-out"
                  required
                >
                  <option value="">Select Functional Area</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Accountant">Accountant</option>
                  <option value="Production">Production</option>
                  <option value="Procurement">Procurement</option>
                </select>
              </LabelInputContainer>

              <LabelInputContainer>
                <Label className="block text-gray-700 font-semibold">Career Level</Label>
                <select
                  id="careerLevel"
                  name="careerLevel"
                  className="w-full p-3 rounded-lg bg-gray-50 dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:[#FF6347] transition duration-300 ease-in-out"
                  required
                >
                  <option value="">Select Career Level</option>
                  <option value="Entry Level">Entry Level</option>
                  <option value="First Level Management">First Level Management</option>
                  <option value="Mid Level Management">Mid Level Management</option>
                  <option value="Senior Level Management">Senior Level Management</option>
                </select>
              </LabelInputContainer>
            </div>

            <LabelInputContainer>
              <Label htmlFor="message">Your message</Label>
              <Input
                id="message"
                placeholder="Write your message here..."
                className="w-full h-24 p-3 border rounded-lg bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                required
              />
            </LabelInputContainer>

            <button
              className="w-full bg-gradient-to-br from-black dark:from-zinc-900 to-neutral-600 text-white rounded-md py-3 px-6 font-medium shadow-md hover:opacity-90 transition duration-300 relative group/btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit →"}
              <BottomGradient />
            </button>
          </form>
        </div>
      </div>

      {/* Status Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-2xl transform transition-all ease-in-out duration-300 scale-100 opacity-100">
            <div className="text-center">
              <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${
                submitStatus.isError ? 'bg-red-100' : 'bg-green-100'
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
              <h3 className={`mt-2 text-xl font-medium ${
                submitStatus.isError ? 'text-red-900' : 'text-gray-900'
              } dark:text-white`}>
                {submitStatus.isError ? 'Submission Failed' : 'Application Submitted!'}
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {submitStatus.message}
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium ${
                    submitStatus.isError 
                      ? 'bg-red-100 text-red-900 hover:bg-red-200' 
                      : 'bg-green-100 text-green-900 hover:bg-green-200'
                  } focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    submitStatus.isError ? 'focus-visible:ring-red-500' : 'focus-visible:ring-green-500'
                  }`}
                  onClick={() => setShowPopup(false)}
                >
                  {submitStatus.isError ? 'Try Again' : 'Got it, thanks!'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>
    {children}
  </div>
);

export default ApplyForm;