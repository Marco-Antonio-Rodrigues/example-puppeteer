import puppeteer, { Browser, Page } from 'puppeteer';

describe('Testes de interface', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 50 });
    page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Deve acessar o site e verificar o título', async () => {
    await page.goto('https://automationexercise.com', { waitUntil: 'networkidle2' });
    const title = await page.title();
    expect(title).toContain('Automation Exercise');
  }, 15000);

  test('Deve exibir o logo na home', async () => {
    const logoVisible = await page.$eval('.logo.pull-left', el => el instanceof HTMLElement && el.offsetHeight > 0);
    expect(logoVisible).toBe(true);
  });

  test('Deve exibir erro de login com credenciais inválidas', async () => {
    await page.click('a[href="/login"]');
    await page.waitForSelector('input[data-qa="login-email"]');
    await page.type('input[data-qa="login-email"]', 'email@invalido.com');
    await page.type('input[data-qa="login-password"]', 'senhaerrada');

    await Promise.all([
      page.click('button[data-qa="login-button"]'),
    ]);

    await page.waitForSelector('p[style*="color: red"]', { timeout: 5000 });

    const errorText = await page.$eval('p[style*="color: red"]', el => el.textContent?.trim());
    expect(errorText).toBe('Your email or password is incorrect!');
  }, 15000);


  test('Deve listar produtos e realizar busca', async () => {
    await page.click('a[href="/"]');
    await page.click('a[href="/products"]');
    await page.waitForSelector('.features_items');

    const produtos = await page.$$eval('.features_items .col-sm-4', el => el.length);
    expect(produtos).toBeGreaterThan(0);

    await page.type('#search_product', 'Tshirt');
    await page.click('#submit_search');
    await page.waitForSelector('.features_items');

    const encontrados = await page.$$eval('.features_items .col-sm-4', el => el.length);
    expect(encontrados).toBeGreaterThanOrEqual(1);
  }, 15000);

  test('Validação de formulário, só deve enviar com todos os campos preenchidos.', async () => {
    await page.goto('https://automationexercise.com', { waitUntil: 'networkidle2' });
    await page.click('a[href="/contact_us"]');
    await page.waitForSelector('input[data-qa="email"]');

    await page.type('input[data-qa="email"]', 'teste@email.com');

    // Captura o alerta de sucesso
    let alertMessage = '';
    page.once('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.accept();
    });

    await page.click('input[data-qa="submit-button"]');
    await new Promise(resolve => setTimeout(resolve, 1000));

    expect(alertMessage).toBe('Press OK to proceed!');

    await page.waitForSelector('.status.alert-success', { timeout: 5000 });

    const successText = await page.$eval('.status.alert-success', el => el.textContent?.trim());
    expect(successText).not.toBe('Success! Your details have been submitted successfully.');
  }, 15000);


});
