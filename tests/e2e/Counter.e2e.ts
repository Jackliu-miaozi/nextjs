// 导入 node 的断言模块
import assert from "node:assert";
// 导入 faker 库用于生成随机数据
import { faker } from "@faker-js/faker";
// 导入 Playwright 的测试工具
import { expect, test } from "@playwright/test";

// 描述计数器相关的测试用例
test.describe("Counter", () => {
  // 描述增量操作相关的测试用例
  test.describe("Increment operation", () => {
    // 测试用例：当输入负数时应显示错误信息
    test("should display error message when incrementing with negative number", async ({
      page,
    }) => {
      // 导航到计数器页面
      await page.goto("/counter");

      // 获取显示计数的元素
      const count = page.getByText("Count:");
      // 获取计数文本内容
      const countText = await count.textContent();

      // 断言计数文本不为空
      assert(countText !== null, "Count should not be null");

      // 在输入框中填入-1
      await page.getByLabel("Increment by").fill("-1");
      // 点击增加按钮
      await page.getByRole("button", { name: "Increment" }).click();

      // 验证错误信息是否可见
      await expect(
        page.getByText("Number must be greater than or equal to 1"),
      ).toBeVisible();
      // 验证计数值未发生变化
      await expect(page.getByText("Count:")).toHaveText(countText);
    });

    // 测试用例：验证计数器的增加功能
    test("should increment the counter and validate the count", async ({
      page,
    }) => {
      // 生成随机ID用于隔离测试请求
      const e2eRandomId = faker.number.int({ max: 1000000 });
      // 设置HTTP请求头
      await page.setExtraHTTPHeaders({
        "x-e2e-random-id": e2eRandomId.toString(),
      });
      // 导航到计数器页面
      await page.goto("/counter");

      // 获取显示计数的元素
      const count = page.getByText("Count:");
      // 获取计数文本内容
      const countText = await count.textContent();

      // 断言计数文本不为空
      assert(countText !== null, "Count should not be null");

      // 将文本转换为数字
      const countNumber = Number(countText.split(" ")[1]);

      // 在输入框中填入2并点击增加按钮
      await page.getByLabel("Increment by").fill("2");
      await page.getByRole("button", { name: "Increment" }).click();

      // 验证计数增加了2
      await expect(page.getByText("Count:")).toHaveText(
        `Count: ${countNumber + 2}`,
      );

      // 在输入框中填入3并点击增加按钮
      await page.getByLabel("Increment by").fill("3");
      await page.getByRole("button", { name: "Increment" }).click();

      // 验证计数总共增加了5
      await expect(page.getByText("Count:")).toHaveText(
        `Count: ${countNumber + 5}`,
      );
    });
  });
});
