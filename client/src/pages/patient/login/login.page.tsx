import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import thumbnail from "../../../assets/images/auth/thumbnail.png";
import person from "../../../assets/images/auth/person.png";
import useCallApi from "../../../hooks/useCallApi";
import { useAuth } from "../../../contexts/auth.context";
import { login } from "../../../services/auth.service";


const LoginPage = () => {
    const { execute, notify, loading } = useCallApi();
    const auth = useAuth();

    const navigate = useNavigate();

    const [submitData, setSubmitData] = useState({ email: "", password: "" });

    const handleChangeSubmit = (field: keyof typeof submitData, value: string) => {
        setSubmitData(prev => ({ ...prev, [field]: value }));
    }

    const [showPassword, setShowPassword] = useState<boolean>(false);

    async function handleLogin() {
        const restResponse = await execute(login(submitData));
        notify(restResponse!, "Đăng nhập thành công");
        if (restResponse?.result) {
            auth.setAuth(restResponse.data);
            navigate("/");
        }
    }

    return (
        <main className="login-page w-full min-h-[90vh] flex">
            <div className="login-wrap w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-12 bg-gray-50">
                <div className="login__left w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
                    <div className="flex items-center gap-3 mb-8">
                        <img src={person} alt="Person" className="w-14 h-14" />
                        <h3 className="text-2xl font-semibold">Chào mừng trở lại 👋</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="relative flex items-center ring-1 focus:ring-blue-500 focus-within:ring-2 focus-within:ring-blue-500 rounded-lg px-3 py-2">
                            <i className="fa-solid fa-envelope-circle-check text-gray-400 mr-2"></i>
                            <input
                                type="email"
                                placeholder="email@example.com"
                                className="flex-1 outline-none bg-transparent"
                                value={submitData.email}
                                onChange={(e) => handleChangeSubmit("email", e.target.value)}
                            />
                        </div>

                        <div className="relative flex items-center ring-1 focus:ring-blue-500 focus-within:ring-2 focus-within:ring-blue-500 rounded-lg px-3 py-2">
                            <i className="fa-solid fa-lock text-gray-400 mr-2"></i>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="flex-1 outline-none bg-transparent"
                                value={submitData.password}
                                onChange={(e) => handleChangeSubmit("password", e.target.value)}
                            />
                            <i
                                className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"
                                    } text-gray-400 cursor-pointer absolute top-1/2 right-2 lg:right-4 -translate-y-1/2`}
                                onClick={() => setShowPassword(!showPassword)}
                            ></i>
                        </div>

                        <div className="relative flex items-center ring-1 focus:ring-blue-500 focus-within:ring-2 focus-within:ring-blue-500 rounded-lg px-3 py-2">
                            <i className="fa-solid fa-key text-gray-400 mr-2"></i>
                            <input
                                type="text"
                                placeholder="Verification code"
                                className="flex-1 outline-none bg-transparent"
                            />
                            <span className="text-sm text-gray-500 absolute top-1/2 right-2 lg:right-4 -translate-y-1/2">Captcha</span>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer" onClick={handleLogin} disabled={loading}>
                            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                        </button>
                        <button className="flex-1 border py-2 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                            Quên mật khẩu
                        </button>
                    </div>
                    <div className="text-center text-gray-700 mt-3">Hoặc</div>
                    <div className="mt-3 flex gap-3">
                        <NavLink
                            to="/auth/register"
                            className="flex-1 border py-2 rounded-lg hover:bg-gray-50 transition text-center cursor-pointer"
                        >
                            Đăng ký
                        </NavLink>
                        <button className="flex-1 border py-2 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                            <i className="fa-brands fa-google me-2"></i>
                            Google
                        </button>
                    </div>
                </div>
            </div>

            <div className="login__right hidden lg:flex w-1/2 bg-gray-50 items-center justify-center p-6 pe-20">
                <img
                    src={thumbnail}
                    alt="Thumbnail"
                    className="max-h-[90vh] w-auto object-contain rounded-lg shadow-lg"
                />
            </div>
        </main>
    );
};

export default LoginPage;
