import { slugify } from "./slugify";
describe("slugify", () => {
  it("show throw error with wrong input", () => {
    expect(() => {
      slugify(2);
    }).toThrow();
  });

  it("should return the slugifed value", () => {
    expect(slugify("slugified")).toEqual("slugified");
    expect(slugify("slugified value")).toEqual("slugified-value");
    expect(slugify("slugified 0123 value")).toEqual("slugified-0123-value");
    expect(slugify("Some RaNDom_Value")).toEqual("some-ra-n-dom-value");
  });

  it("should escape character", () => {
    expect(slugify("s#$%^ v^&*()alue")).toEqual("s-v-alue");
  });

  it("should remove leading score", () => {
    expect(slugify("_leading score")).toEqual("leading-score");
  });

  describe("options", () => {
    it("should use different seperator", () => {
      expect(slugify("slugified value", { separator: "@" })).toEqual(
        "slugified@value"
      );
    });

    it("should throw error when passed wrong value for separator", () => {
      // @ts-ignore
      expect(() => slugify("foo", { separator: false })).toThrow();
    });

    it("should preserve case", () => {
      expect(slugify("Slugified Value", { lowercase: false })).toEqual(
        "Slugified-Value"
      );
    });

    it("should decamelize", () => {
      expect(slugify("Slugified Value", { decamelize: false })).toEqual(
        "slugified-value"
      );
    });

    it("should preserveLeadingUnderscore", () => {
      expect(
        slugify("_Slugified Value", { preserveLeadingUnderscore: true })
      ).toEqual("_slugified-value");
    });
  });
});
