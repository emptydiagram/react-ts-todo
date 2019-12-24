import React, { Component } from 'react';
import { TodoProps } from './TodoProps';

export default class TodoList extends Component<TodoProps, {}> {
    render() {
        let listItems = [];
        for (let i in this.props.items) {
            let completedText = this.props.completed[i] ? "yes" : "no";
            let displayText = `${this.props.items[i]} / ${completedText}`;
            listItems.push(<li>{displayText}</li>);
        }

        return <div id="todoList">
            <h1>todo list named "{this.props.name}"</h1>
            <ul>
                {listItems}
            </ul>
            </div>;
    }

}