module.exports = class Data1663859425753 {
  name = 'Data1663859425753'

  async up(db) {
    await db.query(`ALTER TABLE "collection_event" DROP CONSTRAINT "FK_93f81f26d6b052b289167b3ae3e"`)
    await db.query(`ALTER TABLE "collection_event" ALTER COLUMN "collection_id" DROP NOT NULL`)
    await db.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_9380d479563e5a664759359470a"`)
    await db.query(`ALTER TABLE "event" ALTER COLUMN "nft_id" DROP NOT NULL`)
    await db.query(`ALTER TABLE "offer_event" DROP CONSTRAINT "FK_0cbe3e93f04317e2e80d29affc2"`)
    await db.query(`ALTER TABLE "offer_event" ALTER COLUMN "offer_id" DROP NOT NULL`)
    await db.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_71609884f4478ed41be6672a668"`)
    await db.query(`ALTER TABLE "offer" ALTER COLUMN "nft_id" DROP NOT NULL`)
    await db.query(`ALTER TABLE "nft_entity" DROP CONSTRAINT "FK_4b98bf4d630de0037475b9bbb7a"`)
    await db.query(`ALTER TABLE "nft_entity" ALTER COLUMN "collection_id" DROP NOT NULL`)
    await db.query(`ALTER TABLE "collection_event" ADD CONSTRAINT "FK_93f81f26d6b052b289167b3ae3e" FOREIGN KEY ("collection_id") REFERENCES "collection_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_9380d479563e5a664759359470a" FOREIGN KEY ("nft_id") REFERENCES "nft_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "offer_event" ADD CONSTRAINT "FK_0cbe3e93f04317e2e80d29affc2" FOREIGN KEY ("offer_id") REFERENCES "offer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_71609884f4478ed41be6672a668" FOREIGN KEY ("nft_id") REFERENCES "nft_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "nft_entity" ADD CONSTRAINT "FK_4b98bf4d630de0037475b9bbb7a" FOREIGN KEY ("collection_id") REFERENCES "collection_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "collection_event" ADD CONSTRAINT "FK_93f81f26d6b052b289167b3ae3e" FOREIGN KEY ("collection_id") REFERENCES "collection_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "collection_event" ALTER COLUMN "collection_id" SET NOT NULL`)
    await db.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_9380d479563e5a664759359470a" FOREIGN KEY ("nft_id") REFERENCES "nft_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "event" ALTER COLUMN "nft_id" SET NOT NULL`)
    await db.query(`ALTER TABLE "offer_event" ADD CONSTRAINT "FK_0cbe3e93f04317e2e80d29affc2" FOREIGN KEY ("offer_id") REFERENCES "offer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "offer_event" ALTER COLUMN "offer_id" SET NOT NULL`)
    await db.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_71609884f4478ed41be6672a668" FOREIGN KEY ("nft_id") REFERENCES "nft_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "offer" ALTER COLUMN "nft_id" SET NOT NULL`)
    await db.query(`ALTER TABLE "nft_entity" ADD CONSTRAINT "FK_4b98bf4d630de0037475b9bbb7a" FOREIGN KEY ("collection_id") REFERENCES "collection_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "nft_entity" ALTER COLUMN "collection_id" SET NOT NULL`)
    await db.query(`ALTER TABLE "collection_event" DROP CONSTRAINT "FK_93f81f26d6b052b289167b3ae3e"`)
    await db.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_9380d479563e5a664759359470a"`)
    await db.query(`ALTER TABLE "offer_event" DROP CONSTRAINT "FK_0cbe3e93f04317e2e80d29affc2"`)
    await db.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_71609884f4478ed41be6672a668"`)
    await db.query(`ALTER TABLE "nft_entity" DROP CONSTRAINT "FK_4b98bf4d630de0037475b9bbb7a"`)
  }
}
