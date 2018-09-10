import * as React from "react";

import TemperatureService from "./../services/temperatureService";
import TopNavigation from "./TopNavigation";
import Footer from "./Footer";
import LatestReadings from "./charts/LatestReadings";
import Filters from "./Filters";
import IFilters from "../models/filters";

import "./app.scss";

export interface IAppState {
    data: any;
    autoRefresh: boolean;
    refreshIntervalId: any;
    intervalThreshold: number;
}

export default class App extends React.Component<{}, IAppState> {
    public state = {
        data: [],
        autoRefresh: true,
        refreshIntervalId: null,
        intervalThreshold: 10000
    };

    public componentDidMount() {
        this.fetchData();

        const refreshIntervalId = setInterval(
            this.fetchData,
            this.state.intervalThreshold
        );

        this.setState({ refreshIntervalId });
    }

    public render() {
        const { data, autoRefresh, intervalThreshold } = this.state;

        return (
            <div className="app">
                <TopNavigation />
                <div className="main-content container-fluid">
                    <div className="row">
                        <div className="col-lg-8 offset-2">
                            <LatestReadings
                                data={data}
                                onRefresh={this.fetchData}
                                autoRefresh={autoRefresh}
                                intervalThreshold={intervalThreshold}
                                onIntervalThresholdChange={
                                    this.handleIntervalThresholdChange
                                }
                                onAutoRefreshToggle={
                                    this.handleAutoRefreshToggle
                                }
                            />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    private fetchData = () => {
        const data = TemperatureService.getAll().then(data =>
            this.setState({ data })
        );
    }

    private handleAutoRefreshToggle = () => {
        const isAutoRefresh = this.state.autoRefresh;

        if (isAutoRefresh) {
            clearInterval(this.state.refreshIntervalId);

            this.setState({ autoRefresh: false });
        } else {
            const refreshIntervalId = setInterval(
                this.fetchData,
                this.state.intervalThreshold
            );

            this.setState({ autoRefresh: true, refreshIntervalId });
        }
    }

    private handleIntervalThresholdChange = (event: any) => {
        const intervalThreshold = event.target.value;

        if (this.state.autoRefresh) {
            clearInterval(this.state.refreshIntervalId);

            const refreshIntervalId = setInterval(
                this.fetchData,
                intervalThreshold
            );

            this.setState({ intervalThreshold, refreshIntervalId });
            return;
        }

        this.setState({ intervalThreshold });
    }
}
