import React, { Component } from 'react'

export default class Signup extends Component {


    sendSignUpInfo = async (e) => {
        e.preventDefault();

        if (e.target.password.value !== e.target.confirmPassword.value){
            return
        }

        const res = await fetch('http://127.0.0.1:5000/api/signup', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                username: e.target.username.value,
                email: e.target.email.value,
                password: e.target.password.value
            })
        });
        const data = await res.json();
        console.log(data)
    };

    render() {
        return (
            <form className='col-4' onSubmit={(e)=>{this.sendSignUpInfo(e)}}>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="text" className="form-control" name='username'/>
                </div>


                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name='confirmPassword'/>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        )
    }
}