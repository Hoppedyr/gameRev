package dk.springboot.restful.review;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query( value="SELECT * FROM review WHERE game_id = ?1", nativeQuery = true)
    List<Review> findByGameID(long gameID);
}


