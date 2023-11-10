export let nameRegex = /^[А-ЯҐЄІЇ][а-яґєії]+ [А-ЯҐЄІЇ]\.[А-ЯҐЄІЇ]\.$/
export let groupRegex = /^[А-ЯҐЄІЇ]{2}-\d{2}$/
export let variantRegex = /^(?:[1-9]|[12]\d|30)$/
export let phoneNumberRegex = /^\d{10}$/

export let loginRegex = /^[a-zA-Z0-9]{3,}$/
export let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

export let any = /^.*/