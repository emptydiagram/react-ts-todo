import React, { Component, ChangeEvent } from 'react';
import './TodoList.css';

type TodoProps = {
    name: string,
    items: string[],
    completed: boolean[],
    newEntryText: string,
    handleAddNewEntry: () => void,
    handleNewEntryTextChange: (e: ChangeEvent<HTMLInputElement>) => void,
    handleToggleCompletion: (e: ChangeEvent<HTMLInputElement>, i: number) => void,
}

type TodoItemProps = {
    item: string,
    completed: boolean,
    handleToggleCompletion: (e: ChangeEvent<HTMLInputElement>) => void,
}

class TodoItem extends Component<TodoItemProps, {}> {
    render() {
        return <li>
            <input
                type="checkbox"
                checked={this.props.completed}
                onChange={this.props.handleToggleCompletion}
            />
            <span>{this.props.item}</span>
        </li>;
    }
}

export default class TodoList extends Component<TodoProps, {}> {
    render() {
        let listItems = [];
        for (let i = 0; i < this.props.items.length; i++) {
            const isCompleted = this.props.items[i];
            let newItem = <TodoItem
                item={isCompleted}
                completed={this.props.completed[i]}
                handleToggleCompletion={(e) => this.props.handleToggleCompletion(e, i)}
                key={i}
            />;
            listItems.push(newItem);
        }

        return <div id="todoList">
            <h1>todo list named "{this.props.name}"</h1>
            <div id="listContainer">
                <input id="newEntryInput" type="text" placeholder="New entry"
                    value={this.props.newEntryText}
                    onChange={this.props.handleNewEntryTextChange}/>
                <button onClick={this.props.handleAddNewEntry}>Add</button>
                <ul>
                    {listItems}
                </ul>
            </div>
            </div>;
    }

}