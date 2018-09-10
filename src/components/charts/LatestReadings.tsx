import * as React from "react";
import * as moment from "moment";
import { Line } from "react-chartjs-2";

import ITemperature, {
    mapToChartJsLabels,
    mapToChartJsData
} from "./../../models/temperature";
import IFilters, { defaultFilters } from "../../models/filters";
import RefreshBar from "../RefreshBar";
import Filters from "../Filters";

import "./latestReadings.scss";

interface IProps {
    autoRefresh: boolean;
    data: ITemperature[];
    onRefresh: () => void;
    onAutoRefreshToggle: () => void;
    intervalThreshold: number;
    onIntervalThresholdChange: (event: any) => void;
}
interface IState {
    updated: Date;
    filters: IFilters;
    editingFilters: boolean;
    chartData: any;
}

export default class LatestReadings extends React.Component<IProps, IState> {
    public state = {
        updated: moment().toDate(),
        filters: defaultFilters,
        editingFilters: false,
        chartData: [
            {
                labels: [],
                datasets: [
                    {
                        backgroundColor: "rgb(255, 99, 132)",
                        borderColor: "rgb(255, 99, 132)",
                        data: []
                    }
                ]
            }
        ]
    };

    public componentWillReceiveProps() {
        this.setState({
            updated: moment().toDate(),
            chartData: this.mapDataToChartJs()
        });
    }

    public render() {
        const { updated, filters, editingFilters, chartData } = this.state;
        const {
            autoRefresh,
            onAutoRefreshToggle,
            intervalThreshold,
            onIntervalThresholdChange
        } = this.props;

        return (
            <div className="latest-readings card mb-3">
                <div className="chart-header card-header">
                    <div>
                        <i className="fas fa-chart-bar" />
                        <span>Latest Readings</span>
                    </div>
                    <div className="chart-options">
                        <RefreshBar
                            value={autoRefresh}
                            onChange={onAutoRefreshToggle}
                        />
                        <Filters
                            isPanelOpen={editingFilters}
                            onFiltersToggle={this.handleFiltersToggle}
                            filters={filters}
                            intervalThreshold={intervalThreshold}
                            onIntervalThresholdChange={
                                onIntervalThresholdChange
                            }
                            onShowLatestChange={this.handleShowLatestChange}
                        />
                    </div>
                </div>
                <div className="card-body">
                    <Line data={chartData} legend={{ display: false }} />
                </div>
                <div className="card-footer small text-muted">
                    Updated {moment(updated).format("L LT")}
                </div>
            </div>
        );
    }

    private mapDataToChartJs = () => {
        const data = this.props.data
            .sort((reading1, reading2) => {
                if (reading1.Time > reading2.Time) return -1;
                if (reading1.Time < reading2.Time) return 1;
                return 0;
            })
            .slice(0, this.state.filters.latest)
            .reverse();

        return {
            labels: mapToChartJsLabels(data),
            datasets: [
                {
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: mapToChartJsData(data)
                }
            ]
        };
    }

    private handleFiltersToggle = () =>
        this.setState(prevState => ({
            editingFilters: !prevState.editingFilters
        }))

    private handleShowLatestChange = (event: any) => {
        const latest = event.target.value;

        if (latest === this.state.filters.latest) {
            return;
        }

        this.setState(
            prevState => ({
                filters: { ...prevState.filters, latest }
            }),
            () => this.setState({ chartData: this.mapDataToChartJs() })
        );
    }
}
