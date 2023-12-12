import { expect, test } from 'vitest';
import { Card, Color, Pattern, Shape } from '$lib/card';
import { isValidSet } from '$lib/set-utils';

// make sure that the isDifferent and isSame functions work as intended
test('isSet', () => {
    // mix of same and different
    const cards = [
        new Card(1, Color.BLUE, Shape.CIRCLE, Pattern.FILLED),
        new Card(2, Color.BLUE, Shape.CIRCLE, Pattern.FILLED),
        new Card(3, Color.BLUE, Shape.CIRCLE, Pattern.FILLED),
    ];
    expect(isValidSet(cards)).toBe(true);

    // screw up the set on purpose
    cards[0] = new Card(1, Color.GREEN, Shape.CIRCLE, Pattern.FILLED);
    expect(isValidSet(cards)).toBe(false);
});