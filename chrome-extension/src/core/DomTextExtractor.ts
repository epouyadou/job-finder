/**
 * Extracts text from a DOM element and its children, returning an array of strings.
 * @param element The DOM element to extract text from.
 * @returns An array of strings containing the extracted text.
 */
export function extractText(element: Element): string[] {
  const textArray: string[] = [];
  
  Array.from(element.childNodes).forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (text) {
        textArray.push(text);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      textArray.push(...extractText(node as Element));
    }
  });

  return textArray;
}
