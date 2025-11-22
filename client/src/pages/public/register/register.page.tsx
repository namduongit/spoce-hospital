import { useState } from "react";
import { NavLink } from "react-router-dom";
import thumbnail from "../../../assets/images/auth/thumbnail.png";
import person from "../../../assets/images/auth/person.png";
import { register } from "../../../services/auth.service";
import useCallApi from "../../../hooks/useCallApi";

const RegisterPage = () => {
    const { execute, notify, loading } = useCallApi();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPasssword, setShowConfirmPassword] = useState<boolean>(false);

    const [submitData, setSubmitData] = useState({
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const handleChangeSubmit = (field: keyof typeof submitData, value: string) => {
        setSubmitData(prev => ({ ...prev, [field]: value }));
    }

    async function handleRegister() {
        const restResponse = await execute(register(submitData));
        notify(restResponse!, "Đăng ký thành công");
    }

    return (
        <main className="register-page w-full min-h-[90vh] flex">
            <div className="hidden lg:flex w-1/2 bg-gray-50 items-center justify-center p-6 ps-20">
                <img
                    src={thumbnail}
                    alt="Thumbnail"
                    className="max-h-[90vh] w-auto object-contain rounded-lg shadow-lg"
                />
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-12 bg-gray-50">
                <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
                    <div className="flex items-center gap-3 mb-8">
                        <img src={person} alt="Person" className="w-14 h-14" />
                        <h3 className="text-2xl font-semibold">Đăng ký tài khoản 👋</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="relative flex items-center ring-1 focus:ring-blue-500 focus-within:ring-2 focus-within:ring-blue-500 rounded-lg px-3 py-2">
                            <i className="fa-solid fa-envelope-circle-check text-gray-400 mr-2"></i>
                            <input
                                type="email"
                                placeholder="email@example.com"
                                className="flex-1 outline-none bg-transparent"
                                value={submitData.email}
                                onChange={(event) => handleChangeSubmit("email", event.target.value)}
                            />
                        </div>

                        <div className="relative flex items-center ring-1 focus:ring-blue-500 focus-within:ring-2 focus-within:ring-blue-500 rounded-lg px-3 py-2">
                            <i className="fa-solid fa-lock text-gray-400 mr-2"></i>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="flex-1 outline-none bg-transparent"
                                value={submitData.password}
                                onChange={(event) => handleChangeSubmit("password", event.target.value)}
                            />
                            <i
                                className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"
                                    } text-gray-400 cursor-pointer absolute top-1/2 right-2 lg:right-4 -translate-y-1/2`}
                                onClick={() => setShowPassword(!showPassword)}
                            ></i>
                        </div>

                        <div className="relative flex items-center ring-1 focus:ring-blue-500 focus-within:ring-2 focus-within:ring-blue-500 rounded-lg px-3 py-2">
                            <i className="fa-solid fa-lock text-gray-400 mr-2"></i>
                            <input
                                type={showConfirmPasssword ? "text" : "password"}
                                placeholder="••••••••"
                                className="flex-1 outline-none bg-transparent"
                                value={submitData.passwordConfirm}
                                onChange={(event) => handleChangeSubmit("passwordConfirm", event.target.value)}
                            />
                            <i
                                className={`fa-solid ${showConfirmPasssword ? "fa-eye" : "fa-eye-slash"
                                    } text-gray-400 cursor-pointer absolute top-1/2 right-2 lg:right-4 -translate-y-1/2`}
                                onClick={() => setShowConfirmPassword(!showConfirmPasssword)}
                            ></i>
                        </div>

                        {submitData.password !== submitData.passwordConfirm && (
                            <span className="text-red-600 text-sm block">
                                * Mật khẩu xác nhận phải giống với mật khẩu đăng ký
                            </span>
                        )}
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
                            disabled={loading}
                            onClick={() => handleRegister()}>
                            {loading ? "Đang đăng ký..." : "Đăng ký"}
                        </button>

                        <NavLink
                            to="/auth/login"
                            className="flex-1 border py-2 rounded-lg hover:bg-gray-50 transition text-center cursor-pointer"
                        >
                            Đăng nhập
                        </NavLink>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default RegisterPage;
