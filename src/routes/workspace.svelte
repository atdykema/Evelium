<script>
    import Bucket from "../components/bucket.svelte";
    import { mainList } from "../infoStores.js"

    

</script>

<div class="container">
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
        <Bucket></Bucket>
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