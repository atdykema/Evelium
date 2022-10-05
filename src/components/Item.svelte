<script>
    import { v4 as uuidv4 } from 'uuid';
    export let myId
    import Item from "../components/Item.svelte";
    import { mainList, draggedItem, inItem} from '../infoStores.js'
    
    let contentCollapsed = 'auto;';

    let dropdown_attrs = 'height: 0px; opacity: 0%;'

    function addColumn(){
        let currId = uuidv4()
        console.log(currId)
        $mainList['projectData']['projectItems'][currId] = {id:currId, type:'column', title:'New column', content:[], status: null, priority: 'none', assignedDate: null, creationDate: Math.floor(new Date()/ 1000), isDragged: false}
        $mainList['projectData']['projectItems'][myId]['content'].push(currId)
        mainList.set($mainList)
        console.log($mainList)
    }

    function addNote(){
        let currId = uuidv4()
        $mainList['projectData']['projectItems'][currId] = {id:currId, type:'note', title:'New note', content:'some note text', status: null, priority: 'none', assignedDate: null, creationDate: Math.floor(new Date() / 1000), isDragged: false}
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

    function collapseContent(){
        if(contentCollapsed == 'height: 0px; opacity: 0%;'){
            contentCollapsed = 'height: auto; opacity: 100%;'
        }else{
            contentCollapsed = 'height: 0px; opacity: 0%;'
        }
        console.log(contentCollapsed)
    }

    function expandItemDropdown(){
        if( dropdown_attrs == 'height: 0px; opacity: 0%;'){
            dropdown_attrs = 'height: auto; opacity: 100%;'
        }else{
            dropdown_attrs = 'height: 0px; opacity: 0%;'
        }
        console.log( dropdown_attrs)
    }

    function onSelectChange(prop, value){
        $mainList['projectData']['projectItems'][myId][prop] = value
    }

</script>



<div class="container {$mainList['projectData']['projectItems'][myId]['type']}" draggable="true" id="{$mainList['projectData']['projectItems'][myId]['id']}" guid={$mainList['projectData']['projectItems'][myId]['id']} contentCollapsed={contentCollapsed} style="{$mainList['projectData']['projectItems'][myId]['status']} {$mainList['projectData']['projectItems'][myId]['zindex']};"
    on:dragstart={()=>{draggedItem.set($mainList['projectData']['projectItems'][myId]); $draggedItem=$draggedItem; console.log($draggedItem)}}
    on:dragend={()=>{
        if($inItem != null){
            $mainList[$inItem['id']]['content'].push($inItem['id']);
            $mainList = $mainList
            console.log($mainList[$inItem['id']]['content'])
        }
        draggedItem.set(null);
        inItem.set(null)
        }}
    on:dragenter={()=>{
        console.log('enter')
        if($draggedItem != null && $mainList['projectData']['projectItems'][myId]['type'] === 'column' && !$mainList['projectData']['projectItems'][myId]['content'].includes($draggedItem['id']) && myId != $draggedItem['id'] && ($inItem === null || $inItem['zindex'] < $mainList['projectData']['projectItems'][myId]['zindex'])){
            inItem.set($mainList['projectData']['projectItems'][myId]);
            console.log($inItem)
        }
        /*
        if($draggedItem != null && $mainList['projectData']['projectItems'][myId]['type'] === 'column' && !$mainList['projectData']['projectItems'][myId]['content'].includes($draggedItem['id']) && myId != $draggedItem['id']){
            $mainList['projectData']['projectItems'][myId]['content'].push($draggedItem['id']);
            mainList.set($mainList);
            $mainList=$mainList;
        }
        */
        }} 
    on:dragleave={()=>{
        if($inItem != null && myId === $inItem['id']){
            inItem.set(null);
            console.log($inItem)
        }
        /*
        if($draggedItem != null && $mainList['projectData']['projectItems'][myId]['type'] === 'column' && $mainList['projectData']['projectItems'][myId]['content'].includes($draggedItem['id'])){
            console.log('helllloo', $mainList['projectData']['projectItems'][myId]['content'])
            $mainList['projectData']['projectItems'][myId]['content'].splice([$mainList['projectData']['projectItems'][myId]['content'].findIndex((e)=>{e === $draggedItem['id']})], 1);
            mainList.set($mainList);
            $mainList=$mainList
        }*/
    }}>
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
        {#if $mainList['projectData']['projectItems'][myId]['priority'] != "none"}
            <div class="priority-container">
                {#if $mainList['projectData']['projectItems'][myId]['priority'] === "high"}
                    &#10071
                {:else if $mainList['projectData']['projectItems'][myId]['priority'] === "medium"}
                    &#9203
                {:else if $mainList['projectData']['projectItems'][myId]['priority'] === "low"}
                    &#128164
                {:else}
                    unknown priority
                {/if}
            </div>
        {/if}
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
            <div class="item-content item-editable" style="{contentCollapsed}">
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
        {/if}

        <div class="item-dropdown-button" on:click={expandItemDropdown}>V</div>
        <div class="item-dropdown-content" style="{dropdown_attrs}">
            <div class="item-dropdown-entry">
                <div>Status:</div>
                <form>
                    <label>Done
                        <input bind:group={$mainList['projectData']['projectItems'][myId]['status']} on:change={() => onSelectChange('status', "background-color: lightgreen;")} type="radio" name="status" value="background-color: lightgreen;">
                    </label>
                    <label>Working
                        <input bind:group={$mainList['projectData']['projectItems'][myId]['status']} on:change={() => onSelectChange('status', "background-color: yellow;")} type="radio" name="status" value="background-color: yellow;">
                    </label>
                    <label>Unassigned
                        <input bind:group={$mainList['projectData']['projectItems'][myId]['status']} on:change={() => onSelectChange('status', "background-color: white;")} type="radio" name="status" value="background-color: white;">
                    </label>
                </form>
            </div>
            <div class="item-dropdown-entry">
                <div>Priority:</div>
                <form>
                    <label>High
                        <input bind:group={$mainList['projectData']['projectItems'][myId]['priority']} on:change={() => onSelectChange('priority', "high")} type="radio" name="status" value='high'>
                    </label>
                    <label>Medium
                        <input bind:group={$mainList['projectData']['projectItems'][myId]['priority']} on:change={() => onSelectChange('priority', "medium")} type="radio" name="status" value='medium'>
                    </label>
                    <label>Low
                        <input bind:group={$mainList['projectData']['projectItems'][myId]['priority']} on:change={() => onSelectChange('priority', "low")} type="radio" name="status" value='low'>
                    </label>
                    <label>None
                        <input bind:group={$mainList['projectData']['projectItems'][myId]['priority']} on:change={() => onSelectChange('priority', "none")} type="radio" name="status" value='none'>
                    </label>
                </form>
            </div>
            <div class="item-dropdown-entry">
                    creationDate: {$mainList['projectData']['projectItems'][myId]['creationDate']}
            </div>
            <div class="item-dropdown-entry">
                    assignedDate: {$mainList['projectData']['projectItems'][myId]['assignedDate']}
            </div>
        </div>
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
        margin: auto 1rem auto 1rem;
        min-width: fit-content;
        overflow: hidden;
        width: 90%;

    }

    .item-editable{
        max-width: 30vw;
        width: 90%;
    }

    .item-properties{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

    }

    .column{
        border: rgba(0, 0, 0, .5) dashed 5px;
        margin: 1rem;
    }

    .note{
        text-align: center;
        border: black solid 1px;
        margin: 1rem;
        
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
        font: bold;
    }

    .text-content{
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        background-color: rgba(0, 0, 0, 0);
        border: none;
        overflow-wrap: anywhere;
        max-width: 90%;
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
        opacity: 0%;
        font-size: 2rem;
        z-index: 98;
        width: 80%;
    }

    .top-item-nav:hover{
        opacity: 75%;
    }

    .item-nav:hover{
        opacity: 75%;
    }

    .item-dropdown-button{
        height: 20px;
        opacity: 0%;
        width: 90%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .item-dropdown-button:hover{
        opacity: 100%;
    }

    .priority-container{
        font-size: 2rem;
        padding: .25rem;

    }



</style>