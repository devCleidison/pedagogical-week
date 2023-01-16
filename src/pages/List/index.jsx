import { useEffect } from "react";
import { Card } from "../../components/Card";
import { Navbar } from "../../components/Navbar";

import { useTalks } from "../../hooks/useTalks";

import { Container, Content, GridContainer } from "./styles";

export function List() {
  const { getAllSubscribesCodeAtTalk, allTalksForDev } = useTalks();

  useEffect(() => {
    getAllSubscribesCodeAtTalk();
  }, []);

  return (
    <Container>
      <Navbar />

      <Content>
        <h1 className="title">Participantes inscritos</h1>

        <GridContainer>
          {allTalksForDev.map((talk) => (
            <Card key={talk.id} data={talk} showSubscribe={true} />
          ))}
        </GridContainer>
      </Content>
    </Container>
  );
}
