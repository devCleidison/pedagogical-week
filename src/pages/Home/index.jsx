import { useState } from "react";
import { Card } from "../../components/Card";
import { Navbar } from "../../components/Navbar";
import { useTalks } from "../../hooks/useTalks";
import { Container, Content, GridContainer } from "./styles";

export function Home() {
  const { selectedTalks } = useTalks();
  const [turn, setTurn] = useState("morning");

  function convertTmeStampToHour(hour) {
    const newHour = new Date(hour);
    return newHour.getHours();
  }

  return (
    <Container>
      <Navbar />

      <Content>
        <h1 className="title">Palestras</h1>

        <div className="select-turn">
          <p>Período: </p>

          <select
            name="turn"
            onChange={(e) => setTurn(e.target.value)}
            value={turn}
          >
            <option value="morning">Manhã</option>
            <option value="afternoon">Tarde</option>
          </select>

        </div>

        <GridContainer>
          {selectedTalks.map((talk) => {
            if (
              turn === "morning" &&
              convertTmeStampToHour(talk?.initialAt) < 12
            ) {
              return <Card key={talk.id} data={talk} />;
            } else if (
              turn === "afternoon" &&
              convertTmeStampToHour(talk?.initialAt) >= 12
            ) {
              return <Card key={talk.id} data={talk} />;
            }
          })}
        </GridContainer>
      </Content>
    </Container>
  );
}
