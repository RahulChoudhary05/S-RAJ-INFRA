import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext();

export function Tabs({ defaultValue, children, className, onValueChange }) {
  const [value, setValue] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue, onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children }) {
  return <div className={`flex ${className}`}>{children}</div>;
}

export function TabsTrigger({ value, children }) {
  const { value: currentValue, setValue, onValueChange } = useContext(TabsContext);
  const isActive = currentValue === value;

  const handleClick = () => {
    setValue(value);
    if (onValueChange) onValueChange(value);
  };

  return (
    <button
      className={`px-4 py-2 ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-md`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }) {
  const { value: currentValue } = useContext(TabsContext);

  if (currentValue !== value) return null;

  return <div>{children}</div>;
}