//// src/main/java/com/caretaker/platform/repository/UserRepository.java
//package com.caretaker.platform.repository;
//
//import com.caretaker.platform.model.User;
//import org.springframework.stereotype.Repository;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//import java.util.concurrent.atomic.AtomicLong;
//
//@Repository
//public class UserRepository {
//    private final List<User> users = new ArrayList<>();
//    private final AtomicLong idCounter = new AtomicLong(1);
//
//    public User save(User user) {
//        user.setId(idCounter.getAndIncrement());
//        users.add(user);
//        return user;
//    }
//
//    public Optional<User> findByUsername(String username) {
//        return users.stream()
//                .filter(user -> user.getUsername().equals(username))
//                .findFirst();
//    }
//
//    public Optional<User> findByEmail(String email) {
//        return users.stream()
//                .filter(user -> user.getEmail().equals(email))
//                .findFirst();
//    }
//}
package com.caretaker.platform.repository;

import com.caretaker.platform.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}