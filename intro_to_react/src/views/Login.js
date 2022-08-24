import React, { Component } from 'react'

export default class Login extends Component {
    sendLoginInfo = async (e) => {
        e.preventDefault();

        const url = 'http://127.0.0.1:5000/api/login'

        const body = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        const options = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }

        const res = await fetch(url, options);
        const data = await res.json();
        console.log(data)

        if (data.status === 'ok') {
            this.props.logMeIn(data.data)
        }

    };

    sendBasicAuth = async (e) => {
        e.preventDefault();
        const res = await fetch('http://127.0.0.1:5000/token', {
            method: "POST",
            headers: {Authorization: `Bearer ${btoa(e.target.username.value+":"+e.target.password.value)}`}
        });
        const data = await res.json();
        console.log(data)
        if (data.status === 'ok') {
            this.props.logMeIn(data.data)
        }
    };

    render() {
        return (
            <form className='col-4' onSubmit={(e) => { this.sendBasicAuth(e) }}>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="text" className="form-control" name='username' />
                </div>


                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' />
                </div>
              
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        )
    }
}