const form = document.getElementById("agregarform");
const apiURL = "http://localhost:8080";

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const apellido = document.getElementById("apellido").value;
  const nombre = document.getElementById("nombre").value;
  const dni = document.getElementById("dni").value;
  const fecha = document.getElementById("fecha").value;
  const calle = document.getElementById("calle").value;
  const numero = document.getElementById("numero").value;
  const localidad = document.getElementById("localidad").value;
  const provincia = document.getElementById("provincia").value;

  const datosFormulario = {
    nombre,
    apellido,
    dni,
    fechaIngreso: fecha,
    domicilio: {
      calle,
      numero,
      localidad,
      provincia,
    },
  };

  fetch(`${apiURL}/paciente/guardar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosFormulario),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert("paciente agregado con éxito"), form.reset();
    })
    .catch((error) => {
      console.error("Error agregando paciente: ", error);
    });
});
