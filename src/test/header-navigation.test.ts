import { describe, expect, it } from "vitest";
import { helpDestinations, helpQuestions } from "@/lib/portal-data";

describe("Header help navigation", () => {
  it("provides all four requested help destinations", () => {
    expect(helpDestinations.map(({ page }) => page)).toEqual([
      "help-center", "support", "faq", "contact",
    ]);
  });

  it("provides answers for the FAQ destination", () => {
    expect(helpQuestions.length).toBeGreaterThan(0);
    expect(helpQuestions.every(({ question, answer }) => question.length > 0 && answer.length > 0)).toBe(true);
  });
});