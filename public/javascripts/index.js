
document.addEventListener('DOMContentLoaded', (event) => {
    const list = document.querySelector(".list")

    fetch("/data/links.json")
        .then(response => response.json())
        .then(body => {
            body = body.body;
            body.forEach(link => {
                let div = document.createElement("div")
                div.classList.add("box", "link")
                let text = document.createElement("p")
                text.classList.add("text", "center")
                let textNode = document.createTextNode(link.name);
                text.appendChild(textNode)
                div.setAttribute('onclick',`location.href=\'${link.location}\';`)
                div.appendChild(text)
                list.appendChild(div)
            })
        })
})