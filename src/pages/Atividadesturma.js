import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import "../App.css";
import { authHeader } from "../auth";

export default function Atividadesturma() {
  const { turmaId } = useParams();
  const navigate = useNavigate();
  const [professor, setProfessor] = useState(null);
  const [turma, setTurma] = useState(null);
  const [atividades, setAtividades] = useState([]);

  useEffect(() => {
    const p = localStorage.getItem('saep_professor');
    if (!p) return navigate('/login');

    setProfessor(JSON.parse(p));
    loadTurma();
    loadAtividades();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turmaId]);

  async function loadTurma() {
    try {
      const res = await fetch(`/api/turmas/${turmaId}`, {
        headers: authHeader()
      });
      if (!res.ok) throw new Error('Turma não encontrada');
      const data = await res.json();
      setTurma(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function loadAtividades() {
    try {
      const res = await fetch(`/api/atividades?turmaId=${turmaId}`, {
        headers: authHeader()
      });

      if (!res.ok) throw new Error('Erro ao carregar atividades');

      const data = await res.json();
      setAtividades(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        
        <header className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-bold">Sistema de Avaliação da Educação Profissional</h2>
            <p className="text-sm text-gray-600">Avaliação Prática de Desempenho dos Estudantes</p>
          </div>

          <div className="flex items-center gap-4">
            {professor && (
              <div className="text-right">
                <div className="font-semibold">{professor.nome}</div>
                <div className="text-xs text-gray-500">{professor.email}</div>
              </div>
            )}

            <button
              onClick={() => {
                localStorage.clear();
                navigate('/login');
              }}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Sair
            </button>
          </div>
        </header>

        <div className="mb-4 flex justify-between items-center">
          <h3 className="font-semibold">
            Atividades da Turma {turma ? `- ${turma.nome}` : ''}
          </h3>

          <Link
            to={`/atividades/cadastrar?turmaId=${turmaId}`}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Cadastrar Atividade
          </Link>
        </div>

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">#</th>
              <th>Descrição</th>
            </tr>
          </thead>

          <tbody>
            {atividades.length === 0 && (
              <tr>
                <td colSpan="2" className="py-4 text-center text-gray-500">
                  Nenhuma atividade encontrada
                </td>
              </tr>
            )}

            {atividades.map((a, idx) => (
              <tr key={a.id} className="border-b">
                <td className="py-2">{idx + 1}</td>
                <td className="py-2">{a.descricao}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
