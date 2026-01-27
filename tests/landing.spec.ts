import { test, expect } from "@playwright/test";

test.describe("Kindai landing page", () => {
  test("loads hero section with CTA", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", {
        name: /Kindai helps \[Your User\] get \[Specific Outcome\]/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Start Pilot/i }),
    ).toBeVisible();
  });

  test("submits lead form successfully", async ({ page }) => {
    await page.route("**/functions/v1/lead-capture", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ status: "ok" }),
      });
    });

    await page.goto("/");
    await page.getByRole("link", { name: /Start Pilot/i }).click();

    await page.getByLabel("Name").fill("Taylor Example");
    await page.getByLabel("Email").fill("taylor@example.com");
    await page.getByLabel("Role or company").fill("Founder");
    await page.getByRole("button", { name: /Join the pilot/i }).click();

    await expect(
      page.getByText(/Thanks for your interest/i),
    ).toBeVisible();
  });

  test("shows error when lead submission fails", async ({ page }) => {
    await page.route("**/functions/v1/lead-capture", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Failed to save lead" }),
      });
    });

    await page.goto("/");
    await page.getByRole("link", { name: /Start Pilot/i }).click();

    await page.getByLabel("Name").fill("Jordan Example");
    await page.getByLabel("Email").fill("jordan@example.com");
    await page.getByLabel("Role or company").fill("Operations Lead");
    await page.getByRole("button", { name: /Join the pilot/i }).click();

    await expect(page.getByText(/Submission failed/i)).toBeVisible();
  });
});
