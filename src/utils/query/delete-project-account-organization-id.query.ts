/**
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN SELECT table_schema, table_name
             FROM information_schema.columns
             WHERE column_name = 'projectId'
               AND table_schema NOT IN ('pg_catalog', 'information_schema')
    LOOP
        EXECUTE format('DELETE FROM %I.%I WHERE "projectId" = %L', 
                        r.table_schema, r.table_name, '6faf1fd6-6ba1-4e26-a60f-3d06d265d20e');
    END LOOP;
END $$;
**/
import { dataSource } from 'src/main';

export async function deleteProjectIdQuery(
  projectId: string,
  queryRunner: any = dataSource,
) {
  await queryRunner.query(`SELECT delete_project_data($1);`, [projectId]);
}

export async function deleteAccountIdQuery(
  accountId: string,
  queryRunner: any = dataSource,
) {
  await queryRunner.manager.query(`SELECT delete_account_data($1);`, [
    accountId,
  ]);
}

export async function deleteOrganizationIdQuery(
  organizationId: string,
  queryRunner: any = dataSource,
) {
  await queryRunner.manager.query(`SELECT delete_organization_data($1);`, [
    organizationId,
  ]);
}
