export const RegisterService = async (ciUser, latLong, id_contrato, aux) => {
  try {
    let request = await fetch(
      "https://www.totes.com.bo/App_totes/controllers/servicio.php?service=Register",
      {
        method: "POST",
        body: JSON.stringify({
          ci: ciUser,
          ubicacion: latLong,
          id_contrato: id_contrato,
          aux: aux,
        }),
      }
    );
    let response = await request.json();
    return response;
  } catch (error) {
    console.log("Error: ", error);
  }
};
