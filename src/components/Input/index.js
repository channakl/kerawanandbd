import { mergeClasses } from "@/helpers/className";
import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
    const {
        type = 'text', min, max, name, minLength, maxLength, id, placeholder, value, label,
        disabled = false, required = false, className: customClassName, inputClassName, onChange = () => {}
    } = props;
    
    return (
        <div className={customClassName}>
            {label && <label for={id} className="text-md">{label}</label>}
            <input
                className={mergeClasses(
                    'w-full mt-1 py-3 px-5',
                    'rounded-xl',
                    'bg-[#F6F7F9] border border-gray-300',
                    'outline-teal-500',
                    'text-md',
                    disabled && 'text-gray-400 cursor-not-allowed',
                    inputClassName
                )}
                ref={ref}
                type={type}
                min={min}
                max={max}
                minLength={minLength}
                maxLength={maxLength}
                id={id}
                name={name}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                autoComplete="off"
                onChange={onChange}
            />
        </div>
    );
});

export default Input;