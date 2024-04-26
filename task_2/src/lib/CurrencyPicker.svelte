<script lang="ts">
    import { CURRENCIES } from '../consts/index'


    export let handler = (_: Event) => {}
    export let value: typeof CURRENCIES[number] = CURRENCIES[0];

</script>


<select 
    bind:value={value}
    on:change={handler}
    class="select"
>
	{#each CURRENCIES as value}<option {value}>{value}</option>{/each}
</select>

<style>
    .select {
        border-radius: 10px;
        padding: 5px;
        border: 0;
        box-shadow: 1px -1px 4px black;
    }
</style>