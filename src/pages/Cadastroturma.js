import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css"

export default function Cadastroturma() {
const [nome, setNome] = useState('');
const [professor, setProfessor] = useState(null);
const navigate = useNavigate();


useEffect(() => {
const p = localStorage.getItem('saep_professor');
if (!p) navigate('/login');
else setProfessor(JSON.parse(p));
}, [navigate]);


async function handleCadastrar(e) {
e.preventDefault();
if (!nome.trim()) return alert('Informe o nome da turma');
try {
const res = await fetch('/api/turmas', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ nome, professorId: professor.id })
});
if (!res.ok) throw new Error('Erro ao cadastrar');
alert('Turma cadastrada com sucesso');
navigate('/professor');
} catch (err) {
alert('Erro ao cadastrar turma');
}
}


return (
<div className="min-h-screen flex items-center justify-center bg-gray-50">
<div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
<h2 className="text-xl font-semibold mb-4">Cadastrar Turma</h2>
<form onSubmit={handleCadastrar}>
<label className="block text-sm mb-2">Nome da Turma</label>
<input value={nome} onChange={e => setNome(e.target.value)} className="w-full p-2 border rounded mb-4" />
<div className="flex justify-between">
<button type="button" onClick={() => navigate('/professor')} className="px-3 py-1 border rounded">Voltar</button>
<button className="px-3 py-1 bg-green-600 text-white rounded">Cadastrar</button>
</div>
</form>
</div>
</div>
);
}