import React, { Component } from 'react'

export default class ToDoTask extends Component {

    handleClick = () => {
        const copy = { ...this.props.obj, complete: !this.props.obj.complete }
        this.props.doneI(copy, this.props.index)
    }

    render() {
        return (
            <div className="card" style={{ width: "50rem" }}>
                <div className="card-body">
                    <p className="card-text">{this.props.obj.text}</p>
                    <input type='checkbox' checked={this.props.obj.complete} />
                    <button onClick={() => { this.handleClick() }}>Done</button>
                    <button onClick={() => { this.props.removeI(this.props.index)}}>Remove</button>
                </div>
            </div>
        )
    }
}


