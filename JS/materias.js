const renderMaterias = () => {
    const pos = document.querySelector(".materias")
    let mat = '';
    const aux = [
        "Ingles",
        "Frances",
        "Matematicas",
        "Español",
        "Ciencias Sociales",
        "Ciencias Naturales",
        "Arte",
       "Civica" 
    ];
    const dir = [
        "pruebas/ingles.html",
        "pruebas/frances.html",
        "pruebas/mat.html",
        "pruebas/espa.html",
        "PagMateria.html",
        "PagMateria.html",
        "PagMateria.html",
        "PagMateria.html"
    ];
    for (let i = 0; i < 8; i++){
        mat += `<div class = "mat"><a href = ${dir[i]}><h2>${aux[i]}</h2></a></div>`;
    }
    pos.innerHTML = mat;

}

renderMaterias();