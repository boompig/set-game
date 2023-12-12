<style>
    .card {
        width: 150px;
        height: 200px;
        font-size: 2rem;
        font-weight: bold;
        border: 1px solid black;
        border-radius: 4px;
        padding: 1rem;
        margin-bottom: 0.5rem;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        justify-content: space-around;
    }

    .card-selected {
        background-color: yellow;
    }

    .card-red {
        color: red;
    }

    .card-blue {
        color: blue;
    }

    .card-green {
        color: green;
    }
</style>

<script lang="ts">
    import { Shape, Pattern, Color, Card } from "$lib/card";
    import { type IGameEvent, GameEventType } from "$lib/game-events";
    import { createEventDispatcher } from "svelte";
    import Circle from './Circle.svelte';
    import Diamond from './Diamond.svelte';
    import Triangle from './Triangle.svelte';

    export let card: Card;
    export let isSelected: boolean;

    const dispatch = createEventDispatcher();

    function handleSelect() {
        console.log('dispatched change event');
        dispatch('change', {
            card: card,
            type: GameEventType.CARD_SELECTED,
        } as IGameEvent);
    }

    function getStringKeys(T: any): string[] {
        return Object.keys(T).filter((v) => isNaN(Number(v)));
    }
    const colors = getStringKeys(Color);
    const shapes = getStringKeys(Shape);
    const patterns = getStringKeys(Pattern);

    $: colorClass = colors[(card.color as unknown) as number - 1].toString().toLowerCase();
    $: shapeClass = shapes[(card.shape as unknown) as number - 1].toString().toLowerCase();
    $: patternClass = patterns[(card.pattern as unknown) as number - 1].toString().toLowerCase();
    $: dynamicClass = `card card-${colorClass} card-${shapeClass} card-${patternClass}`;
</script>

<div class={dynamicClass} on:click={handleSelect} class:card-selected={isSelected}>
    {#each new Array(card.number) as _, i}
        {#if shapeClass === 'circle'}
            <svelte:component this={Circle} colorName={colorClass} pattern={card.pattern} />
        {:else if shapeClass === 'diamond'}
            <svelte:component this={Diamond} colorName={colorClass} pattern={card.pattern} />
        {:else}
            <svelte:component this={Triangle} colorName={colorClass} pattern={card.pattern} />
        {/if}
    {/each}
</div>