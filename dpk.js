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