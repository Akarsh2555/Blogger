import React from "react";

function Button({
    children,
    type =  'button',
    bgColor = 'bg-blue-600',
    txtColor = 'text-white',
    className = '',
    ...props
}) {
    return(
        <button className={`pw-4 py-2 rounded-lg ${bgColor} ${txtColor} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button