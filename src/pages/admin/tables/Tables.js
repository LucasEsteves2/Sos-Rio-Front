import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { api } from "../../../services/api";
// components
import PageTitle from "../../../components/admin/PageTitle/PageTitle";
import Widget from "../../../components/admin/Widget/Widget";
import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";


const useStyles = makeStyles((theme) => ({
  tableOverflow: {
    overflow: "auto",
  },
}));

export default function Tables() {
  const datatableData = [];
  const datatableDataSirene = [];
  const datatableDataRisco = [];
  const datatableDataPonto = [];

  const [Usuarios, setUsuarios] = useState();
  const [sirene, setSirene] = useState();
  const [risco, setRisco] = useState();
  const [ponto, setPonto] = useState();


  const classes = useStyles();
  useEffect(() => {
     getData();
     getSirene()
     getZona()
     getPonto()
  }, []);

  async function getData() {
    var { data } = await api.get("/usuarios");
    console.log(data);

    data.map((data) => {
      console.log(data.name);
      datatableData.push([data.id, data.nome, data.email, data.telefone]);
      setUsuarios(...datatableData);

    });
    setUsuarios(datatableData);

  }
  async function getSirene() {
    var { data } = await api.get("/sirenes?Endereco=true");
    console.log(data);
    console.log(data.items);

    var sirenes = data.items;

    sirenes.map((data) => {
      console.log(data);
      datatableDataSirene.push([data.id,data.nome, data.descricao, data.coordenadas.alcance, data.coordenadas.endereco?.rua]);
      setSirene(...datatableDataSirene);

    });
    setSirene(datatableDataSirene);

  }

  async function getZona() {
    var { data } = await api.get("/riscos?Endereco=true");
    console.log(data);

    var risco = data.items;
    risco.map((data) => {
      console.log(data);
      datatableDataRisco.push([data.id,data.nome, data.descricao, data.coordenadas.alcance, data.coordenadas.endereco.rua, data.coordenadas.endereco.bairro,data.coordenadas?.endereco?.cep]);
      setRisco(...datatableDataRisco);

    });
    setRisco(datatableDataRisco);

  }


  async function getPonto() {
    var { data } = await api.get("/apoios?Endereco=true");
    console.log(data);
    var apoios = data.items;
    apoios.map((data) => {
      console.log(data);
      datatableDataPonto.push([data.id,data.nome, data.descricao, data.coordenadas.endereco?.rua, data.coordenadas.endereco?.bairro,data.coordenadas.endereco.cep,data.email,data.telefone,data.responsavel]);
      setPonto(...datatableDataPonto);

    });
    setPonto(datatableDataPonto);

  }

  
  return (
    <>
      <PageTitle title="Tabelas" />
      <Grid container spacing={4}>
        {/* <Grid item xs={12}>
          <MUIDataTable
            title="Lista de Usuários"
            data={Usuarios}
            columns={["ID", "Nome", "E-mail", "Telefone"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid> */}
        <Grid item xs={12}>
          <MUIDataTable
            title="Sirenes"
            data={sirene}
            columns={["ID","Nome", "Descrição", "Alcance", "Logradouro"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <MUIDataTable
            title="Zonas de Risco"
            data={risco}
            columns={["ID","Nome", "Descrição", "Alcance", "Rua","Bairro","Cep"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <MUIDataTable
            title="Pontos de Apoio"
            data={ponto}
            columns={["ID","Nome", "Descrição","Rua","Bairro","Cep","Email","WhatsApp","Responsável"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}