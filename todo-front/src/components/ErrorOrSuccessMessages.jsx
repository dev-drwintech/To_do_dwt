const ErrorOrSuccessMessages = ({error,success}) =>{

    if (error){
        return (<div className="mb-6 p-4 bg-red-100/80 backdrop-blur-sm border border-red-200/50 rounded-xl text-red-700 text-sm animate-in slide-in-from-top duration-300">
            {error}
        </div>)
    }
        return (<div className="mb-6 p-4 bg-green-100/80 backdrop-blur-sm border border-green-200/50 rounded-xl text-green-700 text-sm animate-in slide-in-from-top duration-300">
            {success}
        </div>)
}

export default ErrorOrSuccessMessages;
