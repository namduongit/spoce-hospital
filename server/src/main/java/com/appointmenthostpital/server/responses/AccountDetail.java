package com.appointmenthostpital.server.responses;

public class AccountDetail {
    public static class UserDetail {
        private String fullName;
        private String phone;
        private String address;
        private String birthDate;

        public UserDetail(String fullName, String phone, String address, String birthDate) {
            this.fullName = fullName;
            this.phone = phone;
            this.address = address;
            this.birthDate = birthDate;
        }

        public String getFullName() {
            return fullName;
        }
        
        public void setFullName(String fullName) {
            this.fullName = fullName;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public String getAddress() {
            return address;
        }

        public void setAddress(String address) {
            this.address = address;
        }

        public String getBirthDate() {
            return birthDate;
        }

        public void setBirthDate(String birthDate) {
            this.birthDate = birthDate;
        }
    }

    public static class DoctorDetail {
        private String image;
        private String fullName;
        private String gender;
        private String phone;
        private String birthDate;
        private String degree;
        private String workDay;
        private String status;

        private Long departmentId;
        private String departmentName;

        public String getImage() {
            return image;
        }

        public void setImage(String image) {
            this.image = image;
        }

        public String getFullName() {
            return fullName;
        }

        public void setFullName(String fullName) {
            this.fullName = fullName;
        }

        public String getGender() {
            return gender;
        }

        public void setGender(String gender) {
            this.gender = gender;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public String getBirthDate() {
            return birthDate;
        }

        public void setBirthDate(String birthDate) {
            this.birthDate = birthDate;
        }

        public String getDegree() {
            return degree;
        }

        public void setDegree(String degree) {
            this.degree = degree;
        }

        public String getWorkDay() {
            return workDay;
        }

        public void setWorkDay(String workDay) {
            this.workDay = workDay;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public Long getDepartmentId() {
            return departmentId;
        }

        public void setDepartmentId(Long departmentId) {
            this.departmentId = departmentId;
        }

        public String getDepartmentName() {
            return departmentName;
        }

        public void setDepartmentName(String departmentName) {
            this.departmentName = departmentName;
        }
    }


    public static class ProfileDetailResponse {
        private String email;
        private String role;
        private String type;
        private String status;

        private AccountDetail.UserDetail profile;

        public ProfileDetailResponse
        (String email, String role, String type, String status,
         String fullName, String phone, String address, String birthDate) {
            this.email = email;
            this.role = role;
            this.type = type;
            this.status = status;
            this.profile = new AccountDetail.UserDetail(fullName, phone, address, birthDate);
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public AccountDetail.UserDetail getProfile() {
            return profile;
        }

        public void setProfile(AccountDetail.UserDetail profile) {
            this.profile = profile;
        }
    }

    public static class DoctorDetailResponse {
        private String email;
        private String role;
        private String type;
        private String status;

        private AccountDetail.DoctorDetail profile;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public AccountDetail.DoctorDetail getProfile() {
            return profile;
        }

        public void setProfile(AccountDetail.DoctorDetail profile) {
            this.profile = profile;
        }
    }
}
