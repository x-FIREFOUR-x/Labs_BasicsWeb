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

  onMount(() => {
    socket = socketIOClient('http://localhost:3000');

    socket.on("chat message", (data) => {
      if (!userName) {
        return;
      }
      const message = new Message("chat message", data.message, data.user);
      messages = [...messages, message];
    })

    socket.on("user login", (data) => {
      if (!userName) {
        return;
      }
      messages = [...messages, new Message("user login", data, null)];
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
  {#if !userName}
      <Login on:login={handleLogin} />
  {:else}
      <h1>{userName}</h1>
      <SendBar on:message={handleMessage}/>
      <ul>
          {#each messages as message}
              <MessageTail message={message} />
          {/each}
      </ul>
  {/if}
</div>
