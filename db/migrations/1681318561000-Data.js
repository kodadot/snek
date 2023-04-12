module.exports = class Data1681318561000 {
    name = 'Data1681318561000'

    async up(db) {
        await db.query(`ALTER TABLE "collection_entity" ADD "volume" numeric`)
        await db.query(`ALTER TABLE "collection_entity" ADD "highest_sale_price" numeric`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "volume"`)
        await db.query(`ALTER TABLE "collection_entity" DROP COLUMN "highest_sale_price"`)
    }
}
