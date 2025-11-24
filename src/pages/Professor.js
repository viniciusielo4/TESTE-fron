import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { authHeader } from "../auth";   // <-- IMPORTANTE!

export default function Professor() {
  const navigate = useNavigate();
  const [professor, setProfessor] = useState(null);
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    const p = localStorage.getItem('saep_professor');
    if (!p) return navigate('/login');
    setProfessor(JSON.parse(p));
    loadTurmas();
    // eslint-disable-next-line
  }, []);

  async function loadTurmas() {
    const p = JSON.parse(localStorage.getItem('saep_professor'));
    if (!p) return;

    try {
      const res = await fetch(`/api/turmas?professorId=${p.id}`, {
        headers: authHeader()   // <-- TOKEN AGORA VAI!
      });

      if (!res.ok) throw new Error('Erro ao carregar turmas');
      const data = await res.json();
      setTurmas(data);

    } catch (err) {
      console.error(err);
    }
  }

  function handleLogout() {
    localStorage.removeItem('saep_token');
    localStorage.removeItem('saep_professor');
    navigate('/login');
  }

  async function handleExcluir(turmaId) {
    const confirmDelete = window.confirm('Deseja realmente excluir esta turma?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/turmas/${turmaId}`, {
        method: 'DELETE',
        headers: authHeader()  // <-- TOKEN OBRIGATÓRIO TAMBÉM!
      });

      const body = await res.json();

      if (!res.ok) {
        alert(body.error || 'Não foi possível excluir');
        return;
      }

      loadTurmas(); // recarrega lista após excluir

    } catch (err) {
      alert('Erro ao excluir turma');
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
              <button className="text-left" onClick={() => navigate('/professor')}>
                <div className="font-semibold">{professor.nome}</div>
                <div className="text-xs text-gray-500">{professor.email}</div>
              </button>
            )}

            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Sair
            </button>
          </div>
        </header>

        <div className="mb-4 flex justify-between items-center">
          <h3 className="font-semibold">Turmas</h3>
          <Link
            to="/turmas/cadastrar"
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Cadastrar Turma
          </Link>
        </div>

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">#</th>
              <th>Nome da turma</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {turmas.length === 0 && (
              <tr>
                <td colSpan="3" className="py-4 text-center text-gray-500">
                  Nenhuma turma encontrada
                </td>
              </tr>
            )}

            {turmas.map((t, idx) => (
              <tr key={t.id} className="border-b">
                <td className="py-2">{idx + 1}</td>
                <td className="py-2">{t.nome}</td>
                <td className="py-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleExcluir(t.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Excluir
                    </button>

                    <Link
                      to={`/turmas/${t.id}/atividades`}
                      className="px-2 py-1 bg-blue-600 text-white rounded"
                    >
                      Visualizar
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
