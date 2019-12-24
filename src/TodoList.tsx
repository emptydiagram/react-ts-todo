import React, { Component } from 'react';
import './TodoList.css';
import { TodoProps } from './TodoProps';

class TodoItem extends Component<{ item: string, completed: boolean }, {}> {
    render() {
        return <li>
            <input
                type="checkbox"
                checked={this.props.completed}
            />
            <span>{this.props.item}</span>
        </li>;
    }
}

export default class TodoList extends Component<TodoProps, {}> {
    render() {
        let listItems = [];
        for (let i in this.props.items) {
            let newItem = <TodoItem
                item={this.props.items[i]}
                completed={this.props.completed[i]}
            />;
            listItems.push(newItem);
        }

        return <div id="todoList">
            <h1>todo list named "{this.props.name}"</h1>
            <div id="listContainer">
                <input id="newEntryInput" type="text" placeholder="New entry" />
                <ul>
                    {listItems}
                </ul>
            </div>
            </div>;
    }

}