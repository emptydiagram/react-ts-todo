import React from 'react';
import './App.css';
import Clock from './Clock';
import TodoList from './TodoList';
// TODO: not sure how to export default TodoProps. it doesnt work?
import { TodoProps } from './TodoProps';

//const App: React.FC = () => {
class App extends React.Component<{}, TodoProps> {
  constructor(props: {}) {
    super(props);
    this.state = {
      name: "test-list-1",
      items: ["take a shower", "take out the trash", "C"],
      completed: [false, true, false],
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>hello, react + typescript</p>
        </header>
        <div>
          <Clock />
          <TodoList
            name={this.state.name}
            items={this.state.items}
            completed={this.state.completed}
          />
        </div>
      </div>
    );
  }
}

export default App;
