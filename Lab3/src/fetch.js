document.addEventListener('DOMContentLoaded', function () {
    const fetchButton = document.getElementById("fetchButton");
    const usersContainer = document.getElementById("usersContainer");

    fetchButton.addEventListener("click", () => {
        usersContainer.innerHTML = "";
        for (let i = 0; i < 6; i++) {
            fetch("https://randomuser.me/api")
                .then((response) => response.json())
                .then((data) => {
                    const dataUser = data.results[0];
                    usersContainer.innerHTML += `<div class="userCard">
												    <img class="userPicture" src="${dataUser.picture.large}" alt="Profile picture"/>
												    <p>City: ${dataUser.location.city}</p>
                                                    <p>Country: ${dataUser.location.country}</p>
                                                    <p>Name: ${dataUser.name.first} ${dataUser.name.last}</p>
                                                    <p>Postcode: ${dataUser.location.postcode}</p>                                
												</div>`
                })
                .catch((error) => {
                    console.error("Помилка:", error);
                });
        }
    });
});