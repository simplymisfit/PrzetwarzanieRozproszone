package pl.sggw.przetwarzanierozproszone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.sggw.przetwarzanierozproszone.domain.Player;

import java.util.Optional;

public interface PlayerRepository extends JpaRepository<Player, Integer> {
    @Query("SELECT p FROM Player p WHERE p.username=?1")
    Optional<Player> findByUsername(String username);

    @Query("UPDATE Player SET winCount = ?2 WHERE id = ?1")
    void updateWinCount(int userId, int winCount);
    @Query("UPDATE Player SET loseCount = ?2 WHERE id = ?1")
    void updateLoseCount(int userId, int loseCount);
}

