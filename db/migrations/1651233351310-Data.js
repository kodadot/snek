module.exports = class Data1651233351310 {
  name = 'Data1651233351310'

  async up(db) {
    await db.query(`CREATE TABLE "offer" ("id" character varying NOT NULL, "caller" text NOT NULL, "block_number" numeric NOT NULL, "expiration" numeric NOT NULL, "price" numeric NOT NULL, "nft_id" character varying NOT NULL, CONSTRAINT "PK_57c6ae1abe49201919ef68de900" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_71609884f4478ed41be6672a66" ON "offer" ("nft_id") `)
    await db.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_71609884f4478ed41be6672a668" FOREIGN KEY ("nft_id") REFERENCES "nft_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "offer"`)
    await db.query(`DROP INDEX "public"."IDX_71609884f4478ed41be6672a66"`)
    await db.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_71609884f4478ed41be6672a668"`)
  }
}
