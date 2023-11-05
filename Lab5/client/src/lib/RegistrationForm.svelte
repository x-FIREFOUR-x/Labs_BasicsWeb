<script>
    import ValidateInputField from "./InputField.svelte";
    import { loginRegex, passwordRegex, nameRegex, groupRegex, variantRegex, phoneNumberRegex} from "./fieldsRegex.js";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    const urlRegistration = "http://localhost:3000/auth/registration"
    const roles = ["user", "admin"]

    let login = ""
    let password = ""
    let role = "user"
    let name = ""
    let group = ""
    let variant = ""
    let phoneNumber = ""

    let isWaitingResult = false

    $: isEnabledButtonRegistration = login && password && name && group && variant && phoneNumber && !isWaitingResult

    async function registrationAuth() {
        isWaitingResult = true
        const res = await fetch(urlRegistration, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                login, 
                password,
                role,
                name,
                group,
                variant,
                phoneNumber
            }),
        });
        
        if (res.status == 200) {
            await handleSuccessResult(res)
        } else {
            await handleFailResult(res)
        }

        isWaitingResult = false
    }

    async function handleSuccessResult(res) {
        const data = await res.json();
        if (data.token) {
            dispatch("success", data.token)
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
    <form>
        <p>Логін:</p>
        <ValidateInputField bind:validValue={login} placeholder="LoginUser!" regex={loginRegex} />
    
        <p>Пароль:</p>
        <ValidateInputField bind:validValue={password} placeholder="Password123!" regex={passwordRegex} />

        <p>Роль:</p>
        <select bind:value={role}>
            {#each roles as role}
                <option value={role}>
                    {role}
                </option>
            {/each}
	    </select>

        <p>Імʼя:</p>
        <ValidateInputField bind:validValue={name} placeholder="Олександр П.П." regex={nameRegex} />
    
        <p>Група:</p>
        <ValidateInputField bind:validValue={group} placeholder="ІП-01" regex={groupRegex} />
    
        <p>Варіант:</p>
        <ValidateInputField bind:validValue={variant} placeholder="1" regex={variantRegex} />
    
        <p>Номер телефону:</p>
        <ValidateInputField bind:validValue={phoneNumber} placeholder="0676159254" regex={phoneNumberRegex} />

        <button on:click={registrationAuth} disabled={!isEnabledButtonRegistration}>Registration</button>
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
