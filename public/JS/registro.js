document.getElementById('ingresar').addEventListener('click', function () {
    window.location.href = './login.html'; // Redirige a login.html
});

document.getElementById('registrarse').addEventListener('click', async () => {
    const nombre = document.getElementById('name').value;
    const correo = document.getElementById('email').value;
    const contraseña = document.getElementById('pass').value;

    if (!nombre || !correo || !contraseña) {
        alert('Por favor completa todos los campos.');
        return;
    }

    try {
        const response = await fetch('https://tienda-online-final.onrender.com/registro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, correo, contraseña }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            window.location.href = './login.html'; // Redirige al inicio de sesión
        } else {
            alert(data.message); // Muestra el error proporcionado por el servidor
        }
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        alert('Hubo un problema con el servidor.');
    }
});
