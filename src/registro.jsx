import { useState } from 'react';

const Registro = () => {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [cedulaCiudadania, setCedulaCiudadania] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registro exitoso');
  };

  return (
    <div className="flex flex-col h-screen">
      <nav className="flex justify-between items-center bg-blue-500 text-white p-4">
        <div className="flex items-center">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-14 h-14" />
        </div>
        <input
          type="search"
          placeholder="Buscar salas"
          className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 pl-10 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
        />
        <div className="flex items-center">
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg mr-2">
            Iniciar sesión
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
            Volver
          </button>
        </div>
      </nav>

      <div className="flex-1 flex justify-center items-center">
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full md:w-3/4 lg:w-1/2 xl:w-1/3 p-4 border-2 border-red-500 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Registro</h2>
          <input
            type="text"
            placeholder="Nombre Completo"
            className="w-full p-2 pl-10 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 mb-4"
            value={nombreCompleto}
            onChange={(e) => setNombreCompleto(e.target.value)}
          />
          <input
            type="number"
            placeholder="Cedula de Ciudadanía"
            className="w-full p-2 pl-10 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 mb-4"
            value={cedulaCiudadania}
            onChange={(e) => setCedulaCiudadania(e.target.value)}
          />
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
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg" type="submit">
            Registrarse
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

export default Registro;