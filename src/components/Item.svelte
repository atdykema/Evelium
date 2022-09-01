<script>
    import { v4 as uuidv4 } from 'uuid';
    export let myId
    import Item from "../components/Item.svelte";
    import { mainList } from '../infoStores.js'

    import { scrollIntoView } from '../components/Bucket.svelte'
    
    let contentCollapsed = 'auto';

    function addColumn(){
        let currId = uuidv4()
        console.log(currId)
        $mainList['projectData']['projectItems'][currId] = {id:currId, type:'column', title:'New column', content:[], type:'column', assignedDate: new Date(), creationDate: Math.floor(new Date()/ 1000)}
        $mainList['projectData']['projectItems'][myId]['content'].push(currId)
        mainList.set($mainList)
        console.log($mainList)
    }

    function addNote(){
        let currId = uuidv4()
        $mainList['projectData']['projectItems'][currId] = {id:currId, type:'note', title:'New note', content:'some note text', status:0, assignedDate: new Date(), creationDate: Math.floor(new Date() / 1000)}
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
        if(contentCollapsed == 'height: 0px; opacity: 0%;'){
            contentCollapsed = 'height: auto; opacity: 100%;'
        }else{
            contentCollapsed = 'height: 0px; opacity: 0%;'
        }
        console.log(contentCollapsed)
    }


</script>



<div class="container {$mainList['projectData']['projectItems'][myId]['type']}" id="{$mainList['projectData']['projectItems'][myId]['id']}" guid={$mainList['projectData']['projectItems'][myId]['id']} contentCollapsed={contentCollapsed} style="{$mainList['projectData']['projectItems'][myId]['status']}">
    <div class="item-properties">
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
            {$mainList['projectData']['projectItems'][myId]['title']}
        </div>
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
                <div contenteditable class="text-content">
                    {$mainList['projectData']['projectItems'][myId]['content']}
                </div>
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

    .container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: auto 0.5rem auto 0.5rem;

        width: fit-content;
        min-width: 20vw;
        overflow: hidden;

    }

    .item-properties{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

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