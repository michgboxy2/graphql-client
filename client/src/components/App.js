import React, {Component, useState} from 'react';
import {Route, Router, HashRouter, BrowserRouter} from 'react-router-dom';


import SignUp from './user/signup';
import Login from './user/signIn';

import Tweet from './tweets/tweet';


class App extends Component {
    render(){
        return(
            <HashRouter>
                <div>
                 <Route exact path="/" component={Login}/>
                 <Route exact path="/signup" component={SignUp}/>
                 <Route exact path="/tweets" component={Tweet}/>
                 
                </div>
            </HashRouter>
        )
    }
}

export default App;