function alterartema(){
    const tema = localStorage.getItem("tema")
    const body= document.querySelector("body")
    const button = document.querySelector(".tema-button")

    if (tema) {
        let novotema

        if (tema === "light"){
            novotema="dark"
            button.innerHTML = `<img src="/imagens/sun-icon.png" alt="Icone de sol">`
            body.classList.remove("light")
            body.classList.add("dark")
        } else{
            novotema="light"
            button.innerHTML = `<img src="/imagens/moon-icon.png" alt="Icone de lua">`
            body.classList.remove("dark")
            body.classList.add("light")
        }

        localStorage.setItem("tema", novotema)
        return
    }

    localStorage.setItem("tema","dark")
}

function verifiicarTema(){
    const tema = localStorage.getItem("tema")
    const body = document.querySelector("body")
    const button = document.querySelector(".tema-button")

    if (tema === "dark") {
        button.innerHTML = `<img src="/imagens/sun-icon.png" alt="Icone de sol">`
        body.classList.add("dark")
    }   else{
        body.classList.add("light")
        button.innerHTML = `<img src="/imagens/moon-icon.png" alt="Icone de lua">`
    }
}

verifiicarTema()

function completarTarefa(id){
    fetch("http://localhost:3000/completar", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    })

    window.location.reload()
}