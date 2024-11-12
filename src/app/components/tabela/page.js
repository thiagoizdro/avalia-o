import { Table, Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function TableClientes({ data, onEdit, onDelete }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nome Completo</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>Documento</th>
          <th>Data de Nascimento</th> 
          <th>Endereço</th>
          <th>Cidade</th>
          <th>Estado</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map((cliente) => (
          <tr key={cliente.id}>
            <td>{cliente.nomeCompleto}</td><td>{cliente.email}</td><td>{cliente.telefone}</td>
            <td>{cliente.documento}</td><td>{cliente.dataNascimento}</td>
            <td>{cliente.endereco}</td><td>{cliente.cidade}</td><td>{cliente.estado}</td>
            <td>
              <Button variant="warning" onClick={() => onEdit(cliente)} className="me-2">
                <FaEdit /> Editar
              </Button>
              <Button variant="danger" onClick={() => onDelete(cliente.id)}>
                <FaTrash /> Excluir
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
