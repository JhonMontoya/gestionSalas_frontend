import { useState } from 'react';
import axios from 'axios';

const IniciarSesion = ({ onVolverClick }) => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Resetear errores previos

    try {
      const response = await axios.post('http://localhost:3000/usuarios', {
        usuario,
        contrasena,
      });

      if (response.status === 200) {
        console.log('Inicio de sesión exitoso', response.data);
        // Puedes redirigir o guardar el token aquí
      }
    } catch (err) {
      console.error('Error en la solicitud:', err);
      setError('Credenciales inválidas o error en el servidor.');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <nav className="flex justify-between items-center bg-blue-500 text-white p-4">
        <div className="flex items-center">
          <img src="../img/Logo.png" alt="logo" className='w-14' />
        </div>
        <div className="flex items-center">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mr-2">
            Registrarse
          </button>
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg"
            onClick={onVolverClick}
          >
            Volver
          </button>
        </div>
      </nav>

      <div className="flex-1 flex justify-center items-center">
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full md:w-3/4 lg:w-1/2 xl:w-1/3 p-4 border-2 border-red-500 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <input
            type="text"
            placeholder="Usuario"
            className="w-full p-2 pl-10 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 mb-4"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-2 pl-10 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 mb-4"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg" type="submit">
            Iniciar Sesión
          </button>
        </form>
      </div>

      <footer className="bg-gray-200 text-gray-600 p-4 text-center">
        <p>Nuestra información de contacto:</p>
        <p>Teléfono: 123456789</p>
        <p>Correo electrónico: ejemplo@ejemplo.com</p>
        <p>Dirección: Calle Ejemplo, 123</p>
      </footer>
    </div>
  );
};

export default IniciarSesion;
