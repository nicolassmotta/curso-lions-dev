import { useCallback, useEffect, useMemo, useState } from "react";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const STATUS_OPTIONS = ["Pendente", "Confirmada", "Cancelada"];

const emptyImovelForm = {
  titulo: "",
  descricao: "",
  localizacao: "",
  precoNoite: "",
  capacidadeMaxima: "",
};

const emptyReservaForm = {
  imovelId: "",
  nomeHospede: "",
  emailHospede: "",
  dataEntrada: "",
  quantidadeNoites: 1,
  hospedesTexto: "",
};

const emptyAvaliacaoForm = {
  imovelId: "",
  nomeUsuario: "",
  nota: 5,
  comentario: "",
};

function endpoint(path) {
  return `${API_BASE_URL}${path}`;
}

async function apiFetch(path, options = {}) {
  const response = await fetch(endpoint(path), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const text = await response.text();
  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!response.ok) {
    throw new Error(data?.message || data?.error || "Erro ao processar requisicao.");
  }

  return data;
}

function currency(value) {
  return Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatDate(value) {
  if (!value) return "-";

  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;

  return `${day}/${month}/${year}`;
}

function getApiMessage(error) {
  return error instanceof Error ? error.message : "Nao foi possivel concluir a acao.";
}

function parseHospedes(text) {
  const rows = text
    .split("\n")
    .map((row) => row.trim())
    .filter(Boolean);

  if (rows.length === 0) {
    throw new Error("Informe ao menos um hospede.");
  }

  return rows.map((row) => {
    const [nome, idade] = row.split(",").map((item) => item.trim());
    const idadeNumero = Number(idade);

    if (!nome || !Number.isFinite(idadeNumero) || idadeNumero <= 0) {
      throw new Error("Use o formato: Nome, idade.");
    }

    return { nome, idade: idadeNumero };
  });
}

function App() {
  const [activeTab, setActiveTab] = useState("imoveis");
  const [imoveis, setImoveis] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [mediaGeral, setMediaGeral] = useState(0);
  const [selectedImovelId, setSelectedImovelId] = useState("");
  const [filtroLocalizacao, setFiltroLocalizacao] = useState("");
  const [imovelForm, setImovelForm] = useState(emptyImovelForm);
  const [reservaForm, setReservaForm] = useState(emptyReservaForm);
  const [avaliacaoForm, setAvaliacaoForm] = useState(emptyAvaliacaoForm);
  const [deleteNames, setDeleteNames] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const selectedImovel = useMemo(
    () => imoveis.find((imovel) => imovel._id === selectedImovelId),
    [imoveis, selectedImovelId]
  );

  const reservaPreview = useMemo(() => {
    const imovel = imoveis.find((item) => item._id === reservaForm.imovelId);
    const noites = Number(reservaForm.quantidadeNoites || 0);
    return imovel && noites > 0 ? imovel.precoNoite * noites : 0;
  }, [imoveis, reservaForm.imovelId, reservaForm.quantidadeNoites]);

  const loadImoveis = useCallback(async (localizacao = "") => {
    setIsLoading(true);
    setError("");

    try {
      const path = localizacao.trim()
        ? `/imoveis/busca?localizacao=${encodeURIComponent(localizacao.trim())}`
        : "/imoveis";
      const data = await apiFetch(path);
      setImoveis(data || []);
      return data || [];
    } catch (fetchError) {
      setError(getApiMessage(fetchError));
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadReservas = useCallback(async () => {
    try {
      const data = await apiFetch("/reservas");
      setReservas(data || []);
    } catch (fetchError) {
      setError(getApiMessage(fetchError));
    }
  }, []);

  const loadAvaliacoes = useCallback(async (imovelId) => {
    if (!imovelId) {
      setAvaliacoes([]);
      setMediaGeral(0);
      return;
    }

    try {
      const data = await apiFetch(`/avaliacoes/imovel/${imovelId}`);
      setAvaliacoes(data?.avaliacoes || []);
      setMediaGeral(data?.mediaGeral || 0);
    } catch (fetchError) {
      setError(getApiMessage(fetchError));
    }
  }, []);

  useEffect(() => {
    loadImoveis().then((items) => {
      if (items.length > 0) {
        setSelectedImovelId(items[0]._id);
        setReservaForm((form) => ({ ...form, imovelId: items[0]._id }));
        setAvaliacaoForm((form) => ({ ...form, imovelId: items[0]._id }));
      }
    });
    loadReservas();
  }, [loadImoveis, loadReservas]);

  useEffect(() => {
    loadAvaliacoes(selectedImovelId);
  }, [loadAvaliacoes, selectedImovelId]);

  function showSuccess(message) {
    setNotice(message);
    setError("");
    window.setTimeout(() => setNotice(""), 4000);
  }

  function updateImovelForm(event) {
    const { name, value } = event.target;
    setImovelForm((form) => ({ ...form, [name]: value }));
  }

  function updateReservaForm(event) {
    const { name, value } = event.target;
    setReservaForm((form) => ({ ...form, [name]: value }));
  }

  function updateAvaliacaoForm(event) {
    const { name, value } = event.target;
    setAvaliacaoForm((form) => ({ ...form, [name]: value }));
  }

  async function handleSearch(event) {
    event.preventDefault();
    const items = await loadImoveis(filtroLocalizacao);

    if (items.length > 0 && !items.some((item) => item._id === selectedImovelId)) {
      setSelectedImovelId(items[0]._id);
    }
  }

  async function clearSearch() {
    setFiltroLocalizacao("");
    await loadImoveis();
  }

  async function handleCreateImovel(event) {
    event.preventDefault();

    try {
      const novoImovel = await apiFetch("/imoveis", {
        method: "POST",
        body: JSON.stringify({
          ...imovelForm,
          precoNoite: Number(imovelForm.precoNoite),
          capacidadeMaxima: Number(imovelForm.capacidadeMaxima),
        }),
      });

      setImovelForm(emptyImovelForm);
      setFiltroLocalizacao("");
      const items = await loadImoveis();
      const nextId = novoImovel?._id || items[0]?._id || "";
      setSelectedImovelId(nextId);
      setReservaForm((form) => ({ ...form, imovelId: nextId }));
      setAvaliacaoForm((form) => ({ ...form, imovelId: nextId }));
      showSuccess("Imovel cadastrado.");
    } catch (submitError) {
      setError(getApiMessage(submitError));
    }
  }

  async function handleCreateReserva(event) {
    event.preventDefault();

    try {
      const hospedes = parseHospedes(reservaForm.hospedesTexto);

      await apiFetch("/reservas", {
        method: "POST",
        body: JSON.stringify({
          imovelId: reservaForm.imovelId,
          nomeHospede: reservaForm.nomeHospede,
          emailHospede: reservaForm.emailHospede,
          dataEntrada: reservaForm.dataEntrada,
          quantidadeNoites: Number(reservaForm.quantidadeNoites),
          hospedes,
        }),
      });

      setReservaForm((form) => ({
        ...emptyReservaForm,
        imovelId: form.imovelId,
      }));
      await loadReservas();
      showSuccess("Reserva criada.");
    } catch (submitError) {
      setError(getApiMessage(submitError));
    }
  }

  async function handleUpdateReservaStatus(id, status) {
    try {
      await apiFetch(`/reservas/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      await loadReservas();
      showSuccess("Status atualizado.");
    } catch (submitError) {
      setError(getApiMessage(submitError));
    }
  }

  async function handleCreateAvaliacao(event) {
    event.preventDefault();

    try {
      await apiFetch("/avaliacoes", {
        method: "POST",
        body: JSON.stringify({
          ...avaliacaoForm,
          nota: Number(avaliacaoForm.nota),
        }),
      });

      setSelectedImovelId(avaliacaoForm.imovelId);
      setAvaliacaoForm((form) => ({
        ...emptyAvaliacaoForm,
        imovelId: form.imovelId,
      }));
      await loadAvaliacoes(avaliacaoForm.imovelId);
      showSuccess("Avaliacao cadastrada.");
    } catch (submitError) {
      setError(getApiMessage(submitError));
    }
  }

  async function handleDeleteAvaliacao(id) {
    try {
      await apiFetch(`/avaliacoes/${id}`, {
        method: "DELETE",
        body: JSON.stringify({
          nomeUsuario: deleteNames[id] || "",
        }),
      });

      setDeleteNames((current) => {
        const copy = { ...current };
        delete copy[id];
        return copy;
      });
      await loadAvaliacoes(selectedImovelId);
      showSuccess("Avaliacao removida.");
    } catch (submitError) {
      setError(getApiMessage(submitError));
    }
  }

  function selectImovel(id) {
    setSelectedImovelId(id);
    setReservaForm((form) => ({ ...form, imovelId: id }));
    setAvaliacaoForm((form) => ({ ...form, imovelId: id }));
  }

  function selectAvaliacaoImovel(event) {
    selectImovel(event.target.value);
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">IL</div>
          <div>
            <span className="eyebrow">Startup Imovel Lions</span>
            <h1>Painel de hospedagens</h1>
          </div>
        </div>

        <div className="stats-row" aria-label="Resumo">
          <div>
            <strong>{imoveis.length}</strong>
            <span>Imoveis</span>
          </div>
          <div>
            <strong>{reservas.length}</strong>
            <span>Reservas</span>
          </div>
          <div>
            <strong>{mediaGeral.toFixed(1)}</strong>
            <span>Media</span>
          </div>
        </div>
      </header>

      <nav className="tabs" aria-label="Secoes do painel">
        {[
          ["imoveis", "Imoveis"],
          ["reservas", "Reservas"],
          ["avaliacoes", "Avaliacoes"],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={activeTab === key ? "tab active" : "tab"}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </nav>

      {(notice || error) && (
        <div className={error ? "feedback error" : "feedback success"} role="status">
          {error || notice}
        </div>
      )}

      <main className="content">
        {activeTab === "imoveis" && (
          <section className="grid-layout">
            <div className="work-area">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Catalogo</span>
                  <h2>Imoveis cadastrados</h2>
                </div>

                <form className="search-form" onSubmit={handleSearch}>
                  <input
                    value={filtroLocalizacao}
                    onChange={(event) => setFiltroLocalizacao(event.target.value)}
                    placeholder="Buscar por localizacao"
                    aria-label="Buscar por localizacao"
                  />
                  <button type="submit">Buscar</button>
                  <button type="button" className="secondary" onClick={clearSearch}>
                    Limpar
                  </button>
                </form>
              </div>

              {isLoading ? (
                <div className="empty-state">Carregando imoveis...</div>
              ) : imoveis.length === 0 ? (
                <div className="empty-state">Nenhum imovel encontrado.</div>
              ) : (
                <div className="property-grid">
                  {imoveis.map((imovel, index) => (
                    <article
                      className={selectedImovelId === imovel._id ? "property-card selected" : "property-card"}
                      key={imovel._id}
                    >
                      <button type="button" className="card-hit" onClick={() => selectImovel(imovel._id)}>
                        <div className={`property-visual visual-${(index % 4) + 1}`}>
                          <span>{imovel.localizacao?.slice(0, 2).toUpperCase() || "IL"}</span>
                        </div>
                        <div className="property-content">
                          <div>
                            <h3>{imovel.titulo}</h3>
                            <p>{imovel.descricao}</p>
                          </div>
                          <dl>
                            <div>
                              <dt>Local</dt>
                              <dd>{imovel.localizacao}</dd>
                            </div>
                            <div>
                              <dt>Noite</dt>
                              <dd>{currency(imovel.precoNoite)}</dd>
                            </div>
                            <div>
                              <dt>Capacidade</dt>
                              <dd>{imovel.capacidadeMaxima}</dd>
                            </div>
                          </dl>
                        </div>
                      </button>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <aside className="side-panel">
              <div className="section-heading compact">
                <div>
                  <span className="eyebrow">Novo cadastro</span>
                  <h2>Imovel</h2>
                </div>
              </div>

              <form className="stack-form" onSubmit={handleCreateImovel}>
                <label>
                  Titulo
                  <input name="titulo" value={imovelForm.titulo} onChange={updateImovelForm} required />
                </label>
                <label>
                  Descricao
                  <textarea
                    name="descricao"
                    value={imovelForm.descricao}
                    onChange={updateImovelForm}
                    rows="4"
                    required
                  />
                </label>
                <label>
                  Localizacao
                  <input name="localizacao" value={imovelForm.localizacao} onChange={updateImovelForm} required />
                </label>
                <div className="two-columns">
                  <label>
                    Preco/noite
                    <input
                      name="precoNoite"
                      type="number"
                      min="1"
                      step="0.01"
                      value={imovelForm.precoNoite}
                      onChange={updateImovelForm}
                      required
                    />
                  </label>
                  <label>
                    Capacidade
                    <input
                      name="capacidadeMaxima"
                      type="number"
                      min="1"
                      value={imovelForm.capacidadeMaxima}
                      onChange={updateImovelForm}
                      required
                    />
                  </label>
                </div>
                <button type="submit">Cadastrar imovel</button>
              </form>
            </aside>
          </section>
        )}

        {activeTab === "reservas" && (
          <section className="grid-layout">
            <div className="work-area">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Operacao</span>
                  <h2>Reservas</h2>
                </div>
                <button type="button" className="secondary" onClick={loadReservas}>
                  Atualizar
                </button>
              </div>

              {reservas.length === 0 ? (
                <div className="empty-state">Nenhuma reserva encontrada.</div>
              ) : (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Hospede</th>
                        <th>Check-in</th>
                        <th>Noites</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservas.map((reserva) => (
                        <tr key={reserva._id}>
                          <td>
                            <strong>{reserva.nomeHospede}</strong>
                            <span>{reserva.emailHospede}</span>
                          </td>
                          <td>{formatDate(reserva.dataEntrada)}</td>
                          <td>{reserva.quantidadeNoites}</td>
                          <td>{currency(reserva.valorTotal)}</td>
                          <td>
                            <select
                              value={reserva.status}
                              onChange={(event) => handleUpdateReservaStatus(reserva._id, event.target.value)}
                              aria-label={`Status da reserva de ${reserva.nomeHospede}`}
                            >
                              {STATUS_OPTIONS.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <aside className="side-panel">
              <div className="section-heading compact">
                <div>
                  <span className="eyebrow">Nova reserva</span>
                  <h2>Hospedagem</h2>
                </div>
                <strong className="preview-price">{currency(reservaPreview)}</strong>
              </div>

              <form className="stack-form" onSubmit={handleCreateReserva}>
                <label>
                  Imovel
                  <select
                    name="imovelId"
                    value={reservaForm.imovelId}
                    onChange={updateReservaForm}
                    required
                    disabled={imoveis.length === 0}
                  >
                    <option value="">Selecione</option>
                    {imoveis.map((imovel) => (
                      <option key={imovel._id} value={imovel._id}>
                        {imovel.titulo}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Nome do responsavel
                  <input name="nomeHospede" value={reservaForm.nomeHospede} onChange={updateReservaForm} required />
                </label>
                <label>
                  E-mail
                  <input
                    name="emailHospede"
                    type="email"
                    value={reservaForm.emailHospede}
                    onChange={updateReservaForm}
                    required
                  />
                </label>
                <div className="two-columns">
                  <label>
                    Check-in
                    <input
                      name="dataEntrada"
                      type="date"
                      value={reservaForm.dataEntrada}
                      onChange={updateReservaForm}
                      required
                    />
                  </label>
                  <label>
                    Noites
                    <input
                      name="quantidadeNoites"
                      type="number"
                      min="1"
                      value={reservaForm.quantidadeNoites}
                      onChange={updateReservaForm}
                      required
                    />
                  </label>
                </div>
                <label>
                  Hospedes
                  <textarea
                    name="hospedesTexto"
                    value={reservaForm.hospedesTexto}
                    onChange={updateReservaForm}
                    rows="5"
                    placeholder={"Ana, 29\nBruno, 31"}
                    required
                  />
                </label>
                <button type="submit" disabled={imoveis.length === 0}>
                  Criar reserva
                </button>
              </form>
            </aside>
          </section>
        )}

        {activeTab === "avaliacoes" && (
          <section className="grid-layout">
            <div className="work-area">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Reputacao</span>
                  <h2>Avaliacoes</h2>
                </div>
                <select
                  className="wide-select"
                  value={selectedImovelId}
                  onChange={(event) => selectImovel(event.target.value)}
                  disabled={imoveis.length === 0}
                  aria-label="Selecionar imovel"
                >
                  <option value="">Selecione um imovel</option>
                  {imoveis.map((imovel) => (
                    <option key={imovel._id} value={imovel._id}>
                      {imovel.titulo}
                    </option>
                  ))}
                </select>
              </div>

              {selectedImovel && (
                <div className="review-summary">
                  <div>
                    <span className="eyebrow">{selectedImovel.localizacao}</span>
                    <h3>{selectedImovel.titulo}</h3>
                  </div>
                  <strong>{mediaGeral.toFixed(1)}</strong>
                </div>
              )}

              {avaliacoes.length === 0 ? (
                <div className="empty-state">Nenhuma avaliacao encontrada.</div>
              ) : (
                <div className="review-list">
                  {avaliacoes.map((avaliacao) => (
                    <article className="review-card" key={avaliacao._id}>
                      <div className="review-head">
                        <div>
                          <strong>{avaliacao.nomeUsuario}</strong>
                          <span>{avaliacao.nota}/5</span>
                        </div>
                        <div className="rating" aria-label={`Nota ${avaliacao.nota} de 5`}>
                          {"*".repeat(Number(avaliacao.nota))}
                        </div>
                      </div>
                      <p>{avaliacao.comentario}</p>
                      <div className="delete-row">
                        <input
                          value={deleteNames[avaliacao._id] || ""}
                          onChange={(event) =>
                            setDeleteNames((current) => ({
                              ...current,
                              [avaliacao._id]: event.target.value,
                            }))
                          }
                          placeholder="Nome do autor"
                          aria-label="Nome do autor para excluir"
                        />
                        <button type="button" className="danger" onClick={() => handleDeleteAvaliacao(avaliacao._id)}>
                          Excluir
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <aside className="side-panel">
              <div className="section-heading compact">
                <div>
                  <span className="eyebrow">Nova avaliacao</span>
                  <h2>Feedback</h2>
                </div>
              </div>

              <form className="stack-form" onSubmit={handleCreateAvaliacao}>
                <label>
                  Imovel
                  <select
                    name="imovelId"
                    value={avaliacaoForm.imovelId}
                    onChange={selectAvaliacaoImovel}
                    required
                    disabled={imoveis.length === 0}
                  >
                    <option value="">Selecione</option>
                    {imoveis.map((imovel) => (
                      <option key={imovel._id} value={imovel._id}>
                        {imovel.titulo}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Nome
                  <input name="nomeUsuario" value={avaliacaoForm.nomeUsuario} onChange={updateAvaliacaoForm} required />
                </label>
                <label>
                  Nota
                  <input
                    name="nota"
                    type="range"
                    min="1"
                    max="5"
                    value={avaliacaoForm.nota}
                    onChange={updateAvaliacaoForm}
                  />
                  <span className="range-value">{avaliacaoForm.nota}/5</span>
                </label>
                <label>
                  Comentario
                  <textarea
                    name="comentario"
                    value={avaliacaoForm.comentario}
                    onChange={updateAvaliacaoForm}
                    rows="5"
                    minLength="10"
                    required
                  />
                </label>
                <button type="submit" disabled={imoveis.length === 0}>
                  Enviar avaliacao
                </button>
              </form>
            </aside>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
