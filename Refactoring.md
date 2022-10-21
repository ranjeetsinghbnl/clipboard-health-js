# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## My Explanation

Refactored points

#### 1. Usage of .env variables. dotenv package usage
Its always best to use environment variables for constants or vault service as well(if available)

Old version
```
exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  // other code
}
```
Current version
```
require('dotenv').config();
exports.deterministicPartitionKey = (event) => {
  const { 
    TRIVIAL_PARTITION_KEY, 
    MAX_PARTITION_KEY_LENGTH
  } = process.env;
}
```

#### 2. Assign default values and remove unused if's
Its always good to use ternary operator instead of simple if-else to make code look more cleaner and its good practice to assign default values as well.

Old version
```
const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};
```

Current version
```
'use strict'

const crypto = require("crypto");
require('dotenv').config();

/**
* Determine the partition key.
* @param {any} event
* @return {string} partitionKey.
*/
exports.deterministicPartitionKey = (event) => {
  const { 
    TRIVIAL_PARTITION_KEY, 
    MAX_PARTITION_KEY_LENGTH
  } = process.env;
  
  let partitionKey = TRIVIAL_PARTITION_KEY;

  if (event) {
    if (event.partitionKey) {
      partitionKey = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      partitionKey = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

  // converting partitionKey to string
  if (partitionKey && typeof partitionKey !== "string") {
    partitionKey = JSON.stringify(partitionKey);
  }

  return partitionKey.length > MAX_PARTITION_KEY_LENGTH 
    ? 
    crypto.createHash("sha3-512").update(partitionKey).digest("hex") 
    : 
    partitionKey;
};
```

#### 3. Change variable name to more meaning full name
Change variable(s) names to more meaning full name.

`candidate` rename to `partitionKey`

#### 4. Adding code comments
Its always good to add code comments, so you remember what you done after looking code back after 5yrs and help other devs to understand as well.

```
/**
* Determine the partition key.
* @param {any} event
* @return {string} partitionKey.
*/
exports.deterministicPartitionKey = (event) => {
  // code here
}
```