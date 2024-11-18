import React from 'react';

export function Button({ variant = 'default', className, children, ...props }) {
  const variantClasses = {
    default: 'bg-blue-500 text-white hover:bg-blue-600',
    ghost: 'text-gray-600 hover:bg-gray-100',
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}