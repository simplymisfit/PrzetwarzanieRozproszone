package pl.sggw.przetwarzanierozproszone.service;

import org.hibernate.type.TrueFalseType;
import org.springframework.stereotype.Service;
import pl.sggw.przetwarzanierozproszone.domain.Player;
import pl.sggw.przetwarzanierozproszone.domain.Pokemon;
import pl.sggw.przetwarzanierozproszone.repository.PlayerRepository;

import java.util.*;

@Service
public class ApplicationService {
    private PlayerRepository playerRepository;

    public List<String> attackPlayer(int attackerId, int defenderId){
        Random generator = new Random();
        List<String> fight = new ArrayList<>();
        attackerId =1; defenderId =2; //usunąć później ----------------------------------------------------------
        Player attacker = new Player();
        Player defender = new Player();
        attacker.setId(1);
        defender.setId(2);
        attacker.setUsername("attacker");
        defender.setUsername("defender");
        Pokemon poks1 = new Pokemon(1,attacker,"poks1");
        Pokemon poks2 = new Pokemon(2,attacker,"poks2");
        Pokemon poks3 = new Pokemon(3,attacker,"poks3");
        Pokemon poks4 = new Pokemon(4,attacker,"poks4");
        Pokemon poks5 = new Pokemon(5,attacker,"poks5");
        Pokemon poks6 = new Pokemon(6,attacker,"poks6");
        Pokemon poks7 = new Pokemon(7,attacker,"poks7");
        Pokemon poks8 = new Pokemon(8,attacker,"poks8");
        //usunąć później ----------------------------------------------------------


        List<String> attackerPokemonNames = new ArrayList<>();
        attackerPokemonNames.add(poks1.getName());
        attackerPokemonNames.add(poks2.getName());
        attackerPokemonNames.add(poks3.getName());
        attackerPokemonNames.add(poks4.getName());
        List<String> defenderPokemonNames = new ArrayList<>();
        defenderPokemonNames.add(poks5.getName());
        defenderPokemonNames.add(poks6.getName());
        defenderPokemonNames.add(poks7.getName());
        defenderPokemonNames.add(poks8.getName());
        List<Integer> attackerPokemons = new ArrayList<>();
        attackerPokemons.add(100);
        attackerPokemons.add(100);
        attackerPokemons.add(100);
        attackerPokemons.add(100);
        List<Integer> defenderPokemons = new ArrayList<>();
        defenderPokemons.add(100);
        defenderPokemons.add(100);
        defenderPokemons.add(100);
        defenderPokemons.add(100);

        while(true){
            int damage = generator.nextInt(21)+20;//od 20 do 40
            defenderPokemons.set(0,defenderPokemons.get(0)-damage);
            fight.add("Pokemon: "+attackerPokemonNames.get(0)
                    +" gracza: "+attacker.getUsername()
                    +" zadał "+damage+" punktów obrażeń"
                    +" pokemonowi "+defenderPokemonNames.get(0)
                    +" gracza "+defender.getUsername());

            if(defenderPokemons.get(0)<=0){
                defenderPokemons.remove(0);
                defenderPokemonNames.remove(0);
            }
            if(defenderPokemons.size()==0){
                fight.add("Wygrał gracz: "+attacker.getUsername());
                break;
            }

            damage = generator.nextInt(21)+20;//od 20 do 40
            attackerPokemons.set(0,attackerPokemons.get(0)-damage);
            fight.add("Pokemon: "+defenderPokemonNames.get(0)
                    +" gracza: "+defender.getUsername()
                    +" zadał "+damage+" punktów obrażeń"
                    +" pokemonowi "+attackerPokemonNames.get(0)
                    +" gracza "+attacker.getUsername());

            if(attackerPokemons.get(0)<=0){
                attackerPokemons.remove(0);
                attackerPokemonNames.remove(0);
            }
            if(attackerPokemons.size()==0){
                fight.add("Wygrał gracz: "+defender.getUsername());
                break;
            }
        }


        return fight;
    }
}
