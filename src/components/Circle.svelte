<script lang="ts">
    import { Pattern } from "$lib/card";
    import SvgPattern from "./SvgPattern.svelte";

    export let colorName: string;
    export let pattern: Pattern;

    $: patternName = `circle-${colorName}`;
</script>

<div data-color={colorName} data-pattern={pattern}>
    <svg viewBox="0 0 50 50" width="50" height="50" xmlns="http://www.w3.org/2000/svg">
        {#if pattern === Pattern.STRIPED}
            <svelte:component this={SvgPattern} colorName={colorName} patternName={patternName} />
            <circle cx="25" cy="25" r="25" fill={`url(#${patternName})`} />
        {:else if pattern === Pattern.OUTLINED}
            <circle cx="25" cy="25" r="25" fill="white" stroke={colorName} />
        {:else}
            <circle cx="25" cy="25" r="25" fill={colorName} />
        {/if}
    </svg>
</div>