import {Color, Shape, Pattern, Card, MAX_NUM}  from '$lib/card';

/**
 * Number of cards to deal normally
 */
export const NUM_DEALT_CARDS = 12;

/**
 * Number of cards to deal when there is no set possible in the initial set of cards
 */
export const NUM_DEALT_CARDS_EXTRA = 15;

function mulberry32(randomSeed: number) {
    return function() {
      var t = randomSeed += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

/**
 * Modify the deck. Return the dealt cards.
 * This method will make sure to not deal past the end of the deck and can handle negative/0 cardsToDeal inputs
 * @param randomSeed - used by the PRNG for repro
 */
export function dealDeck(deck: Card[], cardsToDeal: number, randomSeed: number): Card[] {
    if (cardsToDeal <= 0) {
        return [];
    }
    const cards = [];
    const randomGenerator = mulberry32(randomSeed);
    for(let i = 0; i < cardsToDeal; i++) {
        if (deck.length === 0) {
            break;
        }
        let randomIndex = Math.floor(randomGenerator() * deck.length);
        let removedCards = deck.splice(randomIndex, 1);
        cards.push(removedCards[0]);
    }
    return cards;
}

export function generateDeck (): Card[] {
    const cards: Card[] = [];
    const colorVals = Object.values(Color).filter((v) => !isNaN(Number(v))) as Color[];
    const shapeVals = Object.values(Shape).filter((v) => !isNaN(Number(v))) as Shape[];
    const patternVals = Object.values(Pattern).filter((v) => !isNaN(Number(v))) as Pattern[];

    colorVals.forEach((c: Color) => {
        shapeVals.forEach((s: Shape) => {
            patternVals.forEach((p: Pattern) => {
                for(let num = 1; num <= MAX_NUM; num++) {
                    const card = new Card(
                        num,
                        c,
                        s,
                        p,
                    );
                    cards.push(card);
                }
            });
        });
    });
    return cards;
}