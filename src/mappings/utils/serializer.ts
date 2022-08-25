// eslint-disable-next-line no-confusing-arrow, @typescript-eslint/no-unsafe-return
export const serializer = (_: unknown, value: unknown): unknown => typeof value === 'bigint' ? value.toString() : value;
