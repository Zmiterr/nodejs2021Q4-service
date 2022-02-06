import { MigrationInterface, QueryRunner } from 'typeorm';

export class name1644003978653 implements MigrationInterface {
  name = 'name1644003978653';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "tasks" (
                "id" uuid NOT NULL,
                "title" character varying NOT NULL,
                "order" integer NOT NULL,
                "description" character varying NOT NULL,
                "boardid" uuid NOT NULL,
                "userid" uuid,
                "columnid" uuid,
                "columnIdId" uuid,
                CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL,
                "name" character varying NOT NULL,
                "login" character varying NOT NULL,
                "password" character varying NOT NULL,
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "boards" (
                "id" uuid NOT NULL,
                "title" character varying NOT NULL,
                "columns" json,
                CONSTRAINT "PK_606923b0b068ef262dfdcd18f44" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD CONSTRAINT "FK_11fcd4d77e66a3913f9aafb9bfb" FOREIGN KEY ("columnIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(
      `INSERT INTO "users" ("id", "name", "login", "password") VALUES ('8dfe2ef5-f62b-421a-9fc8-e8e6a775bebc', 'admin', 'admin', '$2b$04$NnV9PL0WKibjsezdmgsPxuXU00mDFbLbSCmh1fwmvoCMUa8vPBjRG')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "tasks" DROP CONSTRAINT "FK_11fcd4d77e66a3913f9aafb9bfb"
        `);
    await queryRunner.query(`
            DROP TABLE "boards"
        `);
    await queryRunner.query(`
            DROP TABLE "users"
        `);
    await queryRunner.query(`
            DROP TABLE "tasks"
        `);
  }
}
