import * as React from "react";

export default class Footer extends React.Component {
    public render() {
        return (
            <footer className="sticky-footer">
                <div className="container my-auto">
                    <div className="copyright text-center my-auto">
                        <span>Copyright © Rafał Faiński / Krzysztof Skorupa 2018</span>
                    </div>
                </div>
            </footer>
        );
    }
}
