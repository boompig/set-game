<script lang="ts">
    import type { IGameResult } from '$lib/game-events';
    import { onMount } from 'svelte';
    import Game from '../components/Game.svelte';

    /**
     * Global state - whether the game has been started
     */
    let isGameStarted = false;
    /**
     * User input for random seed
     */
    let randomSeed = 0;
    /**
     * The random seed for the current game
     */
    let gameRandomSeed = 0;
    let startGameErrorMsg = '';
    let highScore: IGameResult | null = null;

    function startGame(e: any) {
        if (!randomSeed) {
            startGameErrorMsg = 'Random seed is required';
            return;
        } else {
            gameRandomSeed = randomSeed;
            startGameErrorMsg = '';
            // get the random seed
            isGameStarted = true;
        }
        e.preventDefault();
    }

    function changeRandomSeed(e: any) {
        randomSeed = Number.parseInt(e.target.value);
    }

    function handleGameOver(gameResult: IGameResult) {
        if ((!highScore) || gameResult.elapsedTime < highScore.elapsedTime) {
            // we have a new high score
            highScore = {
                score: gameResult.score,
                elapsedTime: gameResult.elapsedTime,
            };

            // write to localStorage
            window.localStorage.setItem('set:score', JSON.stringify(highScore));
        }
    }

    /**
     * Svelte lifecycle method
     */
    onMount(() => {
        const v = window.localStorage.getItem('set:score');
        if (v) {
            const savedScore = JSON.parse(v) as IGameResult;
            highScore = savedScore;
        }
    });
</script>

<style>
    .page-wrapper {
        max-width: 800px;
        margin: 0 auto;
    }

    h1 {
        margin-bottom: .5rem;
        margin-top: .5rem;
    }
</style>

<div class="page-wrapper">
    <h1>Set Game</h1>

    {#if highScore}
        <section>
            <div>HS time: {highScore.elapsedTime}</div>
        </section>
    {/if}

    <form>
        {#if startGameErrorMsg}
            <div>Error: { startGameErrorMsg }</div>
        {/if}
        <input type="text" name="random_seed" placeholder="game random seed" min="1" max="65536"
            on:change={changeRandomSeed} />
        <button type="submit" on:click={startGame}>Start Game</button>
    </form>

    <!-- show this when the game is dealt -->
    {#if isGameStarted && gameRandomSeed !== 0 }
        <svelte:component this={Game} gameRandomSeed={gameRandomSeed} onGameOver={handleGameOver}/>
    {/if}
</div>