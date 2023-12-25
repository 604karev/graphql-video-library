import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import withHocs from "./AuthHoc";
import { LOGIN_MUTATION, REGISTER_MUTATION } from "./mutations";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useAuth } from "hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { pathname } = useLocation();
  const isLogin = pathname === "/signin";

  const [signIn] = useMutation(LOGIN_MUTATION, {
    onCompleted: (signInData) => {
      login(signInData.login.token);
    },
  });

  const [signUp] = useMutation(REGISTER_MUTATION, {
    onCompleted: (signUpData) => {
      login(signUpData.register.token);
    },
  });

  const handleAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (isLogin) {
        await signIn({ variables: { email, password } });
      } else {
        await signUp({ variables: { email, password, username } });
      }
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleAuth} sx={{ mt: 1 }}>
          {!isLogin && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus={isLogin}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <Button
            color="primary"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default withHocs(LoginForm);
