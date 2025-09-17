### Get started
*Note:* When use userRepository to save entity. You must save Profile
```java
    public UserModel registerUser(RegisterDTO registerDTO) {
        UserModel userModel = new UserModel();
        UserProfileModel userProfileModel = new UserProfileModel();
        
        userModel.setEmail(registerDTO.getEmail());
        userModel.setPassword(registerDTO.getPassword());
        userModel.setRole("USER");
        userModel.setType("ACCOUNT");
        userModel.setStatus("ACTIVE");
        userModel.setUserProfileModel(userProfileModel);

        userProfileModel.setUserModel(userModel);

        return this.userRepository.save(userModel);
    }
```
---
*** USER MODEL ***
- role: string ('USER', 'DOCTOR', 'CASHIER', 'ADMIN')
- type: string ('ACCOUNT', 'GOOGLE')
- status: string ('ACTIVE', 'INACTIVE')
*** USER PROFILE MODEL ***


*** DOCTOR PROFILE MOEL ***
