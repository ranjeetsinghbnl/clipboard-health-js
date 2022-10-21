const { deterministicPartitionKey } = require("./dpk");

const emptyObjectDigest = 'c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862';
const digestForIntegerInput = '0af1abec626b095704a5b03c13e47c3c18bcedb78566b6cadc4d5201cdb27691ce62fe60835587d41c8290616ad4ff1018b14dac6f83ff005922b25925fa4e6a';
const nestedObjRes = '{"data":10}'

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal '10' when given {partitionKey:'10'}", () => {
    const trivialKey = deterministicPartitionKey({partitionKey:'10'});
    expect(trivialKey).toBe("10");
  });

  it("Returns the digest when empty object is passed", () => {
    const trivialKey = deterministicPartitionKey({});
    expect(trivialKey).toBe(emptyObjectDigest);
  });

  it("Returns the digest when nested object passed", () => {
    const trivialKey = deterministicPartitionKey({partitionKey:{data:10}});
    expect(trivialKey).toBe(nestedObjRes);
  });
  it("Returns the digest when number is passed", () => {
    const trivialKey = deterministicPartitionKey(10);
    expect(trivialKey).toBe(digestForIntegerInput);
  });
});


// 0
// c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862
// 10
// {"data":10}
// 0af1abec626b095704a5b03c13e47c3c18bcedb78566b6cadc4d5201cdb27691ce62fe60835587d41c8290616ad4ff1018b14dac6f83ff005922b25925fa4e6a