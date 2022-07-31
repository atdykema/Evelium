<script>
    import { onDestroy } from 'svelte';
    import { v4 as uuidv4 } from 'uuid';
    export let myId
    import Item from "../components/Item.svelte";
    import { mainList } from '../infoStores.js'

    let tempList = $mainList
    let contentCollapsed = 'auto';

    const unsubscribe = mainList.subscribe(v => {
        tempList = v
    })

    function addColumn(){
        let currId = uuidv4()
        console.log(currId)
        tempList[currId] = {id:currId, title:'New column', content:new Set(), type:'column'}
        tempList[myId]['content'].add(currId)
        mainList.update(v => tempList)
        console.log($mainList[myId]['content'])
        
        console.log(Object.values($mainList))
    }

    function addNote(){
        let currId = uuidv4()
        tempList[currId] = {id:currId, type:'note', title:'New note', content:'some note text', status:0}
        $mainList[myId]['content'].add(currId)
        mainList.update(v => tempList)
        console.log(Object.values($mainList))
    }

    function removeItem(itemId){
        console.log(itemId)
        console.log($mainList[itemId]['type'])
        if($mainList[itemId]['type'] === 'column'){
            let items = Array.from($mainList[itemId]['content'])
            console.log(items)
            for(let i = 0; i < items.length; i++){
                if($mainList[items[i]] !== undefined){
                    removeItem($mainList[items[i]]['id'])
                }
                $mainList[itemId]['content'].delete(items[i])
                mainList.update(v => $mainList)
            }
        }
        delete $mainList[itemId]
        mainList.update(v => $mainList)
    }

    function removeStaleId(id){
        $mainList[myId]['content'].delete(id)
        return ''
    }

    function toStatus(status){
        $mainList[myId]['status'] = status
        console.log($mainList[myId]['status'])
        mainList.update(v => $mainList)
    }

    function collapseContent(){
        if(contentCollapsed == 'height: 0px; opacity: 0%;'){
            contentCollapsed = 'height: auto; opacity: 100%;'
        }else{
            contentCollapsed = 'height: 0px; opacity: 0%;'
        }
        console.log(contentCollapsed)
    }

    onDestroy(unsubscribe)


</script>



<div class="container {$mainList[myId]['type']}" contentCollapsed={contentCollapsed} style="{$mainList[myId]['status']}">

    <div class="top-item-nav">
        <div class="collapse-button" on:click={collapseContent}>
            {#if contentCollapsed === 'height: 0px; opacity: 0%;'}
                &#9650
            {:else}
                &#9660
            {/if}
        </div>
        <div class="exit-button" on:click={removeItem(myId)}>
            X
        </div>
    </div>
    <div contenteditable class="item-title">
        {$mainList[myId]['title']}
    </div>
    {#if $mainList[myId]['type'] === 'column'}
        <div class="item-content" style="{contentCollapsed}">
            {#each Array.from($mainList[myId]['content']) as id}
                {#if $mainList[id] !== undefined}
                    <svelte:component this={Item} myId={$mainList[id]['id']}/>
                {:else}
                    {removeStaleId(id)}
                {/if}
            {/each}
        </div>
    {:else if $mainList[myId]['type'] === 'note'}
        <div class="item-content" style="{contentCollapsed}">
            <div contenteditable class="text-content">
                {$mainList[myId]['content']}
            </div>
        </div>
    {/if}

    {#if $mainList[myId]['type'] === 'column'}
        <div class="item-nav" id="item-add-nav">
            <div class="add-item-button" id="add-note-button" on:click={addNote}>
                Note
            </div>
            <div class="add-item-button" id="add-column-button" on:click={addColumn}>
                Column
            </div>
        </div>

    {:else if $mainList[myId]['type'] === 'note'}
        <div class="item-nav" id="item-status-nav">
            <div class="status-item-button" on:click={() => toStatus('background-color: lightgreen;')}>
                Done
            </div>
            <div class="status-item-button" on:click={() => toStatus('background-color: yellow;')}>
                working
            </div>
            <div class="status-item-button" on:click={() => toStatus('background-color: lightgray;')}>
                UnAs
            </div>
        </div>
    {/if}

</div>


<style>

    .container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: .5rem;
        width: fit-content;
        min-width: 20vw;
        overflow: hidden;
    }

    .column{
        background-color: beige;
        border: gray solid 1px;
    }

    .note{
        text-align: center;
        border: black dotted 1px;
    }

    .note:hover > .top-item-nav{
        opacity: 75%;
    }

    .note:hover > .item-nav{
        opacity: 75%;
    }

    .item-content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-width: 100%;
        margin: .25rem;
        padding: .25rem;


    }

    .item-nav{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        opacity: 0%;
        width: 90%;

    }

    .add-item-button{
        display: flex;
        flex-direction: column;
        margin: .25rem;
        padding: .25rem;
    }

    .top-item-nav{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: .5rem;
        width: 80%;
        opacity: 0%;
    }

    .top-item-nav:hover{
        opacity: 75%;
    }

    .item-nav:hover{
        opacity: 75%;
    }

    .item-title{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
    }

</style>