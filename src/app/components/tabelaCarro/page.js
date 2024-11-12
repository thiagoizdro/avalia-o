import React from "react";
import { Table, Button } from "react-bootstrap";

const TabelaCarros = ({ carros, editarCarro, deletarCarro }) => {
  return (
    <div>
      <h3>Carros Cadastrados</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Modelo</th>
            <th>Marca</th>
            <th>Ano</th>
            <th>Cor</th>
            <th>Preço</th>
            <th>Placa</th> 
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {carros.map((carro) => (
            <tr key={carro.id}>
              <td>{carro.id}</td><td>{carro.modelo}</td><td>{carro.marca}</td><td>{carro.ano}</td>
              <td>{carro.cor}</td><td>{carro.preco}</td><td>{carro.placa}</td> {/* Exibindo a placa */}
              <td>
                <Button variant="warning" onClick={() => editarCarro(carro)}>
                  Editar
                </Button>
                <Button variant="danger" onClick={() => deletarCarro(carro.id)}>
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TabelaCarros;
