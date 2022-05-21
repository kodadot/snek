module.exports = class Data1653131550969 {
  name = 'Data1653131550969'

  async up(db) {
    await db.query(`CREATE TABLE "offer_event" ("id" character varying NOT NULL, "block_number" numeric, "caller" text NOT NULL, "current_owner" text, "interaction" character varying(6) NOT NULL, "meta" text NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "offer_id" character varying NOT NULL, CONSTRAINT "PK_292fd2efd338dfd5d627a4310e3" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_0cbe3e93f04317e2e80d29affc" ON "offer_event" ("offer_id") `)
    await db.query(`ALTER TABLE "offer" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL`)
    await db.query(`ALTER TABLE "offer" ADD "status" character varying(9) NOT NULL`)
    await db.query(`ALTER TABLE "offer" ADD "updated_at" TIMESTAMP WITH TIME ZONE`)
    await db.query(`ALTER TABLE "collection_event" DROP COLUMN "interaction"`)
    await db.query(`ALTER TABLE "collection_event" ADD "interaction" character varying(11) NOT NULL`)
    await db.query(`ALTER TABLE "event" DROP COLUMN "interaction"`)
    await db.query(`ALTER TABLE "event" ADD "interaction" character varying(11) NOT NULL`)
    await db.query(`ALTER TABLE "offer_event" ADD CONSTRAINT "FK_0cbe3e93f04317e2e80d29affc2" FOREIGN KEY ("offer_id") REFERENCES "offer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "offer_event"`)
    await db.query(`DROP INDEX "public"."IDX_0cbe3e93f04317e2e80d29affc"`)
    await db.query(`ALTER TABLE "offer" DROP COLUMN "created_at"`)
    await db.query(`ALTER TABLE "offer" DROP COLUMN "status"`)
    await db.query(`ALTER TABLE "offer" DROP COLUMN "updated_at"`)
    await db.query(`ALTER TABLE "collection_event" ADD "interaction" character varying(12) NOT NULL`)
    await db.query(`ALTER TABLE "collection_event" DROP COLUMN "interaction"`)
    await db.query(`ALTER TABLE "event" ADD "interaction" character varying(12) NOT NULL`)
    await db.query(`ALTER TABLE "event" DROP COLUMN "interaction"`)
    await db.query(`ALTER TABLE "offer_event" DROP CONSTRAINT "FK_0cbe3e93f04317e2e80d29affc2"`)
  }
}
