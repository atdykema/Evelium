<script>

    import { newItemAttrs } from '../infoStores.js'

    function OnSubmit(e){


        const formData = new FormData(e.target)

        const data = {}
        for (const field of formData.entries()){
            const [key, value] = field
            console.log(key, value)
            data[key] =value
        }

        newItemAttrs.set(data)
        console.log($newItemAttrs)

        hide()


    }

    let shown = false

    export function show(){
        shown = true
    }

    export function hide(){
        shown = false
    }

</script>

{#if shown}
    <div class="container">
        <div class="container-title">Create new item</div>
        <form on:submit|preventDefault={OnSubmit}>
        <div>
            <label for="new-item">Title</label>
            <input
            type="text"
            id="item-title"
            name="item-title"
            value=""
            />
        </div>
        <div>
        <label for="new-item">Content</label>
        <input
            type="text"
            id="item-content"
            name="item-content"
            value=""
        />
    </div>
        <button type="submit">Create</button>
    </form>

    </div>
{/if}

<style>
    .container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px black solid;
        background-color: lightcoral;
        width: 30vh;
        height: 30vh;
        position: fixed;
        z-index: 9999;

    }
</style>