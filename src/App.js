import React, { Component } from 'react';
import Header from './components/Header/Header';
import Heading from './components/Heading/Heading'
import Panel from './components/Panel/Panel';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Panel>
          <Heading>The Wedding</Heading>
          <p>
            The ceremony and reception will be held at Boat O'Craigo winery on the 16th of March 2018.
          </p>
          <p>458 Maroondah Hwy, Healesville</p>
        </Panel>
        <Panel>
          <Heading>RSVP</Heading>
        </Panel>
        <Panel>
          <Heading>Places to stay</Heading>
        </Panel>
      </div>
    );
  }
}

export default App;
