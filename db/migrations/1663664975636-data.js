module.exports = class data1663664975636 {
  name = 'data1663664975636'

  async up(db) {
    await db.query(`CREATE TABLE "spotlight" ("id" character varying NOT NULL, "collections" integer NOT NULL, "unique_collectors" integer NOT NULL, "unique" integer NOT NULL, "sold" integer NOT NULL, "total" integer NOT NULL, "average" numeric, "volume" numeric, CONSTRAINT "PK_bafc41803e508da64ed687ed3b9" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_258db3cbcb3c172be89fcbf674" ON "spotlight" ("sold") `)
  }

  async down(db) {
    await db.query(`DROP TABLE "spotlight"`)
    await db.query(`DROP INDEX "public"."IDX_258db3cbcb3c172be89fcbf674"`)
  }
}
