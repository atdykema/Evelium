<script>
import { collection, doc, getDoc, setDoc, getDocs, deleteDoc } from "firebase/firestore";
import {db} from "../firebase"
import {session} from "../infoStores"
import {onMount} from 'svelte'
import {googleLogin} from "../firebase"
import Workspace from '../components/Workspace.svelte'
import Card from "../components/Card.svelte";


let isMounted = 0;
let projects = [];
let connectedUsers = [];
let currProject = null
let loading = false


onMount(async () => {
        await new Promise(r => setTimeout(r, 1000));
        if($session['user'] != null){
            try {
                await getProjects()
                await getConnectedUsers()
                isMounted = 1
                
            }catch(error) {
                console.error(error)
            }
        }else{
            isMounted = 2
        }
        
    })

    async function getProjects(user = $session['user']['uid']){
        projects = []
        let userRef = doc(db, 'users', user)
        console.log(user)
        console.log($session['user']['uid'])
        let temp = collection(userRef, 'userProjects')
        let collSnap = await getDocs(temp)
        collSnap.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            projects.push(doc.data())
        });
        console.log(projects)
    }

    async function getConnectedUsers(){
        let temp = await getDoc(doc(db, 'users', $session['user']['uid']));
        connectedUsers = temp.data().accessKeys
    }

    async function createNewProject(){
        loading = true
        let newId = crypto.randomUUID()
        await setDoc(doc(db, 'users', $session['user']['uid'], 'userProjects', newId),{
            projectData: {projectItems: {}, projectStories: []},
            projectName: crypto.randomUUID(), //create way to set name
            projectId: newId
        })
        await getProjects()
        loading = false
    }

    function getProject(project){
        project['projectData']['projectItems']['stories'] = project['projectData']['projectStories']
        /*
        project['projectData']['projectItemsTest'].forEach(element => {
            let currItem = {}
            currItem['content'] = element['content']
            currItem['id'] = element['id']
            currItem['title'] = element['title']
            currItem['type'] = element['type']
            newList[currItem['id']] = currItem
        });
        */
        console.log(project['projectData']['projectItems'])
        return project
    }

    async function deleteProject(project){
        loading = true
        await deleteDoc(doc(db, "users", $session['user']['uid'], "userProjects", project['projectId']));
        await getProjects()
        loading = false
    }

    async function getConnectedProject(user){
        loading = true
        await getProjects(user)
        loading = false
    }


    
</script>

{#if currProject == null}
<div class="main-container">
    <div class="main-content">
    {#if isMounted == 1}
        <div>
            Hi {$session['user']['email']}
        </div>
        <div class="content-title">Projects</div>
        <div class="project-list">
            {#if isMounted && !loading}
                <div class="new-project-button" on:click={() =>
                    createNewProject()
                }>
                    create new project
                </div>
                {#each projects as project}
                <div class="project-item" on:click={() => {
                    currProject = project;
                }}>
                    {project['projectName']}
                    {#if currProject != null}
                        {currProject.data()}
                    {/if}
                    <div class="project-delete-button" on:click={deleteProject(project)}>X</div>
                </div>
                {/each}
            {:else}
                Loading
            {/if}

        </div>
        <div class="content-title">Your connected users</div>
        <div class="project-list">
            {#if isMounted && !loading}
                {#each connectedUsers as user}
                <div class="project-item" on:click={() => {
                    getConnectedProject(user)
                }}>
                    {user}
                </div>
                {/each}
                <div class="project-item" on:click={() => {
                    getConnectedProject($session['user']['uid'])
                }}>
                    {$session['user']['uid']} (You)
                </div>
                
                
            {:else}
                Loading
            {/if}

        </div>
    {:else if isMounted == 2}
        <div class="google-login-button" on:click={googleLogin}>Signin with Google</div>
    {:else}
        Loading
    {/if}
    </div>
</div>
{:else}
    <Workspace paramList={getProject(currProject)}></Workspace>
{/if}




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
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        
    }

    .main-content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .content-title{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 5rem;
    }

    .project-list{
        border: 1px solid red;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: scroll;
        height: fit-content;
        padding: 0;


    }

    .project-item{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: black 1px solid;
        margin: .5rem;
        padding: .5rem;
        font-size: 3rem;
        transition: 1s;
        height: fit-content;
        overflow-y: hidden;
    }


    .new-project-button{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: black 1px solid;
        margin: .5rem;
        padding: .5rem;
        font-size: 3rem;
        color: red  ;
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
</style>