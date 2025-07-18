const FormButton = ({onClick,loading,loadingText,buttonLabel}) =>{

    return (
        <button onClick={onClick} disabled={loading} className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      {loadingText}
                    </div>
                  ) : (
                    buttonLabel
            )}
        </button>
    )

}

export default FormButton;