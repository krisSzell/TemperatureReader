import * as moment from "moment";

export default interface ITemperature {
    rowid: number;
    Time: Date;
    Temp1: number;
}

export const mapToChartJsLabels = (data: ITemperature[]) =>
    data.map(value => moment(value.Time).format("hh:mm:ss"));

export const mapToChartJsData = (data: ITemperature[]) =>
    data.map(value => value.Temp1);
