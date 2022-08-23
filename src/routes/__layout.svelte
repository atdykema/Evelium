<script>
    
    import {browserLocalPersistence} from 'firebase/auth'
    import {session} from '../infoStores'
    import {get} from 'svelte/store'
    import {auth} from '../firebase'
    import {browser} from '$app/env'

    if(browser){
        auth.onAuthStateChanged((user) => {
            session.set({user: user})
            console.log('session change')
            console.log(get(session))
            auth.setPersistence(browserLocalPersistence)
        })
        
    }
    

</script>

<slot></slot>

<style>
    
</style>