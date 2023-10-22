<script>
    export let message;
</script>

<main class="message-tail">
    <p class="message-text">{message.text}</p>
    {#if message.author}
        <p class="message-author">{message.author}</p>
    {/if}
</main>

<style>
    .message-tail {
        background-color: #107fe8;
        display: flex;
        flex-direction: column;
        width: fit-content;
        border: 1px solid #ddd;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 5px;
    }

    .message-text {
        margin: 0 0 5px 0;
    }

    .message-author {
        align-self: flex-end;
        font-size: 12px;
        color: #ffffff;
        margin: 0;
    }
</style>