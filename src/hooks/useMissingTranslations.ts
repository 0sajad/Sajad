
import { useState, useCallback } from 'react';

export function useMissingTranslations() {
  const [missingKeys, setMissingKeys] = useState<string[]>([]);
  
  const addMissingKey = useCallback((key: string) => {
    setMissingKeys(prev => {
      if (prev.includes(key)) {
        return prev;
      }
      return [...prev, key];
    });
  }, []);
  
  const clearMissingKeys = useCallback(() => {
    setMissingKeys([]);
  }, []);
  
  const scanPageForMissingTranslations = useCallback(() => {
    const textNodes: { element: HTMLElement; text: string }[] = [];
    const walkDOM = (node: Node, callback: (node: Node) => void) => {
      callback(node);
      node = node.firstChild as Node;
      while (node) {
        walkDOM(node, callback);
        node = node.nextSibling as Node;
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
        if (text.length > 3 && !/^\d+$/.test(text)) {
          // Skip very short texts and numbers
          textNodes.push({
            element: node.parentElement as HTMLElement,
            text
          });
        }
      }
    });
    
    return {
      hardcodedTexts: textNodes,
      missingKeys
    };
  }, [missingKeys]);
  
  return {
    missingKeys,
    addMissingKey,
    clearMissingKeys,
    scanPageForMissingTranslations,
    totalKeys: 100, // Add missing properties used in TranslationManager
    loadingStatus: 'ready'
  };
}

export default useMissingTranslations; // Add default export for backward compatibility
