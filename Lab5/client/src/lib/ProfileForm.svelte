<script>
    let user = getUser()
    
    function getUser() {
        const userData = localStorage.getItem('user');
        return JSON.parse(userData);
    }
</script>

<main>
    {#if user}
        <p>Логін: {user.login}</p>
        <p>Ім'я: {user.name}</p>
        <p>Група: {user.group}</p>
        <p>Варіант: {user.variant}</p>
        <p>Номер телефона: {user.phoneNumber}</p>
    {/if}
</main>