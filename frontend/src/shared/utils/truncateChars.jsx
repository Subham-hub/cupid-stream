export default function truncateChars(text, maxCharacters) {
  if (text.length > maxCharacters) return text.slice(0, maxCharacters) + "...";
  return text;
}
