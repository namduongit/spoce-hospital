import MiniSection from "./mini.section";

const HeroSection = () => {
    const sections = [
        {
            id: 1,
            icon: <i className="fa-solid fa-heart-pulse"></i>,
            title: "Khám nội tổng quát",
            detail: "Kiểm tra sức khỏe toàn diện với các xét nghiệm chuyên sâu"
        },
        {
            id: 2,
            icon: <i className="fa-solid fa-stethoscope"></i>,
            title: "Khám chuyên khoa",
            detail: "Đội ngũ bác sĩ chuyên môn cao trong nhiều lĩnh vực"
        },
        {
            id: 3,
            icon: <i className="fa-solid fa-user-doctor"></i>,
            title: "Đội ngũ bác sĩ",
            detail: "Đội ngũ bác sĩ giàu kinh nghiệm trong chuẩn đoán, khám bệnh"
        },
        {
            id: 4,
            icon: <i className="fa-solid fa-truck-medical"></i>,
            title: "Cấp cứu 24/7",
            detail: "Dịch vụ cấp cứu khẩn cấp suốt 24 giờ"
        }
    ];

    return (
        <div className="hero-section px-4 lg:px-20 pt-5 pb-10">
            <hr className="text-gray-300"/>
            <div className="hero-section__title font-bold text-blue-600 text-2xl my-5 lg:text-center">Về dịch vụ SPOCETech</div>
            <div className="hero-section__wrap grid grid-cols-2 lg:grid-cols-4 gap-8">
                {sections && sections.map((section, id) => (
                    <MiniSection
                        key={id}
                        icon={section.icon}
                        title={section.title}
                        detail={section.detail}
                    />
                ))}
            </div>
        </div>
    )
}

export default HeroSection;
