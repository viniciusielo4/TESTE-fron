import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import Atividadesturma from "./pages/Atividadesturma";
import Cadastroativ from "./pages/Cadastroativ";
import Cadastroturma from "./pages/Cadastroturma";
import Login from "./pages/Login";
import Professor from "./pages/Professor";

function App() {
  return (
    <Router>
      <Routes>
        {/* Tela de Login */}
        <Route path="/" element={<Login />} />

        {/* Tela principal do professor */}
        <Route path="/professor" element={<Professor />} />

        {/* Cadastro de turma */}
        <Route path="/cadastroturma" element={<Cadastroturma />} />

        {/* Tela de atividades da turma */}
        <Route path="/atividades/:id" element={<Atividadesturma />} />

        {/* Cadastro de atividade */}
        <Route path="/cadastroatividade/:id" element={<Cadastroativ />} />
      </Routes>
    </Router>
  );
}

export default App;
