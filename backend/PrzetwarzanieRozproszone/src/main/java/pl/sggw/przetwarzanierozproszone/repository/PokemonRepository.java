package pl.sggw.przetwarzanierozproszone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.sggw.przetwarzanierozproszone.domain.Pokemon;

public interface PokemonRepository extends JpaRepository<Pokemon, Integer> {
}
