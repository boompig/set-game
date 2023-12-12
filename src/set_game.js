/**
 * @param {Card[]} cards 
 * @param {string} prop 
 * @returns {number}
 */

function cardsToString(cards) {
    return cards.map((card, i) => (i + 1) + '. ' + card.toString()).join('\n');
}
