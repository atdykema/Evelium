<script>
    export let href, text
</script>

<a class="container" href="{href}">
    {text}
</a>


<style>

    .container{
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        margin: .5rem;
        font-size: 2rem;
        text-align: center;
        text-decoration: none;
        color: black;
        transition: .3s;
        width: 80%;
        color: #faf9f5;
    }

    .container:hover{
        color: black;
        background-color: #faf9f5;
        opacity: 50%;
    }

</style>