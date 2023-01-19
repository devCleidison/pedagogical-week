import { useState } from "react";

import { Card } from "../../components/Card";
import { Navbar } from "../../components/Navbar";

import { useTalks } from "../../hooks/useTalks";

import { Container, Content, GridContainer } from "./styles";

export function Home() {
  const { selectedTalks, loading } = useTalks();
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

        <div className="warning">
          <h2>Atenção!</h2>
          <span>As inscrições se encerram as 23:59 de hoje!</span>
        </div>

        <div className="select-turn">
          <p>Período: </p>

          <select
            name="turn"
            onChange={(e) => setTurn(e.target.value)}
            value={turn}
          >
            <option value="morning">Manhã</option>
            <option value="afternoon">Tarde</option>
            <option value="night">Noite</option>
          </select>
        </div>

        {!loading && (
          <GridContainer>
            {selectedTalks.map((talk) => {
              if (
                turn === "morning" &&
                convertTmeStampToHour(talk?.initialAt) < 12
              ) {
                return <Card key={talk.id} data={talk} showSubscribe={false} />;
              } else if (
                turn === "afternoon" &&
                convertTmeStampToHour(talk?.initialAt) >= 12 &&
                convertTmeStampToHour(talk?.initialAt) < 18
              ) {
                return <Card key={talk.id} data={talk} showSubscribe={false} />;
              } else if (
                turn === "night" &&
                convertTmeStampToHour(talk?.initialAt) >= 18
              ) {
                return <Card key={talk.id} data={talk} showSubscribe={false} />;
              }
            })}
          </GridContainer>
        )}
      </Content>
    </Container>
  );
}
