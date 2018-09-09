import ITemperature from "./../models/temperature";

export interface ITemperatureService {
    getLatest: (resultsCount: number) => ITemperature[];
    getFrom: (fromDate: Date) => ITemperature[];
    getBetween: (fromDate: Date, toDate: Date) => ITemperature[];
}
