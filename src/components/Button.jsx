import React from 'react'

export default function Button({ children, type = "button", bgColor = "bg-blue-dark", textColor = "text-gray-light", className = "", ...props }) {
    return (
        <button type={type} className={`border border-slate-light cursor-pointer px-4 py-2 rounded-lg ${bgColor} ${textColor} duration-200 hover:bg-slate-light ${className}`} {...props}>
            {children}
        </button>
    )
}
