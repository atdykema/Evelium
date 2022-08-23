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


<div class="main-container">

    <div class="main-content">
        {#if get(session)['user'] != null}
        <div>
            Hi {get(session)['user']['email']}
        </div>
        {/if}
        <div class="main-icon-container">
            <img class="main-icon" src="../resume-site-icon2.svg" alt="Mobilfolio">
        </div>
        <div class="main-title">
            Tasktic
        </div>
        <div class="main-nav">
            <div class="google-login-button" on:click={googleLogin}>Signin with Google</div>
            <Button href="#information" text="What is Tasktic?"></Button>
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
                    
                    button2button2button2button2button2button2button2button2button2button2button2
    
                {:else if infoCurrTab === 3}
    
                    button3
    
                {:else if infoCurrTab === 4}
    
                    button4
    
                {:else if infoCurrTab === 5}
    
                    button5
    
                {:else}
    
                    button1button1button1button1button1button1button1button1button1button1button1button1button1button1button1button1button1button1button1button1button1button1button1button1
    
    
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
    }

    .main-container{
        border: 1px solid yellowgreen;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .main-content{
        border: 1px solid red;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 98vh;
        margin-bottom: 10vh;
    }

    .main-icon-container{
        border: 1px solid blue;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 1rem;
        padding: 1rem;
    }

    .main-icon{
        width: 70%;
        height: 70%;
    }

    .main-title{
        border: 1px solid salmon;
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
        border: 1px solid black;
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
        border: blue solid 1px;
        display: flex;

        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 80%;
        margin-bottom: 10vh;
    }

    .info-nav{
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        margin-top: 2rem;
        margin: 1rem;
        padding: 1rem;
        width: 30%;
    }

    .tab{
        border: 3px solid purple;
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
    }

    .tab:hover{
        color: slategray;
        background-color: blueviolet;
        width: 90%;
    }

    .main-info-container{
        border: black 1px solid;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        margin: 1rem;

    }

    .content-title{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 5rem;
        margin: 2rem;

        text-align: center;
    }

    .google-login-button{
        border: 3px solid purple;
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
    }

    .google-login-button:hover{
        color: slategray;
        background-color: blueviolet;
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