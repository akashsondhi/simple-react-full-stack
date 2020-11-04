const sieveOfEratosthenes = limit => {
  var sieve = [];
  var primes = [];
  var k;
  var l;
  sieve[1] = false;
  for (k = 2; k <= limit; k += 1) {
    sieve[k] = true;
  }
  for (k = 2; k * k <= limit; k += 1) {
    if (sieve[k] !== true) {
      continue;
    }
    for (l = k * k; l <= limit; l += k) {
      sieve[l] = false;
    }
  }
  sieve.forEach(function(value, key) {
    if (value) {
      this.push(key);
    }
  }, primes);
  return primes;
};

const primeMedianFinder = limit => {
  const primeArr = sieveOfEratosthenes(limit);
  primeArrLen = primeArr.length;
  if (primeArrLen % 2 == 0) {
    return JSON.stringify([
      primeArr[primeArrLen / 2 - 1],
      primeArr[primeArrLen / 2]
    ]);
  } else {
    return JSON.stringify([primeArr[(primeArrLen - 1) / 2]]);
  }
};

exports.primeMedianFinder = primeMedianFinder;
