const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('todolist toArray is equal to list.todos', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test("todolist first() returns todo1", () => {
    expect(list.first()).toEqual(todo1);
  });

  test("todolist last() returns todo3", () => {
    expect(list.last()).toEqual(todo3);
  });

  test('todolist shift() removes and returns first todo', () => {
    expect(list.shift()).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('todolist pop() removes and returns last todo', () => {
    expect(list.pop()).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('todolist isDone() returns true when all todos are done, false otherwise', () => {
    expect(list.isDone()).toBe(false);
    list.markAllDone();
    expect(list.isDone()).toBe(true);
  });

  test('todolist add() throws error when non todo item is added', () => {
    expect(() => list.add(1)).toThrow(TypeError);
    expect(() => list.add('hi')).toThrow(TypeError);
    expect(() => list.add(new TodoList())).toThrow(TypeError);
  });

  test('todolist itemAt(givenIndex) to return the correct todo, or throw a Reference Error', () => {
    expect(list.itemAt(0)).toEqual(todo1);
    expect(list.itemAt(1)).toEqual(todo2);
    expect(list.itemAt(2)).toEqual(todo3);
    expect(() => list.itemAt(3).toThrow(RangeError));
  });

  test('todolist markDoneAt(givenIndex) to mark done and to throw a Reference error if no item at given index', () => {
    list.markDoneAt(0);
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(false);
    expect(() => list.markDoneAt(5)).toThrow(ReferenceError);
  });

  test("todolist markAllDone() marks all todos done", () => {
    list.markAllDone();
    expect([todo1, todo2, todo3].every(todo => todo.isDone())).toBe(true);
  });

  test('todolist removeAt(givenIndex) removes correct item or throws a ReferenceError', () => {
    expect(list.removeAt(1)).toEqual([todo2]);
    expect(list.toArray()).toEqual([todo1, todo3]);
    expect(() => list.removeAt(7)).toThrow(ReferenceError);
  });

  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;
    
    expect(list.toString()).toBe(string);
  });

  test('todolist toString() returns string of list when a todo is marked done', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[X] Clean room
[ ] Go to the gym`;

    list.markDoneAt(1);
    expect(list.toString()).toBe(string);
  });

  test('todolist toString() returns correct string when the entire list is marked done', () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

    list.markAllDone();
    expect(list.toString()).toBe(string);
  });

  test('todolist forEach() iterates over each item on the list', () => {
    let iteratedTodos = [];
    list.forEach(todo => iteratedTodos.push(todo));
    expect(iteratedTodos).toEqual([todo1, todo2, todo3]);
  });

  test('todolist filter() returns a new instance of the TodoList class', () => {
    let newList = list.filter(todo => !(todo.isDone()));

    expect(newList instanceof TodoList).toBe(true);
    expect(newList.toString()).toBe(list.toString());
  });

  test('todo markUndone() marks a todo undone', () => {
    list.markDoneAt(0);
    expect(todo1.isDone()).toBe(true);
    list.markUndoneAt(0);
    expect(todo1.isDone()).toBe(false);
  });

  test('todo getTitle() returns the title of a todo', () => {
    expect(todo1.getTitle()).toBe("Buy milk");
  });

  test('todolist findByTitle() finds the correct todo', () => {
    expect(list.findByTitle('Clean room')).toEqual(todo2);
  });

  test('todolist allDone() returns a new list with all of the completed todos', () => {
    list.markDoneAt(1);
    list.markDoneAt(2);
    let completed = list.allDone();
    expect(completed.toArray()).toEqual([todo2, todo3]);
  });

  test("todolist allNotDone() returns a new list with all uncompleted todos", () => {
    list.markDoneAt(2);
    let uncompleted = list.allNotDone();
    expect(uncompleted.toArray()).toEqual([todo1, todo2]);
  });

  test("todolist markDone(givenTite) correctly marks the todo as done", () => {
    list.markDone("Buy milk");
    expect(todo1.isDone()).toBe(true);
  });

  test("todolist markAllUndone() marks all todos undone", () => {
    list.markAllDone();
    expect(list.filter(todo => !(todo.isDone())).toArray().length).toBe(0);
    list.markAllUndone();
    expect(list.filter(todo => !(todo.isDone())).toArray().length).toBe(3);
  }); 
});