import React, { ChangeEvent } from 'react';
import './App.css';
import Clock from './Clock';
import TodoList from './TodoList';

interface TodoState {
    name: string,
    items: string[],
    completed: boolean[],
    newEntryText: string,
}

//const App: React.FC = () => {
class App extends React.Component<{}, TodoState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      name: "test-list-1",
      items: ["take a shower", "take out the trash", "C"],
      completed: [false, true, false],
      newEntryText: ":)",
    }

    this.handleAddNewEntry = this.handleAddNewEntry.bind(this);
    this.handleNewEntryTextChange = this.handleNewEntryTextChange.bind(this);
    this.handleToggleCompletion = this.handleToggleCompletion.bind(this);
  }

  handleNewEntryTextChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({newEntryText: e.target.value});
  }

  handleAddNewEntry() {
    this.setState((state, props) => ({
      items: state.items.concat(state.newEntryText),
      completed: this.state.completed.concat(false),
      newEntryText: '',
    }));
  }

  handleToggleCompletion(e: ChangeEvent<HTMLInputElement>, i: number) {
    this.setState((state, props) => {
      let newCompleted = this.state.completed.map((c, j) => (i === j) ? !c : c)
      return {
        completed: newCompleted,
      };
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>hello, react + typescript</p>
        </header>
        <div>
          <ul>
            <li>0</li>
            <li>1</li>
            <li>2</li>
          </ul>
          <Clock />
          <TodoList
            name={this.state.name}
            items={this.state.items}
            completed={this.state.completed}
            newEntryText={this.state.newEntryText}
            handleAddNewEntry={this.handleAddNewEntry}
            handleNewEntryTextChange={this.handleNewEntryTextChange}
            handleToggleCompletion={this.handleToggleCompletion}
          />
        </div>
      </div>
    );
  }
}

export default App;
