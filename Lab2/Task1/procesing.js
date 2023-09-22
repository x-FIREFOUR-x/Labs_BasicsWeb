const rootStyles = getComputedStyle(document.querySelector('html'));
let inputBackgroundColor = rootStyles.getPropertyValue('--input-bg-color');
let incorrectInputBackgroundColor = rootStyles.getPropertyValue('--incorrect-input-bg-color');

function validateDataForm(data)
{
	if (validateFullName(data.fullname) &
        validateBirthDate(data.birthdate) &
		validateAddress(data.address) &
        validateEmail(data.email) &
        validateTelegram(data.telegram))
	{
        printData(data)
		return true;
	}
	
	return false;
}

function validateFullName(fullname)
{
	if (fullname.value != null && (/^[A-ZА-ЯІҐЄЇ][a-zа-яіґєї]+ [A-ZА-ЯІҐЄЇ]\.[A-ZА-ЯІҐЄЇ]\.$/.test(fullname.value)))
	{
		fullname.style.background = inputBackgroundColor;
		return true;
	}

	fullname.value = ""
	fullname.style.background = incorrectInputBackgroundColor;
	window.alert("Некоректно введений ПІБ!")
	return false;
}

function validateBirthDate(birthdate)
{
	if (birthdate.value != null && Date.parse(birthdate.value) < Date.now())
	{
		birthdate.style.background = inputBackgroundColor;
		return true;
	}
	
	
	birthdate.style.background = incorrectInputBackgroundColor;
	window.alert("Некоректно введена дата народження!")
	return false;
}

function validateAddress(address)
{
	if (address.value != null && (/^м. [А-ЯІҐЄЇ-]+$/.test(address.value)))
	{
		address.style.background = inputBackgroundColor;
		return true;
	}

	address.value = ""
	address.style.background = incorrectInputBackgroundColor;
    window.alert("Некоректно введена адреса!")
	return false;
}

function validateEmail(email)
{
	if (email.value != null && (/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm.test(email.value)))
	{
		email.style.background = inputBackgroundColor;
		return true;
	}

	email.value = ""
	email.style.background = incorrectInputBackgroundColor;
	window.alert("Некоректно введений e-mail!")
	return false;
}

function validateTelegram(telegram)
{
	if (telegram.value != null && (/^@[A-Za-z0-9.-_]+$/.test(telegram.value)))
	{
		telegram.style.background = inputBackgroundColor;
		return true;
	}

	telegram.value = ""
	telegram.style.background = incorrectInputBackgroundColor;
	window.alert("Некоректно введений telegram!")
	return false;
}

function printData(data){
	let outputMessage = 
		"Дані успішно відправлені:\n" +
		"\t ПІБ: " + data.fullname.value + "\n" + 
		"\t Дата народження: " + data.birthdate.value + "\n" +
		"\t Адреса: " + data.address.value + "\n" +
		"\t e-mail: " + data.email.value + "\n" +
		"\t Telegram: " + data.telegram.value + "\n";
	window.alert(outputMessage);
}