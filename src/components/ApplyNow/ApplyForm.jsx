import React from 'react';
import Layout from '../layout/layout';
import { WavyBackground } from "../ContactPage/WavyBackground/wavy-background";
import { Label } from "../ContactPage/label";
import { Input } from "../ContactPage/input";
import { cn } from "../../lib/utils";
import { collection, addDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition-opacity duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition-opacity duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

function ApplyForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      firstName: e.target.firstname.value,
      lastName: e.target.lastname.value,
      email: e.target.email.value,
      contactNo: e.target.number.value,
      message: e.target.message.value,
      function0alArea: e.target.functionalArea.value,
      careerLevel: e.target.careerLevel.value,
    };

    try {
      // Save to Firestore
      await addDoc(collection(fireDB, "applyFormSubmissions"), formData);
      console.log("Data saved to Firestore successfully");

      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error during form submission: ", error);
    }
  };
  return (
    <Layout>
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600">
        {/* Full-screen background */}
        <div className="absolute inset-0 h-screen -z-5">
          <WavyBackground />
        </div>

        <div className="relative z-10 max-w-3xl w-full mx-auto  rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white bg-opacity-80 backdrop-blur-lg dark:bg-black">
          <h2 className="text-3xl font-extrabold text-neutral-800 text-center mb-8 animate-pulse">Apply Now</h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input 
                  id="firstname" 
                  placeholder="John" 
                  type="text" 
                  className="transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input 
                  id="lastname" 
                  placeholder="Doe" 
                  type="text" 
                  className="transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="number">Contact No</Label>
              <Input 
                id="number" 
                placeholder="••••••••" 
                type="tel" 
                className="transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </LabelInputContainer>

            {/* Select Functional Area and Career Level */}
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

            {/* Message Section */}
            <LabelInputContainer>
              <Label htmlFor="message">Your message</Label>
              <Input
                id="message"
                placeholder="Write your message here..."
                className="w-full h-24 p-3 border rounded-lg bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                required
              />
            </LabelInputContainer>

            {/* Submit Button */}
            <button
              className="w-full bg-gradient-to-br from-black dark:from-zinc-900 to-neutral-600 text-white rounded-md py-3 px-6 font-medium shadow-md hover:opacity-90 transition duration-300 relative group/btn"
              type="submit"
            >
              Submit &rarr;
              <BottomGradient />
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>
    {children}
  </div>
);

export default ApplyForm;
