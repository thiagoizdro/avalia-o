'use client';

import { useState, useEffect } from 'react';
import FormularioVenda from '../../components/formularioVenda/page';
import TabelaVenda from '../../components/tabelaVenda/page';
import styles from '../../page.module.css';
import { Container } from 'react-bootstrap';

const CadastroVendas = () => {
  const [vendas, setVendas] = useState([]);
  const [carros, setCarros] = useState([]);  // Carros cadastrados
  const [editingVenda, setEditingVenda] = useState(null);

  useEffect(() => {
    // Aqui você poderia buscar os carros de uma API, por exemplo
    setCarros([
      { id: 1, modelo: 'Fusca', marca: 'Volkswagen' },
      { id: 2, modelo: 'Civic', marca: 'Honda' },
      // Adicione mais carros conforme necessário
    ]);
  }, []);

  const adicionarOuAtualizarVenda = (novaVenda) => {
    if (editingVenda) {
      setVendas(vendas.map(venda => venda.id === novaVenda.id ? novaVenda : venda));
    } else {
      setVendas([...vendas, { ...novaVenda, id: Date.now() }]);
    }
  };

  const deletarVenda = (id) => {
    setVendas(vendas.filter(venda => venda.id !== id));
  };

  return (
    <div>
      <FormularioVenda 
        onSubmit={adicionarOuAtualizarVenda} 
        editingVenda={editingVenda} 
        setEditingVenda={setEditingVenda} 
      />
      <TabelaVenda 
        vendas={vendas} 
        carros={carros} 
        editarVenda={setEditingVenda} 
        deletarVenda={deletarVenda} 
      />
    </div>
  );
};

export default CadastroVendas;
