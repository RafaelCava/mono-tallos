import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

const foreignKey1 = new TableForeignKey({
  columnNames: ['user_id'],
  referencedColumnNames: ['id'],
  referencedTableName: 'users',
  onDelete: 'CASCADE',
});

const foreignKey2 = new TableForeignKey({
  columnNames: ['group_id'],
  referencedColumnNames: ['id'],
  referencedTableName: 'groups',
  onDelete: 'CASCADE',
});

const foreignKey3 = new TableForeignKey({
  columnNames: ['user_creator_id'],
  referencedColumnNames: ['id'],
  referencedTableName: 'users',
  onDelete: 'CASCADE',
});

export class CreateTablesGroupsAndMessages1636166892973
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'groups',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'user_creator_id',
            type: 'int',
          },
          {
            name: 'password',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'messages',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'message',
            type: 'text',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'group_id',
            type: 'int',
          },
          {
            name: 'send_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    queryRunner.clearSqlMemory();

    await queryRunner.createForeignKey('messages', foreignKey1);
    await queryRunner.createForeignKey('messages', foreignKey2);
    await queryRunner.createForeignKey('groups', foreignKey3);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('messages', true, true);
    await queryRunner.dropTable('groups', true, true);
  }
}
