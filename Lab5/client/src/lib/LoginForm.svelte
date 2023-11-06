<script>
    import InputField from "./InputField.svelte";
    import { loginRegex, passwordRegex } from "./data/fieldsRegex.js";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    const urlLogin = "http://localhost:3000/auth/login"

    let login = ""
    let password = ""

    let isWaitingResult = false

    $: isEnabledButtonLogin = login !== "" && password !== "" && !isWaitingResult

    async function LoginAuth() {
        isWaitingResult = true
        const res = await fetch(urlLogin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, password }),
        });
        
        if (res.status == 200) {
            handleSuccessResult(res)
        } else {
            handleFailResult(res)
        }

        isWaitingResult = false
    }

    async function handleSuccessResult(res) {
        const data = await res.json();
        if (data.token) {
            dispatch("success", data)
        }
    }

    async function handleFailResult(res) {
        const data = await res.json();
        if (data.message) {
            dispatch("failure", data.message)
        } else {
            dispatch("failure", "Server not process the request!")
        }
    }
</script>

<main>
    <form id="login-form">
        <p>Логін:</p>
        <InputField bind:validValue={login} placeholder="LoginUser!" regex={loginRegex} />
    
        <p>Пароль:</p>
        <InputField bind:validValue={password} placeholder="Password123!" regex={passwordRegex} />

        <button on:click={LoginAuth} disabled={!isEnabledButtonLogin}>Login</button>
    </form>
</main>

<style>
    form {
        max-width: 95%;
    }

    p {
        color: white;
    }

    button {
        background-color: rgb(8, 243, 24);
        margin-top: 20px;
        padding: 20px 20px;
        border: none;
        color: white;
        text-align: center;
        font-size: 16px;
        transition-duration: 0.4s;
        cursor: pointer;
    }

    button:hover {
        background-color: rgb(51, 154, 26);
    }

    button:disabled {
        background-color: #afa6a6;
        cursor: not-allowed;
    }
</style>
