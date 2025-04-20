////// src/main/java/com/caretaker/platform/security/UserDetailsImpl.java
////package com.caretaker.platform.security;
////
////import com.caretaker.platform.model.User;
////import org.springframework.security.core.GrantedAuthority;
////import org.springframework.security.core.authority.SimpleGrantedAuthority;
////import org.springframework.security.core.userdetails.UserDetails;
////
////import java.util.Collection;
////import java.util.Collections;
////import java.util.List;
////import java.util.stream.Collectors;
////
////public class UserDetailsImpl implements UserDetails {
////    private Long id;
////    private String username;
////    private String email;
////    private String password;
////    private Collection<? extends GrantedAuthority> authorities;
////    private boolean isCaretaker;
////
////    public UserDetailsImpl(Long id, String username, String email, String password,
////                         Collection<? extends GrantedAuthority> authorities, boolean isCaretaker) {
////        this.id = id;
////        this.username = username;
////        this.email = email;
////        this.password = password;
////        this.authorities = authorities;
////        this.isCaretaker = isCaretaker;
////    }
////
////    public static UserDetailsImpl build(User user) {
////        List<GrantedAuthority> authorities = user.getRoles().stream()
////                .map(role -> new SimpleGrantedAuthority(role))
////                .collect(Collectors.toList());
////
////        return new UserDetailsImpl(
////                user.getId(),
////                user.getUsername(),
////                user.getEmail(),
////                user.getPassword(),
////                authorities,
////                user.isCaretaker());
////    }
////
////    @Override
////    public Collection<? extends GrantedAuthority> getAuthorities() {
////        return authorities;
////    }
////
////    @Override
////    public String getPassword() {
////        return password;
////    }
////
////    @Override
////    public String getUsername() {
////        return username;
////    }
////
////    @Override
////    public boolean isAccountNonExpired() {
////        return true;
////    }
////
////    @Override
////    public boolean isAccountNonLocked() {
////        return true;
////    }
////
////    @Override
////    public boolean isCredentialsNonExpired() {
////        return true;
////    }
////
////    @Override
////    public boolean isEnabled() {
////        return true;
////    }
////
////
////
////    public boolean isCaretaker() {
////        return isCaretaker;
////    }
////}
//// src/main/java/com/caretaker/platform/security/UserDetailsImpl.java
//package com.caretaker.platform.security;
//
//import com.caretaker.platform.model.User;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import java.util.Collection;
//import java.util.Collections;
//import java.util.List;
//import java.util.stream.Collectors;
//
//public class UserDetailsImpl implements UserDetails {
//    private Long id;
//    private String username;
//    private String email;
//    private String password;
//    private Collection<? extends GrantedAuthority> authorities;
//    private boolean isCaretaker;
//
//    public UserDetailsImpl(Long id, String username, String email, String password,
//                           Collection<? extends GrantedAuthority> authorities, boolean isCaretaker) {
//        this.id = id;
//        this.username = username;
//        this.email = email;
//        this.password = password;
//        this.authorities = authorities;
//        this.isCaretaker = isCaretaker;
//    }
//
//    public static UserDetailsImpl build(User user) {
//        List<GrantedAuthority> authorities = user.getRoles().stream()
//                .map(role -> new SimpleGrantedAuthority(role))
//                .collect(Collectors.toList());
//
//        return new UserDetailsImpl(
//                user.getId(),
//                user.getUsername(),
//                user.getEmail(),
//                user.getPassword(),
//                authorities,
//                user.isCaretaker());
//    }
//
//    // Add the getId method
//    public Long getId() {
//        return id;
//    }
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return authorities;
//    }
//
//    @Override
//    public String getPassword() {
//        return password;
//    }
//
//    @Override
//    public String getUsername() {
//        return username;
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return true;
//    }
//
//    public boolean isCaretaker() {
//        return isCaretaker;
//    }
//}
// src/main/java/com/caretaker/platform/security/UserDetailsImpl.java
package com.caretaker.platform.security;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.caretaker.platform.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String username;
    private String email;

    @JsonIgnore
    private String password;

    private boolean isCaretaker;

    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(Long id, String username, String email, String password,
                           boolean isCaretaker, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.isCaretaker = isCaretaker;
        this.authorities = authorities;
    }

    public static UserDetailsImpl build(User user) {
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role))
                .collect(Collectors.toList());

        return new UserDetailsImpl(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.isCaretaker(),
                authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public boolean isCaretaker() {
        return isCaretaker;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }
}