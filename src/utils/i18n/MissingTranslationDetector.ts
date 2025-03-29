
/**
 * Utility class to detect and manage missing translations
 */
export class MissingTranslationDetector {
  private static missingKeys: Record<string, string[]> = {};
  private static isInitialized = false;

  /**
   * Initialize the missing translation detector
   */
  public static init(): void {
    if (this.isInitialized) return;
    
    this.isInitialized = true;
    this.missingKeys = {};
    
    // Subscribe to i18next initialization event if needed
    if (typeof window !== 'undefined') {
      window.addEventListener('i18nextInitialized', () => {
        console.debug('[MissingTranslationDetector] Initialized with i18next');
      });
    }
  }

  /**
   * Add a missing key to the collection
   */
  public static addMissingKey(language: string, key: string): void {
    if (!this.missingKeys[language]) {
      this.missingKeys[language] = [];
    }
    
    if (!this.missingKeys[language].includes(key)) {
      this.missingKeys[language].push(key);
      console.debug(`[i18n] Missing translation for ${language}:${key}`);
    }
  }

  /**
   * Get all missing keys
   */
  public static getMissingKeys(): Record<string, string[]> {
    return this.missingKeys;
  }

  /**
   * Export missing keys as JSON string
   */
  public static exportMissingKeys(): string {
    return JSON.stringify(this.missingKeys, null, 2);
  }

  /**
   * Scan the page for untranslated texts
   */
  public static scanPageForUntranslated(): Record<string, string[]> {
    const textNodes: { element: HTMLElement; text: string }[] = [];
    
    if (typeof document === 'undefined') return this.missingKeys;
    
    const walkDOM = (node: Node, callback: (node: Node) => void) => {
      callback(node);
      let child = node.firstChild;
      while (child) {
        walkDOM(child, callback);
        child = child.nextSibling;
      }
    };
    
    walkDOM(document.body, (node) => {
      if (
        node.nodeType === 3 && // Text node
        node.nodeValue && 
        node.nodeValue.trim() !== '' &&
        node.parentElement && 
        !['SCRIPT', 'STYLE'].includes(node.parentElement.tagName)
      ) {
        const text = node.nodeValue.trim();
        // Skip very short texts, numbers, and some common patterns
        if (
          text.length > 3 && 
          !/^\d+$/.test(text) && 
          !text.startsWith('{{') && 
          !text.startsWith('t(')
        ) {
          textNodes.push({
            element: node.parentElement as HTMLElement,
            text
          });
        }
      }
    });
    
    // For now, we just gather the texts but don't add them to missingKeys
    // In a real implementation, we would need to determine which texts are untranslated
    console.debug(`[i18n] Found ${textNodes.length} text nodes that might need translation`);
    
    return this.missingKeys;
  }

  /**
   * Reset the missing keys collection
   */
  public static reset(): void {
    this.missingKeys = {};
  }
}
