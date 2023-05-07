package pl.sggw.przetwarzanierozproszone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.sggw.przetwarzanierozproszone.domain.Player;

import java.util.Optional;

public interface PlayerRepository extends JpaRepository<Player, Integer> {
    @Query("SELECT p FROM Player p WHERE p.username=?1")
    Optional<Player> findByUsername(String username);
}

