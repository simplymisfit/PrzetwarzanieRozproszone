package pl.sggw.przetwarzanierozproszone.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Collection;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "Pokemon")

public class Pokemon {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @JsonIgnore
    @ManyToMany(mappedBy = "pokemons")
    private Collection<Player> players;
    private String name;
//    private int attack;
//    private int hp;
//    private String photoUrl;
}
