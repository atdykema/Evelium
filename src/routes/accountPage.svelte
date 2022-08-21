<script>
import { googleLogOut } from "../firebase";
import { collection, doc, getDoc, setDoc, getDocs} from "firebase/firestore";
import {db} from "../firebase"
import {session} from "../infoStores"
import { get } from "svelte/store";
import {onMount} from 'svelte'

let isMounted;
let projects = [];

onMount(async () => {
        try {
            await getProjects()         
            isMounted = true
        }catch(error) {
            console.error(error)
        }
    })

async function getProjects(){
    let userRef = doc(db, 'users', get(session)['user']['uid'])
    console.log(get(session)['user']['uid'])
    let temp = collection(userRef, 'userProjects')
    let collSnap = await getDocs(temp)
    collSnap.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        projects.push(doc.data())
    });

}
    
</script>

<div class="main-container">

    <div class="main-content">
        <div>Projects</div>
        <div class="project-list">
            {#if isMounted}
                {#each projects as project}
                    <div>
                        {project['projectName']}
                    </div>
                {/each}
            {:else}
                Loading
            {/if}
        </div>
        <div class="logout-button" on:click={googleLogOut}>
            logout
        </div>
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

    .project-list{
        border: 1px solid red;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>