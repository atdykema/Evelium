


<script>

    export let results
    import { mainList } from '../infoStores'
    import Item from "./Item.svelte";
    import { scrollIntoView} from '../components/Bucket.svelte'
    console.log($mainList)
    console.log(results)
</script>


<div class="container">
    {#each Array.from(results) as id}
        {#if $mainList['projectData']['projectItems'][id] !== undefined}
            <a href="{"#" + $mainList['projectData']['projectItems'][id]['id']}" on:click={scrollIntoView}>
                <svelte:component this={Item} myId={$mainList['projectData']['projectItems'][id]['id']}/>
            </a>
        {/if}
    {/each}

</div>