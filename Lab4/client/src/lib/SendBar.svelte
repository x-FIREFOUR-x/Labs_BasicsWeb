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

<div>
    <input type="text" bind:value={message} placeholder="Enter message"/>
    <button on:click={sendMessage}> Send </button>
</div>
