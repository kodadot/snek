module.exports = class Data1666944897549 {
  name = 'Data1666944897549'

  async up(db) {
    await db.query(`ALTER TABLE "collection_entity" ADD "nft_count" integer NOT NULL`)
    await db.query(`ALTER TABLE "collection_entity" ADD "supply" integer NOT NULL`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "nft_count"`)
    await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "supply"`)
  }
}
