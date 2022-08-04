<script>

    import { v4 as uuidv4 } from 'uuid';
    import Item from "../components/Item.svelte";
    import { mainList } from '../infoStores.js'
    
    function addColumn(){
        let currId = uuidv4()
        console.log(currId)
        $mainList[currId] = {id:currId, title:'New column', content:new Set(), type:'column'}
        $mainList['stories'].add(currId)
        mainList.update(v => $mainList)
        
        console.log(Object.values($mainList))
        console.log($mainList['stories'])
    }

    function removeStaleId(id){
        $mainList['stories'].delete(id)
        return ''
    }


</script>



<div class="main-canvas-container">
    <div class="main-canvas">
        
        {#each Array.from($mainList['stories']) as id}
            {#if $mainList[id] !== undefined}
                <svelte:component this={Item} myId={$mainList[id]['id']}/>
            {:else}
                {removeStaleId(id)}
            {/if}
        {/each}

        <div class="add-column-button" on:click={addColumn}>
            +>
        </div>
        
    </div>
</div>


<style>

    .main-canvas-container{
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: flex-start;
        border: black solid 1px;
        width: 100%;
    }

    .main-canvas{
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        border: pink solid 2px;
        min-height: 90vh;
        max-width: fit-content;
        width: 100%;
        padding: 1rem;
    }

    .add-column-button{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: gray solid 1px;
        margin: 1rem;
        min-height: 80vh;
    }

</style>