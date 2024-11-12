'use client';

import { useState } from "react"; 
import FormCarro from "../../components/formularioCarro/page"; // Importação do componente FormCarro
import TabelaCarro from "../../components/tabelaCarro/page"; // Importação do componente TabelaCarro
import { Container } from 'react-bootstrap';

const CadastroCarros = () => {
  const [carros, setCarros] = useState([]);
  const [editingCarro, setEditingCarro] = useState(null);

  const adicionarOuAtualizarCarro = (novoCarro) => {
    if (editingCarro) {
      setCarros(carros.map(carro => carro.id === novoCarro.id ? novoCarro : carro));
    } else {
      setCarros([...carros, { ...novoCarro, id: Date.now() }]);
    }
  };

  const deletarCarro = (id) => {
    setCarros(carros.filter(carro => carro.id !== id));
  };

  return (
    <div>
      <FormCarro onSubmit={adicionarOuAtualizarCarro} editingCarro={editingCarro} setEditingCarro={setEditingCarro} />
      <TabelaCarro carros={carros} editarCarro={setEditingCarro} deletarCarro={deletarCarro} />
    </div>
  );
};

export default CadastroCarros;
