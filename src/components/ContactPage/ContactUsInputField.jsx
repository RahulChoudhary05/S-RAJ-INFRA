"use client";
import React, {useState} from "react";
import { Label } from "./label";
import { Input } from "./input";
import { cn } from "../../lib/utils";
import Layout from "../layout/layout";
import { collection, addDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { WavyBackground } from "./WavyBackground/wavy-background";
import Loader from "../Loader/Loader"
// import AnimatedHeader from "../Header/AnimatedHeader";
// import ContactInfo from "./ContactInfo";


export function ContactUsInputField() {
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      firstName: e.target.firstname.value,
      lastName: e.target.lastname.value,
      email: e.target.email.value,
      contactNo: e.target.number.value,
      message: e.target.message.value,
    };

    try {
      // Save to Firestore
      await addDoc(collection(fireDB, "contactFormSubmissions"), formData);
      console.log("Data saved to Firestore successfully");

      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error during form submission: ", error);
    }
  };

  return (
      <div className="relative flex items-center justify-center h-screen">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <WavyBackground/>
        </div>
        {loading && <Loader />}
        {/* Contact Form */}
        <div className="relative z-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white bg-opacity-85 backdrop-blur-lg dark:bg-black">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Welcome to S RAJ INFRA PROJECTS PRIVATE LIMITED
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Have a question or just want to say hello? Get in touch
          </p>
          <form className="my-8" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input id="firstname" placeholder="Shree" type="text" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input id="lastname" placeholder="Ram" type="text" />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" placeholder="headoffice@srajinfra.com" type="email" />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="number">Contact No</Label>
              <Input id="number" placeholder="••••••••" type="tel" />
            </LabelInputContainer>
            <LabelInputContainer className="mb-8">
              <Label htmlFor="message">Your message</Label>
              <Input
                id="message"
                placeholder="Write your message here..."
                className="flex h-24 w-full bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600"
              />
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Submit &rarr;
              <BottomGradient />
            </button>
          </form>
        </div>
      </div>
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
