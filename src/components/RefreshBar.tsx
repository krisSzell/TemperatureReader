import * as React from "react";

export default class RefreshBar extends React.Component {
    public render() {
        return (
            <div className="refresh-bar">
                <span>Auto Refresh</span>
                <button
                    type="button"
                    className="btn btn-sm btn-toggle"
                    data-toggle="button"
                    aria-pressed="false"
                >
                    <div className="handle" />
                </button>
            </div>
        );
    }
}
