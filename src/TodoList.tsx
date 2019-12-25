import React, { Component, ChangeEvent } from 'react';
import './TodoList.css';

type TodoProps = {
    name: string,
    items: string[],
    completed: boolean[],
    newEntryText: string,
    hideCompleted: boolean,
    handleAddNewEntry: () => void,
    handleNewEntryTextChange: (e: ChangeEvent<HTMLInputElement>) => void,
    handleToggleCompletion: (e: ChangeEvent<HTMLInputElement>, i: number) => void,
    handleToggleHideCompleted: (e: ChangeEvent<HTMLInputElement>) => void,
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
            const isCompleted = this.props.completed[i];
            if (this.props.hideCompleted && isCompleted) {
                continue;
            }
            let newItem = <TodoItem
                item={this.props.items[i]}
                completed={isCompleted}
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
                <span>
                    <input type="checkbox" onChange={this.props.handleToggleHideCompleted} />
                    Hide completed
                </span>
                <ul>
                    {listItems}
                </ul>
            </div>
            </div>;
    }

}