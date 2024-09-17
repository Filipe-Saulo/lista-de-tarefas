//acredito que o que eu estou tentando fazer, ele ira me ensinar mais pra frente no curso, então amanha continuar video aulas

import { useState, useEffect } from "react";

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
  //adicionar mais um state para que ele guarde
  const [bkpTarefas, setBkpTarefas] = useState(listaInicial);
  const [sortBy, setSortBy] = useState("crescente");

  //verifica por categoria
  const ordenarListaAlfabetica = () => {
    if (
      sortBy === "trabalho" ||
      sortBy === "estudo" ||
      sortBy === "lazer" ||
      sortBy === "exercicios"
    ) {
      setBkpTarefas(tarefas);
      console.log(tarefas);
      console.log(bkpTarefas);
      const listaFiltrada = bkpTarefas.filter(
        (tarefaAtual) =>
          tarefaAtual.categoria.toLowerCase() === sortBy.toLowerCase()
      );
      setTarefas(listaFiltrada);
      return; // Retorna aqui para evitar continuar a ordenar
    }

    const listaOrdenada = [...tarefas].sort((a, b) => {
      if (sortBy === "crescente") {
        console.log("teste a");
        return a.nomeTarefa.localeCompare(b.nomeTarefa);
      }
      if (sortBy === "decrescente") {
        console.log("teste b");
        return b.nomeTarefa.localeCompare(a.nomeTarefa);
      }
    });

    //envia a lista atualizada
    setTarefas(listaOrdenada);
  };
  //metodo para corrigir o fato de que setSortBy nao é assincrono, para que garante que a funcao ordernar execute apos atualizar o valor de sortBy
  useEffect(() => {
    ordenarListaAlfabetica();
  }, [sortBy]);

  //adicionar
  function adicionarTarefas(novaTarefa) {
    setTarefas((tarefasAtuais) => [...tarefasAtuais, novaTarefa]);
  }

  //deletar
  function deletarTarefa(id) {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.filter((tarefaAtual) => tarefaAtual.id !== id)
    );
  }

  //verificar completo
  function completarTarefa(id) {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.map((tarefaAtual) =>
        tarefaAtual.id === id
          ? { ...tarefaAtual, completado: !tarefaAtual.completado }
          : tarefaAtual
      )
    );
  }

  return (
    <div className="main">
      <Pesquisar
        setSortBy={setSortBy}
        ordenarListaAlfabetica={ordenarListaAlfabetica}
      />
      <ListaTarefas
        tarefas={tarefas}
        onDeletarTarefa={deletarTarefa}
        onCompletarTarefa={completarTarefa}
      />
      <CriarTarefa onAdicionarTarefas={adicionarTarefas} />
    </div>
  );
}

function Pesquisar({ setSortBy }) {
  return (
    <div className="pesquisar">
      <h1>Pesquisar</h1>
      <input placeholder="Digite para pesquisar"></input>
      <h1>Filtrar</h1>
      <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="todas">Todas</option>
        <option value="trabalho">Trabalho</option>
        <option value="estudo">Estudo</option>
        <option value="lazer">Lazer</option>
        <option value="exercicios">Exercicios Fisicos</option>
      </select>
      <div>
        <label>Ordem alfabetica</label>
        <button value="crescente" onClick={(e) => setSortBy(e.target.value)}>
          Crescente
        </button>
        <button value="decrescente" onClick={(e) => setSortBy(e.target.value)}>
          Decrescente
        </button>
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
      <button onClick={() => onDeletarTarefa(tarefa.id)}>Fechar</button>
    </li>
  );
}

function CriarTarefa({ onAdicionarTarefas }) {
  const [nomeTarefa, setNomeTarefa] = useState("");
  const [categoria, setCategoria] = useState("Trabalho");
  const completado = false;

  function adicionarTarefasSubmit(e) {
    e.preventDefault();
    if (!nomeTarefa || !categoria) return;
    const id = crypto.randomUUID();
    const novaTarefa = { id, nomeTarefa, categoria, completado };

    onAdicionarTarefas(novaTarefa);

    setNomeTarefa("");
    setCategoria("Trabalho");
  }

  return (
    <div className="criar-tarefa">
      <form onSubmit={adicionarTarefasSubmit}>
        <h1>Criar Tarefa</h1>
        <input
          value={nomeTarefa}
          onChange={(e) => setNomeTarefa(e.target.value)}
          placeholder="Escreva a tarefa"
        ></input>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option>Trabalho</option>
          <option>Estudo</option>
          <option>Lazer</option>
          <option>Exercícios físicos</option>
        </select>
        <button>Criar Tarefa</button>
      </form>
    </div>
  );
}
