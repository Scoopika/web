export default function cleanText(input: string) {
  let cleanedText = input.replace(/[^\w\s]/gi, "");

  cleanedText = cleanedText.replace(/\s+/g, "_");

  return cleanedText;
}
