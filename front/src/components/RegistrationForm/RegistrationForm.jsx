import React from "react";
import { FormWrapper, Header, NoAccountWrapper } from "./RegistrationForm.styled";
import { useForm } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import ErrorNotification from "../ErrorNotification/ErrorNotification";
import Button from "@mui/material/Button";

const RegistrationForm = ({ setIsLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    fetch("http://localhost:8080/api/game/register ", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: data.username, password: data.password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.error) {
          alert(data?.error);
        } else {
          setIsLogin(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
            error={!!errors.name}
          />
        </FormControl>
        {errors.password?.type === "required" && <ErrorNotification message="To pole jest obowiązkowe" />}
        {errors?.password?.type === "minLength" && <ErrorNotification message="Hasło musi mieć co najmniej 3 znaki" />}

        <Button type="submit" variant="contained" size="large" color="primary">
          Zarejestruj się
        </Button>
        <NoAccountWrapper>
          <p>Posiadasz już konto?</p>
          <Button variant="text" onClick={() => setIsLogin(true)}>
            Zaloguj się
          </Button>
        </NoAccountWrapper>
      </form>
    </FormWrapper>
  );
};

export default RegistrationForm;
