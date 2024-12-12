import Carousel from "../components/Carousel";

export const Halls = () => {
  //aqui se debe setear el usuario que este logeado.
  //manejarlo con un estado como redux o sustand o con un localStorage.
  const user = {
    id: "674d47dcc5d0b949e5fe20f1",
    name: "Duvan Camilo Zapata",
    email: "prueba@email.com",
    role: "single",
    //password: "$2a$10$PDH8l8ZLpdiZJtbKK3cA/.iXQcvBhSF7mb4deMswd/aeHGIp0lpWC",
    v: 0,
  };

  return <Carousel auth={user} />;
};
