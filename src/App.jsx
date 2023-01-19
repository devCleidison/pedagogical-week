import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { SignIn } from "./pages/SignIn";
import { Home } from "./pages/Home";
import { Loading } from "./components/Loading";
import { List } from "./pages/List";
import { New } from "./pages/New";
import { Subscribes } from "./pages/Subscribres";

import { onAuthStateChanged } from "firebase/auth";
import { useAuthentication } from "./hooks/useAuthentication";
import { AuthProvider } from "./context/AuthContext";

import { GlobalStyle } from "./styles/global";

export function App() {
  const [user, setUser] = useState(null);
  const { auth, loading } = useAuthentication();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user));
  }, [auth]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <AuthProvider value={{ user }}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={user ? <Navigate to="home" /> : <SignIn />}
              />
              <Route path="*" element={<Navigate to="/" />} />

              <Route path="/" element={<Navigate to="login" />} />
              <Route path="login" element={<SignIn />} />
              <Route path="home" element={<Home />} />
              <Route path="subscribes" element={<Subscribes />} />

              {auth.currentUser?.email === "cleidison.dev@gmail.com" && (
                <Route path="new" element={<New />} />
              )}
              {auth.currentUser?.email === "cleidison.dev@gmail.com" && (
                <Route path="list-subscribes" element={<List />} />
              )}
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      )}
      <GlobalStyle />
    </>
  );
}
