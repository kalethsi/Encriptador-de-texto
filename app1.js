document.addEventListener("DOMContentLoaded", function() {
    const inputText = document.querySelector('.input-text textarea');
    const outputText = document.querySelector('.output-text textarea');
    const closeButton = document.getElementById("quitar-button");
    const copiarButton = document.getElementById("copiar-button");
    const tooltip = document.getElementById("tooltip");
    const botonIntercambiar = document.getElementById("boton-intercambiar");
    const encabezadoInput = document.querySelector('.input-container .encabezado-input');
    const encabezadoOutput = document.querySelector('.output-text .encabezado-input');

    // Ocultar el botón close-button inicialmente
    closeButton.style.visibility = "hidden";
    closeButton.style.opacity = "0";

    // Ocultar el botón copiar-button inicialmente
    copiarButton.style.visibility = "hidden";
    copiarButton.style.opacity = "0";

    // Mostrar close-button cuando se escribe en input-text
    inputText.addEventListener("input", function() {
        if (inputText.value.trim() !== "") {
            closeButton.style.visibility = "visible";
            closeButton.style.opacity = "1";
        } else {
            closeButton.style.visibility = "hidden";
            closeButton.style.opacity = "0";
        }
        
        // Filtrar caracteres especiales en input-text
        inputText.value = inputText.value.replace(/[^a-zA-Z0-9\s]/g, ''); // Solo permite letras y números
        
        // Actualizar output-text en tiempo real con el contenido transformado de input-text
        updateOutputText();
    });

    // Mostrar copiar-button cuando se escribe en output-text
    inputText.addEventListener("input", function() {
        if (outputText.value.trim() !== "") {
            copiarButton.style.visibility = "visible";
            copiarButton.style.opacity = "1";
        } else {
            copiarButton.style.visibility = "hidden";
            copiarButton.style.opacity = "0";
        }
    });

    // Borrar el texto del input-text al hacer clic en close-button
    closeButton.addEventListener("click", function() {
        inputText.value = ""; // Borra el contenido del textarea
        closeButton.style.visibility = "hidden"; // Oculta el botón nuevamente
        closeButton.style.opacity = "0";
        outputText.value = ""; // Borra el contenido del output-text
        copiarButton.style.visibility = "hidden"; // Oculta el botón copiar
        copiarButton.style.opacity = "0";
    });

    // Actualizar el output-text en tiempo real con el contenido transformado de input-text
    function updateOutputText() {
        let transformedText = inputText.value;

        if (encabezadoInput.textContent.trim() === "Texto") {
            // Transformar texto si el encabezado es "Texto"
            transformedText = transformedText
                .replace(/e/g, 'enter')
                .replace(/i/g, 'imes')
                .replace(/a/g, 'ai')
                .replace(/o/g, 'ober')
                .replace(/u/g, 'ufat')
                .replace(/E/g, 'Enter')
                .replace(/I/g, 'Imes')
                .replace(/A/g, 'Ai')
                .replace(/O/g, 'Ober')
                .replace(/U/g, 'Ufat');
        } else if (encabezadoInput.textContent.trim() === "Encriptado") {
            // Revertir la transformación si el encabezado es "Encriptado"
            transformedText = transformedText
                .replace(/enter/g, 'e')
                .replace(/imes/g, 'i')
                .replace(/ai/g, 'a')
                .replace(/ober/g, 'o')
                .replace(/ufat/g, 'u')
                .replace(/Enter/g, 'E')
                .replace(/Imes/g, 'I')
                .replace(/Ai/g, 'A')
                .replace(/Ober/g, 'O')
                .replace(/Ufat/g, 'U');
        }

        // Filtrar caracteres especiales en el texto transformado
        outputText.value = transformedText.replace(/[^a-zA-Z0-9\s]/g, ''); // Solo permite letras y números
    }

    // Copiar el texto del output-text al portapapeles al hacer clic en copiar-button
    copiarButton.addEventListener("click", function() {
        // Seleccionar el texto en el output-text
        outputText.select();
        outputText.setSelectionRange(0, 99999); // Para móviles

        // Copiar el texto al portapapeles
        navigator.clipboard.writeText(outputText.value)
            .then(() => {
                // Mostrar el tooltip
                tooltip.style.visibility = 'visible';
                tooltip.style.opacity = '1';

                // Ocultar el tooltip después de 2 segundos
                setTimeout(() => {
                    tooltip.style.visibility = 'hidden';
                    tooltip.style.opacity = '0';
                }, 2000);
            })
            .catch(err => {
                console.error('Error al copiar el texto: ', err);
            });
    });

    // Intercambiar los textos de los encabezados al hacer clic en boton-intercambiar
    botonIntercambiar.addEventListener("click", function() {
        const temp = encabezadoInput.textContent;
        encabezadoInput.textContent = encabezadoOutput.textContent;
        encabezadoOutput.textContent = temp;
    });
});
