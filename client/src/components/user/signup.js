import React, {useState, useEffect} from 'react';
import gql from 'graphql-tag';
import {graphql } from 'react-apollo';


const SignUp = (props) => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [firstName, setfirstName] = useState('');
const [lastName, setlastName] = useState('');


onsubmit = async (e) => {
    console.log('submitted');
    e.preventDefault();

    let data = await props.mutate({
        variables: {email, password, firstName, lastName}
    });

    sessionStorage.setItem("token", (data.data.signUp.token));

    props.history.push('/');
}


  return (
    <form>
        <label>First Name: </label>
        <input 
        type="text" 
        name="firstName" 
        value={firstName}  
        placeholder="firstName"
        onChange={(e) => setfirstName(e.target.value)}/><br></br><br></br>

        <label>LastName: </label>
        <input 
        type="text" 
        name="lastName" 
        value={lastName}  
        placeholder="lastName"
        onChange={(e) => setlastName(e.target.value)}/><br></br><br></br>
        
        
        <label>Email: </label>
        <input 
        type="text" 
        name="email" 
        value={email}  
        placeholder="Email"
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
        
        <button type="button" onClick={onsubmit}>Register</button>
    </form>
  );
}

const mutation = gql`
        mutation SignUp($email : String!, $password : String!, $firstName: String!, $lastName: String!){
            signUp(email: $email, password: $password, firstName: $firstName, lastName: $lastName){
                token
            }
        }
`;

export default graphql(mutation)(SignUp);