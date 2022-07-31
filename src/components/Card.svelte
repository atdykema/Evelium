<script>
    import {fade} from 'svelte/transition';
</script>

<div class="container">

    <div class="body">
        <slot>
        
        </slot>
    </div>


</div>

<style>

    .container{
        display: flex;
        flex-direction: column;
        text-align: center;
        border: 1px red solid;
        border-radius: 20px;
        margin: 2rem;
        padding: 2rem;
        background-color: bisque;
        width: 50%;
    }

    .body{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        overflow-wrap: anywhere;
    }

</style>