// Objeto para almacenar las referencias a las pestañas
const chapterWindows = {
    cap1: null,
    cap2: null,
    cap3: null,
    cap4: null
};

// Función para abrir/controlar las pestañas de capítulos
function openChapter(url, windowName) {
    // Si la pestaña ya existe y no está cerrada
    if (chapterWindows[windowName] && !chapterWindows[windowName].closed) {
        // Enfoca la pestaña existente
        chapterWindows[windowName].focus();
        // Recarga el contenido para asegurar que esté actualizado
        chapterWindows[windowName].location.href = url;
    } else {
        // Abre una nueva pestaña y guarda la referencia
        chapterWindows[windowName] = window.open(url, windowName);
        
        // Verifica si el navegador bloqueó la apertura
        if (!chapterWindows[windowName] || chapterWindows[windowName].closed || typeof chapterWindows[windowName].closed == 'undefined') {
            // Si fue bloqueada, muestra alerta y abre en la misma pestaña
            if (confirm('Las ventanas emergentes están bloqueadas. ¿Deseas abrir el capítulo en esta pestaña?')) {
                window.location.href = url;
            }
        }
    }
}

// Toggle modo claro/oscuro
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Cargar tema guardado
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    // Animación de botones
    const buttons = document.querySelectorAll('.chapter-btn');
    setTimeout(() => {
        buttons.forEach((btn, index) => {
            setTimeout(() => {
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            }, 150 * index);
        });
    }, 500);
    
    // Cerrar ventanas al salir (opcional)
    window.addEventListener('beforeunload', function() {
        for (const key in chapterWindows) {
            if (chapterWindows[key] && !chapterWindows[key].closed) {
                chapterWindows[key].close();
            }
        }
    });
});