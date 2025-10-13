import section from '../../assets/images/main/section.png'
import PatientLogoutButton from '../buttons/logout.button';
import PatientScheduleButton from '../buttons/schedule.button';
import HeroSection from './hero.section';

const MainSection = () => {
    return (
        <div className="main-section bg-blue-600/5 pt-[30px] pb-2 lg:px-20">
            <div className="main-section__wrap flex flex-col md:flex-row md:space-x-10 px-4">

                <div className="main-section__left relative w-full md:w-1/2 pb-10 md:pb-3">
                    <div className="main-section__image rounded-xl shadow-lg overflow-hidden h-64 md:h-[80%]">
                        <img
                            className="w-full h-full object-cover object-top"
                            src={section}
                            alt="Main section image"
                        />
                    </div>

                    <div className="main-section__detail absolute bg-white shadow-2xl rounded-lg px-2 py-4 md:px-4 md:py-6 
                        left-1/2 bottom-[-20px] md:bottom-[80px] -translate-x-1/2 
                        grid grid-cols-2 gap-4 w-[80%] md:w-2/3">
                        <div className="main-section__experience">
                            <h2 className="text-center font-bold text-xl md:text-3xl text-blue-600">15+</h2>
                            <p className="text-center text-gray-500 text-sm md:text-base">15 năm kinh nghiệm</p>
                        </div>
                        <div className="main-section__expertise">
                            <h2 className="text-center font-bold text-xl md:text-3xl text-blue-600">50+</h2>
                            <p className="text-center text-gray-500 text-sm md:text-base">Bác sĩ chuyên môn</p>
                        </div>
                        <div className="main-section__rating">
                            <h2 className="text-center font-bold text-xl md:text-3xl text-blue-600">10k+</h2>
                            <p className="text-center text-gray-500 text-sm md:text-base">Bệnh nhân hài lòng</p>
                        </div>
                        <div className="main-section__support">
                            <h2 className="text-center font-bold text-xl md:text-3xl text-blue-600">24/7</h2>
                            <p className="text-center text-gray-500 text-sm md:text-base">Hỗ trợ khẩn cấp</p>
                        </div>
                    </div>
                </div>

                <div className="main-section__right w-full md:w-1/2 mt-20 md:mt-0">
                    <h3 className="main-section__title font-bold text-blue-600 text-2xl md:text-3xl">
                        SPOCETech - Đặt lịch và Khám bệnh
                    </h3>

                    <p className="main-section__description text-gray-500 mt-2 text-sm md:text-base">
                        Với hơn 15 năm kinh nghiệm trong các lĩnh vực y tế, chúng tôi tự hào là địa chỉ tin cậy
                        cho việc chăm sóc sức khỏe của bạn và gia đình
                    </p>

                    <ul className="main-section__list grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-5">
                        <li className="main-section__item flex justify-start items-center">
                            <i className="fa-solid fa-user-doctor me-3 text-xl md:text-2xl text-blue-600"></i>
                            <div className="main-section__item-detail">
                                <h3 className="text-lg md:text-xl font-bold">Đội ngũ chuyên môn cao</h3>
                                <p className="text-gray-500 text-sm md:text-base">Đội ngũ bác sĩ giàu kinh nghiệm, được đào tạo bài bản</p>
                            </div>
                        </li>

                        <li className="main-section__item flex justify-start items-center">
                            <i className="fa-solid fa-hospital me-3 text-xl md:text-2xl text-blue-600"></i>
                            <div className="main-section__item-detail">
                                <h3 className="text-lg md:text-xl font-bold">Cơ sở vật chất hiện đại</h3>
                                <p className="text-gray-500 text-sm md:text-base">Trang thiết bị y tế tiên tiến, phòng khám khang trang</p>
                            </div>
                        </li>

                        <li className="main-section__item flex justify-start items-center">
                            <i className="fa-solid fa-heart-circle-plus me-3 text-xl md:text-2xl text-blue-600"></i>
                            <div className="main-section__item-detail">
                                <h3 className="text-lg md:text-xl font-bold">Dịch vụ tận tâm</h3>
                                <p className="text-gray-500 text-sm md:text-base">Chăm sóc bệnh nhân chu đáo, tận tình</p>
                            </div>
                        </li>

                        <li className="main-section__item flex justify-start items-center">
                            <i className="fa-solid fa-business-time me-3 text-xl md:text-2xl text-blue-600"></i>
                            <div className="main-section__item-detail">
                                <h3 className="text-lg md:text-xl font-bold">Phục vụ 24/7</h3>
                                <p className="text-gray-500 text-sm md:text-base">Luôn luôn sẵn sàng phục vụ mọi lúc, mọi nơi</p>
                            </div>
                        </li>
                    </ul>

                    <div className="main-section__buttons flex justify-start gap-2.5 mt-6">
                        <PatientLogoutButton />
                        <PatientScheduleButton />
                    </div>
                </div>
            </div>

            <HeroSection />
        </div>
    )
}

export default MainSection;
