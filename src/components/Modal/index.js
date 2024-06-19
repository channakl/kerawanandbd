import { mergeClasses } from "@root/src/helpers/className";
import CloseIcon from '@mui/icons-material/Close';

const Modal = (props) => {
    const { children, open = false, onClose, title, description } = props;

    if (!open) return null;
    return (
        <div className={mergeClasses(
            'absolute z-[100]',
            'w-screen h-screen bg-[rgba(0,0,0,0.5)]'
        )}>
            <div className={mergeClasses(
                'absolute z-[100]',
                'left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]',
                'w-[640px] max-w-[90vw] rounded-lg px-8 py-12',
                'bg-white shadow-2xl',
            )} onClick={() => {}}>
                <CloseIcon className="cursor-pointer absolute top-5 right-5" onClick={onClose} />
                <h3 className="text-gray-800 text-[28px] font-medium">{title}</h3>
                <p className="text-md text-gray-900 mt-1 mb-10">{description}</p>
                <>{children}</>
            </div>
        </div>
    )
}

export default Modal;