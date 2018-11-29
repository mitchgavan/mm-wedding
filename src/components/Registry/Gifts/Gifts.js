import React, { Component } from 'react';
import styles from './Gifts.module.css';
import Gift from '../Gift/Gift';

const gifts = [
  'Flights to Bali',
  'Bali Resort Accomodation',
  'Dinner and Drinks',
  'Traditional Balinese Spa Package',
  'Sightseeing Tour',
  'Bintang Singlets and Ray-Bans',
];

export default class Gifts extends Component {
  render() {
    const { onGiftSelect, selectedGift } = this.props;

    return (
      <div className={styles.gifts}>
        {gifts.map(gift => (
          <div className={styles.giftContainer} key={gift}>
            <button className={styles.gift} onClick={() => onGiftSelect(gift)}>
              <Gift title={gift} isSelected={selectedGift === gift} />
            </button>
          </div>
        ))}
      </div>
    );
  }
}
