import { X } from "phosphor-react";
import { useEffect, useState } from "react";

import { Card } from "../../components/Card";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

import { useTalks } from "../../hooks/useTalks";

import { Container, Content, GridContainer } from "./styles";

export function Home() {
  const { selectedTalks, loading } = useTalks();
  const [turn, setTurn] = useState("morning");
  const [showModal, setShowModal] = useState(true);

  const [actualTimeStamp] = useState(Date.now());
  const [actualDate] = useState(new Date(actualTimeStamp).toLocaleDateString());

  function convertTmeStampToHour(hour) {
    const newHour = new Date(hour);
    return newHour.getHours();
  }

  return (
    <Container>
      <Navbar />

      <Content>
        {showModal ? (
          <>
            {actualDate < "23/01/2023" ? (
              <div className="finished">
                <button onClick={() => setShowModal(false)}>
                  <X />
                </button>
                <h2>Atenção!</h2>
                <p>Devido a pedidos, reabrimos as inscrições.</p>
                <span>
                  As inscrições ficarão disponíveis até às 23:59 deste domingo!
                </span>

                <div className="canceled">
                  <h3>Palestra "Empreendedorismo na escola"</h3>
                  <p>
                    Dia: 23/01 de 8h às 10h - <span>Cancelada</span>
                  </p>
                  <p>
                    Dia: 24/01 de 13h às 16:30h - <span>Cancelada</span>
                  </p>

                  <h3>Palestra "Impacto do racismo na escola"</h3>
                  <p>
                    Dia: 24/01 de 13h às 16:30h -{" "}
                    <span>Antecipada para 23/01 no mesmo horário</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="finished">
                <button onClick={() => setShowModal(false)}>
                  <X />
                </button>
                <h2>Atenção!</h2>
                <p>Inscrições encerradas</p>
              </div>
            )}
          </>
        ) : (
          <>
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
                    return (
                      <Card key={talk.id} data={talk} showSubscribe={false} />
                    );
                  } else if (
                    turn === "afternoon" &&
                    convertTmeStampToHour(talk?.initialAt) >= 12 &&
                    convertTmeStampToHour(talk?.initialAt) < 18
                  ) {
                    return (
                      <Card key={talk.id} data={talk} showSubscribe={false} />
                    );
                  } else if (
                    turn === "night" &&
                    convertTmeStampToHour(talk?.initialAt) >= 18
                  ) {
                    return (
                      <Card key={talk.id} data={talk} showSubscribe={false} />
                    );
                  }
                })}
              </GridContainer>
            )}
          </>
        )}
      </Content>
      <Footer />
    </Container>
  );
}
