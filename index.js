const {deterministicPartitionKey} = require("./dpk");

console.log(deterministicPartitionKey());

console.log(deterministicPartitionKey({}));

console.log(deterministicPartitionKey({partitionKey:"10"}));

console.log(deterministicPartitionKey({partitionKey:{data:10}}));

console.log(deterministicPartitionKey(10));
