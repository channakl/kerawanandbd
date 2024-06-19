import { mergeClasses } from "@/helpers/className";

const Button = (props) => {
    const { type, children, className: customClassName, onClick, disabled = false} = props;
    return (
        <button
            className={mergeClasses(
                'bg-teal-500 hover:bg-teal-600',
                'w-full p-3 rounded-lg',
                'text-md text-white font-medium',
                'cursor-pointer',
                disabled && 'opacity-40 !cursor-not-allowed',
                customClassName
            )}
            onClick={disabled ? () => {} : onClick}
            type={type}
            disable={disabled}
            {...(type === 'submit' && { value: 'submit' })}            
        >{children}</button>
    )
}

export default Button;