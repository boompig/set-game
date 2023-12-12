import { Card, MAX_NUM } from "$lib/card";

/**
 * Runs in O(n) time and constant space
 */
function isAllSameProp(cards: Card[], prop: keyof Card): boolean {
    console.log(`[prop - ${prop}] Checking all same...`);
    // check all same
    let expectedProp = (cards[0] as any)[prop];
    for(let i = 0; i < cards.length; i++) {
        if ((cards[i] as any)[prop] !== expectedProp) {
            console.log(`[prop - ${prop}] expected ${expectedProp}, got ${cards[i][prop]}`);
            return false;
        }
    }
    return true;
}

/**
 * Runs in O(n) time + constant space
 * Though no early exit
 * Uses bitwise addition / operations
 */
function isAllDifferentNumberProp2(cards: Card[], prop: keyof Card): boolean {
    const n = cards.length;
    // guaranteed to be integer
    // taking off an additional 1 because the numbers are 1-based (so we will never get 2^0 === 1 in the sum)
    const expectedSum = 2 ** (MAX_NUM + 1) - 1 - 1;
    let s = 0;
    for(let i = 0; i < cards.length; i++) {
        s = s | (2 ** (cards[i] as any)[prop]);
    }
    return s === expectedSum;
}

function checkNumberPropSet(cards: Card[], prop: keyof Card): boolean {
    // cards guaranteed to be length >= 2
    console.assert(cards.length >= 2);

    if ((cards[0]as any)[prop] === (cards[1] as any)[prop]) {
        return isAllSameProp(cards, prop);
    } else {
        return isAllDifferentNumberProp2(cards, prop);
    }
}

export function isValidSet(cards: Card[]): boolean {
    if (cards.length !== 3) {
        // console.log('length check failed');
        return false;
    }

    if (!checkNumberPropSet(cards, 'number')) {
        // console.log('number check failed');
        return false;
    }

    if (!checkNumberPropSet(cards, 'shape')) {
        // console.log('shape check failed');
        return false;
    }

    if (!checkNumberPropSet(cards, 'color')) {
        // console.log('color check failed');
        return false;
    }

    if (!checkNumberPropSet(cards, 'pattern')) {
        // console.log('pattern check failed');
        return false;
    }

    return true;
}

function constructUniqueProp(cards: Card[], prop: keyof Card): number {
    if (cards[0][prop] === cards[1][prop]) {
        return cards[0][prop] as number;
    } else {
        // 1 + 2 + 3
        const s = 6 - (cards[0] as any)[prop] - (cards[1] as any)[prop];
        return s;
    }
}


function constructLastSetCard(cards: Card[]) {
    console.assert(cards.length === 2);
    // given 2 cards in a set, the final card is unique
    // we can construct it
    return new Card(
        constructUniqueProp(cards, 'number'),
        constructUniqueProp(cards, 'color'),
        constructUniqueProp(cards, 'shape'),
        constructUniqueProp(cards, 'pattern'),
    );
}

function findLastSetCard(partialSet: Card[], availableCards: Card[]): Card | null {
    const targetCard = constructLastSetCard(partialSet);
    // console.log(`partial set is:\n` + cardsToString(partialSet));
    // console.log(`target card is ${targetCard.toString()}`)
    for (let i = 0; i < availableCards.length; i++) {
        // numVisited++;

        let card = availableCards[i];
        if (targetCard.isSame(card)) {
            return card;
        }
    }
    return null;
}

/**
 * @param {Set<number>} visited - singular cards that have been visited and are not good
 */
function has_set_search(setCards: Card[], availableCards: Card[], maxDepth: number, depth: number, visited: Set<number>): Card[] | null {
    if (setCards.length === maxDepth) {
        throw new Error('should never be here');
        // console.log('Reached max depth. Checking if it is a set');
        if (isValidSet(setCards)) {
            return setCards;
        } else {
            return null;
        }
    } else if (setCards.length === maxDepth - 1) {
        // console.log('Searching for the last card...');
        let lastCard = findLastSetCard(setCards, availableCards);
        if (lastCard) {
            const set = [...setCards];
            set.push(lastCard);
            // console.log('Found the last card.');
            return set;
        } else {
            // console.log('Last card not found.')
            return null;
        }
    }

    // otherwise...
    for(let i = 0; i < availableCards.length; i++) {
        let newCard = availableCards[i];
        if (visited.has(newCard.hash())) {
            // console.log(`[${depth}] -> skipping over bad card with value ${newCard.hash()}`);
            continue;
        }

        // numVisited++;

        let newSetCards = [...setCards];
        // console.log(`[${depth}] Trying card ${newCard.toString()} (${i})`);
        newSetCards.push(newCard);
        let newAvailCards = [...availableCards];
        newAvailCards.splice(i, 1);
        let foundSet = has_set_search(newSetCards, newAvailCards, maxDepth, depth + 1, visited);
        if (foundSet) {
            // console.log(`Found valid set: ${foundSet}`);
            return foundSet;
        } else {
            // console.log(`[${depth}] not a set, trying again`);
            if (depth === 0) {
                visited.add(newCard.hash());
            }
        }
    }
    return null;
}

export function findSet(cards: Card[]): Card[] | null {
    if (cards.length < 3) {
        return null;
    }
    let visited = new Set<number>();
    let s = has_set_search([], cards, 3, 0, visited);
    return s;
}

export function has_set(cards: Card[]): boolean {
    // large enough grouping such that a set is possible
    if (cards.length < 3) {
        return false;
    }

    let visited = new Set<number>();
    let s = has_set_search([], cards, 3, 0, visited);
    return s !== null;
}
