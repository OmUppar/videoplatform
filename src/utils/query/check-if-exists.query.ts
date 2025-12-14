import { dataSource } from 'src/main';

/**
 * Fastest Way to check if data exists in table, with support for handling null values in columns
 */
export async function checkIfDataExists(
  tableName: string,
  columns: string[],
  values: any[],
): Promise<boolean> {
  try {
    const conditions = columns.map((column, index) => {
      // Check if the corresponding value is null and adjust the SQL condition accordingly
      if (values[index] === null) {
        return `"${column}" IS NULL`;
      } else {
        return `"${column}"=$${index + 1}`;
      }
    });

    const sqlQuery = `SELECT EXISTS (
      SELECT 1 FROM ${tableName} WHERE ${conditions.join(' AND ')}
    )`;

    // Filter out the null values for the actual SQL query execution
    const nonNullValues = values.filter((value) => value !== null);

    const result = await dataSource.manager.query(sqlQuery, nonNullValues);
    return result[0].exists;
  } catch (error) {
    return false;
  }
}
