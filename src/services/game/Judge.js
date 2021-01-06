'use strict';

import { Rankings, Weights } from './Hand_Rankings';
import { Definitions } from './Card_Definitions';
import { Card } from './Card';
import { array } from 'joi';

class Judge {
    static assess(hand) {
        let cards = this.sort(hand);
        return { ranking: '' };
    }

    static sort(cards) {
        return cards.sort((a, b) => {
            return Definitions.ranks[a.rank].value - Definitions.ranks[b.rank].value;
        });
    }
}
exports.Judge = Judge;
