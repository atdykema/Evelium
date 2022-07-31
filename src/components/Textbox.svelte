<script>
    export let type, top, left, height, width, canvasItems, id, mode

    let currentMode = 'move'


    if(mode === 'move'){
        currentMode = 'move'
        console.log('reload1')
    }else if (mode === 'resize'){
        currentMode = 'resize'
        console.log('reload')
    }
    

    let moving = false;
    let resizing = false;


    function getModeStart(){
        if (moveMode){
            isMoving()
        }
        else if (resizeMode){
            isResizing()
        }
        else{
            isMoving()
        }
    }

    function getMode(e){
        if (moveMode){
            onMove(e)
        }
        else if (resizeMode){
            onResize(e)
        }
    }

    function getModeEnd(){
        if (moveMode){
            noLongerMoving()
        }
        else if (resizeMode){
            noLongerResizing()
        }
    }



    //move mode
	function isMoving() {
		moving = true;
	}
	function onMove(e) {
		if (moving) {
			left += e.movementX;
			top += e.movementY;
		}
	}
	function noLongerMoving() {
        canvasItems[id]['top'] = top
        canvasItems[id]['left'] = left
		moving = false;
    }


    //resizing mode
    function isResizing() {
        resizing = true;
    }
    function onResize(e){
        if(resizing) {
            width += e.movementX;
            height += e.movementY;
        }
    }
    function noLongerResizing() {
        canvasItems[id]['width'] = width
        canvasItems[id]['height'] = height
		resizing = false;
    }



    /*
    function onKeyPress(e){
        
        switch(e.keyCode){
            case 113:
                console.log('move to resize')
                moveMode = false;
                resizeMode = true;
                break
            case 119:
                resizeMode = false;
                moveMode = true;
                break
            default:
                break
        }
        
    }
    */
    


</script>


<div contentEditable="true" on:mousedown={getModeStart} type="text" class="{type}" style="top:{top}px; left:{left}px; height:{height}px; width:{width}px"></div>


<svelte:window on:mouseup={getModeEnd} on:mousemove={getMode} />

<style>

    .textbox-0{
        border: 2px solid black;
        background-color: rgb(199, 199, 199);
        resize: none;
        outline: none;
        position: absolute;
        user-select: none;
		cursor: grab;
        overflow: hidden;
    }

    .textbox-0:focus{
        border: dashed 1px solid;
    }

</style>