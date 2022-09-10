<script>
    export let myId
    import Item from "../components/Item.svelte";
    import { v4 as uuidv4 } from 'uuid';
    import { mainList } from '../infoStores.js'

    let contentCollapsed = 'auto';

    function addColumn(){
        let currId = uuidv4()
        console.log(currId)
        $mainList['projectData']['projectItems'][currId] = {id:currId, title:'New column', content:[], type:'column', assignedDate: null, priority: 'none', creationDate: Math.floor(new Date()/ 1000), isDragged: false}
        $mainList['projectData']['projectItems'][myId]['content'].push(currId)
        mainList.set($mainList)
        console.log($mainList)
    }

    function addNote(){
        let currId = uuidv4()
        $mainList['projectData']['projectItems'][currId] = {id:currId, type:'note', title:'New note', content:'some note text', status:0, priority: 'none', assignedDate: null, creationDate: Math.floor(new Date() / 1000), isDragged: false}
        $mainList['projectData']['projectItems'][myId]['content'].push(currId)
        mainList.set($mainList)
        console.log($mainList)
    }

    function removeItem(itemId){
        console.log(itemId)
        console.log('hello')
        if($mainList['projectData']['projectItems'][itemId]['type'] === 'column'){
            let items = $mainList['projectData']['projectItems'][itemId]['content']
            console.log(items)
            for(let i = 0; i < items.length; i++){
                console.log(items)
                if($mainList['projectData']['projectItems'][items[i]] !== undefined){
                    removeItem($mainList['projectData']['projectItems'][items[i]]['id'])
                }

                $mainList['projectData']['projectItems'][itemId]['content'].splice($mainList['projectData']['projectItems'][itemId]['content'].findIndex((e) => {
                    return e == items[i]
                }), 1)
                mainList.set($mainList)
            }
        }
        console.log($mainList['projectData']['projectItems'][itemId])
        delete $mainList['projectData']['projectItems'][itemId]
        if($mainList['projectData']['projectItems']['stories'].includes(itemId)){
            $mainList['projectData']['projectItems']['stories'].splice($mainList['projectData']['projectItems']['stories'].findIndex((e) => {
                return e == itemId
            }), 1)
        }
        mainList.set($mainList)
        console.log($mainList['projectData']['projectItems']['stories'])
    }

    function removeStaleId(id){
        $mainList['projectData']['projectItems'][myId]['content'].splice($mainList['projectData']['projectItems'][myId]['content'].findIndex((e) => {
            return e == id
        }), 1)
        return ''
    }

    function toStatus(status){
        $mainList['projectData']['projectItems'][myId]['status'] = status
        console.log($mainList['projectData']['projectItems'][myId]['status'])
        mainList.set($mainList)
    }

    function collapseContent(){
        if(contentCollapsed == 'height: 0px; opacity: 0%; width: 40vw;'){
            contentCollapsed = 'height: auto; opacity: 100%; width: auto;'
        }else{
            contentCollapsed = 'height: 0px; opacity: 0%; width: 40vw;'
        }
        console.log(contentCollapsed)
    }


</script>



<div class="container {$mainList['projectData']['projectItems'][myId]['type']}" id="{$mainList['projectData']['projectItems'][myId]['id']}" guid={$mainList['projectData']['projectItems'][myId]['id']} contentCollapsed={contentCollapsed} style="{$mainList['projectData']['projectItems'][myId]['status']}">
    <div class="item-properties">
        <div class="top-item-nav">
            <div class="collapse-button" on:click={collapseContent}>
                {#if contentCollapsed === 'height: 0px; opacity: 0%; width: 40vw;'}
                    &#9650
                {:else}
                    &#9660
                {/if}
            </div>
            <div class="exit-button" on:click={removeItem(myId)}>
                X
            </div>
        </div>
        <div class="item-title item-editable" contenteditable bind:textContent={$mainList['projectData']['projectItems'][myId]['title']}></div>
        {#if $mainList['projectData']['projectItems'][myId]['type'] === 'column'}
            <div class="item-content" style="{contentCollapsed}">
                {#each Array.from($mainList['projectData']['projectItems'][myId]['content']) as id}
                    {#if $mainList['projectData']['projectItems'][id] !== undefined}
                        <svelte:component this={Item} myId={$mainList['projectData']['projectItems'][id]['id']}/>
                    {:else}
                        {removeStaleId(id)}
                    {/if}
                {/each}
            </div>
        {:else if $mainList['projectData']['projectItems'][myId]['type'] === 'note'}
            <div class="item-content" style="{contentCollapsed}">
                <div class="text-content" contenteditable bind:textContent={$mainList['projectData']['projectItems'][myId]['content']}></div>
            </div>
        {/if}

        {#if $mainList['projectData']['projectItems'][myId]['type'] === 'column'}
            <div class="item-nav" id="item-add-nav">
                <div class="add-item-button" id="add-note-button" on:click={addNote}>
                    Note
                </div>
                <div class="add-item-button" id="add-column-button" on:click={addColumn}>
                    Column
                </div>
            </div>

        {:else if $mainList['projectData']['projectItems'][myId]['type'] === 'note'}
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
</div>


<style>

    *{
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
        font-size: 62.5%;
        font-family: Arial, Helvetica, sans-serif;
    }

    .container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: auto 0.5rem auto 0.5rem;
        min-width: max-content;
        width: fit-content;
        overflow: hidden;

    }

    .item-properties{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

    }

    .column{
        
        
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
        flex-direction: row;
        justify-content: start;
        align-items: start;
        min-width: 100%;
        margin: .25rem;
        padding: .25rem;
    }

    .item-title{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 1.5rem;
        background-color: rgba(0, 0, 0, 0);
        border: none;
        overflow-wrap: anywhere;
        width: 50%;
        font-size: 50px;
        
    }

    .text-content{
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        background-color: rgba(0, 0, 0, 0);
        border: none;
        width: 25vw;
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
        font-size: 2rem;
        z-index: 98;
    }

    .top-item-nav:hover{
        opacity: 75%;
    }

    .item-nav:hover{
        opacity: 75%;
    }

</style>