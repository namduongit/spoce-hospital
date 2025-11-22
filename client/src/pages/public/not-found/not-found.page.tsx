import { useNavigate } from "react-router-dom";
import text from "../../../assets/404/404-text.png";
import line from "../../../assets/404/line.png";
import liquids from "../../../assets/404/liquids.png";

import PatientScheduleButton from "../../../components/buttons/schedule.button";
import OptionButton from "../../../components/common/others/option";
import FooterLayout from "../../../layouts/patient/footer/footer.layout";

import { motion } from "motion/react";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <main>
            <div className="bg-white shadow-sm">
                <div className="flex items-center justify-between px-4 py-2">
                    <a href="/" className="header__logo flex items-center space-x-2 text-xl font-bold">
                        <i className="fa-solid fa-hospital text-blue-600"></i>
                        <span>SPOCETech</span>
                    </a>

                    <nav className="hidden lg:flex gap-2">
                        <PatientScheduleButton />
                        <OptionButton />
                    </nav>
                </div>
            </div>

            <div className="h-[90vh]">
                <div className="container mx-auto flex justify-center flex-col h-full px-5">
                    <div className="h-[400px] relative">
                        <img className="absolute start-1/2 top-1/4 md:top-0 -translate-x-1/2 z-2" src={text} alt="" />
                        <img className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-4/4 sm:-translate-y-3/4 md:-translate-y-3/4 lg:-translate-y-3/5 z-1" src={line} alt="" />
                        <img className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0" src={liquids} alt="" />
                    </div>

                    <div className="text-center space-y-3 mb-3 mt-5 md:mt-0">
                        <h3 className="text-blue-950 font-bold text-4xl">Oops, This Page Could Not Be Found.</h3>
                        <span className="text-gray-700 font-medium">Dường như bạn đã bị thế lực nào đó diều dắt đến trang này</span>
                        <br />
                        <span className="text-gray-700 font-medium">Nhưng rất tiếc nó không tồn tại</span>
                    </div>

                    <div className="flex justify-center gap-4">
                        <motion.button className="bg-blue-600 px-3 py-1 rounded-lg text-white font-semibold"
                            whileHover={{ scale: 0.95, rotate: 2 }}
                            whileTap={{ scale: 1.05, rotate: -2 }}
                            onClick={() => navigate("/")}
                        >
                            Quay lại
                        </motion.button>
                        
                        <div className="text-sm text-gray-600 items-center">
                            <p>Quay về trang chủ</p>
                            <p>Và tiếp tục đặt lịch</p>
                        </div>
                    </div>
                </div>
            </div>

            <FooterLayout />
        </main>
    )
}

export default NotFoundPage;