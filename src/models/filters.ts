export default interface IFilters {
    latest: number;
    between?: {
        from: Date;
        to: Date;
    };
}

export const defaultFilters = {
    latest: 50
};
