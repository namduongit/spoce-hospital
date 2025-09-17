const RotateLoading = () => {
    return (
        <div className="loading fixed top-0 start-0 w-[100vw] h-[100vh] bg-gray-500/5 flex justify-center items-center gap-2">
            <div className="text-center">
                <div
                    className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"
                ></div>
                <h2 className="text-zinc-600 mt-4">Loading...</h2>
                <p className="text-zinc-600">
                    Your adventure is about to begin
                </p>
            </div>
        </div>
    )
}

export default RotateLoading;