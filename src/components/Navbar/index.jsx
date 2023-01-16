import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { List, X } from "phosphor-react";

import { useAuthentication } from "../../hooks/useAuthentication";

import { Container, Content } from "./styles";

export function Navbar() {
  const { logout, auth } = useAuthentication();
  const navigate = useNavigate();

  const [isShowMenu, setIsShowMenu] = useState(false);

  function handleMenu() {
    const nav = document.querySelector("nav");
    const body = document.querySelector("body");

    if (window.innerWidth <= 600) {
      if (isShowMenu) {
        setIsShowMenu(false);
        nav?.classList.remove("show");
        body;
        if (body !== null) {
          body.style.overflowY = "initial";
        }
      } else {
        setIsShowMenu(true);
        nav?.classList.add("show");
        if (body !== null) {
          body.style.overflowY = "hidden";
        }
      }
    }
  }

  useEffect(() => {
    const body = document.querySelector("body");
    if (body !== null) {
      body.style.overflowY = "initial";
    }

    if (!auth.currentUser) {
      navigate("/");
    }
  }, [!auth.currentUser]);

  return (
    <Container>
      <Content>
        <Link to="/home" className="logo">
          SEMEEJ
        </Link>

        <nav>
          <ul>
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={handleMenu}
              >
                Início
              </NavLink>
            </li>
            {!auth.currentUser?.email === "cleidison.dev@gmail.com" && (
              <li>
                <NavLink
                  to="/subscribes"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={handleMenu}
                >
                  Minhas palestras
                </NavLink>
              </li>
            )}
            {auth.currentUser?.email === "cleidison.dev@gmail.com" && (
              <li>
                <NavLink
                  to="/new"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={handleMenu}
                >
                  Criar palestra
                </NavLink>
              </li>
            )}
            {auth.currentUser?.email === "cleidison.dev@gmail.com" && (
              <li>
                <NavLink
                  to="/list-subscribes"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={handleMenu}
                >
                  Inscritos
                </NavLink>
              </li>
            )}

            <li>
              <button onClick={logout}>Sair</button>
            </li>
          </ul>
        </nav>

        <button type="button" className="toggle-menu" onClick={handleMenu}>
          {isShowMenu ? <X /> : <List />}
        </button>
      </Content>
    </Container>
  );
}
