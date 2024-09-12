import { useState } from "react";
import { index } from "./index";

const listaInicial = [
  {
    id: 1,
    nomeTarefa: "Reunião de equipe",
    categoria: "Trabalho",
  },
  {
    id: 2,
    nomeTarefa: "Revisar anotações",
    categoria: "Estudo",
  },
  {
    id: 3,
    nomeTarefa: "Assistir um filme",
    categoria: "Lazer",
  },
  {
    id: 4,
    nomeTarefa: "Corrida no parque",
    categoria: "Exercícios físicos",
  },
];

export default function App() {
  return (
    <div className="main">
      <Pesquisar />
      <CriarTarefa />
    </div>
  );
}

function ListaTarefas() {
  return <ul></ul>;
}

function Pesquisar() {
  return (
    <div>
      <div>
        <h1>Pesquisar</h1>
        <input placeholder="Digite para pesquisar"></input>
      </div>
      <div>
        <div>
          <h1>Filtrar</h1>
          <label>status:</label>
          <select>
            <option>Todas</option>
            <option>Trabalho</option>
            <option>Estudo</option>
            <option>Lazer</option>
            <option>Exercicios Fisicos</option>
          </select>
        </div>

        <div>
          <label>Ordem alfabetica</label>
          <button>crescente</button>
          <button>Decrescente</button>
        </div>
      </div>
    </div>
  );
}

function ResultadoLista() {}

function CriarTarefa() {
  return (
    <div>
      <h1>Criar Tarefa</h1>
      <input placeholder="escreva a tarefa"></input>
      <select>
        <option>Trabalho</option>
        <option>Estudo</option>
        <option>Lazer</option>
        <option>Exercicios Fisicos</option>
      </select>
    </div>
  );
}
