import React, { useState } from "react";
import { FormWrapper, Header, PokemonImage, NoAccountWrapper } from "./RegistrationForm.styled";
import { useForm } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ErrorNotification from "../ErrorNotification/ErrorNotification";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Bulbasaur from "./images/bulbasaur.png";
import Charmander from "./images/charmander.png";
import Squirtle from "./images/squirtle.png";
import Button from "@mui/material/Button";

const RegistrationForm = ({ setIsLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = useState(false);
  const [starterPokemon, setStarterPokemon] = useState("bulbasaur");

  const onSubmit = (data) => {
    console.log("🚀 ~ file: RegistrationForm.jsx:11 ~ onSubmit ~ data:", data);

    // Send register request
    fetch("http://localhost:8080/api/game/register ", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: data.username, password: data.password }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle register response
        console.log(data);
        // ...
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChangeDishType = (event) => {
    setStarterPokemon(event.target.value);
  };

  const renderPokemon = (name) => {
    switch (name) {
      case "bulbasaur":
        return (
          <PokemonImage>
            <img src={Bulbasaur} alt="bulbasaur" />
          </PokemonImage>
        );

      case "charmander":
        return (
          <PokemonImage>
            <img src={Charmander} alt="charmander" />
          </PokemonImage>
        );
      case "squirtle":
        return (
          <PokemonImage>
            <img src={Squirtle} alt="squirtle" />
          </PokemonImage>
        );
      default:
        return null;
    }
  };
  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>Rejestracja</Header>
        <FormControl>
          <InputLabel>Imię trenera</InputLabel>
          <OutlinedInput
            label="Imię trenera"
            {...register("username", {
              required: "This field is required",
              minLength: { value: 3, message: "Ensure this value has at least 3 characters" },
            })}
            error={!!errors.username}
          />
        </FormControl>
        {errors.name?.type === "required" && <ErrorNotification message="This field is required" />}
        {errors?.name?.type === "minLength" && <ErrorNotification message="Ensure this value has at least 3 characters" />}
        <FormControl>
          <InputLabel>Hasło</InputLabel>
          <OutlinedInput
            label="Hasło"
            type="password"
            {...register("password", {
              required: "This field is required",
              minLength: { value: 3, message: "Ensure this value has at least 3 characters" },
            })}
            error={!!errors.name}
          />
        </FormControl>
        {errors.password?.type === "required" && <ErrorNotification message="This field is required" />}
        {errors?.password?.type === "minLength" && <ErrorNotification message="Ensure this value has at least 3 characters" />}

        <Button type="submit" variant="contained" size="large" color="primary">
          Zarejestruj się
        </Button>
        <NoAccountWrapper>
          <p>Posiadasz już konto?</p>
          <Button variant="text" onClick={() => setIsLogin(true)}>
            Zaloguj się
          </Button>
        </NoAccountWrapper>
        {open ? (
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Request sent successfully
          </Alert>
        ) : null}
      </form>
    </FormWrapper>
  );
};

export default RegistrationForm;
