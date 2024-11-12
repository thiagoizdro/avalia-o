'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Table from '../../components/tabela/page';
import styles from '../../page.module.css';

const CLIENTES_KEY = 'clientes';

// Carregar o componente Form dinamicamente e desativar a renderização do lado do servidor
const Form = dynamic(() => import('../../components/formulario/page'), { ssr: false });

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [editingCliente, setEditingCliente] = useState(null);

  useEffect(() => {
    const storedClientes = JSON.parse(localStorage.getItem(CLIENTES_KEY)) || [];
    setClientes(storedClientes);
  }, []);

  const addCliente = (cliente) => {
    setClientes([...clientes, cliente]);
    localStorage.setItem(CLIENTES_KEY, JSON.stringify([...clientes, cliente]));
  };

  const updateCliente = (updatedCliente) => {
    const updatedClientes = clientes.map(cliente =>
      cliente.id === updatedCliente.id ? updatedCliente : cliente
    );
    setClientes(updatedClientes);
    localStorage.setItem(CLIENTES_KEY, JSON.stringify(updatedClientes));
    setEditingCliente(null);
  };

  const deleteCliente = (id) => {
    const updatedClientes = clientes.filter(cliente => cliente.id !== id);
    setClientes(updatedClientes);
    localStorage.setItem(CLIENTES_KEY, JSON.stringify(updatedClientes));
  };

  return (
    <div suppressHydrationWarning={true}>
      <h2>Cadastro de Clientes</h2>
      <Form
        onSubmit={editingCliente ? updateCliente : addCliente}
        editingCliente={editingCliente}
        setEditingCliente={setEditingCliente}
      />
      <Table
        data={clientes}
        onEdit={setEditingCliente}
        onDelete={deleteCliente}
      />
    </div>
  );
}
