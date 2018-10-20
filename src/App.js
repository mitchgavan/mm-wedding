import React, { Component } from 'react';
import Header from './components/Header/Header';
import Heading from './components/Heading/Heading'
import Panel from './components/Panel/Panel';
import './App.css';
import Countdown from './components/Countdown/Countdown';
import Form from './components/Form/Form';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Panel>
          <Heading>The Wedding</Heading>
          <p>
            The ceremony and reception will be held at <strong>Boat O'Craigo</strong> winery on the <strong>16th of March 2018</strong>.
          </p>
          <p>458 Maroondah Hwy, Healesville</p>
        </Panel>
        <Panel dark>
          <Countdown />
        </Panel>
        <Panel rsvp>
          <Form name="rsvp" />
        </Panel>
        <Panel>
          <Heading>Places to stay</Heading>
        </Panel>
      </div>
    );
  }
}

export default App;
