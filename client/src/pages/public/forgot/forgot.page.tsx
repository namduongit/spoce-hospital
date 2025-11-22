import { useState } from "react";
import { useNavigate } from "react-router-dom";

import thumbnail from "../../../assets/images/auth/thumbnail.png";
import person from "../../../assets/images/auth/person.png";
import useCallApi from "../../../hooks/useCallApi";
import { forgot } from "../../../services/auth.service";

const ForgotPasswordPage = () => {
    const { execute, notify, loading } = useCallApi();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const handleSendEmail = async () => {
        const restResponse = await execute(forgot({ email: email }));
        notify(restResponse, "Đã gửi mật khẩu mới");
        alert("Email khôi phục mật khẩu đã được gửi!");
        navigate("/auth/login");
    };

    return (
        <main className="forgot-password-page w-full min-h-[90vh] flex">
            <div className="forgot-wrap w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-12 bg-gray-50">
                <div className="forgot__left w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                        <img src={person} alt="Person" className="w-14 h-14" />
                        <h3 className="text-2xl font-semibold">Quên mật khẩu 🔐</h3>
                    </div>

                    <p className="text-gray-600 mb-6">
                        Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn hướng dẫn để đặt lại mật khẩu.
                    </p>

                    <div className="space-y-4">
                        <div className="relative flex items-center ring-1 focus:ring-blue-500 focus-within:ring-2 focus-within:ring-blue-500 rounded-lg px-3 py-2">
                            <i className="fa-solid fa-envelope-circle-check text-gray-400 mr-2"></i>
                            <input
                                type="email"
                                placeholder="email@example.com"
                                className="flex-1 outline-none bg-transparent"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button 
                            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer" 
                            onClick={handleSendEmail} 
                            disabled={loading || !email}
                        >
                            {loading ? "Đang gửi..." : "Gửi email"}
                        </button>
                        <button 
                            className="flex-1 border py-2 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                            onClick={() => navigate("/auth/login")}
                        >
                            Quay lại
                        </button>
                    </div>
                </div>
            </div>

            <div className="forgot__right hidden lg:flex w-1/2 bg-gray-50 items-center justify-center p-6 pe-20">
                <img
                    src={thumbnail}
                    alt="Thumbnail"
                    className="max-h-[90vh] w-auto object-contain rounded-lg shadow-lg"
                />
            </div>
        </main>
    );
};

export default ForgotPasswordPage;
