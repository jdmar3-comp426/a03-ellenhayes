import mpg_data from "./data/mpg_data.js";
import {getStatistics, getSum} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: avgMog(mpg_data),
    allYearStats: allYearStats(mpg_data),
    ratioHybrids: ratioHybrids(mpg_data),
};

function avgMog(array) {
    const arr = array.reduce((previousValue, currentValue) => {
        return [...previousValue, ...currentValue.highway_mpg]}, []);
    let sum = getSum(arr);
    let length =arr.length;

    const arr2 = array.reduce(function(previousValue, currentValue) {
        return [...previousValue, ...currentValue.city_mpg]}, []); 
    sum = sum + getSum(arr2);
    length = length + arr2.length;

    return sum/length;
}

function allYearStats(array) {
    const arr = array.reduce(function(previousValue, currentValue) {
        return [...previousValue, ...currentValue.year]}, []);
    return getStatistics(arr);
}

function ratioHybrids(array) {
    const arr = array.reduce(function(previousValue, currentValue) {
        return [...previousValue, ...currentValue.hybrid]}, []);
    let count = 0;
    arr.forEach(element => {
        if (element) {
            count++
        }
    });
    let ration = count/arr.length;
}


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: makerHybrids(mpg_data),
    avgMpgByYearAndHybrid: undefined
};



function makerHybrids(array) {
    const types = array.reduce(function(previousValue, currentValue) {
        return [...previousValue, ...currentValue.make]});

    const noDuplicateTypes = types.reduce(function (previousValue, currentValue) {
            if (previousValue.indexOf(currentValue) === -1) {
              previousValue.push(currentValue)
            }
            return previousValue}, []);
    
    noDuplicateTypes.sort();
        
    var resultArr = []
    var result = {}

    for (let i = 0; i < noDuplicateTypes.length; i++) {
        let getHybrids = array.filter(function (element) {
            element.make == noDuplicateTypes[i];
        })
        let reducedHybrids = getHybrids.reduce(function(previousValue, currentValue) {
            return [...previousValue, ...currentValue.make]});

        result[make] = noDuplicateTypes[i];
        result[hybrids] = reducedHybrids.sort;

        resultArr[i] = {result}
    }
}

function avgMpgByYearAndHybrid(array) {
    const years = array.reduce(function(previousValue, currentValue) {
        return [...previousValue, ...currentValue.make]});

    const noDuplicateTypes = years.reduce(function (previousValue, currentValue) {
            if (previousValue.indexOf(currentValue) === -1) {
              previousValue.push(currentValue)
            }
            return previousValue}, []);
        
    noDuplicateTypes.sort();
    var bigresult = {}
    var resultArr = {}
    var result = {}
    var result1 = {}

    for (let i = 0; i < noDuplicateTypes.length; i++) {
        let getYears = array.filter(function (element) {
            element.year == noDuplicateTypes[i];
        })

        let hybrids = getYears.filter(function (element) {
            element.hybrid == true;
        })
            if (hybrids.length != 0) {
                const arr = hybrids.reduce(function(previousValue, currentValue) {
                    return [...previousValue, ...currentValue.highway_mpg]});
                    let sum = getSum(arr);
                    let length =arr.length;
                let avg = sum/length;

                const arr2 = hybrids.reduce(function(previousValue, currentValue) {
                    return [...previousValue, ...currentValue.city_mpg]}); 
                sum2 = getSum(arr2)
                length2 = arr2.length;

                result[city] = avg;
                result[highway] = sum2/length2;
                result1 = result;
                resultArr[hybrid] = result1;
            }

            let notHybrid = getYears.filter(function (element) {
                element.hybrid == false;
            })
                if (notHybrid.length != 0) {
                    const arr = notHybrid.reduce(function(previousValue, currentValue) {
                        return [...previousValue, ...currentValue.highway_mpg]});
                        let sum = getSum(arr);
                        let length =arr.length;
                    let avg = sum/length;
    
                    const arr2 = notHybrid.reduce(function(previousValue, currentValue) {
                        return [...previousValue, ...currentValue.city_mpg]}); 
                    sum2 = getSum(arr2)
                    length2 = arr2.length;
    
                    result[city] = avg;
                    result[highway] = sum2/length2;
                    result1 = result;
                    resultArr[notHybrid] = result1;
            }

            bigresult[noDuplicateTypes[i]] = resultArr;

    }

}

