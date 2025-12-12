
import 'core-js/features/array/at';
import 'core-js/features/string/at';
import 'core-js/features/object/has-own';
import 'core-js/features/array/group-by';
import 'core-js/features/array/to-reversed';
import 'core-js/features/array/to-sorted';
import 'core-js/features/array/to-spliced';
import 'core-js/features/array/with';

import 'core-js/features/math/clz32';
import 'core-js/features/math/imul';
import 'core-js/features/math/fround';

import 'core-js/features/promise/with-resolvers';
import 'core-js/features/async-iterator/drop';
import 'core-js/features/async-iterator/every';
import 'core-js/features/async-iterator/filter';
import 'core-js/features/async-iterator/find';
import 'core-js/features/async-iterator/flat-map';
import 'core-js/features/async-iterator/for-each';
import 'core-js/features/async-iterator/map';
import 'core-js/features/async-iterator/reduce';
import 'core-js/features/async-iterator/some';
import 'core-js/features/async-iterator/take';
import 'core-js/features/async-iterator/to-array';

import 'core-js/features/map/group-by';
import 'core-js/features/set/difference';
import 'core-js/features/set/intersection';
import 'core-js/features/set/is-disjoint-from';
import 'core-js/features/set/is-subset-of';
import 'core-js/features/set/is-superset-of';
import 'core-js/features/set/symmetric-difference';
import 'core-js/features/set/union';

export const checkBrowserCompatibility = (): {
  compatible: boolean;
  missing: string[];
  warnings: string[];
} => {
  const missing: string[] = [];
  const warnings: string[] = [];

  if (typeof Promise === 'undefined') missing.push('Promise');
  if (typeof Map === 'undefined') missing.push('Map');
  if (typeof Set === 'undefined') missing.push('Set');
  if (typeof Symbol === 'undefined') missing.push('Symbol');
  if (typeof WeakMap === 'undefined') missing.push('WeakMap');
  if (typeof ArrayBuffer === 'undefined') missing.push('ArrayBuffer');
  if (typeof Float32Array === 'undefined') missing.push('Float32Array');

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) missing.push('WebGL');

  if (typeof performance === 'undefined' || !performance.now) {
    warnings.push('High-resolution timing not available');
  }

  if (typeof Worker === 'undefined') {
    warnings.push('Web Workers not supported - performance may be limited');
  }

  if (!Array.prototype.flatMap) warnings.push('Array.flatMap polyfilled');
  if (!String.prototype.replaceAll) warnings.push('String.replaceAll polyfilled');

  return {
    compatible: missing.length === 0,
    missing,
    warnings,
  };
};

if (typeof window !== 'undefined') {
  const compatibility = checkBrowserCompatibility();
  
  if (!compatibility.compatible) {
    console.error('❌ Browser compatibility issues detected:', compatibility.missing);
  }
  
  if (compatibility.warnings.length > 0) {
    console.warn('⚠️ Browser compatibility warnings:', compatibility.warnings);
  }
  
  if (compatibility.compatible && compatibility.warnings.length === 0) {
    console.log('✅ Browser fully compatible with .OrbitScope "Sentinel" features');
  }
}