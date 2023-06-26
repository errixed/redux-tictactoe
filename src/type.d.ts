interface ITodo {
  id: number
  title: string
  body: string
}

type TodoState = {
  todos: Todo[]
}

type TodoAction = {
  type: string
  todo: Todo
}

type DispatchType = (args: TodoAction) => TodoAction