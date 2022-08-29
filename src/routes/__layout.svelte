<script>
    
    import {browserLocalPersistence} from 'firebase/auth'
    import {session} from '../infoStores'
    import {auth} from '../firebase'
    import {browser} from '$app/env'
    import {googleLogOut, googleLogin} from '../firebase'
    import {goto} from "$app/navigation"
    

    
    if(browser){
        auth.setPersistence(browserLocalPersistence)
        auth.onAuthStateChanged((user) => {
            session.set({user: user})
            console.log('session change')
            console.log($session)
        })
        
    }
    

</script>
<svelte:head><style>
    html{
        max-height: 100vh;
        height:100vh;
        background: url('/index-waves-full.svg') no-repeat center center fixed; 
        background-size: cover;
        overflow-x: hidden;
        scroll-behavior: smooth;
    }
    body{
        max-height: 100vh;
        height:100vh;
        margin: 0;
        scroll-behavior: smooth;
    }
    body > div{
        max-height: 100vh;
        height:100vh;
        scroll-behavior: smooth;
    }
</style></svelte:head>
<div class="top-navbar">
    <a class="main-nav-icon" href="/">
        <img src="/resume-site-icon2.svg" alt="icon">
    </a>
    <div class="dropdown">
        <div class="dropdown-button-container">
        {#if $session['user']}
            <img class="profile-pic" src={$session['user']['photoURL']} alt="User">
        {:else}
            <div class="dropdown-button">No user</div>
        {/if}
        </div>
        <div class="dropdown-menu">
            <a class="dropdown-item" rel="external" href="/accountPage">
                Account page
            </a>    
            {#if $session['user'] == null}
            <div class="dropdown-item" on:click={googleLogin}>
                Log in
            </div>
            {:else}
            <a class="dropdown-item" rel="external" href="/" on:click={googleLogOut}>
                Log out
            </a>
            {/if}

        </div>
    </div>
</div>
<slot></slot>

<style>

*{
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
        font-size: 62.5%;
        font-family: Arial, Helvetica, sans-serif;
        color: #faf9f5;
    }

    .top-navbar{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5vh 5vh 5vh 5vh;
        position: fixed;
        opacity: 0%;
        transition: 1s;
        height: 2vh;
        width: 95vw;
        z-index: 99999;
    }

    .top-navbar:hover{
        opacity: 100%;
        height: 3vh;
        transition: .25s;
        
    }

    .main-nav-icon{
        display: flex;
        height: 50px;
    }

    .dropdown{
        position: relative;
        display: flex;

    }

    .dropdown-menu{
        position: absolute;
        font-size: 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        transform: translateX(-30%) translateY(20%);
        opacity: 0%;
        height: 0px;
        transition: 1s;
        padding: .5rem;
        visibility: collapse;
        overflow: hidden;
        box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2);
        background-color: rgba(255, 255, 255, .15);
        backdrop-filter: blur(5px);
        border: #faf9f5 5px solid;

    }

    .dropdown:hover .dropdown-menu{    
        visibility: visible;
        transition: .5s;
        height: 150px;
        opacity: 100%;
    }

    .dropdown-button{
        padding: 10px;
        padding-right: 12.5vw;
        z-index: 100;
        color: #0d0019;
    }

    .dropdown-item{
        margin: 5px;
        text-align: center;
        text-decoration: none;
        color: #0d0019;
        border: rgba(0, 0, 0, 0) 5px solid;
        transition: 1s;
        padding: .25rem;
    }

    .dropdown-item:hover{
        box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2);
        background-color: rgba(255, 255, 255, .15);
        backdrop-filter: blur(5px);
        border: #faf9f5 5px solid;
    }

    .dropdown-button-container{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .profile-pic{
        width:50px;


    }

    
</style>