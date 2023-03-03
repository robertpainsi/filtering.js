import {Pojo} from "../src/utils";
import {simpleTestGroups} from "./test-data";

function selectRandom(groups: Pojo) {
    const c: Pojo = {};
    for (const [key, values] of Object.entries(groups)) {
        c[key] = [...values].sort(() => 0.5 - Math.random()).slice(0, (Math.random() * values.length + 1));
    }
    return c;
}

const testData = [];
for (let i = 1; i <= 32; i++) {
    testData.push({
        name: `item-${i}`,
        groups: selectRandom(simpleTestGroups)
    })
}

console.log(JSON.stringify(testData));
