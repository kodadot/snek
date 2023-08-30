module.exports = class Data1693401033913 {
    name = 'Data1693401033913'

    async up(db) {
        await db.query(`ALTER TABLE "asset_entity" ADD "deposit" numeric`)
        await db.query(`ALTER TABLE "collection_entity" ALTER COLUMN "distribution" DROP DEFAULT`)
        await db.query(`ALTER TABLE "collection_entity" ALTER COLUMN "floor" DROP DEFAULT`)
        await db.query(`ALTER TABLE "collection_entity" ALTER COLUMN "highest_sale" DROP DEFAULT`)
        await db.query(`ALTER TABLE "collection_entity" ALTER COLUMN "owner_count" DROP DEFAULT`)
        await db.query(`ALTER TABLE "collection_entity" ALTER COLUMN "volume" DROP DEFAULT`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "asset_entity" DROP COLUMN "deposit"`)
        await db.query(`ALTER TABLE "collection_entity" ALTER COLUMN "distribution" SET DEFAULT '0'`)
        await db.query(`ALTER TABLE "collection_entity" ALTER COLUMN "floor" SET DEFAULT '0'`)
        await db.query(`ALTER TABLE "collection_entity" ALTER COLUMN "highest_sale" SET DEFAULT '0'`)
        await db.query(`ALTER TABLE "collection_entity" ALTER COLUMN "owner_count" SET DEFAULT '0'`)
        await db.query(`ALTER TABLE "collection_entity" ALTER COLUMN "volume" SET DEFAULT '0'`)
    }
}
