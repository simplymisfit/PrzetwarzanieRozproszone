package pl.sggw.przetwarzanierozproszone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.sggw.przetwarzanierozproszone.domain.MyUserDetails;
import pl.sggw.przetwarzanierozproszone.domain.Player;
import pl.sggw.przetwarzanierozproszone.repository.PlayerRepository;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    PlayerRepository playerRepository;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Optional<Player> player = playerRepository.findByUsername(userName);

        player.orElseThrow(() -> new UsernameNotFoundException("User not found: " + userName));

        return player.map(MyUserDetails::new).get();
    }
}