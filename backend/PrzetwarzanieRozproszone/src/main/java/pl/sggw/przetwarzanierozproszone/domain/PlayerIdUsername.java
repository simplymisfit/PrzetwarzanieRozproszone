package pl.sggw.przetwarzanierozproszone.domain;



public class PlayerIdUsername {
    private int id;
    private String username;

    public PlayerIdUsername(int id, String username) {
        this.id = id;
        this.username = username;
    }

    public PlayerIdUsername() {
    }

    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }
}

