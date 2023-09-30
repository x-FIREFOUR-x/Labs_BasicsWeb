const rootStyles = getComputedStyle(document.querySelector('html'));
let inputBackgroundColor = rootStyles.getPropertyValue('--input-bg-color');
let incorrectInputBackgroundColor = rootStyles.getPropertyValue('--incorrect-input-bg-color');

function validateDataForm(data)
{
	var outputMessage = {value: ""}

	if (validateFullName(data.fullname, outputMessage) &
        validateBirthDate(data.birthdate, outputMessage) &
		validateAddress(data.address, outputMessage) &
        validateEmail(data.email, outputMessage) &
        validateTelegram(data.telegram, outputMessage))
	{
        printData(data);
		return true;
	}
	
	window.alert(outputMessage.value);
	return false;
}

function validateFullName(fullname, output)
{
	if (fullname.value != null && (/^[A-ZА-ЯІҐЄЇ][a-zа-яіґєї]+ [A-ZА-ЯІҐЄЇ]\.[A-ZА-ЯІҐЄЇ]\.$/.test(fullname.value)))
	{
		fullname.style.background = inputBackgroundColor;
		return true;
	}

	fullname.value = "";
	fullname.style.background = incorrectInputBackgroundColor;
	output.value = output.value + "Некоректно введений ПІБ!" + "\n";
	return false;
}

function validateBirthDate(birthdate, output)
{
	if (birthdate.value != null && Date.parse(birthdate.value) < Date.now())
	{
		birthdate.style.background = inputBackgroundColor;
		return true;
	}
	
	birthdate.style.background = incorrectInputBackgroundColor;
	output.value = output.value +"Некоректно введена дата народження!" + "\n";
	return false;
}

function validateAddress(address, output)
{
	if (address.value != null && (/^м. [А-ЯІҐЄЇ-]+$/.test(address.value)))
	{
		address.style.background = inputBackgroundColor;
		return true;
	}

	address.value = "";
	address.style.background = incorrectInputBackgroundColor;
    output.value = output.value +"Некоректно введена адреса!" + "\n";
	return false;
}

function validateEmail(email, output)
{
	if (email.value != null && (/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm.test(email.value)))
	{
		email.style.background = inputBackgroundColor;
		return true;
	}

	email.value = "";
	email.style.background = incorrectInputBackgroundColor;
	output.value = output.value +"Некоректно введений e-mail!" + "\n";
	return false;
}

function validateTelegram(telegram, output)
{
	if (telegram.value != null && (/^@[A-Za-z0-9.-_]+$/.test(telegram.value)))
	{
		telegram.style.background = inputBackgroundColor;
		return true;
	}

	telegram.value = "";
	telegram.style.background = incorrectInputBackgroundColor;
	output.value = output.value +"Некоректно введений telegram!" + "\n";
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