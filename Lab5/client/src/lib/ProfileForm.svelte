<script>
    import ValidateInputField from "./InputField.svelte";
    import {loginRegex} from "./data/fieldsRegex.js";

    let user = getUser()
    function getUser() {
        const userData = localStorage.getItem('user');
        return JSON.parse(userData);
    }

    const urlUserAuth = "http://localhost:3000/user"

    let findingUserLogin = ""
    let findingUser
    let errorMessage = ""
    let isWaitingResult = false

    $: isEnabledButtonFind = findingUserLogin !== "" && !isWaitingResult

    async function findUser(){
        isWaitingResult = true
        
        const token = localStorage.getItem("jwt")
        const path = `${urlUserAuth}/${findingUserLogin}`
        
        const res = await fetch(path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ findingUserLogin }),
        });
        
        if (res.status == 200) {
            await handleSuccessResult(res)
        } else {
            await handleFailResult(res)
        }

        isWaitingResult = false
    }

    async function handleSuccessResult(res) {
        findingUser = await res.json();
        errorMessage = ""
    }

    async function handleFailResult(res) {
        const data = await res.json();
        findingUser = null
        if (data.message) {
            errorMessage = data.message
        } else {
            errorMessage = "Server failed to process the request!"
        }
    }
</script>

<main>
    {#if user}
        <div class="own-user-info">
            <p>Логін: {user.login}</p>
            <p>Роль: {user.role}</p>
            <p>Ім'я: {user.name}</p>
            <p>Група: {user.group}</p>
            <p>Варіант: {user.variant}</p>
            <p>Номер телефона: {user.phoneNumber}</p>
        </div>

        {#if user.role == "admin"}
            <div class="form-find-user">
                <p>Логін шуканого користувача:</p>
                <ValidateInputField bind:validValue={findingUserLogin} placeholder="user2" regex={loginRegex} />
                <button on:click={findUser} disabled={!isEnabledButtonFind}>Find</button>
            </div>

            {#if errorMessage}
                {errorMessage}
            {/if}

            {#if findingUser}
                <div class="finded-user-info">
                    <p>Логін: {findingUser.login}</p>
                    <p>Роль: {findingUser.role}</p>
                    <p>Ім'я: {findingUser.name}</p>
                    <p>Група: {findingUser.group}</p>
                    <p>Варіант: {findingUser.variant}</p>
                    <p>Номер телефона: {findingUser.phoneNumber}</p>
                </div>
            {/if}
        {/if}
    {/if}
</main>

<style>
    .form-find-user {
        max-width: 95%;
        padding-top: 20px;
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