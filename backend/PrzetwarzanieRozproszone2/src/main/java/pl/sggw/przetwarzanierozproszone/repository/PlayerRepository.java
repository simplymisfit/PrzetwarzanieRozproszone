package pl.sggw.przetwarzanierozproszone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import pl.sggw.przetwarzanierozproszone.domain.Player;
import pl.sggw.przetwarzanierozproszone.domain.Pokemon;

import java.util.List;
import java.util.Optional;

public interface PlayerRepository extends JpaRepository<Player, Integer> {
    @Query("SELECT p FROM Player p WHERE p.username=?1")
    Optional<Player> findByUsername(String username);

    @Modifying
    @Transactional
    @Query("UPDATE Player SET win_count = ?2 WHERE id = ?1")
    void updateWinCount(int userId, int winCount);
    @Modifying
    @Transactional
    @Query("UPDATE Player SET lose_count = ?2 WHERE id = ?1")
    void updateLoseCount(int userId, int loseCount);
}

