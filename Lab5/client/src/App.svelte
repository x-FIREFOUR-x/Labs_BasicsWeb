<script>
    import { onMount } from "svelte";
    import { TypeAuthForm } from "./lib/TypeAuthForm.js";
    import LoginForm from "./lib/LoginForm.svelte";
    import RegistrationForm from "./lib/RegistrationForm.svelte";
    
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

    function handleSuccess(event) {
        accessToken = event.detail
        localStorage.setItem("jwt", accessToken)
        console.log(accessToken)
    }

    function handleFailure(event) {
        errorMessage = event.detail
        console.log(event.detail)
    }

</script>

<main>
    {#if accessToken === "" }
        {#if TypeAuthFormForm === TypeAuthForm.login }
            <LoginForm on:success={handleSuccess} on:failure={handleFailure} />
        {:else}
            <RegistrationForm on:success={handleSuccess} on:failure={handleFailure} />
        {/if}
        <h3 class="errorMessage">
            {errorMessage}
        </h3>

        <button on:click={switchForm}>{switchedTypeAuthFormForm}</button>
    {/if}
</main>

<style>
  .errorMessage {
        color: red;
    }
</style>
