<script>
    export let func, text
</script>

<div class="container" on:click={func}>
    <div class="main-button">
        {text}
    </div>
</div>

<style>

    .container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: blue 1px solid;
    }

</style>