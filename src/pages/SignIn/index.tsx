import React, { FormEvent } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%'
  },
  card: {
    padding: 16
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const SignIn: React.FC = () => {
  const classes = useStyles();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log('Login');
  }

  return (
    <Container className={classes.root} component="main" maxWidth="xs">
      <Card className={classes.card}>
        <Typography>Login</Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            id="email"
            name="email"
            label="E-mail"
            autoComplete="email"
            autoFocus
            fullWidth
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            id="password"
            name="password"
            type="password"
            label="Senha"
            autoComplete="current-password"
            fullWidth
            required
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Lembrar-me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Esqueceu a senha?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                Criar conta
              </Link>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Container>
  );
}

export default SignIn;