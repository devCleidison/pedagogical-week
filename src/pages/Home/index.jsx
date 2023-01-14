import { useEffect } from "react";
import { Card } from "../../components/Card";
import { Navbar } from "../../components/Navbar";
import { useTalks } from "../../hooks/useTalks";
import { Container, Content, GridContainer } from "./styles";

export function Home() {
  const { selectedTalks } = useTalks();

  return (
    <Container>
      <Navbar />

      <Content>
        <h1 className="title">Palestras</h1>

        <GridContainer>
          {selectedTalks.map(talk => <Card key={talk.id} data={talk}/>)}
        </GridContainer>
      </Content>
    </Container>
  );
}
