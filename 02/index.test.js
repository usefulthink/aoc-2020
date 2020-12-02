const expect = require("unexpected");

describe("getPasswordValidator", () => {
  const { getPasswordValidator } = require("./index");
  it("works", () => {
    const validate = getPasswordValidator("1-3 a");

    expect(validate("1231233"), "to be false");
    expect(validate("a1b2c3"), "to be true");
    expect(validate("aaa"), "to be true");
    expect(validate("1a1a"), "to be true");
    expect(validate("aaaaaaa"), "to be false");
  });
});

describe("getPasswordValidator", () => {
  const { getOtherPasswordValidator } = require("./index");
  it("works", () => {
    const validate = getOtherPasswordValidator("1-3 a");

    // expect(validate("1231233"), "to be false");
    expect(validate("a1b2c3"), "to be true");
    expect(validate("aaa"), "to be false");
    expect(validate("1a1a"), "to be false");
    expect(validate("aaaaaaa"), "to be false");
  });
});
