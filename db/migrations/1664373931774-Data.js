module.exports = class Data1664373931774 {
  name = 'Data1664373931774'

  async up(db) {
    await db.query(`ALTER TABLE "series" ADD "issuer" text`)
    await db.query(`ALTER TABLE "series" ADD "highest_sale" numeric`)
    await db.query(`ALTER TABLE "series" ADD "emote_count" integer`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "series" DROP COLUMN "issuer"`)
    await db.query(`ALTER TABLE "series" DROP COLUMN "highest_sale"`)
    await db.query(`ALTER TABLE "series" DROP COLUMN "emote_count"`)
  }
}
