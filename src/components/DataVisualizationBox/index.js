import { mergeClasses } from '@/helpers/className';
import React from 'react'

const DataVisualizationBox = (props) => {
    const { 
        className, color = 'gray-100', title, titleColor = 'gray-700', titleClassName, children
    } = props;
    return (
        <div className={mergeClasses(
            'rounded-lg p-5 w-full',
            `bg-${color}`,
            className
        )}>
            {title && (
                <h3 className={mergeClasses(
                    `text-md text-${titleColor} font-medium`,
                    titleClassName
                )}
                >{title}</h3>
            )}
            {children}
        </div>
    )
}

export default DataVisualizationBox;