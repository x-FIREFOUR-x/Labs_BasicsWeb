<script>
  import { onMount } from 'svelte';
  import { Message } from './lib/Message';
  import socketIOClient from 'socket.io-client';

  import Login from "./lib/Login.svelte";
  import SendBar from "./lib/SendBar.svelte";
  import MessageTail from './lib/MessageTail.svelte';
  
  let messages = [];
  let userName = "";
  let socket;

  let isLoggeed = false

  onMount(() => {
    socket = socketIOClient('http://localhost:3000');

    socket.on("chat message", (data) => {
      if (!userName) {
        return;
      }
      messages = [...messages, new Message("chat message", data.message, data.user)];
    })

    socket.on("user login", (data) => {
      if (!userName) {
        return;
      }
      messages = [...messages, new Message("user login", data.message, null)];
    })

    socket.on("user disconnected", (data) => {
      if (!userName) {
        return;
      }
      messages = [...messages, new Message("user disconnected", data.message, null)]
    })

    socket.on("access event", (data) => {
      isLoggeed = data.isAllowed
    })
  });

  function handleLogin(event) {
    userName = event.detail;
    socket.emit("login", userName);
  }

  function handleMessage(event) {
    const message = event.detail;
    socket.emit("chat message", message);
  }
</script>


<div>
  {#if !isLoggeed}
      <Login on:login={handleLogin} />
  {:else}
    <div class="chat">
      <h1 class=name>{userName}</h1>
      <ul class=messages>
        {#each messages as message}
            <MessageTail message={message} />
        {/each}
      </ul>
      <SendBar on:message={handleMessage}/>
    </div>
  {/if}
</div>

<style>
  .chat {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    width: 600px;
    margin: auto;
    height: 100vh;
  }

  .name {
    font-size: 30px;
    color: #ffffff;
    margin-bottom: 20px;
    padding-left: 5%;
  }

  .messages {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow-y: scroll;
    width: 100%;
    height: 80vh;
    max-height: 80vh;
  }
</style>
