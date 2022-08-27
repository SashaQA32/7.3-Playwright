const { test, expect } = require('@playwright/test');
const user = require('../user');

test.beforeEach(async ({ page }) => {
    await page.goto('https://netology.ru/?modal=sign_in');
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test.describe('Authorization', () => {
    test('Authorization with valid data', async ({ page }) => {
        await page.locator('[placeholder="Email"]').fill(user.validUser);
        await page.locator('[placeholder="Пароль"]').fill(user.validPassword);
        await page.locator('button:has-text("Войти")').click();
        await expect(page).toHaveURL('https://netology.ru/profile');
        await expect(page.locator('text = Мои курсы и профессии')).toBeVisible();
        await page.screenshot({ path: './screenshots/screenshotSuccess.png' });
    });
    test('Authorization with invalid data', async ({ page }) => {
        await page.locator('[placeholder="Email"]').fill(user.invalidUser);
        await page.locator('[placeholder="Пароль"]').fill(user.invalidPassword);
        await page.locator('button:has-text("Войти")').click();
        await expect(page).toHaveURL('https://netology.ru/?modal=sign_in');
        await expect(
            page.locator('text=Вы ввели неправильно логин или пароль')
        ).toBeVisible();
        await page.screenshot({
            path: './screenshots/screenshotAfterFail.png',
        });
    });
});