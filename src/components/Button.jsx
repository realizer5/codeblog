import React from 'react'

export default function Button({ children, type = "button", primaryColor = "blue-dark", textColor = "text-gray-light",
    secondaryColor = "slate-light", className = "", ...props }) {
    return (
        <button type={type} className={`border border-${secondaryColor} cursor-pointer px-4 py-2 rounded-lg bg-${primaryColor} ${textColor} hover:bg-${secondaryColor} duration-200 ${className}`} {...props}>
            {children}
        </button>
    )
}
