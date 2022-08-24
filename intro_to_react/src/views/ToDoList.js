import React, { Component } from 'react'
import ToDoTask from '../components/ToDoTask'

export default class ToDoList extends Component {
    constructor() {
        super();
        this.state = {
            todosI: []
        }
    };


    addI = (e) => {
        e.preventDefault();
        const thingtodo = e.target.thing.value
        const obj = {
            text: thingtodo,
            complete: false
        }
        this.setState({todosI: this.state.todosI.concat([obj])})
        };



        removeI = (index) => {
            const newList = [...this.state.todosI]
            newList.splice(index, 1)
            this.setState({ todosI: newList })
        };


        doneI = (newObj, index) => {
            const newList = this.state.todosI.slice()
            newList.splice(index, 1, newObj)
            this.setState({ todosI: newList })
        };


        showCard = () => {
            return this.state.todosI.map((t, i) => <ToDoTask key={i} obj={t} index={i} doneI={this.doneI} removeI={this.removeI}></ToDoTask>)
        };


        render() {
            return (
                <div>

                    <form onSubmit={(e) => { this.addI(e) }}>
                        <input name='thing' placeholder='Your To Do Here' />
                        <button className="btn btn-primary">Add to list</button>
                    </form>

                    <div>

                        {this.showCard()}

                    </div>

                </div>
            )
        };
    };

