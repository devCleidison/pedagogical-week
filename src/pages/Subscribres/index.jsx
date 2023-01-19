import { Card } from "../../components/Card";
import { Navbar } from "../../components/Navbar";

import { useTalks } from "../../hooks/useTalks";

import { Container, Content, GridContainer } from "./styles";

export function Subscribes() {
  const { subscribedTalks, loading } = useTalks();

  return (
    <Container>
      <Navbar />

      <Content>
        <h1 className="title">Minhas inscrições</h1>

        {!loading && (
          <GridContainer>
            {subscribedTalks.map((talk) => (
              <Card key={talk.id} data={talk} showSubscribe={false} />
            ))}
          </GridContainer>
        )}
      </Content>
    </Container>
  );
}
