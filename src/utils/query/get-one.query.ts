import { dataSource } from 'src/main';

export async function getOneFromTable(
  tableName: string,
  columns: string[],
  values: any[],
  select = '*',
  operator = 'AND',
  dataRunner: any = dataSource,
): Promise<any> {
  try {
    const conditions = columns
      .map((column, index) => {
        if (values[index] === null) {
          return `"${column}" IS NULL`;
        } else {
          return `"${column}" = $${index + 1}`;
        }
      })
      .join(' ' + operator + ' ');

    const nonNullValues = values.filter((value) => value !== null);

    const result = await dataRunner.manager.query(
      `SELECT ${select === '*' ? '*' : `${select}`} FROM ${tableName} WHERE ${conditions}`,
      nonNullValues,
    );
    return result[0] || false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
