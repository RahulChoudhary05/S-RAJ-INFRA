import { useState, useRef } from "react";
import Layout from "../layout/layout";
import { WavyBackground } from "../common/WavyBackground/wavy-background";
import { Label } from "../ContactUs/label";
import { Input } from "../ContactUs/input";
import { cn } from "../../lib/utils";
import { collection, addDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { HeroVideo } from "./HeroVideo";
import Loader from "../Loader/Loader";
import FAQSection from "../F&Q/FAQ";
import { CheckCircle, AlertCircle, Upload, Briefcase, Send, FileText } from "lucide-react";

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition-opacity duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition-opacity duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

function ApplyForm() {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ message: "", isError: false });
  const [resumeFile, setResumeFile] = useState(null);
  const [formStep, setFormStep] = useState(1);
  const formRef = useRef(null);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    functionalArea: "",
    careerLevel: "",
    message: ""
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setResumeFile(file);
    } else {
      alert("File size should not exceed 5MB");
      e.target.value = null;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = (step) => {
    const errors = {};
    if (step === 1) {
      if (!formData.firstName) errors.firstName = "First name is required";
      if (!formData.lastName) errors.lastName = "Last name is required";
      if (!formData.email) errors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
      if (!formData.contactNo) errors.contactNo = "Contact number is required";
      else if (!/^\d{10}$/.test(formData.contactNo.replace(/[^0-9]/g, ""))) errors.contactNo = "Please enter a valid 10-digit phone number";
    } else if (step === 2) {
      if (!formData.functionalArea) errors.functionalArea = "Please select a functional area";
      if (!formData.careerLevel) errors.careerLevel = "Please select a career level";
      if (!formData.message) errors.message = "Please tell us why you want to join our team";
      else if (formData.message.length < 20) errors.message = "Please provide a more detailed response";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (validateForm(1)) {
      setFormStep(2);
      const formPosition = formRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: formPosition, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    setFormStep(1);
    setFormErrors({});
    const formPosition = formRef.current.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top : formPosition, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(2)) return;

    setLoading(true);

    try {
      let resumeUrl = null;
      if (resumeFile) {
        const formData = new FormData();
        formData.append('file', resumeFile);
        formData.append('upload_preset', 'my_upload_preset');
        formData.append('folder', 'SRajInfraProjectPrivateLimited');
        formData.append('resource_type', 'raw');
        
        const response = await fetch('https://api.cloudinary.com/v1_1/dnlrwuxxs/raw/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload resume');
        }

        const data = await response.json();
        resumeUrl = data.secure_url;
      }

      const completeFormData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        contactNo: formData.contactNo,
        functionalArea: formData.functionalArea,
        careerLevel: formData.careerLevel,
        message: formData.message,
        createdAt: new Date(),
        hasResume: resumeUrl ? true : false,
        resumeFileUrl: resumeUrl
      };

      await addDoc(collection(fireDB, "applyFormSubmissions"), completeFormData);

      const emailContent = `
New Job Application Received

Applicant Information:
- Name: ${completeFormData.firstName} ${completeFormData.lastName}
- Email: ${completeFormData.email}
- Contact: ${completeFormData.contactNo}

Position Details:
- Functional Area: ${completeFormData.functionalArea}
- Career Level: ${completeFormData.careerLevel}

Message from Applicant:
${completeFormData.message}

Resume Information:
${completeFormData.hasResume ? `- File URL: ${completeFormData.resumeFileUrl}` : '- No resume attached'}

This application was submitted on ${new Date().toLocaleString()}
      `.trim();

      const web3FormData = new FormData();
      web3FormData.append("access_key", "41c2fe69-d194-46d4-a07a-ee02634de180");
      web3FormData.append("subject", `New Job Application - ${completeFormData.functionalArea} Position`);
      web3FormData.append("from_name", "S RAJ INFRA Careers Portal");
      web3FormData.append("to_name", "HR Team");
      web3FormData.append("message", emailContent);

      const emailResponse = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: web3FormData
      });

      if (!emailResponse.ok) {
        throw new Error('Failed to send email notification');
      }

      setSubmitStatus({
        message: "Thank you for your application. We will review it and get back to you soon.",
        isError: false
      });
      setShowPopup(true);
      formRef.current.reset();
      setResumeFile(null);
      setFormStep(1);
      setFormErrors({});
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        contactNo: "",
        functionalArea: "",
        careerLevel: "",
        message: ""
      });
    } catch (error) {
      console.error("Error during form submission:", error);
      setSubmitStatus({
        message: error.message || "An error occurred. Please try again.",
        isError: true
      });
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  const functionalAreas = [
    "HR",
    "Finance",
    "Marketing",
    "Accountant",
    "Production",
    "Procurement",
    "Engineering",
    "IT",
    "Operations",
    "Sales",
    "Legal",
    "Administration",
  ];

  return (
    <Layout>
      {loading && <Loader />}
      <HeroVideo />
      <FAQSection />
      <div className="relative min-h-screen flex  items-center justify-center py-20 px-4">
        <div className="absolute inset-0 h-full -z-10">
          <WavyBackground
            colors={["#F1C40F", "#3498db ", "#9b59b6", "#2ecc71"]}
            waveWidth={70}
            blur={15}
            speed="slow"
            waveOpacity={0.3}
            backgroundFill="rgba(30, 41, 59, 0.7)"
          />
        </div>

        <div className="relative z-10 max-w-3xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-xl bg-white bg-opacity-90 backdrop -blur-lg dark:bg-black dark:bg-opacity-80">
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-full max-w-xs">
                <div className="relative">
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-200">
                    <div
                      style={{ width: formStep === 1 ? "50%" : "100%" }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primaryYellow transition-all duration-500"
                    ></div>
                  </div>
                  <div className="flex justify-between">
                    <div className={`text-xs font-semibold ${formStep >= 1 ? "text-primaryYellow" : "text-gray-400"}`}>
                      Personal Info
                    </div>
                    <div className={`text-xs font-semibold ${formStep >= 2 ? "text-primaryYellow" : "text-gray-400"}`}>
                      Professional Details
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-neutral-800 text-center">
              {formStep === 1 ? (
                <span className="flex items-center justify-center">
                  <Briefcase className="mr-2 h-8 w-8 text-primaryYellow" />
                  Apply Now
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Send className="mr-2 h-8 w-8 text-primaryYellow" />
                  Professional Details
                </span>
              )}
            </h2>
            <p className="text-center text-neutral-600 mt-2">
              {formStep === 1
                ? "Join our team and be part of our growth journey"
                : "Tell us about your professional experience"}
            </p>
          </div>

          <form ref={formRef} className="space-y-6" onSubmit={formStep === 1 ? handleNextStep : handleSubmit}>
            {formStep === 1 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <LabelInputContainer>
                    <Label htmlFor="firstname">First name</Label>
                    <Input
                      id="firstname"
                      name="firstName"
                      placeholder="John"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`transition duration-300 ease-in-out focus:ring-2 focus:ring-primaryYellow focus:outline-none ${
                        formErrors.firstName ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
                  </LabelInputContainer>
                  <LabelInputContainer>
                    <Label htmlFor="lastname">Last name</Label>
                    <Input
                      id="lastname"
                      name="lastName"
                      placeholder="Doe"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`transition duration-300 ease-in-out focus:ring-2 focus:ring-primaryYellow focus:outline-none ${
                        formErrors.lastName ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
                  </LabelInputContainer>
                </div>

                <LabelInputContainer>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`transition duration-300 ease-in-out focus:ring-2 focus:ring-primaryYellow focus:outline-none ${
                      formErrors.email ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor="number">Contact No</Label>
                  <Input
                    id="number"
                    name="contactNo"
                    placeholder="Your phone number"
                    type="tel"
                    value={formData.contactNo}
                    onChange={handleInputChange}
                    className={`transition duration-300 ease-in-out focus:ring-2 focus:ring-primaryYellow focus:outline-none ${
                      formErrors.contactNo ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {formErrors.contactNo && <p className="text-red-500text-xs mt-1">{formErrors.contactNo}</p>}
                </LabelInputContainer>

                <div className="pt-4">
                  <button
                    className="w-full bg-gradient-to-br from-primaryYellow to-yellow-500 text-white rounded-md py-3 px-6 font-medium shadow-md hover:opacity-90 transition duration-300 relative group/btn flex items-center justify-center"
                    type="submit"
                  >
                    Continue to Professional Details
                    <svg
                      className="ml-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      ></path>
                    </svg>
                    <BottomGradient />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <LabelInputContainer>
                    <Label htmlFor="functionalArea" className="block text-gray-700 font-semibold">
                      Functional Area
                    </Label>
                    <select
                      id="functionalArea"
                      name="functionalArea"
                      value={formData.functionalArea}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-lg bg-gray-50 dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primaryYellow transition duration-300 ease-in-out ${
                        formErrors.functionalArea ? "border-red-500" : ""
                      }`}
                      required
                    >
                      <option value="">Select Functional Area</option>
                      {functionalAreas.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                    {formErrors.functionalArea && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.functionalArea}</p>
                    )}
                  </LabelInputContainer>

                  <LabelInputContainer>
                    <Label htmlFor="careerLevel" className="block text-gray-700 font-semibold">
                      Career Level
                    </Label>
                    <select
                      id="careerLevel"
                      name="careerLevel"
                      value={formData.careerLevel}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-lg bg-gray-50 dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primaryYellow transition duration-300 ease-in-out ${
                        formErrors.careerLevel ? "border-red-500" : ""
                      }`}
                      required
                    >
                      <option value="">Select Career Level</option>
                      <option value="Entry Level">Entry Level</option>
                      <option value="First Level Management">First Level Management</option>
                      <option value="Mid Level Management">Mid Level Management</option>
                      <option value="Senior Level Management">Senior Level Management</option>
                      <option value="Executive">Executive</option>
                    </select>
                    {formErrors.careerLevel && <p className="text-red-500 text-xs mt-1">{formErrors.careerLevel}</p>}
                  </LabelInputContainer>
                </div>

                <LabelInputContainer>
                  <Label htmlFor="resume" className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-primaryYellow" />
                    Upload Resume (PDF, DOC, DOCX)
                  </Label>
                  <div className="relative">
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="resume"
                      className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primaryYellow transition-colors bg-gray-50 dark:bg-zinc-800"
                    >
                      <div className="flex flex-col items-center">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500 text-center">
                          {resumeFile ? resumeFile.name : "Click to upload your resume (max 5MB)"}
                        </span>
                      </div>
                    </label>
                    {resumeFile && (
                      <div className="mt-2 flex items-center text-sm text-green-600">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Resume uploaded successfully
                      </div>
                    )}
                  </div>
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor="message">Why do you want to join our team?</Label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us why you're interested in joining S Raj Infra Projects and what you can bring to our team..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full h-24 p-3 border rounded-lg bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-primaryYellow transition duration-300 ease-in-out ${
                      formErrors.message ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {formErrors.message && <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>}
                </LabelInputContainer>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="sm:w-1/3 bg-gray-200 text-gray-800 rounded-md py-3 px-6 font-medium hover:bg-gray-300 transition duration-300 flex items-center justify-center"
                  >
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 17l-5-5m0 0l5-5m-5 5h12"
                      ></path>
                    </svg>
                    Back
                  </button>
                  <button
                    className="sm:w-2/3 bg-gradient-to-br from-primaryYellow to-yellow-500 text-white rounded-md py-3 px-6 font-medium shadow-md hover:opacity-90 transition duration-300 relative group/btn flex items-center justify-center"
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
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                    <BottomGradient />
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Status Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-2xl transform transition-all ease-in-out duration-300 scale-100 opacity-100 max-w-md w-full mx-4 border-t-4 border-primaryYellow">
            <div className="text-center">
              <div
                className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${
                  submitStatus.isError ? "bg-red-100" : "bg-green-100"
                }`}
              >
                {submitStatus.isError ? (
                  <AlertCircle className="h-8 w-8 text-red-600" />
                ) : (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                )}
              </div>
              <h3
                className={`mt-4 text-2xl font-bold ${
                  submitStatus.isError ? "text-red-900" : "text-gray-900"
                } dark:text-white`}
 >
                {submitStatus.isError ? "Submission Failed" : "Application Submitted!"}
              </h3>
              <p className="mt-3 text-md text-gray-500 dark:text-gray-400">{submitStatus.message}</p>
              <div className="mt-6">
                <button
                  type="button"
                  className={`inline-flex justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium ${
                    submitStatus.isError
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-primaryYellow text-white hover:bg-yellow-500"
                  } focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    submitStatus.isError ? "focus-visible:ring-red-500" : "focus-visible:ring-yellow-500"
                  } transition-colors duration-300 w-full`}
                  onClick={() => setShowPopup(false)}
                >
                  {submitStatus.isError ? "Try Again" : "Got it, thanks!"}
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
  <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>
);

export default ApplyForm;