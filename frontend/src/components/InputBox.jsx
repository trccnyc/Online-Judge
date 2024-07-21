export function InputBox({label,onChange,placeholder,type,name,autoComplete}){
    return <div className="mb-4 ">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {label} :
    </label>
    <input
      name={name}
      autoComplete={autoComplete}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      required
      className="shadow appearance-none  border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
};