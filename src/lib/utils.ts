/**
 * Об'єднує правдиві CSS-класи в один рядок, відкидаючи false, null та undefined.
 * Функція не змінює аргументи й повертає порожній рядок, якщо придатних класів немає.
 */
export const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');
