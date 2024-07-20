export declare class SqlReader {
    constructor();
    static parseSqlString(sqlString: string): string[];
    static readSqlFile(filepath: string): string[];
}
