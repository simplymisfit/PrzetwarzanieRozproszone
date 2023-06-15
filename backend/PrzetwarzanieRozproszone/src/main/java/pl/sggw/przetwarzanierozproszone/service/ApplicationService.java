package pl.sggw.przetwarzanierozproszone.service;

import lombok.AllArgsConstructor;
import org.hibernate.type.TrueFalseType;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import pl.sggw.przetwarzanierozproszone.configuration.MQConfig;
import pl.sggw.przetwarzanierozproszone.domain.CustomMessage;
import pl.sggw.przetwarzanierozproszone.domain.MyUserDetails;
import pl.sggw.przetwarzanierozproszone.domain.Player;
import pl.sggw.przetwarzanierozproszone.domain.Pokemon;
import pl.sggw.przetwarzanierozproszone.repository.PlayerRepository;
import pl.sggw.przetwarzanierozproszone.repository.PokemonRepository;

import javax.persistence.EntityExistsException;
import java.net.ConnectException;
import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ApplicationService {
    private PlayerRepository playerRepository;
    private Environment environment;
    private RabbitTemplate template;
    private PokemonRepository pokemonRepository;
    Set<String> playersInChannel;

    public List<String> attackPlayer(int attackerId, int defenderId){
        Random generator = new Random();
        List<String> fight = new ArrayList<>();
        Player attacker = playerRepository.findById(attackerId).get();
        Player defender = playerRepository.findById(defenderId).get();

        List<String> attackerPokemonNames = attacker
                .getPokemons()
                .stream()
                .map(Pokemon::getName)
                .collect(Collectors.toList());
        List<String> defenderPokemonNames = defender
                .getPokemons()
                .stream()
                .map(Pokemon::getName)
                .collect(Collectors.toList());

        List<Integer> attackerPokemons = new ArrayList<>();
        List<Integer> defenderPokemons = new ArrayList<>();
        for(int i =0;i<4;i++){
            attackerPokemons.add(100);
            defenderPokemons.add(100);
        }

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
                fight.add("Pokemon: "+defenderPokemonNames.get(0)+ " gracza: "+defender.getUsername()+" został wyeliminowany");
                defenderPokemonNames.remove(0);
                if(defenderPokemons.size()!=0)
                    fight.add("Pokemon: "+defenderPokemonNames.get(0)+ " gracza: "+defender.getUsername()+" wchodzi do walki");

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
                fight.add("Pokemon: "+attackerPokemonNames.get(0)+ " gracza: "+attacker.getUsername()+" został wyeliminowany");
                attackerPokemonNames.remove(0);
                if(defenderPokemons.size()!=0)
                    fight.add("Pokemon: "+attackerPokemonNames.get(0)+ " gracza: "+attacker.getUsername()+" wchodzi do walki");
            }
            if(attackerPokemons.size()==0){
                fight.add("Wygrał gracz: "+defender.getUsername());
                break;
            }
        }


        return fight;
    }
    public Player createPlayer(Player player){
        if(player.getUsername().contains(" ")){throw new IllegalStateException("Niedozwolony znak");}
        if(player.getPassword().contains(" ")){throw new IllegalStateException("Niedozwolony znak");}
        if(player.getUsername().equals("")){throw new IllegalStateException("Niedozwolony znak");}
        if(player.getPassword().equals("")){throw new IllegalStateException("Niedozwolony znak");}
        if(!playerRepository.findByUsername(player.getUsername()).equals(Optional.empty())){throw new EntityExistsException("Login zajęty");}
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        player.setPassword(passwordEncoder.encode(player.getPassword()));
        List<Pokemon> pokemons = new ArrayList<>();
        for(int i=1;i<=4;i++){
            pokemons.add(pokemonRepository.findById(i).get());
        }
        player.setPokemons(pokemons);
        return playerRepository.save(player);
    }

    public List<Player> getAllPlayers(){
        return playerRepository.findAll();
    }
    public Player getUserByUsername(String username){
        return playerRepository.findByUsername(username).get();
    }
    public Player getUserById(int id){
        return playerRepository.findById(id).get();
    }

    public String getPrincipalUsername(Object principal){
        if (principal instanceof MyUserDetails) {return  ((MyUserDetails)principal).getUsername();}
        else{
            return null;
        }
    }

    public void addToChannelPlayerList(String username){
        checkIfPlayerIsNotOnAnotherChannel(username);
        String player = playerRepository.findByUsername(username).get().getUsername();
        playersInChannel.add(player);
    }

    public void checkIfPlayerIsNotOnAnotherChannel(String username){ //odpytuje drugi serwer czy użytkownik jest zalogowany
        String port = environment.getProperty("server.number").equals(Integer.toString(1)) ? "8081":"8080";
        //port = "8080"; //do wywalenia po postawieniu drugiego serwera
        String uri = "http://localhost:"+port+"/api/game/isonline/"+username;
        RestTemplate restTemplate = new RestTemplate();
        try{
            Boolean response = restTemplate.getForObject(uri, Boolean.class);
        }
        catch (Exception e){
            System.err.println("Drugi serwer nie odpowiada");
        }
        sendNotificationOnPlayerLogin(username);
    }

    public void sendNotificationOnPlayerLogin(String username){
        CustomMessage message = new CustomMessage();
        message.setMessageId(UUID.randomUUID().toString());
        message.setMessageDate(new Date());
        message.setMessage("["+message.getMessageDate().getHours() + ":" + message.getMessageDate().getMinutes() + "] Zalogowano na kanał "+environment.getProperty("server.number")+": "+username);
        template.convertAndSend(MQConfig.EXCHANGE2, MQConfig.ROUTING_KEY2, message);
        //template.convertAndSend(MQConfig.EXCHANGE1, MQConfig.ROUTING_KEY1, message);
    }
    public void sendNotificationOnPlayerLogout(String username){
        CustomMessage message = new CustomMessage();
        message.setMessageId(UUID.randomUUID().toString());
        message.setMessageDate(new Date());
        message.setMessage("["+message.getMessageDate().getHours() + ":" + message.getMessageDate().getMinutes() + "] Wylogowano z kanału "+environment.getProperty("server.number")+": "+username);
        //template.convertAndSend(MQConfig.EXCHANGE1, MQConfig.ROUTING_KEY1, message);
    }

    public boolean logout(String username){
        boolean bool = playersInChannel.remove(username);
        if(bool){
            sendNotificationOnPlayerLogout(username);
        }
        return bool;
    }

    public Set<String> getActivePlayers(){
        return playersInChannel;
    }

    public void choosePokemons(String username, List<Integer> pokemonsId){
        Player player = playerRepository.findByUsername(username).get();
        player.setPokemons(getPokemonsById(pokemonsId));
        playerRepository.save(player);
    }
    public List<Pokemon> getPokemonsById(List<Integer> pokemonsId){
        List<Pokemon> pokemons = new ArrayList<>();
        pokemonsId.stream().forEach(p -> pokemons.add(pokemonRepository.findById(p).get()));
        return pokemons;
    }
}
