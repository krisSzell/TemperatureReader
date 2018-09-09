import * as moment from "moment";

import { ITemperatureService } from "./interfaces";
import ITemperature from "./../models/temperature";

const getNowMoment = () => moment();

interface IOptions {
    resultsCount: number;
    fromDate: Date;
    toDate: Date;
}
const defaultOptions: IOptions = {
    fromDate: getNowMoment()
        .subtract(1, "hours")
        .toDate(),
    toDate: getNowMoment().toDate(),
    resultsCount: 100
};

export default class TemperatureService implements ITemperatureService {
    public getLatest(resultsCount: number): ITemperature[] {
        return this.get({ ...defaultOptions, resultsCount });
    }

    public getFrom(fromDate: Date): ITemperature[] {
        return this.get({ ...defaultOptions, fromDate });
    }

    public getBetween(fromDate: Date, toDate: Date): ITemperature[] {
        return this.get({ ...defaultOptions, fromDate, toDate });
    }

    private get(options: IOptions): ITemperature[] {
        return [];
    }
}
