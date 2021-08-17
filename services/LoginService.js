export const LoginService = async (userCI, password) => {
  try {
    let request = await fetch(
      "https://www.totes.com.bo/App_totes/controllers/servicio.php?service=Login",
      {
        method: "POST",
        body: JSON.stringify({
          ci: userCI,
          password: password,
        }),
      }
    );
    let response = await request.json();
    return response;
  } catch (error) {
    return error;
  }
};