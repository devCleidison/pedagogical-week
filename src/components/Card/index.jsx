import { useEffect, useState } from "react";

import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase";

import { useAuthValue } from "../../context/AuthContext";
import { useTalks } from "../../hooks/useTalks";

import { Container } from "./styles";

export function Card({ data, showSubscribe }) {
  const [updatedData, setUpdatedData] = useState();
  const [participantName, setParticipantName] = useState([]);

  const { handleSubscribeAtTalk } = useTalks();
  const { user } = useAuthValue();

  async function getNameSubscribeAtTalk(codeUsers) {
    codeUsers.forEach(async (code) => {
      const usersDocRef = doc(db, "users", code);
      const userDoc = await getDoc(usersDocRef);

      setParticipantName(oldName => [...oldName, userDoc.data().displayName])
    });
  }

  async function handleSubscribe() {
    let isSubscribe = null;

    if (!updatedData?.participants.includes(user.uid)) {
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
    const newHour = new Date(hour).getHours();
    const newMinutes = new Date(hour).getMinutes();

    if (newMinutes < 10) {
      return `${newHour}:${newMinutes}0`;
    }
    return `${newHour}:${newMinutes}`;
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
      if (newData.participants.length > 0) {
        getNameSubscribeAtTalk(newData.participants);
      }
      setUpdatedData(newData);
    });
  }, []);

  return (
    <Container show={showSubscribe}>
      <h1 className="title-card">{updatedData?.title}</h1>
      {!showSubscribe && (
        <>
          {updatedData?.description && (
            <p className="description-card">{updatedData?.description}</p>
          )}
        </>
      )}

      <div className="info-container">
        {!showSubscribe && (
          <>
            <span>
              Setor: <span>{String(updatedData?.sector).toUpperCase()}</span>
            </span>

            <span>
              Mediadores (as): <span>{updatedData?.mediators}</span>
            </span>
          </>
        )}

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
            {!showSubscribe && (
              <>
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
              </>
            )}

            {showSubscribe ? (
              <div className="participants">
                <span>Participantes:</span>
                <ul>
                  {participantName?.map((participant) => (
                    <li key={participant}>{participant}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Container>
  );
}
