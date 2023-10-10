<script>
    import { createEventDispatcher } from 'svelte';

    let userName = "";
    const dispatch = createEventDispatcher();

    function handleLogin() {
        const trimmedUsername = userName.trim();
        if (!trimmedUsername) {
            return;
        }
        dispatch('login', trimmedUsername);
    }
</script>

<div>
    <input type="text" bind:value={userName} placeholder="Username"/>
    <button on:click={handleLogin}> Login </button>
</div>
