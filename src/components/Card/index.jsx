import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthValue } from "../../context/AuthContext";
import { useTalks } from "../../hooks/useTalks";
import { db } from "../../services/firebase";

import { Container } from "./styles";

export function Card({ data }) {
  const [updatedData, setUpdatedData] = useState();

  const { handleSubscribeAtTalk } = useTalks();
  const { user } = useAuthValue();
  
  async function handleSubscribe() {
    let isSubscribe = null;

    if(!updatedData?.participants.includes(user.uid)) {
      isSubscribe = true;
    } else {
      isSubscribe = false;
    }

    await handleSubscribeAtTalk(data.id, isSubscribe);
  }

  function convertTmeStampToDate(date) {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  }

  function convertTmeStampToHour(hour) {
    const newHour = new Date(hour);
    return newHour.getHours();
  }

  useEffect(() => {
    const talksDocRef = collection(db, "talks");
    let newData = {};

    onSnapshot(talksDocRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.id === data.id) {
          newData = doc.data();
        }
      });

      setUpdatedData(newData);
    });
  }, []);

  return (
    <Container>
      <h1 className="title-card">{updatedData?.title}</h1>
      {updatedData?.description && (
        <p className="description-card">{updatedData?.description}</p>
      )}

      <div className="info-container">
        <span>
          Setor: <span>{String(updatedData?.sector).toUpperCase()}</span>
        </span>

        <span>
          Mediadores (as): <span>{updatedData?.mediators}</span>
        </span>

        <div className="info-lecture">
          <span>
            Vagas: <span>{updatedData?.vacancies}</span>
          </span>

          <div className="info">
            <div className="date">
              <span>
                Data:{" "}
                <span>{convertTmeStampToDate(updatedData?.initialAt)}</span>
              </span>
              <span>
                Horário:{" "}
                <span>
                  de {convertTmeStampToHour(updatedData?.initialAt)}h às{" "}
                  {convertTmeStampToHour(updatedData?.finishAt)}h
                </span>
              </span>
            </div>
            {!updatedData?.participants.includes(user?.uid) && (
              <button
                type="button"
                onClick={handleSubscribe}
                className="active"
                disabled={updatedData?.vacancies === 0}
              >
                Inscreva-se
              </button>
            )}
            {updatedData?.participants.includes(user?.uid) && (
              <button
                type="button"
                onClick={handleSubscribe}
                className="remove"
              >
                Remover inscrição
              </button>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
