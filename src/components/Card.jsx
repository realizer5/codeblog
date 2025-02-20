import React from 'react'

export default function Card({ children }) {
    return (
        <div className='border border-gray-dark'>
            {children}
        </div>
    )
}

