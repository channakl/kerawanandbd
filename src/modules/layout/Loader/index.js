import { mergeClasses } from '@/helpers/className';
import { useState, useEffect } from 'react';

const Loader = (props) => {
    const { fullscreen = false, global = false, visible } = props;
    const [localVisible, setLocalVisibility] = useState(false);

    const setGlobalLoaderVisibility = (visible = true) => setLocalVisibility(visible);

    useEffect(() => {
        if (global) {
            window.setLoaderVisibility = setGlobalLoaderVisibility;
        }
    }, []);
    
    const openCondition = global ? localVisible : visible;

    return (
        <>
            {openCondition ? (
                <div className={mergeClasses(
                    (fullscreen ? 'w-screen h-screen' : 'w-full h-full' ) ,
                    'absolute left-0 top-0 z-[9999]',
                    'flex items-center justify-center',
                    'bg-[rgb(0,0,0,.5)]',
                )}>
                    <div className='loader'/>
                </div>
            ): null}
            <style jsx>
                {`
                   /* HTML: <div class="loader"></div> */
                   .loader {
                     width: 50px;
                     padding: 8px;
                     aspect-ratio: 1;
                     border-radius: 50%;
                     background: #25b09b;
                     --_m: 
                       conic-gradient(#0000 10%,#000),
                       linear-gradient(#000 0 0) content-box;
                     -webkit-mask: var(--_m);
                             mask: var(--_m);
                     -webkit-mask-composite: source-out;
                             mask-composite: subtract;
                     animation: l3 1s infinite linear;
                   }
                   @keyframes l3 {to{transform: rotate(1turn)}}
                `}
            </style>
        </>
    )
}

export default Loader;