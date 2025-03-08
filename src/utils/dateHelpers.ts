export function getDateFromDbString(dbDateString: string): Date {
  const parsed = Date.parse(dbDateString);

  return new Date(parsed);
}
