import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {useAuthentication} from "../../hooks/useAuthentication"

import sideImg from "../../assets/side-image-sign-in.png";
import { ToastContainer, toast } from "../../components/Toast"

import { Container, Content, Ball } from "./styles";

export function SignIn() {
  const [isShowSignUpForm, setIsShowSignUpForm] = useState(false);
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [category, setCategory] = useState("");

  const { error, createNewUser, login, auth } = useAuthentication();

  function handleShowSignInForm() {
    if (isShowSignUpForm) {
      setIsShowSignUpForm(false);
    } else {
      setIsShowSignUpForm(true);
    }

    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setCategory("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (isShowSignUpForm) {
      const data = {
        displayName,
        email,
        password,
        confirmPassword,
        category,
      };

      if (password !== confirmPassword) {
        toast.error("As senhas não coincidem!");
        return;
      }

      if (password.length < 6 || confirmPassword.length < 6) {
        toast.error("Sua senha precisa ter ao menos 6 caracteres!");
        return;
      }

      await createNewUser(data);
    } else {
      const data = {
        email,
        password,
      };

      if (!email || !password) {
        toast.error("Preencha os campos corretamente!");
        return;
      }

      await login(data);
    }
  }

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/home");
    }
  }, [auth.currentUser]);

  useEffect(() => {
    toast.error(error);
  }, [error]);

  return (
    <Container>
      <ToastContainer />

      <Ball positionX={-15} positionY={-20} w={70} h={70} />
      <Ball positionX={-15} positionY={-20} w={60} h={60} />

      <div className="greetings">
        <span>Bem-vindo(a)!</span>
        <h1>Jornada Pedagógica 2023</h1>
        <span>
          Tema: Educação integral e integrada com responsabilidade social
        </span>
      </div>

      <Content>
        {!isShowSignUpForm ? (
          <div className="form-container">
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="E-mail"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                placeholder="Senha"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button type="submit" onClick={handleSubmit}>
                Entrar
              </button>
            </form>

            <p>
              Ainda não têm uma conta?{" "}
              <button onClick={handleShowSignInForm}>Criar conta.</button>
            </p>
          </div>
        ) : (
          <div className="form-container">
            <h1>Criar conta</h1>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nome"
                required
                onChange={(e) => setDisplayName(e.target.value)}
                value={displayName}
              />
              <input
                type="email"
                placeholder="E-mail"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                placeholder="Senha"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <input
                type="password"
                placeholder="Confirme sua senha"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
              <select
                required
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="" disabled>
                  Qual nível da educação?
                </option>
                <option value="infantil">Infantil</option>
                <option value="iniciais">Iniciais</option>
                <option value="finais">Finais</option>
                {email === "cleidison.dev@gmail.com" && (
                  <option value="admin">Administrador</option>
                )}
              </select>

              {!isShowSignUpForm ? (
                <button type="submit">Entrar</button>
              ) : (
                <button type="submit">Criar conta</button>
              )}
            </form>

            <p>
              Já têm uma conta?{" "}
              <button onClick={handleShowSignInForm}>Acessar conta.</button>
            </p>
          </div>
        )}

        <img src={sideImg} alt="" />
      </Content>
    </Container>
  );
};
