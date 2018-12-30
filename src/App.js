import React, { Component } from 'react';
import Header from './components/Header/Header';
import Heading from './components/Heading/Heading';
import Panel from './components/Panel/Panel';
import './App.css';
import Countdown from './components/Countdown/Countdown';
import Form from './components/Form/Form';
import ImagePanel from './components/ImagePanel/ImagePanel';
import Registry from './components/Registry/Registry';
import Footer from './components/Footer/Footer';
import Accommodation from './components/Accommodation/Accommodation';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Panel>
          <Heading>The Wedding</Heading>
          <p>
            The ceremony and reception will be held at{' '}
            <strong>Boat O'Craigo</strong> winery on the{' '}
            <strong>16th of March 2019</strong>.
          </p>
          <p>458 Maroondah Hwy, Healesville</p>
        </Panel>
        <Panel type="countdown" dark>
          <Countdown />
        </Panel>
        <ImagePanel />
        <Panel id="rsvp" type="rsvp">
          <Form name="rsvp" />
        </Panel>
        <Panel>
          <Heading>Places to stay</Heading>
          <Accommodation />
        </Panel>
        <Panel dark>
          <Heading>A note on gifts</Heading>
          <Registry />
        </Panel>
        <Footer />
      </div>
    );
  }
}

export default App;
