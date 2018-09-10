import * as moment from "moment";

import ITemperature from "./../../models/temperature";

function randomInRange(min, max) {
    return Math.random() < 0.5
        ? (1 - Math.random()) * (max - min) + min
        : Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateData() {
    const result: ITemperature[] = [];
    const now = moment();

    for (let i = 0; i < getRandomInt(100, 150); i++) {
        result.push({
            rowid: i,
            Time: now.subtract(1, "minutes").toDate(),
            Temp1: randomInRange(15, 50)
        });
    }

    return result;
}
