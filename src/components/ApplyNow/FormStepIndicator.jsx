export function FormStepIndicator({ currentStep }) {
  return (
    <div className="flex justify-center mb-6">
      <div className="w-full max-w-xs">
        <div className="relative">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-200">
            <div
              style={{ width: currentStep === 1 ? "50%" : "100%" }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-900 transition-all duration-500"
            ></div>
          </div>
          <div className="flex justify-between">
            <div className={`text-xs font-semibold ${currentStep >= 1 ? "text-gray-900" : "text-gray-400"}`}>
              Personal Info
            </div>
            <div className={`text-xs font-semibold ${currentStep >= 2 ? "text-gray-900" : "text-gray-400"}`}>
              Professional Details
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

