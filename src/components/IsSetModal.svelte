<script lang="ts">
    import type { Card } from "$lib/card";
    import { isValidSet } from "$lib/set-utils";

    export let selectedCards: Card[];

    $: isSet = isValidSet(selectedCards);
</script>

<style>
    .is-set-modal {
        color: purple;
        font-size: 2rem;
        font-weight: 600;
    }
</style>

<div class="is-set-modal">
    {#if isSet}
        Selected cards form a set
    {:else}
        Selected cards DO NOT form a set
    {/if}
</div>