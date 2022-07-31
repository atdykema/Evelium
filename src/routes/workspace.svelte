<script>
    import { writable } from "svelte/store";
    import Bucket from "../components/bucket.svelte";
    import { v4 as uuidv4 } from 'uuid';
    import FolderTab from "../components/FolderTab.svelte"
    import {bucketList} from '../infoStores.js'

    if (Object.keys($bucketList).length === 0){
        let currId = uuidv4()
        $bucketList[currId] = writable({})
        bucketList.update(v => $bucketList)
    }

    //let currBucket = Object.keys($bucketList)[0]

    console.log($bucketList)


</script>

<div class="container">
    <div class="toolbar-left">
        <div class="toolbar-button" id="move-toolbar-button" on:click={() => {}}>
            New
        </div>
        <div class="toolbar-button" id="resize-toolbar-button" on:click={() => {}}>
            Open
        </div>
    </div>

    <div class="main-container">
        <div class="folder-nav">
            {#each Object.keys($bucketList) as bucket}
                <FolderTab class="folder-tab" uid={bucket}></FolderTab>
            {/each}
        </div>
        <Bucket></Bucket>
    </div>
</div>

<style>

    .container{
        display: flex;
        flex: row;
        border: solid orange 1px;
        justify-content: center;
        align-items: center;
        min-width: 99vw;
        width: fit-content;
    }

    .main-container{
        display: flex;
        flex-direction: column;
        border: red solid 1px;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .folder-nav{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;
        width: 100%;
    }

    .folder-tab{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: .25rem;
        border: black solid 1px;
    }

    .toolbar-left{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        height: 90vh;
    }

</style>