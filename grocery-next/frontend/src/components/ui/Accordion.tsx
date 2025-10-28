'use client';

import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AccordionItemProps {
  /**
   * The title of the accordion item
   */
  title: string;
  /**
   * The content of the accordion item
   */
  children: ReactNode;
  /**
   * Whether the accordion item is initially open
   * @default false
   */
  defaultOpen?: boolean;
}

interface AccordionProps {
  /**
   * The accordion items
   */
  children: ReactNode;
  /**
   * Additional CSS classes to apply to the accordion
   */
  className?: string;
}

/**
 * Accordion item component
 */
function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200">
      <motion.button
        whileHover={{ backgroundColor: "rgba(243, 244, 246, 0.5)" }}
        whileTap={{ scale: 0.98 }}
        className="flex justify-between items-center w-full py-4 text-left font-medium text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5 text-gray-500" />
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-gray-600">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Accordion component for creating collapsible sections
 * 
 * @example
 * ```tsx
 * <Accordion>
 *   <Accordion.Item title="How do I place an order?">
 *     <p>Simply browse our products and add items to your cart...</p>
 *   </Accordion.Item>
 *   <Accordion.Item title="What payment methods do you accept?">
 *     <p>We accept all major credit cards and UPI payments...</p>
 *   </Accordion.Item>
 * </Accordion>
 * ```
 */
export function Accordion({ children, className }: AccordionProps) {
  return (
    <div className={cn("rounded-lg border border-gray-200", className)}>
      {children}
    </div>
  );
}

Accordion.Item = AccordionItem;