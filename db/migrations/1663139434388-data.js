module.exports = class data1663139434388 {
  name = 'data1663139434388'

  async up(db) {
    await db.query(`CREATE TABLE "series" ("id" character varying NOT NULL, "unique" integer NOT NULL, "unique_collectors" integer NOT NULL, "sold" integer NOT NULL, "total" integer NOT NULL, "average_price" numeric, "floor_price" numeric, "buys" integer, "volume" numeric, "name" text NOT NULL, "metadata" text, "image" text, CONSTRAINT "PK_e725676647382eb54540d7128ba" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_e9b94c49c07399bfa4bb6ab1a7" ON "series" ("sold") `)
    await db.query(`CREATE INDEX "IDX_68b808a9039892c61219f868f2" ON "series" ("name") `)
    await db.query(`CREATE TABLE "cache_status" ("id" character varying NOT NULL, "last_block_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_1001e39eb0aa38d043d96f7f4fa" PRIMARY KEY ("id"))`)
  }

  async down(db) {
    await db.query(`DROP TABLE "series"`)
    await db.query(`DROP INDEX "public"."IDX_e9b94c49c07399bfa4bb6ab1a7"`)
    await db.query(`DROP INDEX "public"."IDX_68b808a9039892c61219f868f2"`)
    await db.query(`DROP TABLE "cache_status"`)
  }
}
