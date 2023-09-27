module.exports = class Data1695821906886 {
    name = 'Data1695821906886'

    async up(db) {
        await db.query(`DROP INDEX "public"."IDX_8fed68c917920ff529994c2c65"`)
        await db.query(`DROP INDEX "public"."IDX_703bf1a1b47a340c5675fdda85"`)
        await db.query(`DROP INDEX "public"."IDX_bc1e8041261fb0585641b3f9c0"`)
        await db.query(`ALTER TABLE "collection_entity" ALTER COLUMN "owner_count" DROP DEFAULT`)
        await db.query(`CREATE INDEX "IDX_8fed68c917920ff529994c2c65" ON "nft_entity" ("block_number") `)
        await db.query(`CREATE INDEX "IDX_703bf1a1b47a340c5675fdda85" ON "collection_entity" ("block_number") `)
    }

    async down(db) {
        await db.query(`CREATE UNIQUE INDEX "IDX_8fed68c917920ff529994c2c65" ON "nft_entity" ("block_number") `)
        await db.query(`CREATE UNIQUE INDEX "IDX_703bf1a1b47a340c5675fdda85" ON "collection_entity" ("block_number") `)
        await db.query(`CREATE INDEX "IDX_bc1e8041261fb0585641b3f9c0" ON "collection_entity" ("owner_count") `)
        await db.query(`ALTER TABLE "collection_entity" ALTER COLUMN "owner_count" SET DEFAULT '0'`)
        await db.query(`DROP INDEX "public"."IDX_8fed68c917920ff529994c2c65"`)
        await db.query(`DROP INDEX "public"."IDX_703bf1a1b47a340c5675fdda85"`)
    }
}
