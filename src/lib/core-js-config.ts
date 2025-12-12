
import 'core-js/stable';

import 'core-js/proposals/array-grouping';
import 'core-js/proposals/change-array-by-copy';
import 'core-js/proposals/iterator-helpers';
import 'core-js/proposals/set-methods';

export const logPolyfillUsage = () => {
  const features = {
    'Array.prototype.flat': !!Array.prototype.flat,
    'Array.prototype.flatMap': !!Array.prototype.flatMap,
    'Array.prototype.at': !!(Array.prototype as any).at,
    'String.prototype.replaceAll': !!String.prototype.replaceAll,
    'Promise.allSettled': !!Promise.allSettled,
    'Object.fromEntries': !!Object.fromEntries,
    'globalThis': typeof globalThis !== 'undefined',
    'BigInt': typeof BigInt !== 'undefined',
    'WeakRef': typeof WeakRef !== 'undefined',
    'FinalizationRegistry': typeof FinalizationRegistry !== 'undefined',
  };

  console.group('🔧 Core-js Polyfill Status');
  Object.entries(features).forEach(([feature, supported]) => {
    console.log(
      `${supported ? '✅' : '❌'} ${feature}: ${supported ? 'Native' : 'Polyfilled'}`
    );
  });
  console.groupEnd();

  return features;
};

export const isModernEnvironment = (): boolean => {
  try {
    return !!(
      Array.prototype.flat &&
      Promise.allSettled &&
      String.prototype.replaceAll &&
      Object.fromEntries &&
      typeof globalThis !== 'undefined'
    );
  } catch {
    return false;
  }
};

if (import.meta.env.DEV) {
  logPolyfillUsage();
  
  if (isModernEnvironment()) {
    console.log('🚀 Running in modern environment - minimal polyfills needed');
  } else {
    console.log('🔧 Legacy environment detected - core-js polyfills active');
  }
}