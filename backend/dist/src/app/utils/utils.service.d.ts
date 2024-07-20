export declare class UtilsService {
    private readonly config;
    getTimezone(): string;
    getYYYYMMDDDateFormat(date: Date, includeTime?: boolean): string;
    isValidDate(dateString: string): boolean;
    clearUrlPath(url: string): string;
    basePath(): string;
}
