'use strict';

import { Rankings, Weights } from './Hand_Rankings';
import { Definitions } from './Card_Definitions';
import { Card } from './Card';

class Judge {
    static assess() {
        return {ranking: ''};
    }
}
exports.Judge = Judge;