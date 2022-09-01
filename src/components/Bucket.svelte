<script context='module'>
    export function scrollIntoView({ target }) {
        console.log(target)
        const el = document.querySelector(target.getAttribute('guid'));
        if (!el) return;
        el.scrollIntoView({behavior: "smooth", inline: "center"});
    }
    
</script>

<script>

    import { v4 as uuidv4 } from 'uuid';
    import Item from "../components/Item.svelte";
    import { mainList } from '../infoStores.js'
    

    function addColumn(){
        let currId = uuidv4()
        console.log(currId)
        $mainList[currId] = {id:currId, title:'New column', content:[], type:'column'}
        $mainList['stories'].push(currId)
        mainList.set($mainList)
        console.log($mainList)
        console.log($mainList['stories'])
    }

    function removeStaleId(id){
        $mainList['stories'].splice($mainList['stories'].findIndex((e) => {
            return e == id
        }), 1)
        return ''
    }


</script>



<div class="main-canvas-container">
    <div class="main-canvas">
        {#each $mainList['stories'] as id}
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
        /*border: orange 1px solid;*/
        height: 100%;
        box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2); 
        border-radius: 5px;
        background-color: rgba(255, 255, 255, .15);
        backdrop-filter: blur(5px);
    }

    .main-canvas{
        display: flex;
        flex-direction: row;
        /*border: orange 1px solid;*/
        max-height: 99vh;
        padding: 1rem;
        overflow-y: scroll;
        height: 100%;
        min-width: 100vw;
        
    }

    .add-column-button{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        margin: 1rem;
        min-height: 80vh;
    }

</style>