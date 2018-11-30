import React, { Component } from 'react';
import styles from './Gifts.module.css';
import Gift from '../Gift/Gift';
import imgFlights from '../../../images/gifts/flights@2x.jpg';
import imgAccom from '../../../images/gifts/bali-accom@2x.jpg';
import imgRestaurant from '../../../images/gifts/bali-restaurant@2x.jpg';
import imgSpa from '../../../images/gifts/bali-spa@2x.jpg';
import imgSightseeing from '../../../images/gifts/bali-sightseeing@2x.jpg';
import imgMarkets from '../../../images/gifts/bali-markets@2x.jpg';

const gifts = [
  {
    title: 'Flights to Bali',
    image: imgFlights,
  },
  {
    title: 'Bali Resort Accommodation',
    image: imgAccom,
  },
  {
    title: 'Dinner and Drinks',
    image: imgRestaurant,
  },
  {
    title: 'Traditional Balinese Spa Package',
    image: imgSpa,
  },
  {
    title: 'Sightseeing Tour',
    image: imgSightseeing,
  },
  {
    title: 'Bintang Singlets and Ray-Bans',
    image: imgMarkets,
  },
];

export default class Gifts extends Component {
  render() {
    const { onGiftSelect, selectedGift } = this.props;

    return (
      <div className={styles.gifts}>
        {gifts.map(gift => (
          <div className={styles.giftContainer} key={gift.title}>
            <button
              className={styles.gift}
              onClick={() => onGiftSelect(gift.title)}
            >
              <Gift
                title={gift.title}
                image={gift.image}
                isSelected={selectedGift === gift.title}
              />
            </button>
          </div>
        ))}
      </div>
    );
  }
}
