
// Mock Departments
export const departments = [
	{ id: 1, name: 'Cardiology' },
	{ id: 2, name: 'Neurology' },
	{ id: 3, name: 'Pediatrics' },
];

// Mock Rooms
export const rooms = [
	{ id: 1, name: 'Room 101', status: 'ACTIVE', departmentId: 1 },
	{ id: 2, name: 'Room 102', status: 'ACTIVE', departmentId: 1 },
	{ id: 3, name: 'Room 201', status: 'ACTIVE', departmentId: 2 },
	{ id: 4, name: 'Room 202', status: 'INACTIVE', departmentId: 2 },
	{ id: 5, name: 'Room 301', status: 'ACTIVE', departmentId: 3 },
	{ id: 6, name: 'Room 302', status: 'ACTIVE', departmentId: 3 },
	{ id: 7, name: 'Room 303', status: 'INACTIVE', departmentId: 3 },
	{ id: 8, name: 'Room 304', status: 'ACTIVE', departmentId: 3 },
];

// Mock Users (6 users)
export const users = [
	{ id: 1, email: 'user1@example.com', password: 'pass1', role: 'USER', type: 'ACCOUNT', status: 'ACTIVE' },
	{ id: 2, email: 'user2@example.com', password: 'pass2', role: 'USER', type: 'ACCOUNT', status: 'ACTIVE' },
	{ id: 3, email: 'user3@example.com', password: 'pass3', role: 'USER', type: 'GOOGLE', status: 'ACTIVE' },
	{ id: 4, email: 'user4@example.com', password: 'pass4', role: 'USER', type: 'ACCOUNT', status: 'INACTIVE' },
	{ id: 5, email: 'user5@example.com', password: 'pass5', role: 'USER', type: 'GOOGLE', status: 'ACTIVE' },
	{ id: 6, email: 'user6@example.com', password: 'pass6', role: 'USER', type: 'ACCOUNT', status: 'ACTIVE' },
];

// Mock Doctors (4 doctors)
export const doctors = [
	{ id: 7, email: 'doctor1@example.com', password: 'docpass1', role: 'DOCTOR', type: 'ACCOUNT', status: 'ACTIVE' },
	{ id: 8, email: 'doctor2@example.com', password: 'docpass2', role: 'DOCTOR', type: 'ACCOUNT', status: 'ACTIVE' },
	{ id: 9, email: 'doctor3@example.com', password: 'docpass3', role: 'DOCTOR', type: 'GOOGLE', status: 'ACTIVE' },
	{ id: 10, email: 'doctor4@example.com', password: 'docpass4', role: 'DOCTOR', type: 'ACCOUNT', status: 'INACTIVE' },
];

// Mock Doctor Profiles
export const doctorProfiles = [
	{ userId: 7, image: '', fullName: 'Dr. Alice Smith', gender: 'FEMALE', phone: '111-111-1111', birthDate: '1980-01-01', degree: 'MD', workDate: '2010-01-01', status: 'ACTIVE', departmentId: 1 },
	{ userId: 8, image: '', fullName: 'Dr. Bob Jones', gender: 'MALE', phone: '222-222-2222', birthDate: '1975-05-05', degree: 'MD', workDate: '2008-05-05', status: 'ACTIVE', departmentId: 2 },
	{ userId: 9, image: '', fullName: 'Dr. Carol Lee', gender: 'FEMALE', phone: '333-333-3333', birthDate: '1985-03-03', degree: 'MD', workDate: '2012-03-03', status: 'ACTIVE', departmentId: 3 },
	{ userId: 10, image: '', fullName: 'Dr. David Kim', gender: 'MALE', phone: '444-444-4444', birthDate: '1978-07-07', degree: 'MD', workDate: '2009-07-07', status: 'INACTIVE', departmentId: 1 },
];

// Mock User Profiles
export const userProfiles = [
	{ userId: 1, fullName: 'User One', phone: '555-111-1111', address: '123 Main St', birthDate: '2000-01-01' },
	{ userId: 2, fullName: 'User Two', phone: '555-222-2222', address: '456 Elm St', birthDate: '1999-02-02' },
	{ userId: 3, fullName: 'User Three', phone: '555-333-3333', address: '789 Oak St', birthDate: '1998-03-03' },
	{ userId: 4, fullName: 'User Four', phone: '555-444-4444', address: '321 Pine St', birthDate: '2001-04-04' },
	{ userId: 5, fullName: 'User Five', phone: '555-555-5555', address: '654 Maple St', birthDate: '2002-05-05' },
	{ userId: 6, fullName: 'User Six', phone: '555-666-6666', address: '987 Cedar St', birthDate: '2003-06-06' },
];

// Mock Appointments (20)
export const appointments = Array.from({ length: 20 }, (_, i) => {
	const userId = (i % 6) + 1;
	const doctorId = ((i % 4) + 7);
	const roomId = (i % 8) + 1;
	const departmentId = ((i % 3) + 1);
	return {
		id: i + 1,
		fullName: `User ${userId} Appointment ${i + 1}`,
		phone: `555-000-${String(i + 1).padStart(4, '0')}`,
		time: `2025-09-${String((i % 30) + 1).padStart(2, '0')}T09:00:00`,
		note: `Appointment note ${i + 1}`,
		status: ['PENDING', 'CONFIRMED', 'CANCELED', 'COMPLETED'][i % 4],
		departmentId,
		doctorId,
		roomId,
		userId,
	};
});
