<script>
    import { onMount } from "svelte";
    import { TypeAuthForm } from "./lib/data/TypeAuthForm.js";
    import LoginForm from "./lib/LoginForm.svelte";
    import RegistrationForm from "./lib/RegistrationForm.svelte";
    import ProfileForm from "./lib/ProfileForm.svelte";
    
    let accessToken
    let TypeAuthFormForm = TypeAuthForm.login
    let errorMessage = ""

    onMount(() => {
        accessToken = localStorage.getItem("jwt") ?? ""
    })

    $: switchedTypeAuthFormForm = TypeAuthFormForm == TypeAuthForm.login ? TypeAuthForm.registration : TypeAuthForm.login

    function switchForm() {
        errorMessage = ""
        TypeAuthFormForm = switchedTypeAuthFormForm
    }

    function handleSuccessResult(event) {
        const data = event.detail
        localStorage.setItem("jwt", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        accessToken = data.token
    }

    function handleFailResult(event) {
        errorMessage = event.detail
    }

    function logOut() {
        accessToken = ""
        localStorage.removeItem("jwt")
    }

</script>

<main>
    {#if accessToken === "" }
        {#if TypeAuthFormForm === TypeAuthForm.login }
            <LoginForm on:success={handleSuccessResult} on:failure={handleFailResult} />
        {:else}
            <RegistrationForm on:success={handleSuccessResult} on:failure={handleFailResult} />
        {/if}
        <h3 class="errorMessage">
            {errorMessage}
        </h3>

        <button on:click={switchForm}>{switchedTypeAuthFormForm}</button>
    {:else}
        <button on:click={logOut}>Logout</button>
        <ProfileForm/>
    {/if}
</main>

<style>
  .errorMessage {
        color: red;
    }
</style>
