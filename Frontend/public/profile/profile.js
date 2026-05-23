window.onload = () => {
    const nameH1 = document.getElementById("name")
    nameH1.innerHTML = sessionStorage.getItem("name")
}
