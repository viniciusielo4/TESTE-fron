import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'


export default function Login() {
const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');
const [erro, setErro] = useState('');
const navigate = useNavigate();


async function handleLogin(e) {
e.preventDefault();
setErro('');
try {
const res = await fetch('/api/login', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ email, senha })
});
if (!res.ok) throw new Error('Credenciais inválidas');
const data = await res.json();
// espera { token, professor: { id, nome, email } }
localStorage.setItem('saep_token', data.token);
localStorage.setItem('saep_professor', JSON.stringify(data.professor));
navigate('/professor');
} catch (err) {
setErro('E-mail ou senha incorretos');
}
}


return (
<div className="min-h-screen flex items-center justify-center bg-gray-50">
<div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
<h1 className="text-2xl font-bold mb-6 text-center">Sistema de Avaliação da Educação Profissional</h1>
<form onSubmit={handleLogin}>
<label className="block mb-2 text-sm font-medium">E-mail</label>
<input value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-2 mb-4 border rounded" type="email" />


<label className="block mb-2 text-sm font-medium">Senha</label>
<input value={senha} onChange={e => setSenha(e.target.value)} required className="w-full p-2 mb-4 border rounded" type="password" />


{erro && <div className="text-red-600 mb-3">{erro}</div>}


<button className="w-full py-2 rounded bg-blue-600 text-white font-semibold">Entrar</button>
</form>
</div>
</div>
);
}