module.exports = class Data1681318561000 {
    name = 'Data1681318561000'

    async up(db) {
        await db.query(`ALTER TABLE "collection_entity" ADD "distribution" integer NOT NULL DEFAULT '0'`)
        await db.query(`ALTER TABLE "collection_entity" ADD "floor" numeric NOT NULL DEFAULT '0'`)
        await db.query(`ALTER TABLE "collection_entity" ADD "highest_sale" numeric NOT NULL DEFAULT '0'`)
        await db.query(`ALTER TABLE "collection_entity" ADD "owner_count" integer NOT NULL DEFAULT '0'`)
        await db.query(`ALTER TABLE "collection_entity" ADD "volume" numeric NOT NULL DEFAULT '0'`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "distribution"`)
        await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "floor"`)
        await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "highest_sale"`)
        await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "owner_count"`)
        await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "volume"`)
    }
}
