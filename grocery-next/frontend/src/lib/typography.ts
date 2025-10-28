// Typography utility functions and constants

// Heading sizes based on the UI polishing guidelines
export const headingSizes = {
  h1: 'text-4xl md:text-5xl font-bold leading-tight', // 2.5rem on desktop
  h2: 'text-3xl md:text-4xl font-semibold leading-tight', // 2rem
  h3: 'text-2xl md:text-3xl font-semibold leading-snug', // 1.75rem
  h4: 'text-xl md:text-2xl font-medium leading-snug', // 1.5rem
  h5: 'text-lg md:text-xl font-medium leading-normal', // 1.25rem
  h6: 'text-base md:text-lg font-medium leading-normal', // 1.1rem
};

// Body text styles
export const bodyText = {
  base: 'text-base leading-relaxed', // 1rem with 1.5 line height
  small: 'text-sm leading-relaxed',
  large: 'text-lg leading-relaxed',
};

// Utility function to apply consistent typography classes
export const typographyClasses = {
  // Headings
  h1: `${headingSizes.h1} text-gray-900`,
  h2: `${headingSizes.h2} text-gray-900`,
  h3: `${headingSizes.h3} text-gray-900`,
  h4: `${headingSizes.h4} text-gray-900`,
  h5: `${headingSizes.h5} text-gray-900`,
  h6: `${headingSizes.h6} text-gray-900`,
  
  // Body text
  body: `${bodyText.base} text-gray-700`,
  bodySmall: `${bodyText.small} text-gray-600`,
  bodyLarge: `${bodyText.large} text-gray-700`,
  
  // Special cases
  caption: 'text-xs text-gray-500 leading-relaxed',
  lead: 'text-lg text-gray-700 leading-relaxed',
};