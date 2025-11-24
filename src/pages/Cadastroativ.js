import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import "../App.css";
import { authHeader } from "../auth";

export default function Cadastroativ() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const turmaId = searchParams.get("turmaId");

  const [descricao, setDescricao] = useState("");

  async function cadastrar(e) {
    e.preventDefault();

    try {
      const res = await fetch('/api/atividades', {
        method: 'POST',
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ descricao, turmaId })
      });

      if (!res.ok) throw new Error("Erro ao cadastrar atividade");

      navigate(`/atividades/turma/${turmaId}`);
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar");
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Cadastrar Nova Atividade</h2>

      <form onSubmit={cadastrar}>
        <label>Descrição:</label>
        <input
          className="border p-2 w-full mb-3"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Salvar
        </button>
      </form>
    </div>
  );
}
