import "./style.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../services/api/index";
import { useNavigate } from "react-router-dom";
import { useAcesso } from "../../context/AdminContext";
import { useUsuario } from "../../context/UsuarioContext";
function FormularioUsuario() {
  const navigate = useNavigate();
  const { user, setUser } = useUsuario();

  const { acesso, setAcesso } = useAcesso();
  async function CadastrarUsuario() {
    try {
      const response = await api.post(`/usuarios`, {
        cep: formik.values.cep,
        cpf: formik.values.cpf,
        email: formik.values.email,
        logradouro: formik.values.logradouro,
        name: formik.values.nome,
        number: 0,
        senha: formik.values.senha,
        tellphone: formik.values.telefone,
      });

      //pegando token e autenticando usuario que acabou de ser cadastrado
      logar();
    } catch {}
  }

  async function logar() {
    try {
      var { headers } = await api.post(`/login`, {
        email: formik.values.email,
        senha: formik.values.senha,
      });
      console.log(headers.authorization);
      localStorage.setItem("token", headers.authorization);
      getUsuario();
    } catch {
      alert("Falha ao se comunicar com o servidor!!");
    }
  }

  async function getUsuario() {
    try {
      var { data } = await api.get(
        `/usuarios/email?value=${formik.values.email}`
      );

      console.log(data);

      localStorage.setItem("usuario", JSON.stringify(data));
      localStorage.setItem("acesso", data.acess);
      console.log("Voce se conectou na conta de Cliente");
      setUser(data);
      setAcesso(data.acess);
      alert("Cadastro realizado com sucesso!")
      navigate("/");
    } catch {
      alert("Falha ao comunicar com o servidor");
    }
  }

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  });

  Yup.addMethod(Yup.string, "validaSenhasIguais", verificaIgualdadeSenhas);
  function verificaIgualdadeSenhas(mensagem) {
    return this.test("validaSenhasIguais", mensagem, function (valor) {
      const { path, createError } = this;

      if (formik.values.senha !== formik.values.confirmar_senha) {
        return createError({
          path,
          message: mensagem ?? "Senhas não coincidem",
        });
      }
      return true;
    });
  }
  const [informacoes, setInformacoes] = useState({
    cep: "",
    logradouro: "",
    complemento: "",
    bairro: "",
    localidade: "",
    uf: "",
    ibge: "",
    gia: "",
  });

  const formik = useFormik({
    initialValues: {
      nome: "",
      cpf: "",
      email: "",
      cep: "",
      logradouro: "",
      bairro: "",
      numero: "",
      telefone: "",
      senha: "",
      confirmar_senha: "",
    },
    validationSchema: Yup.object({
      nome: Yup.string()
        .min(4, "Nome deve conter mais de 4 caracteres")
        .max(50, "Nome deve conter menos de 50 caracteres")
        .required("*Campo obrigatorio")
        .matches(
          /^[\p{Script=Latin}]/u,
          "*Nome deve conter caracteres do alfabeto latino"
        )
        .matches(/^[\p{Script=Latin} ]+$/u, "*Nome deve conter sobrenome")
        .matches(/[ ][\p{Script=Latin}]+/gu, "*Nome deve conter sobrenome   "),
      cpf: Yup.string()
        .min(11, "*CPF inválido")
        .max(11, "*CPF inválido")
        .matches(/^\d+$/, "*CPF inválido")
        .required("*Campo obrigatorio"),
      email: Yup.string()
        .email("*E-mail inválido")
        .required("*E-mail obrigatorio"),
      cep: Yup.string().required("*Cep obrigatorio"),
      logradouro: Yup.string().required(""),
      bairro: Yup.string().required(""),
      numero: Yup.string().required(""),
      telefone: Yup.string()
        .min(10, "*Numero inválido")
        .max(11, "*Numero inválido")
        .matches(/^\d+$/, "*Numero inválido")
        .required("*Campo obrigatório"),
      senha: Yup.string()

        .min(8, "*Senha deve conter ao meno 8 digitos")
        .max(16, "*Senha deve conter menos de 16 digitos")
        .required("*Campo obrigatório"),

      confirmar_senha: Yup.string()
        .validaSenhasIguais()
        .min(8, "*Senha deve conter ao meno 8 digitos")
        .max(16, "*Senha deve conter menos de 16 digitos")
        .required("*Campo obrigatório"),
    }),
    onSubmit: () => {
      CadastrarUsuario();
    },
  });
  async function getInformacoes() {
    if (formik.values.cep === undefined || formik.values.cep.length !== 8) {
      return;
    }
    console.log("chegou aqui");
    try {
      const response = await axios.get(
        "http://viacep.com.br/ws/" + formik.values.cep + "/json/"
      );
      if (response?.data?.erro) {
        alert("CEP não encontrado");
      }
      setInformacoes(response.data);
      return response.data;
    } catch (e) {
      console.log(2);
    }
  }

  useEffect(async () => {
    console.log(formik.values.cep);
    let informacoesTemp = await getInformacoes();

    formik.values.logradouro = informacoesTemp?.logradouro ?? "";
    formik.values.bairro = informacoesTemp?.bairro ?? "";
    console.log(informacoesTemp);
  }, [formik.values.cep]);

  return (
    <div className="cadastroUsuarioContainer">
      <div className="segundoContainer">
        <h1 className="titulo">Cadastro Usuário</h1>
        <form className="inputContainer" onSubmit={formik.handleSubmit}>
          <label className="label">
            Nome
            <input
              type="text"
              className="input"
              name="nome"
              value={formik.values.nome}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>{" "}
            {formik.errors.nome && formik.touched.nome ? (
              <div className="erros">{formik.errors.nome}</div>
            ) : null}
          </label>

          <label className="label">
            CPF
            <input
              type="text"
              maxLength="11"
              name="cpf"
              keyboardType="numeric"
              className="input"
              value={formik.values.cpf}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
            {formik.errors.cpf && formik.touched.cpf ? (
              <div className="erros">{formik.errors.cpf}</div>
            ) : null}
          </label>
          <label className="label">
            E-mail
            <input
              type="email"
              className="input"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
            {formik.errors.email && formik.touched.email ? (
              <div className="erros">{formik.errors.email}</div>
            ) : null}
          </label>
          <label className="label">
            Cep
            <input
              id="cep"
              type="text"
              className="input"
              name="cep"
              value={formik.values.cep}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
            {formik.errors.cep && formik.touched.cep ? (
              <div className="erros">{formik.errors.endereco}</div>
            ) : null}
          </label>
          <label className="label">
            Logradouro
            <input
              type="text"
              className="input"
              name="logradouro"
              value={formik.values.logradouro}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
          </label>
          <label className="label">
            Bairro
            <input
              type="text"
              className="input"
              name="bairro"
              value={formik.values.bairro}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
          </label>
          <label className="label">
            Numero
            <input
              type="number"
              maxLength="11"
              className="input"
              name="numero"
              value={formik.values.numero}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
          </label>
          <label className="label">
            Telefone
            <input
              type="tel"
              maxLength="11"
              className="input"
              name="telefone"
              value={formik.values.telefone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
            {formik.errors.telefone && formik.touched.telefone ? (
              <div className="erros">{formik.errors.telefone}</div>
            ) : null}
          </label>
          <label className="label">
            Senha
            <input
              type="password"
              maxLength="16"
              minLength="8"
              className="input"
              name="senha"
              value={formik.values.senha}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
            {formik.errors.senha && formik.touched.senha ? (
              <div className="erros">{formik.errors.senha}</div>
            ) : null}
          </label>

          <label className="label">
            Confirmar senha
            <input
              type="password"
              id="passaword"
              maxLength="16"
              minLength="8"
              className="input"
              name="confirmar_senha"
              value={formik.values.confirmar_senha}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
            {formik.errors.confirmar_senha && formik.touched.confirmar_senha ? (
              <div className="erros">{formik.errors.confirmar_senha}</div>
            ) : null}
          </label>

          <div className="buttonContainer">
            <button className="button" type="submit">
              FINALIZAR
            </button>
            <button
              className="button"
              type="reset"
              onClick={() => {
                navigate("/");
              }}
            >
              CANCELAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioUsuario;
