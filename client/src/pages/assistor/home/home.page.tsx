const AssistorHomePage = () => {
    return(
        <div className="flex flex-col gap-6">
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Chào ngày mới!</h1>
                <p className="text-gray-600 dark:text-gray-300">Bạn đang ở trang chủ, hãy nhanh chóng kiểm tra lịch hẹn và thông báo nhé!</p>
            </section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-4">
                    <h2 className="font-semibold text-blue-800 dark:text-blue-200">Các lịch hẹn khám bệnh cần xác nhận</h2>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Có 3 lịch hẹn khám bệnh.</p>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900 rounded-lg p-4">
                    <h2 className="font-semibold text-yellow-800 dark:text-yellow-200">Tin nhắn</h2>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">2 tin nhắn mới.</p>
                </div>
            </div>
        </div>
    );
};

export default AssistorHomePage;