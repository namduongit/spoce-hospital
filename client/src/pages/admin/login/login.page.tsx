import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {;
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [submitData, setSubmitData] = useState({
        email: "",
        password: ""
    });

    const handleChangeSubmit = (field: keyof typeof submitData, value: string) => {
        setSubmitData(prev => ({ ...prev, [field]: value }));
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                        <i className="fa-solid fa-user-shield text-2xl text-white"></i>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Quản trị viên
                    </h2>
                    <p className="text-gray-600">
                        Đăng nhập vào hệ thống quản lý
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8">
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                    <i className="fa-solid fa-envelope text-gray-400"></i>
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={submitData.email}
                                    onChange={(e) => handleChangeSubmit("email", e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="admin@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mật khẩu *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                    <i className="fa-solid fa-lock text-gray-400"></i>
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={submitData.password}
                                    onChange={(e) => handleChangeSubmit("password", e.target.value)}
                                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={false}
                            className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {false ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Đang đăng nhập...
                                </>
                            ) : (
                                <>
                                    <i className="fa-solid fa-sign-in-alt mr-2"></i>
                                    Đăng nhập
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="text-center">
                            <button
                                type="button"
                                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                                onClick={() => navigate("/")}
                            >
                                ← Quay lại trang chủ
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-xs text-gray-500">
                        <i className="fa-solid fa-shield-alt mr-1"></i>
                        Trang này chỉ dành cho quản trị viên có thẩm quyền
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
