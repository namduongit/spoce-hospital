import avatar from '../../assets/images/doctor/avatar.png'

type NurseSectionProps = {
  image: string,
  email: string,
  fullName: string,
  gender: string,
  departmentName: string,
  phone: string,
  status: string
}

const NurseSection = (props: NurseSectionProps) => {
  const { image, fullName, email, gender, departmentName, phone, status } = props;

  const getGenderText = (gender?: string) => {
    switch (gender) {
      case 'MALE': return 'Nam';
      case 'FEMALE': return 'Nữ';
      case 'OTHER': return 'Khác';
      default: return '';
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'AVAILABLE': return 'Sẵn sàng';
      case 'BUSY': return 'Bận';
      case 'OFFLINE': return 'Tạm vắng mặt';
      default: return '';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'AVAILABLE': return 'bg-green-100 text-green-800';
      case 'BUSY': return 'bg-yellow-100 text-yellow-800';
      case 'OFFLINE': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="group nurse-section h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
      <div className="relative">
        <div className="overflow-hidden">
          <img 
            src={image || avatar} 
            alt={fullName} 
            className="w-full h-[280px] object-cover object-top group-hover:scale-105 transition-transform duration-300" 
          />
        </div>
        
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${getStatusColor(status)}`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${status === 'AVAILABLE' ? 'bg-green-500' : status === 'BUSY' ? 'bg-yellow-500' : 'bg-gray-500'}`}></div>
            {getStatusText(status)}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-4">
          <h3 className="font-bold text-xl text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
            {fullName}
          </h3>
          <p className="text-blue-600 font-medium text-sm mb-1">{departmentName}</p>
          <p className="text-gray-600 text-sm">{email}</p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm text-gray-600">Giới tính</span>
            </div>
            <span className="text-sm font-medium text-gray-800">{getGenderText(gender)}</span>
          </div>
          
          {phone && (
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm text-gray-600">Điện thoại</span>
              </div>
              <span className="text-sm font-medium text-gray-800">{phone}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NurseSection;