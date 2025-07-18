const FormOngletButton =({ type, isLogin,setIsLogin , isLeft}) =>{

    const handleClick = () => {setIsLogin(type === 'login')}
    const isActive = (isLogin && type==="login") || (!isLogin && type==="register");
    const borderRadius = isLeft ? 'rounded-l-xl' : 'rounded-r-xl';

    return (
        <button onClick={handleClick}
                className={`flex-1 py-3 px-4 font-medium transition-all duration-300 ${borderRadius} ${
                  isActive ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' : 'bg-white/30 text-gray-600 hover:bg-white/50'
                }`}
              >
                {type === 'login' ? 'Connexion' : 'Inscription'}
        </button>
    )

}
export default FormOngletButton;




