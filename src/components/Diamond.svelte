<script lang="ts">
    import { Pattern } from "$lib/card";

    export let colorName: string;
    export let pattern: Pattern;

    $: patternName = `diamond-${colorName}`;
</script>

<div data-color={colorName} data-pattern={pattern}>
    <svg viewBox="0 0 100 50" width="100" height="50" xmlns="http://www.w3.org/2000/svg">
        {#if pattern === Pattern.STRIPED}
            <defs>
                <pattern id={patternName} width="4" height="4" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill={colorName} />
                </pattern>
            </defs>
            <polygon points="50,0 100,25 50,50 0,25" fill={`url(#${patternName})`} />
        {:else if pattern === Pattern.OUTLINED}
            <polygon points="50,0 100,25 50,50 0,25" fill="white" stroke={colorName} />
        {:else}
            <polygon points="50,0 100,25 50,50 0,25" fill={colorName} />
        {/if}
    </svg>
</div>