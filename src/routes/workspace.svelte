<script>
    import Bucket from "../components/bucket.svelte";
    import { mainList } from "../infoStores.js"
    import Item from "../components/Item.svelte"
    import Results from "../components/Results.svelte"
    import { Datepicker } from 'svelte-calendar';

    let currQueryResults = new Set()

    let toolsCollapse = 'width 25vw; display: flex;'

    function collapseTools(){
        if(toolsCollapse == 'width: 0px; display: none;'){
            toolsCollapse = 'width: 25vw; display: flex;'
        }else{
            toolsCollapse = 'width: 0px; display: none;'
        }
        console.log(toolsCollapse)
    }

    function retrieveItemList(property, value, itemsToSearch = $mainList['stories']){

        
        let temp = itemsToSearch
        itemsToSearch = []
        console.log(temp)
        for (var it = temp.values(), val= null; val=it.next().value; ) {
            console.log(val);
            itemsToSearch.push(val)
        }

        console.log(itemsToSearch)
        itemsToSearch.forEach(itemId => {
            console.log($mainList[itemId]['type'])
            if($mainList[itemId]['type'] === 'note'){
                console.log(property)
                console.log($mainList[itemId])
                console.log($mainList[itemId][property])
                console.log($mainList[itemId][property], value)
                if($mainList[itemId][property] === value){
                    currQueryResults.add(itemId)
                    currQueryResults = currQueryResults
                    console.log('hello', currQueryResults)
                }
            }else{
                let items = $mainList[itemId]['content']
                console.log(items)

                
                let temp1 = items
                items = []
                for (var it = temp1.values(), val= null; val=it.next().value; ) {
                    console.log(val);
                    items.push(val)
                }
                

                for(let i = 0; i < items.length; i++){
                    console.log($mainList[items[i]])
                    if($mainList[items[i]] !== undefined){
                        retrieveItemList(property, value, $mainList[itemId]['content'])
                        
                    }
                }
            }
        })
        console.log(currQueryResults)
    }

    function OnSubmit(e){

        currQueryResults = new Set()

        const formData = new FormData(e.target)

        let property = formData.get('query-property')
        let value = formData.get('query-value')
        console.log(property)
        console.log(value)
        
        /*
        for (const field of formData.entries()){
            const [key, val] = field
            console.log(key, val)
            property = key
            value = val
        }
        */

        retrieveItemList(property, value)


    }
    

</script>
<div class="wrapper">
<div class="container">
    <div class="toolbar-left-container">
        <div class="toolbar-left">
            <div class="toolbar-button" id="new-toolbar-button" on:click={() => {}}>
                New
            </div>
            <div class="toolbar-button" id="open-toolbar-button" on:click={() => {}}>
                Open
            </div>
            <a class="toolbar-button" id="save-toolbar-button">
                Save
            </a>
        </div>
    </div>
    <div class="bucket-container">
        <Bucket></Bucket>
    </div>
    <div class="tools-container">
        <div class="collapse-tools-button" on:click={collapseTools}>
            {#if toolsCollapse === 'width: 0px; display: none;'}
                +--
            {:else}
                --+
            {/if}
        </div>
        <div class="main-tools-container" collapse={toolsCollapse} style="{toolsCollapse}">
            <div class="search-tool-container">
                <div class="search-input">
                    <div class="container-title">New query</div>
                    <form on:submit|preventDefault={OnSubmit}>
                        <div>
                            <label for="query">Property</label>
                            <input
                                type="text"
                                id="query-property"
                                name="query-property"
                                value=""
                            />
                        </div>
                        <div>
                            <label for="query">Value</label>
                            <input
                                type="text"
                                id="query-value"
                                name="query-value"
                                value=""
                            />
                        </div>
                        <button type="submit">Query</button>
                    </form>
                </div>
                <div class="search-output">
                    {#key currQueryResults}
                        <Results results={currQueryResults}></Results>
                    {/key}
                </div>
            </div>
        </div>
    
    </div>
</div>
</div>

<style>

:global(html){
        display: flex;
        height: 100%;
        width: 100%;
        scroll-behavior: smooth;
        justify-content: center;
        align-items: center;
        margin: 0;
    }
    :global(body){
        display: flex;
        min-height: 100%;
        min-width: 100%;
        margin: 0;
        scroll-behavior: smooth;

        justify-content: center;
        align-items: center;
    }

    :global(div){
        scroll-behavior: smooth
    }

    :global(body > div) {
        width: 100%;
        height: 100%;
        margin: 0;
    }

    .wrapper{
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        margin: 0;
        height: 100%;
        
    }

    .collapse-tools-button{
        display: flex;
        flex-direction: column;
        width: 30px;
        height: 250px;
        border: orange 1px solid;
        justify-content: center;
        align-items: center;
    }

    

    .main-tools-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        border: red solid 1px;
        width: 25vw;
        min-height: 20vh;
    }

    .search-tool-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: black 1px solid;
        width: 100%;
    }

    .search-input{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: purple 1px solid;
        width: 100%;
        height: fit-content;
    }

    .search-output{
        display: flex;
        flex-direction: column;
        align-items: center;
        border: red 1px solid;
        max-height: 50vh;
        overflow-y: scroll;
    }

    .tools-container{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        border: red solid 1px;
        height: 100%;
        
    }

    .container{
        display: flex;
        flex-direction: row;
        border: solid orange 1px;
        justify-content: start;
        align-items: center;
        width: 100%;
        height: 100%;
        overflow-y: hidden;
    }

    .bucket-container{
        display: flex;
        flex-direction: row;
        border: solid orange 1px;
        justify-content: start;
        align-items: center;
        height: 100%;
        overflow-y: hidden;
        min-width: 65vw;
        width: 100%;
    }

    .toolbar-left{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        height: 100%

    }

    .toolbar-left-container{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 90vh;
        margin: 0vh 1vw 0vh 1vw;
    }

</style>