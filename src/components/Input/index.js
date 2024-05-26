import { mergeClasses } from "@/helpers/className";
import { forwardRef, useState } from "react";

const Input = forwardRef((props, ref) => {
    const {
        type = 'text', min, max, name, id, placeholder, value, label,
        disabled = false, required = false, className: customClassName,
    } = props;
    
    return (
        <div>
            {label && <label for={id} className="text-md">{label}</label>}
            <input
                className={mergeClasses(
                    'w-full mt-1 py-3 px-5',
                    'rounded-xl',
                    'bg-gray-100 border border-gray-300',
                    'outline-teal-500',
                    'text-md',
                    disabled && 'text-gray-400 cursor-not-allowed',
                    customClassName
                )}
                ref={ref}
                type={type}
                min="1"
                id={id}
                name={name}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                autoComplete="false"
            />
        </div>
    );
});

export default Input;