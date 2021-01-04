'use strict';

import { Deck } from './Deck';

var deck = new Deck();

it('should contain all 52 unique cards and no more', () => {
    deck.reset();
    expect(Object.keys(deck.cards)).toHaveLength(52);
});