const HistoryDetail = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Lịch sử khám bệnh</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="text-center py-12">
                    <i className="fa-solid fa-clipboard-list text-6xl text-gray-300 mb-4"></i>
                    <p className="text-gray-500 text-lg">Chưa có lịch sử khám bệnh</p>
                </div>
            </div>
        </div>
    )
}

export default HistoryDetail;