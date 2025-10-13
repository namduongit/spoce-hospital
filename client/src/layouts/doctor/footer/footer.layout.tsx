const DoctorFooterLayout = () => {
  return (
    <footer className="footer-layout bg-white py-2 text-center shadow-md font-bold">
      <span className="text-black">© {new Date().getFullYear()} - Bản quyền thuộc Công ty Công nghệ
        <span className="font-bold text-blue-600"> SPOCETech</span>
      </span>
    </footer>
  )
}
export default DoctorFooterLayout;
