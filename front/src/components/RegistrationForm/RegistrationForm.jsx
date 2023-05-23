import React, { useState } from "react";
import { FormWrapper, Header, SubmitButton, PokemonImage, TextButton, NoAccountWrapper } from "./RegistrationForm.styled";
import { useForm } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ErrorNotification from "../ErrorNotification/ErrorNotification";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Bulbasaur from "./images/bulbasaur.png";
import Charmander from "./images/charmander.png";
import Squirtle from "./images/squirtle.png";

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
            {...register("name", {
              required: "This field is required",
              minLength: { value: 3, message: "Ensure this value has at least 3 characters" },
            })}
            error={!!errors.name}
          />
        </FormControl>
        {errors.name?.type === "required" && <ErrorNotification message="This field is required" />}
        {errors?.name?.type === "minLength" && <ErrorNotification message="Ensure this value has at least 3 characters" />}
        <FormControl>
          <InputLabel>Hasło</InputLabel>
          <OutlinedInput
            label="Hasło"
            {...register("password", {
              required: "This field is required",
              minLength: { value: 3, message: "Ensure this value has at least 3 characters" },
            })}
            error={!!errors.name}
          />
        </FormControl>
        {errors.password?.type === "required" && <ErrorNotification message="This field is required" />}
        {errors?.password?.type === "minLength" && <ErrorNotification message="Ensure this value has at least 3 characters" />}
        <FormControl>
          <InputLabel>Powtórz hasło</InputLabel>
          <OutlinedInput
            label="Powtórz hasło"
            {...register("repeatPassword", {
              required: "This field is required",
              minLength: { value: 3, message: "Ensure this value has at least 3 characters" },
            })}
            error={!!errors.name}
          />
        </FormControl>
        {errors.name?.type === "required" && <ErrorNotification message="This field is required" />}
        {errors?.name?.type === "minLength" && <ErrorNotification message="Ensure this value has at least 3 characters" />}
        <FormControl>
          <InputLabel>Email</InputLabel>
          <OutlinedInput
            label="Email"
            {...register("email", {
              required: "This field is required",
              minLength: { value: 3, message: "Ensure this value has at least 3 characters" },
            })}
            error={!!errors.name}
          />
        </FormControl>
        {errors.name?.type === "required" && <ErrorNotification message="This field is required" />}
        {errors?.name?.type === "minLength" && <ErrorNotification message="Ensure this value has at least 3 characters" />}

        <FormControl fullWidth>
          <InputLabel>Pierwszy pokemon</InputLabel>
          <Select
            {...register("firstPokemon", {
              required: "This field is required",
            })}
            value={starterPokemon}
            label="Type"
            onChange={handleChangeDishType}
          >
            <MenuItem value="bulbasaur">Bulbasaur</MenuItem>
            <MenuItem value="charmander">Charmander</MenuItem>
            <MenuItem value="squirtle">Squirtle</MenuItem>
          </Select>
        </FormControl>
        {errors.type?.type === "required" && starterPokemon === "" && <ErrorNotification message="This field is required" />}
        {renderPokemon(starterPokemon)}
        <SubmitButton type="submit">Zarejestruj się</SubmitButton>
        <NoAccountWrapper>
          <p>Posiadasz już konto?</p>
          <TextButton onClick={() => setIsLogin(true)}>Zaloguj się</TextButton>
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
