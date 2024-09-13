import { useState } from "react";
import { index } from "./index";

const listaInicial = [
  {
    id: 1,
    nomeTarefa: "Reunião de equipe",
    categoria: "Trabalho",
    completado: true,
  },
  {
    id: 2,
    nomeTarefa: "Revisar anotações",
    categoria: "Estudo",
    completado: true,
  },
  {
    id: 3,
    nomeTarefa: "Assistir um filme",
    categoria: "Lazer",
    completado: true,
  },
  {
    id: 4,
    nomeTarefa: "Corrida no parque",
    categoria: "Exercícios físicos",
    completado: true,
  },
];

export default function App() {
  const [tarefas, setTarefas] = useState(listaInicial);
  // const tarefas = listaInicial;

  //adicionar
  function adicionarTarefas(novaTarefa) {
    setTarefas((tarefasAtuais) => [...tarefasAtuais, novaTarefa]); // Corrigido
  }
  //deletar
  function deletarTarefa(id) {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.filter((tarefaAtual) => tarefaAtual.id != id)
    );
  }

  //verificar domingo
  function completarTarefa(id) {
    console.log("chegou");
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.map((tarefaAtual) =>
        tarefaAtual === id
          ? { ...tarefaAtual, completado: !tarefaAtual.completado }
          : tarefaAtual
      )
    );
  }

  return (
    <div className="main">
      <Pesquisar />
      <ListaTarefas
        tarefas={tarefas}
        onDeletarTarefa={deletarTarefa}
        onCompletarTarefa={completarTarefa}
      />
      <CriarTarefa onAdicionarTarefas={adicionarTarefas} />
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

function ListaTarefas({ tarefas, onDeletarTarefa, onCompletarTarefa }) {
  return (
    <div className="lista-tarefas">
      <ul>
        {tarefas.map((tarefa) => (
          <Tarefas
            onCompletarTarefa={onCompletarTarefa}
            onDeletarTarefa={onDeletarTarefa}
            tarefa={tarefa}
            key={tarefa.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Tarefas({ tarefa, onDeletarTarefa, onCompletarTarefa }) {
  return (
    <li>
      <p>{tarefa.nomeTarefa}</p>
      <p>{tarefa.categoria}</p>
      <button onClick={() => onCompletarTarefa(tarefa.id)}>Completar</button>
      <button onClick={() => onDeletarTarefa(tarefa.id)}>fechar</button>
    </li>
  );
}

function CriarTarefa({ onAdicionarTarefas }) {
  const [nomeTarefa, setNomeTarefa] = useState("");
  const [categoria, setCategaoria] = useState("Trabalho");
  const completado = false;

  function adicionarTarefasSubmit(e) {
    e.preventDefault();
    if (!nomeTarefa || !categoria) return;
    const id = crypto.randomUUID();
    const novaTarefa = { id, nomeTarefa, categoria, completado };

    onAdicionarTarefas(novaTarefa);

    setNomeTarefa("");
    setCategaoria("");
  }

  return (
    <div className="criar-tarefa">
      <form onSubmit={adicionarTarefasSubmit}>
        <h1>Criar Tarefa</h1>
        <input
          value={nomeTarefa}
          onChange={(e) => setNomeTarefa(e.target.value)}
          placeholder="escreva a tarefa"
        ></input>
        <select
          value={categoria}
          onChange={(e) => setCategaoria(e.target.value)}
        >
          <option>Trabalho</option>
          <option>Estudo</option>
          <option>Lazer</option>
          <option>Exercicios Fisicos</option>
        </select>
        <button>Criar Tarefa</button>
      </form>
    </div>
  );
}
