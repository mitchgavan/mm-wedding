import React, { Component } from 'react';
import styles from './Accommodation.module.css';
import { ReactComponent as ArrowForward } from '../../svg/arrow-forward.svg';

const hotels = [
  {
    name: 'RACV Country Club',
    address: 'Healesville',
    url:
      'https://www.tripadvisor.com.au/Hotel_Review-g552181-d2386523-Reviews-RACV_Healesville_Country_Club-Healesville_Yarra_Valley_Victoria.html',
  },
  {
    name: 'Sanctuary House Resort Motel',
    address: 'Healesville',
    url:
      'https://www.tripadvisor.com.au/Hotel_Review-g552181-d324361-Reviews-Sanctuary_House_Resort_Motel-Healesville_Yarra_Valley_Victoria.html',
  },
  {
    name: 'Yarra Gables Motel',
    address: 'Healesville',
    url:
      'https://www.tripadvisor.com.au/Hotel_Review-g552181-d2040886-Reviews-Yarra_Gables_Motel-Healesville_Yarra_Valley_Victoria.html',
  },
];

export default class Accommodation extends Component {
  render() {
    return (
      <div className={styles.accommodation}>
        <p>If you're looking for accommodation, here are a few ideas:</p>
        <div className={styles.options}>
          {hotels.map(hotel => (
            <div key={hotel.name} className={styles.option}>
              <h3 className={styles.name}>{hotel.name}</h3>
              <div className={styles.address}>{hotel.address}</div>
              <a
                href={hotel.url}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>View on TripAdvisor</span> <ArrowForward />
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
