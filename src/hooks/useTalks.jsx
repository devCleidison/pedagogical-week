import { useState, useEffect } from "react";

import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  increment,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import cuid from "cuid";

import { db } from "../services/firebase";

import { useAuthValue } from "../context/AuthContext";

export function useTalks() {
  const [error, setError] = useState(null);
  const [selectedTalks, setSelectedTalks] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuthValue();

  useEffect(() => {
    getDataUsersAndTalks();
  }, []);

  async function getDataUsersAndTalks() {
    const usersDocRef = collection(db, "users");
    const talksDocRef = collection(db, "talks");

    const actualTimeStamp = Date.now();
    const actualDate = new Date(actualTimeStamp).toLocaleDateString();

    const allTalks = [];
    let actualUser = null;

    try {
      onSnapshot(usersDocRef, { includeMetadataChanges: true }, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.data().id === user?.reloadUserInfo.localId) {
            actualUser = doc.data();
          }
        });
      });

      onSnapshot(talksDocRef, { includeMetadataChanges: true }, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          const newDateInitial = new Date(
            doc.data().initialAt
          ).toLocaleDateString();
          const newDateFinal = new Date(
            doc.data().initialAt
          ).toLocaleDateString();

          if (actualDate === "19/01/2023") {
            allTalks.push(doc.data());
          } else {
            if (actualUser?.category === "finais") {
              if (newDateFinal === "24/01/2023") {
                allTalks.push(doc.data());
              }
            } else if (actualUser?.category !== "finais") {
              if (newDateInitial === "23/01/2023") {
                allTalks.push(doc.data());
              }
            }
          }
          setSelectedTalks(allTalks);
        });
      });
    } catch (err) {
      setError(err.message)
    }
  }

  async function createNewTalk(talk) {
    const talkId = cuid();

    try {
      const newTalk = await setDoc(doc(db, "talks", talkId), {
        id: talkId,
        title: talk.title,
        description: talk.description,
        sector: talk.sector,
        mediators: talk.mediators,
        initialAt: talk.initialAt,
        finishAt: talk.finishAt,
        vacancies: 35,
        participants: [],
      });
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSubscribeAtTalk(talkId, toggle) {
    try {
      if (toggle) {
        await updateDoc(doc(db, "users", user.uid), {
          talks: arrayUnion(talkId),
        });
        await updateDoc(doc(db, "talks", talkId), {
          participants: arrayUnion(user.uid),
        });
        await updateDoc(doc(db, "talks", talkId), {
          vacancies: increment(-1),
        });
      } else {
        await updateDoc(doc(db, "users", user.uid), {
          talks: arrayRemove(talkId),
        });
        await updateDoc(doc(db, "talks", talkId), {
          participants: arrayRemove(user.uid),
        });
        await updateDoc(doc(db, "talks", talkId), {
          vacancies: increment(1),
        });
      }
    } catch (err) {
      setError(err.message);
    }

    getDataUsersAndTalks();
  }

  return { createNewTalk, handleSubscribeAtTalk, selectedTalks, error };
}
