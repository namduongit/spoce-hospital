import person from '../../../assets/images/auth/person.png';
import thumbnail from '../../../assets/images/auth/thumbnail.png';
import { useState } from 'react';

const DoctorLoginPage = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    return (
        <main className="login-page min-h-[88vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 w-full px-5 lg:px-0">
            <div className="login-page__wrap w-full max-w-4xl flex flex-col md:flex-row bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-blue-100 dark:border-blue-900">
   
                <div className="hidden md:flex flex-1 items-center justify-center bg-blue-100 dark:bg-blue-950 p-8">
                    <img src={thumbnail} alt="Doctor thumbnail" className="max-w-xs w-full h-auto object-contain rounded-xl shadow-lg" />
                </div>
  
                <div className="flex-1 flex flex-col justify-center p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <img src={person} alt="Person" className="w-14 h-14 rounded-full border-2 border-blue-500" />
                        <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300">Chào mừng trở lại 👋</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="relative flex items-center border border-blue-200 dark:border-blue-700 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 bg-blue-50 dark:bg-gray-800">
                            <i className="fa-solid fa-envelope-circle-check text-blue-400 dark:text-blue-300 mr-2"></i>
                            <input
                                type="email"
                                placeholder="email@example.com"
                                className="flex-1 outline-none bg-transparent text-gray-800 dark:text-gray-100"
                            />
                        </div>
                        <div className="relative flex items-center border border-blue-200 dark:border-blue-700 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 bg-blue-50 dark:bg-gray-800">
                            <i className="fa-solid fa-lock text-blue-400 dark:text-blue-300 mr-2"></i>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="flex-1 outline-none bg-transparent text-gray-800 dark:text-gray-100"
                            />
                            <i
                                className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"} text-blue-400 dark:text-blue-300 cursor-pointer absolute top-1/2 right-2 lg:right-4 -translate-y-1/2`}
                                onClick={() => setShowPassword(!showPassword)}
                            ></i>
                        </div>
                        <div className="relative flex items-center border border-blue-200 dark:border-blue-700 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 bg-blue-50 dark:bg-gray-800">
                            <i className="fa-solid fa-key text-blue-400 dark:text-blue-300 mr-2"></i>
                            <input
                                type="text"
                                placeholder="Verification code"
                                className="flex-1 outline-none bg-transparent text-gray-800 dark:text-gray-100"
                            />
                            <span className="text-sm text-blue-500 dark:text-blue-300 absolute top-1/2 right-2 lg:right-4 -translate-y-1/2">Captcha</span>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer font-semibold shadow">
                            Đăng nhập
                        </button>
                        <button className="flex-1 border border-blue-200 dark:border-blue-700 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition cursor-pointer text-blue-700 dark:text-blue-300 font-semibold">
                            Quên mật khẩu
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default DoctorLoginPage;