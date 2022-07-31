<script>
    import { v4 as uuidv4 } from 'uuid';
    import Textbox from "../components/Textbox.svelte";
    
    let currentCreateMode = 'createTextbox'
    let currentEditMode = 'move'
    let canvasItems = {}
    let m = { x: 0, y: 0 };

	function getPointer(event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}

    function doubleClickHandle(){
        if (currentCreateMode === 'createTextbox'){
            let currId = uuidv4()
            canvasItems[currId] = { id:currId, type:'textbox-0', top: m.y, left: m.x, height: 20, width: 100, content:'', mode: currentEditMode};
        }
    }
    
    function changeToMode(currMode){
        for(let i = 0; i < canvasItems.length; i++){
            canvasItems[i].mode = currMode
        }
        console.log('j')
    }

</script>

<div class="toolbar-top">
    <div class="toolbar-button" id="move-toolbar-button" on:click={() => {changeToMode('move')}}>
        Move
    </div>
    <div class="toolbar-button" id="resize-toolbar-button" on:click={() => {changeToMode('resize')}}>
        Resize
    </div>
</div>


<div class="main-canvas" on:mousemove={getPointer} on:dblclick={doubleClickHandle}>
    <div class="main-canvas-container" bind:this={currentEditMode} canvasItems={canvasItems}>
        {#each Object.values(canvasItems) as item}
                <svelte:component this={Textbox} id={item['id']} canvasItems={canvasItems} type={item['type']} top={item['top']} left={item['left']} height={item['height']} width={item['width']} mode={item['mode']}/>
        {/each}
    </div>
</div>


<style>

    .main-canvas{
        display: flex;
        flex-direction: column;
        width: 99vw;
        height: 93vh;
        border: solid 1px orange;
    }

    .main-canvas-container{
        display: flex;
        flex-direction: column;
        width: 99vw;
        height: 98vh;
        border: solid 1px black;
    }

    .toolbar-top{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        border: 1px red solid;
        margin: 1vh;
    }

</style>