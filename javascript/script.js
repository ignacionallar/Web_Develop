// JavaScript básico para el sitio web de Ignacio Nallar
//console.log("Script cargado correctamente");

// Lógica para manejar errores 404 - Solo en producción o cuando sea necesario
// Nota: En desarrollo local, los 404 se manejan mejor en el servidor web.
// Esta lógica se activa solo si se detecta una página sin contenido principal válido.

// Verificar si la página tiene contenido válido al cargar
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const hasMainContent = body.querySelector('.hero') ||
                           body.querySelector('.sobre-mi') ||
                           body.querySelector('.formacion') ||
                           body.querySelector('.cursos') ||
                           body.querySelector('.cursos-grid') ||
                           body.querySelector('.habilidades') ||
                           body.querySelector('.proyectos') ||
                           body.querySelector('.proyectos-listado') ||
                           body.querySelector('.seccion-contacto') ||
                           body.querySelector('.no-disponible') ||
                           body.querySelector('.curso-detalle') ||
                           body.querySelector('.detalle-proyecto-contenedor');

    // Solo redirigir si no hay contenido y no estamos en 404.html
    if (!hasMainContent && !window.location.href.includes('404.html')) {
        // En desarrollo local, evitar redirecciones automáticas para no interferir
        // Descomentar la línea siguiente solo en producción:
        // window.location.href = '404.html';
        console.warn('Página sin contenido principal detectada. Posible 404.');
    }
});

// Funciones de navegación y animaciones pueden agregarse aquí

// Carrusel vertical para cursos más solicitados
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        let position = 0;
        const speed = 0.5; // píxeles por frame
        const resetPosition = -carousel.scrollHeight / 2; // Mitad de la altura total

        function animate() {
            position -= speed;
            if (position <= resetPosition) {
                position = 0;
            }
            carousel.style.transform = `translateY(${position}px)`;
            requestAnimationFrame(animate);
        }

        animate();
    }

    // Lista dinámica de cursos para lista-cursos.html
    const gridContainer = document.querySelector('.grid-container');
    if (gridContainer) {
        const cursos = [
            {
                nombre: 'Fundamentos de Programación',
                icono: 'assets/brain.svg',
                imagen: 'assets/brain.svg',
                informacion: 'Este curso te permitirá comprender los conceptos fundamentales de la programación y desarrollar habilidades prácticas mediante ejercicios y proyectos reales.',
                contenido: '- Introducción a la lógica de programación.<br>- Variables, tipos de datos y operadores.<br>- Estructuras de control (condicionales y bucles).<br>- Proyecto final de aplicación básica.'
            },
            {
                nombre: 'Matemática para Informática',
                icono: 'assets/calculator.svg',
                imagen: 'assets/calculator.svg',
                informacion: 'Domina los conceptos matemáticos esenciales para la informática, incluyendo lógica, álgebra y estadística aplicada.',
                contenido: '- Lógica matemática y proposicional.<br>- Álgebra lineal básica.<br>- Estadística descriptiva.<br>- Aplicaciones en algoritmos.'
            },
            {
                nombre: 'Programación I',
                icono: 'assets/code.svg',
                imagen: 'assets/code.svg',
                informacion: 'Aprende los fundamentos avanzados de la programación estructurada y orientada a objetos.',
                contenido: '- Programación orientada a objetos.<br>- Clases, objetos y herencia.<br>- Manejo de excepciones.<br>- Desarrollo de aplicaciones simples.'
            },
            {
                nombre: 'Programación II',
                icono: 'assets/code.svg',
                imagen: 'assets/code.svg',
                informacion: 'Profundiza en técnicas avanzadas de programación y desarrollo de software.',
                contenido: '- Patrones de diseño.<br>- Estructuras de datos avanzadas.<br>- Programación concurrente.<br>- Proyecto final complejo.'
            },
            {
                nombre: 'Base de Datos',
                icono: 'assets/database.svg',
                imagen: 'assets/database.svg',
                informacion: 'Aprende a diseñar, implementar y gestionar bases de datos relacionales.',
                contenido: '- Modelado de datos y normalización.<br>- SQL para consultas y manipulación.<br>- Diseño de esquemas.<br>- Optimización de consultas.'
            },
            {
                nombre: 'Electrónica',
                icono: 'assets/plug.svg',
                imagen: 'assets/plug.svg',
                informacion: 'Introducción a los principios de la electrónica y circuitos básicos.',
                contenido: '- Leyes de Kirchhoff y circuitos.<br>- Componentes electrónicos básicos.<br>- Diseño de circuitos simples.<br>- Simulación y prototipado.'
            }
        ];

        gridContainer.innerHTML = ''; // Limpiar contenido existente

        cursos.forEach((curso, index) => {
            const item = document.createElement('div');
            item.className = 'grid-item';
            item.innerHTML = `
                <img src="${curso.icono}" alt="${curso.nombre}">
                <p><strong>${curso.nombre}</strong></p>
            `;
            item.addEventListener('click', () => mostrarDetalleCurso(index));
            gridContainer.appendChild(item);
        });

        // Función para mostrar detalles del curso
        function mostrarDetalleCurso(index) {
            const curso = cursos[index];
            const section = document.querySelector('.cursos-grid');
            section.innerHTML = `
                <h1>Cursos</h1>
                <div class="hero-buttons">
                    <a href="#" id="volver-lista" class="btn btn-primary">Volver a la lista</a>
                </div>
                <section class="curso-detalle">
                    <div class="curso-imagen">
                        <img src="${curso.imagen}" alt="Imagen del curso">
                    </div>
                    <div class="curso-info">
                        <h1>${curso.nombre}</h1>
                        <details>
                            <summary>Información</summary>
                            <p>${curso.informacion}</p>
                        </details>
                        <details>
                            <summary>Contenido mínimo</summary>
                            <p>${curso.contenido}</p>
                        </details>
                    </div>
                </section>
            `;

            document.getElementById('volver-lista').addEventListener('click', (e) => {
                e.preventDefault();
                location.reload(); // Recargar para volver a la lista
            });
        }
    }

    // Lista dinámica de proyectos para lista-proyectos.html
    const proyectosGridContainer = document.querySelector('.proyectos-grid-container');
    if (proyectosGridContainer) {
        const proyectos = [
            {
                nombre: 'Syst. Gestor Horario Docente',
                imagen: '',
                informacion: 'Este sistema fue desarrollado para optimizar la asignación y gestión de horarios de profesores en instituciones educativas grandes. Permite a los administradores generar horarios sin conflictos, gestionar la disponibilidad docente y generar reportes detallados.',
                tecnologias: '- Backend: PHP (Laravel)<br>- Frontend: HTML, CSS, JavaScript<br>- Base de Datos: MySQL<br>- Control de Versiones: Git / GitHub',
                enlaces: { demo: '#', repo: 'https://github.com/ignacionallar/SGHD' }
            },
            {
                nombre: 'Guía de Funciones',
                imagen: '',
                informacion: 'Una guía interactiva para aprender funciones y procedimientos para programar.',
                tecnologias: '- Tecnologías: C<br>- Librerías: Math.h<br>- Software: ZinjaI',
                enlaces: { demo: '#', repo: 'nodisponible.html' }
            },
            {
                nombre: 'Blogsite',
                imagen: '',
                informacion: 'Un sitio web de blog personal con sistema de gestión de contenido básico, comentarios y integración con redes sociales.',
                tecnologias: '- Frontend: HTML, CSS, JavaScript<br>- Control de Versiones: Git / GitHub<br>- Despliegue: GitHub Pages',
                enlaces: { demo: '#', repo: 'https://github.com/ignacionallar/Web_Develop' }
            }
        ];

        proyectosGridContainer.innerHTML = ''; // Limpiar contenido existente

        proyectos.forEach((proyecto, index) => {
            const card = document.createElement('div');
            card.className = 'proyecto-listado-card';
            card.innerHTML = `
                <div class="proyecto-listado-imagen"></div>
                <p class="proyecto-listado-nombre">${proyecto.nombre}</p>
            `;
            card.addEventListener('click', () => mostrarDetalleProyecto(index));
            proyectosGridContainer.appendChild(card);
        });

        // Función para mostrar detalles del proyecto
        function mostrarDetalleProyecto(index) {
            const proyecto = proyectos[index];
            const section = document.querySelector('.proyectos-listado');
            section.innerHTML = `
                <h1 class="proyectos-listado-titulo">Proyectos</h1>
                <div class="hero-buttons">
                    <a href="#" id="volver-lista-proyectos" class="btn btn-primary">Volver a la lista</a>
                </div>
                <section class="detalle-proyecto-contenedor">
                    <div class="proyecto-detalle-imagen">
                        <div class="imagen-placeholder-grande"></div>
                    </div>
                    <div class="proyecto-detalle-info">
                        <h1 class="proyecto-detalle-nombre">${proyecto.nombre}</h1>
                        <details open>
                            <summary>Información</summary>
                            <div class="contenido-acordeon">
                                <p>${proyecto.informacion}</p>
                            </div>
                        </details>
                        <details>
                            <summary>Tecnologías empleadas</summary>
                            <div class="contenido-acordeon">
                                <p>${proyecto.tecnologias}</p>
                            </div>
                        </details>
                        <details>
                            <summary>Enlaces y Repositorio</summary>
                            <div class="contenido-acordeon">
                                <a href="${proyecto.enlaces.repo}" target="_blank" class="btn btn-secondary btn-acordeon">Repositorio GitHub</a>
                            </div>
                        </details>
                    </div>
                </section>
            `;

            document.getElementById('volver-lista-proyectos').addEventListener('click', (e) => {
                e.preventDefault();
                location.reload(); // Recargar para volver a la lista
            });
        }
    }

    // Validación del formulario de contacto
    const form = document.querySelector('.contacto-formulario');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir envío por defecto

            const nombre = document.querySelector('input[name="nombre"]').value.trim();
            const apellido = document.querySelector('input[name="apellido"]').value.trim();
            const email = document.querySelector('input[name="email"]').value.trim();
            const mensaje = document.querySelector('textarea[name="mensaje"]').value.trim();

            let errores = [];

            // Validar nombre
            if (nombre === '') {
                errores.push('El nombre es obligatorio.');
            } else if (nombre.length < 4) {
                errores.push('El nombre debe tener al menos 4 caracteres.');
            }

            // Validar apellido
            if (apellido === '') {
                errores.push('El apellido es obligatorio.');
            } else if (apellido.length < 4) {
                errores.push('El apellido debe tener al menos 4 caracteres.');
            }

            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '') {
                errores.push('El email es obligatorio.');
            } else if (!emailRegex.test(email)) {
                errores.push('El email no tiene un formato válido.');
            }

            // Validar mensaje
            if (mensaje === '') {
                errores.push('El mensaje es obligatorio.');
            } else if (mensaje.length < 10) {
                errores.push('El mensaje debe tener al menos 10 caracteres.');
            }

            // Mostrar errores o enviar
            if (errores.length > 0) {
                alert('Errores en el formulario:\n' + errores.join('\n'));
            } else {
                alert('Formulario enviado correctamente. (Simulación)');
                form.reset(); // Limpiar formulario
            }
        });
    }
});