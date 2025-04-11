package com.caretaker.platform.repository;

import com.caretaker.platform.model.Caregiver;
import com.caretaker.platform.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CaregiverRepository extends JpaRepository<Caregiver, Long> {
    Optional<Caregiver> findByUser(User user);
    boolean existsByUser(User user);
}