const FormInput = ({label,type,name,value,onChange,placeholder,required}) =>{
    return (
        <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required = {required}
                    className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all duration-300 placeholder-gray-500 group-hover:bg-white/70"
            />
        </div>

    )

}



export default FormInput;