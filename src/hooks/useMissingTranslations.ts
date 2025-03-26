
import { useState, useCallback } from 'react';

/**
 * Hook to track and manage missing translation keys in the application
 */
export function useMissingTranslations() {
  const [missingKeys, setMissingKeys] = useState<string[]>([]);
  const [hasErrors, setHasErrors] = useState(false);

  // Clear all missing translation keys
  const clearMissingKeys = useCallback(() => {
    setMissingKeys([]);
    setHasErrors(false);
  }, []);

  // Scans the page DOM for elements with text content that might need translation
  const scanPageForMissingTranslations = useCallback(() => {
    const textNodes: { element: HTMLElement; text: string }[] = [];
    const hardcodedTexts: { element: HTMLElement; text: string }[] = [];

    // Helper function to check if text might be hardcoded
    const mightBeHardcoded = (text: string): boolean => {
      // Skip very short strings, numbers, and special characters
      if (text.trim().length < 3) return false;
      if (/^\d+(\.\d+)?$/.test(text)) return false;
      if (/^[!@#$%^&*(),.?":{}|<>]+$/.test(text)) return false;
      return true;
    };

    // Recursive function to traverse DOM and find text nodes
    const findTextNodes = (element: HTMLElement) => {
      // Skip script, style, and hidden elements
      if (
        element.tagName === 'SCRIPT' ||
        element.tagName === 'STYLE' ||
        element.getAttribute('aria-hidden') === 'true' ||
        element.classList.contains('sr-only') ||
        element.style.display === 'none'
      ) {
        return;
      }

      // Check if element has a data-i18n-key attribute
      const hasI18nKey = element.hasAttribute('data-i18n-key');

      // Get all child text nodes
      Array.from(element.childNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent?.trim();
          if (text && mightBeHardcoded(text) && !hasI18nKey) {
            textNodes.push({
              element,
              text,
            });
          }
        }
      });

      // Recursively check all child elements
      Array.from(element.children).forEach((child) => {
        findTextNodes(child as HTMLElement);
      });
    };

    // Start scanning from body
    findTextNodes(document.body);

    // Filter out likely hardcoded texts (longer than 3 chars, not just numbers/symbols)
    textNodes.forEach((item) => {
      if (mightBeHardcoded(item.text)) {
        hardcodedTexts.push(item);
      }
    });

    return {
      hardcodedTexts,
      count: hardcodedTexts.length,
    };
  }, []);

  // Generate a template for adding the missing translations
  const generateTranslationTemplate = useCallback(() => {
    if (missingKeys.length === 0) return '';

    const template = missingKeys.reduce((acc, key) => {
      return `${acc}  "${key}": "",\n`;
    }, '{\n') + '}';

    return template;
  }, [missingKeys]);

  return {
    missingKeys,
    clearMissingKeys,
    generateTranslationTemplate,
    scanPageForMissingTranslations,
    hasErrors
  };
}
