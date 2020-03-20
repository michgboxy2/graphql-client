import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import gql from 'graphql-tag';
import {graphql } from 'react-apollo';
import { useQuery, useMutation } from 'graphql-hooks';
import {hashHistory} from 'react-router';

const Login = (props) => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');




sessionStorage.removeItem('token');


onsubmit = async (e) => {
    console.log('submitted');
    e.preventDefault();

    let data = await props.mutate({
        variables: {email, password}
    });

    sessionStorage.setItem("token", (data.data.signIn.token));

    props.history.push('/tweets');
}


  return (
    <form>
        <label>Email: </label>
        <input 
        type="text" 
        name="email" 
        value={email}  
        placeholder="firstName"
        onChange={(e) => setEmail(e.target.value)}

        /><br></br><br></br>

        <label>lastName: </label>
        <input 
            type="password" 
            name="password" 
            placeholder="lastName"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            /><br/>
        
        <button type="button" onClick={onsubmit}>Submit</button>
    </form>
  );
}

const mutation = gql`
        mutation SignIn($email : String!, $password : String!){
            signIn(email: $email, password: $password){
                token
            }
        }
`;

export default graphql(mutation)(Login);