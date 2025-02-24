import React from 'react'

export default function LoadingDots({ className = "" }) {
    return (
        <div className={`flex space-x-2 justify-center items-center ${className}`}>
            <span className='sr-only'>Loading...</span>
            <div className='h-5 w-5 bg-gray-light rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-5 w-5 bg-gray-light rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-5 w-5 bg-gray-light rounded-full animate-bounce'></div>
        </div>
    )
}
