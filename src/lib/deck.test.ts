import { expect, test } from 'vitest';
import { dealDeck, generateDeck } from '$lib/deck';


test('deal all cards from deck', () => {
    const deck = generateDeck();
    // expected deck length - should be  3 * 3 * 3 * 3
    // because there are 4 features and each can take on 3 unique values
    const expectedDeckLength = 3 * 3 * 3 * 3;
    expect(deck.length).toBe(expectedDeckLength);

    const randomSeed = 42;
    const chunkSize = 10;
    const dealtCards = [];
    const initDeckLength = deck.length;

    while(deck.length > 0) {
        const chunk = dealDeck(deck, chunkSize, randomSeed)
        dealtCards.push(...chunk);
    }

    expect(dealtCards.length).toBe(initDeckLength);
});
