import { useState } from "react";

const ESTADO_INICIAL = {
  nomePet: "",
  especie: "Cão",
  nomeDono: "",
  telefoneDono: "",
  servico: "Banho",
  data: "",
};

const ESPECIES = ["Cão", "Gato", "Outro"];
const SERVICOS = ["Banho", "Tosa", "Banho e Tosa"];

export default function App() {
  const [form, setForm] = useState(ESTADO_INICIAL);
  const [carregando, setCarregando] = useState(false);
  const [feedback, setFeedback] = useState(null); // { tipo, mensagem, agendamento }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((anterior) => ({ ...anterior, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setCarregando(true);
    setFeedback(null);

    try {
      const resposta = await fetch("/api/agendamento/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.mensagem || "Não foi possível criar o agendamento.");
      }

      setFeedback({
        tipo: "sucesso",
        mensagem: dados.mensagem,
        agendamento: dados.agendamento,
      });
      setForm(ESTADO_INICIAL);
    } catch (erro) {
      setFeedback({ tipo: "erro", mensagem: erro.message });
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="pagina">
      <main className="cartao">
        <header className="cabecalho">
          <span className="patinha" aria-hidden="true">🐾</span>
          <h1>Petshop</h1>
          <p>Agende o serviço do seu pet</p>
        </header>

        <form className="formulario" onSubmit={handleSubmit}>
          <div className="campo">
            <label htmlFor="nomePet">Nome do pet</label>
            <input
              id="nomePet"
              name="nomePet"
              value={form.nomePet}
              onChange={handleChange}
              placeholder="Ex.: Rex"
              required
            />
          </div>

          <div className="linha">
            <div className="campo">
              <label htmlFor="especie">Espécie</label>
              <select id="especie" name="especie" value={form.especie} onChange={handleChange}>
                {ESPECIES.map((especie) => (
                  <option key={especie} value={especie}>
                    {especie}
                  </option>
                ))}
              </select>
            </div>

            <div className="campo">
              <label htmlFor="servico">Serviço</label>
              <select id="servico" name="servico" value={form.servico} onChange={handleChange}>
                {SERVICOS.map((servico) => (
                  <option key={servico} value={servico}>
                    {servico}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="campo">
            <label htmlFor="nomeDono">Nome do dono</label>
            <input
              id="nomeDono"
              name="nomeDono"
              value={form.nomeDono}
              onChange={handleChange}
              placeholder="Ex.: Maria Silva"
              required
            />
          </div>

          <div className="linha">
            <div className="campo">
              <label htmlFor="telefoneDono">Telefone</label>
              <input
                id="telefoneDono"
                name="telefoneDono"
                value={form.telefoneDono}
                onChange={handleChange}
                placeholder="(11) 99999-9999"
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="data">Data</label>
              <input
                id="data"
                name="data"
                type="date"
                value={form.data}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button className="botao" type="submit" disabled={carregando}>
            {carregando ? "Enviando..." : "Agendar"}
          </button>
        </form>

        {feedback && (
          <div className={`feedback feedback--${feedback.tipo}`} role="status">
            <strong>{feedback.mensagem}</strong>
            {feedback.agendamento && (
              <p className="feedback__detalhe">
                {feedback.agendamento.nomePet} · {feedback.agendamento.servico}
                {feedback.agendamento.valor != null && ` · R$ ${feedback.agendamento.valor}`}
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
