import * as React from "react";

import TemperatureService from "./../services/temperatureService";
import TopNavigation from "./TopNavigation";
import Footer from "./Footer";
import LatestReadings from "./charts/LatestReadings";

import "./app.scss";

export interface IAppState {
    data: any;
}

export default class App extends React.Component<{}, IAppState> {
    public state = {
        data: []
    };

    public componentDidMount() {
        this.fetchData();
    }

    public render() {
        return (
            <div className="app">
                <TopNavigation />
                <div className="main-content container-fluid">
                    <div className="row">
                        <div className="col-lg-8">
                            <LatestReadings
                                data={this.state.data}
                                onRefresh={this.fetchData}
                            />
                        </div>
                        <div className="col-lg-4">
                            <div className="card mb-3">
                                <div className="card-header">
                                    <i className="fas fa-chart-pie" />
                                    Pie Chart Example
                                </div>
                                <div className="card-body">
                                    <canvas
                                        id="myPieChart"
                                        width="100%"
                                        height="100"
                                    />
                                </div>
                                <div className="card-footer small text-muted">
                                    Updated yesterday at 11:59 PM
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    private fetchData() {
        const data = TemperatureService.getAll().then(data =>
            this.setState({ data })
        );
    }
}
