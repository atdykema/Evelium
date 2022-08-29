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
        margin: 2rem;
        padding: 2rem;
        width: 50%;
        box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2);
        border-radius: 20px;
        background-color: rgba(255, 255, 255, .15);
        backdrop-filter: blur(5px);
        border: #faf9f5 5px solid;
        color:#faf9f5;
        max-height: 50vh;
        overflow-y: scroll;
        
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