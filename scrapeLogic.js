const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res, cedula) => {
  try {
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

    const page = await browser.newPage();
    await page.goto("https://servicioselectorales.tse.go.cr/chc/consulta_cedula.aspx");
    await page.type("#txtcedula", cedula);
    await page.click("#btnConsultaCedula");

    const linkSelector = "#LinkButton11";
    const foundSelector = await page.waitForSelector(linkSelector, { timeout: 10000 });

    if (!foundSelector) {
      res.send('Persona no encontrada');
      return;
    }

    await page.click(linkSelector);
    await page.waitForSelector("#lblnombre");

    const info = await page.evaluate(() => {
      return {
        cedula: document.getElementById("lblcedula").textContent,
        nombre: document.getElementById("lblnombre").textContent,
        primerApellido: document.getElementById("lblprimer_apellido").textContent,
        segundoApellido: document.getElementById("lblsegundo_apellido").textContent,
        fechaNacimiento: document.getElementById("lblfecha_nacimiento").textContent,

          // uncomment to get more info

        // padre: {
        //   nombre: document.getElementById("lblnombre_padre").textContent,
        //   cedula: document.getElementById("lblid_padre").textContent,
        // },
        // madre: {
        //   nombre: document.getElementById("lblnombre_madre").textContent,
        //   cedula: document.getElementById("lblid_madre").textContent,
        // },
        //nacionalidad: document.getElementById("lblnacionalidad").textContent,
        //marginalidad: document.getElementById("lblLeyendaMarginal").textContent,
      };
    });

    res.send(info);
  } catch (error) {
    console.error(error);
    if (error.name === 'TimeoutError') {
      res.status(500).send('La solicitud excedió el tiempo límite');
    } else {
      res.status(500).send(`Ocurrió un error durante la ejecución de Puppeteer: ${error.message}`);
    }
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

module.exports = { scrapeLogic };
