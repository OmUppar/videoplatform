import { dataSource } from 'src/main';

export async function getManyFromTable(
  tableName: string,
  columns: string[],
  values: any[],
  select = '*',
  operator = 'AND',
  dataRunner: any = dataSource,
): Promise<any> {
  try {
    // Create the condition string with proper quoting of column names
    const conditions = columns
      .map((column, index) => {
        const quotedColumn = `"${column}"`; // Ensure column names are double-quoted to preserve casing
        return values[index] === null
          ? `${quotedColumn} IS NULL`
          : `${quotedColumn} = $${index + 1}`;
      })
      .join(` ${operator} `);

    const nonNullValues = values.filter((value) => value !== null);

    // Format the select clause to handle custom column selections with proper quoting
    const formattedSelect =
      select === '*'
        ? '*'
        : select
            .split(',')
            .map((col) => `"${col.trim()}"`)
            .join(', ');

    const query = `SELECT ${formattedSelect} FROM "${tableName}" WHERE ${conditions}`;
    const result = await dataRunner.manager.query(query, nonNullValues);
    return result;
  } catch (error) {
    console.error('QueryFailedError:', error);
    return false;
  }
}
