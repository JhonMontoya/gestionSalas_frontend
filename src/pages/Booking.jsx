import { useEffect, useState } from "react";
import CreateBooking from "../components/CreateBooking";
//import { getHalls } from "../services/http.controller";

export const Booking = () => {
  const [idUser, setIdUser] = useState("");
  const [idSala, setIdSala] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [status, setStatus] = useState("activo");
  const [message, setMessage] = useState("");
  const [halls, setHalls] = useState([]);
  const [hallSelected, setHallSelected] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      //const data = await getHalls();
      const data = [
        {
          name: "sala 1",
          id: "dmfklmdslfn",
          status: "disponible",
        },
        {
          name: "sala fg",
          id: "djfkdfns",
          status: "no disponible",
        },
        {
          name: "sala 4",
          id: "djkfghsdfk",
          status: "disponible",
        },
      ];

      if (!data) {
        return;
      } else {
        setHalls(data.filter((d) => d.status === "disponible"));
      }
    };

    fetchRooms();
  }, []);

  //Simulaciòn del usuario logueado
  const user = { name: "Ana", id: "123" };

  const states = {
    idUser,
    idSala,
    dateEnd,
    dateStart,
    status,
    hallSelected,
  };

  const actions = {
    setIdUser,
    setIdSala,
    setDateEnd,
    setDateStart,
    setStatus,
    setHallSelected,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const reservaData = {
      IdUser: user.id,
      IdSala: hallSelected,
      dateStart,
      dateEnd,
      status,
    };

    console.log(reservaData);

    try {
      const response = await fetch("http://localhost:3000/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservaData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Reserva creada con éxito");
        setIdUser("");
        setIdSala("");
        setDateStart("");
        setDateEnd("");
        setStatus("activo");
      } else {
        setMessage(`Error: ${result.message || "No se pudo crear la reserva"}`);
      }
    } catch (error) {
      setMessage("Error al crear la reserva");
      console.error("Error:", error);
    }
  };

  return (
    <CreateBooking
      onSubmit={handleSubmit}
      message={message}
      states={states}
      actions={actions}
      halls={halls}
    />
  );
};
