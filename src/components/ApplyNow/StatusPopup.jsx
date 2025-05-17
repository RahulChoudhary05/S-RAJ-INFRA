import { CheckCircle, AlertCircle } from "lucide-react";

export function StatusPopup({ show, status, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-2xl transform transition-all ease-in-out duration-300 scale-100 opacity-100 max-w-md w-full mx-4 border-t-4 border-primaryYellow"
      >
        <div className="text-center">
          <div
            className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${
              status.isError ? "bg-red-100" : "bg-green-100"
            }`}
          >
            {status.isError ? (
              <AlertCircle className="h-8 w-8 text-red-600" />
            ) : (
              <CheckCircle className="h-8 w-8 text-green-600" />
            )}
          </div>
          <h3
            className={`mt-4 text-2xl font-bold ${
              status.isError ? "text-red-900" : "text-gray-900"
            } dark:text-white`}
          >
            {status.isError ? "Submission Failed" : "Application Submitted!"}
          </h3>
          <p className="mt-3 text-md text-gray-500 dark:text-gray-400">{status.message}</p>
          <div className="mt-6">
            <button
              type="button"
              className={`inline-flex justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium ${
                status.isError
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-primaryYellow text-white hover:bg-yellow-500"
              } focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                status.isError ? "focus-visible:ring-red-500" : "focus-visible:ring-yellow-500"
              } transition-colors duration-300 w-full`}
              onClick={onClose}
            >
              {status.isError ? "Try Again" : "Got it, thanks!"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

