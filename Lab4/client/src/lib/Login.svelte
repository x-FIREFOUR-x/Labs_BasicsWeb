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
    <input class="input-login" type="text" bind:value={userName} placeholder="Username"/>
    <button on:click={handleLogin}> Login </button>
</div>

<style> 
    .input-login {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin-right: 10px;
    }
</style>