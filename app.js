document.addEventListener('DOMContentLoaded', function() {
    var textarea = document.querySelector('.cuadro_de_texto_introducir');
    var botonEncriptar = document.getElementById('boton_encriptar');
    var botonDesencriptar = document.getElementById('boton_desencriptar');
    var botonCopiar = document.getElementById('boton_copiar');
    var resultadoSection = document.querySelector('.traductor_presentacion_resultado');
    var resultadoSectionVar = document.querySelector('.traductor_presentacion_resultado_var');
    var imagenResultado = resultadoSection.querySelector('.vector');
    var textoSalida = resultadoSection.querySelector('.texto_salida');
    var subtituloSalida = resultadoSection.querySelector('.subtitulo_salida');
    var texto_resultado = resultadoSectionVar.querySelector('.resultado');

    // Añade un event listener al textarea para restringir la entrada
    textarea.addEventListener('input', function() {
        // Permite solo letras minúsculas, espacios, puntos y comas
        this.value = this.value.replace(/[^a-z\s.,]/g, '');
    });

    function mostrarMensajeIndicativo() {
        imagenResultado.style.visibility = 'visible';
        imagenResultado.style.opacity = 1;
        texto_resultado.style.visibility = 'hidden';
        subtituloSalida.style.visibility = 'visible';
        textoSalida.style.visibility = 'visible';
        resultadoSection.style.visibility = 'visible';
    }

    function ocultarMensajeIndicativo() {
        imagenResultado.style.visibility = 'hidden';
        imagenResultado.style.opacity = 0;
        subtituloSalida.style.visibility = 'hidden';
        textoSalida.style.visibility = 'hidden';
        resultadoSection.style.visibility = 'hidden';
    }

    function actualizarResultado(texto) {
        if (texto.trim() === '0' || texto.trim() === '') {
            // Muestra el mensaje indicativo y oculta el resultado procesado
            mostrarMensajeIndicativo();
            botonCopiar.style.opacity = 0;
            botonCopiar.style.visibility = 'hidden';
        } else {
            // Muestra el resultado procesado y el botón de copiar
            ocultarMensajeIndicativo();
            texto_resultado.textContent = texto;
            texto_resultado.style.visibility = 'visible';
            botonCopiar.style.opacity = 1;
            botonCopiar.style.visibility = 'visible';
        }
    }

    botonEncriptar.addEventListener('click', function() {
        var texto = textarea.value;

        if (texto.trim() === '') {
            texto = '0'; // Asigna 0 si el texto está vacío
        } else {
            texto = texto
                .replace(/e/g, 'enter')
                .replace(/i/g, 'imes')
                .replace(/a/g, 'ai')
                .replace(/o/g, 'ober')
                .replace(/u/g, 'ufat');
        }

        actualizarResultado(texto);
    });

    botonDesencriptar.addEventListener('click', function() {
        var texto = textarea.value;

        if (texto.trim() === '') {
            texto = '0'; // Asigna 0 si el texto está vacío
        } else {
            texto = texto
                .replace(/enter/g, 'e')
                .replace(/imes/g, 'i')
                .replace(/ai/g, 'a')
                .replace(/ober/g, 'o')
                .replace(/ufat/g, 'u');
        }

        actualizarResultado(texto);
    });

    botonCopiar.addEventListener('click', function() {
        var texto = texto_resultado.textContent;
    
        navigator.clipboard.writeText(texto).then(function() {
            alert('Texto copiado al portapapeles!');
        }).catch(function(err) {
            console.error('Error al copiar el texto: ', err);
            alert('No se pudo copiar el texto.');
        });
    });
});
