// src/app/page.js

"use client"; // Adiciona a diretiva para tratar este arquivo como um componente do lado do cliente

import { useRouter } from 'next/navigation'; // Importação para o redirecionamento
import styles from './page.module.css'; // Importação do CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function Home() {
  const router = useRouter();

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "1") {
      router.push('/pages/clientes');
    } else if (selectedValue === "2") {
      router.push('/pages/carros');
    } else if (selectedValue === "3") {
      router.push('/pages/vendas');
    } else if (selectedValue === "4") {
      router.push('/pages/funcionarios');
    } else if (selectedValue === "5") {
    router.push('/pages/fornecedores');
   }
   };

  return (
    <div className={styles.page}>
      <h1 className={`text-center mb-4 ${styles.whiteText}`}>Bem-vindo</h1>

      <div className="d-flex justify-content-center">
        <select
          className="form-select form-select-lg w-75" // Aumenta a largura para 75% da tela
          style={{ height: '50px', fontSize: '18px' }} // Aumenta a altura e o tamanho da fonte
          aria-label="Default select example"
          onChange={handleSelectChange}
        >
          <option value="">Paginas</option>
          <option value="1">Clientes</option>
          <option value="2">Carros</option>
          <option value="3">Vendas</option>
          <option value="4">Funcionários</option>
          <option value="5">Fornecedores</option>
        </select>
      </div>
    </div>
  );
}
