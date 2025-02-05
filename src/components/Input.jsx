import { forwardRef, useId } from "react"

const Input = ({ label, type = "text", className = "", ...props }, ref) => { // didn't added props to input and it was causing error without any description or hind and form was not submiting cuz i was adding in props when calling this annoying error
    const id = useId();

    return (
        <div className="w-full">
            {label && <label htmlFor={id} className="inline-block mb-1 pl-2 text-black">{label}</label>}
            <input type={type} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full
                ${className}`} ref={ref} {...props} />
        </div>
    )
}

export default forwardRef(Input);
