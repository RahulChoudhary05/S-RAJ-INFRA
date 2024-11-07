import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { fireDB } from "../../firebase/FirebaseConfig"; // Import fireDB to interact with Firestore
import { collection, addDoc } from "firebase/firestore"; // Firestore methods to add data
import Layout from "../layout/layout";
import CountryCode from "../data/countrycode.json";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    try {
      setLoading(true);
      // Add the form data to Firestore
      const docRef = await addDoc(collection(fireDB, "contactUs"), {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNo: `${data.countrycode} ${data.phoneNo}`, // Combine country code and phone number
        message: data.message,
        timestamp: new Date(),
      });
      alert("Form submitted successfully!");
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        phoneNo: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <Layout>
      <form
        className="flex flex-col gap-7 p-6 bg-neutral-50 shadow-lg rounded-lg max-w-lg mx-auto animate-fadeIn"
        onSubmit={handleSubmit(submitContactForm)}
      >
        {/* First Name */}
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter first name"
            className="input-style"
            {...register("firstName", { required: "Please enter your first name." })}
          />
          {errors.firstName && <span className="text-yellow-500">{errors.firstName.message}</span>}
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Enter last name"
            className="input-style"
            {...register("lastName", { required: "Please enter your last name." })}
          />
          {errors.lastName && <span className="text-yellow-500">{errors.lastName.message}</span>}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="Enter email"
            className="input-style"
            {...register("email", { required: "Please enter your email." })}
          />
          {errors.email && <span className="text-yellow-500">{errors.email.message}</span>}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <div className="flex gap-5">
            <select
              className="input-style w-[80px]"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((ele, i) => (
                <option key={i} value={ele.code}>
                  {ele.code} - {ele.country}
                </option>
              ))}
            </select>
            <input
              type="text"
              id="phoneNo"
              placeholder="1234567890"
              className="input-style w-full"
              {...register("phoneNo", {
                required: "Please enter your phone number.",
                minLength: { value: 10, message: "Invalid phone number" },
                maxLength: { value: 12, message: "Invalid phone number" },
              })}
            />
          </div>
          {errors.phoneNo && <span className="text-yellow-500">{errors.phoneNo.message}</span>}
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            placeholder="Enter your message here"
            className="input-style resize-none"
            rows="5"
            {...register("message", { required: "Please enter your message." })}
          />
          {errors.message && <span className="text-yellow-500">{errors.message.message}</span>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-4 rounded-md bg-yellow-500 px-6 py-3 text-center text-[13px] font-bold text-black transition-all duration-200 
            ${!loading ? "hover:scale-105 hover:bg-yellow-600" : "bg-gray-400 cursor-not-allowed"}`}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </Layout>
  );
};

export default ContactUsForm;
