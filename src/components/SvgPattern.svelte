<script lang="ts">
    export let patternName: string;
    export let colorName: string;
</script>

<defs>
    <pattern id={patternName} width="4" height="4" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill={colorName} />
    </pattern>
</defs>