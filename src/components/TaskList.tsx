import { useState, KeyboardEvent } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [id, setNewId] = useState(0);

  // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
  function handleCreateNewTask() {
    // Se o input estiver vazio, não será adicionada uma nova tarefa na lista.
    if (!newTaskTitle) return;

    // Adiciona um novo Id.
    setNewId(id + 1);

    // Pega todas as tarefas já existentes e inclui mais uma tarefa na lista.
    setTasks([
      ...tasks,
      { id: id, title: newTaskTitle, isComplete: false }
    ]);

    // Setando um valor de string vazia de título para limpar o input.
    setNewTaskTitle('');
  }

  // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID.
  function handleToggleTaskCompletion(id: number) {
    // Buscando o index da tarefa de acordo com o ID
    const taskIndex = tasks.findIndex(task => task.id === id)

    // Criando uma cópia da lista de tarefas existente
    const copyTasks = [...tasks]

    // Alterando se a tarefa já foi concluída ou não
    copyTasks[taskIndex].isComplete = !copyTasks[taskIndex].isComplete

    // Retornando a lista de tarefas com a alteração das tarefas que já foram realizadas ou não
    setTasks(copyTasks)
  }

  // Remova uma task da listagem pelo ID.
  function handleRemoveTask(id: number) {
    // Buscando o index da tarefa de acordo com o ID.
    const taskIndex = tasks.findIndex(task => task.id === id)

    // Criando uma cópia da lista de tarefas existente.
    const copyTasks = [...tasks]

    // Removendo a tarefa desejada.
    copyTasks.splice(taskIndex, 1)

    // Retornando a lista de tarefa atualizada depois da remoção.
    setTasks(copyTasks)
  }

  // Adiciona tarefas na lista quando pressionada a tecla Enter.
  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      handleCreateNewTask()
    }
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
            onKeyPress={handleKeyPress}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}