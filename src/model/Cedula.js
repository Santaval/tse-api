const { default: puppeteer } = require('puppeteer');

class CedulaModel {
  static async get(cedula) {
    try {
      const browser = await puppeteer.launch({
        args: [
          '--disable-setuid-sandbox',
          '--no-sandbox',
          '--single-process',
          '--no-zygote',
        ],
        executablePath:
          process.env.NODE_ENV === 'production'
            ? process.env.PUPPETEER_EXECUTABLE_PATH
            : puppeteer.executablePath(),
      });

      const page = await browser.newPage();
      await page.goto(
        'https://servicioselectorales.tse.go.cr/chc/consulta_cedula.aspx'
      );
      await page.type('#txtcedula', cedula);
      await page.click('#btnConsultaCedula');

      const linkSelector = '#LinkButton11';
      const foundSelector = await page.waitForSelector(linkSelector, {
        timeout: 10000,
      });

      if (!foundSelector) throw new Error('Persona no encontrada | 404');

      await page.click(linkSelector);
      await page.waitForSelector('#lblnombre');

      const info = await page.evaluate(() => {
        return {
          cedula: document.getElementById('lblcedula').textContent,
          nombre: document.getElementById('lblnombre').textContent,
          primerApellido:
            document.getElementById('lblprimer_apellido').textContent,
          segundoApellido: document.getElementById('lblsegundo_apellido')
            .textContent,
          fechaNacimiento: document.getElementById('lblfecha_nacimiento')
            .textContent,
        };
      });
      if (browser) {
        await browser.close();
      }
      return info;
    } catch (error) {
      throw new Error('No fue posible completar la solicitud | 500');
    }
  }
}

module.exports = CedulaModel;