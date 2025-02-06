import { IconName } from "../Icon.type";

describe("IconName", () => {
  it("should be defined", () => {
    expect(IconName).toBeDefined();
  });

  it("should have the correct length", () => {
    expect(IconName.length).toBe(9);
  });

  it("should contain the correct values", () => {
    const expectedValues = [
      "home",
      "user",
      "users",
      "layout",
      "layers",
      "folder",
      "database",
      "info",
      "",
    ];
    expectedValues.forEach((value, index) => {
      expect(IconName[index]).toBe(value);
    });
  });
});
