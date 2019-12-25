import React, { ChangeEvent } from 'react';
import './App.css';
import Clock from './Clock';
import TodoList from './TodoList';
import { DataBackend, LocalStorageBackend } from './DataBackend';

interface TodoState {
    name: string,
    items: string[],
    completed: boolean[],
    newEntryText: string,
    editingEntryInfo: {text: string, id: number} | null,
    hideCompleted: boolean,
}

// TODO: const App: React.FC = () => {
class App extends React.Component<{}, TodoState> {
  backend: DataBackend

  constructor(props: {}) {
    super(props);

    this.backend = new LocalStorageBackend();

    let savedState = this.getState();
    if (savedState != null) {
      this.state = savedState;
    } else {
      this.state = {
        name: "test-list-1",
        items: ["take a shower", "take out the trash", "C"],
        completed: [false, true, false],
        newEntryText: ":)",
        editingEntryInfo: null,
        hideCompleted: false,
      }
    }

    this.handleAddNewEntry = this.handleAddNewEntry.bind(this);
    this.handleNewEntryTextChange = this.handleNewEntryTextChange.bind(this);

    this.handleCancelEditingEntry = this.handleCancelEditingEntry.bind(this);
    this.handleEditingEntryTextChange = this.handleEditingEntryTextChange.bind(this);
    this.handleSaveEntryText = this.handleSaveEntryText.bind(this);
    this.handleStartEditingEntry = this.handleStartEditingEntry.bind(this);

    this.handleToggleCompletion = this.handleToggleCompletion.bind(this);
    this.handleToggleHideCompleted = this.handleToggleHideCompleted.bind(this);
  }

  componentDidUpdate() {
    this.persistState();
  }

  handleStartEditingEntry(id: number) {
    this.setState((state, props) => ({
      editingEntryInfo: {
        text: state.items[id],
        id: id
      }
    }));
  }

  handleEditingEntryTextChange(e: ChangeEvent<HTMLInputElement>) {
    let newEntryText = e.target.value;
    this.setState((state, props) => {
      if (state.editingEntryInfo == null) {
        return null;
      }
      let newInfo = Object.assign({}, state.editingEntryInfo, { text: newEntryText });
      return {
        editingEntryInfo: newInfo,
      };
    });
  }

  persistState() {
    this.backend.set("rttodo_state", JSON.stringify(this.state));
  }

  getState() {
    return JSON.parse(this.backend.get("rttodo_state") || "null")
  }

  handleNewEntryTextChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({newEntryText: e.target.value});
  }

  handleAddNewEntry() {
    this.setState(
      (state, props) => ({
        items: state.items.concat(state.newEntryText),
        completed: this.state.completed.concat(false),
        newEntryText: '',
      })
    );
  }

  handleToggleCompletion(e: ChangeEvent<HTMLInputElement>, i: number) {
    // TODO: persist to a backend
    this.setState(
      (state, props) => {
        let newCompleted = state.completed.map((c, j) => (i === j) ? !c : c)
        return {
          completed: newCompleted,
        };
      }
    );
  }

  handleToggleHideCompleted(e: ChangeEvent<HTMLInputElement>) {
    // TODO: persist to a backend
    this.setState(
      (state, props) => ({
        hideCompleted: !state.hideCompleted
      })
    );
  }

  handleSaveEntryText() {
    // TODO: persist to a backend
    this.setState((state, props) => {
      // use state.editingEntryText;
      if (state.editingEntryInfo == null) {
        return null;
      }
      let updatedItems = state.items.map((item, i) =>
        (state.editingEntryInfo!.id === i)
          ? state.editingEntryInfo!.text
          : item);
      return {
        items: updatedItems,
        editingEntryInfo: null,
      };
    });
  }

  handleCancelEditingEntry() {
    this.setState((state, props) => ({
        editingEntryInfo: null,
    }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>hello, react + typescript</p>
        </header>
        <main>
          <Clock />
          <hr />
          <TodoList
            name={this.state.name}
            items={this.state.items}
            completed={this.state.completed}
            newEntryText={this.state.newEntryText}
            editingEntryInfo={this.state.editingEntryInfo}
            hideCompleted={this.state.hideCompleted}
            handleAddNewEntry={this.handleAddNewEntry}
            handleCancelEditingEntry={this.handleCancelEditingEntry}
            handleEditingEntryTextChange={this.handleEditingEntryTextChange}
            handleNewEntryTextChange={this.handleNewEntryTextChange}
            handleSaveEntryText={this.handleSaveEntryText}
            handleStartEditingEntry={this.handleStartEditingEntry}
            handleToggleCompletion={this.handleToggleCompletion}
            handleToggleHideCompleted={this.handleToggleHideCompleted}
          />
        </main>
      </div>
    );
  }
}

export default App;