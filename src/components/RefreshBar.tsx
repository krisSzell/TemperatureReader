import * as React from "react";

interface IProps {
    value: boolean;
    onChange: () => void;
}

export default class RefreshBar extends React.Component<IProps> {
    public render() {
        const { value, onChange } = this.props;

        return (
            <div className="refresh-bar">
                <div className="refresh-bar-container">
                    <input
                        className="auto-refresh-checkbox"
                        type="checkbox"
                        checked={value}
                        onChange={onChange}
                    />
                    <label className="auto-refresh-label form-check-label">
                        Auto Refresh
                    </label>
                </div>
            </div>
        );
    }
}
