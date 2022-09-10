<script>
    import Bucket from "./bucket.svelte";
    import Results from "./Results.svelte"
    import {onMount} from 'svelte'
    import {mainList, session, mouseCoords} from '../infoStores'
    import {db} from '../firebase'
    import { collection, doc, getDoc, setDoc, getDocs} from "firebase/firestore";
    export let paramList

    mainList.set(paramList)

    console.log($mainList)

    let currQueryResults = new Set()

    let loading = false

    let toolsCollapse = 'width 25vw; display: flex;'

    function collapseTools(){
        if(toolsCollapse == 'width: 0px; display: none;'){
            toolsCollapse = 'width: 25vw; display: flex;'
        }else{
            toolsCollapse = 'width: 0px; display: none;'
        }
    }

    function retrieveItemList(property, value, itemsToSearch = $mainList['projectData']['projectItems']['stories']){

        console.log(itemsToSearch)
        itemsToSearch.forEach(itemId => {
            console.log($mainList['projectData']['projectItems'][itemId]['type'])
            if($mainList['projectData']['projectItems'][itemId]['type'] === 'note'){
                if($mainList['projectData']['projectItems'][itemId][property] === value){
                    currQueryResults.add(itemId)
                    currQueryResults = currQueryResults
                    console.log('hello', currQueryResults)
                }
            }else{
                let items = $mainList['projectData']['projectItems'][itemId]['content']
                

                for(let i = 0; i < items.length; i++){
                    console.log($mainList['projectData']['projectItems'][items[i]])
                    if($mainList['projectData']['projectItems'][items[i]] !== undefined){
                        retrieveItemList(property, value, $mainList['projectData']['projectItems'][itemId]['content'])
                        
                    }
                }
            }
        })
        console.log(currQueryResults)
    }

    async function saveProject(list){
        loading = true
        await setDoc(doc(db, "users", $session['user']['uid'], "userProjects", paramList['projectId']), {
            projectData: {projectItems: list['projectData']['projectItems'], projectStories: list['projectData']['projectItems']['stories']},
            projectName: paramList['projectName'],
            projectId: paramList['projectId']
        });
        loading = false
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

    function getMouseCoords(event){
        mouseCoords.set([event.clientX, event.clientY])
        console.log($mouseCoords)
    }
    

</script>
<svelte:head></svelte:head>
<div class="wrapper">
    {#if loading}
    <div>Loading</div>
    {:else}
    <div class="container">
        <div class="toolbar-left-container">
            <div class="toolbar-left">
                <a class="toolbar-button" id="save-toolbar-button" on:click={() => {saveProject($mainList)}}>
                    Save
                </a>
            </div>
        </div>
        <div class="bucket-container" on:mousemove={getMouseCoords}>
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
{/if}
</div>

<style>


    .wrapper{
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        margin: 0;
        max-height: 100%;
        height: 98%;
        
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
        height: 100%;
        margin: 0vh 1vw 0vh 1vw;
    }

</style>