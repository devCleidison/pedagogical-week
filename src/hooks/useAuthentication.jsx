import { useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import cuid from "cuid";

export function useAuthentication() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function createNewUser(data) {
    setLoading(true);

    if (data.category === "admin") {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        await updateProfile(user, {
          displayName: user.displayName,
        });

        try {
          const userId = user.uid;

          const docRef = await setDoc(doc(db, "admin", userId), {
            id: user.uid,
            displayName: data.displayName,
            email: data.email,
          });
        } catch (err) {
          setError(err.message);
        }

        return user;
      } catch (err) {
        let systemErrorMessage;

        if (err.message.includes("email-already")) {
          systemErrorMessage = "Este e-mail já está em uso!";
        } else {
          systemErrorMessage = "Ocorreu um erro, por favor tente novamente!";
        }

        setError(systemErrorMessage);
      }
    } else {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        await updateProfile(user, {
          displayName: user.displayName,
        });

        try {
          const userId = user.uid;
          const docRef = await setDoc(doc(db, "users", userId), {
            id: user.uid,
            displayName: data.displayName,
            email: data.email,
            category: data.category,
            talks: [],
          });
        } catch (err) {
          setError(err.message);
        }

        return user;
      } catch (err) {
        let systemErrorMessage;

        if (err.message.includes("email-already")) {
          systemErrorMessage = "Este e-mail já está em uso!";
        } else {
          systemErrorMessage = "Ocorreu um erro, por favor tente novamente!";
        }

        setError(systemErrorMessage);
      }
    }

    setLoading(false);
  }

  async function login(data) {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (err) {
      let systemErrorMessage;

      if (err.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado!";
      } else if (err.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta!";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente novamente!";
      }
      setError(systemErrorMessage);
    }

    setLoading(false);
  }

  function logout() {
    signOut(auth);
  }

  useEffect(() => {
    setLoading(true);
    const interval = setInterval(() => {
      setLoading(false);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return { auth, createNewUser, login, logout, loading, error };
}
