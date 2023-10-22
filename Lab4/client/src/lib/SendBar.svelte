<script>
    import { createEventDispatcher } from 'svelte';

    let message;
    const eventDispatcher = createEventDispatcher();

    function sendMessage() {
        const trimMessage = message.trim();
        if (!trimMessage) {
            return; 
        }
        eventDispatcher('message', trimMessage);
        message = "";
    }
</script>

<div class="input-message">
    <input type="text" bind:value={message} placeholder="Enter message"/>
    <button on:click={sendMessage}> Send </button>
</div>

<style>
    .input-message {
        display: flex;
        margin-top: 20px;
        width: 100%;
    }

    .input-message input {
        flex-grow: 1;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }

    .input-message button {
        margin-left: 10px;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        background-color: #007BFF;
        color: white;
        cursor: pointer;
    }

    .input-message button:hover {
        background-color: #0056b3;
    }
</style>
