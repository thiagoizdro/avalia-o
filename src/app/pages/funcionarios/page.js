// pages/funcionarios/page.js

'use client';

import { useState, useEffect } from 'react';
import Form from '../../components/formulario/page';
import Table from '../../components/tabela/page';
import styles from '../../page.module.css';

const FUNCIONARIOS_KEY = 'funcionarios';

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [editingFuncionario, setEditingFuncionario] = useState(null);

  useEffect(() => {
    const storedFuncionarios = JSON.parse(localStorage.getItem(FUNCIONARIOS_KEY)) || [];
    setFuncionarios(storedFuncionarios);
  }, []);

  const addFuncionario = (funcionario) => {
    setFuncionarios([...funcionarios, funcionario]);
    localStorage.setItem(FUNCIONARIOS_KEY, JSON.stringify([...funcionarios, funcionario]));
  };

  const updateFuncionario = (updatedFuncionario) => {
    const updatedFuncionarios = funcionarios.map(funcionario =>
      funcionario.id === updatedFuncionario.id ? updatedFuncionario : funcionario
    );
    setFuncionarios(updatedFuncionarios);
    localStorage.setItem(FUNCIONARIOS_KEY, JSON.stringify(updatedFuncionarios));
    setEditingFuncionario(null);
  };

  const deleteFuncionario = (id) => {
    const updatedFuncionarios = funcionarios.filter(funcionario => funcionario.id !== id);
    setFuncionarios(updatedFuncionarios);
    localStorage.setItem(FUNCIONARIOS_KEY, JSON.stringify(updatedFuncionarios));
  };

  return (
    <div>
      <h2>Cadastro de Funcionários</h2>
      <Form
        onSubmit={editingFuncionario ? updateFuncionario : addFuncionario}
        editingFuncionario={editingFuncionario}
        setEditingFuncionario={setEditingFuncionario}
      />
      <Table
        data={funcionarios}
        onEdit={setEditingFuncionario}
        onDelete={deleteFuncionario}
      />
    </div>
  );
}
