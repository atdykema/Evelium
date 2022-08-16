


<script>

    export let results
    import { mainList } from '../infoStores'
    import Item from "./Item.svelte";

    console.log('results', results)
    
</script>


<div class="container">
    {#each Array.from(results) as id}
        {#if $mainList[id] !== undefined}
            <svelte:component this={Item} myId={$mainList[id]['id']}/>
        {/if}
    {/each}

</div>