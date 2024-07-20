"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlReader = void 0;
const fs = require("fs");
class SqlReader {
    constructor() { }
    static parseSqlString(sqlString) {
        return (sqlString
            .replace(/(--)(.*)/g, '')
            .replace(/\r?\n|\r/g, ' ')
            .replace(/\/\*.*\*\//g, ' ')
            .replace(/\s\s+/g, ' ')
            .split(';')
            .map((query) => query.trim())
            .filter((query) => query?.length));
    }
    static readSqlFile(filepath) {
        const sqlString = fs.readFileSync(filepath).toString();
        return SqlReader.parseSqlString(sqlString);
    }
}
exports.SqlReader = SqlReader;
//# sourceMappingURL=sqlParser.js.map