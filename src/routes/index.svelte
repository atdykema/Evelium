<script>
    import Button from "../components/Button.svelte";
    import Card from "../components/Card.svelte";
    import {googleLogin} from "../firebase"
    import {session} from "../infoStores"
    import {get} from 'svelte/store'

    let infoCurrTab = 1

    function infoTabClick(index){
        infoCurrTab = index
    }

</script>

<svelte:head><style>html{
    overflow: auto;
}</style></svelte:head>
<div class="main-container">

    <div class="main-content">
        <div class="main-icon-container">
            <img class="main-icon" src="../resume-site-icon2.svg" alt="Evelium">
        </div>
            <div class="main-title">
                Evelium
            </div>
        <div class="main-nav">
            <div class="google-login-button" on:click={googleLogin}>Signin with Google</div>
            <Button href="#information" text="What is Evelium?"></Button>
            <Button href="/" text="Docs"></Button>
        </div>
    </div>

    <div class="main-information" id="information">

        <div class="content-title"> So whats the deal?</div>

        <div class="main-info-container">
            <div class="info-nav">
                <div class="tab" id="info-tab-1" on:mouseover={() => infoTabClick(1)} on:focus={() => infoTabClick(1)}>  
                    tab
                </div>
                <div class="tab" id="info-tab-2" on:mouseover={() => infoTabClick(2)} on:focus={() => infoTabClick(2)}>  
                    tab
                </div>
                <div class="tab" id="info-tab-3" on:mouseover={() => infoTabClick(3)} on:focus={() => infoTabClick(3)}>  
                    tab
                </div>
                <div class="tab" id="info-tab-4" on:mouseover={() => infoTabClick(4)} on:focus={() => infoTabClick(4)}>  
                    tab
                </div>
                <div class="tab" id="info-tab-5" on:mouseover={() => infoTabClick(5)} on:focus={() => infoTabClick(5)}>  
                    tab
                </div>

            </div>
            <Card bind:infoCurrTab={infoCurrTab}>
                {#if infoCurrTab === 2}
                    
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec elementum venenatis augue, at maximus ipsum sollicitudin sed. Aenean in erat magna. Vestibulum sit amet tincidunt lectus. Phasellus suscipit, massa vitae consectetur congue, felis lacus interdum elit, id varius tortor dolor sed quam. In volutpat sit amet nulla at pellentesque.
    
                {:else if infoCurrTab === 3}
    
                Duis rhoncus a nisi non suscipit. Integer lacus magna, tincidunt vel urna sit amet, euismod pulvinar est. Duis hendrerit, massa eu scelerisque condimentum, justo dolor pretium purus, sed maximus nisi ipsum condimentum magna.
    
                {:else if infoCurrTab === 4}
    
                Proin iaculis sed orci eget pulvinar. Ut in tempus quam. Integer et leo felis.  
    
                {:else if infoCurrTab === 5}
    
                Duis pretium tortor ut nisi sollicitudin, nec feugiat diam imperdiet. Donec a risus auctor, iaculis libero vel, pretium tellus. 
    
                {:else}
    
                Maecenas vel aliquam tellus, ac dictum odio. Duis facilisis, nisl non commodo semper, nisl lectus blandit orci, at bibendum magna enim ac sem.
    
    
                {/if}
            </Card>
        </div>
        
    </div>

    <div class="main-footer">
        FOOTER GOES HERE

    </div>



</div>







<style>

    *::-webkit-scrollbar{
        display: none;
    }

    *{
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
        font-size: 62.5%;
        font-family: Arial, Helvetica, sans-serif;
        color: #faf9f5;
    }

    

    .main-container{
        /*border: 1px solid yellowgreen;*/
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .main-content{
        /*border: 1px solid yellowgreen;*/
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 98vh;
        margin-bottom: 10vh;
    }

    .main-icon-container{
        /*border: 1px solid yellowgreen;*/
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .main-icon{
        width: 70%;
        height: 70%;
    }

    .main-title{
        /*border: 1px solid yellowgreen;*/
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 1rem;
        padding: 1rem;
        font-size: 6rem;
        font-weight: bold;
    }

    .main-nav{
        /*border: 1px solid yellowgreen;*/
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 2rem;
        margin: 1rem;
        padding: 1rem;
        width: 70%;
    }

    .main-information{
        /*border: 1px solid yellowgreen;*/
        display: flex;

        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 80%;
        margin-bottom: 10vh;
    }

    .info-nav{
        /*border: 1px solid yellowgreen;*/
        display: flex;
        flex-direction: column;
        margin-top: 2rem;
        margin: 1rem;
        padding: 1rem;
        width: 30%;
    }

    .tab{
        border: 1px solid white;
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
        color:#faf9f5;
        transition: .3s;
        width: 80%;
    }

    .tab:hover{
        width: 90%;
    }

    .main-info-container{
        /*border: 1px solid yellowgreen;*/
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        margin: 1rem;

    }

    .content-title{
        /*border: 1px solid yellowgreen;*/
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 5rem;
        margin: 2rem;

        text-align: center;
    }

    .google-login-button{
       /*border: 1px solid yellowgreen;*/
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
        color: #faf9f5;
        transition: .3s;
        width: 80%;
    }

    .google-login-button:hover{
        color: black;
        background-color: #faf9f5;
        opacity: 50%;
    }

    #info-tab-1{
        background-color: #f1dfff;
    }

    #info-tab-2{
        background-color: #e2bfff;
    }
    #info-tab-3{
        background-color: #d1a1ff;
    }
    #info-tab-4{
        background-color: #be82ff;
    }
    #info-tab-5{
        background-color: #a762fe;
    }


    

    @media only screen and (max-width: 1280px){
        
        

        .main-title{
            display: flex;
            flex-direction: column;
            font-size: 4rem;
            margin-top: 1rem;
        }

        .main-information{
            flex-direction: column;
        }


    }

    @media only screen and (max-width: 640px){

        .main-title{
            display: flex;
            flex-direction: column;
            font-size: 4rem;
            margin-top: 1rem;
        }

        .main-info-container{
            flex-direction: column;
        }

        .info-nav{
            width: 80%;
        }

        .main-nav{
            flex-direction: column;
        }



    }

</style>