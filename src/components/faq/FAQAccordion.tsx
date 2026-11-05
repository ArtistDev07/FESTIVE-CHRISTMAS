import React, { useState } from 'react';
import { FAQItem as FAQItemType } from '../../types/faq.ts';
import { FAQItem } from './FAQItem.tsx';
import { ChevronsUpDown } from 'lucide-react';

interface FAQAccordionProps {
  items: FAQItemType[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  // Store set of open item IDs (all items are completely collapsed by default on initial load)
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set<string>());

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const allOpen = items.length > 0 && items.every((item) => openIds.has(item.id));

  const toggleAll = () => {
    if (allOpen) {
      setOpenIds(new Set());
    } else {
      setOpenIds(new Set(items.map((i) => i.id)));
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {/* Quick Toggle Utility Bar */}
      {items.length > 2 && (
        <div className="flex justify-end pb-1">
          <button
            type="button"
            onClick={toggleAll}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#E9C578]/80 hover:text-[#FFFFFF] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578] rounded px-2 py-1"
          >
            <ChevronsUpDown className="h-3.5 w-3.5" />
            <span>{allOpen ? 'Collapse All' : 'Expand All'}</span>
          </button>
        </div>
      )}

      {/* Accordion Rows */}
      <div className="space-y-3">
        {items.map((item) => (
          <FAQItem
            key={item.id}
            item={item}
            isOpen={openIds.has(item.id)}
            onToggle={() => toggleItem(item.id)}
          />
        ))}
      </div>
    </div>
  );
};
