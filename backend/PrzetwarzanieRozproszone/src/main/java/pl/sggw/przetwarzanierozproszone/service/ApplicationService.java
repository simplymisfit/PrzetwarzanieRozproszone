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
import pl.sggw.przetwarzanierozproszone.domain.*;
import pl.sggw.przetwarzanierozproszone.repository.PlayerRepository;
import pl.sggw.przetwarzanierozproszone.repository.PokemonRepository;

import javax.annotation.PostConstruct;
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

        Player winner;
        Player loser;

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
                winner = attacker;
                loser = defender;
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
                winner = defender;
                loser = attacker;
                break;
            }
        }

        playerRepository.updateWinCount(winner.getId(), winner.getWinCount()+1);
        playerRepository.updateLoseCount(loser.getId(), loser.getLoseCount()+1);
        addRandomPokemons(winner.getId(), 1);

        return fight;
    }

    private void addRandomPokemons(int userId, int pokemonCount){
        Random rd = new Random();
        List<Integer> pokemonIds = new ArrayList<Integer>();
        var player = playerRepository.findById(userId);

        for (int i = 0; i < pokemonCount; i++) {
            pokemonIds.add(rd.nextInt(50));
        }

        var pokemons = getPokemonsById(pokemonIds);
        player.ifPresent(player1 -> player1.setPokemons(pokemons));
        //playerRepository.save(player);
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

    public List<PlayerIdUsername> getActivePlayers(){
        List<PlayerIdUsername> playerIdUsernames = new ArrayList<>();
        playersInChannel.stream()
                .forEach(p -> playerIdUsernames.add(new PlayerIdUsername(playerRepository.findByUsername(p).get().getId(),p)));
        return playerIdUsernames;
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

    @PostConstruct
    public void checkIfPokemonDatabaseIsEmpty(){
        if(pokemonRepository.findAll().size()==0){
            initializePokemons();
        }
    }
    public void initializePokemons(){
        List<Pokemon> pokemonList = new ArrayList<>();
        Pokemon pokemon1 = new Pokemon();
        pokemon1.setId(1);
        pokemon1.setName("Bulbasaur");
        pokemon1.setAttack(1);
        pokemon1.setHp(1);
        pokemon1.setPhotoUrl("https://img.pokemondb.net/artwork/bulbasaur.jpg");
        pokemonRepository.save(pokemon1);

        Pokemon pokemon2 = new Pokemon();
        pokemon2.setId(2);
        pokemon2.setName("Ivysaur");
        pokemon2.setAttack(1);
        pokemon2.setHp(1);
        pokemon2.setPhotoUrl("https://img.pokemondb.net/artwork/ivysaur.jpg");
        pokemonRepository.save(pokemon2);

        Pokemon pokemon3 = new Pokemon();
        pokemon3.setId(3);
        pokemon3.setName("Venusaur");
        pokemon3.setAttack(1);
        pokemon3.setHp(1);
        pokemon3.setPhotoUrl("https://img.pokemondb.net/artwork/venusaur.jpg");
        pokemonRepository.save(pokemon3);

        Pokemon pokemon4 = new Pokemon();
        pokemon4.setId(4);
        pokemon4.setName("Charmander");
        pokemon4.setAttack(1);
        pokemon4.setHp(1);
        pokemon4.setPhotoUrl("https://img.pokemondb.net/artwork/charmander.jpg");
        pokemonRepository.save(pokemon4);

        Pokemon pokemon5 = new Pokemon();
        pokemon5.setId(5);
        pokemon5.setName("Charmeleon");
        pokemon5.setAttack(1);
        pokemon5.setHp(1);
        pokemon5.setPhotoUrl("https://img.pokemondb.net/artwork/charmeleon.jpg");
        pokemonRepository.save(pokemon5);

        Pokemon pokemon6 = new Pokemon();
        pokemon6.setId(6);
        pokemon6.setName("Charizard");
        pokemon6.setAttack(1);
        pokemon6.setHp(1);
        pokemon6.setPhotoUrl("https://img.pokemondb.net/artwork/charizard.jpg");
        pokemonRepository.save(pokemon6);

        Pokemon pokemon7 = new Pokemon();
        pokemon7.setId(7);
        pokemon7.setName("Squirtle");
        pokemon7.setAttack(1);
        pokemon7.setHp(1);
        pokemon7.setPhotoUrl("https://img.pokemondb.net/artwork/squirtle.jpg");
        pokemonRepository.save(pokemon7);

        Pokemon pokemon8 = new Pokemon();
        pokemon8.setId(8);
        pokemon8.setName("Wartortle");
        pokemon8.setAttack(1);
        pokemon8.setHp(1);
        pokemon8.setPhotoUrl("https://img.pokemondb.net/artwork/wartortle.jpg");
        pokemonRepository.save(pokemon8);

        Pokemon pokemon9 = new Pokemon();
        pokemon9.setId(9);
        pokemon9.setName("Blastoise");
        pokemon9.setAttack(1);
        pokemon9.setHp(1);
        pokemon9.setPhotoUrl("https://img.pokemondb.net/artwork/blastoise.jpg");
        pokemonRepository.save(pokemon9);

        Pokemon pokemon10 = new Pokemon();
        pokemon10.setId(10);
        pokemon10.setName("Caterpie");
        pokemon10.setAttack(1);
        pokemon10.setHp(1);
        pokemon10.setPhotoUrl("https://img.pokemondb.net/artwork/caterpie.jpg");
        pokemonRepository.save(pokemon10);

        Pokemon pokemon11 = new Pokemon();
        pokemon11.setId(11);
        pokemon11.setName("Metapod");
        pokemon11.setAttack(1);
        pokemon11.setHp(1);
        pokemon11.setPhotoUrl("https://img.pokemondb.net/artwork/metapod.jpg");
        pokemonRepository.save(pokemon11);

        Pokemon pokemon12 = new Pokemon();
        pokemon12.setId(12);
        pokemon12.setName("Butterfree");
        pokemon12.setAttack(1);
        pokemon12.setHp(1);
        pokemon12.setPhotoUrl("https://img.pokemondb.net/artwork/butterfree.jpg");
        pokemonRepository.save(pokemon12);

        Pokemon pokemon13 = new Pokemon();
        pokemon13.setId(13);
        pokemon13.setName("Weedle");
        pokemon13.setAttack(1);
        pokemon13.setHp(1);
        pokemon13.setPhotoUrl("https://img.pokemondb.net/artwork/weedle.jpg");
        pokemonRepository.save(pokemon13);

        Pokemon pokemon14 = new Pokemon();
        pokemon14.setId(14);
        pokemon14.setName("Kakuna");
        pokemon14.setAttack(1);
        pokemon14.setHp(1);
        pokemon14.setPhotoUrl("https://img.pokemondb.net/artwork/kakuna.jpg");
        pokemonRepository.save(pokemon14);

        Pokemon pokemon15 = new Pokemon();
        pokemon15.setId(15);
        pokemon15.setName("Beedrill");
        pokemon15.setAttack(1);
        pokemon15.setHp(1);
        pokemon15.setPhotoUrl("https://img.pokemondb.net/artwork/beedrill.jpg");
        pokemonRepository.save(pokemon15);

        Pokemon pokemon16 = new Pokemon();
        pokemon16.setId(16);
        pokemon16.setName("Pidgey");
        pokemon16.setAttack(1);
        pokemon16.setHp(1);
        pokemon16.setPhotoUrl("https://img.pokemondb.net/artwork/pidgey.jpg");
        pokemonRepository.save(pokemon16);

        Pokemon pokemon17 = new Pokemon();
        pokemon17.setId(17);
        pokemon17.setName("Pidgeotto");
        pokemon17.setAttack(1);
        pokemon17.setHp(1);
        pokemon17.setPhotoUrl("https://img.pokemondb.net/artwork/pidgeotto.jpg");
        pokemonRepository.save(pokemon17);

        Pokemon pokemon18 = new Pokemon();
        pokemon18.setId(18);
        pokemon18.setName("Pidgeot");
        pokemon18.setAttack(1);
        pokemon18.setHp(1);
        pokemon18.setPhotoUrl("https://img.pokemondb.net/artwork/pidgeot.jpg");
        pokemonRepository.save(pokemon18);

        Pokemon pokemon19 = new Pokemon();
        pokemon19.setId(19);
        pokemon19.setName("Rattata");
        pokemon19.setAttack(1);
        pokemon19.setHp(1);
        pokemon19.setPhotoUrl("https://img.pokemondb.net/artwork/rattata.jpg");
        pokemonRepository.save(pokemon19);

        Pokemon pokemon20 = new Pokemon();
        pokemon20.setId(20);
        pokemon20.setName("Raticate");
        pokemon20.setAttack(1);
        pokemon20.setHp(1);
        pokemon20.setPhotoUrl("https://img.pokemondb.net/artwork/raticate.jpg");
        pokemonRepository.save(pokemon20);

        Pokemon pokemon21 = new Pokemon();
        pokemon21.setId(21);
        pokemon21.setName("Spearow");
        pokemon21.setAttack(1);
        pokemon21.setHp(1);
        pokemon21.setPhotoUrl("https://img.pokemondb.net/artwork/spearow.jpg");
        pokemonRepository.save(pokemon21);

        Pokemon pokemon22 = new Pokemon();
        pokemon22.setId(22);
        pokemon22.setName("Fearow");
        pokemon22.setAttack(1);
        pokemon22.setHp(1);
        pokemon22.setPhotoUrl("https://img.pokemondb.net/artwork/fearow.jpg");
        pokemonRepository.save(pokemon22);

        Pokemon pokemon23 = new Pokemon();
        pokemon23.setId(23);
        pokemon23.setName("Ekans");
        pokemon23.setAttack(1);
        pokemon23.setHp(1);
        pokemon23.setPhotoUrl("https://img.pokemondb.net/artwork/ekans.jpg");
        pokemonRepository.save(pokemon23);

        Pokemon pokemon24 = new Pokemon();
        pokemon24.setId(24);
        pokemon24.setName("Arbok");
        pokemon24.setAttack(1);
        pokemon24.setHp(1);
        pokemon24.setPhotoUrl("https://img.pokemondb.net/artwork/arbok.jpg");
        pokemonRepository.save(pokemon24);

        Pokemon pokemon25 = new Pokemon();
        pokemon25.setId(25);
        pokemon25.setName("Pikachu");
        pokemon25.setAttack(1);
        pokemon25.setHp(1);
        pokemon25.setPhotoUrl("https://img.pokemondb.net/artwork/pikachu.jpg");
        pokemonRepository.save(pokemon25);

        Pokemon pokemon26 = new Pokemon();
        pokemon26.setId(26);
        pokemon26.setName("Raichu");
        pokemon26.setAttack(1);
        pokemon26.setHp(1);
        pokemon26.setPhotoUrl("https://img.pokemondb.net/artwork/raichu.jpg");
        pokemonRepository.save(pokemon26);

        Pokemon pokemon27 = new Pokemon();
        pokemon27.setId(27);
        pokemon27.setName("Sandshrew");
        pokemon27.setAttack(1);
        pokemon27.setHp(1);
        pokemon27.setPhotoUrl("https://img.pokemondb.net/artwork/sandshrew.jpg");
        pokemonRepository.save(pokemon27);

        Pokemon pokemon28 = new Pokemon();
        pokemon28.setId(28);
        pokemon28.setName("Sandslash");
        pokemon28.setAttack(1);
        pokemon28.setHp(1);
        pokemon28.setPhotoUrl("https://img.pokemondb.net/artwork/sandslash.jpg");
        pokemonRepository.save(pokemon28);

        Pokemon pokemon29 = new Pokemon();
        pokemon29.setId(29);
        pokemon29.setName("Nidoran♀");
        pokemon29.setAttack(1);
        pokemon29.setHp(1);
        pokemon29.setPhotoUrl("https://img.pokemondb.net/artwork/nidoran-f.jpg");
        pokemonRepository.save(pokemon29);

        Pokemon pokemon30 = new Pokemon();
        pokemon30.setId(30);
        pokemon30.setName("Nidorina");
        pokemon30.setAttack(1);
        pokemon30.setHp(1);
        pokemon30.setPhotoUrl("https://img.pokemondb.net/artwork/nidorina.jpg");
        pokemonRepository.save(pokemon30);

        Pokemon pokemon31 = new Pokemon();
        pokemon31.setId(31);
        pokemon31.setName("Nidoqueen");
        pokemon31.setAttack(1);
        pokemon31.setHp(1);
        pokemon31.setPhotoUrl("https://img.pokemondb.net/artwork/nidoqueen.jpg");
        pokemonRepository.save(pokemon31);

        Pokemon pokemon32 = new Pokemon();
        pokemon32.setId(32);
        pokemon32.setName("Nidoran♂");
        pokemon32.setAttack(1);
        pokemon32.setHp(1);
        pokemon32.setPhotoUrl("https://img.pokemondb.net/artwork/nidoran-m.jpg");
        pokemonRepository.save(pokemon32);

        Pokemon pokemon33 = new Pokemon();
        pokemon33.setId(33);
        pokemon33.setName("Nidorino");
        pokemon33.setAttack(1);
        pokemon33.setHp(1);
        pokemon33.setPhotoUrl("https://img.pokemondb.net/artwork/nidorino.jpg");
        pokemonRepository.save(pokemon33);

        Pokemon pokemon34 = new Pokemon();
        pokemon34.setId(34);
        pokemon34.setName("Nidoking");
        pokemon34.setAttack(1);
        pokemon34.setHp(1);
        pokemon34.setPhotoUrl("https://img.pokemondb.net/artwork/nidoking.jpg");
        pokemonRepository.save(pokemon34);

        Pokemon pokemon35 = new Pokemon();
        pokemon35.setId(35);
        pokemon35.setName("Clefairy");
        pokemon35.setAttack(1);
        pokemon35.setHp(1);
        pokemon35.setPhotoUrl("https://img.pokemondb.net/artwork/clefairy.jpg");
        pokemonRepository.save(pokemon35);

        Pokemon pokemon36 = new Pokemon();
        pokemon36.setId(36);
        pokemon36.setName("Clefable");
        pokemon36.setAttack(1);
        pokemon36.setHp(1);
        pokemon36.setPhotoUrl("https://img.pokemondb.net/artwork/clefable.jpg");
        pokemonRepository.save(pokemon36);

        Pokemon pokemon37 = new Pokemon();
        pokemon37.setId(37);
        pokemon37.setName("Vulpix");
        pokemon37.setAttack(1);
        pokemon37.setHp(1);
        pokemon37.setPhotoUrl("https://img.pokemondb.net/artwork/vulpix.jpg");
        pokemonRepository.save(pokemon37);

        Pokemon pokemon38 = new Pokemon();
        pokemon38.setId(38);
        pokemon38.setName("Ninetales");
        pokemon38.setAttack(1);
        pokemon38.setHp(1);
        pokemon38.setPhotoUrl("https://img.pokemondb.net/artwork/ninetales.jpg");
        pokemonRepository.save(pokemon38);

        Pokemon pokemon39 = new Pokemon();
        pokemon39.setId(39);
        pokemon39.setName("Jigglypuff");
        pokemon39.setAttack(1);
        pokemon39.setHp(1);
        pokemon39.setPhotoUrl("https://img.pokemondb.net/artwork/jigglypuff.jpg");
        pokemonRepository.save(pokemon39);

        Pokemon pokemon40 = new Pokemon();
        pokemon40.setId(40);
        pokemon40.setName("Wigglytuff");
        pokemon40.setAttack(1);
        pokemon40.setHp(1);
        pokemon40.setPhotoUrl("https://img.pokemondb.net/artwork/wigglytuff.jpg");
        pokemonRepository.save(pokemon40);

        Pokemon pokemon41 = new Pokemon();
        pokemon41.setId(41);
        pokemon41.setName("Zubat");
        pokemon41.setAttack(1);
        pokemon41.setHp(1);
        pokemon41.setPhotoUrl("https://img.pokemondb.net/artwork/zubat.jpg");
        pokemonRepository.save(pokemon41);

        Pokemon pokemon42 = new Pokemon();
        pokemon42.setId(42);
        pokemon42.setName("Golbat");
        pokemon42.setAttack(1);
        pokemon42.setHp(1);
        pokemon42.setPhotoUrl("https://img.pokemondb.net/artwork/golbat.jpg");
        pokemonRepository.save(pokemon42);

        Pokemon pokemon43 = new Pokemon();
        pokemon43.setId(43);
        pokemon43.setName("Oddish");
        pokemon43.setAttack(1);
        pokemon43.setHp(1);
        pokemon43.setPhotoUrl("https://img.pokemondb.net/artwork/oddish.jpg");
        pokemonRepository.save(pokemon43);

        Pokemon pokemon44 = new Pokemon();
        pokemon44.setId(44);
        pokemon44.setName("Gloom");
        pokemon44.setAttack(1);
        pokemon44.setHp(1);
        pokemon44.setPhotoUrl("https://img.pokemondb.net/artwork/gloom.jpg");
        pokemonRepository.save(pokemon44);

        Pokemon pokemon45 = new Pokemon();
        pokemon45.setId(45);
        pokemon45.setName("Vileplume");
        pokemon45.setAttack(1);
        pokemon45.setHp(1);
        pokemon45.setPhotoUrl("https://img.pokemondb.net/artwork/vileplume.jpg");
        pokemonRepository.save(pokemon45);

        Pokemon pokemon46 = new Pokemon();
        pokemon46.setId(46);
        pokemon46.setName("Paras");
        pokemon46.setAttack(1);
        pokemon46.setHp(1);
        pokemon46.setPhotoUrl("https://img.pokemondb.net/artwork/paras.jpg");
        pokemonRepository.save(pokemon46);

        Pokemon pokemon47 = new Pokemon();
        pokemon47.setId(47);
        pokemon47.setName("Parasect");
        pokemon47.setAttack(1);
        pokemon47.setHp(1);
        pokemon47.setPhotoUrl("https://img.pokemondb.net/artwork/parasect.jpg");
        pokemonRepository.save(pokemon47);

        Pokemon pokemon48 = new Pokemon();
        pokemon48.setId(48);
        pokemon48.setName("Venonat");
        pokemon48.setAttack(1);
        pokemon48.setHp(1);
        pokemon48.setPhotoUrl("https://img.pokemondb.net/artwork/venonat.jpg");
        pokemonRepository.save(pokemon48);

        Pokemon pokemon49 = new Pokemon();
        pokemon49.setId(49);
        pokemon49.setName("Venomoth");
        pokemon49.setAttack(1);
        pokemon49.setHp(1);
        pokemon49.setPhotoUrl("https://img.pokemondb.net/artwork/venomoth.jpg");
        pokemonRepository.save(pokemon49);

        Pokemon pokemon50 = new Pokemon();
        pokemon50.setId(50);
        pokemon50.setName("Diglett");
        pokemon50.setAttack(1);
        pokemon50.setHp(1);
        pokemon50.setPhotoUrl("https://img.pokemondb.net/artwork/diglett.jpg");
        pokemonRepository.save(pokemon50);


    }
}
