import React, { useState, useEffect } from "react";
import { Button, Form as BootstrapForm, InputGroup } from "react-bootstrap";
import { Formik, Form as FormikForm, Field } from 'formik';
import { FaCar, FaMoneyBillAlt, FaTag, FaCalendarAlt, FaKey, FaTachometerAlt } from 'react-icons/fa';
import * as Yup from 'yup'; // Importando Yup para validações

const FormCarro = ({ onSubmit, editingCarro, setEditingCarro }) => {
  const [modelo, setModelo] = useState("");
  const [marca, setMarca] = useState("");
  const [ano, setAno] = useState("");
  const [cor, setCor] = useState("");
  const [preco, setPreco] = useState("");
  const [numeroChassi, setNumeroChassi] = useState("");
  const [quilometragem, setQuilometragem] = useState("");
  const [placa, setPlaca] = useState(""); // Novo campo para Placa

  useEffect(() => {
    if (editingCarro) {
      setModelo(editingCarro.modelo);
      setMarca(editingCarro.marca);
      setAno(editingCarro.ano);
      setCor(editingCarro.cor);
      setPreco(editingCarro.preco);
      setNumeroChassi(editingCarro.numeroChassi);
      setQuilometragem(editingCarro.quilometragem);
      setPlaca(editingCarro.placa); // Preenche a placa com os dados de edição
    }
  }, [editingCarro]);

  const backgroundStyle = {
    backgroundImage: 'url("https://i.pinimg.com/564x/a8/ca/45/a8ca45f72654b1a43f0584613a598ed7.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    padding: '50px',
  };

  const initialValues = editingCarro || {
    modelo: '',
    marca: '',
    ano: '',
    cor: '',
    preco: '',
    numeroChassi: '',
    quilometragem: '',
    placa: ''
  };

  // Validação com Yup
  const validationSchema = Yup.object({
    modelo: Yup.string().required('Modelo é obrigatório'),
    marca: Yup.string().required('Marca é obrigatória'),
    ano: Yup.number().min(1900, 'Ano inválido').max(9999, 'Ano inválido').required('Ano é obrigatório'),
    cor: Yup.string().required('Cor é obrigatória'),
    preco: Yup.number().positive('Preço inválido').required('Preço é obrigatório'),
    numeroChassi: Yup.string().required('Número de Chassi é obrigatório'),
    quilometragem: Yup.number().positive('Quilometragem inválida').required('Quilometragem é obrigatória'),
    placa: Yup.string().matches(/^[A-Z]{3}-\d{4}$/, 'Placa inválida').required('Placa é obrigatória'),
  });

  return (
    <div style={backgroundStyle}>
      <h2>{editingCarro ? "Editar Carro" : "Adicionar Carro"}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema} // Usando o schema de validação
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          resetForm();
          setEditingCarro(null);
        }}
      >
        {({ values, handleChange, errors, touched }) => (
          <FormikForm as={BootstrapForm}>
            <BootstrapForm.Group controlId="formModelo">
              <BootstrapForm.Label>Modelo</BootstrapForm.Label>
              <InputGroup>
                <InputGroup.Text><FaCar /></InputGroup.Text>
                <Field
                  as={BootstrapForm.Control}
                  name="modelo"
                  placeholder="Digite o modelo"
                  value={values.modelo}
                  onChange={handleChange}
                  isInvalid={touched.modelo && !!errors.modelo}
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {errors.modelo}
                </BootstrapForm.Control.Feedback>
              </InputGroup>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formMarca" className="mt-3">
              <BootstrapForm.Label>Marca</BootstrapForm.Label>
              <InputGroup>
                <InputGroup.Text><FaTag /></InputGroup.Text>
                <Field
                  as={BootstrapForm.Control}
                  name="marca"
                  placeholder="Digite a marca"
                  value={values.marca}
                  onChange={handleChange}
                  isInvalid={touched.marca && !!errors.marca}
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {errors.marca}
                </BootstrapForm.Control.Feedback>
              </InputGroup>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formAno" className="mt-3">
              <BootstrapForm.Label>Ano</BootstrapForm.Label>
              <InputGroup>
                <InputGroup.Text><FaCalendarAlt /></InputGroup.Text>
                <Field
                  as={BootstrapForm.Control}
                  type="text"
                  name="ano"
                  placeholder="Digite o ano"
                  value={values.ano}
                  onChange={handleChange}
                  isInvalid={touched.ano && !!errors.ano}
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {errors.ano}
                </BootstrapForm.Control.Feedback>
              </InputGroup>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formCor" className="mt-3">
              <BootstrapForm.Label>Cor</BootstrapForm.Label>
              <InputGroup>
                <InputGroup.Text><FaTag /></InputGroup.Text>
                <Field
                  as={BootstrapForm.Control}
                  name="cor"
                  placeholder="Digite a cor"
                  value={values.cor}
                  onChange={handleChange}
                  isInvalid={touched.cor && !!errors.cor}
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {errors.cor}
                </BootstrapForm.Control.Feedback>
              </InputGroup>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formPreco" className="mt-3">
              <BootstrapForm.Label>Preço</BootstrapForm.Label>
              <InputGroup>
                <InputGroup.Text><FaMoneyBillAlt /></InputGroup.Text>
                <Field
                  as={BootstrapForm.Control}
                  type="text"
                  name="preco"
                  placeholder="Digite o preço"
                  value={values.preco}
                  onChange={handleChange}
                  isInvalid={touched.preco && !!errors.preco}
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {errors.preco}
                </BootstrapForm.Control.Feedback>
              </InputGroup>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formNumeroChassi" className="mt-3">
              <BootstrapForm.Label>Número de Chassi</BootstrapForm.Label>
              <Field
                as={BootstrapForm.Control}
                name="numeroChassi"
                placeholder="Digite o número de chassi"
                value={values.numeroChassi}
                onChange={handleChange}
                isInvalid={touched.numeroChassi && !!errors.numeroChassi}
              />
              <BootstrapForm.Control.Feedback type="invalid">
                {errors.numeroChassi}
              </BootstrapForm.Control.Feedback>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formQuilometragem" className="mt-3">
              <BootstrapForm.Label>Quilometragem</BootstrapForm.Label>
              <Field
                as={BootstrapForm.Control}
                type="text"
                name="quilometragem"
                placeholder="Digite a quilometragem"
                value={values.quilometragem}
                onChange={handleChange}
                isInvalid={touched.quilometragem && !!errors.quilometragem}
              />
              <BootstrapForm.Control.Feedback type="invalid">
                {errors.quilometragem}
              </BootstrapForm.Control.Feedback>
            </BootstrapForm.Group>

            {/* Campo de Placa */}
            <BootstrapForm.Group controlId="formPlaca" className="mt-3">
              <BootstrapForm.Label>Placa</BootstrapForm.Label>
              <Field
                as={BootstrapForm.Control}
                type="text"
                name="placa"
                placeholder="Digite a placa (Ex: ABC-1234)"
                value={values.placa}
                onChange={handleChange}
                isInvalid={touched.placa && !!errors.placa}
              />
              <BootstrapForm.Control.Feedback type="invalid">
                {errors.placa}
              </BootstrapForm.Control.Feedback>
            </BootstrapForm.Group>

            <br />
            <Button variant="primary" type="submit">
              {editingCarro ? "Salvar alterações" : "Adicionar Carro"}
            </Button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default FormCarro;
