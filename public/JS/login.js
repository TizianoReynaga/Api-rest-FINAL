document.getElementById('registrarse').addEventListener('click', function () {
    window.location.href = './registro.html'; // Redirige a registro.html
});
const form = document.getElementById('formLogin');
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que se recargue la página automáticamente
    
    const correo = document.getElementById('email').value;
    const contraseña = document.getElementById('password').value;

    try {
        // const response = await fetch('http://localhost:3000/login', {
        const response = await fetch('https://tienda-online-final.onrender.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo, contraseña }),
        });

        const data = await response.json();

        if (response.ok) {
            // Redirige a la URL proporcionada por el servidor
            window.location.href = data.redirectTo;
        } else {
            alert(data.message); // Muestra el mensaje de error
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        alert('Hubo un problema con el servidor.');
    }
});