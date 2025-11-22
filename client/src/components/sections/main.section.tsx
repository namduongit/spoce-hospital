import { motion } from 'framer-motion';
import section from '../../assets/images/main/section.png'
import PatientScheduleButton from '../buttons/schedule.button';
import HeroSection from './hero.section';

const MainSection = () => {
    return (
        <div id="service-section" className="main-section bg-blue-600/5 pt-[30px] pb-2 lg:px-20">
            <div className="main-section__wrap flex flex-col md:flex-row md:space-x-10 px-4">

                <motion.div 
                    className="main-section__left relative w-full md:w-1/2 pb-10 md:pb-3"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <motion.div 
                        className="main-section__image rounded-xl shadow-lg overflow-hidden h-64 md:h-[80%]"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <img
                            className="w-full h-full object-cover object-top"
                            src={section}
                            alt="Main section image"
                        />
                    </motion.div>

                    <motion.div 
                        className="main-section__detail absolute bg-white shadow-2xl rounded-lg px-2 py-4 md:px-4 md:py-6 
                            left-1/2 bottom-[-20px] md:bottom-[80px] -translate-x-1/2 
                            grid grid-cols-2 gap-4 w-[80%] md:w-2/3"
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <motion.div 
                            className="main-section__experience"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-center font-bold text-xl md:text-3xl text-blue-600">15+</h2>
                            <p className="text-center text-gray-500 text-sm md:text-base">15 năm kinh nghiệm</p>
                        </motion.div>
                        <motion.div 
                            className="main-section__expertise"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-center font-bold text-xl md:text-3xl text-blue-600">50+</h2>
                            <p className="text-center text-gray-500 text-sm md:text-base">Bác sĩ chuyên môn</p>
                        </motion.div>
                        <motion.div 
                            className="main-section__rating"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-center font-bold text-xl md:text-3xl text-blue-600">10k+</h2>
                            <p className="text-center text-gray-500 text-sm md:text-base">Bệnh nhân hài lòng</p>
                        </motion.div>
                        <motion.div 
                            className="main-section__support"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-center font-bold text-xl md:text-3xl text-blue-600">24/7</h2>
                            <p className="text-center text-gray-500 text-sm md:text-base">Hỗ trợ khẩn cấp</p>
                        </motion.div>
                    </motion.div>
                </motion.div>

                <motion.div 
                    className="main-section__right w-full md:w-1/2 mt-20 md:mt-0"
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <motion.h3 
                        className="main-section__title font-bold text-blue-600 text-2xl md:text-3xl"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        SPOCETech - Đặt lịch và Khám bệnh
                    </motion.h3>

                    <motion.p 
                        className="main-section__description text-gray-500 mt-2 text-sm md:text-base"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        Với hơn 15 năm kinh nghiệm trong các lĩnh vực y tế, chúng tôi tự hào là địa chỉ tin cậy
                        cho việc chăm sóc sức khỏe của bạn và gia đình
                    </motion.p>

                    <motion.ul 
                        className="main-section__list grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-5"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.li 
                            className="main-section__item flex justify-start items-center"
                            variants={{
                                hidden: { opacity: 0, x: -50 },
                                visible: { 
                                    opacity: 1, 
                                    x: 0,
                                    transition: { duration: 0.6, delay: 0.6 }
                                }
                            }}
                        >
                            <i className="fa-solid fa-user-doctor me-3 text-xl md:text-2xl text-blue-600"></i>
                            <div className="main-section__item-detail">
                                <h3 className="text-lg md:text-xl font-bold">Đội ngũ chuyên môn cao</h3>
                                <p className="text-gray-500 text-sm md:text-base">Đội ngũ bác sĩ giàu kinh nghiệm, được đào tạo bài bản</p>
                            </div>
                        </motion.li>

                        <motion.li 
                            className="main-section__item flex justify-start items-center"
                            variants={{
                                hidden: { opacity: 0, x: -50 },
                                visible: { 
                                    opacity: 1, 
                                    x: 0,
                                    transition: { duration: 0.6, delay: 0.7 }
                                }
                            }}
                        >
                            <i className="fa-solid fa-hospital me-3 text-xl md:text-2xl text-blue-600"></i>
                            <div className="main-section__item-detail">
                                <h3 className="text-lg md:text-xl font-bold">Cơ sở vật chất hiện đại</h3>
                                <p className="text-gray-500 text-sm md:text-base">Trang thiết bị y tế tiên tiến, phòng khám khang trang</p>
                            </div>
                        </motion.li>

                        <motion.li 
                            className="main-section__item flex justify-start items-center"
                            variants={{
                                hidden: { opacity: 0, x: -50 },
                                visible: { 
                                    opacity: 1, 
                                    x: 0,
                                    transition: { duration: 0.6, delay: 0.8 }
                                }
                            }}
                        >
                            <i className="fa-solid fa-heart-circle-plus me-3 text-xl md:text-2xl text-blue-600"></i>
                            <div className="main-section__item-detail">
                                <h3 className="text-lg md:text-xl font-bold">Dịch vụ tận tâm</h3>
                                <p className="text-gray-500 text-sm md:text-base">Chăm sóc bệnh nhân chu đáo, tận tình</p>
                            </div>
                        </motion.li>

                        <motion.li 
                            className="main-section__item flex justify-start items-center"
                            variants={{
                                hidden: { opacity: 0, x: -50 },
                                visible: { 
                                    opacity: 1, 
                                    x: 0,
                                    transition: { duration: 0.6, delay: 0.9 }
                                }
                            }}
                        >
                            <i className="fa-solid fa-business-time me-3 text-xl md:text-2xl text-blue-600"></i>
                            <div className="main-section__item-detail">
                                <h3 className="text-lg md:text-xl font-bold">Phục vụ 24/7</h3>
                                <p className="text-gray-500 text-sm md:text-base">Luôn luôn sẵn sàng phục vụ mọi lúc, mọi nơi</p>
                            </div>
                        </motion.li>
                    </motion.ul>

                    <motion.div 
                        className="main-section__buttons flex justify-start gap-2.5 mt-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.0 }}
                        viewport={{ once: true }}
                    >
                        {/* <PatientLogoutButton /> */}
                        <PatientScheduleButton />
                    </motion.div>
                </motion.div>
            </div>

            <HeroSection />
        </div>
    )
}

export default MainSection;
