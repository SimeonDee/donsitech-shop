import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component{
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            state: '',
            states: [],
        }
    }

    async componentDidMount(){
        const states = await axios.get('http://localhost:5000/admin/state/');
        console.log(states.data.states);
        this.setState({
            states: states.data.states,
            state: states.data.states[0].name,
        });
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value,
        })
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value,
        })
    }

    onChangeState(e){
        this.setState({
            state: e.target.value,
        })
    }

    async onSubmit(e){
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            password: this.state.password,
            state: this.state.state,
        }
        
        const response = await axios.post('http://localhost:5000/user/', newUser);
        console.log(response.data);

        // if(response?.message){
        //     console.log(`Error: ${ response.message }`);
        // } else{
        //     console.log(`User Created: ${ response.user }`);
        // }
    }

    render(){
        return(
            <div>
                <h3> Create A New User Page </h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label> Username: </label>
                        <input type='text' required onChange={this.onChangeUsername} 
                            value={this.state.username} className='form-control' />
                    </div>
                    <div className='form-group'>
                        <label> Password: </label>
                        <input type='password' required onChange={this.onChangePassword} 
                            value={this.state.password} className='form-control' />
                    </div>
                    <div className='form-group'>
                        <label> Select State: </label>
                        <select value={this.state.state} required className='form-control'
                            onSelect={this.onChangeState}>
                            {
                                this.state.states.map((stateItem, index) => {
                                    return <option value={stateItem.name} key={index}> 
                                                {stateItem.name} 
                                            </option>
                                })
                            }
                        </select>
                    </div>

                    <div className='form-group'>
                        <input type='submit' value='Create User' className='btn btn-primary' />
                    </div>
                </form>

            </div>
        );
    }
}