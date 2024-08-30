window.addEventListener ('load', function () {
    const apiURL = "http://localhost:8080";

    //obtener la referencia a la tabla y al modal
    const tableBody = document.querySelector("#odontologoTable tbody");
    const editModal = new bootstrap.Modal (document.getElementById ("editModal"));
    const editForm = document.getElementById ("editForm");
    let currentOdontologoId;

    //llamar a la función para obtener odontologos
    fetchOdontologos();


    function fetchOdontologos() {
        fetch(`${apiURL}/odontologo/buscartodos`)
            .then(response => response.json())
            .then(data => {
                console.log (data);

                tableBody.innerHTML = "";

                //Insertar los datos en la tabla 
                data.forEach((odontologo, index) => {
                    const row = document.createElement("tr");

                    row.innerHTML = `
                        <td>${odontologo.id}</td>
                        <td>${odontologo.apellido}</td>
                        <td>${odontologo.nombre}</td>
                        <td>${odontologo.nroMatricula}</td>
                        <td>
                            <button class= "btn btn-primary btn-sm" onclick= "editOdontologo(${odontologo.id}, '${odontologo.apellido}', '${odontologo.nombre}', '${odontologo.nroMatricula}',)">Editar</button>
                            <button class= "btn btn-danger btn-sm" onclick= "deleteOdontologo(${odontologo.id})">Eliminar</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch((error) => { 
                console.error("Error al obtener los odontologos:", error);
    });
    }

    editOdontologo = function (
        id, 
        apellido, 
        nombre, 
        nroMatricula) {
            currentOdontologoId = id;
            document.getElementById("editApellido").value = apellido;
            document.getElementById("editNombre").value = nombre;
            document.getElementById("editNroMatricula").value = nroMatricula;
            editModal.show();
    };

    //para editar un paciente 
    editForm.addEventListener ("submit", function (event){
        event.preventDefault ();
        const apellido = document.getElementById ("editApellido").value;
        const nombre = document.getElementById ("editNombre").value
        const nroMatricula = document.getElementById("editNroMatricula").value;
        
        fetch(`${apiURL}/odontologo/modificar`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: currentOdontologoId,
                nombre,
                apellido,
                nroMatricula, 
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            alert("Odontologo modificado con éxito");
            fetchOdontologos();
            editModal.hide();
        })
        .catch ((error)=> {
            console.error ("Error editando odontologo:", error);

        });
    })

    // función borrar odontologo 
    deleteOdontologo = function(id) {
        if (confirm("¿Está seguro de que desea eliminar este odontologo?")){
            fetch(`${apiURL}/odontologo/eliminar/${id}`, {
                method: "DELETE",
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                alert("Odontologo eliminado con éxito");
                fetchOdontologos();
            })
            .catch((error) => {
                console.error("Error borrando odontologo:", error);
            });
        }
    };
})