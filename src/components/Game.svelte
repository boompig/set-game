<!-- A game of set with a given random seed -->
<script lang="ts">
    import { generateDeck, dealDeck, NUM_DEALT_CARDS, NUM_DEALT_CARDS_EXTRA } from "$lib/deck";
    import { colorToString, type Card, patternToString, shapeToString } from "$lib/card";
    import {type IGameEvent, GameEventType, type IGameResult } from '$lib/game-events';
    import CardElem from "./CardElem.svelte";
    import IsSetModal from "./IsSetModal.svelte";
    import { isValidSet, hasSet, findSet } from "$lib/set-utils";

    // we get this from the parent
    export let gameRandomSeed: number;
    export let onGameOver: (gameResult: IGameResult) => void;

    /**
     * Has an initial deal been performed?
     */
    let isDealt = false;
    let deck: Card[] = [];
    /**
     * Cards visible to the player
     */
    let tableCards: Card[] = [];
    /**
     * Cards selected by the user (used for set matching)
     */
    let selectedCards: Card[] = [];
    /**
     * Number of sets found by the current user
     */
    let points = 0;
    /**
     * A hint displayed to the user.
     * Empty string when the hint is hidden.
     */
    let hint = '';
    /**
     * The time at which the player started the game
     * Timestamp with ms
     */
    let startTime = 0;
    /**
     * Used to update elapsed time
     */
    let timerId: number | null = null;
    /**
     * Amount of time elapsed for the current game (s)
     */
    let elapsedTime: number = 0;

    function updateElapsedTime(startTime: number) {
        // sanity runtime checking
        if(!startTime || isNaN(startTime) || typeof startTime !== 'number') {
            throw new Error('start time undefined');
        }
        const now = (new Date()).valueOf();
        const diff = now - startTime;
        elapsedTime = Math.round(diff / 1000.0);
    }

    /**
     * The initial deal for this game
     * Also handles game restart
     */
    function handleDealDeck() {
        deck = generateDeck();
        tableCards = dealDeck(deck, NUM_DEALT_CARDS, gameRandomSeed);
        // update the deck state
        deck = [...deck];
        isDealt = true;
        selectedCards = [];
        points = 0;
        hint = '';
        startTime = (new Date()).valueOf();
        elapsedTime = 0;

        if (timerId) {
            window.clearInterval(timerId);
            timerId = null;
        }
        window.setInterval(() => {
            updateElapsedTime(startTime);
        }, 1000)
    }

    /**
     * Deal more cards when the "Deal More" button is pressed
     * @param extra - when extra is true, instead deal extra cards (only valid when there are already 12 cards)
     */
    function handleDealMore(extra?: boolean) {
        // force t/f for simplicity
        extra = extra || false;
        // make sure this is never negative
        let numMore = Math.max(NUM_DEALT_CARDS - tableCards.length, 0);
        if (numMore === 0 && extra) {
            numMore = NUM_DEALT_CARDS_EXTRA - tableCards.length;
        }
        console.log(`# cards to deal: ${numMore} (extra=${extra})`);
        const moreCards = dealDeck(deck, numMore, gameRandomSeed);
        tableCards = [...tableCards, ...moreCards];
        // update the deck state
        deck = [...deck];
        selectedCards = [];
        hint = '';
    }

    function handleDealExtra() {
        handleDealMore(true);
    }

    function handleShowHint() {
        const s = findSet(tableCards);
        if (s) {
            const firstCard = s[0];
            const cs = colorToString(firstCard.color);
            const ps = patternToString(firstCard.pattern);
            const ss = shapeToString(firstCard.shape);
            hint = `One of the cards in the set is: number=${firstCard.number} color=${cs} pattern=${ps} shape=${ss}`;
        } else {
            hint = 'No sets left';
        }
    }

    function handleRestartGame() {
        handleDealDeck();
    }

    function countPointsIfSet() {
        if (selectedCards.length === 3) {
            if (isValidSet(selectedCards)) {
                points++;
                const newArr = [...tableCards]
                // remove the selected cards from the table
                selectedCards.forEach(card => {
                    const i = tableCards.findIndex((c) => c === card);
                    newArr.splice(i, 1);
                });
                tableCards = newArr;
                // finally, de-select
                selectedCards = [];
                hint = '';
            }
        }
    }

    function handleCardChange(ev: CustomEvent<IGameEvent>) {
        if (ev.detail.type === GameEventType.CARD_SELECTED) {
            if(ev.detail.card === undefined) {
                throw new Error('card cannot be undefined for this event type');
            }
            const i = selectedCards.findIndex((c) => c === ev.detail.card);
            if (i > -1) {
                const newArr = [...selectedCards];
                newArr.splice(i, 1);
                selectedCards = newArr;
            } else {
                if (selectedCards.length >= 3) {
                    // do not allow selecting more than 3 cards
                    return;
                }

                const newArr = [...selectedCards, ev.detail.card];
                selectedCards = newArr;

                countPointsIfSet();
            }
        }
    }

    $: isSetModalOpen = (() => {
        return selectedCards.length === 3;
    })();

    $: tableHasSet = hasSet(tableCards);
 
    /**
     * Check if this is the end of the game
     */
    function checkIsGameOver(isDealt: boolean, deck: Card[], tableHasSet: boolean) {
        return isDealt && deck.length === 0 && !tableHasSet;
    }

    function handleGameOver(isGameOver: boolean) {
        if (isGameOver) {
            // process end of game stuff
            if (timerId) {
                window.clearInterval(timerId);
            }
            const gameResult = {
                score: points,
                elapsedTime: elapsedTime,
            };
            onGameOver(gameResult);
        }
    }

    $: isGameOver = checkIsGameOver(isDealt, deck, tableHasSet);
    /**
     * Execute this function dynamically when the isGameOver variable changes
     */
    $: handleGameOver(isGameOver);
</script>

<style>
    .game {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    .card-container {
        margin-bottom: 1rem;
        margin-top: 1rem;

        display: grid;
        /* there may be 3 or 4 rows */
        /* grid-template-rows: repeat(3, 1fr); */
        grid-template-columns: repeat(4, 1fr);
    }
</style>

<div class="game">
    <h2>Game Started (#{gameRandomSeed})</h2>
    <div>
        {#if !isDealt}
            <button type="button" on:click={handleDealDeck}>Deal</button>
        {/if}

        {#if isDealt && tableCards.length > 0}
            {#if isSetModalOpen && selectedCards.length === 3 }
                <IsSetModal selectedCards={selectedCards} />
            {/if}

            <div class="card-container">
                {#each tableCards as card, i}
                    <svelte:component this={CardElem} card={card} isSelected={selectedCards.includes(card)}
                        on:change={handleCardChange} />
                {/each}
            </div>
        {/if}

        {#if isDealt}
            <div>Points: {points}</div>
            <div>Elapsed Time: {elapsedTime}</div>
            <div>Deck size: {deck.length}</div>
            <div>Still a set? { tableHasSet }</div>
            {#if hint}
                <div>Hint: { hint }</div>
            {/if}
            <button on:click={handleShowHint}
                disabled={hint !== ''}>Show Hint</button>
            <button on:click={() => handleDealMore()}
                disabled={(tableCards.length === NUM_DEALT_CARDS) || tableHasSet}>Deal More</button>
            <button on:click={() => handleDealExtra()}
                disabled={(tableCards.length < NUM_DEALT_CARDS) || tableHasSet}>Deal Extra</button>
            <button on:click={handleRestartGame}>Restart Game</button>
        {/if}
    </div>
</div>