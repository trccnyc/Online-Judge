import { Link } from "react-router-dom"

export function Button({onClick,children,className}) {
    return <button onClick={onClick} className={`w-1/3 text-center mt-2 bg-gradient-to-br from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 ${className}`} >{children}</button>
}