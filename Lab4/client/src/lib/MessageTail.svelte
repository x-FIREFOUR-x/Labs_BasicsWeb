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
    .message-tail{
      background:#0a72ea;
      border-radius: 8px;
      max-width: 10%;
      margin: 0 auto;
    }
    .message-text{
      color:#000000;
      font-size: 1em;
      text-align: center;
      margin: 0;
      margin-top: 2%;
    }
    .message-author{
      color:#000000;
      font-size: 0.75em;
      margin: 0;
      padding-right: 2%;
      text-align: end;
    }
  </style>