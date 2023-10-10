<script>
    export let message;
</script>

<main>
    <p>{message.text}</p>
    {#if message.author}
        <p>{message.author}</p>
    {/if}
</main>