import React, { useState, useEffect } from "react";
import { Button, Form as BootstrapForm, InputGroup } from "react-bootstrap";
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaCarAlt } from "react-icons/fa"; // Alterado para FaCarAlt
import { Formik, Form as FormikForm, Field } from "formik";
import * as Yup from "yup"; // Importando o Yup para validação

const FormularioVenda = ({ onSubmit, editingVenda, setEditingVenda }) => {
  const [clienteNome, setClienteNome] = useState("");
  const [carroModelo, setCarroModelo] = useState("");
  const [dataVenda, setDataVenda] = useState("");
  const [valorVenda, setValorVenda] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [desconto, setDesconto] = useState("");
  const [dataVencimento, setDataVencimento] = useState("");
  const [quantidade, setQuantidade] = useState("");

  useEffect(() => {
    if (editingVenda) {
      setClienteNome(editingVenda.clienteNome);
      setCarroModelo(editingVenda.carroModelo);
      setDataVenda(editingVenda.dataVenda);
      setValorVenda(editingVenda.valorVenda);
      setFormaPagamento(editingVenda.formaPagamento);
      setDesconto(editingVenda.desconto);
      setDataVencimento(editingVenda.dataVencimento);
      setQuantidade(editingVenda.quantidade);
    }
  }, [editingVenda]);

  const initialValues = editingVenda || {
    clienteNome: "",
    carroModelo: "",
    dataVenda: "",
    valorVenda: "",
    formaPagamento: "",
    desconto: "",
    dataVencimento: "",
    quantidade: "",
  };

  const validationSchema = Yup.object({
    clienteNome: Yup.string().required("Nome do cliente é obrigatório"),
    carroModelo: Yup.string().required("Modelo do carro é obrigatório"),
    dataVenda: Yup.date().required("Data da venda é obrigatória"),
    valorVenda: Yup.number()
      .positive("Valor da venda inválido")
      .required("Valor da venda é obrigatório"),
    formaPagamento: Yup.string().required("Forma de pagamento é obrigatória"),
    desconto: Yup.number().min(0, "Desconto não pode ser negativo"),
    dataVencimento: Yup.date().required("Data de vencimento é obrigatória"),
    quantidade: Yup.number()
      .positive("Quantidade inválida")
      .required("Quantidade é obrigatória"),
  });

  const backgroundStyle = {
    backgroundImage:
      'url("https://i.pinimg.com/564x/a8/ca/45/a8ca45f72654b1a43f0584613a598ed7.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    padding: "50px",
  };

  return (
    <div style={backgroundStyle}>
      <h2>{editingVenda ? "Editar Venda" : "Adicionar Venda"}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          resetForm();
          setEditingVenda(null);
        }}
      >
        {({ values, handleChange, errors, touched }) => (
          <FormikForm as={BootstrapForm}>
            <BootstrapForm.Group controlId="formClienteNome">
              <BootstrapForm.Label>Nome do Cliente</BootstrapForm.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaUser />
                </InputGroup.Text>
                <Field
                  as={BootstrapForm.Control}
                  name="clienteNome"
                  placeholder="Digite o nome do cliente"
                  value={values.clienteNome}
                  onChange={handleChange}
                  isInvalid={touched.clienteNome && !!errors.clienteNome}
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {errors.clienteNome}
                </BootstrapForm.Control.Feedback>
              </InputGroup>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formCarroModelo" className="mt-3">
              <BootstrapForm.Label>Modelo do Carro</BootstrapForm.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaCarAlt /> {/* Alterado para FaCarAlt */}
                </InputGroup.Text>
                <Field
                  as={BootstrapForm.Control}
                  name="carroModelo"
                  placeholder="Digite o modelo do carro"
                  value={values.carroModelo}
                  onChange={handleChange}
                  isInvalid={touched.carroModelo && !!errors.carroModelo}
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {errors.carroModelo}
                </BootstrapForm.Control.Feedback>
              </InputGroup>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formDataVenda" className="mt-3">
              <BootstrapForm.Label>Data da Venda</BootstrapForm.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaCalendarAlt />
                </InputGroup.Text>
                <Field
                  as={BootstrapForm.Control}
                  type="date"
                  name="dataVenda"
                  value={values.dataVenda}
                  onChange={handleChange}
                  isInvalid={touched.dataVenda && !!errors.dataVenda}
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {errors.dataVenda}
                </BootstrapForm.Control.Feedback>
              </InputGroup>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formValorVenda" className="mt-3">
              <BootstrapForm.Label>Valor da Venda</BootstrapForm.Label>
              <Field
                as={BootstrapForm.Control}
                type="number"
                name="valorVenda"
                placeholder="Digite o valor da venda"
                value={values.valorVenda}
                onChange={handleChange}
                isInvalid={touched.valorVenda && !!errors.valorVenda}
              />
              <BootstrapForm.Control.Feedback type="invalid">
                {errors.valorVenda}
              </BootstrapForm.Control.Feedback>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formFormaPagamento" className="mt-3">
              <BootstrapForm.Label>Forma de Pagamento</BootstrapForm.Label>
              <Field
                as={BootstrapForm.Control}
                name="formaPagamento"
                placeholder="Digite a forma de pagamento"
                value={values.formaPagamento}
                onChange={handleChange}
                isInvalid={touched.formaPagamento && !!errors.formaPagamento}
              />
              <BootstrapForm.Control.Feedback type="invalid">
                {errors.formaPagamento}
              </BootstrapForm.Control.Feedback>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formDesconto" className="mt-3">
              <BootstrapForm.Label>Desconto</BootstrapForm.Label>
              <Field
                as={BootstrapForm.Control}
                type="number"
                name="desconto"
                placeholder="Digite o desconto, se houver"
                value={values.desconto}
                onChange={handleChange}
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formDataVencimento" className="mt-3">
              <BootstrapForm.Label>Data de Vencimento</BootstrapForm.Label>
              <Field
                as={BootstrapForm.Control}
                type="date"
                name="dataVencimento"
                value={values.dataVencimento}
                onChange={handleChange}
                isInvalid={touched.dataVencimento && !!errors.dataVencimento}
              />
              <BootstrapForm.Control.Feedback type="invalid">
                {errors.dataVencimento}
              </BootstrapForm.Control.Feedback>
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formQuantidade" className="mt-3">
              <BootstrapForm.Label>Quantidade</BootstrapForm.Label>
              <Field
                as={BootstrapForm.Control}
                type="number"
                name="quantidade"
                placeholder="Digite a quantidade"
                value={values.quantidade}
                onChange={handleChange}
                isInvalid={touched.quantidade && !!errors.quantidade}
              />
              <BootstrapForm.Control.Feedback type="invalid">
                {errors.quantidade}
              </BootstrapForm.Control.Feedback>
            </BootstrapForm.Group>

            <br />
            <Button variant="primary" type="submit">
              {editingVenda ? "Salvar alterações" : "Adicionar Venda"}
            </Button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default FormularioVenda;
