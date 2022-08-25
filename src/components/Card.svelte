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
        color: #0d0019;
        display: flex;
        flex-direction: column;
        text-align: center;
        border: 5px #f1dfff solid;
        border-radius: 20px;
        margin: 2rem;
        padding: 2rem;
        background-color: #be82ff;
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