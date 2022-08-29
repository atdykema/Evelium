


<script>

    export let results
    import { mainList } from '../infoStores'
    import Item from "./Item.svelte";
    import { scrollIntoView} from '../components/Bucket.svelte'
    
</script>


<div class="container">
    {#each Array.from(results) as id}
        {#if $mainList[id] !== undefined}
            <a href="{"#" + $mainList[id]['id']}" on:click={scrollIntoView}>
                <svelte:component this={Item} myId={$mainList[id]['id']}/>
            </a>
        {/if}
    {/each}

</div>