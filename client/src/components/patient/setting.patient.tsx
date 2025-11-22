const SettingDetail = () => {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cài đặt tài khoản</h2>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <span className="text-yellow-800">Tính năng chưa phát triển</span>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                        <div>
                            <h3 className="font-medium text-gray-900">Thông báo email</h3>
                            <p className="text-sm text-gray-500">Nhận thông báo qua email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                        <div>
                            <h3 className="font-medium text-gray-900">Thông báo SMS</h3>
                            <p className="text-sm text-gray-500">Nhận thông báo qua tin nhắn</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingDetail;