const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res, cedula) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();
    await page.goto(
      "https://servicioselectorales.tse.go.cr/chc/consulta_cedula.aspx"
    );
    await page.type("#txtcedula", cedula);
    await page.click("#btnConsultaCedula");


  
    if (await page.$("#Button1") != null) {
      await page.waitForSelector("#LinkButton11");
      await page.click("#LinkButton11");
      await page.waitForSelector("#lblnombre");
    } else {
      res.send('Persona no encontrada')
      return
    }
    // cedula,nombre, padre, cedulaPadre, madre, cedulaMadre, fechaNacimiento, nacionalidad, edad, marginalidad

    const info = await page.evaluate( async () => {
        return {
          cedula: document.getElementById("lblcedula").textContent,
          nombre: document.getElementById("lblnombre").textContent,
          primerApellido:
            document.getElementById("lblprimer_apellido").textContent,
          segundoApellido: document.getElementById("lblsegundo_apellido")
            .textContent,
          padre: {
            nombre: document.getElementById("lblnombre_padre").textContent,
            cedula: document.getElementById("lblid_padre").textContent,
          },
          madre: {
            nombre: document.getElementById("lblnombre_madre").textContent,
            cedula: document.getElementById("lblid_madre").textContent,
          },
          fechaNacimiento: document.getElementById("lblfecha_nacimiento")
            .textContent,
          nacionalidad: document.getElementById("lblnacionalidad").textContent,
          marginalidad:
            document.getElementById("lblLeyendaMarginal").textContent,
        };
    });

    res.send(info);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
