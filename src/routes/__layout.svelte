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
        overflow-y: hidden;
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
            <a class="dropdown-item" rel="external" href="/workspace">
                Workspace
            </a>
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

    .top-navbar{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0rem;
        position: relative;
        opacity: 0%;
        transition: 1s;
        height: 2vh;
    }

    .top-navbar:hover{
        opacity: 100%;
        height: 3vh;
        transition: .25s;
        padding: 3vh;
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
        box-shadow: 0 2px 5px 0 rgba(0,0,0,.1);
        padding: .5rem;
        font-size: 1.5rem;
        display: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transform: translateX(-175px);
        padding-right: 100px;
        

    }

    .dropdown-button{
        padding: 10px;
        padding-right: 50px;
        z-index: 100;
    }


    .dropdown:hover .dropdown-menu{    
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .dropdown-item{
        margin: 5px;
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