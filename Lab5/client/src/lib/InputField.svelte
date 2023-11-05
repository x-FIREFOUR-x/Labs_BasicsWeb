<script>
    export let validValue = ""
    export let placeholder = 'Enter value'
    export let regex = RegExp("")

    const validator = new RegExp(regex)
    let value = ""
    let isUncorrectValue = false;

    $: {if (validValue !== "") {value = validValue}}

    function handleInputValue() {
        if (value.length == 0) {
            validValue = ""
            isUncorrectValue = false
        }
        else{
            isUncorrectValue = !validator.test(value)
            validValue = isUncorrectValue ? "" : value
        }
    }
</script>

<style>
    .input {
        border: 1px solid #000000;
        padding: 10px;
        width: 100%;
    }

    .invalid {
        border: 2px solid red;
    }
</style>

<input
    class:invalid={isUncorrectValue}
    class="input"
    type="text"
    bind:value
    placeholder={placeholder}
    on:input={handleInputValue}
/>