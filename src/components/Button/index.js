import { mergeClasses } from "@/helpers/className";

const Button = (props) => {
    const { type, children, className: customClassName, onClick } = props;
    return (
        <button
            className={mergeClasses(
                'bg-teal-500 hover:bg-teal-600',
                'w-full p-3 rounded-lg',
                'text-md text-white font-medium',
                customClassName
            )}
            onClick={onClick}
            type={type}
            {...(type === 'submit' && { value: 'submit' })}            
        >{children}</button>
    )
}

export default Button;