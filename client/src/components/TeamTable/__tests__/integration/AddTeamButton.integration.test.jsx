import { describe, expect } from "@jest/globals";
import "@testing-library/jest-dom";

describe("group test", () => {
  it("should ", async () => {
    const response = await fetch("/teams-test");
    const data = await response.json();
    console.log(data);
    expect(data).toHaveLength(3);
  });
});
