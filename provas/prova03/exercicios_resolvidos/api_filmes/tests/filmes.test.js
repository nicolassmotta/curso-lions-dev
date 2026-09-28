// Exercício 7 (e conferência dos exercícios 3, 4 e 6), com o model mockado: sem banco
import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../src/app.js";
import Filme from "../src/models/filme.model.js";

vi.mock("../src/models/filme.model.js", () => ({
  default: { find: vi.fn(), findOne: vi.fn(), create: vi.fn(), findOneAndUpdate: vi.fn() },
}));

const token = (papel) => jwt.sign({ id: "u1", email: "ana@email.com", papel }, process.env.JWT_SECRET);
const ID = "66f1c2a9e4b0a1b2c3d4e5f6";

beforeEach(() => {
  vi.resetAllMocks();
});

describe("GET /filmes/:id", () => {
  it("inexistente responde 404", async () => {
    Filme.findOne.mockResolvedValue(null);
    const res = await request(app).get(`/filmes/${ID}`);
    expect(res.status).toBe(404);
    expect(Filme.findOne).toHaveBeenCalledWith({ _id: ID, excluidoEm: null });
  });

  it("id com formato inválido responde 400", async () => {
    Filme.findOne.mockRejectedValue(Object.assign(new Error("Cast to ObjectId failed"), { name: "CastError" }));
    const res = await request(app).get("/filmes/abc");
    expect(res.status).toBe(400);
  });
});

describe("POST /filmes", () => {
  it("sem token responde 401", async () => {
    const res = await request(app).post("/filmes").send({ titulo: "Central do Brasil" });
    expect(res.status).toBe(401);
  });

  it("usuário comum responde 403", async () => {
    const res = await request(app).post("/filmes").set("Authorization", `Bearer ${token("usuario")}`).send({ titulo: "Central do Brasil" });
    expect(res.status).toBe(403);
    expect(Filme.create).not.toHaveBeenCalled();
  });

  it("admin cria e responde 201", async () => {
    Filme.create.mockImplementation(async (dados) => ({ _id: ID, ...dados }));
    const res = await request(app).post("/filmes").set("Authorization", `Bearer ${token("admin")}`).send({ titulo: "Central do Brasil", ano: 1998 });
    expect(res.status).toBe(201);
    expect(res.body.titulo).toBe("Central do Brasil");
  });
});

describe("PATCH e DELETE", () => {
  it("PATCH ignora campo proibido", async () => {
    Filme.findOneAndUpdate.mockResolvedValue({ _id: ID, nota: 9 });
    const res = await request(app).patch(`/filmes/${ID}`).set("Authorization", `Bearer ${token("admin")}`).send({ nota: 9, excluidoEm: null, papel: "admin" });
    expect(res.status).toBe(200);
    expect(Filme.findOneAndUpdate).toHaveBeenCalledWith({ _id: ID, excluidoEm: null }, { nota: 9 }, { new: true, runValidators: true });
  });

  it("DELETE faz soft delete e responde 204", async () => {
    Filme.findOneAndUpdate.mockResolvedValue({ _id: ID });
    const res = await request(app).delete(`/filmes/${ID}`).set("Authorization", `Bearer ${token("admin")}`);
    expect(res.status).toBe(204);
    const [, atualizacao] = Filme.findOneAndUpdate.mock.calls[0];
    expect(atualizacao.excluidoEm).toBeInstanceOf(Date);
  });
});
