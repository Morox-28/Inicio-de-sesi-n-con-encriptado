document.addEventListener("DOMContentLoaded", function() {
    fetch("alumnos.json")
        .then(response => response.json())
        .then(data => {

            const celdasVacias = [
                [false, false, false, false, false, false, true, true],
                [true, true, false, false, false, true, true, true],
                [false, false, true, true, true, true, false, false],
                [false, false, false, true, false, false,false,false],
                [false, true, true, true, true, true, true, true]
            ];

            const tabla = document.getElementById("tabla");
            let index = 0;
            
            for (let i = 0; i < celdasVacias.length; i++) {
                let fila = document.createElement("tr");
                for (let j = 0; j < celdasVacias[i].length; j++) {
                    let celda = document.createElement("td");
                    
                    if (celdasVacias[i][j]) {
                        celda.classList.add("empty");
                    } else if (index < data.length) {
                        celda.textContent = `${data[index].Nombre} ${data[index].Apellido}`;
                        index++;
                    }
                    
                    celda.addEventListener("click", function() {
                        if (!celda.classList.contains("empty")) {
                            celda.classList.toggle("selected");

                            if(celda.classList.contains("selected")){

                            }
                        }
                    });

                    fila.appendChild(celda);
                }
                tabla.appendChild(fila);
            }
        })
        .catch(error => console.error("Error al cargar el JSON:", error));
        
        document.getElementById("guardar").addEventListener("click", function () {
            let estadoCeldas = [];
            const filas = document.querySelectorAll("#tabla tr");
        
            filas.forEach((fila) => {
                let filaData = [];
                fila.querySelectorAll("td").forEach((celda) => {
                    if (celda.classList.contains("empty")) {
                        filaData.push(null);
                    } else {
                        filaData.push(celda.classList.contains("selected") ? "A" : "P");
                    }
                });
                estadoCeldas.push(filaData);
            });
        
            localStorage.setItem("estadoCeldas", JSON.stringify(estadoCeldas));
            console.log("Datos guardados en localStorage:", estadoCeldas);
        });
        
        
});
