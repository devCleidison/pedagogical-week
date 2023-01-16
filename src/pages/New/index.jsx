import { useEffect, useState } from "react";

import { useTalks } from "../../hooks/useTalks";

import { ToastContainer, toast } from "../../components/Toast";
import { Navbar } from "../../components/Navbar";

import { Container, Content } from "./styles";

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sector, setSector] = useState("");
  const [mediators, setMediators] = useState("");
  const [initialAt, setInitialAt] = useState("");
  const [finishAt, setFinishAt] = useState("");

  const { createNewTalk, error } = useTalks();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !sector || !mediators || !initialAt || !finishAt) {
      return;
    }

    const talk = {
      title,
      description,
      sector,
      mediators,
      initialAt,
      finishAt,
    };

    await createNewTalk(talk);

    if (!error) {
      toast.success("Palestra criada com sucesso!");
    }
  }

  useEffect(() => {
    toast.error(error);
  }, [error]);

  return (
    <Container>
      <Navbar />
      <ToastContainer />
      <h1 className="title">Cadastrar palestra</h1>

      <Content>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Título:</span>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </label>
          <label>
            <span>Descrição:</span>
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </label>
          <label>
            <span>Setor:</span>
            <input
              type="text"
              onChange={(e) => setSector(e.target.value)}
              value={sector}
              required
            />
          </label>
          <label>
            <span>Mediadores (as):</span>
            <input
              type="text"
              onChange={(e) => setMediators(e.target.value)}
              value={mediators}
              required
            />
          </label>
          <label>
            <span>Início:</span>
            <input
              type="datetime-local"
              onChange={(e) => setInitialAt(e.target.value)}
              value={initialAt}
              required
            />
          </label>
          <label>
            <span>Término:</span>
            <input
              type="datetime-local"
              onChange={(e) => setFinishAt(e.target.value)}
              value={finishAt}
              required
            />
          </label>

          <button type="submit">Salvar palestra</button>
        </form>
      </Content>
    </Container>
  );
}
