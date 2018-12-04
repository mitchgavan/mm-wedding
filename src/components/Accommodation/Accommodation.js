import React, { Component } from 'react';
import styles from './Accommodation.module.css';
import { ReactComponent as ArrowForward } from '../../svg/arrow-forward.svg';
import imgFlights from '../../images/gifts/flights@2x.jpg';

const hotels = [
  {
    name: 'RACV Club Healesville',
    address: '10 Stanley Rd, Healesville',
    url: 'http://google.com',
    image: imgFlights,
  },
  {
    name: 'RACV Club Healesville',
    address: '10 Stanley Rd, Healesville',
    url: 'http://google.com',
    image: imgFlights,
  },
  {
    name: 'RACV Club Healesville',
    address: '10 Stanley Rd, Healesville',
    url: 'http://google.com',
    image: imgFlights,
  },
];

export default class Accommodation extends Component {
  render() {
    return (
      <div className={styles.accommodation}>
        <p>Coming soon...</p>
        <div className={styles.options}>
          {hotels.map(hotel => (
            <div key={hotel.name} className={styles.option}>
              <img src={hotel.image} alt={hotel.name} />
              <h3 className={styles.name}>{hotel.name}</h3>
              <div className={styles.address}>{hotel.address}</div>
              <a
                href={hotel.url}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Visit website</span> <ArrowForward />
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
