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
      <ListaTarefas />
      <CriarTarefa />
    </div>
  );
}

function Pesquisar() {
  return (
    <div className="pesquisar">
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

function ListaTarefas() {
  const tarefas = listaInicial;
  return <ul className="lista-tarefas">{<Tarefas tarefas={tarefas} />}</ul>;
}

function Tarefas({ tarefas }) {
  return (
    <li>
      <p>{tarefas.nomeTarefa}</p>
      <p>{tarefas.categoria}</p>
      <button>Completar</button>
      <button>excluir</button>
    </li>
  );
}

function CriarTarefa() {
  return (
    <div className="criar-tarefa">
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
