//package com.caretaker.platform.repository;
//
//import com.caretaker.platform.model.Caregiver;
//import com.caretaker.platform.model.User;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//import java.util.Optional;
//
//@Repository
//public interface CaregiverRepository extends JpaRepository<Caregiver, Long> {
//    Optional<Caregiver> findByUser(User user);
//    boolean existsByUser(User user);
//    List<Caregiver> findByStatus(Caregiver.ApplicationStatus status);
//}

package com.caretaker.platform.repository;

import com.caretaker.platform.model.Caregiver;
import com.caretaker.platform.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CaregiverRepository extends JpaRepository<Caregiver, Long> {
    Optional<Caregiver> findByUser(User user);
    boolean existsByUser(User user);
    List<Caregiver> findByStatus(Caregiver.ApplicationStatus status);

    // Find by status and city
    List<Caregiver> findByStatusAndCity(Caregiver.ApplicationStatus status, String city);

    // Find by status and pincode
    List<Caregiver> findByStatusAndPincode(Caregiver.ApplicationStatus status, String pincode);

    // Search by name
    @Query("SELECT c FROM Caregiver c WHERE c.status = :status AND " +
            "(LOWER(c.firstName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(c.lastName) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<Caregiver> searchByName(@Param("status") Caregiver.ApplicationStatus status,
                                 @Param("searchTerm") String searchTerm);

    // More complex query to find by service
    @Query("SELECT c FROM Caregiver c JOIN c.services s WHERE c.status = :status AND s = :service")
    List<Caregiver> findByStatusAndService(@Param("status") Caregiver.ApplicationStatus status,
                                           @Param("service") String service);
}