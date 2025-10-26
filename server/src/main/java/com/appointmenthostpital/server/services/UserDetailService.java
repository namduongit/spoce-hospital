package com.appointmenthostpital.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.appointmenthostpital.server.models.AccountModel;

@Service
public class UserDetailService implements UserDetailsService {
    @Autowired
    private AccountService accountService;

    /** @Note
     * This method is used to load user-specific data during authentication.
     * @param username The username (email) of the user to be loaded.
     * @return UserDetails object containing user information for authentication
     * 
     * Different between roles and authorities:
     * - Roles: High-level grouping of permissions, prefixed with "ROLE_".
     * - Authorities: Specific permissions or rights granted to a user.
     * 
     * Role field in Database: USER, ASSISTOR, DOCTOR, ADMIN. When use roles() -> ROLE_USER, ROLE_ASSISTOR, ROLE_DOCTOR, ROLE_ADMIN
     */

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AccountModel userModel = this.accountService.getUserByEmail(username);
        return User
        .withUsername(userModel.getEmail())
        .password(userModel.getPassword())
        .authorities(userModel.getRole()).build();
    }
    
}
