import React from 'react';
import { render } from 'react-dom';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from './src/App';


render(<BrowserRouter><RecoilRoot><App /></RecoilRoot></BrowserRouter>,document.querySelector('#app'));
