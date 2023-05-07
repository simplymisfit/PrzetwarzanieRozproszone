package pl.sggw.przetwarzanierozproszone.service;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pl.sggw.przetwarzanierozproszone.domain.MyUserDetails;
import pl.sggw.przetwarzanierozproszone.domain.Player;
import pl.sggw.przetwarzanierozproszone.repository.PlayerRepository;
import pl.sggw.przetwarzanierozproszone.repository.PokemonRepository;

import javax.persistence.EntityExistsException;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ApplicationService {
    private PlayerRepository playerRepository;
    private PokemonRepository pokemonRepository;
    public Player createPlayer(Player player){
        if(player.getUsername().contains(" ")){throw new IllegalStateException("Niedozwolony znak");}
        if(player.getPassword().contains(" ")){throw new IllegalStateException("Niedozwolony znak");}
        if(player.getUsername().equals("")){throw new IllegalStateException("Niedozwolony znak");}
        if(player.getPassword().equals("")){throw new IllegalStateException("Niedozwolony znak");}
        if(!playerRepository.findByUsername(player.getUsername()).equals(Optional.empty())){throw new EntityExistsException("Login zajęty");}
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        player.setPassword(passwordEncoder.encode(player.getPassword()));
        return playerRepository.save(player);
    }
    public boolean setChannel(int channel){
        return (channel==1 || channel==2) ? true : false;
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
}