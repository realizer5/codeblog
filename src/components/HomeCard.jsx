import React from 'react'

export default function HomeCard({ items = [] }) {
    return (
        <>
            {items?.map((item, index) => (
                <div key={item.text} className={`bg-blue-dark rounded-xl p-4 w-full ${items.length == index + 1 ? "md:col-span-2" : ""}`} >
                    <div className="bg-blue-light rounded-xl p-2 w-fit">
                        {item.icon}
                    </div>
                    <p className="mt-4 ml-1">{item.text}</p>
                </div >))}
        </>
    )
}
