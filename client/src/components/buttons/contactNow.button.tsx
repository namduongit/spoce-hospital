const ContactNowButton = () => {
    return (
        <button className="schedule-now-button flex gap-2 justify-center items-center font-bold 
        text-blue-600 py-2 px-3 rounded-[5px] bg-white cursor-pointer border-2 border-blue-600
        hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in">
            <i className="fa-solid fa-phone"></i>
            <span>Liên hệ với chúng tôi</span>
        </button>
    )
}

export default ContactNowButton;