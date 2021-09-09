export const reqBtnState = async (userCI, id_contrato) => {
  try {
    let request = await fetch(
      "https://www.totes.com.bo/App_totes/controllers/servicio.php?service=controlBoton",
      {
        method: "POST",
        body: JSON.stringify({
          ci: userCI,
          id_contrato: id_contrato,
        }),
      }
    );
    let response = await request.json();
    return response;
  } catch (error) {
    return error;
  }
};
