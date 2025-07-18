const Title = ({ text }) => {
    return (
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl blur-xl opacity-60"></div>
            <div className="relative bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-lg">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                { text }
              </h1>
            </div>
          </div>
        </div>
    )
}

export default Title;