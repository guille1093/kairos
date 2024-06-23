import * as fs from 'fs';

export class SqlReader {
  constructor() { }

  static parseSqlString(sqlString: string): string[] {
    return (
      sqlString
        .replace(/(--)(.*)/g, '')
        .replace(/\r?\n|\r/g, ' ')
        .replace(/\/\*.*\*\//g, ' ')
        .replace(/\s\s+/g, ' ')
        .split(';')
        .map((query) => query.trim())
        .filter((query) => query?.length)
    );
  }

  static readSqlFile(filepath: string): string[] {
    const sqlString = fs.readFileSync(filepath).toString();
    return SqlReader.parseSqlString(sqlString);
  }
}
