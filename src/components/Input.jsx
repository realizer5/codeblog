import { useId } from "react"

const Input = ({ label, type = "text", className = "", custom = false, ref, ...props }) => {
    const id = useId();

    return (
        <div className={`w-full`}>
            {label && <label htmlFor={id} className="inline-block text-nowrap mb-1 pl-2 text-gray-light">{label}</label>}
            <input id={id} type={type} className={custom ? custom : `px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full
                ${className}`} ref={ref} {...props} />
        </div>
    )
}

export default Input;
