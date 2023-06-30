import React, { useState } from "react";

type inputCommonType = {
  label?: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  type?: string;
};

const InputCommon: React.FC<inputCommonType> = ({
  label,
  state,
  setState,
  placeholder,
  type,
}) => {
  return (
    <div className="flex gap-1 flex-col">
      {label && (
        <label htmlFor={label} className="text-teal-light text-lg px-1">
          {label}t
        </label>
      )}

      <input
        type={type}
        name={label}
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={placeholder}
        className="bg-input-background text-start focus: outline-none text-white h-10 rounded-lg px-5 py-4 w-full "
      />
    </div>
  );
};

export default InputCommon;
