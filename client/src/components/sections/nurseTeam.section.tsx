import avatar from '../../assets/images/doctor/avatar.png'
import NurseSection from './nurse.section';

const NurseTeamSection = () => {

    const nurses = [
        {
            id: 1,
            image: avatar,
            name: "BS Nguyễn Spoce Tech",
            position: "Trưởng khoa Spoce Tech",
            detail: "TS Đa khoa – Đại học Y Dược TP. Hồ Chí Minh",
        },
        {
            id: 2,
            image: avatar,
            name: "BS Trần Văn Minh",
            position: "Bác sĩ Nội tổng quát",
            detail: "Thạc sĩ Y học – Đại học Y Hà Nội",
        },
        {
            id: 3,
            image: avatar,
            name: "BS Lê Thị Hương",
            position: "Bác sĩ Nhi khoa",
            detail: "Chuyên khoa I – Bệnh viện Nhi Đồng 1",
        },
        {
            id: 4,
            image: avatar,
            name: "BS Phạm Quang Huy",
            position: "Bác sĩ Ngoại khoa",
            detail: "TS Phẫu thuật – Đại học Y Dược TP. Hồ Chí Minh",
        },
        {
            id: 5,
            image: avatar,
            name: "BS Đỗ Thị Mai",
            position: "Bác sĩ Sản phụ khoa",
            detail: "Thạc sĩ Y khoa – Bệnh viện Từ Dũ",
        },
        {
            id: 6,
            image: avatar,
            name: "BS Vũ Ngọc Tuấn",
            position: "Bác sĩ Tim mạch",
            detail: "Chuyên khoa II – Viện Tim TP. Hồ Chí Minh",
        },
        {
            id: 7,
            image: avatar,
            name: "BS Nguyễn Thị Thu Hà",
            position: "Bác sĩ Da liễu",
            detail: "Thạc sĩ Y học – Đại học Y khoa Phạm Ngọc Thạch",
        },
        {
            id: 8,
            image: avatar,
            name: "BS Bùi Văn Phúc",
            position: "Bác sĩ Tai Mũi Họng",
            detail: "Chuyên khoa I – Bệnh viện Tai Mũi Họng TP. HCM",
        },
    ];


    return (
        <div className="nurse-team px-4 lg:px-20 pt-5 pb-10">
            <div className="nurse-team__wrap">
                <div className="nurse-team__title font-bold text-2xl text-blue-600 text-left lg:text-center my-5">Đội ngũ bác sĩ kinh nghiệm</div>
                <div className="nurse-nurses grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {nurses && nurses.slice(0, 4).map((nurse, id) => (
                        <NurseSection key={id} {...nurse} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NurseTeamSection;