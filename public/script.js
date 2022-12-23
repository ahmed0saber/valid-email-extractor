const submitBtn = document.querySelector(".form-container .btn"),
    inputField = document.querySelector(".form-container input"),
    emailsContainer = document.querySelector(".emails-container")

submitBtn.addEventListener("click", () => {
    if (inputField.value.trim().length === 0) {
        inputField.reportValidity()
        return
    }

    emailsContainer.innerHTML = "Loading.."
    const url = window.location.href + "extract?url=" + inputField.value
    fetch(url)
        .then(res => res.json())
        .then(data => displayEmails(JSON.parse(data.results)))
})

function displayEmails(emails = ["No emails have been found, please try again later."]) {
    emailsContainer.innerHTML = ""
    for (let i = 0; i < emails.length; i++) {
        emailsContainer.innerHTML += `<div class="email-container">${i + 1}- ${emails[i]}</div>`
    }
}