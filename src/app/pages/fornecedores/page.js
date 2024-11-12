// pages/fornecedores/page.js

'use client';

import { useState, useEffect } from 'react';
import Form from '../../components/formulario/page';
import Table from '../../components/tabela/page';
import styles from '../../page.module.css';

const FORNECEDORES_KEY = 'fornecedores';

export default function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  const [editingFornecedor, setEditingFornecedor] = useState(null);

  useEffect(() => {
    const storedFornecedores = JSON.parse(localStorage.getItem(FORNECEDORES_KEY)) || [];
    setFornecedores(storedFornecedores);
  }, []);

  const addFornecedor = (fornecedor) => {
    setFornecedores([...fornecedores, fornecedor]);
    localStorage.setItem(FORNECEDORES_KEY, JSON.stringify([...fornecedores, fornecedor]));
  };

  const updateFornecedor = (updatedFornecedor) => {
    const updatedFornecedores = fornecedores.map(fornecedor =>
      fornecedor.id === updatedFornecedor.id ? updatedFornecedor : fornecedor
    );
    setFornecedores(updatedFornecedores);
    localStorage.setItem(FORNECEDORES_KEY, JSON.stringify(updatedFornecedores));
    setEditingFornecedor(null);
  };

  const deleteFornecedor = (id) => {
    const updatedFornecedores = fornecedores.filter(fornecedor => fornecedor.id !== id);
    setFornecedores(updatedFornecedores);
    localStorage.setItem(FORNECEDORES_KEY, JSON.stringify(updatedFornecedores));
  };

  return (
    <div>
      <h2>Cadastro de Fornecedores</h2>
      <Form
        onSubmit={editingFornecedor ? updateFornecedor : addFornecedor}
        editingFornecedor={editingFornecedor}
        setEditingFornecedor={setEditingFornecedor}
      />
      <Table
        data={fornecedores}
        onEdit={setEditingFornecedor}
        onDelete={deleteFornecedor}
      />
    </div>
  );
}
