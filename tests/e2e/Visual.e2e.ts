// 导入Percy的截图功能
import percySnapshot from "@percy/playwright";
// 导入Playwright的测试工具
import { expect, test } from "@playwright/test";

// 描述可视化测试套件
test.describe("Visual testing", () => {
  // 描述静态页面测试组
  test.describe("Static pages", () => {
    // 测试首页截图
    test("should take screenshot of the homepage", async ({ page }) => {
      // 导航到首页
      await page.goto("/");

      // 验证页面标题是否可见
      await expect(
        page.getByRole("heading", {
          name: "Boilerplate Code for Your Next.js Project with Tailwind CSS",
        }),
      ).toBeVisible();

      // 使用Percy进行截图
      await percySnapshot(page, "Homepage");
    });

    // 测试关于页面截图
    test("should take screenshot of the about page", async ({ page }) => {
      // 导航到关于页面
      await page.goto("/about");

      // 验证"About"链接是否可见
      await expect(page.getByRole("link", { name: "About" })).toBeVisible();

      // 使用Percy进行截图
      await percySnapshot(page, "About");
    });

    // 测试作品集页面和详情页面截图
    test("should take screenshot of the portfolio page and one details page", async ({
      page,
    }) => {
      // 导航到作品集页面
      await page.goto("/portfolio");

      // 验证欢迎文本是否可见
      await expect(
        page.getByText("Welcome to my portfolio page!"),
      ).toBeVisible();

      // 对作品集页面进行截图
      await percySnapshot(page, "Portfolio");

      // 点击"Portfolio 2"链接
      await page.getByRole("link", { name: "Portfolio 2" }).click();

      // 验证详情页面的文本是否可见
      await expect(
        page.getByText("Created a set of promotional"),
      ).toBeVisible();

      // 对详情页面进行截图
      await percySnapshot(page, "Portfolio details");
    });

    // 测试法语首页截图
    test("should take screenshot of the French homepage", async ({ page }) => {
      // 导航到法语首页
      await page.goto("/fr");

      // 验证法语页面标题是否可见
      await expect(
        page.getByRole("heading", {
          name: "Code de démarrage pour Next.js avec Tailwind CSS",
        }),
      ).toBeVisible();

      // 使用Percy进行截图
      await percySnapshot(page, "Homepage - French");
    });
  });
});
