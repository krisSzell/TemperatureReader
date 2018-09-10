import * as React from "react";
import classnames from "classnames";

import IFilters from "./../models/filters";

interface IProps {
    isPanelOpen: boolean;
    onFiltersToggle: () => void;
    filters: IFilters;
    intervalThreshold: number;
    onIntervalThresholdChange: (event: any) => void;
    onShowLatestChange: (event: any) => void;
}

export default class Filters extends React.Component<IProps> {
    public render() {
        const {
            isPanelOpen,
            onFiltersToggle,
            filters,
            intervalThreshold,
            onIntervalThresholdChange,
            onShowLatestChange
        } = this.props;

        return (
            <div
                className={classnames("filters-bar", {
                    isPanelOpen: isPanelOpen
                })}
            >
                <i
                    onClick={onFiltersToggle}
                    className={`toggle-filters fas ${
                        isPanelOpen ? "fa-chevron-up" : "fa-chevron-down"
                    }`}
                />
                <div
                    className={classnames("filters-input", {
                        open: isPanelOpen
                    })}
                >
                    <div className="filters-refresh-interval">
                        <label>Refresh interval: </label>
                        <input
                            value={intervalThreshold}
                            type="range"
                            min="1000"
                            max="60000"
                            step="1000"
                            onChange={onIntervalThresholdChange}
                        />
                        <span>{intervalThreshold / 1000} s</span>
                    </div>
                    <div className="filters-show-latest">
                        <label>
                            Show latest{" "}
                            <input
                                type="number"
                                value={filters.latest}
                                onChange={onShowLatestChange}
                            />{" "}
                            readings.
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}
