<script lang="ts">
    import { Pattern } from "$lib/card";
    import SvgPattern from "./SvgPattern.svelte";

    export let colorName: string;
    export let pattern: Pattern;

    $: patternName = `triangle-${colorName}`;
</script>

<div data-color={colorName} data-pattern={pattern}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50" height="50">
        {#if pattern === Pattern.STRIPED}
            <svelte:component this={SvgPattern} colorName={colorName} patternName={patternName} />
            <polygon points="25,0 50,50 0,50" fill={`url(#${patternName})`} />
        {:else if pattern === Pattern.OUTLINED}
            <polygon points="25,0 50,50 0,50" fill="white" stroke={colorName} />
        {:else}
            <polygon points="25,0 50,50 0,50" fill={colorName} />
        {/if}
    </svg>
</div>
