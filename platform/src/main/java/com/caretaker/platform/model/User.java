//// src/main/java/com/caretaker/platform/model/User.java
//package com.caretaker.platform.model;
//
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import java.util.HashSet;
//import java.util.Set;
//
//@Data
//@NoArgsConstructor
//public class User {
//    private Long id;
//    private String username;
//    private String email;
//    private String password;
//    private Set<String> roles = new HashSet<>();
//
//    // For simplicity, we'll use this to differentiate user types
//    private boolean isCaretaker;
//
//    public User(String username, String email, String password, boolean isCaretaker) {
//        this.username = username;
//        this.email = email;
//        this.password = password;
//        this.isCaretaker = isCaretaker;
//    }
//}
package com.caretaker.platform.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
@Table(name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String username;

    @Column(nullable = false, length = 50)
    private String email;

    @Column(nullable = false, length = 120)
    private String password;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    private Set<String> roles = new HashSet<>();

    @Column(name = "is_caretaker")
    private boolean isCaretaker;

    public User(String username, String email, String password, boolean isCaretaker) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.isCaretaker = isCaretaker;
    }
}