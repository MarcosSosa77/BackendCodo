document.addEventListener('DOMContentLoaded', () =>{
    const mostrarCrearUsuarioFormBtn = document.getElementById('mostrarCrearUsuarioFormBtn');
    const crearUsuarioForm = document.getElementById('crearUsuarioForm');
    const editarUsuarioForm = document.getElementById('editarUsuarioForm');
    const listarUsuariosBtn = document.getElementById('listarUsuariosBtn');
    const listaUsuarios = document.getElementById('listaUsuarios');

    const currentImage = document.getElementById('currentImage');

    // Mostrar u ocultar el formulario de creación de usuario
    mostrarCrearUsuarioFormBtn.addEventListener('click', () => {
        crearUsuarioForm.classList.toggle('hidden');
    });

    // Crear usuario

    /*
    crearUsuarioForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(crearUsuarioForm);
        const data = {
            nombre: formData.get('nombre'),
            apellido: formData.get('apellido'),
            mail: formData.get('mail')
        };
        const response = await fetch('/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        alert(result.mensaje);
        crearUsuarioForm.reset();
        crearUsuarioForm.classList.add('hidden');
        listarUsuarios();
    });

    */

    crearUsuarioForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(crearUsuarioForm);
        const data = {
            nombre: formData.get('nombre'),
            apellido: formData.get('apellido'),
            mail: formData.get('mail'),
            archivo: formData.get('archivo')
        };

        const response = await fetch('/usuarios', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        alert(result.mensaje);
        crearUsuarioForm.reset();
        crearUsuarioForm.classList.add('hidden');
        listarUsuarios();
    });


/*

// Editar usuario
editarUsuarioForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(editarUsuarioForm);
    const id = formData.get('editId');
    const data = {
        nombre: formData.get('editNombre'),
        apellido: formData.get('editApellido'),
        mail: formData.get('editMail'),
        archivo: formData.get('editArchivo') // Asegúrate de tener este campo en el formulario
    };

    try {
        const response = await fetch(`/usuarios/${id}`, {
            method: 'PUT',
            body: formData // Enviar el FormData completo, incluyendo el archivo si se adjunta
        });

        const result = await response.json();
        alert(result.message);
        editarUsuarioForm.reset();
        editarUsuarioForm.classList.add('hidden');
        listarUsuarios();
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        // Manejar el error adecuadamente según tu flujo de la aplicaci
    }
});

*/

// Editar usuario
editarUsuarioForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(editarUsuarioForm);
    const id = formData.get('editId');
    try {
        const response = await fetch(`/usuarios/${id}`, {
            method: 'PUT',
            body: formData
        });
        const result = await response.json();
        alert(result.message);
        editarUsuarioForm.reset();
        editarUsuarioForm.classList.add('hidden');
        listarUsuarios();
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
    }
});


    // Listar todos los usuarios
listarUsuariosBtn.addEventListener('click', listarUsuarios);

async function listarUsuarios() {
    const response = await fetch('/usuarios');
    const usuarios = await response.json();
    listaUsuarios.innerHTML = '';

    usuarios.forEach(usuario => {
        const li = document.createElement('li');
        const imageSrc = usuario.ruta_archivo ? `/uploads/${usuario.ruta_archivo}` : 'https://img.freepik.com/vector-premium/imagen-perfil-avatar-hombre-ilustracion-vectorial_268834-538.jpg?size=338&ext=jpg&ga=GA1.1.672697106.1719014400&semt=sph';
    
        li.innerHTML = `
            <span>ID: ${usuario.id}, Nombre: ${usuario.nombre}, Apellido: ${usuario.apellido}, Email: ${usuario.mail}</span>
            <img src="${imageSrc}" alt="Imagen de perfil" width="200" height="200">
            <div class="actions">
                <button class="update" data-id="${usuario.id}" data-nombre="${usuario.nombre}" data-apellido="${usuario.apellido}" data-mail="${usuario.mail}" data-imagen="${imageSrc}">Actualizar</button>
                <button class="delete" data-id="${usuario.id}">Eliminar</button>
            </div>
        `;
        listaUsuarios.appendChild(li);
    });
    

    document.querySelectorAll('.update').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const nombre = e.target.getAttribute('data-nombre');
            const apellido = e.target.getAttribute('data-apellido');
            const mail = e.target.getAttribute('data-mail');
            const imagen = e.target.getAttribute('data-imagen');


            document.getElementById('editId').value = id;
            document.getElementById('editNombre').value = nombre;
            document.getElementById('editApellido').value = apellido;
            document.getElementById('editMail').value = mail;
            //document.getElementById('editArchivo').src = imagen;
            currentImage.src = imagen;


            editarUsuarioForm.classList.remove('hidden');
        });
    });

    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', async (e) => {
            const id = e.target.getAttribute('data-id');
            const response = await fetch(`/usuarios/${id}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            alert(result.message);
            listarUsuarios();
        });
    });
}

// Función para convertir ArrayBuffer a base64
function arrayBufferToBase64(buffer) {
    const binary = [];
    const bytes = new Uint8Array(buffer);
    bytes.forEach(byte => binary.push(String.fromCharCode(byte)));
    return btoa(binary.join(''));
}




});
