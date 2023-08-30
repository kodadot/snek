module.exports = class Data1693406570820 {
    name = 'Data1693406570820'

    async up(db) {
        await db.query(`ALTER TABLE "collection_entity" ALTER COLUMN "distribution" SET DEFAULT '0'`)
        await db.query(`ALTER TABLE "collection_entity" ALTER COLUMN "floor" SET DEFAULT '0'`)
        await db.query(`ALTER TABLE "collection_entity" ALTER COLUMN "highest_sale" SET DEFAULT '0'`)
        await db.query(`ALTER TABLE "collection_entity" ALTER COLUMN "owner_count" SET DEFAULT '0'`)
        await db.query(`ALTER TABLE "collection_entity" ALTER COLUMN "volume" SET DEFAULT '0'`)
    }

    async down(db) {}
}
