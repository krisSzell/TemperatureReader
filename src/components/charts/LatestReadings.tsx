import * as React from "react";
import * as moment from "moment";
import { Line } from "react-chartjs-2";

import ITemperature, {
    mapToChartJsLabels,
    mapToChartJsData
} from "./../../models/temperature";
import RefreshBar from "../RefreshBar";

import "./latestReadings.scss";

interface IProps {
    data: ITemperature[];
    onRefresh: () => void;
}
interface IState {
    updated: Date;
}

export default class LatestReadings extends React.Component<IProps, IState> {
    public state = {
        updated: moment().toDate()
    };

    public componentWillReceiveProps() {
        this.setState({ updated: moment().toDate() });
    }

    public render() {
        const { updated } = this.state;

        return (
            <div className="latest-readings card mb-3">
                <div className="chart-header card-header">
                    <div>
                        <i className="fas fa-chart-bar" />
                        <span>Latest Readings</span>
                    </div>
                    <RefreshBar />
                </div>
                <div className="card-body">
                    <Line
                        data={this.mapDataToChartJs}
                        legend={{ display: false }}
                    />
                </div>
                <div className="card-footer small text-muted">
                    Updated {moment(updated).format("L LT")}
                </div>
            </div>
        );
    }

    private mapDataToChartJs = () => ({
        labels: mapToChartJsLabels(this.props.data),
        datasets: [
            {
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: mapToChartJsData(this.props.data)
            }
        ]
    })
}
