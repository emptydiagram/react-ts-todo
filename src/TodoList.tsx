import React, { Component, ChangeEvent } from 'react';
import './TodoList.css';

type TodoProps = {
    name: string,
    items: string[],
    completed: boolean[],
    newEntryText: string,
    editingEntryInfo: {text: string, id: number} | null,
    hideCompleted: boolean,
    handleAddNewEntry: () => void,
    handleCancelEditingEntry: () => void,
    handleEditingEntryTextChange: (e: ChangeEvent<HTMLInputElement>) => void,
    handleNewEntryTextChange: (e: ChangeEvent<HTMLInputElement>) => void,
    handleSaveEntryText: () => void,
    handleStartEditingEntry: (i: number) => void,
    handleToggleCompletion: (e: ChangeEvent<HTMLInputElement>, i: number) => void,
    handleToggleHideCompleted: (e: ChangeEvent<HTMLInputElement>) => void,
}

type TodoItemProps = {
    item: string,
    completed: boolean,
    editingEntryInfo: {text: string, id: number} | null,
    handleCancelEditingEntry: () => void,
    handleDoubleClick: () => void,
    handleEditingEntryTextChange: (e: ChangeEvent<HTMLInputElement>) => void,
    handleSaveEntryText: () => void,
    handleToggleCompletion: (e: ChangeEvent<HTMLInputElement>) => void,
}

class TodoItem extends Component<TodoItemProps, {}> {
    render() {
        let itemDisplay = this.props.editingEntryInfo != null
            ? <span>
                <input type="text" className="editing"
                    value={this.props.editingEntryInfo.text}
                    onChange={this.props.handleEditingEntryTextChange}/>
                <button onClick={this.props.handleSaveEntryText}>Save</button>
                <button onClick={this.props.handleCancelEditingEntry}>Cancel</button>
              </span>
            : <span onDoubleClick={this.props.handleDoubleClick}>{this.props.item}</span>;
        return <li>
            <input
                type="checkbox"
                checked={this.props.completed}
                onChange={this.props.handleToggleCompletion}
            />
           {itemDisplay}
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
            // TODO: more concise? what does `this.props.editingInfo?.id` do?
            let info =
                (this.props.editingEntryInfo != null && i === this.props.editingEntryInfo!.id)
                ? this.props.editingEntryInfo
                : null;

            let newItem = <TodoItem
                item={this.props.items[i]}
                completed={isCompleted}
                editingEntryInfo={info}
                handleCancelEditingEntry={this.props.handleCancelEditingEntry}
                handleDoubleClick={() => this.props.handleStartEditingEntry(i)}
                handleEditingEntryTextChange={this.props.handleEditingEntryTextChange}
                handleSaveEntryText={this.props.handleSaveEntryText}
                handleToggleCompletion={(e) => this.props.handleToggleCompletion(e, i)}
                key={i}
            />;
            listItems.push(newItem);
        }

        return <div id="todoList">
            <h1>list "{this.props.name}"</h1>
            <div id="listContainer">
                <input id="newEntryInput" type="text" placeholder="New entry"
                    value={this.props.newEntryText}
                    onChange={this.props.handleNewEntryTextChange}/>
                <button onClick={this.props.handleAddNewEntry}>Add</button>
                <div>
                    <input type="checkbox"
                        checked={this.props.hideCompleted}
                        onChange={this.props.handleToggleHideCompleted} />
                    Hide completed
                </div>
                <ul>
                    {listItems}
                </ul>
            </div>
            </div>;
    }

}