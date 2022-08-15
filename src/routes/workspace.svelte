<script>
    import Bucket from "../components/bucket.svelte";
    import { mainList } from "../infoStores.js"

    

</script>

<body>
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

    </div>
</div>
</body>

<style>

    body{
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
    }

    .tools-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: red solid 1px;
        width: 28vw;
        height: 100%;
    }

    .container{
        display: flex;
        flex-direction: row;
        border: solid orange 1px;
        justify-content: start;
        align-items: center;
        width: 98vw;
        height: 96vh;
        overflow-y: hidden;
    }

    .bucket-container{
        display: flex;
        flex-direction: row;
        border: solid orange 1px;
        justify-content: start;
        align-items: center;
        width: 70vw;
        height: 96vh;
        overflow-y: hidden;
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