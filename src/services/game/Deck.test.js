'use strict';

import { Deck } from './Deck';

var deck = new Deck();

it('should contain all 52 unique cards and no more', () => {
    deck.reset();
    expect(deck.cards).toBeInstanceOf(Set); //ensures all are unique
    expect(deck.cards.size).toEqual(52);
});