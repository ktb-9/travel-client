const { init, device, expect, element, by } = require("detox");
const {
  detox: { configurations },
} = require("../package.json");

describe("Example", () => {
  beforeAll(async () => {
    await init(configurations);
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should have welcome screen", async () => {
    await expect(element(by.id("welcome"))).toBeVisible();
  });

  it("should show hello screen after tap", async () => {
    await element(by.id("welcome_button")).tap();
    await expect(element(by.id("hello"))).toBeVisible();
  });
});
