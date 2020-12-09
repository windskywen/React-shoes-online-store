import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from 'pages/App';
import Login from 'pages/Login';
import Cart from 'pages/Cart';
import Register from 'pages/Register';
import NotFound from 'pages/NotFound';


const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/cart" component={Cart} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
)

export default Router;