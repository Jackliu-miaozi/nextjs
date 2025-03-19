// 从 Playwright 测试框架中导入 expect 和 test 方法
import { expect, test } from "@playwright/test";

// Checkly is a tool used to monitor deployed environments, such as production or preview environments.
// It runs end-to-end tests with the `.check.e2e.ts` extension after each deployment to ensure that the environment is up and running.
// With Checkly, you can monitor your production environment and run `*.check.e2e.ts` tests regularly at a frequency of your choice.
// If the tests fail, Checkly will notify you via email, Slack, or other channels of your choice.
// On the other hand, E2E tests ending with `*.e2e.ts` are only run before deployment.
// You can run them locally or on CI to ensure that the application is ready for deployment.

// BaseURL needs to be explicitly defined in the test file.
// Otherwise, Checkly runtime will throw an exception: `CHECKLY_INVALID_URL: Only URL's that start with http(s)`
// You can't use `goto` function directly with a relative path like with other *.e2e.ts tests.
// Check the example at https://feedback.checklyhq.com/changelog/new-changelog-436

// 创建一个名为"Sanity"的测试套件
test.describe("Sanity", () => {
  // 创建一个名为"Static pages"的子测试套件
  test.describe("Static pages", () => {
    // 测试首页显示是否正常
    test("should display the homepage", async ({ page, baseURL }) => {
      // 导航到首页
      await page.goto(`${baseURL}/`);

      // 验证页面标题是否可见
      await expect(
        page.getByRole("heading", {
          name: "Boilerplate Code for Your Next.js Project with Tailwind CSS",
        }),
      ).toBeVisible();
    });

    // 测试导航到关于页面的功能
    test("should navigate to the about page", async ({ page, baseURL }) => {
      // 导航到首页
      await page.goto(`${baseURL}/`);

      // 点击"About"链接
      await page.getByRole("link", { name: "About" }).click();

      // 验证URL是否以about结尾
      await expect(page).toHaveURL(/about$/);

      // 验证关于页面的欢迎文本是否可见
      await expect(
        page.getByText("Welcome to our About page", { exact: false }),
      ).toBeVisible();
    });

    // 测试导航到作品集页面的功能
    test("should navigate to the portfolio page", async ({ page, baseURL }) => {
      // 导航到首页
      await page.goto(`${baseURL}/`);

      // 点击"Portfolio"链接
      await page.getByRole("link", { name: "Portfolio" }).click();

      // 验证URL是否以portfolio结尾
      await expect(page).toHaveURL(/portfolio$/);

      // 验证页面上是否有6个Portfolio开头的链接
      await expect(
        page.locator("main").getByRole("link", { name: /^Portfolio/ }),
      ).toHaveCount(6);
    });
  });
});
