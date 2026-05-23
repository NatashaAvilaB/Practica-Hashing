// ── LOGIN ──────────────────────────────────────────
const btnLogin      = document.getElementById("btnLogin")
const inputUsuario  = document.getElementById("inputUsuario")
const inputPassword = document.getElementById("inputPassword")
const mensajeLogin  = document.getElementById("mensajeLogin")

const API_URL = "http://localhost:5000"

btnLogin.addEventListener("click", async () => {
    const user = { username: inputUsuario.value, password: inputPassword.value }

    const res = await fetch(API_URL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    })

    const data = await res.json()
    if (data.login === true) {
        sessionStorage.setItem("id", data.user.id)
        sessionStorage.setItem("name", data.user.name)
        window.location.href = "./profile/usuario.html"
    }else {
        sessionStorage.setItem("name", "Usuario Nuevo")
        window.location.href = "./profile/usuario.html"
    }
})


// ── RADIO BUTTONS ──────────────────────────────────
const btnEnviar = document.getElementById("btnEnviar")

btnEnviar.addEventListener("click", () => {
    const seleccionado = document.querySelector('input[name="tipo"]:checked')
    if (seleccionado) {
        console.log("Tipo seleccionado:", seleccionado.id)
    }
})


// ── PAÍSES Y REGIONES (data.json) ──────────────────
const selPaises   = document.getElementById("selPaises")
const selRegiones = document.getElementById("selRegiones")

const loadJson = async () => {
    const res  = await fetch("./data.json")
    const data = await res.json()

    data.forEach((pais) => {
        const option = document.createElement("option")
        option.value       = pais.countryShortCode
        option.textContent = pais.countryName
        selPaises.appendChild(option)
    })

    selPaises.addEventListener("change", (e) => {
        selRegiones.options.length = 1
        selRegiones.disabled = true

        data.forEach((pais) => {
            if (pais.countryShortCode === e.target.value) {
                pais.regions.forEach((region) => {
                    const option = document.createElement("option")
                    option.value       = region.shortCode
                    option.textContent = region.name
                    selRegiones.appendChild(option)
                })
                selRegiones.disabled = false
            }
        })
    })
}

loadJson()


// ── CHECKBOXES → activan btnFinalizar ──────────────
const chkTerms     = document.getElementById("chkTerms")
const chkEmail     = document.getElementById("chkEmail")
const btnFinalizar = document.getElementById("btnFinalizar")

const activarFinalizar = () => {
    btnFinalizar.disabled = !chkTerms.checked
}

chkTerms.addEventListener("change", activarFinalizar)
chkEmail.addEventListener("change", activarFinalizar)
