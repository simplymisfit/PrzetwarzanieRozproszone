import React, { useContext, useState } from "react";
import { FormWrapper, Header, NoAccountWrapper } from "../RegistrationForm/RegistrationForm.styled";
import { useForm } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import ErrorNotification from "../ErrorNotification/ErrorNotification";
import Button from "@mui/material/Button";
import { PokemonContext } from "../../providers/PokemonProvider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const LoginForm = ({ setIsLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUser } = useContext(PokemonContext);
  const [channel, setChannel] = useState("http://localhost:8080");

  const onSubmit = (data) => {
    fetch(`${channel}/api/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: data.username, password: data.password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.error) alert(data?.error);
        else {
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("channel", JSON.stringify(channel));
          setUser(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChangeChannel = (event) => {
    setChannel(event.target.value);
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>Logowanie</Header>
        <FormControl>
          <InputLabel>Imię trenera</InputLabel>
          <OutlinedInput
            label="Imię trenera"
            {...register("username", {
              required: "To pole jest obowiązkowe",
              minLength: { value: 3, message: "Imię trenera musi mieć co najmniej 3 znaki" },
            })}
            error={!!errors.username}
          />
        </FormControl>
        {errors.username?.type === "required" && <ErrorNotification message="To pole jest obowiązkowe" />}
        {errors?.username?.type === "minLength" && <ErrorNotification message="Imię trenera musi mieć co najmniej 3 znaki" />}
        <FormControl>
          <InputLabel>Hasło</InputLabel>
          <OutlinedInput
            label="Hasło"
            type="password"
            {...register("password", {
              required: "To pole jest obowiązkowe",
              minLength: { value: 3, message: "Hasło musi mieć co najmniej 3 znaki" },
            })}
            error={!!errors.password}
          />
        </FormControl>
        {errors.password?.type === "required" && <ErrorNotification message="To pole jest obowiązkowe" />}
        {errors?.password?.type === "minLength" && <ErrorNotification message="Hasło musi mieć co najmniej 3 znaki" />}
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            {...register("channel", {
              required: "To pole jest obowiązkowe",
            })}
            value={channel}
            label="Kanał"
            onChange={handleChangeChannel}
          >
            <MenuItem value="http://localhost:8080">Kanał 1</MenuItem>
            <MenuItem value="http://localhost:8081">Kanał 2</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" size="large" color="primary">
          Zaloguj się
        </Button>
        <NoAccountWrapper>
          <p>Nie masz jeszcze konta?</p>
          <Button variant="text" onClick={() => setIsLogin(false)}>
            Zarejestruj się
          </Button>
        </NoAccountWrapper>
      </form>
    </FormWrapper>
  );
};

export default LoginForm;
