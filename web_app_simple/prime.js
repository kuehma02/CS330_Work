/* jshint esversion 6 */
"use strict";

function isPrime(n) {
    for (let i = 2; i < n-1; i++){
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}

function getNPrimes(n) {
    const primeLst = [];
    var count = 2;
    while(primeLst.length != n){
        if(isPrime(count)){
            primeLst.push(count);
        }
        count +=1;
    }

    return primeList
}