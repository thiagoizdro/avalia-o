import React from "react";
import { Table, Button } from "react-bootstrap";

const TabelaVendas = ({ vendas, carros, editarVenda, deletarVenda }) => {
  return (
    <div>
      <h3>Vendas Realizadas</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Carro</th>
            <th>Data</th>
            <th>Valor</th>
            <th>Forma de Pagamento</th>
            <th>Desconto</th>
            <th>Quantidade</th> 
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map((venda) => {
            const carro = carros.find(c => c.id === venda.carroId);
            return (
              <tr key={venda.id}>
                <td>{venda.id}</td><td>{venda.clienteNome}</td><td>{carro ? carro.modelo : 'Carro não encontrado'}</td>
                <td>{venda.dataVenda}</td><td>{venda.valorVenda}</td><td>{venda.formaPagamento}</td>
                <td>{venda.desconto}</td><td>{venda.quantidade}</td> {/* Exibindo a quantidade */}
                <td>
                  <Button variant="warning" onClick={() => editarVenda(venda)}>
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => deletarVenda(venda.id)}>
                    Excluir
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default TabelaVendas;
