<script lang="ts">
    export let handler = (_: Event) => {}
    export let value: number = 0;
</script>

<input
    bind:value={value}
    type="number"
    on:input={handler}
    min="0"
    class="input"
/>

<style>
    .input {
        border-radius: 10px;
        padding: 5px;
        border: 0;
        box-shadow: 1px -1px 4px black;
    }
</style>