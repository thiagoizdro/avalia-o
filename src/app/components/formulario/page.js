import { useState, useEffect } from 'react';
import { Form as BootstrapForm, Button, InputGroup } from 'react-bootstrap';
import { Formik, Form as FormikForm, Field } from 'formik';
import * as Yup from 'yup'; // Importando o Yup
import apiLocalidades from '../../../services/apiLocalidade';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt } from 'react-icons/fa';

export default function Form({ onSubmit, editingCliente, setEditingCliente }) {
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);

  useEffect(() => {
    async function fetchEstados() {
      try {
        const response = await apiLocalidades.get('/estados');
        setEstados(response.data);
      } catch (error) {
        console.error('Erro ao buscar estados:', error);
      }
    }
    fetchEstados();
  }, []);

  const fetchCidades = async (estadoSigla) => {
    if (estadoSigla) {
      try {
        const response = await apiLocalidades.get(`/estados/${estadoSigla}/municipios`);
        setCidades(response.data);
      } catch (error) {
        console.error('Erro ao buscar cidades:', error);
      }
    } else {
      setCidades([]);
    }
  };

  const initialValues = editingCliente || {
    id: '',
    nomeCompleto: '',
    email: '',
    telefone: '',
    documento: '',
    endereco: '',
    cidade: '',
    estado: '',
    dataNascimento: '',
  };

  // Schema de validação com Yup
  const validationSchema = Yup.object({
    nomeCompleto: Yup.string().required('Nome Completo é obrigatório'),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    telefone: Yup.string().required('Telefone é obrigatório'),
    documento: Yup.string().required('Documento é obrigatório'),
    endereco: Yup.string().required('Endereço é obrigatório'),
    cidade: Yup.string().required('Cidade é obrigatória'),
    estado: Yup.string().required('Estado é obrigatório'),
    dataNascimento: Yup.date().required('Data de Nascimento é obrigatória'),
  });

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

  return (
    <div style={backgroundStyle}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema} // Usando o schema de validação
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          resetForm();
          setEditingCliente(null);
        }}
      >
        {({ values, handleChange, errors, touched }) => (
          <FormikForm as={BootstrapForm}>
            <BootstrapForm.Group controlId="nomeCompleto">
              <BootstrapForm.Label>Nome Completo</BootstrapForm.Label>
              <InputGroup>
                <InputGroup.Text><FaUser /></InputGroup.Text>
                <Field
                  as={BootstrapForm.Control}
                  name="nomeCompleto"
                  placeholder="Nome Completo"
                  value={values.nomeCompleto}
                  onChange={handleChange}
                  isInvalid={touched.nomeCompleto && !!errors.nomeCompleto} // Exibe o erro se o campo foi tocado e há erro
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {errors.nomeCompleto}
                </BootstrapForm.Control.Feedback>
              </InputGroup>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="email" className="mt-3">
              <BootstrapForm.Label>Endereço de Email</BootstrapForm.Label>
              <InputGroup>
                <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                <Field
                  as={BootstrapForm.Control}
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={touched.email && !!errors.email}
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {errors.email}
                </BootstrapForm.Control.Feedback>
              </InputGroup>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="telefone" className="mt-3">
              <BootstrapForm.Label>Número de Telefone</BootstrapForm.Label>
              <InputGroup>
                <InputGroup.Text><FaPhone /></InputGroup.Text>
                <Field
                  as={BootstrapForm.Control}
                  name="telefone"
                  placeholder="Telefone"
                  value={values.telefone}
                  onChange={handleChange}
                  isInvalid={touched.telefone && !!errors.telefone}
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {errors.telefone}
                </BootstrapForm.Control.Feedback>
              </InputGroup>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="documento" className="mt-3">
              <BootstrapForm.Label>Documento (CPF/CNPJ)</BootstrapForm.Label>
              <Field
                as={BootstrapForm.Control}
                name="documento"
                placeholder="Documento"
                value={values.documento}
                onChange={handleChange}
                isInvalid={touched.documento && !!errors.documento}
              />
              <BootstrapForm.Control.Feedback type="invalid">
                {errors.documento}
              </BootstrapForm.Control.Feedback>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="dataNascimento" className="mt-3">
              <BootstrapForm.Label>Data de Nascimento</BootstrapForm.Label>
              <InputGroup>
                <InputGroup.Text><FaCalendarAlt /></InputGroup.Text>
                <Field
                  as={BootstrapForm.Control}
                  type="date"
                  name="dataNascimento"
                  value={values.dataNascimento}
                  onChange={handleChange}
                  isInvalid={touched.dataNascimento && !!errors.dataNascimento}
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {errors.dataNascimento}
                </BootstrapForm.Control.Feedback>
              </InputGroup>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="endereco" className="mt-3">
              <BootstrapForm.Label>Endereço</BootstrapForm.Label>
              <Field
                as={BootstrapForm.Control}
                name="endereco"
                placeholder="Endereço"
                value={values.endereco}
                onChange={handleChange}
                isInvalid={touched.endereco && !!errors.endereco}
              />
              <BootstrapForm.Control.Feedback type="invalid">
                {errors.endereco}
              </BootstrapForm.Control.Feedback>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="estado" className="mt-3">
              <BootstrapForm.Label>Estado</BootstrapForm.Label>
              <Field
                as={BootstrapForm.Select}
                name="estado"
                value={values.estado}
                onChange={(e) => {
                  handleChange(e);
                  fetchCidades(e.target.value);
                }}
                isInvalid={touched.estado && !!errors.estado}
              >
                <option value="">Selecione um Estado</option>
                {estados.map((estado) => (
                  <option key={estado.id} value={estado.sigla}>
                    {estado.nome}
                  </option>
                ))}
              </Field>
              <BootstrapForm.Control.Feedback type="invalid">
                {errors.estado}
              </BootstrapForm.Control.Feedback>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="cidade" className="mt-3">
              <BootstrapForm.Label>Cidade</BootstrapForm.Label>
              <Field
                as={BootstrapForm.Select}
                name="cidade"
                value={values.cidade}
                onChange={handleChange}
                disabled={!values.estado}
                isInvalid={touched.cidade && !!errors.cidade}
              >
                <option value="">Selecione uma Cidade</option>
                {cidades.map((cidade) => (
                  <option key={cidade.id} value={cidade.nome}>
                    {cidade.nome}
                  </option>
                ))}
              </Field>
              <BootstrapForm.Control.Feedback type="invalid">
                {errors.cidade}
              </BootstrapForm.Control.Feedback>
            </BootstrapForm.Group>

            <br />
            <Button type="submit" variant="primary" className="mt-3">
              {editingCliente ? 'Atualizar' : 'Cadastrar'}
            </Button>
            {editingCliente && (
              <Button
                variant="secondary"
                onClick={() => setEditingCliente(null)}
                className="mt-3 ms-2"
              >
                Cancelar
              </Button>
            )}
          </FormikForm>
        )}
      </Formik>
    </div>
  );
}
