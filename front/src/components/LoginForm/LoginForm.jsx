import React, { useState } from "react";
import { FormWrapper, Header, NoAccountWrapper } from "../RegistrationForm/RegistrationForm.styled";
import { useForm } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import ErrorNotification from "../ErrorNotification/ErrorNotification";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

const LoginForm = ({ setIsLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = useState(false);

  const onSubmit = (data) => {
    console.log("🚀 ~ file: RegistrationForm.jsx:11 ~ onSubmit ~ data:", data);
  };
  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>Logowanie</Header>
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

        <Button type="submit" variant="contained" size="large" color="primary">
          Zaloguj się
        </Button>
        <NoAccountWrapper>
          <p>Nie masz jeszcze konta?</p>
          <Button variant="text" onClick={() => setIsLogin(false)}>
            Zarejestruj się
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

export default LoginForm;
