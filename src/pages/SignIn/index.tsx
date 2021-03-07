import React, { useCallback, useRef } from 'react';
import {
  Card,
  CardContent,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  Typography,
  Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web'
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%'
  },
  form: {
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const classes = useStyles();

  const { signIn } = useAuth();

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email(),
        password: Yup.string().min(6, 'No mínimo 6 digitos')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      await signIn({
        email: data.email,
        password: data.password
      });
    } catch (error) {
      const errors = getValidationErrors(error);
      formRef.current?.setErrors(errors);

      return;
    }
  }, [signIn]);

  return (
    <Container className={classes.root} component="main" maxWidth="xs">
      <Card>
        <Box textAlign="center" mt={2}>
          <Typography
            component="h1"
            variant="h5"
          >
            App Vendas Web
          </Typography>
        </Box>
        <CardContent>
          <Form
            ref={formRef}
            className={classes.form}
            onSubmit={handleSubmit}>
            <Input
              variant="outlined"
              margin="normal"
              id="email"
              name="email"
              label="E-mail"
              autoComplete="email"
              autoFocus
              fullWidth
            />
            <Input
              variant="outlined"
              margin="normal"
              id="password"
              name="password"
              type="password"
              label="Senha"
              autoComplete="current-password"
              fullWidth
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
                  Esqueci minha senha
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Criar conta
                </Link>
              </Grid>
            </Grid>
          </Form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default SignIn;