/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@petamoriken/float16/src/DataView.mjs":
/*!************************************************************!*\
  !*** ./node_modules/@petamoriken/float16/src/DataView.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getFloat16: () => (/* binding */ getFloat16),
/* harmony export */   setFloat16: () => (/* binding */ setFloat16)
/* harmony export */ });
/* harmony import */ var _util_arrayIterator_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_util/arrayIterator.mjs */ "./node_modules/@petamoriken/float16/src/_util/arrayIterator.mjs");
/* harmony import */ var _util_converter_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_util/converter.mjs */ "./node_modules/@petamoriken/float16/src/_util/converter.mjs");
/* harmony import */ var _util_primordials_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_util/primordials.mjs */ "./node_modules/@petamoriken/float16/src/_util/primordials.mjs");




/**
 * returns an unsigned 16-bit float at the specified byte offset from the start of the DataView
 * @param {DataView} dataView
 * @param {number} byteOffset
 * @param {[boolean]} opts
 * @returns {number}
 */
function getFloat16(dataView, byteOffset, ...opts) {
  return (0,_util_converter_mjs__WEBPACK_IMPORTED_MODULE_1__.convertToNumber)(
    (0,_util_primordials_mjs__WEBPACK_IMPORTED_MODULE_2__.DataViewPrototypeGetUint16)(dataView, byteOffset, ...(0,_util_arrayIterator_mjs__WEBPACK_IMPORTED_MODULE_0__.safeIfNeeded)(opts))
  );
}

/**
 * stores an unsigned 16-bit float value at the specified byte offset from the start of the DataView
 * @param {DataView} dataView
 * @param {number} byteOffset
 * @param {number} value
 * @param {[boolean]} opts
 */
function setFloat16(dataView, byteOffset, value, ...opts) {
  return (0,_util_primordials_mjs__WEBPACK_IMPORTED_MODULE_2__.DataViewPrototypeSetUint16)(
    dataView,
    byteOffset,
    (0,_util_converter_mjs__WEBPACK_IMPORTED_MODULE_1__.roundToFloat16Bits)(value),
    ...(0,_util_arrayIterator_mjs__WEBPACK_IMPORTED_MODULE_0__.safeIfNeeded)(opts)
  );
}


/***/ }),

/***/ "./node_modules/@petamoriken/float16/src/_util/arrayIterator.mjs":
/*!***********************************************************************!*\
  !*** ./node_modules/@petamoriken/float16/src/_util/arrayIterator.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   safeIfNeeded: () => (/* binding */ safeIfNeeded),
/* harmony export */   wrap: () => (/* binding */ wrap)
/* harmony export */ });
/* harmony import */ var _primordials_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./primordials.mjs */ "./node_modules/@petamoriken/float16/src/_util/primordials.mjs");


/** @type {WeakMap<{}, IterableIterator<any>>} */
const arrayIterators = new _primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.NativeWeakMap();

const SafeIteratorPrototype = (0,_primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.ObjectCreate)(null, {
  next: {
    value: function next() {
      const arrayIterator = (0,_primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.WeakMapPrototypeGet)(arrayIterators, this);
      return (0,_primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.ArrayIteratorPrototypeNext)(arrayIterator);
    },
  },

  [_primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.SymbolIterator]: {
    value: function values() {
      return this;
    },
  },
});

/**
 * Wrap the Array around the SafeIterator If Array.prototype [@@iterator] has been modified
 * @type {<T>(array: T[]) => Iterable<T>}
 */
function safeIfNeeded(array) {
  if (
    array[_primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.SymbolIterator] === _primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.NativeArrayPrototypeSymbolIterator &&
    _primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.ArrayIteratorPrototype.next === _primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.ArrayIteratorPrototypeNext
  ) {
    return array;
  }

  const safe = (0,_primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.ObjectCreate)(SafeIteratorPrototype);
  (0,_primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.WeakMapPrototypeSet)(arrayIterators, safe, (0,_primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.ArrayPrototypeSymbolIterator)(array));
  return safe;
}

/** @type {WeakMap<{}, Generator<any>>} */
const generators = new _primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.NativeWeakMap();

/** @see https://tc39.es/ecma262/#sec-%arrayiteratorprototype%-object */
const DummyArrayIteratorPrototype = (0,_primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.ObjectCreate)(_primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.IteratorPrototype, {
  next: {
    value: function next() {
      const generator = (0,_primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.WeakMapPrototypeGet)(generators, this);
      return (0,_primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.GeneratorPrototypeNext)(generator);
    },
    writable: true,
    configurable: true,
  },
});

for (const key of (0,_primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.ReflectOwnKeys)(_primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.ArrayIteratorPrototype)) {
  // next method has already defined
  if (key === "next") {
    continue;
  }

  // Copy ArrayIteratorPrototype descriptors to DummyArrayIteratorPrototype
  (0,_primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.ObjectDefineProperty)(DummyArrayIteratorPrototype, key, (0,_primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.ReflectGetOwnPropertyDescriptor)(_primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.ArrayIteratorPrototype, key));
}

/**
 * Wrap the Generator around the dummy ArrayIterator
 * @type {<T>(generator: Generator<T>) => IterableIterator<T>}
 */
function wrap(generator) {
  const dummy = (0,_primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.ObjectCreate)(DummyArrayIteratorPrototype);
  (0,_primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.WeakMapPrototypeSet)(generators, dummy, generator);
  return dummy;
}


/***/ }),

/***/ "./node_modules/@petamoriken/float16/src/_util/converter.mjs":
/*!*******************************************************************!*\
  !*** ./node_modules/@petamoriken/float16/src/_util/converter.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertToNumber: () => (/* binding */ convertToNumber),
/* harmony export */   roundToFloat16: () => (/* binding */ roundToFloat16),
/* harmony export */   roundToFloat16Bits: () => (/* binding */ roundToFloat16Bits)
/* harmony export */ });
/* harmony import */ var _primordials_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./primordials.mjs */ "./node_modules/@petamoriken/float16/src/_util/primordials.mjs");


const INVERSE_OF_EPSILON = 1 / _primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.EPSILON;

/**
 * rounds to the nearest value;
 * if the number falls midway, it is rounded to the nearest value with an even least significant digit
 * @param {number} num
 * @returns {number}
 */
function roundTiesToEven(num) {
  return (num + INVERSE_OF_EPSILON) - INVERSE_OF_EPSILON;
}

const FLOAT16_MIN_VALUE = 6.103515625e-05;
const FLOAT16_MAX_VALUE = 65504;
const FLOAT16_EPSILON = 0.0009765625;

const FLOAT16_EPSILON_MULTIPLIED_BY_FLOAT16_MIN_VALUE = FLOAT16_EPSILON * FLOAT16_MIN_VALUE;
const FLOAT16_EPSILON_DEVIDED_BY_EPSILON = FLOAT16_EPSILON * INVERSE_OF_EPSILON;

/**
 * round a number to a half float number
 * @param {unknown} num - double float
 * @returns {number} half float number
 */
function roundToFloat16(num) {
  const number = +num;

  // NaN, Infinity, -Infinity, 0, -0
  if (!(0,_primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.NumberIsFinite)(number) || number === 0) {
    return number;
  }

  // finite except 0, -0
  const sign = number > 0 ? 1 : -1;
  const absolute = (0,_primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.MathAbs)(number);

  // small number
  if (absolute < FLOAT16_MIN_VALUE) {
    return sign * roundTiesToEven(absolute / FLOAT16_EPSILON_MULTIPLIED_BY_FLOAT16_MIN_VALUE) * FLOAT16_EPSILON_MULTIPLIED_BY_FLOAT16_MIN_VALUE;
  }

  const temp = (1 + FLOAT16_EPSILON_DEVIDED_BY_EPSILON) * absolute;
  const result = temp - (temp - absolute);

  // large number
  if (result > FLOAT16_MAX_VALUE || (0,_primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.NumberIsNaN)(result)) {
    return sign * Infinity;
  }

  return sign * result;
}

// base algorithm: http://fox-toolkit.org/ftp/fasthalffloatconversion.pdf

const buffer = new _primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.NativeArrayBuffer(4);
const floatView = new _primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.NativeFloat32Array(buffer);
const uint32View = new _primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.NativeUint32Array(buffer);

const baseTable = new _primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.NativeUint16Array(512);
const shiftTable = new _primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.NativeUint8Array(512);

for (let i = 0; i < 256; ++i) {
  const e = i - 127;

  // very small number (0, -0)
  if (e < -24) {
    baseTable[i]         = 0x0000;
    baseTable[i | 0x100] = 0x8000;
    shiftTable[i]         = 24;
    shiftTable[i | 0x100] = 24;

  // small number (denorm)
  } else if (e < -14) {
    baseTable[i]         =  0x0400 >> (-e - 14);
    baseTable[i | 0x100] = (0x0400 >> (-e - 14)) | 0x8000;
    shiftTable[i]         = -e - 1;
    shiftTable[i | 0x100] = -e - 1;

  // normal number
  } else if (e <= 15) {
    baseTable[i]         =  (e + 15) << 10;
    baseTable[i | 0x100] = ((e + 15) << 10) | 0x8000;
    shiftTable[i]         = 13;
    shiftTable[i | 0x100] = 13;

  // large number (Infinity, -Infinity)
  } else if (e < 128) {
    baseTable[i]         = 0x7c00;
    baseTable[i | 0x100] = 0xfc00;
    shiftTable[i]         = 24;
    shiftTable[i | 0x100] = 24;

  // stay (NaN, Infinity, -Infinity)
  } else {
    baseTable[i]         = 0x7c00;
    baseTable[i | 0x100] = 0xfc00;
    shiftTable[i]         = 13;
    shiftTable[i | 0x100] = 13;
  }
}

/**
 * round a number to a half float number bits
 * @param {unknown} num - double float
 * @returns {number} half float number bits
 */
function roundToFloat16Bits(num) {
  floatView[0] = roundToFloat16(num);
  const f = uint32View[0];
  const e = (f >> 23) & 0x1ff;
  return baseTable[e] + ((f & 0x007fffff) >> shiftTable[e]);
}

const mantissaTable = new _primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.NativeUint32Array(2048);
for (let i = 1; i < 1024; ++i) {
  let m = i << 13; // zero pad mantissa bits
  let e = 0; // zero exponent

  // normalized
  while ((m & 0x00800000) === 0) {
    m <<= 1;
    e -= 0x00800000; // decrement exponent
  }

  m &= ~0x00800000; // clear leading 1 bit
  e += 0x38800000; // adjust bias

  mantissaTable[i] = m | e;
}
for (let i = 1024; i < 2048; ++i) {
  mantissaTable[i] = 0x38000000 + ((i - 1024) << 13);
}

const exponentTable = new _primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.NativeUint32Array(64);
for (let i = 1; i < 31; ++i) {
  exponentTable[i] = i << 23;
}
exponentTable[31] = 0x47800000;
exponentTable[32] = 0x80000000;
for (let i = 33; i < 63; ++i) {
  exponentTable[i] = 0x80000000 + ((i - 32) << 23);
}
exponentTable[63] = 0xc7800000;

const offsetTable = new _primordials_mjs__WEBPACK_IMPORTED_MODULE_0__.NativeUint16Array(64);
for (let i = 1; i < 64; ++i) {
  if (i !== 32) {
    offsetTable[i] = 1024;
  }
}

/**
 * convert a half float number bits to a number
 * @param {number} float16bits - half float number bits
 * @returns {number} double float
 */
function convertToNumber(float16bits) {
  const i = float16bits >> 10;
  uint32View[0] = mantissaTable[offsetTable[i] + (float16bits & 0x3ff)] + exponentTable[i];
  return floatView[0];
}


/***/ }),

/***/ "./node_modules/@petamoriken/float16/src/_util/messages.mjs":
/*!******************************************************************!*\
  !*** ./node_modules/@petamoriken/float16/src/_util/messages.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ATTEMPTING_TO_ACCESS_DETACHED_ARRAYBUFFER: () => (/* binding */ ATTEMPTING_TO_ACCESS_DETACHED_ARRAYBUFFER),
/* harmony export */   CANNOT_CONVERT_UNDEFINED_OR_NULL_TO_OBJECT: () => (/* binding */ CANNOT_CONVERT_UNDEFINED_OR_NULL_TO_OBJECT),
/* harmony export */   CANNOT_MIX_BIGINT_AND_OTHER_TYPES: () => (/* binding */ CANNOT_MIX_BIGINT_AND_OTHER_TYPES),
/* harmony export */   DERIVED_CONSTRUCTOR_CREATED_TYPEDARRAY_OBJECT_WHICH_WAS_TOO_SMALL_LENGTH: () => (/* binding */ DERIVED_CONSTRUCTOR_CREATED_TYPEDARRAY_OBJECT_WHICH_WAS_TOO_SMALL_LENGTH),
/* harmony export */   ITERATOR_PROPERTY_IS_NOT_CALLABLE: () => (/* binding */ ITERATOR_PROPERTY_IS_NOT_CALLABLE),
/* harmony export */   OFFSET_IS_OUT_OF_BOUNDS: () => (/* binding */ OFFSET_IS_OUT_OF_BOUNDS),
/* harmony export */   REDUCE_OF_EMPTY_ARRAY_WITH_NO_INITIAL_VALUE: () => (/* binding */ REDUCE_OF_EMPTY_ARRAY_WITH_NO_INITIAL_VALUE),
/* harmony export */   SPECIES_CONSTRUCTOR_DIDNT_RETURN_TYPEDARRAY_OBJECT: () => (/* binding */ SPECIES_CONSTRUCTOR_DIDNT_RETURN_TYPEDARRAY_OBJECT),
/* harmony export */   THE_COMPARISON_FUNCTION_MUST_BE_EITHER_A_FUNCTION_OR_UNDEFINED: () => (/* binding */ THE_COMPARISON_FUNCTION_MUST_BE_EITHER_A_FUNCTION_OR_UNDEFINED),
/* harmony export */   THE_CONSTRUCTOR_PROPERTY_VALUE_IS_NOT_AN_OBJECT: () => (/* binding */ THE_CONSTRUCTOR_PROPERTY_VALUE_IS_NOT_AN_OBJECT),
/* harmony export */   THIS_CONSTRUCTOR_IS_NOT_A_SUBCLASS_OF_FLOAT16ARRAY: () => (/* binding */ THIS_CONSTRUCTOR_IS_NOT_A_SUBCLASS_OF_FLOAT16ARRAY),
/* harmony export */   THIS_IS_NOT_AN_OBJECT: () => (/* binding */ THIS_IS_NOT_AN_OBJECT),
/* harmony export */   THIS_IS_NOT_A_FLOAT16ARRAY_OBJECT: () => (/* binding */ THIS_IS_NOT_A_FLOAT16ARRAY_OBJECT)
/* harmony export */ });
const THIS_IS_NOT_AN_OBJECT = "This is not an object";
const THIS_IS_NOT_A_FLOAT16ARRAY_OBJECT = "This is not a Float16Array object";
const THIS_CONSTRUCTOR_IS_NOT_A_SUBCLASS_OF_FLOAT16ARRAY =
  "This constructor is not a subclass of Float16Array";
const THE_CONSTRUCTOR_PROPERTY_VALUE_IS_NOT_AN_OBJECT =
  "The constructor property value is not an object";
const SPECIES_CONSTRUCTOR_DIDNT_RETURN_TYPEDARRAY_OBJECT =
  "Species constructor didn't return TypedArray object";
const DERIVED_CONSTRUCTOR_CREATED_TYPEDARRAY_OBJECT_WHICH_WAS_TOO_SMALL_LENGTH =
  "Derived constructor created TypedArray object which was too small length";
const ATTEMPTING_TO_ACCESS_DETACHED_ARRAYBUFFER =
  "Attempting to access detached ArrayBuffer";
const CANNOT_CONVERT_UNDEFINED_OR_NULL_TO_OBJECT =
  "Cannot convert undefined or null to object";
const CANNOT_MIX_BIGINT_AND_OTHER_TYPES =
  "Cannot mix BigInt and other types, use explicit conversions";
const ITERATOR_PROPERTY_IS_NOT_CALLABLE = "@@iterator property is not callable";
const REDUCE_OF_EMPTY_ARRAY_WITH_NO_INITIAL_VALUE =
  "Reduce of empty array with no initial value";
const THE_COMPARISON_FUNCTION_MUST_BE_EITHER_A_FUNCTION_OR_UNDEFINED =
  "The comparison function must be either a function or undefined";
const OFFSET_IS_OUT_OF_BOUNDS = "Offset is out of bounds";


/***/ }),

/***/ "./node_modules/@petamoriken/float16/src/_util/primordials.mjs":
/*!*********************************************************************!*\
  !*** ./node_modules/@petamoriken/float16/src/_util/primordials.mjs ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArrayBufferIsView: () => (/* binding */ ArrayBufferIsView),
/* harmony export */   ArrayBufferPrototypeGetByteLength: () => (/* binding */ ArrayBufferPrototypeGetByteLength),
/* harmony export */   ArrayBufferPrototypeSlice: () => (/* binding */ ArrayBufferPrototypeSlice),
/* harmony export */   ArrayIsArray: () => (/* binding */ ArrayIsArray),
/* harmony export */   ArrayIteratorPrototype: () => (/* binding */ ArrayIteratorPrototype),
/* harmony export */   ArrayIteratorPrototypeNext: () => (/* binding */ ArrayIteratorPrototypeNext),
/* harmony export */   ArrayPrototypeJoin: () => (/* binding */ ArrayPrototypeJoin),
/* harmony export */   ArrayPrototypePush: () => (/* binding */ ArrayPrototypePush),
/* harmony export */   ArrayPrototypeSymbolIterator: () => (/* binding */ ArrayPrototypeSymbolIterator),
/* harmony export */   ArrayPrototypeToLocaleString: () => (/* binding */ ArrayPrototypeToLocaleString),
/* harmony export */   DataViewPrototypeGetUint16: () => (/* binding */ DataViewPrototypeGetUint16),
/* harmony export */   DataViewPrototypeSetUint16: () => (/* binding */ DataViewPrototypeSetUint16),
/* harmony export */   EPSILON: () => (/* binding */ EPSILON),
/* harmony export */   GeneratorPrototypeNext: () => (/* binding */ GeneratorPrototypeNext),
/* harmony export */   IteratorPrototype: () => (/* binding */ IteratorPrototype),
/* harmony export */   MAX_SAFE_INTEGER: () => (/* binding */ MAX_SAFE_INTEGER),
/* harmony export */   MathAbs: () => (/* binding */ MathAbs),
/* harmony export */   MathTrunc: () => (/* binding */ MathTrunc),
/* harmony export */   NativeArrayBuffer: () => (/* binding */ NativeArrayBuffer),
/* harmony export */   NativeArrayPrototypeSymbolIterator: () => (/* binding */ NativeArrayPrototypeSymbolIterator),
/* harmony export */   NativeFloat32Array: () => (/* binding */ NativeFloat32Array),
/* harmony export */   NativeObject: () => (/* binding */ NativeObject),
/* harmony export */   NativeProxy: () => (/* binding */ NativeProxy),
/* harmony export */   NativeRangeError: () => (/* binding */ NativeRangeError),
/* harmony export */   NativeSharedArrayBuffer: () => (/* binding */ NativeSharedArrayBuffer),
/* harmony export */   NativeTypeError: () => (/* binding */ NativeTypeError),
/* harmony export */   NativeTypedArrayPrototypeSymbolIterator: () => (/* binding */ NativeTypedArrayPrototypeSymbolIterator),
/* harmony export */   NativeUint16Array: () => (/* binding */ NativeUint16Array),
/* harmony export */   NativeUint32Array: () => (/* binding */ NativeUint32Array),
/* harmony export */   NativeUint8Array: () => (/* binding */ NativeUint8Array),
/* harmony export */   NativeWeakMap: () => (/* binding */ NativeWeakMap),
/* harmony export */   NativeWeakSet: () => (/* binding */ NativeWeakSet),
/* harmony export */   NumberIsFinite: () => (/* binding */ NumberIsFinite),
/* harmony export */   NumberIsNaN: () => (/* binding */ NumberIsNaN),
/* harmony export */   ObjectCreate: () => (/* binding */ ObjectCreate),
/* harmony export */   ObjectDefineProperty: () => (/* binding */ ObjectDefineProperty),
/* harmony export */   ObjectFreeze: () => (/* binding */ ObjectFreeze),
/* harmony export */   ObjectHasOwn: () => (/* binding */ ObjectHasOwn),
/* harmony export */   ObjectIs: () => (/* binding */ ObjectIs),
/* harmony export */   ObjectPrototype__lookupGetter__: () => (/* binding */ ObjectPrototype__lookupGetter__),
/* harmony export */   ReflectApply: () => (/* binding */ ReflectApply),
/* harmony export */   ReflectConstruct: () => (/* binding */ ReflectConstruct),
/* harmony export */   ReflectDefineProperty: () => (/* binding */ ReflectDefineProperty),
/* harmony export */   ReflectGet: () => (/* binding */ ReflectGet),
/* harmony export */   ReflectGetOwnPropertyDescriptor: () => (/* binding */ ReflectGetOwnPropertyDescriptor),
/* harmony export */   ReflectGetPrototypeOf: () => (/* binding */ ReflectGetPrototypeOf),
/* harmony export */   ReflectHas: () => (/* binding */ ReflectHas),
/* harmony export */   ReflectOwnKeys: () => (/* binding */ ReflectOwnKeys),
/* harmony export */   ReflectSet: () => (/* binding */ ReflectSet),
/* harmony export */   ReflectSetPrototypeOf: () => (/* binding */ ReflectSetPrototypeOf),
/* harmony export */   SharedArrayBufferPrototypeGetByteLength: () => (/* binding */ SharedArrayBufferPrototypeGetByteLength),
/* harmony export */   SymbolFor: () => (/* binding */ SymbolFor),
/* harmony export */   SymbolIterator: () => (/* binding */ SymbolIterator),
/* harmony export */   SymbolSpecies: () => (/* binding */ SymbolSpecies),
/* harmony export */   SymbolToStringTag: () => (/* binding */ SymbolToStringTag),
/* harmony export */   TypedArray: () => (/* binding */ TypedArray),
/* harmony export */   TypedArrayPrototype: () => (/* binding */ TypedArrayPrototype),
/* harmony export */   TypedArrayPrototypeCopyWithin: () => (/* binding */ TypedArrayPrototypeCopyWithin),
/* harmony export */   TypedArrayPrototypeEntries: () => (/* binding */ TypedArrayPrototypeEntries),
/* harmony export */   TypedArrayPrototypeFill: () => (/* binding */ TypedArrayPrototypeFill),
/* harmony export */   TypedArrayPrototypeGetBuffer: () => (/* binding */ TypedArrayPrototypeGetBuffer),
/* harmony export */   TypedArrayPrototypeGetByteOffset: () => (/* binding */ TypedArrayPrototypeGetByteOffset),
/* harmony export */   TypedArrayPrototypeGetLength: () => (/* binding */ TypedArrayPrototypeGetLength),
/* harmony export */   TypedArrayPrototypeGetSymbolToStringTag: () => (/* binding */ TypedArrayPrototypeGetSymbolToStringTag),
/* harmony export */   TypedArrayPrototypeKeys: () => (/* binding */ TypedArrayPrototypeKeys),
/* harmony export */   TypedArrayPrototypeReverse: () => (/* binding */ TypedArrayPrototypeReverse),
/* harmony export */   TypedArrayPrototypeSet: () => (/* binding */ TypedArrayPrototypeSet),
/* harmony export */   TypedArrayPrototypeSlice: () => (/* binding */ TypedArrayPrototypeSlice),
/* harmony export */   TypedArrayPrototypeSort: () => (/* binding */ TypedArrayPrototypeSort),
/* harmony export */   TypedArrayPrototypeSubarray: () => (/* binding */ TypedArrayPrototypeSubarray),
/* harmony export */   TypedArrayPrototypeValues: () => (/* binding */ TypedArrayPrototypeValues),
/* harmony export */   Uint16ArrayFrom: () => (/* binding */ Uint16ArrayFrom),
/* harmony export */   WeakMapPrototypeGet: () => (/* binding */ WeakMapPrototypeGet),
/* harmony export */   WeakMapPrototypeHas: () => (/* binding */ WeakMapPrototypeHas),
/* harmony export */   WeakMapPrototypeSet: () => (/* binding */ WeakMapPrototypeSet),
/* harmony export */   WeakSetPrototypeAdd: () => (/* binding */ WeakSetPrototypeAdd),
/* harmony export */   WeakSetPrototypeHas: () => (/* binding */ WeakSetPrototypeHas)
/* harmony export */ });
/* harmony import */ var _messages_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messages.mjs */ "./node_modules/@petamoriken/float16/src/_util/messages.mjs");
/* eslint-disable no-restricted-globals, no-restricted-syntax */
/* global SharedArrayBuffer */



/** @type {<T extends (...args: any) => any>(target: T) => (thisArg: ThisType<T>, ...args: any[]) => any} */
function uncurryThis(target) {
  return (thisArg, ...args) => {
    return ReflectApply(target, thisArg, args);
  };
}

/** @type {(target: any, key: string | symbol) => (thisArg: any, ...args: any[]) => any} */
function uncurryThisGetter(target, key) {
  return uncurryThis(
    ReflectGetOwnPropertyDescriptor(
      target,
      key
    ).get
  );
}

// Reflect
const {
  apply: ReflectApply,
  construct: ReflectConstruct,
  defineProperty: ReflectDefineProperty,
  get: ReflectGet,
  getOwnPropertyDescriptor: ReflectGetOwnPropertyDescriptor,
  getPrototypeOf: ReflectGetPrototypeOf,
  has: ReflectHas,
  ownKeys: ReflectOwnKeys,
  set: ReflectSet,
  setPrototypeOf: ReflectSetPrototypeOf,
} = Reflect;

// Proxy
const NativeProxy = Proxy;

// Number
const {
  EPSILON,
  MAX_SAFE_INTEGER,
  isFinite: NumberIsFinite,
  isNaN: NumberIsNaN,
} = Number;

// Symbol
const {
  iterator: SymbolIterator,
  species: SymbolSpecies,
  toStringTag: SymbolToStringTag,
  for: SymbolFor,
} = Symbol;

// Object
const NativeObject = Object;
const {
  create: ObjectCreate,
  defineProperty: ObjectDefineProperty,
  freeze: ObjectFreeze,
  is: ObjectIs,
} = NativeObject;
const ObjectPrototype = NativeObject.prototype;
/** @type {(object: object, key: PropertyKey) => Function | undefined} */
const ObjectPrototype__lookupGetter__ = /** @type {any} */ (ObjectPrototype).__lookupGetter__
  ? uncurryThis(/** @type {any} */ (ObjectPrototype).__lookupGetter__)
  : (object, key) => {
    if (object == null) {
      throw NativeTypeError(
        _messages_mjs__WEBPACK_IMPORTED_MODULE_0__.CANNOT_CONVERT_UNDEFINED_OR_NULL_TO_OBJECT
      );
    }

    let target = NativeObject(object);
    do {
      const descriptor = ReflectGetOwnPropertyDescriptor(target, key);
      if (descriptor !== undefined) {
        if (ObjectHasOwn(descriptor, "get")) {
          return descriptor.get;
        }

        return;
      }
    } while ((target = ReflectGetPrototypeOf(target)) !== null);
  };
/** @type {(object: object, key: PropertyKey) => boolean} */
const ObjectHasOwn = /** @type {any} */ (NativeObject).hasOwn ||
  uncurryThis(ObjectPrototype.hasOwnProperty);

// Array
const NativeArray = Array;
const ArrayIsArray = NativeArray.isArray;
const ArrayPrototype = NativeArray.prototype;
/** @type {(array: ArrayLike<unknown>, separator?: string) => string} */
const ArrayPrototypeJoin = uncurryThis(ArrayPrototype.join);
/** @type {<T>(array: T[], ...items: T[]) => number} */
const ArrayPrototypePush = uncurryThis(ArrayPrototype.push);
/** @type {(array: ArrayLike<unknown>, ...opts: any[]) => string} */
const ArrayPrototypeToLocaleString = uncurryThis(
  ArrayPrototype.toLocaleString
);
const NativeArrayPrototypeSymbolIterator = ArrayPrototype[SymbolIterator];
/** @type {<T>(array: T[]) => IterableIterator<T>} */
const ArrayPrototypeSymbolIterator = uncurryThis(NativeArrayPrototypeSymbolIterator);

// Math
const {
  abs: MathAbs,
  trunc: MathTrunc,
} = Math;

// ArrayBuffer
const NativeArrayBuffer = ArrayBuffer;
const ArrayBufferIsView = NativeArrayBuffer.isView;
const ArrayBufferPrototype = NativeArrayBuffer.prototype;
/** @type {(buffer: ArrayBuffer, begin?: number, end?: number) => number} */
const ArrayBufferPrototypeSlice = uncurryThis(ArrayBufferPrototype.slice);
/** @type {(buffer: ArrayBuffer) => ArrayBuffer} */
const ArrayBufferPrototypeGetByteLength = uncurryThisGetter(ArrayBufferPrototype, "byteLength");

// SharedArrayBuffer
const NativeSharedArrayBuffer = typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : null;
/** @type {(buffer: SharedArrayBuffer) => SharedArrayBuffer} */
const SharedArrayBufferPrototypeGetByteLength = NativeSharedArrayBuffer
  && uncurryThisGetter(NativeSharedArrayBuffer.prototype, "byteLength");

// TypedArray
/** @typedef {Uint8Array|Uint8ClampedArray|Uint16Array|Uint32Array|Int8Array|Int16Array|Int32Array|Float32Array|Float64Array|BigUint64Array|BigInt64Array} TypedArray */
/** @type {any} */
const TypedArray = ReflectGetPrototypeOf(Uint8Array);
const TypedArrayFrom = TypedArray.from;
const TypedArrayPrototype = TypedArray.prototype;
const NativeTypedArrayPrototypeSymbolIterator = TypedArrayPrototype[SymbolIterator];
/** @type {(typedArray: TypedArray) => IterableIterator<number>} */
const TypedArrayPrototypeKeys = uncurryThis(TypedArrayPrototype.keys);
/** @type {(typedArray: TypedArray) => IterableIterator<number>} */
const TypedArrayPrototypeValues = uncurryThis(
  TypedArrayPrototype.values
);
/** @type {(typedArray: TypedArray) => IterableIterator<[number, number]>} */
const TypedArrayPrototypeEntries = uncurryThis(
  TypedArrayPrototype.entries
);
/** @type {(typedArray: TypedArray, array: ArrayLike<number>, offset?: number) => void} */
const TypedArrayPrototypeSet = uncurryThis(TypedArrayPrototype.set);
/** @type {<T extends TypedArray>(typedArray: T) => T} */
const TypedArrayPrototypeReverse = uncurryThis(
  TypedArrayPrototype.reverse
);
/** @type {<T extends TypedArray>(typedArray: T, value: number, start?: number, end?: number) => T} */
const TypedArrayPrototypeFill = uncurryThis(TypedArrayPrototype.fill);
/** @type {<T extends TypedArray>(typedArray: T, target: number, start: number, end?: number) => T} */
const TypedArrayPrototypeCopyWithin = uncurryThis(
  TypedArrayPrototype.copyWithin
);
/** @type {<T extends TypedArray>(typedArray: T, compareFn?: (a: number, b: number) => number) => T} */
const TypedArrayPrototypeSort = uncurryThis(TypedArrayPrototype.sort);
/** @type {<T extends TypedArray>(typedArray: T, start?: number, end?: number) => T} */
const TypedArrayPrototypeSlice = uncurryThis(TypedArrayPrototype.slice);
/** @type {<T extends TypedArray>(typedArray: T, start?: number, end?: number) => T} */
const TypedArrayPrototypeSubarray = uncurryThis(
  TypedArrayPrototype.subarray
);
/** @type {((typedArray: TypedArray) => ArrayBuffer)} */
const TypedArrayPrototypeGetBuffer = uncurryThisGetter(
  TypedArrayPrototype,
  "buffer"
);
/** @type {((typedArray: TypedArray) => number)} */
const TypedArrayPrototypeGetByteOffset = uncurryThisGetter(
  TypedArrayPrototype,
  "byteOffset"
);
/** @type {((typedArray: TypedArray) => number)} */
const TypedArrayPrototypeGetLength = uncurryThisGetter(
  TypedArrayPrototype,
  "length"
);
/** @type {(target: unknown) => string} */
const TypedArrayPrototypeGetSymbolToStringTag = uncurryThisGetter(
  TypedArrayPrototype,
  SymbolToStringTag
);

// Uint8Array
const NativeUint8Array = Uint8Array;

// Uint16Array
const NativeUint16Array = Uint16Array;
/** @type {Uint16ArrayConstructor["from"]} */
const Uint16ArrayFrom = (...args) => {
  return ReflectApply(TypedArrayFrom, NativeUint16Array, args);
};

// Uint32Array
const NativeUint32Array = Uint32Array;

// Float32Array
const NativeFloat32Array = Float32Array;

// ArrayIterator
/** @type {any} */
const ArrayIteratorPrototype = ReflectGetPrototypeOf([][SymbolIterator]());
/** @type {<T>(arrayIterator: IterableIterator<T>) => IteratorResult<T>} */
const ArrayIteratorPrototypeNext = uncurryThis(ArrayIteratorPrototype.next);

// Generator
/** @type {<T = unknown, TReturn = any, TNext = unknown>(generator: Generator<T, TReturn, TNext>, value?: TNext) => T} */
const GeneratorPrototypeNext = uncurryThis((function* () {})().next);

// Iterator
const IteratorPrototype = ReflectGetPrototypeOf(ArrayIteratorPrototype);

// DataView
const DataViewPrototype = DataView.prototype;
/** @type {(dataView: DataView, byteOffset: number, littleEndian?: boolean) => number} */
const DataViewPrototypeGetUint16 = uncurryThis(
  DataViewPrototype.getUint16
);
/** @type {(dataView: DataView, byteOffset: number, value: number, littleEndian?: boolean) => void} */
const DataViewPrototypeSetUint16 = uncurryThis(
  DataViewPrototype.setUint16
);

// Error
const NativeTypeError = TypeError;
const NativeRangeError = RangeError;

// WeakSet
/**
 * Do not construct with arguments to avoid calling the "add" method
 * @type {{new <T extends {}>(): WeakSet<T>}}
 */
const NativeWeakSet = WeakSet;
const WeakSetPrototype = NativeWeakSet.prototype;
/** @type {<T extends {}>(set: WeakSet<T>, value: T) => Set<T>} */
const WeakSetPrototypeAdd = uncurryThis(WeakSetPrototype.add);
/** @type {<T extends {}>(set: WeakSet<T>, value: T) => boolean} */
const WeakSetPrototypeHas = uncurryThis(WeakSetPrototype.has);

// WeakMap
/**
 * Do not construct with arguments to avoid calling the "set" method
 * @type {{new <K extends {}, V>(): WeakMap<K, V>}}
 */
const NativeWeakMap = WeakMap;
const WeakMapPrototype = NativeWeakMap.prototype;
/** @type {<K extends {}, V>(weakMap: WeakMap<K, V>, key: K) => V} */
const WeakMapPrototypeGet = uncurryThis(WeakMapPrototype.get);
/** @type {<K extends {}, V>(weakMap: WeakMap<K, V>, key: K) => boolean} */
const WeakMapPrototypeHas = uncurryThis(WeakMapPrototype.has);
/** @type {<K extends {}, V>(weakMap: WeakMap<K, V>, key: K, value: V) => WeakMap} */
const WeakMapPrototypeSet = uncurryThis(WeakMapPrototype.set);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* style.css */
body {
  margin: 0;
  font-family: sans-serif;
  background-color: #e0e7ef;
  overflow: hidden;
}

#upload-container {
  position: absolute;
  z-index: 10;
  background: rgba(255, 255, 255, 0.95);
  padding: 1rem;
  margin: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  max-width: 300px;
}

#upload-container h1 {
  font-size: 1.2rem;
  margin-top: 0;
}

#upload-container label {
  display: block;
  margin-bottom: 0.5rem;
}

#upload-container button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#upload-container button:hover {
  background: #125ea7;
}

#viewer-container {
  width: 100vw;
  height: 100vh;
  position: relative;
}

canvas#three-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

/* North Arrow Overlay Styles */
.north-arrow {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid #333;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  pointer-events: none;
}

.compass-rose {
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow-shaft {
  position: absolute;
  width: 3px;
  height: 30px;
  background: #d32f2f;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
}

.arrow-head {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 12px solid #d32f2f;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
}

.north-label {
  position: absolute;
  top: -2px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
  font-size: 14px;
  color: #333;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
}

/* Controls Legend */
.controls-legend {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 15px;
  border-radius: 8px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 12px;
  line-height: 1.4;
  max-width: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.controls-legend h4 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #4CAF50;
  text-align: center;
  border-bottom: 1px solid #333;
  padding-bottom: 5px;
}

.legend-section {
  margin-bottom: 12px;
}

.legend-section strong {
  display: block;
  color: #FFA726;
  margin-bottom: 4px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.legend-section div {
  margin-left: 8px;
  margin-bottom: 2px;
  color: #E0E0E0;
}

.legend-note {
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid #333;
  font-size: 10px;
  color: #BDBDBD;
  font-style: italic;
  text-align: center;
}

/* Hamburger Menu Button */
.hamburger-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  cursor: pointer;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  transition: background-color 0.3s ease;
}

.hamburger-btn:hover {
  background: rgba(0, 0, 0, 0.9);
}

.hamburger-line {
  width: 20px;
  height: 2px;
  background: white;
  border-radius: 1px;
  transition: all 0.3s ease;
}

.hamburger-btn.active .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger-btn.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.hamburger-btn.active .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* Menu Container */
.menu-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 350px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  z-index: 1000;
  transition: transform 0.3s ease;
}

.menu-container.collapsed {
  transform: translateX(-100%);
}

.menu-container h1 {
  margin-top: 0;
  color: #333;
  font-size: 1.5em;
  border-bottom: 2px solid #4CAF50;
  padding-bottom: 10px;
}

/* Speed Control (Bottom Left) */
.speed-control {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.speed-control label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
}

.speed-control input[type="range"] {
  width: 80px;
  height: 4px;
  background: #333;
  outline: none;
  border-radius: 2px;
}

.speed-control input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 12px;
  height: 12px;
  background: #4CAF50;
  border-radius: 50%;
  cursor: pointer;
}

.speed-control input[type="range"]::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: #4CAF50;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

.speed-control span {
  min-width: 30px;
  text-align: center;
  font-weight: bold;
  color: #4CAF50;
}

/* Progress Bar Styles */
.progress-container {
  margin-top: 15px;
  padding: 15px;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.progress-text {
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 500;
  text-align: center;
}

.progress-bar-wrapper {
  width: 100%;
  height: 8px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #66BB6A);
  border-radius: 4px;
  width: 0%;
  transition: width 0.3s ease;
  position: relative;
}

.progress-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: progress-shine 2s infinite;
}

@keyframes progress-shine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.progress-percentage {
  font-size: 12px;
  color: #666;
  text-align: center;
  font-weight: 600;
}

/* Custom Tooltip Styles */
input[title], button[title] {
  position: relative;
  cursor: help;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ "./node_modules/geotiff/dist-module/compression/basedecoder.js":
/*!*********************************************************************!*\
  !*** ./node_modules/geotiff/dist-module/compression/basedecoder.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BaseDecoder)
/* harmony export */ });
/* harmony import */ var _predictor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../predictor.js */ "./node_modules/geotiff/dist-module/predictor.js");


class BaseDecoder {
  async decode(fileDirectory, buffer) {
    const decoded = await this.decodeBlock(buffer);
    const predictor = fileDirectory.Predictor || 1;
    if (predictor !== 1) {
      const isTiled = !fileDirectory.StripOffsets;
      const tileWidth = isTiled ? fileDirectory.TileWidth : fileDirectory.ImageWidth;
      const tileHeight = isTiled ? fileDirectory.TileLength : (
        fileDirectory.RowsPerStrip || fileDirectory.ImageLength
      );
      return (0,_predictor_js__WEBPACK_IMPORTED_MODULE_0__.applyPredictor)(
        decoded, predictor, tileWidth, tileHeight, fileDirectory.BitsPerSample,
        fileDirectory.PlanarConfiguration,
      );
    }
    return decoded;
  }
}


/***/ }),

/***/ "./node_modules/geotiff/dist-module/compression/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/geotiff/dist-module/compression/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addDecoder: () => (/* binding */ addDecoder),
/* harmony export */   getDecoder: () => (/* binding */ getDecoder),
/* harmony export */   preferWorker: () => (/* binding */ preferWorker)
/* harmony export */ });
const registry = new Map();
const preferWorkerMap = new Map();

/**
 * Either a number or undefined.
 * @typedef {(number|undefined)} NumberOrUndefined
 */

/**
 * Register a decoder for a specific compression method or a range of compressions
 * @param {(NumberOrUndefined|(NumberOrUndefined[]))} cases ids of the compression methods to register for
 * @param {function():Promise} importFn the function to import the decoder
 * @param {boolean} preferWorker_ Whether to prefer running the decoder in a worker
 */
function addDecoder(cases, importFn, preferWorker_ = true) {
  if (!Array.isArray(cases)) {
    cases = [cases]; // eslint-disable-line no-param-reassign
  }
  cases.forEach((c) => {
    registry.set(c, importFn);
    preferWorkerMap.set(c, preferWorker_);
  });
}

/**
 * Get a decoder for a specific file directory
 * @param {object} fileDirectory the file directory of the image
 * @returns {Promise<Decoder>}
 */
async function getDecoder(fileDirectory) {
  const importFn = registry.get(fileDirectory.Compression);
  if (!importFn) {
    throw new Error(`Unknown compression method identifier: ${fileDirectory.Compression}`);
  }
  const Decoder = await importFn();
  return new Decoder(fileDirectory);
}

/**
 * Whether to prefer running the decoder in a worker
 * @param {object} fileDirectory the file directory of the image
 * @returns {boolean}
 */
function preferWorker(fileDirectory) {
  return preferWorkerMap.get(fileDirectory.Compression);
}

// Add default decoders to registry (end-user may override with other implementations)
addDecoder([undefined, 1], () => __webpack_require__.e(/*! import() */ "node_modules_geotiff_dist-module_compression_raw_js").then(__webpack_require__.bind(__webpack_require__, /*! ./raw.js */ "./node_modules/geotiff/dist-module/compression/raw.js")).then((m) => m.default), false);
addDecoder(5, () => __webpack_require__.e(/*! import() */ "node_modules_geotiff_dist-module_compression_lzw_js").then(__webpack_require__.bind(__webpack_require__, /*! ./lzw.js */ "./node_modules/geotiff/dist-module/compression/lzw.js")).then((m) => m.default));
addDecoder(6, () => {
  throw new Error('old style JPEG compression is not supported.');
});
addDecoder(7, () => __webpack_require__.e(/*! import() */ "vendors-node_modules_geotiff_dist-module_compression_jpeg_js").then(__webpack_require__.bind(__webpack_require__, /*! ./jpeg.js */ "./node_modules/geotiff/dist-module/compression/jpeg.js")).then((m) => m.default));
addDecoder([8, 32946], () => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_pako_dist_pako_esm_mjs"), __webpack_require__.e("node_modules_geotiff_dist-module_compression_deflate_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ./deflate.js */ "./node_modules/geotiff/dist-module/compression/deflate.js")).then((m) => m.default));
addDecoder(32773, () => __webpack_require__.e(/*! import() */ "node_modules_geotiff_dist-module_compression_packbits_js").then(__webpack_require__.bind(__webpack_require__, /*! ./packbits.js */ "./node_modules/geotiff/dist-module/compression/packbits.js")).then((m) => m.default));
addDecoder(34887, () => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_pako_dist_pako_esm_mjs"), __webpack_require__.e("vendors-node_modules_geotiff_dist-module_compression_lerc_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ./lerc.js */ "./node_modules/geotiff/dist-module/compression/lerc.js"))
  .then(async (m) => {
    await m.zstd.init();
    return m;
  })
  .then((m) => m.default),
);
addDecoder(50000, () => __webpack_require__.e(/*! import() */ "vendors-node_modules_geotiff_dist-module_compression_zstd_js").then(__webpack_require__.bind(__webpack_require__, /*! ./zstd.js */ "./node_modules/geotiff/dist-module/compression/zstd.js"))
  .then(async (m) => {
    await m.zstd.init();
    return m;
  })
  .then((m) => m.default),
);
addDecoder(50001, () => __webpack_require__.e(/*! import() */ "node_modules_geotiff_dist-module_compression_webimage_js").then(__webpack_require__.bind(__webpack_require__, /*! ./webimage.js */ "./node_modules/geotiff/dist-module/compression/webimage.js")).then((m) => m.default), false);


/***/ }),

/***/ "./node_modules/geotiff/dist-module/dataslice.js":
/*!*******************************************************!*\
  !*** ./node_modules/geotiff/dist-module/dataslice.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DataSlice)
/* harmony export */ });
class DataSlice {
  constructor(arrayBuffer, sliceOffset, littleEndian, bigTiff) {
    this._dataView = new DataView(arrayBuffer);
    this._sliceOffset = sliceOffset;
    this._littleEndian = littleEndian;
    this._bigTiff = bigTiff;
  }

  get sliceOffset() {
    return this._sliceOffset;
  }

  get sliceTop() {
    return this._sliceOffset + this.buffer.byteLength;
  }

  get littleEndian() {
    return this._littleEndian;
  }

  get bigTiff() {
    return this._bigTiff;
  }

  get buffer() {
    return this._dataView.buffer;
  }

  covers(offset, length) {
    return this.sliceOffset <= offset && this.sliceTop >= offset + length;
  }

  readUint8(offset) {
    return this._dataView.getUint8(
      offset - this._sliceOffset, this._littleEndian,
    );
  }

  readInt8(offset) {
    return this._dataView.getInt8(
      offset - this._sliceOffset, this._littleEndian,
    );
  }

  readUint16(offset) {
    return this._dataView.getUint16(
      offset - this._sliceOffset, this._littleEndian,
    );
  }

  readInt16(offset) {
    return this._dataView.getInt16(
      offset - this._sliceOffset, this._littleEndian,
    );
  }

  readUint32(offset) {
    return this._dataView.getUint32(
      offset - this._sliceOffset, this._littleEndian,
    );
  }

  readInt32(offset) {
    return this._dataView.getInt32(
      offset - this._sliceOffset, this._littleEndian,
    );
  }

  readFloat32(offset) {
    return this._dataView.getFloat32(
      offset - this._sliceOffset, this._littleEndian,
    );
  }

  readFloat64(offset) {
    return this._dataView.getFloat64(
      offset - this._sliceOffset, this._littleEndian,
    );
  }

  readUint64(offset) {
    const left = this.readUint32(offset);
    const right = this.readUint32(offset + 4);
    let combined;
    if (this._littleEndian) {
      combined = left + ((2 ** 32) * right);
      if (!Number.isSafeInteger(combined)) {
        throw new Error(
          `${combined} exceeds MAX_SAFE_INTEGER. `
          + 'Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues',
        );
      }
      return combined;
    }
    combined = ((2 ** 32) * left) + right;
    if (!Number.isSafeInteger(combined)) {
      throw new Error(
        `${combined} exceeds MAX_SAFE_INTEGER. `
        + 'Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues',
      );
    }

    return combined;
  }

  // adapted from https://stackoverflow.com/a/55338384/8060591
  readInt64(offset) {
    let value = 0;
    const isNegative = (this._dataView.getUint8(offset + (this._littleEndian ? 7 : 0)) & 0x80)
      > 0;
    let carrying = true;
    for (let i = 0; i < 8; i++) {
      let byte = this._dataView.getUint8(
        offset + (this._littleEndian ? i : 7 - i),
      );
      if (isNegative) {
        if (carrying) {
          if (byte !== 0x00) {
            byte = ~(byte - 1) & 0xff;
            carrying = false;
          }
        } else {
          byte = ~byte & 0xff;
        }
      }
      value += byte * (256 ** i);
    }
    if (isNegative) {
      value = -value;
    }
    return value;
  }

  readOffset(offset) {
    if (this._bigTiff) {
      return this.readUint64(offset);
    }
    return this.readUint32(offset);
  }
}


/***/ }),

/***/ "./node_modules/geotiff/dist-module/dataview64.js":
/*!********************************************************!*\
  !*** ./node_modules/geotiff/dist-module/dataview64.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DataView64)
/* harmony export */ });
/* harmony import */ var _petamoriken_float16__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @petamoriken/float16 */ "./node_modules/@petamoriken/float16/src/DataView.mjs");


class DataView64 {
  constructor(arrayBuffer) {
    this._dataView = new DataView(arrayBuffer);
  }

  get buffer() {
    return this._dataView.buffer;
  }

  getUint64(offset, littleEndian) {
    const left = this.getUint32(offset, littleEndian);
    const right = this.getUint32(offset + 4, littleEndian);
    let combined;
    if (littleEndian) {
      combined = left + ((2 ** 32) * right);
      if (!Number.isSafeInteger(combined)) {
        throw new Error(
          `${combined} exceeds MAX_SAFE_INTEGER. `
          + 'Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues',
        );
      }
      return combined;
    }
    combined = ((2 ** 32) * left) + right;
    if (!Number.isSafeInteger(combined)) {
      throw new Error(
        `${combined} exceeds MAX_SAFE_INTEGER. `
        + 'Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues',
      );
    }

    return combined;
  }

  // adapted from https://stackoverflow.com/a/55338384/8060591
  getInt64(offset, littleEndian) {
    let value = 0;
    const isNegative = (this._dataView.getUint8(offset + (littleEndian ? 7 : 0)) & 0x80) > 0;
    let carrying = true;
    for (let i = 0; i < 8; i++) {
      let byte = this._dataView.getUint8(offset + (littleEndian ? i : 7 - i));
      if (isNegative) {
        if (carrying) {
          if (byte !== 0x00) {
            byte = ~(byte - 1) & 0xff;
            carrying = false;
          }
        } else {
          byte = ~byte & 0xff;
        }
      }
      value += byte * (256 ** i);
    }
    if (isNegative) {
      value = -value;
    }
    return value;
  }

  getUint8(offset, littleEndian) {
    return this._dataView.getUint8(offset, littleEndian);
  }

  getInt8(offset, littleEndian) {
    return this._dataView.getInt8(offset, littleEndian);
  }

  getUint16(offset, littleEndian) {
    return this._dataView.getUint16(offset, littleEndian);
  }

  getInt16(offset, littleEndian) {
    return this._dataView.getInt16(offset, littleEndian);
  }

  getUint32(offset, littleEndian) {
    return this._dataView.getUint32(offset, littleEndian);
  }

  getInt32(offset, littleEndian) {
    return this._dataView.getInt32(offset, littleEndian);
  }

  getFloat16(offset, littleEndian) {
    return (0,_petamoriken_float16__WEBPACK_IMPORTED_MODULE_0__.getFloat16)(this._dataView, offset, littleEndian);
  }

  getFloat32(offset, littleEndian) {
    return this._dataView.getFloat32(offset, littleEndian);
  }

  getFloat64(offset, littleEndian) {
    return this._dataView.getFloat64(offset, littleEndian);
  }
}


/***/ }),

/***/ "./node_modules/geotiff/dist-module/geotiff.js":
/*!*****************************************************!*\
  !*** ./node_modules/geotiff/dist-module/geotiff.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseClient: () => (/* reexport safe */ _source_client_base_js__WEBPACK_IMPORTED_MODULE_8__.BaseClient),
/* harmony export */   BaseDecoder: () => (/* reexport safe */ _compression_basedecoder_js__WEBPACK_IMPORTED_MODULE_14__["default"]),
/* harmony export */   BaseResponse: () => (/* reexport safe */ _source_client_base_js__WEBPACK_IMPORTED_MODULE_8__.BaseResponse),
/* harmony export */   GeoTIFF: () => (/* binding */ GeoTIFF),
/* harmony export */   GeoTIFFImage: () => (/* reexport safe */ _geotiffimage_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   MultiGeoTIFF: () => (/* binding */ MultiGeoTIFF),
/* harmony export */   Pool: () => (/* reexport safe */ _pool_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   addDecoder: () => (/* reexport safe */ _compression_index_js__WEBPACK_IMPORTED_MODULE_12__.addDecoder),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   fromArrayBuffer: () => (/* binding */ fromArrayBuffer),
/* harmony export */   fromBlob: () => (/* binding */ fromBlob),
/* harmony export */   fromCustomClient: () => (/* binding */ fromCustomClient),
/* harmony export */   fromFile: () => (/* binding */ fromFile),
/* harmony export */   fromUrl: () => (/* binding */ fromUrl),
/* harmony export */   fromUrls: () => (/* binding */ fromUrls),
/* harmony export */   getDecoder: () => (/* reexport safe */ _compression_index_js__WEBPACK_IMPORTED_MODULE_12__.getDecoder),
/* harmony export */   globals: () => (/* reexport module object */ _globals_js__WEBPACK_IMPORTED_MODULE_9__),
/* harmony export */   rgb: () => (/* reexport module object */ _rgb_js__WEBPACK_IMPORTED_MODULE_11__),
/* harmony export */   setLogger: () => (/* reexport safe */ _logging_js__WEBPACK_IMPORTED_MODULE_13__.setLogger),
/* harmony export */   writeArrayBuffer: () => (/* binding */ writeArrayBuffer)
/* harmony export */ });
/* harmony import */ var _geotiffimage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./geotiffimage.js */ "./node_modules/geotiff/dist-module/geotiffimage.js");
/* harmony import */ var _dataview64_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataview64.js */ "./node_modules/geotiff/dist-module/dataview64.js");
/* harmony import */ var _dataslice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataslice.js */ "./node_modules/geotiff/dist-module/dataslice.js");
/* harmony import */ var _pool_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pool.js */ "./node_modules/geotiff/dist-module/pool.js");
/* harmony import */ var _source_remote_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./source/remote.js */ "./node_modules/geotiff/dist-module/source/remote.js");
/* harmony import */ var _source_arraybuffer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./source/arraybuffer.js */ "./node_modules/geotiff/dist-module/source/arraybuffer.js");
/* harmony import */ var _source_filereader_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./source/filereader.js */ "./node_modules/geotiff/dist-module/source/filereader.js");
/* harmony import */ var _source_file_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./source/file.js */ "./node_modules/geotiff/dist-module/source/file.js");
/* harmony import */ var _source_client_base_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./source/client/base.js */ "./node_modules/geotiff/dist-module/source/client/base.js");
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./globals.js */ "./node_modules/geotiff/dist-module/globals.js");
/* harmony import */ var _geotiffwriter_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./geotiffwriter.js */ "./node_modules/geotiff/dist-module/geotiffwriter.js");
/* harmony import */ var _rgb_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./rgb.js */ "./node_modules/geotiff/dist-module/rgb.js");
/* harmony import */ var _compression_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./compression/index.js */ "./node_modules/geotiff/dist-module/compression/index.js");
/* harmony import */ var _logging_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./logging.js */ "./node_modules/geotiff/dist-module/logging.js");
/* harmony import */ var _compression_basedecoder_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./compression/basedecoder.js */ "./node_modules/geotiff/dist-module/compression/basedecoder.js");
/** @module geotiff */
























/**
 * @typedef {Uint8Array | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array}
 * TypedArray
 */

/**
 * @typedef {{ height:number, width: number }} Dimensions
 */

/**
 * The autogenerated docs are a little confusing here. The effective type is:
 *
 * `TypedArray & { height: number; width: number}`
 * @typedef {TypedArray & Dimensions} TypedArrayWithDimensions
 */

/**
 * The autogenerated docs are a little confusing here. The effective type is:
 *
 * `TypedArray[] & { height: number; width: number}`
 * @typedef {TypedArray[] & Dimensions} TypedArrayArrayWithDimensions
 */

/**
 *  The autogenerated docs are a little confusing here. The effective type is:
 *
 * `(TypedArray | TypedArray[]) & { height: number; width: number}`
 * @typedef {TypedArrayWithDimensions | TypedArrayArrayWithDimensions} ReadRasterResult
 */

function getFieldTypeLength(fieldType) {
  switch (fieldType) {
    case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.BYTE: case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.ASCII: case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.SBYTE: case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.UNDEFINED:
      return 1;
    case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.SHORT: case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.SSHORT:
      return 2;
    case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.LONG: case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.SLONG: case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.FLOAT: case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.IFD:
      return 4;
    case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.RATIONAL: case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.SRATIONAL: case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.DOUBLE:
    case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.LONG8: case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.SLONG8: case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.IFD8:
      return 8;
    default:
      throw new RangeError(`Invalid field type: ${fieldType}`);
  }
}

function parseGeoKeyDirectory(fileDirectory) {
  const rawGeoKeyDirectory = fileDirectory.GeoKeyDirectory;
  if (!rawGeoKeyDirectory) {
    return null;
  }

  const geoKeyDirectory = {};
  for (let i = 4; i <= rawGeoKeyDirectory[3] * 4; i += 4) {
    const key = _globals_js__WEBPACK_IMPORTED_MODULE_9__.geoKeyNames[rawGeoKeyDirectory[i]];
    const location = (rawGeoKeyDirectory[i + 1])
      ? (_globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTagNames[rawGeoKeyDirectory[i + 1]]) : null;
    const count = rawGeoKeyDirectory[i + 2];
    const offset = rawGeoKeyDirectory[i + 3];

    let value = null;
    if (!location) {
      value = offset;
    } else {
      value = fileDirectory[location];
      if (typeof value === 'undefined' || value === null) {
        throw new Error(`Could not get value of geoKey '${key}'.`);
      } else if (typeof value === 'string') {
        value = value.substring(offset, offset + count - 1);
      } else if (value.subarray) {
        value = value.subarray(offset, offset + count);
        if (count === 1) {
          value = value[0];
        }
      }
    }
    geoKeyDirectory[key] = value;
  }
  return geoKeyDirectory;
}

function getValues(dataSlice, fieldType, count, offset) {
  let values = null;
  let readMethod = null;
  const fieldTypeLength = getFieldTypeLength(fieldType);

  switch (fieldType) {
    case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.BYTE: case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.ASCII: case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.UNDEFINED:
      values = new Uint8Array(count); readMethod = dataSlice.readUint8;
      break;
    case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.SBYTE:
      values = new Int8Array(count); readMethod = dataSlice.readInt8;
      break;
    case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.SHORT:
      values = new Uint16Array(count); readMethod = dataSlice.readUint16;
      break;
    case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.SSHORT:
      values = new Int16Array(count); readMethod = dataSlice.readInt16;
      break;
    case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.LONG: case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.IFD:
      values = new Uint32Array(count); readMethod = dataSlice.readUint32;
      break;
    case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.SLONG:
      values = new Int32Array(count); readMethod = dataSlice.readInt32;
      break;
    case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.LONG8: case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.IFD8:
      values = new Array(count); readMethod = dataSlice.readUint64;
      break;
    case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.SLONG8:
      values = new Array(count); readMethod = dataSlice.readInt64;
      break;
    case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.RATIONAL:
      values = new Uint32Array(count * 2); readMethod = dataSlice.readUint32;
      break;
    case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.SRATIONAL:
      values = new Int32Array(count * 2); readMethod = dataSlice.readInt32;
      break;
    case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.FLOAT:
      values = new Float32Array(count); readMethod = dataSlice.readFloat32;
      break;
    case _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.DOUBLE:
      values = new Float64Array(count); readMethod = dataSlice.readFloat64;
      break;
    default:
      throw new RangeError(`Invalid field type: ${fieldType}`);
  }

  // normal fields
  if (!(fieldType === _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.RATIONAL || fieldType === _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.SRATIONAL)) {
    for (let i = 0; i < count; ++i) {
      values[i] = readMethod.call(
        dataSlice, offset + (i * fieldTypeLength),
      );
    }
  } else { // RATIONAL or SRATIONAL
    for (let i = 0; i < count; i += 2) {
      values[i] = readMethod.call(
        dataSlice, offset + (i * fieldTypeLength),
      );
      values[i + 1] = readMethod.call(
        dataSlice, offset + ((i * fieldTypeLength) + 4),
      );
    }
  }

  if (fieldType === _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.ASCII) {
    return new TextDecoder('utf-8').decode(values);
  }
  return values;
}

/**
 * Data class to store the parsed file directory (+ its raw form), geo key directory and
 * offset to the next IFD
 */
class ImageFileDirectory {
  /**
   * Create an ImageFileDirectory.
   * @param {object} fileDirectory the file directory, mapping tag names to values
   * @param {Map} rawFileDirectory the raw file directory, mapping tag IDs to values
   * @param {object} geoKeyDirectory the geo key directory, mapping geo key names to values
   * @param {number} nextIFDByteOffset the byte offset to the next IFD
   */
  constructor(fileDirectory, rawFileDirectory, geoKeyDirectory, nextIFDByteOffset) {
    this.fileDirectory = fileDirectory;
    this.rawFileDirectory = rawFileDirectory;
    this.geoKeyDirectory = geoKeyDirectory;
    this.nextIFDByteOffset = nextIFDByteOffset;
  }
}

/**
 * Error class for cases when an IFD index was requested, that does not exist
 * in the file.
 */
class GeoTIFFImageIndexError extends Error {
  constructor(index) {
    super(`No image at index ${index}`);
    this.index = index;
  }
}

class GeoTIFFBase {
  /**
   * (experimental) Reads raster data from the best fitting image. This function uses
   * the image with the lowest resolution that is still a higher resolution than the
   * requested resolution.
   * When specified, the `bbox` option is translated to the `window` option and the
   * `resX` and `resY` to `width` and `height` respectively.
   * Then, the [readRasters]{@link GeoTIFFImage#readRasters} method of the selected
   * image is called and the result returned.
   * @see GeoTIFFImage.readRasters
   * @param {import('./geotiffimage').ReadRasterOptions} [options={}] optional parameters
   * @returns {Promise<ReadRasterResult>} the decoded array(s), with `height` and `width`, as a promise
   */
  async readRasters(options = {}) {
    const { window: imageWindow, width, height } = options;
    let { resX, resY, bbox } = options;

    const firstImage = await this.getImage();
    let usedImage = firstImage;
    const imageCount = await this.getImageCount();
    const imgBBox = firstImage.getBoundingBox();

    if (imageWindow && bbox) {
      throw new Error('Both "bbox" and "window" passed.');
    }

    // if width/height is passed, transform it to resolution
    if (width || height) {
      // if we have an image window (pixel coordinates), transform it to a BBox
      // using the origin/resolution of the first image.
      if (imageWindow) {
        const [oX, oY] = firstImage.getOrigin();
        const [rX, rY] = firstImage.getResolution();

        bbox = [
          oX + (imageWindow[0] * rX),
          oY + (imageWindow[1] * rY),
          oX + (imageWindow[2] * rX),
          oY + (imageWindow[3] * rY),
        ];
      }

      // if we have a bbox (or calculated one)

      const usedBBox = bbox || imgBBox;

      if (width) {
        if (resX) {
          throw new Error('Both width and resX passed');
        }
        resX = (usedBBox[2] - usedBBox[0]) / width;
      }
      if (height) {
        if (resY) {
          throw new Error('Both width and resY passed');
        }
        resY = (usedBBox[3] - usedBBox[1]) / height;
      }
    }

    // if resolution is set or calculated, try to get the image with the worst acceptable resolution
    if (resX || resY) {
      const allImages = [];
      for (let i = 0; i < imageCount; ++i) {
        const image = await this.getImage(i);
        const { SubfileType: subfileType, NewSubfileType: newSubfileType } = image.fileDirectory;
        if (i === 0 || subfileType === 2 || newSubfileType & 1) {
          allImages.push(image);
        }
      }

      allImages.sort((a, b) => a.getWidth() - b.getWidth());
      for (let i = 0; i < allImages.length; ++i) {
        const image = allImages[i];
        const imgResX = (imgBBox[2] - imgBBox[0]) / image.getWidth();
        const imgResY = (imgBBox[3] - imgBBox[1]) / image.getHeight();

        usedImage = image;
        if ((resX && resX > imgResX) || (resY && resY > imgResY)) {
          break;
        }
      }
    }

    let wnd = imageWindow;
    if (bbox) {
      const [oX, oY] = firstImage.getOrigin();
      const [imageResX, imageResY] = usedImage.getResolution(firstImage);

      wnd = [
        Math.round((bbox[0] - oX) / imageResX),
        Math.round((bbox[1] - oY) / imageResY),
        Math.round((bbox[2] - oX) / imageResX),
        Math.round((bbox[3] - oY) / imageResY),
      ];
      wnd = [
        Math.min(wnd[0], wnd[2]),
        Math.min(wnd[1], wnd[3]),
        Math.max(wnd[0], wnd[2]),
        Math.max(wnd[1], wnd[3]),
      ];
    }

    return usedImage.readRasters({ ...options, window: wnd });
  }
}

/**
 * @typedef {Object} GeoTIFFOptions
 * @property {boolean} [cache=false] whether or not decoded tiles shall be cached.
 */

/**
 * The abstraction for a whole GeoTIFF file.
 * @augments GeoTIFFBase
 */
class GeoTIFF extends GeoTIFFBase {
  /**
   * @constructor
   * @param {*} source The datasource to read from.
   * @param {boolean} littleEndian Whether the image uses little endian.
   * @param {boolean} bigTiff Whether the image uses bigTIFF conventions.
   * @param {number} firstIFDOffset The numeric byte-offset from the start of the image
   *                                to the first IFD.
   * @param {GeoTIFFOptions} [options] further options.
   */
  constructor(source, littleEndian, bigTiff, firstIFDOffset, options = {}) {
    super();
    this.source = source;
    this.littleEndian = littleEndian;
    this.bigTiff = bigTiff;
    this.firstIFDOffset = firstIFDOffset;
    this.cache = options.cache || false;
    this.ifdRequests = [];
    this.ghostValues = null;
  }

  async getSlice(offset, size) {
    const fallbackSize = this.bigTiff ? 4048 : 1024;
    return new _dataslice_js__WEBPACK_IMPORTED_MODULE_2__["default"](
      (await this.source.fetch([{
        offset,
        length: typeof size !== 'undefined' ? size : fallbackSize,
      }]))[0],
      offset,
      this.littleEndian,
      this.bigTiff,
    );
  }

  /**
   * Instructs to parse an image file directory at the given file offset.
   * As there is no way to ensure that a location is indeed the start of an IFD,
   * this function must be called with caution (e.g only using the IFD offsets from
   * the headers or other IFDs).
   * @param {number} offset the offset to parse the IFD at
   * @returns {Promise<ImageFileDirectory>} the parsed IFD
   */
  async parseFileDirectoryAt(offset) {
    const entrySize = this.bigTiff ? 20 : 12;
    const offsetSize = this.bigTiff ? 8 : 2;

    let dataSlice = await this.getSlice(offset);
    const numDirEntries = this.bigTiff
      ? dataSlice.readUint64(offset)
      : dataSlice.readUint16(offset);

    // if the slice does not cover the whole IFD, request a bigger slice, where the
    // whole IFD fits: num of entries + n x tag length + offset to next IFD
    const byteSize = (numDirEntries * entrySize) + (this.bigTiff ? 16 : 6);
    if (!dataSlice.covers(offset, byteSize)) {
      dataSlice = await this.getSlice(offset, byteSize);
    }

    const fileDirectory = {};
    const rawFileDirectory = new Map();

    // loop over the IFD and create a file directory object
    let i = offset + (this.bigTiff ? 8 : 2);
    for (let entryCount = 0; entryCount < numDirEntries; i += entrySize, ++entryCount) {
      const fieldTag = dataSlice.readUint16(i);
      const fieldType = dataSlice.readUint16(i + 2);
      const typeCount = this.bigTiff
        ? dataSlice.readUint64(i + 4)
        : dataSlice.readUint32(i + 4);

      let fieldValues;
      let value;
      const fieldTypeLength = getFieldTypeLength(fieldType);
      const valueOffset = i + (this.bigTiff ? 12 : 8);

      // check whether the value is directly encoded in the tag or refers to a
      // different external byte range
      if (fieldTypeLength * typeCount <= (this.bigTiff ? 8 : 4)) {
        fieldValues = getValues(dataSlice, fieldType, typeCount, valueOffset);
      } else {
        // resolve the reference to the actual byte range
        const actualOffset = dataSlice.readOffset(valueOffset);
        const length = getFieldTypeLength(fieldType) * typeCount;

        // check, whether we actually cover the referenced byte range; if not,
        // request a new slice of bytes to read from it
        if (dataSlice.covers(actualOffset, length)) {
          fieldValues = getValues(dataSlice, fieldType, typeCount, actualOffset);
        } else {
          const fieldDataSlice = await this.getSlice(actualOffset, length);
          fieldValues = getValues(fieldDataSlice, fieldType, typeCount, actualOffset);
        }
      }

      // unpack single values from the array
      if (typeCount === 1 && _globals_js__WEBPACK_IMPORTED_MODULE_9__.arrayFields.indexOf(fieldTag) === -1
        && !(fieldType === _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.RATIONAL || fieldType === _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.SRATIONAL)) {
        value = fieldValues[0];
      } else {
        value = fieldValues;
      }

      // write the tags value to the file directory
      const tagName = _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTagNames[fieldTag];
      if (tagName) {
        fileDirectory[tagName] = value;
      }
      rawFileDirectory.set(fieldTag, value);
    }
    const geoKeyDirectory = parseGeoKeyDirectory(fileDirectory);
    const nextIFDByteOffset = dataSlice.readOffset(
      offset + offsetSize + (entrySize * numDirEntries),
    );

    return new ImageFileDirectory(
      fileDirectory,
      rawFileDirectory,
      geoKeyDirectory,
      nextIFDByteOffset,
    );
  }

  async requestIFD(index) {
    // see if we already have that IFD index requested.
    if (this.ifdRequests[index]) {
      // attach to an already requested IFD
      return this.ifdRequests[index];
    } else if (index === 0) {
      // special case for index 0
      this.ifdRequests[index] = this.parseFileDirectoryAt(this.firstIFDOffset);
      return this.ifdRequests[index];
    } else if (!this.ifdRequests[index - 1]) {
      // if the previous IFD was not yet loaded, load that one first
      // this is the recursive call.
      try {
        this.ifdRequests[index - 1] = this.requestIFD(index - 1);
      } catch (e) {
        // if the previous one already was an index error, rethrow
        // with the current index
        if (e instanceof GeoTIFFImageIndexError) {
          throw new GeoTIFFImageIndexError(index);
        }
        // rethrow anything else
        throw e;
      }
    }
    // if the previous IFD was loaded, we can finally fetch the one we are interested in.
    // we need to wrap this in an IIFE, otherwise this.ifdRequests[index] would be delayed
    this.ifdRequests[index] = (async () => {
      const previousIfd = await this.ifdRequests[index - 1];
      if (previousIfd.nextIFDByteOffset === 0) {
        throw new GeoTIFFImageIndexError(index);
      }
      return this.parseFileDirectoryAt(previousIfd.nextIFDByteOffset);
    })();
    return this.ifdRequests[index];
  }

  /**
   * Get the n-th internal subfile of an image. By default, the first is returned.
   *
   * @param {number} [index=0] the index of the image to return.
   * @returns {Promise<GeoTIFFImage>} the image at the given index
   */
  async getImage(index = 0) {
    const ifd = await this.requestIFD(index);
    return new _geotiffimage_js__WEBPACK_IMPORTED_MODULE_0__["default"](
      ifd.fileDirectory, ifd.geoKeyDirectory,
      this.dataView, this.littleEndian, this.cache, this.source,
    );
  }

  /**
   * Returns the count of the internal subfiles.
   *
   * @returns {Promise<number>} the number of internal subfile images
   */
  async getImageCount() {
    let index = 0;
    // loop until we run out of IFDs
    let hasNext = true;
    while (hasNext) {
      try {
        await this.requestIFD(index);
        ++index;
      } catch (e) {
        if (e instanceof GeoTIFFImageIndexError) {
          hasNext = false;
        } else {
          throw e;
        }
      }
    }
    return index;
  }

  /**
   * Get the values of the COG ghost area as a parsed map.
   * See https://gdal.org/drivers/raster/cog.html#header-ghost-area for reference
   * @returns {Promise<Object>} the parsed ghost area or null, if no such area was found
   */
  async getGhostValues() {
    const offset = this.bigTiff ? 16 : 8;
    if (this.ghostValues) {
      return this.ghostValues;
    }
    const detectionString = 'GDAL_STRUCTURAL_METADATA_SIZE=';
    const heuristicAreaSize = detectionString.length + 100;
    let slice = await this.getSlice(offset, heuristicAreaSize);
    if (detectionString === getValues(slice, _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.ASCII, detectionString.length, offset)) {
      const valuesString = getValues(slice, _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.ASCII, heuristicAreaSize, offset);
      const firstLine = valuesString.split('\n')[0];
      const metadataSize = Number(firstLine.split('=')[1].split(' ')[0]) + firstLine.length;
      if (metadataSize > heuristicAreaSize) {
        slice = await this.getSlice(offset, metadataSize);
      }
      const fullString = getValues(slice, _globals_js__WEBPACK_IMPORTED_MODULE_9__.fieldTypes.ASCII, metadataSize, offset);
      this.ghostValues = {};
      fullString
        .split('\n')
        .filter((line) => line.length > 0)
        .map((line) => line.split('='))
        .forEach(([key, value]) => {
          this.ghostValues[key] = value;
        });
    }
    return this.ghostValues;
  }

  /**
   * Parse a (Geo)TIFF file from the given source.
   *
   * @param {*} source The source of data to parse from.
   * @param {GeoTIFFOptions} [options] Additional options.
   * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
   *                               to be aborted
   */
  static async fromSource(source, options, signal) {
    const headerData = (await source.fetch([{ offset: 0, length: 1024 }], signal))[0];
    const dataView = new _dataview64_js__WEBPACK_IMPORTED_MODULE_1__["default"](headerData);

    const BOM = dataView.getUint16(0, 0);
    let littleEndian;
    if (BOM === 0x4949) {
      littleEndian = true;
    } else if (BOM === 0x4D4D) {
      littleEndian = false;
    } else {
      throw new TypeError('Invalid byte order value.');
    }

    const magicNumber = dataView.getUint16(2, littleEndian);
    let bigTiff;
    if (magicNumber === 42) {
      bigTiff = false;
    } else if (magicNumber === 43) {
      bigTiff = true;
      const offsetByteSize = dataView.getUint16(4, littleEndian);
      if (offsetByteSize !== 8) {
        throw new Error('Unsupported offset byte-size.');
      }
    } else {
      throw new TypeError('Invalid magic number.');
    }

    const firstIFDOffset = bigTiff
      ? dataView.getUint64(8, littleEndian)
      : dataView.getUint32(4, littleEndian);
    return new GeoTIFF(source, littleEndian, bigTiff, firstIFDOffset, options);
  }

  /**
   * Closes the underlying file buffer
   * N.B. After the GeoTIFF has been completely processed it needs
   * to be closed but only if it has been constructed from a file.
   */
  close() {
    if (typeof this.source.close === 'function') {
      return this.source.close();
    }
    return false;
  }
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GeoTIFF);

/**
 * Wrapper for GeoTIFF files that have external overviews.
 * @augments GeoTIFFBase
 */
class MultiGeoTIFF extends GeoTIFFBase {
  /**
   * Construct a new MultiGeoTIFF from a main and several overview files.
   * @param {GeoTIFF} mainFile The main GeoTIFF file.
   * @param {GeoTIFF[]} overviewFiles An array of overview files.
   */
  constructor(mainFile, overviewFiles) {
    super();
    this.mainFile = mainFile;
    this.overviewFiles = overviewFiles;
    this.imageFiles = [mainFile].concat(overviewFiles);

    this.fileDirectoriesPerFile = null;
    this.fileDirectoriesPerFileParsing = null;
    this.imageCount = null;
  }

  async parseFileDirectoriesPerFile() {
    const requests = [this.mainFile.parseFileDirectoryAt(this.mainFile.firstIFDOffset)]
      .concat(this.overviewFiles.map((file) => file.parseFileDirectoryAt(file.firstIFDOffset)));

    this.fileDirectoriesPerFile = await Promise.all(requests);
    return this.fileDirectoriesPerFile;
  }

  /**
   * Get the n-th internal subfile of an image. By default, the first is returned.
   *
   * @param {number} [index=0] the index of the image to return.
   * @returns {Promise<GeoTIFFImage>} the image at the given index
   */
  async getImage(index = 0) {
    await this.getImageCount();
    await this.parseFileDirectoriesPerFile();
    let visited = 0;
    let relativeIndex = 0;
    for (let i = 0; i < this.imageFiles.length; i++) {
      const imageFile = this.imageFiles[i];
      for (let ii = 0; ii < this.imageCounts[i]; ii++) {
        if (index === visited) {
          const ifd = await imageFile.requestIFD(relativeIndex);
          return new _geotiffimage_js__WEBPACK_IMPORTED_MODULE_0__["default"](
            ifd.fileDirectory, ifd.geoKeyDirectory,
            imageFile.dataView, imageFile.littleEndian, imageFile.cache, imageFile.source,
          );
        }
        visited++;
        relativeIndex++;
      }
      relativeIndex = 0;
    }

    throw new RangeError('Invalid image index');
  }

  /**
   * Returns the count of the internal subfiles.
   *
   * @returns {Promise<number>} the number of internal subfile images
   */
  async getImageCount() {
    if (this.imageCount !== null) {
      return this.imageCount;
    }
    const requests = [this.mainFile.getImageCount()]
      .concat(this.overviewFiles.map((file) => file.getImageCount()));
    this.imageCounts = await Promise.all(requests);
    this.imageCount = this.imageCounts.reduce((count, ifds) => count + ifds, 0);
    return this.imageCount;
  }
}



/**
 * Creates a new GeoTIFF from a remote URL.
 * @param {string} url The URL to access the image from
 * @param {object} [options] Additional options to pass to the source.
 *                           See {@link makeRemoteSource} for details.
 * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
 *                               to be aborted
 * @returns {Promise<GeoTIFF>} The resulting GeoTIFF file.
 */
async function fromUrl(url, options = {}, signal) {
  return GeoTIFF.fromSource((0,_source_remote_js__WEBPACK_IMPORTED_MODULE_4__.makeRemoteSource)(url, options), signal);
}

/**
 * Creates a new GeoTIFF from a custom {@link BaseClient}.
 * @param {BaseClient} client The client.
 * @param {object} [options] Additional options to pass to the source.
 *                           See {@link makeRemoteSource} for details.
 * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
 *                               to be aborted
 * @returns {Promise<GeoTIFF>} The resulting GeoTIFF file.
 */
async function fromCustomClient(client, options = {}, signal) {
  return GeoTIFF.fromSource((0,_source_remote_js__WEBPACK_IMPORTED_MODULE_4__.makeCustomSource)(client, options), signal);
}

/**
 * Construct a new GeoTIFF from an
 * [ArrayBuffer]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer}.
 * @param {ArrayBuffer} arrayBuffer The data to read the file from.
 * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
 *                               to be aborted
 * @returns {Promise<GeoTIFF>} The resulting GeoTIFF file.
 */
async function fromArrayBuffer(arrayBuffer, signal) {
  return GeoTIFF.fromSource((0,_source_arraybuffer_js__WEBPACK_IMPORTED_MODULE_5__.makeBufferSource)(arrayBuffer), signal);
}

/**
 * Construct a GeoTIFF from a local file path. This uses the node
 * [filesystem API]{@link https://nodejs.org/api/fs.html} and is
 * not available on browsers.
 *
 * N.B. After the GeoTIFF has been completely processed it needs
 * to be closed but only if it has been constructed from a file.
 * @param {string} path The file path to read from.
 * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
 *                               to be aborted
 * @returns {Promise<GeoTIFF>} The resulting GeoTIFF file.
 */
async function fromFile(path, signal) {
  return GeoTIFF.fromSource((0,_source_file_js__WEBPACK_IMPORTED_MODULE_7__.makeFileSource)(path), signal);
}

/**
 * Construct a GeoTIFF from an HTML
 * [Blob]{@link https://developer.mozilla.org/en-US/docs/Web/API/Blob} or
 * [File]{@link https://developer.mozilla.org/en-US/docs/Web/API/File}
 * object.
 * @param {Blob|File} blob The Blob or File object to read from.
 * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
 *                               to be aborted
 * @returns {Promise<GeoTIFF>} The resulting GeoTIFF file.
 */
async function fromBlob(blob, signal) {
  return GeoTIFF.fromSource((0,_source_filereader_js__WEBPACK_IMPORTED_MODULE_6__.makeFileReaderSource)(blob), signal);
}

/**
 * Construct a MultiGeoTIFF from the given URLs.
 * @param {string} mainUrl The URL for the main file.
 * @param {string[]} overviewUrls An array of URLs for the overview images.
 * @param {Object} [options] Additional options to pass to the source.
 *                           See [makeRemoteSource]{@link module:source.makeRemoteSource}
 *                           for details.
 * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
 *                               to be aborted
 * @returns {Promise<MultiGeoTIFF>} The resulting MultiGeoTIFF file.
 */
async function fromUrls(mainUrl, overviewUrls = [], options = {}, signal) {
  const mainFile = await GeoTIFF.fromSource((0,_source_remote_js__WEBPACK_IMPORTED_MODULE_4__.makeRemoteSource)(mainUrl, options), signal);
  const overviewFiles = await Promise.all(
    overviewUrls.map((url) => GeoTIFF.fromSource((0,_source_remote_js__WEBPACK_IMPORTED_MODULE_4__.makeRemoteSource)(url, options))),
  );

  return new MultiGeoTIFF(mainFile, overviewFiles);
}

/**
 * Main creating function for GeoTIFF files.
 * @param {(Array)} array of pixel values
 * @returns {metadata} metadata
 */
function writeArrayBuffer(values, metadata) {
  return (0,_geotiffwriter_js__WEBPACK_IMPORTED_MODULE_10__.writeGeotiff)(values, metadata);
}






/***/ }),

/***/ "./node_modules/geotiff/dist-module/geotiffimage.js":
/*!**********************************************************!*\
  !*** ./node_modules/geotiff/dist-module/geotiffimage.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _petamoriken_float16__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @petamoriken/float16 */ "./node_modules/@petamoriken/float16/src/DataView.mjs");
/* harmony import */ var xml_utils_get_attribute__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xml-utils/get-attribute */ "./node_modules/xml-utils/get-attribute.mjs");
/* harmony import */ var xml_utils_find_tags_by_name__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! xml-utils/find-tags-by-name */ "./node_modules/xml-utils/find-tags-by-name.mjs");
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./globals.js */ "./node_modules/geotiff/dist-module/globals.js");
/* harmony import */ var _rgb_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rgb.js */ "./node_modules/geotiff/dist-module/rgb.js");
/* harmony import */ var _compression_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./compression/index.js */ "./node_modules/geotiff/dist-module/compression/index.js");
/* harmony import */ var _resample_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./resample.js */ "./node_modules/geotiff/dist-module/resample.js");
/** @module geotiffimage */

 // eslint-disable-line import/extensions
 // eslint-disable-line import/extensions






/**
 * @typedef {Object} ReadRasterOptions
 * @property {Array<number>} [window=whole window] the subset to read data from in pixels.
 * @property {Array<number>} [bbox=whole image] the subset to read data from in
 *                                           geographical coordinates.
 * @property {Array<number>} [samples=all samples] the selection of samples to read from. Default is all samples.
 * @property {boolean} [interleave=false] whether the data shall be read
 *                                             in one single array or separate
 *                                             arrays.
 * @property {Pool} [pool=null] The optional decoder pool to use.
 * @property {number} [width] The desired width of the output. When the width is not the
 *                                 same as the images, resampling will be performed.
 * @property {number} [height] The desired height of the output. When the width is not the
 *                                  same as the images, resampling will be performed.
 * @property {string} [resampleMethod='nearest'] The desired resampling method.
 * @property {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
 *                                       to be aborted
 * @property {number|number[]} [fillValue] The value to use for parts of the image
 *                                              outside of the images extent. When multiple
 *                                              samples are requested, an array of fill values
 *                                              can be passed.
 */

/** @typedef {import("./geotiff.js").TypedArray} TypedArray */
/** @typedef {import("./geotiff.js").ReadRasterResult} ReadRasterResult */

function sum(array, start, end) {
  let s = 0;
  for (let i = start; i < end; ++i) {
    s += array[i];
  }
  return s;
}

function arrayForType(format, bitsPerSample, size) {
  switch (format) {
    case 1: // unsigned integer data
      if (bitsPerSample <= 8) {
        return new Uint8Array(size);
      } else if (bitsPerSample <= 16) {
        return new Uint16Array(size);
      } else if (bitsPerSample <= 32) {
        return new Uint32Array(size);
      }
      break;
    case 2: // twos complement signed integer data
      if (bitsPerSample === 8) {
        return new Int8Array(size);
      } else if (bitsPerSample === 16) {
        return new Int16Array(size);
      } else if (bitsPerSample === 32) {
        return new Int32Array(size);
      }
      break;
    case 3: // floating point data
      switch (bitsPerSample) {
        case 16:
        case 32:
          return new Float32Array(size);
        case 64:
          return new Float64Array(size);
        default:
          break;
      }
      break;
    default:
      break;
  }
  throw Error('Unsupported data format/bitsPerSample');
}

function needsNormalization(format, bitsPerSample) {
  if ((format === 1 || format === 2) && bitsPerSample <= 32 && bitsPerSample % 8 === 0) {
    return false;
  } else if (format === 3 && (bitsPerSample === 16 || bitsPerSample === 32 || bitsPerSample === 64)) {
    return false;
  }
  return true;
}

function normalizeArray(inBuffer, format, planarConfiguration, samplesPerPixel, bitsPerSample, tileWidth, tileHeight) {
  // const inByteArray = new Uint8Array(inBuffer);
  const view = new DataView(inBuffer);
  const outSize = planarConfiguration === 2
    ? tileHeight * tileWidth
    : tileHeight * tileWidth * samplesPerPixel;
  const samplesToTransfer = planarConfiguration === 2
    ? 1 : samplesPerPixel;
  const outArray = arrayForType(format, bitsPerSample, outSize);
  // let pixel = 0;

  const bitMask = parseInt('1'.repeat(bitsPerSample), 2);

  if (format === 1) { // unsigned integer
    // translation of https://github.com/OSGeo/gdal/blob/master/gdal/frmts/gtiff/geotiff.cpp#L7337
    let pixelBitSkip;
    // let sampleBitOffset = 0;
    if (planarConfiguration === 1) {
      pixelBitSkip = samplesPerPixel * bitsPerSample;
      // sampleBitOffset = (samplesPerPixel - 1) * bitsPerSample;
    } else {
      pixelBitSkip = bitsPerSample;
    }

    // Bits per line rounds up to next byte boundary.
    let bitsPerLine = tileWidth * pixelBitSkip;
    if ((bitsPerLine & 7) !== 0) {
      bitsPerLine = (bitsPerLine + 7) & (~7);
    }

    for (let y = 0; y < tileHeight; ++y) {
      const lineBitOffset = y * bitsPerLine;
      for (let x = 0; x < tileWidth; ++x) {
        const pixelBitOffset = lineBitOffset + (x * samplesToTransfer * bitsPerSample);
        for (let i = 0; i < samplesToTransfer; ++i) {
          const bitOffset = pixelBitOffset + (i * bitsPerSample);
          const outIndex = (((y * tileWidth) + x) * samplesToTransfer) + i;

          const byteOffset = Math.floor(bitOffset / 8);
          const innerBitOffset = bitOffset % 8;
          if (innerBitOffset + bitsPerSample <= 8) {
            outArray[outIndex] = (view.getUint8(byteOffset) >> (8 - bitsPerSample) - innerBitOffset) & bitMask;
          } else if (innerBitOffset + bitsPerSample <= 16) {
            outArray[outIndex] = (view.getUint16(byteOffset) >> (16 - bitsPerSample) - innerBitOffset) & bitMask;
          } else if (innerBitOffset + bitsPerSample <= 24) {
            const raw = (view.getUint16(byteOffset) << 8) | (view.getUint8(byteOffset + 2));
            outArray[outIndex] = (raw >> (24 - bitsPerSample) - innerBitOffset) & bitMask;
          } else {
            outArray[outIndex] = (view.getUint32(byteOffset) >> (32 - bitsPerSample) - innerBitOffset) & bitMask;
          }

          // let outWord = 0;
          // for (let bit = 0; bit < bitsPerSample; ++bit) {
          //   if (inByteArray[bitOffset >> 3]
          //     & (0x80 >> (bitOffset & 7))) {
          //     outWord |= (1 << (bitsPerSample - 1 - bit));
          //   }
          //   ++bitOffset;
          // }

          // outArray[outIndex] = outWord;
          // outArray[pixel] = outWord;
          // pixel += 1;
        }
        // bitOffset = bitOffset + pixelBitSkip - bitsPerSample;
      }
    }
  } else if (format === 3) { // floating point
    // Float16 is handled elsewhere
    // normalize 16/24 bit floats to 32 bit floats in the array
    // console.time();
    // if (bitsPerSample === 16) {
    //   for (let byte = 0, outIndex = 0; byte < inBuffer.byteLength; byte += 2, ++outIndex) {
    //     outArray[outIndex] = getFloat16(view, byte);
    //   }
    // }
    // console.timeEnd()
  }

  return outArray.buffer;
}

/**
 * GeoTIFF sub-file image.
 */
class GeoTIFFImage {
  /**
   * @constructor
   * @param {Object} fileDirectory The parsed file directory
   * @param {Object} geoKeys The parsed geo-keys
   * @param {DataView} dataView The DataView for the underlying file.
   * @param {Boolean} littleEndian Whether the file is encoded in little or big endian
   * @param {Boolean} cache Whether or not decoded tiles shall be cached
   * @param {import('./source/basesource').BaseSource} source The datasource to read from
   */
  constructor(fileDirectory, geoKeys, dataView, littleEndian, cache, source) {
    this.fileDirectory = fileDirectory;
    this.geoKeys = geoKeys;
    this.dataView = dataView;
    this.littleEndian = littleEndian;
    this.tiles = cache ? {} : null;
    this.isTiled = !fileDirectory.StripOffsets;
    const planarConfiguration = fileDirectory.PlanarConfiguration;
    this.planarConfiguration = (typeof planarConfiguration === 'undefined') ? 1 : planarConfiguration;
    if (this.planarConfiguration !== 1 && this.planarConfiguration !== 2) {
      throw new Error('Invalid planar configuration.');
    }

    this.source = source;
  }

  /**
   * Returns the associated parsed file directory.
   * @returns {Object} the parsed file directory
   */
  getFileDirectory() {
    return this.fileDirectory;
  }

  /**
   * Returns the associated parsed geo keys.
   * @returns {Object} the parsed geo keys
   */
  getGeoKeys() {
    return this.geoKeys;
  }

  /**
   * Returns the width of the image.
   * @returns {Number} the width of the image
   */
  getWidth() {
    return this.fileDirectory.ImageWidth;
  }

  /**
   * Returns the height of the image.
   * @returns {Number} the height of the image
   */
  getHeight() {
    return this.fileDirectory.ImageLength;
  }

  /**
   * Returns the number of samples per pixel.
   * @returns {Number} the number of samples per pixel
   */
  getSamplesPerPixel() {
    return typeof this.fileDirectory.SamplesPerPixel !== 'undefined'
      ? this.fileDirectory.SamplesPerPixel : 1;
  }

  /**
   * Returns the width of each tile.
   * @returns {Number} the width of each tile
   */
  getTileWidth() {
    return this.isTiled ? this.fileDirectory.TileWidth : this.getWidth();
  }

  /**
   * Returns the height of each tile.
   * @returns {Number} the height of each tile
   */
  getTileHeight() {
    if (this.isTiled) {
      return this.fileDirectory.TileLength;
    }
    if (typeof this.fileDirectory.RowsPerStrip !== 'undefined') {
      return Math.min(this.fileDirectory.RowsPerStrip, this.getHeight());
    }
    return this.getHeight();
  }

  getBlockWidth() {
    return this.getTileWidth();
  }

  getBlockHeight(y) {
    if (this.isTiled || (y + 1) * this.getTileHeight() <= this.getHeight()) {
      return this.getTileHeight();
    } else {
      return this.getHeight() - (y * this.getTileHeight());
    }
  }

  /**
   * Calculates the number of bytes for each pixel across all samples. Only full
   * bytes are supported, an exception is thrown when this is not the case.
   * @returns {Number} the bytes per pixel
   */
  getBytesPerPixel() {
    let bytes = 0;
    for (let i = 0; i < this.fileDirectory.BitsPerSample.length; ++i) {
      bytes += this.getSampleByteSize(i);
    }
    return bytes;
  }

  getSampleByteSize(i) {
    if (i >= this.fileDirectory.BitsPerSample.length) {
      throw new RangeError(`Sample index ${i} is out of range.`);
    }
    return Math.ceil(this.fileDirectory.BitsPerSample[i] / 8);
  }

  getReaderForSample(sampleIndex) {
    const format = this.fileDirectory.SampleFormat
      ? this.fileDirectory.SampleFormat[sampleIndex] : 1;
    const bitsPerSample = this.fileDirectory.BitsPerSample[sampleIndex];
    switch (format) {
      case 1: // unsigned integer data
        if (bitsPerSample <= 8) {
          return DataView.prototype.getUint8;
        } else if (bitsPerSample <= 16) {
          return DataView.prototype.getUint16;
        } else if (bitsPerSample <= 32) {
          return DataView.prototype.getUint32;
        }
        break;
      case 2: // twos complement signed integer data
        if (bitsPerSample <= 8) {
          return DataView.prototype.getInt8;
        } else if (bitsPerSample <= 16) {
          return DataView.prototype.getInt16;
        } else if (bitsPerSample <= 32) {
          return DataView.prototype.getInt32;
        }
        break;
      case 3:
        switch (bitsPerSample) {
          case 16:
            return function (offset, littleEndian) {
              return (0,_petamoriken_float16__WEBPACK_IMPORTED_MODULE_0__.getFloat16)(this, offset, littleEndian);
            };
          case 32:
            return DataView.prototype.getFloat32;
          case 64:
            return DataView.prototype.getFloat64;
          default:
            break;
        }
        break;
      default:
        break;
    }
    throw Error('Unsupported data format/bitsPerSample');
  }

  getSampleFormat(sampleIndex = 0) {
    return this.fileDirectory.SampleFormat
      ? this.fileDirectory.SampleFormat[sampleIndex] : 1;
  }

  getBitsPerSample(sampleIndex = 0) {
    return this.fileDirectory.BitsPerSample[sampleIndex];
  }

  getArrayForSample(sampleIndex, size) {
    const format = this.getSampleFormat(sampleIndex);
    const bitsPerSample = this.getBitsPerSample(sampleIndex);
    return arrayForType(format, bitsPerSample, size);
  }

  /**
   * Returns the decoded strip or tile.
   * @param {Number} x the strip or tile x-offset
   * @param {Number} y the tile y-offset (0 for stripped images)
   * @param {Number} sample the sample to get for separated samples
   * @param {import("./geotiff").Pool|import("./geotiff").BaseDecoder} poolOrDecoder the decoder or decoder pool
   * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
   *                               to be aborted
   * @returns {Promise.<{x: number, y: number, sample: number, data: ArrayBuffer}>} the decoded strip or tile
   */
  async getTileOrStrip(x, y, sample, poolOrDecoder, signal) {
    const numTilesPerRow = Math.ceil(this.getWidth() / this.getTileWidth());
    const numTilesPerCol = Math.ceil(this.getHeight() / this.getTileHeight());
    let index;
    const { tiles } = this;
    if (this.planarConfiguration === 1) {
      index = (y * numTilesPerRow) + x;
    } else if (this.planarConfiguration === 2) {
      index = (sample * numTilesPerRow * numTilesPerCol) + (y * numTilesPerRow) + x;
    }

    let offset;
    let byteCount;
    if (this.isTiled) {
      offset = this.fileDirectory.TileOffsets[index];
      byteCount = this.fileDirectory.TileByteCounts[index];
    } else {
      offset = this.fileDirectory.StripOffsets[index];
      byteCount = this.fileDirectory.StripByteCounts[index];
    }

    if (byteCount === 0) {
      const nPixels = this.getBlockHeight(y) * this.getTileWidth();
      const bytesPerPixel = (this.planarConfiguration === 2) ? this.getSampleByteSize(sample) : this.getBytesPerPixel();
      const data = new ArrayBuffer(nPixels * bytesPerPixel);
      const view = this.getArrayForSample(sample, data);
      view.fill(this.getGDALNoData() || 0);
      return { x, y, sample, data };
    }

    const slice = (await this.source.fetch([{ offset, length: byteCount }], signal))[0];

    let request;
    if (tiles === null || !tiles[index]) {
    // resolve each request by potentially applying array normalization
      request = (async () => {
        let data = await poolOrDecoder.decode(this.fileDirectory, slice);
        const sampleFormat = this.getSampleFormat();
        const bitsPerSample = this.getBitsPerSample();
        if (needsNormalization(sampleFormat, bitsPerSample)) {
          data = normalizeArray(
            data,
            sampleFormat,
            this.planarConfiguration,
            this.getSamplesPerPixel(),
            bitsPerSample,
            this.getTileWidth(),
            this.getBlockHeight(y),
          );
        }
        return data;
      })();

      // set the cache
      if (tiles !== null) {
        tiles[index] = request;
      }
    } else {
      // get from the cache
      request = tiles[index];
    }

    // cache the tile request
    return { x, y, sample, data: await request };
  }

  /**
   * Internal read function.
   * @private
   * @param {Array} imageWindow The image window in pixel coordinates
   * @param {Array} samples The selected samples (0-based indices)
   * @param {TypedArray|TypedArray[]} valueArrays The array(s) to write into
   * @param {Boolean} interleave Whether or not to write in an interleaved manner
   * @param {import("./geotiff").Pool|AbstractDecoder} poolOrDecoder the decoder or decoder pool
   * @param {number} width the width of window to be read into
   * @param {number} height the height of window to be read into
   * @param {number} resampleMethod the resampling method to be used when interpolating
   * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
   *                               to be aborted
   * @returns {Promise<ReadRasterResult>}
   */
  async _readRaster(imageWindow, samples, valueArrays, interleave, poolOrDecoder, width,
    height, resampleMethod, signal) {
    const tileWidth = this.getTileWidth();
    const tileHeight = this.getTileHeight();
    const imageWidth = this.getWidth();
    const imageHeight = this.getHeight();

    const minXTile = Math.max(Math.floor(imageWindow[0] / tileWidth), 0);
    const maxXTile = Math.min(
      Math.ceil(imageWindow[2] / tileWidth),
      Math.ceil(imageWidth / tileWidth),
    );
    const minYTile = Math.max(Math.floor(imageWindow[1] / tileHeight), 0);
    const maxYTile = Math.min(
      Math.ceil(imageWindow[3] / tileHeight),
      Math.ceil(imageHeight / tileHeight),
    );
    const windowWidth = imageWindow[2] - imageWindow[0];

    let bytesPerPixel = this.getBytesPerPixel();

    const srcSampleOffsets = [];
    const sampleReaders = [];
    for (let i = 0; i < samples.length; ++i) {
      if (this.planarConfiguration === 1) {
        srcSampleOffsets.push(sum(this.fileDirectory.BitsPerSample, 0, samples[i]) / 8);
      } else {
        srcSampleOffsets.push(0);
      }
      sampleReaders.push(this.getReaderForSample(samples[i]));
    }

    const promises = [];
    const { littleEndian } = this;

    for (let yTile = minYTile; yTile < maxYTile; ++yTile) {
      for (let xTile = minXTile; xTile < maxXTile; ++xTile) {
        let getPromise;
        if (this.planarConfiguration === 1) {
          getPromise = this.getTileOrStrip(xTile, yTile, 0, poolOrDecoder, signal);
        }
        for (let sampleIndex = 0; sampleIndex < samples.length; ++sampleIndex) {
          const si = sampleIndex;
          const sample = samples[sampleIndex];
          if (this.planarConfiguration === 2) {
            bytesPerPixel = this.getSampleByteSize(sample);
            getPromise = this.getTileOrStrip(xTile, yTile, sample, poolOrDecoder, signal);
          }
          const promise = getPromise.then((tile) => {
            const buffer = tile.data;
            const dataView = new DataView(buffer);
            const blockHeight = this.getBlockHeight(tile.y);
            const firstLine = tile.y * tileHeight;
            const firstCol = tile.x * tileWidth;
            const lastLine = firstLine + blockHeight;
            const lastCol = (tile.x + 1) * tileWidth;
            const reader = sampleReaders[si];

            const ymax = Math.min(blockHeight, blockHeight - (lastLine - imageWindow[3]), imageHeight - firstLine);
            const xmax = Math.min(tileWidth, tileWidth - (lastCol - imageWindow[2]), imageWidth - firstCol);

            for (let y = Math.max(0, imageWindow[1] - firstLine); y < ymax; ++y) {
              for (let x = Math.max(0, imageWindow[0] - firstCol); x < xmax; ++x) {
                const pixelOffset = ((y * tileWidth) + x) * bytesPerPixel;
                const value = reader.call(
                  dataView, pixelOffset + srcSampleOffsets[si], littleEndian,
                );
                let windowCoordinate;
                if (interleave) {
                  windowCoordinate = ((y + firstLine - imageWindow[1]) * windowWidth * samples.length)
                    + ((x + firstCol - imageWindow[0]) * samples.length)
                    + si;
                  valueArrays[windowCoordinate] = value;
                } else {
                  windowCoordinate = (
                    (y + firstLine - imageWindow[1]) * windowWidth
                  ) + x + firstCol - imageWindow[0];
                  valueArrays[si][windowCoordinate] = value;
                }
              }
            }
          });
          promises.push(promise);
        }
      }
    }
    await Promise.all(promises);

    if ((width && (imageWindow[2] - imageWindow[0]) !== width)
        || (height && (imageWindow[3] - imageWindow[1]) !== height)) {
      let resampled;
      if (interleave) {
        resampled = (0,_resample_js__WEBPACK_IMPORTED_MODULE_6__.resampleInterleaved)(
          valueArrays,
          imageWindow[2] - imageWindow[0],
          imageWindow[3] - imageWindow[1],
          width, height,
          samples.length,
          resampleMethod,
        );
      } else {
        resampled = (0,_resample_js__WEBPACK_IMPORTED_MODULE_6__.resample)(
          valueArrays,
          imageWindow[2] - imageWindow[0],
          imageWindow[3] - imageWindow[1],
          width, height,
          resampleMethod,
        );
      }
      resampled.width = width;
      resampled.height = height;
      return resampled;
    }

    valueArrays.width = width || imageWindow[2] - imageWindow[0];
    valueArrays.height = height || imageWindow[3] - imageWindow[1];

    return valueArrays;
  }

  /**
   * Reads raster data from the image. This function reads all selected samples
   * into separate arrays of the correct type for that sample or into a single
   * combined array when `interleave` is set. When provided, only a subset
   * of the raster is read for each sample.
   *
   * @param {ReadRasterOptions} [options={}] optional parameters
   * @returns {Promise<ReadRasterResult>} the decoded arrays as a promise
   */
  async readRasters({
    window: wnd, samples = [], interleave, pool = null,
    width, height, resampleMethod, fillValue, signal,
  } = {}) {
    const imageWindow = wnd || [0, 0, this.getWidth(), this.getHeight()];

    // check parameters
    if (imageWindow[0] > imageWindow[2] || imageWindow[1] > imageWindow[3]) {
      throw new Error('Invalid subsets');
    }

    const imageWindowWidth = imageWindow[2] - imageWindow[0];
    const imageWindowHeight = imageWindow[3] - imageWindow[1];
    const numPixels = imageWindowWidth * imageWindowHeight;
    const samplesPerPixel = this.getSamplesPerPixel();

    if (!samples || !samples.length) {
      for (let i = 0; i < samplesPerPixel; ++i) {
        samples.push(i);
      }
    } else {
      for (let i = 0; i < samples.length; ++i) {
        if (samples[i] >= samplesPerPixel) {
          return Promise.reject(new RangeError(`Invalid sample index '${samples[i]}'.`));
        }
      }
    }
    let valueArrays;
    if (interleave) {
      const format = this.fileDirectory.SampleFormat
        ? Math.max.apply(null, this.fileDirectory.SampleFormat) : 1;
      const bitsPerSample = Math.max.apply(null, this.fileDirectory.BitsPerSample);
      valueArrays = arrayForType(format, bitsPerSample, numPixels * samples.length);
      if (fillValue) {
        valueArrays.fill(fillValue);
      }
    } else {
      valueArrays = [];
      for (let i = 0; i < samples.length; ++i) {
        const valueArray = this.getArrayForSample(samples[i], numPixels);
        if (Array.isArray(fillValue) && i < fillValue.length) {
          valueArray.fill(fillValue[i]);
        } else if (fillValue && !Array.isArray(fillValue)) {
          valueArray.fill(fillValue);
        }
        valueArrays.push(valueArray);
      }
    }

    const poolOrDecoder = pool || await (0,_compression_index_js__WEBPACK_IMPORTED_MODULE_5__.getDecoder)(this.fileDirectory);

    const result = await this._readRaster(
      imageWindow, samples, valueArrays, interleave, poolOrDecoder, width, height, resampleMethod, signal,
    );
    return result;
  }

  /**
   * Reads raster data from the image as RGB.
   * Colorspaces other than RGB will be transformed to RGB, color maps expanded.
   * When no other method is applicable, the first sample is used to produce a
   * grayscale image.
   * When provided, only a subset of the raster is read for each sample.
   *
   * @param {Object} [options] optional parameters
   * @param {Array<number>} [options.window] the subset to read data from in pixels.
   * @param {boolean} [options.interleave=true] whether the data shall be read
   *                                             in one single array or separate
   *                                             arrays.
   * @param {import("./geotiff").Pool} [options.pool=null] The optional decoder pool to use.
   * @param {number} [options.width] The desired width of the output. When the width is no the
   *                                 same as the images, resampling will be performed.
   * @param {number} [options.height] The desired height of the output. When the width is no the
   *                                  same as the images, resampling will be performed.
   * @param {string} [options.resampleMethod='nearest'] The desired resampling method.
   * @param {boolean} [options.enableAlpha=false] Enable reading alpha channel if present.
   * @param {AbortSignal} [options.signal] An AbortSignal that may be signalled if the request is
   *                                       to be aborted
   * @returns {Promise<ReadRasterResult>} the RGB array as a Promise
   */
  async readRGB({ window, interleave = true, pool = null, width, height,
    resampleMethod, enableAlpha = false, signal } = {}) {
    const imageWindow = window || [0, 0, this.getWidth(), this.getHeight()];

    // check parameters
    if (imageWindow[0] > imageWindow[2] || imageWindow[1] > imageWindow[3]) {
      throw new Error('Invalid subsets');
    }

    const pi = this.fileDirectory.PhotometricInterpretation;

    if (pi === _globals_js__WEBPACK_IMPORTED_MODULE_3__.photometricInterpretations.RGB) {
      let s = [0, 1, 2];
      if ((!(this.fileDirectory.ExtraSamples === _globals_js__WEBPACK_IMPORTED_MODULE_3__.ExtraSamplesValues.Unspecified)) && enableAlpha) {
        s = [];
        for (let i = 0; i < this.fileDirectory.BitsPerSample.length; i += 1) {
          s.push(i);
        }
      }
      return this.readRasters({
        window,
        interleave,
        samples: s,
        pool,
        width,
        height,
        resampleMethod,
        signal,
      });
    }

    let samples;
    switch (pi) {
      case _globals_js__WEBPACK_IMPORTED_MODULE_3__.photometricInterpretations.WhiteIsZero:
      case _globals_js__WEBPACK_IMPORTED_MODULE_3__.photometricInterpretations.BlackIsZero:
      case _globals_js__WEBPACK_IMPORTED_MODULE_3__.photometricInterpretations.Palette:
        samples = [0];
        break;
      case _globals_js__WEBPACK_IMPORTED_MODULE_3__.photometricInterpretations.CMYK:
        samples = [0, 1, 2, 3];
        break;
      case _globals_js__WEBPACK_IMPORTED_MODULE_3__.photometricInterpretations.YCbCr:
      case _globals_js__WEBPACK_IMPORTED_MODULE_3__.photometricInterpretations.CIELab:
        samples = [0, 1, 2];
        break;
      default:
        throw new Error('Invalid or unsupported photometric interpretation.');
    }

    const subOptions = {
      window: imageWindow,
      interleave: true,
      samples,
      pool,
      width,
      height,
      resampleMethod,
      signal,
    };
    const { fileDirectory } = this;
    const raster = await this.readRasters(subOptions);

    const max = 2 ** this.fileDirectory.BitsPerSample[0];
    let data;
    switch (pi) {
      case _globals_js__WEBPACK_IMPORTED_MODULE_3__.photometricInterpretations.WhiteIsZero:
        data = (0,_rgb_js__WEBPACK_IMPORTED_MODULE_4__.fromWhiteIsZero)(raster, max);
        break;
      case _globals_js__WEBPACK_IMPORTED_MODULE_3__.photometricInterpretations.BlackIsZero:
        data = (0,_rgb_js__WEBPACK_IMPORTED_MODULE_4__.fromBlackIsZero)(raster, max);
        break;
      case _globals_js__WEBPACK_IMPORTED_MODULE_3__.photometricInterpretations.Palette:
        data = (0,_rgb_js__WEBPACK_IMPORTED_MODULE_4__.fromPalette)(raster, fileDirectory.ColorMap);
        break;
      case _globals_js__WEBPACK_IMPORTED_MODULE_3__.photometricInterpretations.CMYK:
        data = (0,_rgb_js__WEBPACK_IMPORTED_MODULE_4__.fromCMYK)(raster);
        break;
      case _globals_js__WEBPACK_IMPORTED_MODULE_3__.photometricInterpretations.YCbCr:
        data = (0,_rgb_js__WEBPACK_IMPORTED_MODULE_4__.fromYCbCr)(raster);
        break;
      case _globals_js__WEBPACK_IMPORTED_MODULE_3__.photometricInterpretations.CIELab:
        data = (0,_rgb_js__WEBPACK_IMPORTED_MODULE_4__.fromCIELab)(raster);
        break;
      default:
        throw new Error('Unsupported photometric interpretation.');
    }

    // if non-interleaved data is requested, we must split the channels
    // into their respective arrays
    if (!interleave) {
      const red = new Uint8Array(data.length / 3);
      const green = new Uint8Array(data.length / 3);
      const blue = new Uint8Array(data.length / 3);
      for (let i = 0, j = 0; i < data.length; i += 3, ++j) {
        red[j] = data[i];
        green[j] = data[i + 1];
        blue[j] = data[i + 2];
      }
      data = [red, green, blue];
    }

    data.width = raster.width;
    data.height = raster.height;
    return data;
  }

  /**
   * Returns an array of tiepoints.
   * @returns {Object[]}
   */
  getTiePoints() {
    if (!this.fileDirectory.ModelTiepoint) {
      return [];
    }

    const tiePoints = [];
    for (let i = 0; i < this.fileDirectory.ModelTiepoint.length; i += 6) {
      tiePoints.push({
        i: this.fileDirectory.ModelTiepoint[i],
        j: this.fileDirectory.ModelTiepoint[i + 1],
        k: this.fileDirectory.ModelTiepoint[i + 2],
        x: this.fileDirectory.ModelTiepoint[i + 3],
        y: this.fileDirectory.ModelTiepoint[i + 4],
        z: this.fileDirectory.ModelTiepoint[i + 5],
      });
    }
    return tiePoints;
  }

  /**
   * Returns the parsed GDAL metadata items.
   *
   * If sample is passed to null, dataset-level metadata will be returned.
   * Otherwise only metadata specific to the provided sample will be returned.
   *
   * @param {number} [sample=null] The sample index.
   * @returns {Object}
   */
  getGDALMetadata(sample = null) {
    const metadata = {};
    if (!this.fileDirectory.GDAL_METADATA) {
      return null;
    }
    const string = this.fileDirectory.GDAL_METADATA;

    let items = (0,xml_utils_find_tags_by_name__WEBPACK_IMPORTED_MODULE_2__["default"])(string, 'Item');

    if (sample === null) {
      items = items.filter((item) => (0,xml_utils_get_attribute__WEBPACK_IMPORTED_MODULE_1__["default"])(item, 'sample') === undefined);
    } else {
      items = items.filter((item) => Number((0,xml_utils_get_attribute__WEBPACK_IMPORTED_MODULE_1__["default"])(item, 'sample')) === sample);
    }

    for (let i = 0; i < items.length; ++i) {
      const item = items[i];
      metadata[(0,xml_utils_get_attribute__WEBPACK_IMPORTED_MODULE_1__["default"])(item, 'name')] = item.inner;
    }
    return metadata;
  }

  /**
   * Returns the GDAL nodata value
   * @returns {number|null}
   */
  getGDALNoData() {
    if (!this.fileDirectory.GDAL_NODATA) {
      return null;
    }
    const string = this.fileDirectory.GDAL_NODATA;
    return Number(string.substring(0, string.length - 1));
  }

  /**
   * Returns the image origin as a XYZ-vector. When the image has no affine
   * transformation, then an exception is thrown.
   * @returns {Array<number>} The origin as a vector
   */
  getOrigin() {
    const tiePoints = this.fileDirectory.ModelTiepoint;
    const modelTransformation = this.fileDirectory.ModelTransformation;
    if (tiePoints && tiePoints.length === 6) {
      return [
        tiePoints[3],
        tiePoints[4],
        tiePoints[5],
      ];
    }
    if (modelTransformation) {
      return [
        modelTransformation[3],
        modelTransformation[7],
        modelTransformation[11],
      ];
    }
    throw new Error('The image does not have an affine transformation.');
  }

  /**
   * Returns the image resolution as a XYZ-vector. When the image has no affine
   * transformation, then an exception is thrown.
   * @param {GeoTIFFImage} [referenceImage=null] A reference image to calculate the resolution from
   *                                             in cases when the current image does not have the
   *                                             required tags on its own.
   * @returns {Array<number>} The resolution as a vector
   */
  getResolution(referenceImage = null) {
    const modelPixelScale = this.fileDirectory.ModelPixelScale;
    const modelTransformation = this.fileDirectory.ModelTransformation;

    if (modelPixelScale) {
      return [
        modelPixelScale[0],
        -modelPixelScale[1],
        modelPixelScale[2],
      ];
    }
    if (modelTransformation) {
      if (modelTransformation[1] === 0 && modelTransformation[4] === 0) {
        return [
          modelTransformation[0],
          -modelTransformation[5],
          modelTransformation[10],
        ];
      }
      return [
        Math.sqrt((modelTransformation[0] * modelTransformation[0])
          + (modelTransformation[4] * modelTransformation[4])),
        -Math.sqrt((modelTransformation[1] * modelTransformation[1])
          + (modelTransformation[5] * modelTransformation[5])),
        modelTransformation[10]];
    }

    if (referenceImage) {
      const [refResX, refResY, refResZ] = referenceImage.getResolution();
      return [
        refResX * referenceImage.getWidth() / this.getWidth(),
        refResY * referenceImage.getHeight() / this.getHeight(),
        refResZ * referenceImage.getWidth() / this.getWidth(),
      ];
    }

    throw new Error('The image does not have an affine transformation.');
  }

  /**
   * Returns whether or not the pixels of the image depict an area (or point).
   * @returns {Boolean} Whether the pixels are a point
   */
  pixelIsArea() {
    return this.geoKeys.GTRasterTypeGeoKey === 1;
  }

  /**
   * Returns the image bounding box as an array of 4 values: min-x, min-y,
   * max-x and max-y. When the image has no affine transformation, then an
   * exception is thrown.
   * @param {boolean} [tilegrid=false] If true return extent for a tilegrid
   *                                   without adjustment for ModelTransformation.
   * @returns {Array<number>} The bounding box
   */
  getBoundingBox(tilegrid = false) {
    const height = this.getHeight();
    const width = this.getWidth();

    if (this.fileDirectory.ModelTransformation && !tilegrid) {
      // eslint-disable-next-line no-unused-vars
      const [a, b, c, d, e, f, g, h] = this.fileDirectory.ModelTransformation;

      const corners = [
        [0, 0],
        [0, height],
        [width, 0],
        [width, height],
      ];

      const projected = corners.map(([I, J]) => [
        d + (a * I) + (b * J),
        h + (e * I) + (f * J),
      ]);

      const xs = projected.map((pt) => pt[0]);
      const ys = projected.map((pt) => pt[1]);

      return [
        Math.min(...xs),
        Math.min(...ys),
        Math.max(...xs),
        Math.max(...ys),
      ];
    } else {
      const origin = this.getOrigin();
      const resolution = this.getResolution();

      const x1 = origin[0];
      const y1 = origin[1];

      const x2 = x1 + (resolution[0] * width);
      const y2 = y1 + (resolution[1] * height);

      return [
        Math.min(x1, x2),
        Math.min(y1, y2),
        Math.max(x1, x2),
        Math.max(y1, y2),
      ];
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GeoTIFFImage);


/***/ }),

/***/ "./node_modules/geotiff/dist-module/geotiffwriter.js":
/*!***********************************************************!*\
  !*** ./node_modules/geotiff/dist-module/geotiffwriter.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   writeGeotiff: () => (/* binding */ writeGeotiff)
/* harmony export */ });
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals.js */ "./node_modules/geotiff/dist-module/globals.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/geotiff/dist-module/utils.js");
/*
  Some parts of this file are based on UTIF.js,
  which was released under the MIT License.
  You can view that here:
  https://github.com/photopea/UTIF.js/blob/master/LICENSE
*/



const tagName2Code = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.invert)(_globals_js__WEBPACK_IMPORTED_MODULE_0__.fieldTagNames);
const geoKeyName2Code = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.invert)(_globals_js__WEBPACK_IMPORTED_MODULE_0__.geoKeyNames);
const name2code = {};
(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.assign)(name2code, tagName2Code);
(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.assign)(name2code, geoKeyName2Code);
const typeName2byte = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.invert)(_globals_js__WEBPACK_IMPORTED_MODULE_0__.fieldTypeNames);

// config variables
const numBytesInIfd = 1000;

const _binBE = {
  nextZero: (data, o) => {
    let oincr = o;
    while (data[oincr] !== 0) {
      oincr++;
    }
    return oincr;
  },
  readUshort: (buff, p) => {
    return (buff[p] << 8) | buff[p + 1];
  },
  readShort: (buff, p) => {
    const a = _binBE.ui8;
    a[0] = buff[p + 1];
    a[1] = buff[p + 0];
    return _binBE.i16[0];
  },
  readInt: (buff, p) => {
    const a = _binBE.ui8;
    a[0] = buff[p + 3];
    a[1] = buff[p + 2];
    a[2] = buff[p + 1];
    a[3] = buff[p + 0];
    return _binBE.i32[0];
  },
  readUint: (buff, p) => {
    const a = _binBE.ui8;
    a[0] = buff[p + 3];
    a[1] = buff[p + 2];
    a[2] = buff[p + 1];
    a[3] = buff[p + 0];
    return _binBE.ui32[0];
  },
  readASCII: (buff, p, l) => {
    return l.map((i) => String.fromCharCode(buff[p + i])).join('');
  },
  readFloat: (buff, p) => {
    const a = _binBE.ui8;
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.times)(4, (i) => {
      a[i] = buff[p + 3 - i];
    });
    return _binBE.fl32[0];
  },
  readDouble: (buff, p) => {
    const a = _binBE.ui8;
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.times)(8, (i) => {
      a[i] = buff[p + 7 - i];
    });
    return _binBE.fl64[0];
  },
  writeUshort: (buff, p, n) => {
    buff[p] = (n >> 8) & 255;
    buff[p + 1] = n & 255;
  },
  writeUint: (buff, p, n) => {
    buff[p] = (n >> 24) & 255;
    buff[p + 1] = (n >> 16) & 255;
    buff[p + 2] = (n >> 8) & 255;
    buff[p + 3] = (n >> 0) & 255;
  },
  writeASCII: (buff, p, s) => {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.times)(s.length, (i) => {
      buff[p + i] = s.charCodeAt(i);
    });
  },
  ui8: new Uint8Array(8),
};

_binBE.fl64 = new Float64Array(_binBE.ui8.buffer);

_binBE.writeDouble = (buff, p, n) => {
  _binBE.fl64[0] = n;
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.times)(8, (i) => {
    buff[p + i] = _binBE.ui8[7 - i];
  });
};

const _writeIFD = (bin, data, _offset, ifd) => {
  let offset = _offset;

  const keys = Object.keys(ifd).filter((key) => {
    return key !== undefined && key !== null && key !== 'undefined';
  });

  bin.writeUshort(data, offset, keys.length);
  offset += 2;

  let eoff = offset + (12 * keys.length) + 4;

  for (const key of keys) {
    let tag = null;
    if (typeof key === 'number') {
      tag = key;
    } else if (typeof key === 'string') {
      tag = parseInt(key, 10);
    }

    const typeName = _globals_js__WEBPACK_IMPORTED_MODULE_0__.fieldTagTypes[tag];
    const typeNum = typeName2byte[typeName];

    if (typeName == null || typeName === undefined || typeof typeName === 'undefined') {
      throw new Error(`unknown type of tag: ${tag}`);
    }

    let val = ifd[key];

    if (val === undefined) {
      throw new Error(`failed to get value for key ${key}`);
    }

    // ASCIIZ format with trailing 0 character
    // http://www.fileformat.info/format/tiff/corion.htm
    // https://stackoverflow.com/questions/7783044/whats-the-difference-between-asciiz-vs-ascii
    if (typeName === 'ASCII' && typeof val === 'string' && (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.endsWith)(val, '\u0000') === false) {
      val += '\u0000';
    }

    const num = val.length;

    bin.writeUshort(data, offset, tag);
    offset += 2;

    bin.writeUshort(data, offset, typeNum);
    offset += 2;

    bin.writeUint(data, offset, num);
    offset += 4;

    let dlen = [-1, 1, 1, 2, 4, 8, 0, 0, 0, 0, 0, 0, 8][typeNum] * num;
    let toff = offset;

    if (dlen > 4) {
      bin.writeUint(data, offset, eoff);
      toff = eoff;
    }

    if (typeName === 'ASCII') {
      bin.writeASCII(data, toff, val);
    } else if (typeName === 'SHORT') {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.times)(num, (i) => {
        bin.writeUshort(data, toff + (2 * i), val[i]);
      });
    } else if (typeName === 'LONG') {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.times)(num, (i) => {
        bin.writeUint(data, toff + (4 * i), val[i]);
      });
    } else if (typeName === 'RATIONAL') {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.times)(num, (i) => {
        bin.writeUint(data, toff + (8 * i), Math.round(val[i] * 10000));
        bin.writeUint(data, toff + (8 * i) + 4, 10000);
      });
    } else if (typeName === 'DOUBLE') {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.times)(num, (i) => {
        bin.writeDouble(data, toff + (8 * i), val[i]);
      });
    }

    if (dlen > 4) {
      dlen += (dlen & 1);
      eoff += dlen;
    }

    offset += 4;
  }

  return [offset, eoff];
};

const encodeIfds = (ifds) => {
  const data = new Uint8Array(numBytesInIfd);
  let offset = 4;
  const bin = _binBE;

  // set big-endian byte-order
  // https://en.wikipedia.org/wiki/TIFF#Byte_order
  data[0] = 77;
  data[1] = 77;

  // set format-version number
  // https://en.wikipedia.org/wiki/TIFF#Byte_order
  data[3] = 42;

  let ifdo = 8;

  bin.writeUint(data, offset, ifdo);

  offset += 4;

  ifds.forEach((ifd, i) => {
    const noffs = _writeIFD(bin, data, ifdo, ifd);
    ifdo = noffs[1];
    if (i < ifds.length - 1) {
      bin.writeUint(data, noffs[0], ifdo);
    }
  });

  if (data.slice) {
    return data.slice(0, ifdo).buffer;
  }

  // node hasn't implemented slice on Uint8Array yet
  const result = new Uint8Array(ifdo);
  for (let i = 0; i < ifdo; i++) {
    result[i] = data[i];
  }
  return result.buffer;
};

const encodeImage = (values, width, height, metadata) => {
  if (height === undefined || height === null) {
    throw new Error(`you passed into encodeImage a width of type ${height}`);
  }

  if (width === undefined || width === null) {
    throw new Error(`you passed into encodeImage a width of type ${width}`);
  }

  const ifd = {
    256: [width], // ImageWidth
    257: [height], // ImageLength
    273: [numBytesInIfd], // strips offset
    278: [height], // RowsPerStrip
    305: 'geotiff.js', // no array for ASCII(Z)
  };

  if (metadata) {
    for (const i in metadata) {
      if (metadata.hasOwnProperty(i)) {
        ifd[i] = metadata[i];
      }
    }
  }

  const prfx = new Uint8Array(encodeIfds([ifd]));
  const samplesPerPixel = ifd[_globals_js__WEBPACK_IMPORTED_MODULE_0__.fieldTags.SamplesPerPixel];

  const dataType = values.constructor.name;
  const TypedArray = _utils_js__WEBPACK_IMPORTED_MODULE_1__.typeMap[dataType];

  // default for Float64
  let elementSize = 8;
  if (TypedArray) {
    elementSize = TypedArray.BYTES_PER_ELEMENT;
  }

  const data = new Uint8Array(numBytesInIfd + (values.length * elementSize * samplesPerPixel));

  (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.times)(prfx.length, (i) => {
    data[i] = prfx[i];
  });

  (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.forEach)(values, (value, i) => {
    if (!TypedArray) {
      data[numBytesInIfd + i] = value;
      return;
    }

    const buffer = new ArrayBuffer(elementSize);
    const view = new DataView(buffer);

    if (dataType === 'Float64Array') {
      view.setFloat64(0, value, false);
    } else if (dataType === 'Float32Array') {
      view.setFloat32(0, value, false);
    } else if (dataType === 'Uint32Array') {
      view.setUint32(0, value, false);
    } else if (dataType === 'Uint16Array') {
      view.setUint16(0, value, false);
    } else if (dataType === 'Uint8Array') {
      view.setUint8(0, value);
    }

    const typedArray = new Uint8Array(view.buffer);
    const idx = numBytesInIfd + (i * elementSize);

    for (let j = 0; j < elementSize; j++) {
      data[idx + j] = typedArray[j];
    }
  });

  return data.buffer;
};

const convertToTids = (input) => {
  const result = {};
  for (const key in input) {
    if (key !== 'StripOffsets') {
      if (!name2code[key]) {
        console.error(key, 'not in name2code:', Object.keys(name2code));
      }
      result[name2code[key]] = input[key];
    }
  }
  return result;
};

const toArray = (input) => {
  if (Array.isArray(input)) {
    return input;
  }
  return [input];
};

const metadataDefaults = [
  ['Compression', 1], // no compression
  ['PlanarConfiguration', 1],
  ['ExtraSamples', 0],
];

function writeGeotiff(data, metadata) {
  const isFlattened = typeof data[0] === 'number';

  let height;
  let numBands;
  let width;
  let flattenedValues;

  if (isFlattened) {
    height = metadata.height || metadata.ImageLength;
    width = metadata.width || metadata.ImageWidth;
    numBands = data.length / (height * width);
    flattenedValues = data;
  } else {
    numBands = data.length;
    height = data[0].length;
    width = data[0][0].length;
    flattenedValues = [];
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.times)(height, (rowIndex) => {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.times)(width, (columnIndex) => {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.times)(numBands, (bandIndex) => {
          flattenedValues.push(data[bandIndex][rowIndex][columnIndex]);
        });
      });
    });
  }

  metadata.ImageLength = height;
  delete metadata.height;
  metadata.ImageWidth = width;
  delete metadata.width;

  // consult https://www.loc.gov/preservation/digital/formats/content/tiff_tags.shtml

  if (!metadata.BitsPerSample) {
    let bitsPerSample = 8;
    if (ArrayBuffer.isView(flattenedValues)) {
      bitsPerSample = 8 * flattenedValues.BYTES_PER_ELEMENT;
    }
    metadata.BitsPerSample = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.times)(numBands, () => bitsPerSample);
  }

  metadataDefaults.forEach((tag) => {
    const key = tag[0];
    if (!metadata[key]) {
      const value = tag[1];
      metadata[key] = value;
    }
  });

  // The color space of the image data.
  // 1=black is zero and 2=RGB.
  if (!metadata.PhotometricInterpretation) {
    metadata.PhotometricInterpretation = metadata.BitsPerSample.length === 3 ? 2 : 1;
  }

  // The number of components per pixel.
  if (!metadata.SamplesPerPixel) {
    metadata.SamplesPerPixel = [numBands];
  }

  if (!metadata.StripByteCounts) {
    // we are only writing one strip

    // default for Float64
    let elementSize = 8;

    if (ArrayBuffer.isView(flattenedValues)) {
      elementSize = flattenedValues.BYTES_PER_ELEMENT;
    }

    metadata.StripByteCounts = [numBands * elementSize * height * width];
  }

  if (!metadata.ModelPixelScale) {
    // assumes raster takes up exactly the whole globe
    metadata.ModelPixelScale = [360 / width, 180 / height, 0];
  }

  if (!metadata.SampleFormat) {
    let sampleFormat = 1;
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isTypedFloatArray)(flattenedValues)) {
      sampleFormat = 3;
    }
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isTypedIntArray)(flattenedValues)) {
      sampleFormat = 2;
    }
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isTypedUintArray)(flattenedValues)) {
      sampleFormat = 1;
    }
    metadata.SampleFormat = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.times)(numBands, () => sampleFormat);
  }

  // if didn't pass in projection information, assume the popular 4326 "geographic projection"
  if (!metadata.hasOwnProperty('GeographicTypeGeoKey') && !metadata.hasOwnProperty('ProjectedCSTypeGeoKey')) {
    metadata.GeographicTypeGeoKey = 4326;
    metadata.ModelTiepoint = [0, 0, 0, -180, 90, 0]; // raster fits whole globe
    metadata.GeogCitationGeoKey = 'WGS 84';
    metadata.GTModelTypeGeoKey = 2;
  }

  const geoKeys = Object.keys(metadata)
    .filter((key) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.endsWith)(key, 'GeoKey'))
    .sort((a, b) => name2code[a] - name2code[b]);

  if (!metadata.GeoAsciiParams) {
    let geoAsciiParams = '';
    geoKeys.forEach((name) => {
      const code = Number(name2code[name]);
      const tagType = _globals_js__WEBPACK_IMPORTED_MODULE_0__.fieldTagTypes[code];
      if (tagType === 'ASCII') {
        geoAsciiParams += `${metadata[name].toString()}\u0000`;
      }
    });
    if (geoAsciiParams.length > 0) {
      metadata.GeoAsciiParams = geoAsciiParams;
    }
  }

  if (!metadata.GeoKeyDirectory) {
    const NumberOfKeys = geoKeys.length;

    const GeoKeyDirectory = [1, 1, 0, NumberOfKeys];
    geoKeys.forEach((geoKey) => {
      const KeyID = Number(name2code[geoKey]);
      GeoKeyDirectory.push(KeyID);

      let Count;
      let TIFFTagLocation;
      let valueOffset;
      if (_globals_js__WEBPACK_IMPORTED_MODULE_0__.fieldTagTypes[KeyID] === 'SHORT') {
        Count = 1;
        TIFFTagLocation = 0;
        valueOffset = metadata[geoKey];
      } else if (geoKey === 'GeogCitationGeoKey') {
        Count = metadata.GeoAsciiParams.length;
        TIFFTagLocation = Number(name2code.GeoAsciiParams);
        valueOffset = 0;
      } else {
        console.log(`[geotiff.js] couldn't get TIFFTagLocation for ${geoKey}`);
      }
      GeoKeyDirectory.push(TIFFTagLocation);
      GeoKeyDirectory.push(Count);
      GeoKeyDirectory.push(valueOffset);
    });
    metadata.GeoKeyDirectory = GeoKeyDirectory;
  }

  // delete GeoKeys from metadata, because stored in GeoKeyDirectory tag
  for (const geoKey of geoKeys) {
    if (metadata.hasOwnProperty(geoKey)) {
      delete metadata[geoKey];
    }
  }

  [
    'Compression',
    'ExtraSamples',
    'GeographicTypeGeoKey',
    'GTModelTypeGeoKey',
    'GTRasterTypeGeoKey',
    'ImageLength', // synonym of ImageHeight
    'ImageWidth',
    'Orientation',
    'PhotometricInterpretation',
    'ProjectedCSTypeGeoKey',
    'PlanarConfiguration',
    'ResolutionUnit',
    'SamplesPerPixel',
    'XPosition',
    'YPosition',
    'RowsPerStrip',
  ].forEach((name) => {
    if (metadata[name]) {
      metadata[name] = toArray(metadata[name]);
    }
  });

  const encodedMetadata = convertToTids(metadata);

  const outputImage = encodeImage(flattenedValues, width, height, encodedMetadata);

  return outputImage;
}


/***/ }),

/***/ "./node_modules/geotiff/dist-module/globals.js":
/*!*****************************************************!*\
  !*** ./node_modules/geotiff/dist-module/globals.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExtraSamplesValues: () => (/* binding */ ExtraSamplesValues),
/* harmony export */   LercAddCompression: () => (/* binding */ LercAddCompression),
/* harmony export */   LercParameters: () => (/* binding */ LercParameters),
/* harmony export */   arrayFields: () => (/* binding */ arrayFields),
/* harmony export */   fieldTagNames: () => (/* binding */ fieldTagNames),
/* harmony export */   fieldTagTypes: () => (/* binding */ fieldTagTypes),
/* harmony export */   fieldTags: () => (/* binding */ fieldTags),
/* harmony export */   fieldTypeNames: () => (/* binding */ fieldTypeNames),
/* harmony export */   fieldTypes: () => (/* binding */ fieldTypes),
/* harmony export */   geoKeyNames: () => (/* binding */ geoKeyNames),
/* harmony export */   geoKeys: () => (/* binding */ geoKeys),
/* harmony export */   photometricInterpretations: () => (/* binding */ photometricInterpretations),
/* harmony export */   registerTag: () => (/* binding */ registerTag)
/* harmony export */ });
const fieldTagNames = {
  // TIFF Baseline
  0x013B: 'Artist',
  0x0102: 'BitsPerSample',
  0x0109: 'CellLength',
  0x0108: 'CellWidth',
  0x0140: 'ColorMap',
  0x0103: 'Compression',
  0x8298: 'Copyright',
  0x0132: 'DateTime',
  0x0152: 'ExtraSamples',
  0x010A: 'FillOrder',
  0x0121: 'FreeByteCounts',
  0x0120: 'FreeOffsets',
  0x0123: 'GrayResponseCurve',
  0x0122: 'GrayResponseUnit',
  0x013C: 'HostComputer',
  0x010E: 'ImageDescription',
  0x0101: 'ImageLength',
  0x0100: 'ImageWidth',
  0x010F: 'Make',
  0x0119: 'MaxSampleValue',
  0x0118: 'MinSampleValue',
  0x0110: 'Model',
  0x00FE: 'NewSubfileType',
  0x0112: 'Orientation',
  0x0106: 'PhotometricInterpretation',
  0x011C: 'PlanarConfiguration',
  0x0128: 'ResolutionUnit',
  0x0116: 'RowsPerStrip',
  0x0115: 'SamplesPerPixel',
  0x0131: 'Software',
  0x0117: 'StripByteCounts',
  0x0111: 'StripOffsets',
  0x00FF: 'SubfileType',
  0x0107: 'Threshholding',
  0x011A: 'XResolution',
  0x011B: 'YResolution',

  // TIFF Extended
  0x0146: 'BadFaxLines',
  0x0147: 'CleanFaxData',
  0x0157: 'ClipPath',
  0x0148: 'ConsecutiveBadFaxLines',
  0x01B1: 'Decode',
  0x01B2: 'DefaultImageColor',
  0x010D: 'DocumentName',
  0x0150: 'DotRange',
  0x0141: 'HalftoneHints',
  0x015A: 'Indexed',
  0x015B: 'JPEGTables',
  0x011D: 'PageName',
  0x0129: 'PageNumber',
  0x013D: 'Predictor',
  0x013F: 'PrimaryChromaticities',
  0x0214: 'ReferenceBlackWhite',
  0x0153: 'SampleFormat',
  0x0154: 'SMinSampleValue',
  0x0155: 'SMaxSampleValue',
  0x022F: 'StripRowCounts',
  0x014A: 'SubIFDs',
  0x0124: 'T4Options',
  0x0125: 'T6Options',
  0x0145: 'TileByteCounts',
  0x0143: 'TileLength',
  0x0144: 'TileOffsets',
  0x0142: 'TileWidth',
  0x012D: 'TransferFunction',
  0x013E: 'WhitePoint',
  0x0158: 'XClipPathUnits',
  0x011E: 'XPosition',
  0x0211: 'YCbCrCoefficients',
  0x0213: 'YCbCrPositioning',
  0x0212: 'YCbCrSubSampling',
  0x0159: 'YClipPathUnits',
  0x011F: 'YPosition',

  // EXIF
  0x9202: 'ApertureValue',
  0xA001: 'ColorSpace',
  0x9004: 'DateTimeDigitized',
  0x9003: 'DateTimeOriginal',
  0x8769: 'Exif IFD',
  0x9000: 'ExifVersion',
  0x829A: 'ExposureTime',
  0xA300: 'FileSource',
  0x9209: 'Flash',
  0xA000: 'FlashpixVersion',
  0x829D: 'FNumber',
  0xA420: 'ImageUniqueID',
  0x9208: 'LightSource',
  0x927C: 'MakerNote',
  0x9201: 'ShutterSpeedValue',
  0x9286: 'UserComment',

  // IPTC
  0x83BB: 'IPTC',

  // Laser Scanning Microscopy
  0x866c: 'CZ_LSMINFO',

  // ICC
  0x8773: 'ICC Profile',

  // XMP
  0x02BC: 'XMP',

  // GDAL
  0xA480: 'GDAL_METADATA',
  0xA481: 'GDAL_NODATA',

  // Photoshop
  0x8649: 'Photoshop',

  // GeoTiff
  0x830E: 'ModelPixelScale',
  0x8482: 'ModelTiepoint',
  0x85D8: 'ModelTransformation',
  0x87AF: 'GeoKeyDirectory',
  0x87B0: 'GeoDoubleParams',
  0x87B1: 'GeoAsciiParams',

  // LERC
  0xC5F2: 'LercParameters',
};

const fieldTags = {};
for (const key in fieldTagNames) {
  if (fieldTagNames.hasOwnProperty(key)) {
    fieldTags[fieldTagNames[key]] = parseInt(key, 10);
  }
}

const fieldTagTypes = {
  256: 'SHORT',
  257: 'SHORT',
  258: 'SHORT',
  259: 'SHORT',
  262: 'SHORT',
  270: 'ASCII',
  271: 'ASCII',
  272: 'ASCII',
  273: 'LONG',
  274: 'SHORT',
  277: 'SHORT',
  278: 'LONG',
  279: 'LONG',
  282: 'RATIONAL',
  283: 'RATIONAL',
  284: 'SHORT',
  286: 'SHORT',
  287: 'RATIONAL',
  296: 'SHORT',
  297: 'SHORT',
  305: 'ASCII',
  306: 'ASCII',
  315: 'ASCII',
  338: 'SHORT',
  339: 'SHORT',
  513: 'LONG',
  514: 'LONG',
  1024: 'SHORT',
  1025: 'SHORT',
  1026: 'ASCII',
  2048: 'SHORT',
  2049: 'ASCII',
  2052: 'SHORT',
  2054: 'SHORT',
  2060: 'SHORT',
  3072: 'SHORT',
  3073: 'ASCII',
  3076: 'SHORT',
  4096: 'SHORT',
  4097: 'ASCII',
  4099: 'SHORT',
  33432: 'ASCII',
  33550: 'DOUBLE',
  33922: 'DOUBLE',
  34264: 'DOUBLE',
  34665: 'LONG',
  34735: 'SHORT',
  34736: 'DOUBLE',
  34737: 'ASCII',
  42113: 'ASCII',
};

const arrayFields = [
  fieldTags.BitsPerSample,
  fieldTags.ExtraSamples,
  fieldTags.SampleFormat,
  fieldTags.StripByteCounts,
  fieldTags.StripOffsets,
  fieldTags.StripRowCounts,
  fieldTags.TileByteCounts,
  fieldTags.TileOffsets,
  fieldTags.SubIFDs,
];

const fieldTypeNames = {
  0x0001: 'BYTE',
  0x0002: 'ASCII',
  0x0003: 'SHORT',
  0x0004: 'LONG',
  0x0005: 'RATIONAL',
  0x0006: 'SBYTE',
  0x0007: 'UNDEFINED',
  0x0008: 'SSHORT',
  0x0009: 'SLONG',
  0x000A: 'SRATIONAL',
  0x000B: 'FLOAT',
  0x000C: 'DOUBLE',
  // IFD offset, suggested by https://owl.phy.queensu.ca/~phil/exiftool/standards.html
  0x000D: 'IFD',
  // introduced by BigTIFF
  0x0010: 'LONG8',
  0x0011: 'SLONG8',
  0x0012: 'IFD8',
};

const fieldTypes = {};
for (const key in fieldTypeNames) {
  if (fieldTypeNames.hasOwnProperty(key)) {
    fieldTypes[fieldTypeNames[key]] = parseInt(key, 10);
  }
}

/**
 * Registers a new field tag
 * @param {number} tag the numeric tiff tag
 * @param {string} name the name of the tag that will be reported in the IFD
 * @param {number} type the tags data type
 * @param {Boolean} isArray whether the tag is an array
 */
function registerTag(tag, name, type = undefined, isArray = false) {
  fieldTags[name] = tag;
  fieldTagNames[tag] = name;

  if (type) {
    fieldTypes[name] = type;
  }
  if (isArray) {
    arrayFields.push(tag);
  }
}

const photometricInterpretations = {
  WhiteIsZero: 0,
  BlackIsZero: 1,
  RGB: 2,
  Palette: 3,
  TransparencyMask: 4,
  CMYK: 5,
  YCbCr: 6,

  CIELab: 8,
  ICCLab: 9,
};

const ExtraSamplesValues = {
  Unspecified: 0,
  Assocalpha: 1,
  Unassalpha: 2,
};

const LercParameters = {
  Version: 0,
  AddCompression: 1,
};

const LercAddCompression = {
  None: 0,
  Deflate: 1,
  Zstandard: 2,
};

const geoKeyNames = {
  1024: 'GTModelTypeGeoKey',
  1025: 'GTRasterTypeGeoKey',
  1026: 'GTCitationGeoKey',
  2048: 'GeographicTypeGeoKey',
  2049: 'GeogCitationGeoKey',
  2050: 'GeogGeodeticDatumGeoKey',
  2051: 'GeogPrimeMeridianGeoKey',
  2052: 'GeogLinearUnitsGeoKey',
  2053: 'GeogLinearUnitSizeGeoKey',
  2054: 'GeogAngularUnitsGeoKey',
  2055: 'GeogAngularUnitSizeGeoKey',
  2056: 'GeogEllipsoidGeoKey',
  2057: 'GeogSemiMajorAxisGeoKey',
  2058: 'GeogSemiMinorAxisGeoKey',
  2059: 'GeogInvFlatteningGeoKey',
  2060: 'GeogAzimuthUnitsGeoKey',
  2061: 'GeogPrimeMeridianLongGeoKey',
  2062: 'GeogTOWGS84GeoKey',
  3072: 'ProjectedCSTypeGeoKey',
  3073: 'PCSCitationGeoKey',
  3074: 'ProjectionGeoKey',
  3075: 'ProjCoordTransGeoKey',
  3076: 'ProjLinearUnitsGeoKey',
  3077: 'ProjLinearUnitSizeGeoKey',
  3078: 'ProjStdParallel1GeoKey',
  3079: 'ProjStdParallel2GeoKey',
  3080: 'ProjNatOriginLongGeoKey',
  3081: 'ProjNatOriginLatGeoKey',
  3082: 'ProjFalseEastingGeoKey',
  3083: 'ProjFalseNorthingGeoKey',
  3084: 'ProjFalseOriginLongGeoKey',
  3085: 'ProjFalseOriginLatGeoKey',
  3086: 'ProjFalseOriginEastingGeoKey',
  3087: 'ProjFalseOriginNorthingGeoKey',
  3088: 'ProjCenterLongGeoKey',
  3089: 'ProjCenterLatGeoKey',
  3090: 'ProjCenterEastingGeoKey',
  3091: 'ProjCenterNorthingGeoKey',
  3092: 'ProjScaleAtNatOriginGeoKey',
  3093: 'ProjScaleAtCenterGeoKey',
  3094: 'ProjAzimuthAngleGeoKey',
  3095: 'ProjStraightVertPoleLongGeoKey',
  3096: 'ProjRectifiedGridAngleGeoKey',
  4096: 'VerticalCSTypeGeoKey',
  4097: 'VerticalCitationGeoKey',
  4098: 'VerticalDatumGeoKey',
  4099: 'VerticalUnitsGeoKey',
};

const geoKeys = {};
for (const key in geoKeyNames) {
  if (geoKeyNames.hasOwnProperty(key)) {
    geoKeys[geoKeyNames[key]] = parseInt(key, 10);
  }
}


/***/ }),

/***/ "./node_modules/geotiff/dist-module/logging.js":
/*!*****************************************************!*\
  !*** ./node_modules/geotiff/dist-module/logging.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debug: () => (/* binding */ debug),
/* harmony export */   error: () => (/* binding */ error),
/* harmony export */   info: () => (/* binding */ info),
/* harmony export */   log: () => (/* binding */ log),
/* harmony export */   setLogger: () => (/* binding */ setLogger),
/* harmony export */   time: () => (/* binding */ time),
/* harmony export */   timeEnd: () => (/* binding */ timeEnd),
/* harmony export */   warn: () => (/* binding */ warn)
/* harmony export */ });
/**
 * A no-op logger
 */
class DummyLogger {
  log() {}

  debug() {}

  info() {}

  warn() {}

  error() {}

  time() {}

  timeEnd() {}
}

let LOGGER = new DummyLogger();

/**
 *
 * @param {object} logger the new logger. e.g `console`
 */
function setLogger(logger = new DummyLogger()) {
  LOGGER = logger;
}

function debug(...args) {
  return LOGGER.debug(...args);
}

function log(...args) {
  return LOGGER.log(...args);
}

function info(...args) {
  return LOGGER.info(...args);
}

function warn(...args) {
  return LOGGER.warn(...args);
}

function error(...args) {
  return LOGGER.error(...args);
}

function time(...args) {
  return LOGGER.time(...args);
}

function timeEnd(...args) {
  return LOGGER.timeEnd(...args);
}


/***/ }),

/***/ "./node_modules/geotiff/dist-module/pool.js":
/*!**************************************************!*\
  !*** ./node_modules/geotiff/dist-module/pool.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _compression_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./compression/index.js */ "./node_modules/geotiff/dist-module/compression/index.js");
/* harmony import */ var _worker_create_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./worker/create.js */ "./node_modules/geotiff/dist-module/worker/create.js");



const defaultPoolSize = typeof navigator !== 'undefined' ? (navigator.hardwareConcurrency || 2) : 2;

/**
 * @module pool
 */

/**
 * Wrapper for a worker that can submit jobs to the worker and receive responses.
 */
class WorkerWrapper {
  /**
   * @param {Worker} worker the worker to wrap
   */
  constructor(worker) {
    this.worker = worker;
    this.worker.addEventListener('message', (e) => this._onWorkerMessage(e));
    this.jobIdCounter = 0;
    this.jobs = new Map();
  }

  /**
   * Get a new job id
   * @returns {Number} the new job id
   */
  newJobId() {
    return this.jobIdCounter++;
  }

  /**
   * Get the number of jobs currently running
   * @returns {Number} the number of jobs currently running
   */
  getJobCount() {
    return this.jobs.size;
  }

  _onWorkerMessage(e) {
    const { jobId, error, ...result } = e.data;
    const job = this.jobs.get(jobId);
    this.jobs.delete(jobId);

    if (error) {
      job.reject(new Error(error));
    } else {
      job.resolve(result);
    }
  }

  /**
   * Submit a job to the worker
   * @param {Object} message the message to send to the worker. A "jobId" property will be added to this object.
   * @param {Object[]} [transferables] an optional array of transferable objects to transfer to the worker.
   * @returns {Promise} a promise that gets resolved/rejected when a message with the same jobId is received from the worker.
   */
  submitJob(message, transferables = undefined) {
    const jobId = this.newJobId();
    let resolve;
    let reject;

    const promise = new Promise((_resolve, _reject) => {
      resolve = _resolve;
      reject = _reject;
    });

    this.jobs.set(jobId, { resolve, reject });
    this.worker.postMessage({ ...message, jobId }, transferables);
    return promise;
  }

  terminate() {
    this.worker.terminate();
  }
}

const finalizationRegistry = new FinalizationRegistry((worker) => {
  worker.terminate();
});

/**
 * Pool for workers to decode chunks of the images.
 */
class Pool {
  /**
   * @constructor
   * @param {Number} [size] The size of the pool. Defaults to the number of CPUs
   *                      available. When this parameter is `null` or 0, then the
   *                      decoding will be done in the main thread.
   * @param {function(): Worker} [createWorker] A function that creates the decoder worker.
   * Defaults to a worker with all decoders that ship with geotiff.js. The `createWorker()`
   * function is expected to return a `Worker` compatible with Web Workers. For code that
   * runs in Node, [web-worker](https://www.npmjs.com/package/web-worker) is a good choice.
   *
   * A worker that uses a custom lzw decoder would look like this `my-custom-worker.js` file:
   * ```js
   * import { addDecoder, getDecoder } from 'geotiff';
   * addDecoder(5, () => import ('./my-custom-lzw').then((m) => m.default));
   * self.addEventListener('message', async (e) => {
   *   const { id, fileDirectory, buffer } = e.data;
   *   const decoder = await getDecoder(fileDirectory);
   *   const decoded = await decoder.decode(fileDirectory, buffer);
   *   self.postMessage({ decoded, id }, [decoded]);
   * });
   * ```
   * The way the above code is built into a worker by the `createWorker()` function
   * depends on the used bundler. For most bundlers, something like this will work:
   * ```js
   * function createWorker() {
   *   return new Worker(new URL('./my-custom-worker.js', import.meta.url));
   * }
   * ```
   */
  constructor(size = defaultPoolSize, createWorker = _worker_create_js__WEBPACK_IMPORTED_MODULE_1__["default"]) {
    this.workerWrappers = null;
    if (size) {
      this.workerWrappers = (async () => {
        const workerWrappers = [];
        for (let i = 0; i < size; i++) {
          const worker = createWorker();
          const wrapper = new WorkerWrapper(worker);
          workerWrappers.push(wrapper);
          finalizationRegistry.register(wrapper, worker, wrapper);
        }
        return workerWrappers;
      })();
    }
  }

  /**
   * Decode the given block of bytes with the set compression method.
   * @param {ArrayBuffer} buffer the array buffer of bytes to decode.
   * @returns {Promise<ArrayBuffer>} the decoded result as a `Promise`
   */
  async decode(fileDirectory, buffer) {
    if ((0,_compression_index_js__WEBPACK_IMPORTED_MODULE_0__.preferWorker)(fileDirectory) && this.workerWrappers) {
      // select the worker with the lowest jobCount
      const workerWrapper = (await this.workerWrappers).reduce((a, b) => {
        return a.getJobCount() < b.getJobCount() ? a : b;
      });
      const { decoded } = await workerWrapper.submitJob({ fileDirectory, buffer }, [buffer]);
      return decoded;
    } else {
      return (0,_compression_index_js__WEBPACK_IMPORTED_MODULE_0__.getDecoder)(fileDirectory).then((decoder) => decoder.decode(fileDirectory, buffer));
    }
  }

  async destroy() {
    if (this.workerWrappers) {
      (await this.workerWrappers).forEach((worker) => {
        worker.terminate();
      });
      this.workerWrappers = null;
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pool);


/***/ }),

/***/ "./node_modules/geotiff/dist-module/predictor.js":
/*!*******************************************************!*\
  !*** ./node_modules/geotiff/dist-module/predictor.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyPredictor: () => (/* binding */ applyPredictor)
/* harmony export */ });
function decodeRowAcc(row, stride) {
  let length = row.length - stride;
  let offset = 0;
  do {
    for (let i = stride; i > 0; i--) {
      row[offset + stride] += row[offset];
      offset++;
    }

    length -= stride;
  } while (length > 0);
}

function decodeRowFloatingPoint(row, stride, bytesPerSample) {
  let index = 0;
  let count = row.length;
  const wc = count / bytesPerSample;

  while (count > stride) {
    for (let i = stride; i > 0; --i) {
      row[index + stride] += row[index];
      ++index;
    }
    count -= stride;
  }

  const copy = row.slice();
  for (let i = 0; i < wc; ++i) {
    for (let b = 0; b < bytesPerSample; ++b) {
      row[(bytesPerSample * i) + b] = copy[((bytesPerSample - b - 1) * wc) + i];
    }
  }
}

function applyPredictor(block, predictor, width, height, bitsPerSample,
  planarConfiguration) {
  if (!predictor || predictor === 1) {
    return block;
  }

  for (let i = 0; i < bitsPerSample.length; ++i) {
    if (bitsPerSample[i] % 8 !== 0) {
      throw new Error('When decoding with predictor, only multiple of 8 bits are supported.');
    }
    if (bitsPerSample[i] !== bitsPerSample[0]) {
      throw new Error('When decoding with predictor, all samples must have the same size.');
    }
  }

  const bytesPerSample = bitsPerSample[0] / 8;
  const stride = planarConfiguration === 2 ? 1 : bitsPerSample.length;

  for (let i = 0; i < height; ++i) {
    // Last strip will be truncated if height % stripHeight != 0
    if (i * stride * width * bytesPerSample >= block.byteLength) {
      break;
    }
    let row;
    if (predictor === 2) { // horizontal prediction
      switch (bitsPerSample[0]) {
        case 8:
          row = new Uint8Array(
            block, i * stride * width * bytesPerSample, stride * width * bytesPerSample,
          );
          break;
        case 16:
          row = new Uint16Array(
            block, i * stride * width * bytesPerSample, stride * width * bytesPerSample / 2,
          );
          break;
        case 32:
          row = new Uint32Array(
            block, i * stride * width * bytesPerSample, stride * width * bytesPerSample / 4,
          );
          break;
        default:
          throw new Error(`Predictor 2 not allowed with ${bitsPerSample[0]} bits per sample.`);
      }
      decodeRowAcc(row, stride, bytesPerSample);
    } else if (predictor === 3) { // horizontal floating point
      row = new Uint8Array(
        block, i * stride * width * bytesPerSample, stride * width * bytesPerSample,
      );
      decodeRowFloatingPoint(row, stride, bytesPerSample);
    }
  }
  return block;
}


/***/ }),

/***/ "./node_modules/geotiff/dist-module/resample.js":
/*!******************************************************!*\
  !*** ./node_modules/geotiff/dist-module/resample.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resample: () => (/* binding */ resample),
/* harmony export */   resampleBilinear: () => (/* binding */ resampleBilinear),
/* harmony export */   resampleBilinearInterleaved: () => (/* binding */ resampleBilinearInterleaved),
/* harmony export */   resampleInterleaved: () => (/* binding */ resampleInterleaved),
/* harmony export */   resampleNearest: () => (/* binding */ resampleNearest),
/* harmony export */   resampleNearestInterleaved: () => (/* binding */ resampleNearestInterleaved)
/* harmony export */ });
/**
 * @module resample
 */

function copyNewSize(array, width, height, samplesPerPixel = 1) {
  return new (Object.getPrototypeOf(array).constructor)(width * height * samplesPerPixel);
}

/**
 * Resample the input arrays using nearest neighbor value selection.
 * @param {TypedArray[]} valueArrays The input arrays to resample
 * @param {number} inWidth The width of the input rasters
 * @param {number} inHeight The height of the input rasters
 * @param {number} outWidth The desired width of the output rasters
 * @param {number} outHeight The desired height of the output rasters
 * @returns {TypedArray[]} The resampled rasters
 */
function resampleNearest(valueArrays, inWidth, inHeight, outWidth, outHeight) {
  const relX = inWidth / outWidth;
  const relY = inHeight / outHeight;
  return valueArrays.map((array) => {
    const newArray = copyNewSize(array, outWidth, outHeight);
    for (let y = 0; y < outHeight; ++y) {
      const cy = Math.min(Math.round(relY * y), inHeight - 1);
      for (let x = 0; x < outWidth; ++x) {
        const cx = Math.min(Math.round(relX * x), inWidth - 1);
        const value = array[(cy * inWidth) + cx];
        newArray[(y * outWidth) + x] = value;
      }
    }
    return newArray;
  });
}

// simple linear interpolation, code from:
// https://en.wikipedia.org/wiki/Linear_interpolation#Programming_language_support
function lerp(v0, v1, t) {
  return ((1 - t) * v0) + (t * v1);
}

/**
 * Resample the input arrays using bilinear interpolation.
 * @param {TypedArray[]} valueArrays The input arrays to resample
 * @param {number} inWidth The width of the input rasters
 * @param {number} inHeight The height of the input rasters
 * @param {number} outWidth The desired width of the output rasters
 * @param {number} outHeight The desired height of the output rasters
 * @returns {TypedArray[]} The resampled rasters
 */
function resampleBilinear(valueArrays, inWidth, inHeight, outWidth, outHeight) {
  const relX = inWidth / outWidth;
  const relY = inHeight / outHeight;

  return valueArrays.map((array) => {
    const newArray = copyNewSize(array, outWidth, outHeight);
    for (let y = 0; y < outHeight; ++y) {
      const rawY = relY * y;

      const yl = Math.floor(rawY);
      const yh = Math.min(Math.ceil(rawY), (inHeight - 1));

      for (let x = 0; x < outWidth; ++x) {
        const rawX = relX * x;
        const tx = rawX % 1;

        const xl = Math.floor(rawX);
        const xh = Math.min(Math.ceil(rawX), (inWidth - 1));

        const ll = array[(yl * inWidth) + xl];
        const hl = array[(yl * inWidth) + xh];
        const lh = array[(yh * inWidth) + xl];
        const hh = array[(yh * inWidth) + xh];

        const value = lerp(
          lerp(ll, hl, tx),
          lerp(lh, hh, tx),
          rawY % 1,
        );
        newArray[(y * outWidth) + x] = value;
      }
    }
    return newArray;
  });
}

/**
 * Resample the input arrays using the selected resampling method.
 * @param {TypedArray[]} valueArrays The input arrays to resample
 * @param {number} inWidth The width of the input rasters
 * @param {number} inHeight The height of the input rasters
 * @param {number} outWidth The desired width of the output rasters
 * @param {number} outHeight The desired height of the output rasters
 * @param {string} [method = 'nearest'] The desired resampling method
 * @returns {TypedArray[]} The resampled rasters
 */
function resample(valueArrays, inWidth, inHeight, outWidth, outHeight, method = 'nearest') {
  switch (method.toLowerCase()) {
    case 'nearest':
      return resampleNearest(valueArrays, inWidth, inHeight, outWidth, outHeight);
    case 'bilinear':
    case 'linear':
      return resampleBilinear(valueArrays, inWidth, inHeight, outWidth, outHeight);
    default:
      throw new Error(`Unsupported resampling method: '${method}'`);
  }
}

/**
 * Resample the pixel interleaved input array using nearest neighbor value selection.
 * @param {TypedArray} valueArrays The input arrays to resample
 * @param {number} inWidth The width of the input rasters
 * @param {number} inHeight The height of the input rasters
 * @param {number} outWidth The desired width of the output rasters
 * @param {number} outHeight The desired height of the output rasters
 * @param {number} samples The number of samples per pixel for pixel
 *                         interleaved data
 * @returns {TypedArray} The resampled raster
 */
function resampleNearestInterleaved(
  valueArray, inWidth, inHeight, outWidth, outHeight, samples) {
  const relX = inWidth / outWidth;
  const relY = inHeight / outHeight;

  const newArray = copyNewSize(valueArray, outWidth, outHeight, samples);
  for (let y = 0; y < outHeight; ++y) {
    const cy = Math.min(Math.round(relY * y), inHeight - 1);
    for (let x = 0; x < outWidth; ++x) {
      const cx = Math.min(Math.round(relX * x), inWidth - 1);
      for (let i = 0; i < samples; ++i) {
        const value = valueArray[(cy * inWidth * samples) + (cx * samples) + i];
        newArray[(y * outWidth * samples) + (x * samples) + i] = value;
      }
    }
  }
  return newArray;
}

/**
 * Resample the pixel interleaved input array using bilinear interpolation.
 * @param {TypedArray} valueArrays The input arrays to resample
 * @param {number} inWidth The width of the input rasters
 * @param {number} inHeight The height of the input rasters
 * @param {number} outWidth The desired width of the output rasters
 * @param {number} outHeight The desired height of the output rasters
 * @param {number} samples The number of samples per pixel for pixel
 *                         interleaved data
 * @returns {TypedArray} The resampled raster
 */
function resampleBilinearInterleaved(
  valueArray, inWidth, inHeight, outWidth, outHeight, samples) {
  const relX = inWidth / outWidth;
  const relY = inHeight / outHeight;
  const newArray = copyNewSize(valueArray, outWidth, outHeight, samples);
  for (let y = 0; y < outHeight; ++y) {
    const rawY = relY * y;

    const yl = Math.floor(rawY);
    const yh = Math.min(Math.ceil(rawY), (inHeight - 1));

    for (let x = 0; x < outWidth; ++x) {
      const rawX = relX * x;
      const tx = rawX % 1;

      const xl = Math.floor(rawX);
      const xh = Math.min(Math.ceil(rawX), (inWidth - 1));

      for (let i = 0; i < samples; ++i) {
        const ll = valueArray[(yl * inWidth * samples) + (xl * samples) + i];
        const hl = valueArray[(yl * inWidth * samples) + (xh * samples) + i];
        const lh = valueArray[(yh * inWidth * samples) + (xl * samples) + i];
        const hh = valueArray[(yh * inWidth * samples) + (xh * samples) + i];

        const value = lerp(
          lerp(ll, hl, tx),
          lerp(lh, hh, tx),
          rawY % 1,
        );
        newArray[(y * outWidth * samples) + (x * samples) + i] = value;
      }
    }
  }
  return newArray;
}

/**
 * Resample the pixel interleaved input array using the selected resampling method.
 * @param {TypedArray} valueArray The input array to resample
 * @param {number} inWidth The width of the input rasters
 * @param {number} inHeight The height of the input rasters
 * @param {number} outWidth The desired width of the output rasters
 * @param {number} outHeight The desired height of the output rasters
 * @param {number} samples The number of samples per pixel for pixel
 *                                 interleaved data
 * @param {string} [method = 'nearest'] The desired resampling method
 * @returns {TypedArray} The resampled rasters
 */
function resampleInterleaved(valueArray, inWidth, inHeight, outWidth, outHeight, samples, method = 'nearest') {
  switch (method.toLowerCase()) {
    case 'nearest':
      return resampleNearestInterleaved(
        valueArray, inWidth, inHeight, outWidth, outHeight, samples,
      );
    case 'bilinear':
    case 'linear':
      return resampleBilinearInterleaved(
        valueArray, inWidth, inHeight, outWidth, outHeight, samples,
      );
    default:
      throw new Error(`Unsupported resampling method: '${method}'`);
  }
}


/***/ }),

/***/ "./node_modules/geotiff/dist-module/rgb.js":
/*!*************************************************!*\
  !*** ./node_modules/geotiff/dist-module/rgb.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromBlackIsZero: () => (/* binding */ fromBlackIsZero),
/* harmony export */   fromCIELab: () => (/* binding */ fromCIELab),
/* harmony export */   fromCMYK: () => (/* binding */ fromCMYK),
/* harmony export */   fromPalette: () => (/* binding */ fromPalette),
/* harmony export */   fromWhiteIsZero: () => (/* binding */ fromWhiteIsZero),
/* harmony export */   fromYCbCr: () => (/* binding */ fromYCbCr)
/* harmony export */ });
function fromWhiteIsZero(raster, max) {
  const { width, height } = raster;
  const rgbRaster = new Uint8Array(width * height * 3);
  let value;
  for (let i = 0, j = 0; i < raster.length; ++i, j += 3) {
    value = 256 - (raster[i] / max * 256);
    rgbRaster[j] = value;
    rgbRaster[j + 1] = value;
    rgbRaster[j + 2] = value;
  }
  return rgbRaster;
}

function fromBlackIsZero(raster, max) {
  const { width, height } = raster;
  const rgbRaster = new Uint8Array(width * height * 3);
  let value;
  for (let i = 0, j = 0; i < raster.length; ++i, j += 3) {
    value = raster[i] / max * 256;
    rgbRaster[j] = value;
    rgbRaster[j + 1] = value;
    rgbRaster[j + 2] = value;
  }
  return rgbRaster;
}

function fromPalette(raster, colorMap) {
  const { width, height } = raster;
  const rgbRaster = new Uint8Array(width * height * 3);
  const greenOffset = colorMap.length / 3;
  const blueOffset = colorMap.length / 3 * 2;
  for (let i = 0, j = 0; i < raster.length; ++i, j += 3) {
    const mapIndex = raster[i];
    rgbRaster[j] = colorMap[mapIndex] / 65536 * 256;
    rgbRaster[j + 1] = colorMap[mapIndex + greenOffset] / 65536 * 256;
    rgbRaster[j + 2] = colorMap[mapIndex + blueOffset] / 65536 * 256;
  }
  return rgbRaster;
}

function fromCMYK(cmykRaster) {
  const { width, height } = cmykRaster;
  const rgbRaster = new Uint8Array(width * height * 3);
  for (let i = 0, j = 0; i < cmykRaster.length; i += 4, j += 3) {
    const c = cmykRaster[i];
    const m = cmykRaster[i + 1];
    const y = cmykRaster[i + 2];
    const k = cmykRaster[i + 3];

    rgbRaster[j] = 255 * ((255 - c) / 256) * ((255 - k) / 256);
    rgbRaster[j + 1] = 255 * ((255 - m) / 256) * ((255 - k) / 256);
    rgbRaster[j + 2] = 255 * ((255 - y) / 256) * ((255 - k) / 256);
  }
  return rgbRaster;
}

function fromYCbCr(yCbCrRaster) {
  const { width, height } = yCbCrRaster;
  const rgbRaster = new Uint8ClampedArray(width * height * 3);
  for (let i = 0, j = 0; i < yCbCrRaster.length; i += 3, j += 3) {
    const y = yCbCrRaster[i];
    const cb = yCbCrRaster[i + 1];
    const cr = yCbCrRaster[i + 2];

    rgbRaster[j] = (y + (1.40200 * (cr - 0x80)));
    rgbRaster[j + 1] = (y - (0.34414 * (cb - 0x80)) - (0.71414 * (cr - 0x80)));
    rgbRaster[j + 2] = (y + (1.77200 * (cb - 0x80)));
  }
  return rgbRaster;
}

const Xn = 0.95047;
const Yn = 1.00000;
const Zn = 1.08883;

// from https://github.com/antimatter15/rgb-lab/blob/master/color.js

function fromCIELab(cieLabRaster) {
  const { width, height } = cieLabRaster;
  const rgbRaster = new Uint8Array(width * height * 3);

  for (let i = 0, j = 0; i < cieLabRaster.length; i += 3, j += 3) {
    const L = cieLabRaster[i + 0];
    const a_ = cieLabRaster[i + 1] << 24 >> 24; // conversion from uint8 to int8
    const b_ = cieLabRaster[i + 2] << 24 >> 24; // same

    let y = (L + 16) / 116;
    let x = (a_ / 500) + y;
    let z = y - (b_ / 200);
    let r;
    let g;
    let b;

    x = Xn * ((x * x * x > 0.008856) ? x * x * x : (x - (16 / 116)) / 7.787);
    y = Yn * ((y * y * y > 0.008856) ? y * y * y : (y - (16 / 116)) / 7.787);
    z = Zn * ((z * z * z > 0.008856) ? z * z * z : (z - (16 / 116)) / 7.787);

    r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
    g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
    b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

    r = (r > 0.0031308) ? ((1.055 * (r ** (1 / 2.4))) - 0.055) : 12.92 * r;
    g = (g > 0.0031308) ? ((1.055 * (g ** (1 / 2.4))) - 0.055) : 12.92 * g;
    b = (b > 0.0031308) ? ((1.055 * (b ** (1 / 2.4))) - 0.055) : 12.92 * b;

    rgbRaster[j] = Math.max(0, Math.min(1, r)) * 255;
    rgbRaster[j + 1] = Math.max(0, Math.min(1, g)) * 255;
    rgbRaster[j + 2] = Math.max(0, Math.min(1, b)) * 255;
  }
  return rgbRaster;
}


/***/ }),

/***/ "./node_modules/geotiff/dist-module/source/arraybuffer.js":
/*!****************************************************************!*\
  !*** ./node_modules/geotiff/dist-module/source/arraybuffer.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   makeBufferSource: () => (/* binding */ makeBufferSource)
/* harmony export */ });
/* harmony import */ var _basesource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./basesource.js */ "./node_modules/geotiff/dist-module/source/basesource.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./node_modules/geotiff/dist-module/utils.js");



class ArrayBufferSource extends _basesource_js__WEBPACK_IMPORTED_MODULE_0__.BaseSource {
  constructor(arrayBuffer) {
    super();
    this.arrayBuffer = arrayBuffer;
  }

  fetchSlice(slice, signal) {
    if (signal && signal.aborted) {
      throw new _utils_js__WEBPACK_IMPORTED_MODULE_1__.AbortError('Request aborted');
    }
    return this.arrayBuffer.slice(slice.offset, slice.offset + slice.length);
  }
}

function makeBufferSource(arrayBuffer) {
  return new ArrayBufferSource(arrayBuffer);
}


/***/ }),

/***/ "./node_modules/geotiff/dist-module/source/basesource.js":
/*!***************************************************************!*\
  !*** ./node_modules/geotiff/dist-module/source/basesource.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseSource: () => (/* binding */ BaseSource)
/* harmony export */ });
/**
 * @typedef Slice
 * @property {number} offset
 * @property {number} length
 */

class BaseSource {
  /**
   *
   * @param {Slice[]} slices
   * @returns {ArrayBuffer[]}
   */
  async fetch(slices, signal = undefined) {
    return Promise.all(
      slices.map((slice) => this.fetchSlice(slice, signal)),
    );
  }

  /**
   *
   * @param {Slice} slice
   * @returns {ArrayBuffer}
   */
  async fetchSlice(slice) {
    throw new Error(`fetching of slice ${slice} not possible, not implemented`);
  }

  /**
   * Returns the filesize if already determined and null otherwise
   */
  get fileSize() {
    return null;
  }

  async close() {
    // no-op by default
  }
}


/***/ }),

/***/ "./node_modules/geotiff/dist-module/source/blockedsource.js":
/*!******************************************************************!*\
  !*** ./node_modules/geotiff/dist-module/source/blockedsource.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BlockedSource: () => (/* binding */ BlockedSource)
/* harmony export */ });
/* harmony import */ var quick_lru__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quick-lru */ "./node_modules/quick-lru/index.js");
/* harmony import */ var _basesource_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./basesource.js */ "./node_modules/geotiff/dist-module/source/basesource.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./node_modules/geotiff/dist-module/utils.js");




class Block {
  /**
   *
   * @param {number} offset
   * @param {number} length
   * @param {ArrayBuffer} [data]
   */
  constructor(offset, length, data = null) {
    this.offset = offset;
    this.length = length;
    this.data = data;
  }

  /**
   * @returns {number} the top byte border
   */
  get top() {
    return this.offset + this.length;
  }
}

class BlockGroup {
  /**
   *
   * @param {number} offset
   * @param {number} length
   * @param {number[]} blockIds
   */
  constructor(offset, length, blockIds) {
    this.offset = offset;
    this.length = length;
    this.blockIds = blockIds;
  }
}

class BlockedSource extends _basesource_js__WEBPACK_IMPORTED_MODULE_1__.BaseSource {
  /**
   *
   * @param {BaseSource} source The underlying source that shall be blocked and cached
   * @param {object} options
   * @param {number} [options.blockSize]
   * @param {number} [options.cacheSize]
   */
  constructor(source, { blockSize = 65536, cacheSize = 100 } = {}) {
    super();
    this.source = source;
    this.blockSize = blockSize;

    this.blockCache = new quick_lru__WEBPACK_IMPORTED_MODULE_0__["default"]({
      maxSize: cacheSize,
      onEviction: (blockId, block) => {
        this.evictedBlocks.set(blockId, block);
      },
    });

    /** @type {Map<number, Block>} */
    this.evictedBlocks = new Map();

    // mapping blockId -> Block instance
    this.blockRequests = new Map();

    // set of blockIds missing for the current requests
    this.blockIdsToFetch = new Set();

    this.abortedBlockIds = new Set();
  }

  get fileSize() {
    return this.source.fileSize;
  }

  /**
   *
   * @param {import("./basesource").Slice[]} slices
   */
  async fetch(slices, signal) {
    const blockRequests = [];
    const missingBlockIds = [];
    const allBlockIds = [];
    this.evictedBlocks.clear();

    for (const { offset, length } of slices) {
      let top = offset + length;

      const { fileSize } = this;
      if (fileSize !== null) {
        top = Math.min(top, fileSize);
      }

      const firstBlockOffset = Math.floor(offset / this.blockSize) * this.blockSize;

      for (let current = firstBlockOffset; current < top; current += this.blockSize) {
        const blockId = Math.floor(current / this.blockSize);
        if (!this.blockCache.has(blockId) && !this.blockRequests.has(blockId)) {
          this.blockIdsToFetch.add(blockId);
          missingBlockIds.push(blockId);
        }
        if (this.blockRequests.has(blockId)) {
          blockRequests.push(this.blockRequests.get(blockId));
        }
        allBlockIds.push(blockId);
      }
    }

    // allow additional block requests to accumulate
    await (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.wait)();
    this.fetchBlocks(signal);

    // Gather all of the new requests that this fetch call is contributing to `fetch`.
    const missingRequests = [];
    for (const blockId of missingBlockIds) {
      // The requested missing block could already be in the cache
      // instead of having its request still be outstanding.
      if (this.blockRequests.has(blockId)) {
        missingRequests.push(this.blockRequests.get(blockId));
      }
    }

    // Actually await all pending requests that are needed for this `fetch`.
    await Promise.allSettled(blockRequests);
    await Promise.allSettled(missingRequests);

    // Perform retries if a block was interrupted by a previous signal
    const abortedBlockRequests = [];
    const abortedBlockIds = allBlockIds
      .filter((id) => this.abortedBlockIds.has(id) || !this.blockCache.has(id));
    abortedBlockIds.forEach((id) => this.blockIdsToFetch.add(id));
    // start the retry of some blocks if required
    if (abortedBlockIds.length > 0 && signal && !signal.aborted) {
      this.fetchBlocks(null);
      for (const blockId of abortedBlockIds) {
        const block = this.blockRequests.get(blockId);
        if (!block) {
          throw new Error(`Block ${blockId} is not in the block requests`);
        }
        abortedBlockRequests.push(block);
      }
      await Promise.allSettled(abortedBlockRequests);
    }

    // throw an  abort error
    if (signal && signal.aborted) {
      throw new _utils_js__WEBPACK_IMPORTED_MODULE_2__.AbortError('Request was aborted');
    }

    const blocks = allBlockIds.map((id) => this.blockCache.get(id) || this.evictedBlocks.get(id));
    const failedBlocks = blocks.filter((i) => !i);
    if (failedBlocks.length) {
      throw new _utils_js__WEBPACK_IMPORTED_MODULE_2__.AggregateError(failedBlocks, 'Request failed');
    }

    // create a final Map, with all required blocks for this request to satisfy
    const requiredBlocks = new Map((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.zip)(allBlockIds, blocks));

    // TODO: satisfy each slice
    return this.readSliceData(slices, requiredBlocks);
  }

  /**
   *
   * @param {AbortSignal} signal
   */
  fetchBlocks(signal) {
    // check if we still need to
    if (this.blockIdsToFetch.size > 0) {
      const groups = this.groupBlocks(this.blockIdsToFetch);

      // start requesting slices of data
      const groupRequests = this.source.fetch(groups, signal);

      for (let groupIndex = 0; groupIndex < groups.length; ++groupIndex) {
        const group = groups[groupIndex];

        for (const blockId of group.blockIds) {
          // make an async IIFE for each block
          this.blockRequests.set(blockId, (async () => {
            try {
              const response = (await groupRequests)[groupIndex];
              const blockOffset = blockId * this.blockSize;
              const o = blockOffset - response.offset;
              const t = Math.min(o + this.blockSize, response.data.byteLength);
              const data = response.data.slice(o, t);
              const block = new Block(
                blockOffset,
                data.byteLength,
                data,
                blockId,
              );
              this.blockCache.set(blockId, block);
              this.abortedBlockIds.delete(blockId);
            } catch (err) {
              if (err.name === 'AbortError') {
                // store the signal here, we need it to determine later if an
                // error was caused by this signal
                err.signal = signal;
                this.blockCache.delete(blockId);
                this.abortedBlockIds.add(blockId);
              } else {
                throw err;
              }
            } finally {
              this.blockRequests.delete(blockId);
            }
          })());
        }
      }
      this.blockIdsToFetch.clear();
    }
  }

  /**
   *
   * @param {Set} blockIds
   * @returns {BlockGroup[]}
   */
  groupBlocks(blockIds) {
    const sortedBlockIds = Array.from(blockIds).sort((a, b) => a - b);
    if (sortedBlockIds.length === 0) {
      return [];
    }
    let current = [];
    let lastBlockId = null;
    const groups = [];

    for (const blockId of sortedBlockIds) {
      if (lastBlockId === null || lastBlockId + 1 === blockId) {
        current.push(blockId);
        lastBlockId = blockId;
      } else {
        groups.push(new BlockGroup(
          current[0] * this.blockSize,
          current.length * this.blockSize,
          current,
        ));
        current = [blockId];
        lastBlockId = blockId;
      }
    }

    groups.push(new BlockGroup(
      current[0] * this.blockSize,
      current.length * this.blockSize,
      current,
    ));

    return groups;
  }

  /**
   *
   * @param {import("./basesource").Slice[]} slices
   * @param {Map} blocks
   */
  readSliceData(slices, blocks) {
    return slices.map((slice) => {
      let top = slice.offset + slice.length;
      if (this.fileSize !== null) {
        top = Math.min(this.fileSize, top);
      }
      const blockIdLow = Math.floor(slice.offset / this.blockSize);
      const blockIdHigh = Math.floor(top / this.blockSize);
      const sliceData = new ArrayBuffer(slice.length);
      const sliceView = new Uint8Array(sliceData);

      for (let blockId = blockIdLow; blockId <= blockIdHigh; ++blockId) {
        const block = blocks.get(blockId);
        const delta = block.offset - slice.offset;
        const topDelta = block.top - top;
        let blockInnerOffset = 0;
        let rangeInnerOffset = 0;
        let usedBlockLength;

        if (delta < 0) {
          blockInnerOffset = -delta;
        } else if (delta > 0) {
          rangeInnerOffset = delta;
        }

        if (topDelta < 0) {
          usedBlockLength = block.length - blockInnerOffset;
        } else {
          usedBlockLength = top - block.offset - blockInnerOffset;
        }

        const blockView = new Uint8Array(block.data, blockInnerOffset, usedBlockLength);
        sliceView.set(blockView, rangeInnerOffset);
      }

      return sliceData;
    });
  }
}


/***/ }),

/***/ "./node_modules/geotiff/dist-module/source/client/base.js":
/*!****************************************************************!*\
  !*** ./node_modules/geotiff/dist-module/source/client/base.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseClient: () => (/* binding */ BaseClient),
/* harmony export */   BaseResponse: () => (/* binding */ BaseResponse)
/* harmony export */ });
class BaseResponse {
  /**
   * Returns whether the response has an ok'ish status code
   */
  get ok() {
    return this.status >= 200 && this.status <= 299;
  }

  /**
   * Returns the status code of the response
   */
  get status() {
    throw new Error('not implemented');
  }

  /**
   * Returns the value of the specified header
   * @param {string} headerName the header name
   * @returns {string} the header value
   */
  getHeader(headerName) { // eslint-disable-line no-unused-vars
    throw new Error('not implemented');
  }

  /**
   * @returns {ArrayBuffer} the response data of the request
   */
  async getData() {
    throw new Error('not implemented');
  }
}

class BaseClient {
  constructor(url) {
    this.url = url;
  }

  /**
   * Send a request with the options
   * @param {{headers: HeadersInit, signal: AbortSignal}} [options={}]
   * @returns {Promise<BaseResponse>}
   */
  async request({ headers, signal } = {}) { // eslint-disable-line no-unused-vars
    throw new Error('request is not implemented');
  }
}


/***/ }),

/***/ "./node_modules/geotiff/dist-module/source/client/fetch.js":
/*!*****************************************************************!*\
  !*** ./node_modules/geotiff/dist-module/source/client/fetch.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FetchClient: () => (/* binding */ FetchClient)
/* harmony export */ });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ "./node_modules/geotiff/dist-module/source/client/base.js");


class FetchResponse extends _base_js__WEBPACK_IMPORTED_MODULE_0__.BaseResponse {
  /**
   * BaseResponse facade for fetch API Response
   * @param {Response} response
   */
  constructor(response) {
    super();
    this.response = response;
  }

  get status() {
    return this.response.status;
  }

  getHeader(name) {
    return this.response.headers.get(name);
  }

  async getData() {
    const data = this.response.arrayBuffer
      ? await this.response.arrayBuffer()
      : (await this.response.buffer()).buffer;
    return data;
  }
}

class FetchClient extends _base_js__WEBPACK_IMPORTED_MODULE_0__.BaseClient {
  constructor(url, credentials) {
    super(url);
    this.credentials = credentials;
  }

  /**
   * @param {{headers: HeadersInit, signal: AbortSignal}} [options={}]
   * @returns {Promise<FetchResponse>}
   */
  async request({ headers, signal } = {}) {
    const response = await fetch(this.url, {
      headers, credentials: this.credentials, signal,
    });
    return new FetchResponse(response);
  }
}


/***/ }),

/***/ "./node_modules/geotiff/dist-module/source/client/http.js":
/*!****************************************************************!*\
  !*** ./node_modules/geotiff/dist-module/source/client/http.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HttpClient: () => (/* binding */ HttpClient)
/* harmony export */ });
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ "?cdec");
/* harmony import */ var https__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! https */ "?753a");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url */ "?4e4d");
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base.js */ "./node_modules/geotiff/dist-module/source/client/base.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils.js */ "./node_modules/geotiff/dist-module/utils.js");







class HttpResponse extends _base_js__WEBPACK_IMPORTED_MODULE_3__.BaseResponse {
  /**
   * BaseResponse facade for node HTTP/HTTPS API Response
   * @param {http.ServerResponse} response
   */
  constructor(response, dataPromise) {
    super();
    this.response = response;
    this.dataPromise = dataPromise;
  }

  get status() {
    return this.response.statusCode;
  }

  getHeader(name) {
    return this.response.headers[name];
  }

  async getData() {
    const data = await this.dataPromise;
    return data;
  }
}

class HttpClient extends _base_js__WEBPACK_IMPORTED_MODULE_3__.BaseClient {
  constructor(url) {
    super(url);
    this.parsedUrl = url__WEBPACK_IMPORTED_MODULE_2__.parse(this.url);
    this.httpApi = (this.parsedUrl.protocol === 'http:' ? http__WEBPACK_IMPORTED_MODULE_0__ : https__WEBPACK_IMPORTED_MODULE_1__);
  }

  constructRequest(headers, signal) {
    return new Promise((resolve, reject) => {
      const request = this.httpApi.get(
        {
          ...this.parsedUrl,
          headers,
        },
        (response) => {
          const dataPromise = new Promise((resolveData) => {
            const chunks = [];

            // collect chunks
            response.on('data', (chunk) => {
              chunks.push(chunk);
            });

            // concatenate all chunks and resolve the promise with the resulting buffer
            response.on('end', () => {
              const data = Buffer.concat(chunks).buffer;
              resolveData(data);
            });
            response.on('error', reject);
          });
          resolve(new HttpResponse(response, dataPromise));
        },
      );
      request.on('error', reject);

      if (signal) {
        if (signal.aborted) {
          request.destroy(new _utils_js__WEBPACK_IMPORTED_MODULE_4__.AbortError('Request aborted'));
        }
        signal.addEventListener('abort', () => request.destroy(new _utils_js__WEBPACK_IMPORTED_MODULE_4__.AbortError('Request aborted')));
      }
    });
  }

  async request({ headers, signal } = {}) {
    const response = await this.constructRequest(headers, signal);
    return response;
  }
}


/***/ }),

/***/ "./node_modules/geotiff/dist-module/source/client/xhr.js":
/*!***************************************************************!*\
  !*** ./node_modules/geotiff/dist-module/source/client/xhr.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   XHRClient: () => (/* binding */ XHRClient)
/* harmony export */ });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ "./node_modules/geotiff/dist-module/source/client/base.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils.js */ "./node_modules/geotiff/dist-module/utils.js");



class XHRResponse extends _base_js__WEBPACK_IMPORTED_MODULE_0__.BaseResponse {
  /**
   * BaseResponse facade for XMLHttpRequest
   * @param {XMLHttpRequest} xhr
   * @param {ArrayBuffer} data
   */
  constructor(xhr, data) {
    super();
    this.xhr = xhr;
    this.data = data;
  }

  get status() {
    return this.xhr.status;
  }

  getHeader(name) {
    return this.xhr.getResponseHeader(name);
  }

  async getData() {
    return this.data;
  }
}

class XHRClient extends _base_js__WEBPACK_IMPORTED_MODULE_0__.BaseClient {
  constructRequest(headers, signal) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', this.url);
      xhr.responseType = 'arraybuffer';
      for (const [key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value);
      }

      // hook signals
      xhr.onload = () => {
        const data = xhr.response;
        resolve(new XHRResponse(xhr, data));
      };
      xhr.onerror = reject;
      xhr.onabort = () => reject(new _utils_js__WEBPACK_IMPORTED_MODULE_1__.AbortError('Request aborted'));
      xhr.send();

      if (signal) {
        if (signal.aborted) {
          xhr.abort();
        }
        signal.addEventListener('abort', () => xhr.abort());
      }
    });
  }

  async request({ headers, signal } = {}) {
    const response = await this.constructRequest(headers, signal);
    return response;
  }
}


/***/ }),

/***/ "./node_modules/geotiff/dist-module/source/file.js":
/*!*********************************************************!*\
  !*** ./node_modules/geotiff/dist-module/source/file.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   makeFileSource: () => (/* binding */ makeFileSource)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "?662e");
/* harmony import */ var _basesource_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./basesource.js */ "./node_modules/geotiff/dist-module/source/basesource.js");



function closeAsync(fd) {
  return new Promise((resolve, reject) => {
    fs__WEBPACK_IMPORTED_MODULE_0__.close(fd, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function openAsync(path, flags, mode = undefined) {
  return new Promise((resolve, reject) => {
    fs__WEBPACK_IMPORTED_MODULE_0__.open(path, flags, mode, (err, fd) => {
      if (err) {
        reject(err);
      } else {
        resolve(fd);
      }
    });
  });
}

function readAsync(...args) {
  return new Promise((resolve, reject) => {
    fs__WEBPACK_IMPORTED_MODULE_0__.read(...args, (err, bytesRead, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve({ bytesRead, buffer });
      }
    });
  });
}

class FileSource extends _basesource_js__WEBPACK_IMPORTED_MODULE_1__.BaseSource {
  constructor(path) {
    super();
    this.path = path;
    this.openRequest = openAsync(path, 'r');
  }

  async fetchSlice(slice) {
    // TODO: use `signal`
    const fd = await this.openRequest;
    const { buffer } = await readAsync(
      fd,
      Buffer.alloc(slice.length),
      0,
      slice.length,
      slice.offset,
    );
    return buffer.buffer;
  }

  async close() {
    const fd = await this.openRequest;
    await closeAsync(fd);
  }
}

function makeFileSource(path) {
  return new FileSource(path);
}


/***/ }),

/***/ "./node_modules/geotiff/dist-module/source/filereader.js":
/*!***************************************************************!*\
  !*** ./node_modules/geotiff/dist-module/source/filereader.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   makeFileReaderSource: () => (/* binding */ makeFileReaderSource)
/* harmony export */ });
/* harmony import */ var _basesource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./basesource.js */ "./node_modules/geotiff/dist-module/source/basesource.js");


class FileReaderSource extends _basesource_js__WEBPACK_IMPORTED_MODULE_0__.BaseSource {
  constructor(file) {
    super();
    this.file = file;
  }

  async fetchSlice(slice, signal) {
    return new Promise((resolve, reject) => {
      const blob = this.file.slice(slice.offset, slice.offset + slice.length);
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = reject;
      reader.onabort = reject;
      reader.readAsArrayBuffer(blob);

      if (signal) {
        signal.addEventListener('abort', () => reader.abort());
      }
    });
  }
}

/**
 * Create a new source from a given file/blob.
 * @param {Blob} file The file or blob to read from.
 * @returns The constructed source
 */
function makeFileReaderSource(file) {
  return new FileReaderSource(file);
}


/***/ }),

/***/ "./node_modules/geotiff/dist-module/source/httputils.js":
/*!**************************************************************!*\
  !*** ./node_modules/geotiff/dist-module/source/httputils.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseByteRanges: () => (/* binding */ parseByteRanges),
/* harmony export */   parseContentRange: () => (/* binding */ parseContentRange),
/* harmony export */   parseContentType: () => (/* binding */ parseContentType)
/* harmony export */ });
const CRLFCRLF = '\r\n\r\n';

/*
 * Shim for 'Object.fromEntries'
 */
function itemsToObject(items) {
  if (typeof Object.fromEntries !== 'undefined') {
    return Object.fromEntries(items);
  }
  const obj = {};
  for (const [key, value] of items) {
    obj[key.toLowerCase()] = value;
  }
  return obj;
}

/**
 * Parse HTTP headers from a given string.
 * @param {String} text the text to parse the headers from
 * @returns {Object} the parsed headers with lowercase keys
 */
function parseHeaders(text) {
  const items = text
    .split('\r\n')
    .map((line) => {
      const kv = line.split(':').map((str) => str.trim());
      kv[0] = kv[0].toLowerCase();
      return kv;
    });

  return itemsToObject(items);
}

/**
 * Parse a 'Content-Type' header value to the content-type and parameters
 * @param {String} rawContentType the raw string to parse from
 * @returns {Object} the parsed content type with the fields: type and params
 */
function parseContentType(rawContentType) {
  const [type, ...rawParams] = rawContentType.split(';').map((s) => s.trim());
  const paramsItems = rawParams.map((param) => param.split('='));
  return { type, params: itemsToObject(paramsItems) };
}

/**
 * Parse a 'Content-Range' header value to its start, end, and total parts
 * @param {String} rawContentRange the raw string to parse from
 * @returns {Object} the parsed parts
 */
function parseContentRange(rawContentRange) {
  let start;
  let end;
  let total;

  if (rawContentRange) {
    [, start, end, total] = rawContentRange.match(/bytes (\d+)-(\d+)\/(\d+)/);
    start = parseInt(start, 10);
    end = parseInt(end, 10);
    total = parseInt(total, 10);
  }

  return { start, end, total };
}

/**
 * Parses a list of byteranges from the given 'multipart/byteranges' HTTP response.
 * Each item in the list has the following properties:
 * - headers: the HTTP headers
 * - data: the sliced ArrayBuffer for that specific part
 * - offset: the offset of the byterange within its originating file
 * - length: the length of the byterange
 * @param {ArrayBuffer} responseArrayBuffer the response to be parsed and split
 * @param {String} boundary the boundary string used to split the sections
 * @returns {Object[]} the parsed byteranges
 */
function parseByteRanges(responseArrayBuffer, boundary) {
  let offset = null;
  const decoder = new TextDecoder('ascii');
  const out = [];

  const startBoundary = `--${boundary}`;
  const endBoundary = `${startBoundary}--`;

  // search for the initial boundary, may be offset by some bytes
  // TODO: more efficient to check for `--` in bytes directly
  for (let i = 0; i < 10; ++i) {
    const text = decoder.decode(
      new Uint8Array(responseArrayBuffer, i, startBoundary.length),
    );
    if (text === startBoundary) {
      offset = i;
    }
  }

  if (offset === null) {
    throw new Error('Could not find initial boundary');
  }

  while (offset < responseArrayBuffer.byteLength) {
    const text = decoder.decode(
      new Uint8Array(responseArrayBuffer, offset,
        Math.min(startBoundary.length + 1024, responseArrayBuffer.byteLength - offset),
      ),
    );

    // break if we arrived at the end
    if (text.length === 0 || text.startsWith(endBoundary)) {
      break;
    }

    // assert that we are actually dealing with a byterange and are at the correct offset
    if (!text.startsWith(startBoundary)) {
      throw new Error('Part does not start with boundary');
    }

    // get a substring from where we read the headers
    const innerText = text.substr(startBoundary.length + 2);

    if (innerText.length === 0) {
      break;
    }

    // find the double linebreak that denotes the end of the headers
    const endOfHeaders = innerText.indexOf(CRLFCRLF);

    // parse the headers to get the content range size
    const headers = parseHeaders(innerText.substr(0, endOfHeaders));
    const { start, end, total } = parseContentRange(headers['content-range']);

    // calculate the length of the slice and the next offset
    const startOfData = offset + startBoundary.length + endOfHeaders + CRLFCRLF.length;
    const length = parseInt(end, 10) + 1 - parseInt(start, 10);
    out.push({
      headers,
      data: responseArrayBuffer.slice(startOfData, startOfData + length),
      offset: start,
      length,
      fileSize: total,
    });

    offset = startOfData + length + 4;
  }

  return out;
}


/***/ }),

/***/ "./node_modules/geotiff/dist-module/source/remote.js":
/*!***********************************************************!*\
  !*** ./node_modules/geotiff/dist-module/source/remote.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   makeCustomSource: () => (/* binding */ makeCustomSource),
/* harmony export */   makeFetchSource: () => (/* binding */ makeFetchSource),
/* harmony export */   makeHttpSource: () => (/* binding */ makeHttpSource),
/* harmony export */   makeRemoteSource: () => (/* binding */ makeRemoteSource),
/* harmony export */   makeXHRSource: () => (/* binding */ makeXHRSource)
/* harmony export */ });
/* harmony import */ var _httputils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./httputils.js */ "./node_modules/geotiff/dist-module/source/httputils.js");
/* harmony import */ var _basesource_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./basesource.js */ "./node_modules/geotiff/dist-module/source/basesource.js");
/* harmony import */ var _blockedsource_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blockedsource.js */ "./node_modules/geotiff/dist-module/source/blockedsource.js");
/* harmony import */ var _client_fetch_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./client/fetch.js */ "./node_modules/geotiff/dist-module/source/client/fetch.js");
/* harmony import */ var _client_xhr_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./client/xhr.js */ "./node_modules/geotiff/dist-module/source/client/xhr.js");
/* harmony import */ var _client_http_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./client/http.js */ "./node_modules/geotiff/dist-module/source/client/http.js");








class RemoteSource extends _basesource_js__WEBPACK_IMPORTED_MODULE_1__.BaseSource {
  /**
   *
   * @param {BaseClient} client
   * @param {object} headers
   * @param {numbers} maxRanges
   * @param {boolean} allowFullFile
   */
  constructor(client, headers, maxRanges, allowFullFile) {
    super();
    this.client = client;
    this.headers = headers;
    this.maxRanges = maxRanges;
    this.allowFullFile = allowFullFile;
    this._fileSize = null;
  }

  /**
   *
   * @param {Slice[]} slices
   */
  async fetch(slices, signal) {
    // if we allow multi-ranges, split the incoming request into that many sub-requests
    // and join them afterwards
    if (this.maxRanges >= slices.length) {
      return this.fetchSlices(slices, signal);
    } else if (this.maxRanges > 0 && slices.length > 1) {
      // TODO: split into multiple multi-range requests

      // const subSlicesRequests = [];
      // for (let i = 0; i < slices.length; i += this.maxRanges) {
      //   subSlicesRequests.push(
      //     this.fetchSlices(slices.slice(i, i + this.maxRanges), signal),
      //   );
      // }
      // return (await Promise.all(subSlicesRequests)).flat();
    }

    // otherwise make a single request for each slice
    return Promise.all(
      slices.map((slice) => this.fetchSlice(slice, signal)),
    );
  }

  async fetchSlices(slices, signal) {
    const response = await this.client.request({
      headers: {
        ...this.headers,
        Range: `bytes=${slices
          .map(({ offset, length }) => `${offset}-${offset + length}`)
          .join(',')
        }`,
      },
      signal,
    });

    if (!response.ok) {
      throw new Error('Error fetching data.');
    } else if (response.status === 206) {
      const { type, params } = (0,_httputils_js__WEBPACK_IMPORTED_MODULE_0__.parseContentType)(response.getHeader('content-type'));
      if (type === 'multipart/byteranges') {
        const byteRanges = (0,_httputils_js__WEBPACK_IMPORTED_MODULE_0__.parseByteRanges)(await response.getData(), params.boundary);
        this._fileSize = byteRanges[0].fileSize || null;
        return byteRanges;
      }

      const data = await response.getData();

      const { start, end, total } = (0,_httputils_js__WEBPACK_IMPORTED_MODULE_0__.parseContentRange)(response.getHeader('content-range'));
      this._fileSize = total || null;
      const first = [{
        data,
        offset: start,
        length: end - start,
      }];

      if (slices.length > 1) {
        // we requested more than one slice, but got only the first
        // unfortunately, some HTTP Servers don't support multi-ranges
        // and return only the first

        // get the rest of the slices and fetch them iteratively
        const others = await Promise.all(slices.slice(1).map((slice) => this.fetchSlice(slice, signal)));
        return first.concat(others);
      }
      return first;
    } else {
      if (!this.allowFullFile) {
        throw new Error('Server responded with full file');
      }
      const data = await response.getData();
      this._fileSize = data.byteLength;
      return [{
        data,
        offset: 0,
        length: data.byteLength,
      }];
    }
  }

  async fetchSlice(slice, signal) {
    const { offset, length } = slice;
    const response = await this.client.request({
      headers: {
        ...this.headers,
        Range: `bytes=${offset}-${offset + length}`,
      },
      signal,
    });

    // check the response was okay and if the server actually understands range requests
    if (!response.ok) {
      throw new Error('Error fetching data.');
    } else if (response.status === 206) {
      const data = await response.getData();

      const { total } = (0,_httputils_js__WEBPACK_IMPORTED_MODULE_0__.parseContentRange)(response.getHeader('content-range'));
      this._fileSize = total || null;
      return {
        data,
        offset,
        length,
      };
    } else {
      if (!this.allowFullFile) {
        throw new Error('Server responded with full file');
      }

      const data = await response.getData();

      this._fileSize = data.byteLength;
      return {
        data,
        offset: 0,
        length: data.byteLength,
      };
    }
  }

  get fileSize() {
    return this._fileSize;
  }
}

function maybeWrapInBlockedSource(source, { blockSize, cacheSize }) {
  if (blockSize === null) {
    return source;
  }
  return new _blockedsource_js__WEBPACK_IMPORTED_MODULE_2__.BlockedSource(source, { blockSize, cacheSize });
}

function makeFetchSource(url, { headers = {}, credentials, maxRanges = 0, allowFullFile = false, ...blockOptions } = {}) {
  const client = new _client_fetch_js__WEBPACK_IMPORTED_MODULE_3__.FetchClient(url, credentials);
  const source = new RemoteSource(client, headers, maxRanges, allowFullFile);
  return maybeWrapInBlockedSource(source, blockOptions);
}

function makeXHRSource(url, { headers = {}, maxRanges = 0, allowFullFile = false, ...blockOptions } = {}) {
  const client = new _client_xhr_js__WEBPACK_IMPORTED_MODULE_4__.XHRClient(url);
  const source = new RemoteSource(client, headers, maxRanges, allowFullFile);
  return maybeWrapInBlockedSource(source, blockOptions);
}

function makeHttpSource(url, { headers = {}, maxRanges = 0, allowFullFile = false, ...blockOptions } = {}) {
  const client = new _client_http_js__WEBPACK_IMPORTED_MODULE_5__.HttpClient(url);
  const source = new RemoteSource(client, headers, maxRanges, allowFullFile);
  return maybeWrapInBlockedSource(source, blockOptions);
}

function makeCustomSource(client, { headers = {}, maxRanges = 0, allowFullFile = false, ...blockOptions } = {}) {
  const source = new RemoteSource(client, headers, maxRanges, allowFullFile);
  return maybeWrapInBlockedSource(source, blockOptions);
}

/**
 *
 * @param {string} url
 * @param {object} options
 */
function makeRemoteSource(url, { forceXHR = false, ...clientOptions } = {}) {
  if (typeof fetch === 'function' && !forceXHR) {
    return makeFetchSource(url, clientOptions);
  }
  if (typeof XMLHttpRequest !== 'undefined') {
    return makeXHRSource(url, clientOptions);
  }
  return makeHttpSource(url, clientOptions);
}


/***/ }),

/***/ "./node_modules/geotiff/dist-module/utils.js":
/*!***************************************************!*\
  !*** ./node_modules/geotiff/dist-module/utils.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbortError: () => (/* binding */ AbortError),
/* harmony export */   AggregateError: () => (/* binding */ AggregateError),
/* harmony export */   CustomAggregateError: () => (/* binding */ CustomAggregateError),
/* harmony export */   assign: () => (/* binding */ assign),
/* harmony export */   chunk: () => (/* binding */ chunk),
/* harmony export */   endsWith: () => (/* binding */ endsWith),
/* harmony export */   forEach: () => (/* binding */ forEach),
/* harmony export */   invert: () => (/* binding */ invert),
/* harmony export */   isTypedFloatArray: () => (/* binding */ isTypedFloatArray),
/* harmony export */   isTypedIntArray: () => (/* binding */ isTypedIntArray),
/* harmony export */   isTypedUintArray: () => (/* binding */ isTypedUintArray),
/* harmony export */   parseContentRange: () => (/* binding */ parseContentRange),
/* harmony export */   range: () => (/* binding */ range),
/* harmony export */   times: () => (/* binding */ times),
/* harmony export */   toArray: () => (/* binding */ toArray),
/* harmony export */   toArrayRecursively: () => (/* binding */ toArrayRecursively),
/* harmony export */   typeMap: () => (/* binding */ typeMap),
/* harmony export */   wait: () => (/* binding */ wait),
/* harmony export */   zip: () => (/* binding */ zip)
/* harmony export */ });
function assign(target, source) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = source[key];
    }
  }
}

function chunk(iterable, length) {
  const results = [];
  const lengthOfIterable = iterable.length;
  for (let i = 0; i < lengthOfIterable; i += length) {
    const chunked = [];
    for (let ci = i; ci < i + length; ci++) {
      chunked.push(iterable[ci]);
    }
    results.push(chunked);
  }
  return results;
}

function endsWith(string, expectedEnding) {
  if (string.length < expectedEnding.length) {
    return false;
  }
  const actualEnding = string.substr(string.length - expectedEnding.length);
  return actualEnding === expectedEnding;
}

function forEach(iterable, func) {
  const { length } = iterable;
  for (let i = 0; i < length; i++) {
    func(iterable[i], i);
  }
}

function invert(oldObj) {
  const newObj = {};
  for (const key in oldObj) {
    if (oldObj.hasOwnProperty(key)) {
      const value = oldObj[key];
      newObj[value] = key;
    }
  }
  return newObj;
}

function range(n) {
  const results = [];
  for (let i = 0; i < n; i++) {
    results.push(i);
  }
  return results;
}

function times(numTimes, func) {
  const results = [];
  for (let i = 0; i < numTimes; i++) {
    results.push(func(i));
  }
  return results;
}

function toArray(iterable) {
  const results = [];
  const { length } = iterable;
  for (let i = 0; i < length; i++) {
    results.push(iterable[i]);
  }
  return results;
}

function toArrayRecursively(input) {
  if (input.length) {
    return toArray(input).map(toArrayRecursively);
  }
  return input;
}

// copied from https://github.com/academia-de-codigo/parse-content-range-header/blob/master/index.js
function parseContentRange(headerValue) {
  if (!headerValue) {
    return null;
  }

  if (typeof headerValue !== 'string') {
    throw new Error('invalid argument');
  }

  const parseInt = (number) => Number.parseInt(number, 10);

  // Check for presence of unit
  let matches = headerValue.match(/^(\w*) /);
  const unit = matches && matches[1];

  // check for start-end/size header format
  matches = headerValue.match(/(\d+)-(\d+)\/(\d+|\*)/);
  if (matches) {
    return {
      unit,
      first: parseInt(matches[1]),
      last: parseInt(matches[2]),
      length: matches[3] === '*' ? null : parseInt(matches[3]),
    };
  }

  // check for size header format
  matches = headerValue.match(/(\d+|\*)/);
  if (matches) {
    return {
      unit,
      first: null,
      last: null,
      length: matches[1] === '*' ? null : parseInt(matches[1]),
    };
  }

  return null;
}

/*
 * Promisified wrapper around 'setTimeout' to allow 'await'
 */
async function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function zip(a, b) {
  const A = Array.isArray(a) ? a : Array.from(a);
  const B = Array.isArray(b) ? b : Array.from(b);
  return A.map((k, i) => [k, B[i]]);
}

// Based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
class AbortError extends Error {
  constructor(params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AbortError);
    }

    this.name = 'AbortError';
  }
}

class CustomAggregateError extends Error {
  constructor(errors, message) {
    super(message);
    this.errors = errors;
    this.message = message;
    this.name = 'AggregateError';
  }
}

const AggregateError = CustomAggregateError;

function isTypedFloatArray(input) {
  if (ArrayBuffer.isView(input)) {
    const ctr = input.constructor;
    if (ctr === Float32Array || ctr === Float64Array) {
      return true;
    }
  }
  return false;
}

function isTypedIntArray(input) {
  if (ArrayBuffer.isView(input)) {
    const ctr = input.constructor;
    if (ctr === Int8Array || ctr === Int16Array || ctr === Int32Array) {
      return true;
    }
  }
  return false;
}

function isTypedUintArray(input) {
  if (ArrayBuffer.isView(input)) {
    const ctr = input.constructor;
    if (ctr === Uint8Array || ctr === Uint16Array || ctr === Uint32Array || ctr === Uint8ClampedArray) {
      return true;
    }
  }
  return false;
}

const typeMap = {
  Float64Array,
  Float32Array,
  Uint32Array,
  Uint16Array,
  Uint8Array,
};


/***/ }),

/***/ "./node_modules/geotiff/dist-module/worker/create.js":
/*!***********************************************************!*\
  !*** ./node_modules/geotiff/dist-module/worker/create.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ create)
/* harmony export */ });
/* harmony import */ var web_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web-worker */ "./node_modules/web-worker/src/browser/index.js");


function create() {
  const source = "function A(A,I,g){return I in A?Object.defineProperty(A,I,{value:g,enumerable:!0,configurable:!0,writable:!0}):A[I]=g,A}function I(A,I){if(null==A)return{};var g,B,C=function(A,I){if(null==A)return{};var g,B,C={},Q=Object.keys(A);for(B=0;B<Q.length;B++)g=Q[B],I.indexOf(g)>=0||(C[g]=A[g]);return C}(A,I);if(Object.getOwnPropertySymbols){var Q=Object.getOwnPropertySymbols(A);for(B=0;B<Q.length;B++)g=Q[B],I.indexOf(g)>=0||Object.prototype.propertyIsEnumerable.call(A,g)&&(C[g]=A[g])}return C}function g(A,I,g,B,C,Q,E){try{var i=A[Q](E),o=i.value}catch(A){return void g(A)}i.done?I(o):Promise.resolve(o).then(B,C)}function B(A){return function(){var I=this,B=arguments;return new Promise((function(C,Q){var E=A.apply(I,B);function i(A){g(E,C,Q,i,o,\"next\",A)}function o(A){g(E,C,Q,i,o,\"throw\",A)}i(void 0)}))}}function C(A){return C=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(A){return typeof A}:function(A){return A&&\"function\"==typeof Symbol&&A.constructor===Symbol&&A!==Symbol.prototype?\"symbol\":typeof A},C(A)}var Q={exports:{}};!function(A){var I=function(A){var I,g=Object.prototype,B=g.hasOwnProperty,Q=\"function\"==typeof Symbol?Symbol:{},E=Q.iterator||\"@@iterator\",i=Q.asyncIterator||\"@@asyncIterator\",o=Q.toStringTag||\"@@toStringTag\";function e(A,I,g){return Object.defineProperty(A,I,{value:g,enumerable:!0,configurable:!0,writable:!0}),A[I]}try{e({},\"\")}catch(A){e=function(A,I,g){return A[I]=g}}function t(A,I,g,B){var C=I&&I.prototype instanceof h?I:h,Q=Object.create(C.prototype),E=new u(B||[]);return Q._invoke=function(A,I,g){var B=r;return function(C,Q){if(B===n)throw new Error(\"Generator is already running\");if(B===D){if(\"throw\"===C)throw Q;return d()}for(g.method=C,g.arg=Q;;){var E=g.delegate;if(E){var i=R(E,g);if(i){if(i===w)continue;return i}}if(\"next\"===g.method)g.sent=g._sent=g.arg;else if(\"throw\"===g.method){if(B===r)throw B=D,g.arg;g.dispatchException(g.arg)}else\"return\"===g.method&&g.abrupt(\"return\",g.arg);B=n;var o=a(A,I,g);if(\"normal\"===o.type){if(B=g.done?D:s,o.arg===w)continue;return{value:o.arg,done:g.done}}\"throw\"===o.type&&(B=D,g.method=\"throw\",g.arg=o.arg)}}}(A,g,E),Q}function a(A,I,g){try{return{type:\"normal\",arg:A.call(I,g)}}catch(A){return{type:\"throw\",arg:A}}}A.wrap=t;var r=\"suspendedStart\",s=\"suspendedYield\",n=\"executing\",D=\"completed\",w={};function h(){}function y(){}function c(){}var G={};e(G,E,(function(){return this}));var S=Object.getPrototypeOf,N=S&&S(S(Y([])));N&&N!==g&&B.call(N,E)&&(G=N);var F=c.prototype=h.prototype=Object.create(G);function f(A){[\"next\",\"throw\",\"return\"].forEach((function(I){e(A,I,(function(A){return this._invoke(I,A)}))}))}function k(A,I){function g(Q,E,i,o){var e=a(A[Q],A,E);if(\"throw\"!==e.type){var t=e.arg,r=t.value;return r&&\"object\"===C(r)&&B.call(r,\"__await\")?I.resolve(r.__await).then((function(A){g(\"next\",A,i,o)}),(function(A){g(\"throw\",A,i,o)})):I.resolve(r).then((function(A){t.value=A,i(t)}),(function(A){return g(\"throw\",A,i,o)}))}o(e.arg)}var Q;this._invoke=function(A,B){function C(){return new I((function(I,C){g(A,B,I,C)}))}return Q=Q?Q.then(C,C):C()}}function R(A,g){var B=A.iterator[g.method];if(B===I){if(g.delegate=null,\"throw\"===g.method){if(A.iterator.return&&(g.method=\"return\",g.arg=I,R(A,g),\"throw\"===g.method))return w;g.method=\"throw\",g.arg=new TypeError(\"The iterator does not provide a 'throw' method\")}return w}var C=a(B,A.iterator,g.arg);if(\"throw\"===C.type)return g.method=\"throw\",g.arg=C.arg,g.delegate=null,w;var Q=C.arg;return Q?Q.done?(g[A.resultName]=Q.value,g.next=A.nextLoc,\"return\"!==g.method&&(g.method=\"next\",g.arg=I),g.delegate=null,w):Q:(g.method=\"throw\",g.arg=new TypeError(\"iterator result is not an object\"),g.delegate=null,w)}function L(A){var I={tryLoc:A[0]};1 in A&&(I.catchLoc=A[1]),2 in A&&(I.finallyLoc=A[2],I.afterLoc=A[3]),this.tryEntries.push(I)}function U(A){var I=A.completion||{};I.type=\"normal\",delete I.arg,A.completion=I}function u(A){this.tryEntries=[{tryLoc:\"root\"}],A.forEach(L,this),this.reset(!0)}function Y(A){if(A){var g=A[E];if(g)return g.call(A);if(\"function\"==typeof A.next)return A;if(!isNaN(A.length)){var C=-1,Q=function g(){for(;++C<A.length;)if(B.call(A,C))return g.value=A[C],g.done=!1,g;return g.value=I,g.done=!0,g};return Q.next=Q}}return{next:d}}function d(){return{value:I,done:!0}}return y.prototype=c,e(F,\"constructor\",c),e(c,\"constructor\",y),y.displayName=e(c,o,\"GeneratorFunction\"),A.isGeneratorFunction=function(A){var I=\"function\"==typeof A&&A.constructor;return!!I&&(I===y||\"GeneratorFunction\"===(I.displayName||I.name))},A.mark=function(A){return Object.setPrototypeOf?Object.setPrototypeOf(A,c):(A.__proto__=c,e(A,o,\"GeneratorFunction\")),A.prototype=Object.create(F),A},A.awrap=function(A){return{__await:A}},f(k.prototype),e(k.prototype,i,(function(){return this})),A.AsyncIterator=k,A.async=function(I,g,B,C,Q){void 0===Q&&(Q=Promise);var E=new k(t(I,g,B,C),Q);return A.isGeneratorFunction(g)?E:E.next().then((function(A){return A.done?A.value:E.next()}))},f(F),e(F,o,\"Generator\"),e(F,E,(function(){return this})),e(F,\"toString\",(function(){return\"[object Generator]\"})),A.keys=function(A){var I=[];for(var g in A)I.push(g);return I.reverse(),function g(){for(;I.length;){var B=I.pop();if(B in A)return g.value=B,g.done=!1,g}return g.done=!0,g}},A.values=Y,u.prototype={constructor:u,reset:function(A){if(this.prev=0,this.next=0,this.sent=this._sent=I,this.done=!1,this.delegate=null,this.method=\"next\",this.arg=I,this.tryEntries.forEach(U),!A)for(var g in this)\"t\"===g.charAt(0)&&B.call(this,g)&&!isNaN(+g.slice(1))&&(this[g]=I)},stop:function(){this.done=!0;var A=this.tryEntries[0].completion;if(\"throw\"===A.type)throw A.arg;return this.rval},dispatchException:function(A){if(this.done)throw A;var g=this;function C(B,C){return i.type=\"throw\",i.arg=A,g.next=B,C&&(g.method=\"next\",g.arg=I),!!C}for(var Q=this.tryEntries.length-1;Q>=0;--Q){var E=this.tryEntries[Q],i=E.completion;if(\"root\"===E.tryLoc)return C(\"end\");if(E.tryLoc<=this.prev){var o=B.call(E,\"catchLoc\"),e=B.call(E,\"finallyLoc\");if(o&&e){if(this.prev<E.catchLoc)return C(E.catchLoc,!0);if(this.prev<E.finallyLoc)return C(E.finallyLoc)}else if(o){if(this.prev<E.catchLoc)return C(E.catchLoc,!0)}else{if(!e)throw new Error(\"try statement without catch or finally\");if(this.prev<E.finallyLoc)return C(E.finallyLoc)}}}},abrupt:function(A,I){for(var g=this.tryEntries.length-1;g>=0;--g){var C=this.tryEntries[g];if(C.tryLoc<=this.prev&&B.call(C,\"finallyLoc\")&&this.prev<C.finallyLoc){var Q=C;break}}Q&&(\"break\"===A||\"continue\"===A)&&Q.tryLoc<=I&&I<=Q.finallyLoc&&(Q=null);var E=Q?Q.completion:{};return E.type=A,E.arg=I,Q?(this.method=\"next\",this.next=Q.finallyLoc,w):this.complete(E)},complete:function(A,I){if(\"throw\"===A.type)throw A.arg;return\"break\"===A.type||\"continue\"===A.type?this.next=A.arg:\"return\"===A.type?(this.rval=this.arg=A.arg,this.method=\"return\",this.next=\"end\"):\"normal\"===A.type&&I&&(this.next=I),w},finish:function(A){for(var I=this.tryEntries.length-1;I>=0;--I){var g=this.tryEntries[I];if(g.finallyLoc===A)return this.complete(g.completion,g.afterLoc),U(g),w}},catch:function(A){for(var I=this.tryEntries.length-1;I>=0;--I){var g=this.tryEntries[I];if(g.tryLoc===A){var B=g.completion;if(\"throw\"===B.type){var C=B.arg;U(g)}return C}}throw new Error(\"illegal catch attempt\")},delegateYield:function(A,g,B){return this.delegate={iterator:Y(A),resultName:g,nextLoc:B},\"next\"===this.method&&(this.arg=I),w}},A}(A.exports);try{regeneratorRuntime=I}catch(A){\"object\"===(\"undefined\"==typeof globalThis?\"undefined\":C(globalThis))?globalThis.regeneratorRuntime=I:Function(\"r\",\"regeneratorRuntime = r\")(I)}}(Q);var E=Q.exports,i=new Map,o=new Map;function e(A,I){var g=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];Array.isArray(A)||(A=[A]),A.forEach((function(A){i.set(A,I),o.set(A,g)}))}function t(A){return a.apply(this,arguments)}function a(){return(a=B(E.mark((function A(I){var g,B;return E.wrap((function(A){for(;;)switch(A.prev=A.next){case 0:if(g=i.get(I.Compression)){A.next=3;break}throw new Error(\"Unknown compression method identifier: \".concat(I.Compression));case 3:return A.next=5,g();case 5:return B=A.sent,A.abrupt(\"return\",new B(I));case 7:case\"end\":return A.stop()}}),A)})))).apply(this,arguments)}e([void 0,1],(function(){return Promise.resolve().then((function(){return u})).then((function(A){return A.default}))}),!1),e(5,(function(){return Promise.resolve().then((function(){return M})).then((function(A){return A.default}))})),e(6,(function(){throw new Error(\"old style JPEG compression is not supported.\")})),e(7,(function(){return Promise.resolve().then((function(){return v})).then((function(A){return A.default}))})),e([8,32946],(function(){return Promise.resolve().then((function(){return VA})).then((function(A){return A.default}))})),e(32773,(function(){return Promise.resolve().then((function(){return $A})).then((function(A){return A.default}))})),e(34887,(function(){return Promise.resolve().then((function(){return UI})).then(function(){var A=B(E.mark((function A(I){return E.wrap((function(A){for(;;)switch(A.prev=A.next){case 0:return A.next=2,I.zstd.init();case 2:return A.abrupt(\"return\",I);case 3:case\"end\":return A.stop()}}),A)})));return function(I){return A.apply(this,arguments)}}()).then((function(A){return A.default}))})),e(5e4,(function(){return Promise.resolve().then((function(){return pI})).then(function(){var A=B(E.mark((function A(I){return E.wrap((function(A){for(;;)switch(A.prev=A.next){case 0:return A.next=2,I.zstd.init();case 2:return A.abrupt(\"return\",I);case 3:case\"end\":return A.stop()}}),A)})));return function(I){return A.apply(this,arguments)}}()).then((function(A){return A.default}))})),e(50001,(function(){return Promise.resolve().then((function(){return bI})).then((function(A){return A.default}))}),!1);var r=[\"fileDirectory\",\"buffer\"];function s(A,I){var g=Object.keys(A);if(Object.getOwnPropertySymbols){var B=Object.getOwnPropertySymbols(A);I&&(B=B.filter((function(I){return Object.getOwnPropertyDescriptor(A,I).enumerable}))),g.push.apply(g,B)}return g}function n(I){for(var g=1;g<arguments.length;g++){var B=null!=arguments[g]?arguments[g]:{};g%2?s(Object(B),!0).forEach((function(g){A(I,g,B[g])})):Object.getOwnPropertyDescriptors?Object.defineProperties(I,Object.getOwnPropertyDescriptors(B)):s(Object(B)).forEach((function(A){Object.defineProperty(I,A,Object.getOwnPropertyDescriptor(B,A))}))}return I}var D=globalThis;function w(A,I){if(!(A instanceof I))throw new TypeError(\"Cannot call a class as a function\")}function h(A,I){for(var g=0;g<I.length;g++){var B=I[g];B.enumerable=B.enumerable||!1,B.configurable=!0,\"value\"in B&&(B.writable=!0),Object.defineProperty(A,B.key,B)}}function y(A,I,g){return I&&h(A.prototype,I),g&&h(A,g),A}function c(A,I){return c=Object.setPrototypeOf||function(A,I){return A.__proto__=I,A},c(A,I)}function G(A,I){if(\"function\"!=typeof I&&null!==I)throw new TypeError(\"Super expression must either be null or a function\");A.prototype=Object.create(I&&I.prototype,{constructor:{value:A,writable:!0,configurable:!0}}),I&&c(A,I)}function S(A,I){if(I&&(\"object\"===C(I)||\"function\"==typeof I))return I;if(void 0!==I)throw new TypeError(\"Derived constructors may only return object or undefined\");return function(A){if(void 0===A)throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");return A}(A)}function N(A){return N=Object.setPrototypeOf?Object.getPrototypeOf:function(A){return A.__proto__||Object.getPrototypeOf(A)},N(A)}function F(A,I){var g=A.length-I,B=0;do{for(var C=I;C>0;C--)A[B+I]+=A[B],B++;g-=I}while(g>0)}function f(A,I,g){for(var B=0,C=A.length,Q=C/g;C>I;){for(var E=I;E>0;--E)A[B+I]+=A[B],++B;C-=I}for(var i=A.slice(),o=0;o<Q;++o)for(var e=0;e<g;++e)A[g*o+e]=i[(g-e-1)*Q+o]}function k(A,I,g,B,C,Q){if(!I||1===I)return A;for(var E=0;E<C.length;++E){if(C[E]%8!=0)throw new Error(\"When decoding with predictor, only multiple of 8 bits are supported.\");if(C[E]!==C[0])throw new Error(\"When decoding with predictor, all samples must have the same size.\")}for(var i=C[0]/8,o=2===Q?1:C.length,e=0;e<B&&!(e*o*g*i>=A.byteLength);++e){var t=void 0;if(2===I){switch(C[0]){case 8:t=new Uint8Array(A,e*o*g*i,o*g*i);break;case 16:t=new Uint16Array(A,e*o*g*i,o*g*i/2);break;case 32:t=new Uint32Array(A,e*o*g*i,o*g*i/4);break;default:throw new Error(\"Predictor 2 not allowed with \".concat(C[0],\" bits per sample.\"))}F(t,o)}else 3===I&&f(t=new Uint8Array(A,e*o*g*i,o*g*i),o,i)}return A}D.addEventListener(\"message\",function(){var A=B(E.mark((function A(g){var B,C,Q,i,o,e;return E.wrap((function(A){for(;;)switch(A.prev=A.next){case 0:return B=g.data,C=B.fileDirectory,Q=B.buffer,i=I(B,r),A.prev=1,A.next=4,t(C);case 4:return o=A.sent,A.next=7,o.decode(C,Q);case 7:e=A.sent,D.postMessage(n({decoded:e},i),[e]),A.next=14;break;case 11:A.prev=11,A.t0=A.catch(1),D.postMessage(n({error:A.t0.message},i));case 14:case\"end\":return A.stop()}}),A,null,[[1,11]])})));return function(I){return A.apply(this,arguments)}}());var R=function(){function A(){w(this,A)}var I;return y(A,[{key:\"decode\",value:(I=B(E.mark((function A(I,g){var B,C,Q,i,o;return E.wrap((function(A){for(;;)switch(A.prev=A.next){case 0:return A.next=2,this.decodeBlock(g);case 2:if(B=A.sent,1===(C=I.Predictor||1)){A.next=9;break}return Q=!I.StripOffsets,i=Q?I.TileWidth:I.ImageWidth,o=Q?I.TileLength:I.RowsPerStrip||I.ImageLength,A.abrupt(\"return\",k(B,C,i,o,I.BitsPerSample,I.PlanarConfiguration));case 9:return A.abrupt(\"return\",B);case 10:case\"end\":return A.stop()}}),A,this)}))),function(A,g){return I.apply(this,arguments)})}]),A}();function L(A){var I=function(){if(\"undefined\"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if(\"function\"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(A){return!1}}();return function(){var g,B=N(A);if(I){var C=N(this).constructor;g=Reflect.construct(B,arguments,C)}else g=B.apply(this,arguments);return S(this,g)}}var U=function(A){G(g,R);var I=L(g);function g(){return w(this,g),I.apply(this,arguments)}return y(g,[{key:\"decodeBlock\",value:function(A){return A}}]),g}(),u=Object.freeze({__proto__:null,default:U});function Y(A){var I=function(){if(\"undefined\"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if(\"function\"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(A){return!1}}();return function(){var g,B=N(A);if(I){var C=N(this).constructor;g=Reflect.construct(B,arguments,C)}else g=B.apply(this,arguments);return S(this,g)}}function d(A,I){for(var g=I.length-1;g>=0;g--)A.push(I[g]);return A}function l(A){for(var I=new Uint16Array(4093),g=new Uint8Array(4093),B=0;B<=257;B++)I[B]=4096,g[B]=B;var C=258,Q=9,E=0;function i(){C=258,Q=9}function o(A){var I=function(A,I,g){var B=I%8,C=Math.floor(I/8),Q=8-B,E=I+g-8*(C+1),i=8*(C+2)-(I+g),o=8*(C+2)-I;if(i=Math.max(0,i),C>=A.length)return console.warn(\"ran off the end of the buffer before finding EOI_CODE (end on input code)\"),257;var e=A[C]&Math.pow(2,8-B)-1,t=e<<=g-Q;if(C+1<A.length){var a=A[C+1]>>>i;t+=a<<=Math.max(0,g-o)}if(E>8&&C+2<A.length){var r=8*(C+3)-(I+g);t+=A[C+2]>>>r}return t}(A,E,Q);return E+=Q,I}function e(A,B){return g[C]=B,I[C]=A,++C-1}function t(A){for(var B=[],C=A;4096!==C;C=I[C])B.push(g[C]);return B}var a=[];i();for(var r,s=new Uint8Array(A),n=o(s);257!==n;){if(256===n){for(i(),n=o(s);256===n;)n=o(s);if(257===n)break;if(n>256)throw new Error(\"corrupted code at scanline \".concat(n));d(a,t(n)),r=n}else if(n<C){var D=t(n);d(a,D),e(r,D[D.length-1]),r=n}else{var w=t(r);if(!w)throw new Error(\"Bogus entry. Not in dictionary, \".concat(r,\" / \").concat(C,\", position: \").concat(E));d(a,w),a.push(w[w.length-1]),e(r,w[w.length-1]),r=n}C+1>=Math.pow(2,Q)&&(12===Q?r=void 0:Q++),n=o(s)}return new Uint8Array(a)}var K=function(A){G(g,R);var I=Y(g);function g(){return w(this,g),I.apply(this,arguments)}return y(g,[{key:\"decodeBlock\",value:function(A){return l(A).buffer}}]),g}(),M=Object.freeze({__proto__:null,default:K});function J(A){var I=function(){if(\"undefined\"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if(\"function\"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(A){return!1}}();return function(){var g,B=N(A);if(I){var C=N(this).constructor;g=Reflect.construct(B,arguments,C)}else g=B.apply(this,arguments);return S(this,g)}}var H=new Int32Array([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63]);function p(A,I){for(var g=0,B=[],C=16;C>0&&!A[C-1];)--C;B.push({children:[],index:0});for(var Q,E=B[0],i=0;i<C;i++){for(var o=0;o<A[i];o++){for((E=B.pop()).children[E.index]=I[g];E.index>0;)E=B.pop();for(E.index++,B.push(E);B.length<=i;)B.push(Q={children:[],index:0}),E.children[E.index]=Q.children,E=Q;g++}i+1<C&&(B.push(Q={children:[],index:0}),E.children[E.index]=Q.children,E=Q)}return B[0].children}function q(A,I,g,B,Q,E,i,o,e){var t=g.mcusPerLine,a=g.progressive,r=I,s=I,n=0,D=0;function w(){if(D>0)return D--,n>>D&1;if(255===(n=A[s++])){var I=A[s++];if(I)throw new Error(\"unexpected marker: \".concat((n<<8|I).toString(16)))}return D=7,n>>>7}function h(A){for(var I,g=A;null!==(I=w());){if(\"number\"==typeof(g=g[I]))return g;if(\"object\"!==C(g))throw new Error(\"invalid huffman sequence\")}return null}function y(A){for(var I=A,g=0;I>0;){var B=w();if(null===B)return;g=g<<1|B,--I}return g}function c(A){var I=y(A);return I>=1<<A-1?I:I+(-1<<A)+1}var G=0;var S,N=0;function F(A,I,g,B,C){var Q=g%t,E=(g/t|0)*A.v+B,i=Q*A.h+C;I(A,A.blocks[E][i])}function f(A,I,g){var B=g/A.blocksPerLine|0,C=g%A.blocksPerLine;I(A,A.blocks[B][C])}var k,R,L,U,u,Y,d=B.length;Y=a?0===E?0===o?function(A,I){var g=h(A.huffmanTableDC),B=0===g?0:c(g)<<e;A.pred+=B,I[0]=A.pred}:function(A,I){I[0]|=w()<<e}:0===o?function(A,I){if(G>0)G--;else for(var g=E,B=i;g<=B;){var C=h(A.huffmanTableAC),Q=15&C,o=C>>4;if(0===Q){if(o<15){G=y(o)+(1<<o)-1;break}g+=16}else I[H[g+=o]]=c(Q)*(1<<e),g++}}:function(A,I){for(var g=E,B=i,C=0;g<=B;){var Q=H[g],o=I[Q]<0?-1:1;switch(N){case 0:var t=h(A.huffmanTableAC),a=15&t;if(C=t>>4,0===a)C<15?(G=y(C)+(1<<C),N=4):(C=16,N=1);else{if(1!==a)throw new Error(\"invalid ACn encoding\");S=c(a),N=C?2:3}continue;case 1:case 2:I[Q]?I[Q]+=(w()<<e)*o:0==--C&&(N=2===N?3:0);break;case 3:I[Q]?I[Q]+=(w()<<e)*o:(I[Q]=S<<e,N=0);break;case 4:I[Q]&&(I[Q]+=(w()<<e)*o)}g++}4===N&&0==--G&&(N=0)}:function(A,I){var g=h(A.huffmanTableDC),B=0===g?0:c(g);A.pred+=B,I[0]=A.pred;for(var C=1;C<64;){var Q=h(A.huffmanTableAC),E=15&Q,i=Q>>4;if(0===E){if(i<15)break;C+=16}else I[H[C+=i]]=c(E),C++}};var l,K,M=0;K=1===d?B[0].blocksPerLine*B[0].blocksPerColumn:t*g.mcusPerColumn;for(var J=Q||K;M<K;){for(R=0;R<d;R++)B[R].pred=0;if(G=0,1===d)for(k=B[0],u=0;u<J;u++)f(k,Y,M),M++;else for(u=0;u<J;u++){for(R=0;R<d;R++){var p=k=B[R],q=p.h,m=p.v;for(L=0;L<m;L++)for(U=0;U<q;U++)F(k,Y,M,L,U)}if(++M===K)break}if(D=0,(l=A[s]<<8|A[s+1])<65280)throw new Error(\"marker was not found\");if(!(l>=65488&&l<=65495))break;s+=2}return s-r}function m(A,I){var g=[],B=I.blocksPerLine,C=I.blocksPerColumn,Q=B<<3,E=new Int32Array(64),i=new Uint8Array(64);function o(A,g,B){var C,Q,E,i,o,e,t,a,r,s,n=I.quantizationTable,D=B;for(s=0;s<64;s++)D[s]=A[s]*n[s];for(s=0;s<8;++s){var w=8*s;0!==D[1+w]||0!==D[2+w]||0!==D[3+w]||0!==D[4+w]||0!==D[5+w]||0!==D[6+w]||0!==D[7+w]?(C=5793*D[0+w]+128>>8,Q=5793*D[4+w]+128>>8,E=D[2+w],i=D[6+w],o=2896*(D[1+w]-D[7+w])+128>>8,a=2896*(D[1+w]+D[7+w])+128>>8,e=D[3+w]<<4,r=C-Q+1>>1,C=C+Q+1>>1,Q=r,r=3784*E+1567*i+128>>8,E=1567*E-3784*i+128>>8,i=r,r=o-(t=D[5+w]<<4)+1>>1,o=o+t+1>>1,t=r,r=a+e+1>>1,e=a-e+1>>1,a=r,r=C-i+1>>1,C=C+i+1>>1,i=r,r=Q-E+1>>1,Q=Q+E+1>>1,E=r,r=2276*o+3406*a+2048>>12,o=3406*o-2276*a+2048>>12,a=r,r=799*e+4017*t+2048>>12,e=4017*e-799*t+2048>>12,t=r,D[0+w]=C+a,D[7+w]=C-a,D[1+w]=Q+t,D[6+w]=Q-t,D[2+w]=E+e,D[5+w]=E-e,D[3+w]=i+o,D[4+w]=i-o):(r=5793*D[0+w]+512>>10,D[0+w]=r,D[1+w]=r,D[2+w]=r,D[3+w]=r,D[4+w]=r,D[5+w]=r,D[6+w]=r,D[7+w]=r)}for(s=0;s<8;++s){var h=s;0!==D[8+h]||0!==D[16+h]||0!==D[24+h]||0!==D[32+h]||0!==D[40+h]||0!==D[48+h]||0!==D[56+h]?(C=5793*D[0+h]+2048>>12,Q=5793*D[32+h]+2048>>12,E=D[16+h],i=D[48+h],o=2896*(D[8+h]-D[56+h])+2048>>12,a=2896*(D[8+h]+D[56+h])+2048>>12,e=D[24+h],r=C-Q+1>>1,C=C+Q+1>>1,Q=r,r=3784*E+1567*i+2048>>12,E=1567*E-3784*i+2048>>12,i=r,r=o-(t=D[40+h])+1>>1,o=o+t+1>>1,t=r,r=a+e+1>>1,e=a-e+1>>1,a=r,r=C-i+1>>1,C=C+i+1>>1,i=r,r=Q-E+1>>1,Q=Q+E+1>>1,E=r,r=2276*o+3406*a+2048>>12,o=3406*o-2276*a+2048>>12,a=r,r=799*e+4017*t+2048>>12,e=4017*e-799*t+2048>>12,t=r,D[0+h]=C+a,D[56+h]=C-a,D[8+h]=Q+t,D[48+h]=Q-t,D[16+h]=E+e,D[40+h]=E-e,D[24+h]=i+o,D[32+h]=i-o):(r=5793*B[s+0]+8192>>14,D[0+h]=r,D[8+h]=r,D[16+h]=r,D[24+h]=r,D[32+h]=r,D[40+h]=r,D[48+h]=r,D[56+h]=r)}for(s=0;s<64;++s){var y=128+(D[s]+8>>4);g[s]=y<0?0:y>255?255:y}}for(var e=0;e<C;e++){for(var t=e<<3,a=0;a<8;a++)g.push(new Uint8Array(Q));for(var r=0;r<B;r++){o(I.blocks[e][r],i,E);for(var s=0,n=r<<3,D=0;D<8;D++)for(var w=g[t+D],h=0;h<8;h++)w[n+h]=i[s++]}}return g}var b=function(){function A(){w(this,A),this.jfif=null,this.adobe=null,this.quantizationTables=[],this.huffmanTablesAC=[],this.huffmanTablesDC=[],this.resetFrames()}return y(A,[{key:\"resetFrames\",value:function(){this.frames=[]}},{key:\"parse\",value:function(A){var I=0;function g(){var g=A[I]<<8|A[I+1];return I+=2,g}function B(A){var I,g,B=0,C=0;for(g in A.components)A.components.hasOwnProperty(g)&&(B<(I=A.components[g]).h&&(B=I.h),C<I.v&&(C=I.v));var Q=Math.ceil(A.samplesPerLine/8/B),E=Math.ceil(A.scanLines/8/C);for(g in A.components)if(A.components.hasOwnProperty(g)){I=A.components[g];for(var i=Math.ceil(Math.ceil(A.samplesPerLine/8)*I.h/B),o=Math.ceil(Math.ceil(A.scanLines/8)*I.v/C),e=Q*I.h,t=E*I.v,a=[],r=0;r<t;r++){for(var s=[],n=0;n<e;n++)s.push(new Int32Array(64));a.push(s)}I.blocksPerLine=i,I.blocksPerColumn=o,I.blocks=a}A.maxH=B,A.maxV=C,A.mcusPerLine=Q,A.mcusPerColumn=E}var C,Q,E=g();if(65496!==E)throw new Error(\"SOI not found\");for(E=g();65497!==E;){switch(E){case 65280:break;case 65504:case 65505:case 65506:case 65507:case 65508:case 65509:case 65510:case 65511:case 65512:case 65513:case 65514:case 65515:case 65516:case 65517:case 65518:case 65519:case 65534:var i=(C=void 0,Q=void 0,C=g(),Q=A.subarray(I,I+C-2),I+=Q.length,Q);65504===E&&74===i[0]&&70===i[1]&&73===i[2]&&70===i[3]&&0===i[4]&&(this.jfif={version:{major:i[5],minor:i[6]},densityUnits:i[7],xDensity:i[8]<<8|i[9],yDensity:i[10]<<8|i[11],thumbWidth:i[12],thumbHeight:i[13],thumbData:i.subarray(14,14+3*i[12]*i[13])}),65518===E&&65===i[0]&&100===i[1]&&111===i[2]&&98===i[3]&&101===i[4]&&0===i[5]&&(this.adobe={version:i[6],flags0:i[7]<<8|i[8],flags1:i[9]<<8|i[10],transformCode:i[11]});break;case 65499:for(var o=g()+I-2;I<o;){var e=A[I++],t=new Int32Array(64);if(e>>4==0)for(var a=0;a<64;a++){t[H[a]]=A[I++]}else{if(e>>4!=1)throw new Error(\"DQT: invalid table spec\");for(var r=0;r<64;r++){t[H[r]]=g()}}this.quantizationTables[15&e]=t}break;case 65472:case 65473:case 65474:g();for(var s={extended:65473===E,progressive:65474===E,precision:A[I++],scanLines:g(),samplesPerLine:g(),components:{},componentsOrder:[]},n=A[I++],D=void 0,w=0;w<n;w++){D=A[I];var h=A[I+1]>>4,y=15&A[I+1],c=A[I+2];s.componentsOrder.push(D),s.components[D]={h:h,v:y,quantizationIdx:c},I+=3}B(s),this.frames.push(s);break;case 65476:for(var G=g(),S=2;S<G;){for(var N=A[I++],F=new Uint8Array(16),f=0,k=0;k<16;k++,I++)F[k]=A[I],f+=F[k];for(var R=new Uint8Array(f),L=0;L<f;L++,I++)R[L]=A[I];S+=17+f,N>>4==0?this.huffmanTablesDC[15&N]=p(F,R):this.huffmanTablesAC[15&N]=p(F,R)}break;case 65501:g(),this.resetInterval=g();break;case 65498:g();for(var U=A[I++],u=[],Y=this.frames[0],d=0;d<U;d++){var l=Y.components[A[I++]],K=A[I++];l.huffmanTableDC=this.huffmanTablesDC[K>>4],l.huffmanTableAC=this.huffmanTablesAC[15&K],u.push(l)}var M=A[I++],J=A[I++],m=A[I++],b=q(A,I,Y,u,this.resetInterval,M,J,m>>4,15&m);I+=b;break;case 65535:255!==A[I]&&I--;break;default:if(255===A[I-3]&&A[I-2]>=192&&A[I-2]<=254){I-=3;break}throw new Error(\"unknown JPEG marker \".concat(E.toString(16)))}E=g()}}},{key:\"getResult\",value:function(){var A=this.frames;if(0===this.frames.length)throw new Error(\"no frames were decoded\");this.frames.length>1&&console.warn(\"more than one frame is not supported\");for(var I=0;I<this.frames.length;I++)for(var g=this.frames[I].components,B=0,C=Object.keys(g);B<C.length;B++){var Q=C[B];g[Q].quantizationTable=this.quantizationTables[g[Q].quantizationIdx],delete g[Q].quantizationIdx}for(var E=A[0],i=E.components,o=E.componentsOrder,e=[],t=E.samplesPerLine,a=E.scanLines,r=0;r<o.length;r++){var s=i[o[r]];e.push({lines:m(0,s),scaleX:s.h/E.maxH,scaleY:s.v/E.maxV})}for(var n=new Uint8Array(t*a*e.length),D=0,w=0;w<a;++w)for(var h=0;h<t;++h)for(var y=0;y<e.length;++y){var c=e[y];n[D]=c.lines[0|w*c.scaleY][0|h*c.scaleX],++D}return n}}]),A}(),x=function(A){G(g,R);var I=J(g);function g(A){var B;return w(this,g),(B=I.call(this)).reader=new b,A.JPEGTables&&B.reader.parse(A.JPEGTables),B}return y(g,[{key:\"decodeBlock\",value:function(A){return this.reader.resetFrames(),this.reader.parse(new Uint8Array(A)),this.reader.getResult().buffer}}]),g}(),v=Object.freeze({__proto__:null,default:x});function O(A){for(var I=A.length;--I>=0;)A[I]=0}O(new Array(576)),O(new Array(60)),O(new Array(512)),O(new Array(256)),O(new Array(29)),O(new Array(30));var T=function(A,I,g,B){for(var C=65535&A|0,Q=A>>>16&65535|0,E=0;0!==g;){g-=E=g>2e3?2e3:g;do{Q=Q+(C=C+I[B++]|0)|0}while(--E);C%=65521,Q%=65521}return C|Q<<16|0},P=new Uint32Array(function(){for(var A,I=[],g=0;g<256;g++){A=g;for(var B=0;B<8;B++)A=1&A?3988292384^A>>>1:A>>>1;I[g]=A}return I}()),Z=function(A,I,g,B){var C=P,Q=B+g;A^=-1;for(var E=B;E<Q;E++)A=A>>>8^C[255&(A^I[E])];return-1^A},j={2:\"need dictionary\",1:\"stream end\",0:\"\",\"-1\":\"file error\",\"-2\":\"stream error\",\"-3\":\"data error\",\"-4\":\"insufficient memory\",\"-5\":\"buffer error\",\"-6\":\"incompatible version\"},W={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8},V=function(A,I){return Object.prototype.hasOwnProperty.call(A,I)},z=function(A){for(var I=Array.prototype.slice.call(arguments,1);I.length;){var g=I.shift();if(g){if(\"object\"!==C(g))throw new TypeError(g+\"must be non-object\");for(var B in g)V(g,B)&&(A[B]=g[B])}}return A},X=function(A){for(var I=0,g=0,B=A.length;g<B;g++)I+=A[g].length;for(var C=new Uint8Array(I),Q=0,E=0,i=A.length;Q<i;Q++){var o=A[Q];C.set(o,E),E+=o.length}return C},_=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(A){_=!1}for(var $=new Uint8Array(256),AA=0;AA<256;AA++)$[AA]=AA>=252?6:AA>=248?5:AA>=240?4:AA>=224?3:AA>=192?2:1;$[254]=$[254]=1;var IA=function(A){if(\"function\"==typeof TextEncoder&&TextEncoder.prototype.encode)return(new TextEncoder).encode(A);var I,g,B,C,Q,E=A.length,i=0;for(C=0;C<E;C++)55296==(64512&(g=A.charCodeAt(C)))&&C+1<E&&56320==(64512&(B=A.charCodeAt(C+1)))&&(g=65536+(g-55296<<10)+(B-56320),C++),i+=g<128?1:g<2048?2:g<65536?3:4;for(I=new Uint8Array(i),Q=0,C=0;Q<i;C++)55296==(64512&(g=A.charCodeAt(C)))&&C+1<E&&56320==(64512&(B=A.charCodeAt(C+1)))&&(g=65536+(g-55296<<10)+(B-56320),C++),g<128?I[Q++]=g:g<2048?(I[Q++]=192|g>>>6,I[Q++]=128|63&g):g<65536?(I[Q++]=224|g>>>12,I[Q++]=128|g>>>6&63,I[Q++]=128|63&g):(I[Q++]=240|g>>>18,I[Q++]=128|g>>>12&63,I[Q++]=128|g>>>6&63,I[Q++]=128|63&g);return I},gA=function(A,I){var g,B,C=I||A.length;if(\"function\"==typeof TextDecoder&&TextDecoder.prototype.decode)return(new TextDecoder).decode(A.subarray(0,I));var Q=new Array(2*C);for(B=0,g=0;g<C;){var E=A[g++];if(E<128)Q[B++]=E;else{var i=$[E];if(i>4)Q[B++]=65533,g+=i-1;else{for(E&=2===i?31:3===i?15:7;i>1&&g<C;)E=E<<6|63&A[g++],i--;i>1?Q[B++]=65533:E<65536?Q[B++]=E:(E-=65536,Q[B++]=55296|E>>10&1023,Q[B++]=56320|1023&E)}}}return function(A,I){if(I<65534&&A.subarray&&_)return String.fromCharCode.apply(null,A.length===I?A:A.subarray(0,I));for(var g=\"\",B=0;B<I;B++)g+=String.fromCharCode(A[B]);return g}(Q,B)},BA=function(A,I){(I=I||A.length)>A.length&&(I=A.length);for(var g=I-1;g>=0&&128==(192&A[g]);)g--;return g<0||0===g?I:g+$[A[g]]>I?g:I};var CA=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg=\"\",this.state=null,this.data_type=2,this.adler=0},QA=function(A,I){var g,B,C,Q,E,i,o,e,t,a,r,s,n,D,w,h,y,c,G,S,N,F,f,k,R=A.state;g=A.next_in,f=A.input,B=g+(A.avail_in-5),C=A.next_out,k=A.output,Q=C-(I-A.avail_out),E=C+(A.avail_out-257),i=R.dmax,o=R.wsize,e=R.whave,t=R.wnext,a=R.window,r=R.hold,s=R.bits,n=R.lencode,D=R.distcode,w=(1<<R.lenbits)-1,h=(1<<R.distbits)-1;A:do{s<15&&(r+=f[g++]<<s,s+=8,r+=f[g++]<<s,s+=8),y=n[r&w];I:for(;;){if(r>>>=c=y>>>24,s-=c,0===(c=y>>>16&255))k[C++]=65535&y;else{if(!(16&c)){if(0==(64&c)){y=n[(65535&y)+(r&(1<<c)-1)];continue I}if(32&c){R.mode=12;break A}A.msg=\"invalid literal/length code\",R.mode=30;break A}G=65535&y,(c&=15)&&(s<c&&(r+=f[g++]<<s,s+=8),G+=r&(1<<c)-1,r>>>=c,s-=c),s<15&&(r+=f[g++]<<s,s+=8,r+=f[g++]<<s,s+=8),y=D[r&h];g:for(;;){if(r>>>=c=y>>>24,s-=c,!(16&(c=y>>>16&255))){if(0==(64&c)){y=D[(65535&y)+(r&(1<<c)-1)];continue g}A.msg=\"invalid distance code\",R.mode=30;break A}if(S=65535&y,s<(c&=15)&&(r+=f[g++]<<s,(s+=8)<c&&(r+=f[g++]<<s,s+=8)),(S+=r&(1<<c)-1)>i){A.msg=\"invalid distance too far back\",R.mode=30;break A}if(r>>>=c,s-=c,S>(c=C-Q)){if((c=S-c)>e&&R.sane){A.msg=\"invalid distance too far back\",R.mode=30;break A}if(N=0,F=a,0===t){if(N+=o-c,c<G){G-=c;do{k[C++]=a[N++]}while(--c);N=C-S,F=k}}else if(t<c){if(N+=o+t-c,(c-=t)<G){G-=c;do{k[C++]=a[N++]}while(--c);if(N=0,t<G){G-=c=t;do{k[C++]=a[N++]}while(--c);N=C-S,F=k}}}else if(N+=t-c,c<G){G-=c;do{k[C++]=a[N++]}while(--c);N=C-S,F=k}for(;G>2;)k[C++]=F[N++],k[C++]=F[N++],k[C++]=F[N++],G-=3;G&&(k[C++]=F[N++],G>1&&(k[C++]=F[N++]))}else{N=C-S;do{k[C++]=k[N++],k[C++]=k[N++],k[C++]=k[N++],G-=3}while(G>2);G&&(k[C++]=k[N++],G>1&&(k[C++]=k[N++]))}break}}break}}while(g<B&&C<E);g-=G=s>>3,r&=(1<<(s-=G<<3))-1,A.next_in=g,A.next_out=C,A.avail_in=g<B?B-g+5:5-(g-B),A.avail_out=C<E?E-C+257:257-(C-E),R.hold=r,R.bits=s},EA=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),iA=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78]),oA=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),eA=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]),tA=function(A,I,g,B,C,Q,E,i){var o,e,t,a,r,s,n,D,w,h=i.bits,y=0,c=0,G=0,S=0,N=0,F=0,f=0,k=0,R=0,L=0,U=null,u=0,Y=new Uint16Array(16),d=new Uint16Array(16),l=null,K=0;for(y=0;y<=15;y++)Y[y]=0;for(c=0;c<B;c++)Y[I[g+c]]++;for(N=h,S=15;S>=1&&0===Y[S];S--);if(N>S&&(N=S),0===S)return C[Q++]=20971520,C[Q++]=20971520,i.bits=1,0;for(G=1;G<S&&0===Y[G];G++);for(N<G&&(N=G),k=1,y=1;y<=15;y++)if(k<<=1,(k-=Y[y])<0)return-1;if(k>0&&(0===A||1!==S))return-1;for(d[1]=0,y=1;y<15;y++)d[y+1]=d[y]+Y[y];for(c=0;c<B;c++)0!==I[g+c]&&(E[d[I[g+c]]++]=c);if(0===A?(U=l=E,s=19):1===A?(U=EA,u-=257,l=iA,K-=257,s=256):(U=oA,l=eA,s=-1),L=0,c=0,y=G,r=Q,F=N,f=0,t=-1,a=(R=1<<N)-1,1===A&&R>852||2===A&&R>592)return 1;for(;;){n=y-f,E[c]<s?(D=0,w=E[c]):E[c]>s?(D=l[K+E[c]],w=U[u+E[c]]):(D=96,w=0),o=1<<y-f,G=e=1<<F;do{C[r+(L>>f)+(e-=o)]=n<<24|D<<16|w|0}while(0!==e);for(o=1<<y-1;L&o;)o>>=1;if(0!==o?(L&=o-1,L+=o):L=0,c++,0==--Y[y]){if(y===S)break;y=I[g+E[c]]}if(y>N&&(L&a)!==t){for(0===f&&(f=N),r+=G,k=1<<(F=y-f);F+f<S&&!((k-=Y[F+f])<=0);)F++,k<<=1;if(R+=1<<F,1===A&&R>852||2===A&&R>592)return 1;C[t=L&a]=N<<24|F<<16|r-Q|0}}return 0!==L&&(C[r+L]=y-f<<24|64<<16|0),i.bits=N,0},aA=W.Z_FINISH,rA=W.Z_BLOCK,sA=W.Z_TREES,nA=W.Z_OK,DA=W.Z_STREAM_END,wA=W.Z_NEED_DICT,hA=W.Z_STREAM_ERROR,yA=W.Z_DATA_ERROR,cA=W.Z_MEM_ERROR,GA=W.Z_BUF_ERROR,SA=W.Z_DEFLATED,NA=function(A){return(A>>>24&255)+(A>>>8&65280)+((65280&A)<<8)+((255&A)<<24)};function FA(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}var fA,kA,RA=function(A){if(!A||!A.state)return hA;var I=A.state;return A.total_in=A.total_out=I.total=0,A.msg=\"\",I.wrap&&(A.adler=1&I.wrap),I.mode=1,I.last=0,I.havedict=0,I.dmax=32768,I.head=null,I.hold=0,I.bits=0,I.lencode=I.lendyn=new Int32Array(852),I.distcode=I.distdyn=new Int32Array(592),I.sane=1,I.back=-1,nA},LA=function(A){if(!A||!A.state)return hA;var I=A.state;return I.wsize=0,I.whave=0,I.wnext=0,RA(A)},UA=function(A,I){var g;if(!A||!A.state)return hA;var B=A.state;return I<0?(g=0,I=-I):(g=1+(I>>4),I<48&&(I&=15)),I&&(I<8||I>15)?hA:(null!==B.window&&B.wbits!==I&&(B.window=null),B.wrap=g,B.wbits=I,LA(A))},uA=function(A,I){if(!A)return hA;var g=new FA;A.state=g,g.window=null;var B=UA(A,I);return B!==nA&&(A.state=null),B},YA=!0,dA=function(A){if(YA){fA=new Int32Array(512),kA=new Int32Array(32);for(var I=0;I<144;)A.lens[I++]=8;for(;I<256;)A.lens[I++]=9;for(;I<280;)A.lens[I++]=7;for(;I<288;)A.lens[I++]=8;for(tA(1,A.lens,0,288,fA,0,A.work,{bits:9}),I=0;I<32;)A.lens[I++]=5;tA(2,A.lens,0,32,kA,0,A.work,{bits:5}),YA=!1}A.lencode=fA,A.lenbits=9,A.distcode=kA,A.distbits=5},lA=function(A,I,g,B){var C,Q=A.state;return null===Q.window&&(Q.wsize=1<<Q.wbits,Q.wnext=0,Q.whave=0,Q.window=new Uint8Array(Q.wsize)),B>=Q.wsize?(Q.window.set(I.subarray(g-Q.wsize,g),0),Q.wnext=0,Q.whave=Q.wsize):((C=Q.wsize-Q.wnext)>B&&(C=B),Q.window.set(I.subarray(g-B,g-B+C),Q.wnext),(B-=C)?(Q.window.set(I.subarray(g-B,g),0),Q.wnext=B,Q.whave=Q.wsize):(Q.wnext+=C,Q.wnext===Q.wsize&&(Q.wnext=0),Q.whave<Q.wsize&&(Q.whave+=C))),0},KA={inflateReset:LA,inflateReset2:UA,inflateResetKeep:RA,inflateInit:function(A){return uA(A,15)},inflateInit2:uA,inflate:function(A,I){var g,B,C,Q,E,i,o,e,t,a,r,s,n,D,w,h,y,c,G,S,N,F,f,k,R=0,L=new Uint8Array(4),U=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(!A||!A.state||!A.output||!A.input&&0!==A.avail_in)return hA;12===(g=A.state).mode&&(g.mode=13),E=A.next_out,C=A.output,o=A.avail_out,Q=A.next_in,B=A.input,i=A.avail_in,e=g.hold,t=g.bits,a=i,r=o,F=nA;A:for(;;)switch(g.mode){case 1:if(0===g.wrap){g.mode=13;break}for(;t<16;){if(0===i)break A;i--,e+=B[Q++]<<t,t+=8}if(2&g.wrap&&35615===e){g.check=0,L[0]=255&e,L[1]=e>>>8&255,g.check=Z(g.check,L,2,0),e=0,t=0,g.mode=2;break}if(g.flags=0,g.head&&(g.head.done=!1),!(1&g.wrap)||(((255&e)<<8)+(e>>8))%31){A.msg=\"incorrect header check\",g.mode=30;break}if((15&e)!==SA){A.msg=\"unknown compression method\",g.mode=30;break}if(t-=4,N=8+(15&(e>>>=4)),0===g.wbits)g.wbits=N;else if(N>g.wbits){A.msg=\"invalid window size\",g.mode=30;break}g.dmax=1<<g.wbits,A.adler=g.check=1,g.mode=512&e?10:12,e=0,t=0;break;case 2:for(;t<16;){if(0===i)break A;i--,e+=B[Q++]<<t,t+=8}if(g.flags=e,(255&g.flags)!==SA){A.msg=\"unknown compression method\",g.mode=30;break}if(57344&g.flags){A.msg=\"unknown header flags set\",g.mode=30;break}g.head&&(g.head.text=e>>8&1),512&g.flags&&(L[0]=255&e,L[1]=e>>>8&255,g.check=Z(g.check,L,2,0)),e=0,t=0,g.mode=3;case 3:for(;t<32;){if(0===i)break A;i--,e+=B[Q++]<<t,t+=8}g.head&&(g.head.time=e),512&g.flags&&(L[0]=255&e,L[1]=e>>>8&255,L[2]=e>>>16&255,L[3]=e>>>24&255,g.check=Z(g.check,L,4,0)),e=0,t=0,g.mode=4;case 4:for(;t<16;){if(0===i)break A;i--,e+=B[Q++]<<t,t+=8}g.head&&(g.head.xflags=255&e,g.head.os=e>>8),512&g.flags&&(L[0]=255&e,L[1]=e>>>8&255,g.check=Z(g.check,L,2,0)),e=0,t=0,g.mode=5;case 5:if(1024&g.flags){for(;t<16;){if(0===i)break A;i--,e+=B[Q++]<<t,t+=8}g.length=e,g.head&&(g.head.extra_len=e),512&g.flags&&(L[0]=255&e,L[1]=e>>>8&255,g.check=Z(g.check,L,2,0)),e=0,t=0}else g.head&&(g.head.extra=null);g.mode=6;case 6:if(1024&g.flags&&((s=g.length)>i&&(s=i),s&&(g.head&&(N=g.head.extra_len-g.length,g.head.extra||(g.head.extra=new Uint8Array(g.head.extra_len)),g.head.extra.set(B.subarray(Q,Q+s),N)),512&g.flags&&(g.check=Z(g.check,B,s,Q)),i-=s,Q+=s,g.length-=s),g.length))break A;g.length=0,g.mode=7;case 7:if(2048&g.flags){if(0===i)break A;s=0;do{N=B[Q+s++],g.head&&N&&g.length<65536&&(g.head.name+=String.fromCharCode(N))}while(N&&s<i);if(512&g.flags&&(g.check=Z(g.check,B,s,Q)),i-=s,Q+=s,N)break A}else g.head&&(g.head.name=null);g.length=0,g.mode=8;case 8:if(4096&g.flags){if(0===i)break A;s=0;do{N=B[Q+s++],g.head&&N&&g.length<65536&&(g.head.comment+=String.fromCharCode(N))}while(N&&s<i);if(512&g.flags&&(g.check=Z(g.check,B,s,Q)),i-=s,Q+=s,N)break A}else g.head&&(g.head.comment=null);g.mode=9;case 9:if(512&g.flags){for(;t<16;){if(0===i)break A;i--,e+=B[Q++]<<t,t+=8}if(e!==(65535&g.check)){A.msg=\"header crc mismatch\",g.mode=30;break}e=0,t=0}g.head&&(g.head.hcrc=g.flags>>9&1,g.head.done=!0),A.adler=g.check=0,g.mode=12;break;case 10:for(;t<32;){if(0===i)break A;i--,e+=B[Q++]<<t,t+=8}A.adler=g.check=NA(e),e=0,t=0,g.mode=11;case 11:if(0===g.havedict)return A.next_out=E,A.avail_out=o,A.next_in=Q,A.avail_in=i,g.hold=e,g.bits=t,wA;A.adler=g.check=1,g.mode=12;case 12:if(I===rA||I===sA)break A;case 13:if(g.last){e>>>=7&t,t-=7&t,g.mode=27;break}for(;t<3;){if(0===i)break A;i--,e+=B[Q++]<<t,t+=8}switch(g.last=1&e,t-=1,3&(e>>>=1)){case 0:g.mode=14;break;case 1:if(dA(g),g.mode=20,I===sA){e>>>=2,t-=2;break A}break;case 2:g.mode=17;break;case 3:A.msg=\"invalid block type\",g.mode=30}e>>>=2,t-=2;break;case 14:for(e>>>=7&t,t-=7&t;t<32;){if(0===i)break A;i--,e+=B[Q++]<<t,t+=8}if((65535&e)!=(e>>>16^65535)){A.msg=\"invalid stored block lengths\",g.mode=30;break}if(g.length=65535&e,e=0,t=0,g.mode=15,I===sA)break A;case 15:g.mode=16;case 16:if(s=g.length){if(s>i&&(s=i),s>o&&(s=o),0===s)break A;C.set(B.subarray(Q,Q+s),E),i-=s,Q+=s,o-=s,E+=s,g.length-=s;break}g.mode=12;break;case 17:for(;t<14;){if(0===i)break A;i--,e+=B[Q++]<<t,t+=8}if(g.nlen=257+(31&e),e>>>=5,t-=5,g.ndist=1+(31&e),e>>>=5,t-=5,g.ncode=4+(15&e),e>>>=4,t-=4,g.nlen>286||g.ndist>30){A.msg=\"too many length or distance symbols\",g.mode=30;break}g.have=0,g.mode=18;case 18:for(;g.have<g.ncode;){for(;t<3;){if(0===i)break A;i--,e+=B[Q++]<<t,t+=8}g.lens[U[g.have++]]=7&e,e>>>=3,t-=3}for(;g.have<19;)g.lens[U[g.have++]]=0;if(g.lencode=g.lendyn,g.lenbits=7,f={bits:g.lenbits},F=tA(0,g.lens,0,19,g.lencode,0,g.work,f),g.lenbits=f.bits,F){A.msg=\"invalid code lengths set\",g.mode=30;break}g.have=0,g.mode=19;case 19:for(;g.have<g.nlen+g.ndist;){for(;h=(R=g.lencode[e&(1<<g.lenbits)-1])>>>16&255,y=65535&R,!((w=R>>>24)<=t);){if(0===i)break A;i--,e+=B[Q++]<<t,t+=8}if(y<16)e>>>=w,t-=w,g.lens[g.have++]=y;else{if(16===y){for(k=w+2;t<k;){if(0===i)break A;i--,e+=B[Q++]<<t,t+=8}if(e>>>=w,t-=w,0===g.have){A.msg=\"invalid bit length repeat\",g.mode=30;break}N=g.lens[g.have-1],s=3+(3&e),e>>>=2,t-=2}else if(17===y){for(k=w+3;t<k;){if(0===i)break A;i--,e+=B[Q++]<<t,t+=8}t-=w,N=0,s=3+(7&(e>>>=w)),e>>>=3,t-=3}else{for(k=w+7;t<k;){if(0===i)break A;i--,e+=B[Q++]<<t,t+=8}t-=w,N=0,s=11+(127&(e>>>=w)),e>>>=7,t-=7}if(g.have+s>g.nlen+g.ndist){A.msg=\"invalid bit length repeat\",g.mode=30;break}for(;s--;)g.lens[g.have++]=N}}if(30===g.mode)break;if(0===g.lens[256]){A.msg=\"invalid code -- missing end-of-block\",g.mode=30;break}if(g.lenbits=9,f={bits:g.lenbits},F=tA(1,g.lens,0,g.nlen,g.lencode,0,g.work,f),g.lenbits=f.bits,F){A.msg=\"invalid literal/lengths set\",g.mode=30;break}if(g.distbits=6,g.distcode=g.distdyn,f={bits:g.distbits},F=tA(2,g.lens,g.nlen,g.ndist,g.distcode,0,g.work,f),g.distbits=f.bits,F){A.msg=\"invalid distances set\",g.mode=30;break}if(g.mode=20,I===sA)break A;case 20:g.mode=21;case 21:if(i>=6&&o>=258){A.next_out=E,A.avail_out=o,A.next_in=Q,A.avail_in=i,g.hold=e,g.bits=t,QA(A,r),E=A.next_out,C=A.output,o=A.avail_out,Q=A.next_in,B=A.input,i=A.avail_in,e=g.hold,t=g.bits,12===g.mode&&(g.back=-1);break}for(g.back=0;h=(R=g.lencode[e&(1<<g.lenbits)-1])>>>16&255,y=65535&R,!((w=R>>>24)<=t);){if(0===i)break A;i--,e+=B[Q++]<<t,t+=8}if(h&&0==(240&h)){for(c=w,G=h,S=y;h=(R=g.lencode[S+((e&(1<<c+G)-1)>>c)])>>>16&255,y=65535&R,!(c+(w=R>>>24)<=t);){if(0===i)break A;i--,e+=B[Q++]<<t,t+=8}e>>>=c,t-=c,g.back+=c}if(e>>>=w,t-=w,g.back+=w,g.length=y,0===h){g.mode=26;break}if(32&h){g.back=-1,g.mode=12;break}if(64&h){A.msg=\"invalid literal/length code\",g.mode=30;break}g.extra=15&h,g.mode=22;case 22:if(g.extra){for(k=g.extra;t<k;){if(0===i)break A;i--,e+=B[Q++]<<t,t+=8}g.length+=e&(1<<g.extra)-1,e>>>=g.extra,t-=g.extra,g.back+=g.extra}g.was=g.length,g.mode=23;case 23:for(;h=(R=g.distcode[e&(1<<g.distbits)-1])>>>16&255,y=65535&R,!((w=R>>>24)<=t);){if(0===i)break A;i--,e+=B[Q++]<<t,t+=8}if(0==(240&h)){for(c=w,G=h,S=y;h=(R=g.distcode[S+((e&(1<<c+G)-1)>>c)])>>>16&255,y=65535&R,!(c+(w=R>>>24)<=t);){if(0===i)break A;i--,e+=B[Q++]<<t,t+=8}e>>>=c,t-=c,g.back+=c}if(e>>>=w,t-=w,g.back+=w,64&h){A.msg=\"invalid distance code\",g.mode=30;break}g.offset=y,g.extra=15&h,g.mode=24;case 24:if(g.extra){for(k=g.extra;t<k;){if(0===i)break A;i--,e+=B[Q++]<<t,t+=8}g.offset+=e&(1<<g.extra)-1,e>>>=g.extra,t-=g.extra,g.back+=g.extra}if(g.offset>g.dmax){A.msg=\"invalid distance too far back\",g.mode=30;break}g.mode=25;case 25:if(0===o)break A;if(s=r-o,g.offset>s){if((s=g.offset-s)>g.whave&&g.sane){A.msg=\"invalid distance too far back\",g.mode=30;break}s>g.wnext?(s-=g.wnext,n=g.wsize-s):n=g.wnext-s,s>g.length&&(s=g.length),D=g.window}else D=C,n=E-g.offset,s=g.length;s>o&&(s=o),o-=s,g.length-=s;do{C[E++]=D[n++]}while(--s);0===g.length&&(g.mode=21);break;case 26:if(0===o)break A;C[E++]=g.length,o--,g.mode=21;break;case 27:if(g.wrap){for(;t<32;){if(0===i)break A;i--,e|=B[Q++]<<t,t+=8}if(r-=o,A.total_out+=r,g.total+=r,r&&(A.adler=g.check=g.flags?Z(g.check,C,r,E-r):T(g.check,C,r,E-r)),r=o,(g.flags?e:NA(e))!==g.check){A.msg=\"incorrect data check\",g.mode=30;break}e=0,t=0}g.mode=28;case 28:if(g.wrap&&g.flags){for(;t<32;){if(0===i)break A;i--,e+=B[Q++]<<t,t+=8}if(e!==(4294967295&g.total)){A.msg=\"incorrect length check\",g.mode=30;break}e=0,t=0}g.mode=29;case 29:F=DA;break A;case 30:F=yA;break A;case 31:return cA;default:return hA}return A.next_out=E,A.avail_out=o,A.next_in=Q,A.avail_in=i,g.hold=e,g.bits=t,(g.wsize||r!==A.avail_out&&g.mode<30&&(g.mode<27||I!==aA))&&lA(A,A.output,A.next_out,r-A.avail_out),a-=A.avail_in,r-=A.avail_out,A.total_in+=a,A.total_out+=r,g.total+=r,g.wrap&&r&&(A.adler=g.check=g.flags?Z(g.check,C,r,A.next_out-r):T(g.check,C,r,A.next_out-r)),A.data_type=g.bits+(g.last?64:0)+(12===g.mode?128:0)+(20===g.mode||15===g.mode?256:0),(0===a&&0===r||I===aA)&&F===nA&&(F=GA),F},inflateEnd:function(A){if(!A||!A.state)return hA;var I=A.state;return I.window&&(I.window=null),A.state=null,nA},inflateGetHeader:function(A,I){if(!A||!A.state)return hA;var g=A.state;return 0==(2&g.wrap)?hA:(g.head=I,I.done=!1,nA)},inflateSetDictionary:function(A,I){var g,B=I.length;return A&&A.state?0!==(g=A.state).wrap&&11!==g.mode?hA:11===g.mode&&T(1,I,B,0)!==g.check?yA:lA(A,I,B,B)?(g.mode=31,cA):(g.havedict=1,nA):hA},inflateInfo:\"pako inflate (from Nodeca project)\"};var MA=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name=\"\",this.comment=\"\",this.hcrc=0,this.done=!1},JA=Object.prototype.toString,HA=W.Z_NO_FLUSH,pA=W.Z_FINISH,qA=W.Z_OK,mA=W.Z_STREAM_END,bA=W.Z_NEED_DICT,xA=W.Z_STREAM_ERROR,vA=W.Z_DATA_ERROR,OA=W.Z_MEM_ERROR;function TA(A){this.options=z({chunkSize:65536,windowBits:15,to:\"\"},A||{});var I=this.options;I.raw&&I.windowBits>=0&&I.windowBits<16&&(I.windowBits=-I.windowBits,0===I.windowBits&&(I.windowBits=-15)),!(I.windowBits>=0&&I.windowBits<16)||A&&A.windowBits||(I.windowBits+=32),I.windowBits>15&&I.windowBits<48&&0==(15&I.windowBits)&&(I.windowBits|=15),this.err=0,this.msg=\"\",this.ended=!1,this.chunks=[],this.strm=new CA,this.strm.avail_out=0;var g=KA.inflateInit2(this.strm,I.windowBits);if(g!==qA)throw new Error(j[g]);if(this.header=new MA,KA.inflateGetHeader(this.strm,this.header),I.dictionary&&(\"string\"==typeof I.dictionary?I.dictionary=IA(I.dictionary):\"[object ArrayBuffer]\"===JA.call(I.dictionary)&&(I.dictionary=new Uint8Array(I.dictionary)),I.raw&&(g=KA.inflateSetDictionary(this.strm,I.dictionary))!==qA))throw new Error(j[g])}function PA(A,I){var g=new TA(I);if(g.push(A),g.err)throw g.msg||j[g.err];return g.result}TA.prototype.push=function(A,I){var g,B,C,Q=this.strm,E=this.options.chunkSize,i=this.options.dictionary;if(this.ended)return!1;for(B=I===~~I?I:!0===I?pA:HA,\"[object ArrayBuffer]\"===JA.call(A)?Q.input=new Uint8Array(A):Q.input=A,Q.next_in=0,Q.avail_in=Q.input.length;;){for(0===Q.avail_out&&(Q.output=new Uint8Array(E),Q.next_out=0,Q.avail_out=E),(g=KA.inflate(Q,B))===bA&&i&&((g=KA.inflateSetDictionary(Q,i))===qA?g=KA.inflate(Q,B):g===vA&&(g=bA));Q.avail_in>0&&g===mA&&Q.state.wrap>0&&0!==A[Q.next_in];)KA.inflateReset(Q),g=KA.inflate(Q,B);switch(g){case xA:case vA:case bA:case OA:return this.onEnd(g),this.ended=!0,!1}if(C=Q.avail_out,Q.next_out&&(0===Q.avail_out||g===mA))if(\"string\"===this.options.to){var o=BA(Q.output,Q.next_out),e=Q.next_out-o,t=gA(Q.output,o);Q.next_out=e,Q.avail_out=E-e,e&&Q.output.set(Q.output.subarray(o,o+e),0),this.onData(t)}else this.onData(Q.output.length===Q.next_out?Q.output:Q.output.subarray(0,Q.next_out));if(g!==qA||0!==C){if(g===mA)return g=KA.inflateEnd(this.strm),this.onEnd(g),this.ended=!0,!0;if(0===Q.avail_in)break}}return!0},TA.prototype.onData=function(A){this.chunks.push(A)},TA.prototype.onEnd=function(A){A===qA&&(\"string\"===this.options.to?this.result=this.chunks.join(\"\"):this.result=X(this.chunks)),this.chunks=[],this.err=A,this.msg=this.strm.msg};var ZA={Inflate:TA,inflate:PA,inflateRaw:function(A,I){return(I=I||{}).raw=!0,PA(A,I)},ungzip:PA,constants:W}.inflate;function jA(A){var I=function(){if(\"undefined\"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if(\"function\"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(A){return!1}}();return function(){var g,B=N(A);if(I){var C=N(this).constructor;g=Reflect.construct(B,arguments,C)}else g=B.apply(this,arguments);return S(this,g)}}var WA=function(A){G(g,R);var I=jA(g);function g(){return w(this,g),I.apply(this,arguments)}return y(g,[{key:\"decodeBlock\",value:function(A){return ZA(new Uint8Array(A)).buffer}}]),g}(),VA=Object.freeze({__proto__:null,default:WA});function zA(A){var I=function(){if(\"undefined\"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if(\"function\"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(A){return!1}}();return function(){var g,B=N(A);if(I){var C=N(this).constructor;g=Reflect.construct(B,arguments,C)}else g=B.apply(this,arguments);return S(this,g)}}var XA,_A=function(A){G(g,R);var I=zA(g);function g(){return w(this,g),I.apply(this,arguments)}return y(g,[{key:\"decodeBlock\",value:function(A){for(var I=new DataView(A),g=[],B=0;B<A.byteLength;++B){var C=I.getInt8(B);if(C<0){var Q=I.getUint8(B+1);C=-C;for(var E=0;E<=C;++E)g.push(Q);B+=1}else{for(var i=0;i<=C;++i)g.push(I.getUint8(B+i+1));B+=C+1}}return new Uint8Array(g).buffer}}]),g}(),$A=Object.freeze({__proto__:null,default:_A}),AI={exports:{}};XA=AI,\n/* Copyright 2015-2021 Esri. Licensed under the Apache License, Version 2.0 (the \"License\"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 @preserve */\nfunction(){var A,I,g,B,C,Q,E,i,o,e,t,a,r,s,n,D,w=(A={defaultNoDataValue:-34027999387901484e22,decode:function(Q,E){var i=(E=E||{}).encodedMaskData||null===E.encodedMaskData,o=C(Q,E.inputOffset||0,i),e=null!==E.noDataValue?E.noDataValue:A.defaultNoDataValue,t=I(o,E.pixelType||Float32Array,E.encodedMaskData,e,E.returnMask),a={width:o.width,height:o.height,pixelData:t.resultPixels,minValue:t.minValue,maxValue:o.pixels.maxValue,noDataValue:e};return t.resultMask&&(a.maskData=t.resultMask),E.returnEncodedMask&&o.mask&&(a.encodedMaskData=o.mask.bitset?o.mask.bitset:null),E.returnFileInfo&&(a.fileInfo=g(o),E.computeUsedBitDepths&&(a.fileInfo.bitDepths=B(o))),a}},I=function(A,I,g,B,C){var E,i,o,e=0,t=A.pixels.numBlocksX,a=A.pixels.numBlocksY,r=Math.floor(A.width/t),s=Math.floor(A.height/a),n=2*A.maxZError,D=Number.MAX_VALUE;g=g||(A.mask?A.mask.bitset:null),i=new I(A.width*A.height),C&&g&&(o=new Uint8Array(A.width*A.height));for(var w,h,y=new Float32Array(r*s),c=0;c<=a;c++){var G=c!==a?s:A.height%a;if(0!==G)for(var S=0;S<=t;S++){var N=S!==t?r:A.width%t;if(0!==N){var F,f,k,R,L=c*A.width*s+S*r,U=A.width-N,u=A.pixels.blocks[e];if(u.encoding<2?(0===u.encoding?F=u.rawData:(Q(u.stuffedData,u.bitsPerPixel,u.numValidPixels,u.offset,n,y,A.pixels.maxValue),F=y),f=0):k=2===u.encoding?0:u.offset,g)for(h=0;h<G;h++){for(7&L&&(R=g[L>>3],R<<=7&L),w=0;w<N;w++)7&L||(R=g[L>>3]),128&R?(o&&(o[L]=1),D=D>(E=u.encoding<2?F[f++]:k)?E:D,i[L++]=E):(o&&(o[L]=0),i[L++]=B),R<<=1;L+=U}else if(u.encoding<2)for(h=0;h<G;h++){for(w=0;w<N;w++)D=D>(E=F[f++])?E:D,i[L++]=E;L+=U}else for(D=D>k?k:D,h=0;h<G;h++){for(w=0;w<N;w++)i[L++]=k;L+=U}if(1===u.encoding&&f!==u.numValidPixels)throw\"Block and Mask do not match\";e++}}}return{resultPixels:i,resultMask:o,minValue:D}},g=function(A){return{fileIdentifierString:A.fileIdentifierString,fileVersion:A.fileVersion,imageType:A.imageType,height:A.height,width:A.width,maxZError:A.maxZError,eofOffset:A.eofOffset,mask:A.mask?{numBlocksX:A.mask.numBlocksX,numBlocksY:A.mask.numBlocksY,numBytes:A.mask.numBytes,maxValue:A.mask.maxValue}:null,pixels:{numBlocksX:A.pixels.numBlocksX,numBlocksY:A.pixels.numBlocksY,numBytes:A.pixels.numBytes,maxValue:A.pixels.maxValue,noDataValue:A.noDataValue}}},B=function(A){for(var I=A.pixels.numBlocksX*A.pixels.numBlocksY,g={},B=0;B<I;B++){var C=A.pixels.blocks[B];0===C.encoding?g.float32=!0:1===C.encoding?g[C.bitsPerPixel]=!0:g[0]=!0}return Object.keys(g)},C=function(A,I,g){var B={},C=new Uint8Array(A,I,10);if(B.fileIdentifierString=String.fromCharCode.apply(null,C),\"CntZImage\"!==B.fileIdentifierString.trim())throw\"Unexpected file identifier string: \"+B.fileIdentifierString;I+=10;var Q=new DataView(A,I,24);if(B.fileVersion=Q.getInt32(0,!0),B.imageType=Q.getInt32(4,!0),B.height=Q.getUint32(8,!0),B.width=Q.getUint32(12,!0),B.maxZError=Q.getFloat64(16,!0),I+=24,!g)if(Q=new DataView(A,I,16),B.mask={},B.mask.numBlocksY=Q.getUint32(0,!0),B.mask.numBlocksX=Q.getUint32(4,!0),B.mask.numBytes=Q.getUint32(8,!0),B.mask.maxValue=Q.getFloat32(12,!0),I+=16,B.mask.numBytes>0){var E=new Uint8Array(Math.ceil(B.width*B.height/8)),i=(Q=new DataView(A,I,B.mask.numBytes)).getInt16(0,!0),o=2,e=0;do{if(i>0)for(;i--;)E[e++]=Q.getUint8(o++);else{var t=Q.getUint8(o++);for(i=-i;i--;)E[e++]=t}i=Q.getInt16(o,!0),o+=2}while(o<B.mask.numBytes);if(-32768!==i||e<E.length)throw\"Unexpected end of mask RLE encoding\";B.mask.bitset=E,I+=B.mask.numBytes}else 0==(B.mask.numBytes|B.mask.numBlocksY|B.mask.maxValue)&&(B.mask.bitset=new Uint8Array(Math.ceil(B.width*B.height/8)));Q=new DataView(A,I,16),B.pixels={},B.pixels.numBlocksY=Q.getUint32(0,!0),B.pixels.numBlocksX=Q.getUint32(4,!0),B.pixels.numBytes=Q.getUint32(8,!0),B.pixels.maxValue=Q.getFloat32(12,!0),I+=16;var a=B.pixels.numBlocksX,r=B.pixels.numBlocksY,s=a+(B.width%a>0?1:0),n=r+(B.height%r>0?1:0);B.pixels.blocks=new Array(s*n);for(var D=0,w=0;w<n;w++)for(var h=0;h<s;h++){var y=0,c=A.byteLength-I;Q=new DataView(A,I,Math.min(10,c));var G={};B.pixels.blocks[D++]=G;var S=Q.getUint8(0);if(y++,G.encoding=63&S,G.encoding>3)throw\"Invalid block encoding (\"+G.encoding+\")\";if(2!==G.encoding){if(0!==S&&2!==S){if(S>>=6,G.offsetType=S,2===S)G.offset=Q.getInt8(1),y++;else if(1===S)G.offset=Q.getInt16(1,!0),y+=2;else{if(0!==S)throw\"Invalid block offset type\";G.offset=Q.getFloat32(1,!0),y+=4}if(1===G.encoding)if(S=Q.getUint8(y),y++,G.bitsPerPixel=63&S,S>>=6,G.numValidPixelsType=S,2===S)G.numValidPixels=Q.getUint8(y),y++;else if(1===S)G.numValidPixels=Q.getUint16(y,!0),y+=2;else{if(0!==S)throw\"Invalid valid pixel count type\";G.numValidPixels=Q.getUint32(y,!0),y+=4}}var N;if(I+=y,3!==G.encoding)if(0===G.encoding){var F=(B.pixels.numBytes-1)/4;if(F!==Math.floor(F))throw\"uncompressed block has invalid length\";N=new ArrayBuffer(4*F),new Uint8Array(N).set(new Uint8Array(A,I,4*F));var f=new Float32Array(N);G.rawData=f,I+=4*F}else if(1===G.encoding){var k=Math.ceil(G.numValidPixels*G.bitsPerPixel/8),R=Math.ceil(k/4);N=new ArrayBuffer(4*R),new Uint8Array(N).set(new Uint8Array(A,I,k)),G.stuffedData=new Uint32Array(N),I+=k}}else I++}return B.eofOffset=I,B},Q=function(A,I,g,B,C,Q,E){var i,o,e,t=(1<<I)-1,a=0,r=0,s=Math.ceil((E-B)/C),n=4*A.length-Math.ceil(I*g/8);for(A[A.length-1]<<=8*n,i=0;i<g;i++){if(0===r&&(e=A[a++],r=32),r>=I)o=e>>>r-I&t,r-=I;else{var D=I-r;o=(e&t)<<D&t,o+=(e=A[a++])>>>(r=32-D)}Q[i]=o<s?B+o*C:E}return Q},A),h=(E=function(A,I,g,B,C,Q,E,i){var o,e,t,a,r,s=(1<<g)-1,n=0,D=0,w=4*A.length-Math.ceil(g*B/8);if(A[A.length-1]<<=8*w,C)for(o=0;o<B;o++)0===D&&(t=A[n++],D=32),D>=g?(e=t>>>D-g&s,D-=g):(e=(t&s)<<(a=g-D)&s,e+=(t=A[n++])>>>(D=32-a)),I[o]=C[e];else for(r=Math.ceil((i-Q)/E),o=0;o<B;o++)0===D&&(t=A[n++],D=32),D>=g?(e=t>>>D-g&s,D-=g):(e=(t&s)<<(a=g-D)&s,e+=(t=A[n++])>>>(D=32-a)),I[o]=e<r?Q+e*E:i},i=function(A,I,g,B,C,Q){var E,i=(1<<I)-1,o=0,e=0,t=0,a=0,r=0,s=[],n=4*A.length-Math.ceil(I*g/8);A[A.length-1]<<=8*n;var D=Math.ceil((Q-B)/C);for(e=0;e<g;e++)0===a&&(E=A[o++],a=32),a>=I?(r=E>>>a-I&i,a-=I):(r=(E&i)<<(t=I-a)&i,r+=(E=A[o++])>>>(a=32-t)),s[e]=r<D?B+r*C:Q;return s.unshift(B),s},o=function(A,I,g,B,C,Q,E,i){var o,e,t,a,r=(1<<g)-1,s=0,n=0,D=0;if(C)for(o=0;o<B;o++)0===n&&(t=A[s++],n=32,D=0),n>=g?(e=t>>>D&r,n-=g,D+=g):(e=t>>>D&r,n=32-(a=g-n),e|=((t=A[s++])&(1<<a)-1)<<g-a,D=a),I[o]=C[e];else{var w=Math.ceil((i-Q)/E);for(o=0;o<B;o++)0===n&&(t=A[s++],n=32,D=0),n>=g?(e=t>>>D&r,n-=g,D+=g):(e=t>>>D&r,n=32-(a=g-n),e|=((t=A[s++])&(1<<a)-1)<<g-a,D=a),I[o]=e<w?Q+e*E:i}return I},e=function(A,I,g,B,C,Q){var E,i=(1<<I)-1,o=0,e=0,t=0,a=0,r=0,s=0,n=[],D=Math.ceil((Q-B)/C);for(e=0;e<g;e++)0===a&&(E=A[o++],a=32,s=0),a>=I?(r=E>>>s&i,a-=I,s+=I):(r=E>>>s&i,a=32-(t=I-a),r|=((E=A[o++])&(1<<t)-1)<<I-t,s=t),n[e]=r<D?B+r*C:Q;return n.unshift(B),n},t=function(A,I,g,B){var C,Q,E,i,o=(1<<g)-1,e=0,t=0,a=4*A.length-Math.ceil(g*B/8);for(A[A.length-1]<<=8*a,C=0;C<B;C++)0===t&&(E=A[e++],t=32),t>=g?(Q=E>>>t-g&o,t-=g):(Q=(E&o)<<(i=g-t)&o,Q+=(E=A[e++])>>>(t=32-i)),I[C]=Q;return I},a=function(A,I,g,B){var C,Q,E,i,o=(1<<g)-1,e=0,t=0,a=0;for(C=0;C<B;C++)0===t&&(E=A[e++],t=32,a=0),t>=g?(Q=E>>>a&o,t-=g,a+=g):(Q=E>>>a&o,t=32-(i=g-t),Q|=((E=A[e++])&(1<<i)-1)<<g-i,a=i),I[C]=Q;return I},r={HUFFMAN_LUT_BITS_MAX:12,computeChecksumFletcher32:function(A){for(var I=65535,g=65535,B=A.length,C=Math.floor(B/2),Q=0;C;){var E=C>=359?359:C;C-=E;do{I+=A[Q++]<<8,g+=I+=A[Q++]}while(--E);I=(65535&I)+(I>>>16),g=(65535&g)+(g>>>16)}return 1&B&&(g+=I+=A[Q]<<8),((g=(65535&g)+(g>>>16))<<16|(I=(65535&I)+(I>>>16)))>>>0},readHeaderInfo:function(A,I){var g=I.ptr,B=new Uint8Array(A,g,6),C={};if(C.fileIdentifierString=String.fromCharCode.apply(null,B),0!==C.fileIdentifierString.lastIndexOf(\"Lerc2\",0))throw\"Unexpected file identifier string (expect Lerc2 ): \"+C.fileIdentifierString;g+=6;var Q,E=new DataView(A,g,8),i=E.getInt32(0,!0);if(C.fileVersion=i,g+=4,i>=3&&(C.checksum=E.getUint32(4,!0),g+=4),E=new DataView(A,g,12),C.height=E.getUint32(0,!0),C.width=E.getUint32(4,!0),g+=8,i>=4?(C.numDims=E.getUint32(8,!0),g+=4):C.numDims=1,E=new DataView(A,g,40),C.numValidPixel=E.getUint32(0,!0),C.microBlockSize=E.getInt32(4,!0),C.blobSize=E.getInt32(8,!0),C.imageType=E.getInt32(12,!0),C.maxZError=E.getFloat64(16,!0),C.zMin=E.getFloat64(24,!0),C.zMax=E.getFloat64(32,!0),g+=40,I.headerInfo=C,I.ptr=g,i>=3&&(Q=i>=4?52:48,this.computeChecksumFletcher32(new Uint8Array(A,g-Q,C.blobSize-14))!==C.checksum))throw\"Checksum failed.\";return!0},checkMinMaxRanges:function(A,I){var g=I.headerInfo,B=this.getDataTypeArray(g.imageType),C=g.numDims*this.getDataTypeSize(g.imageType),Q=this.readSubArray(A,I.ptr,B,C),E=this.readSubArray(A,I.ptr+C,B,C);I.ptr+=2*C;var i,o=!0;for(i=0;i<g.numDims;i++)if(Q[i]!==E[i]){o=!1;break}return g.minValues=Q,g.maxValues=E,o},readSubArray:function(A,I,g,B){var C;if(g===Uint8Array)C=new Uint8Array(A,I,B);else{var Q=new ArrayBuffer(B);new Uint8Array(Q).set(new Uint8Array(A,I,B)),C=new g(Q)}return C},readMask:function(A,I){var g,B,C=I.ptr,Q=I.headerInfo,E=Q.width*Q.height,i=Q.numValidPixel,o=new DataView(A,C,4),e={};if(e.numBytes=o.getUint32(0,!0),C+=4,(0===i||E===i)&&0!==e.numBytes)throw\"invalid mask\";if(0===i)g=new Uint8Array(Math.ceil(E/8)),e.bitset=g,B=new Uint8Array(E),I.pixels.resultMask=B,C+=e.numBytes;else if(e.numBytes>0){g=new Uint8Array(Math.ceil(E/8));var t=(o=new DataView(A,C,e.numBytes)).getInt16(0,!0),a=2,r=0,s=0;do{if(t>0)for(;t--;)g[r++]=o.getUint8(a++);else for(s=o.getUint8(a++),t=-t;t--;)g[r++]=s;t=o.getInt16(a,!0),a+=2}while(a<e.numBytes);if(-32768!==t||r<g.length)throw\"Unexpected end of mask RLE encoding\";B=new Uint8Array(E);var n=0,D=0;for(D=0;D<E;D++)7&D?(n=g[D>>3],n<<=7&D):n=g[D>>3],128&n&&(B[D]=1);I.pixels.resultMask=B,e.bitset=g,C+=e.numBytes}return I.ptr=C,I.mask=e,!0},readDataOneSweep:function(A,I,g,B){var C,Q=I.ptr,E=I.headerInfo,i=E.numDims,o=E.width*E.height,e=E.imageType,t=E.numValidPixel*r.getDataTypeSize(e)*i,a=I.pixels.resultMask;if(g===Uint8Array)C=new Uint8Array(A,Q,t);else{var s=new ArrayBuffer(t);new Uint8Array(s).set(new Uint8Array(A,Q,t)),C=new g(s)}if(C.length===o*i)I.pixels.resultPixels=B?r.swapDimensionOrder(C,o,i,g,!0):C;else{I.pixels.resultPixels=new g(o*i);var n=0,D=0,w=0,h=0;if(i>1){if(B){for(D=0;D<o;D++)if(a[D])for(h=D,w=0;w<i;w++,h+=o)I.pixels.resultPixels[h]=C[n++]}else for(D=0;D<o;D++)if(a[D])for(h=D*i,w=0;w<i;w++)I.pixels.resultPixels[h+w]=C[n++]}else for(D=0;D<o;D++)a[D]&&(I.pixels.resultPixels[D]=C[n++])}return Q+=t,I.ptr=Q,!0},readHuffmanTree:function(A,I){var g=this.HUFFMAN_LUT_BITS_MAX,B=new DataView(A,I.ptr,16);if(I.ptr+=16,B.getInt32(0,!0)<2)throw\"unsupported Huffman version\";var C=B.getInt32(4,!0),Q=B.getInt32(8,!0),E=B.getInt32(12,!0);if(Q>=E)return!1;var i=new Uint32Array(E-Q);r.decodeBits(A,I,i);var o,e,t,a,n=[];for(o=Q;o<E;o++)n[e=o-(o<C?0:C)]={first:i[o-Q],second:null};var D=A.byteLength-I.ptr,w=Math.ceil(D/4),h=new ArrayBuffer(4*w);new Uint8Array(h).set(new Uint8Array(A,I.ptr,D));var y,c=new Uint32Array(h),G=0,S=0;for(y=c[0],o=Q;o<E;o++)(a=n[e=o-(o<C?0:C)].first)>0&&(n[e].second=y<<G>>>32-a,32-G>=a?32===(G+=a)&&(G=0,y=c[++S]):(G+=a-32,y=c[++S],n[e].second|=y>>>32-G));var N=0,F=0,f=new s;for(o=0;o<n.length;o++)void 0!==n[o]&&(N=Math.max(N,n[o].first));F=N>=g?g:N;var k,R,L,U,u,Y=[];for(o=Q;o<E;o++)if((a=n[e=o-(o<C?0:C)].first)>0)if(k=[a,e],a<=F)for(R=n[e].second<<F-a,L=1<<F-a,t=0;t<L;t++)Y[R|t]=k;else for(R=n[e].second,u=f,U=a-1;U>=0;U--)R>>>U&1?(u.right||(u.right=new s),u=u.right):(u.left||(u.left=new s),u=u.left),0!==U||u.val||(u.val=k[1]);return{decodeLut:Y,numBitsLUTQick:F,numBitsLUT:N,tree:f,stuffedData:c,srcPtr:S,bitPos:G}},readHuffman:function(A,I,g,B){var C,Q,E,i,o,e,t,a,s,n=I.headerInfo.numDims,D=I.headerInfo.height,w=I.headerInfo.width,h=w*D,y=this.readHuffmanTree(A,I),c=y.decodeLut,G=y.tree,S=y.stuffedData,N=y.srcPtr,F=y.bitPos,f=y.numBitsLUTQick,k=y.numBitsLUT,R=0===I.headerInfo.imageType?128:0,L=I.pixels.resultMask,U=0;F>0&&(N++,F=0);var u,Y=S[N],d=1===I.encodeMode,l=new g(h*n),K=l;if(n<2||d){for(u=0;u<n;u++)if(n>1&&(K=new g(l.buffer,h*u,h),U=0),I.headerInfo.numValidPixel===w*D)for(a=0,e=0;e<D;e++)for(t=0;t<w;t++,a++){if(Q=0,o=i=Y<<F>>>32-f,32-F<f&&(o=i|=S[N+1]>>>64-F-f),c[o])Q=c[o][1],F+=c[o][0];else for(o=i=Y<<F>>>32-k,32-F<k&&(o=i|=S[N+1]>>>64-F-k),C=G,s=0;s<k;s++)if(!(C=i>>>k-s-1&1?C.right:C.left).left&&!C.right){Q=C.val,F=F+s+1;break}F>=32&&(F-=32,Y=S[++N]),E=Q-R,d?(E+=t>0?U:e>0?K[a-w]:U,E&=255,K[a]=E,U=E):K[a]=E}else for(a=0,e=0;e<D;e++)for(t=0;t<w;t++,a++)if(L[a]){if(Q=0,o=i=Y<<F>>>32-f,32-F<f&&(o=i|=S[N+1]>>>64-F-f),c[o])Q=c[o][1],F+=c[o][0];else for(o=i=Y<<F>>>32-k,32-F<k&&(o=i|=S[N+1]>>>64-F-k),C=G,s=0;s<k;s++)if(!(C=i>>>k-s-1&1?C.right:C.left).left&&!C.right){Q=C.val,F=F+s+1;break}F>=32&&(F-=32,Y=S[++N]),E=Q-R,d?(t>0&&L[a-1]?E+=U:e>0&&L[a-w]?E+=K[a-w]:E+=U,E&=255,K[a]=E,U=E):K[a]=E}}else for(a=0,e=0;e<D;e++)for(t=0;t<w;t++)if(a=e*w+t,!L||L[a])for(u=0;u<n;u++,a+=h){if(Q=0,o=i=Y<<F>>>32-f,32-F<f&&(o=i|=S[N+1]>>>64-F-f),c[o])Q=c[o][1],F+=c[o][0];else for(o=i=Y<<F>>>32-k,32-F<k&&(o=i|=S[N+1]>>>64-F-k),C=G,s=0;s<k;s++)if(!(C=i>>>k-s-1&1?C.right:C.left).left&&!C.right){Q=C.val,F=F+s+1;break}F>=32&&(F-=32,Y=S[++N]),E=Q-R,K[a]=E}I.ptr=I.ptr+4*(N+1)+(F>0?4:0),I.pixels.resultPixels=l,n>1&&!B&&(I.pixels.resultPixels=r.swapDimensionOrder(l,h,n,g))},decodeBits:function(A,I,g,B,C){var Q=I.headerInfo,r=Q.fileVersion,s=0,n=A.byteLength-I.ptr>=5?5:A.byteLength-I.ptr,D=new DataView(A,I.ptr,n),w=D.getUint8(0);s++;var h=w>>6,y=0===h?4:3-h,c=(32&w)>0,G=31&w,S=0;if(1===y)S=D.getUint8(s),s++;else if(2===y)S=D.getUint16(s,!0),s+=2;else{if(4!==y)throw\"Invalid valid pixel count type\";S=D.getUint32(s,!0),s+=4}var N,F,f,k,R,L,U,u,Y,d=2*Q.maxZError,l=Q.numDims>1?Q.maxValues[C]:Q.zMax;if(c){for(I.counter.lut++,u=D.getUint8(s),s++,k=Math.ceil((u-1)*G/8),R=Math.ceil(k/4),F=new ArrayBuffer(4*R),f=new Uint8Array(F),I.ptr+=s,f.set(new Uint8Array(A,I.ptr,k)),U=new Uint32Array(F),I.ptr+=k,Y=0;u-1>>>Y;)Y++;k=Math.ceil(S*Y/8),R=Math.ceil(k/4),F=new ArrayBuffer(4*R),(f=new Uint8Array(F)).set(new Uint8Array(A,I.ptr,k)),N=new Uint32Array(F),I.ptr+=k,L=r>=3?e(U,G,u-1,B,d,l):i(U,G,u-1,B,d,l),r>=3?o(N,g,Y,S,L):E(N,g,Y,S,L)}else I.counter.bitstuffer++,Y=G,I.ptr+=s,Y>0&&(k=Math.ceil(S*Y/8),R=Math.ceil(k/4),F=new ArrayBuffer(4*R),(f=new Uint8Array(F)).set(new Uint8Array(A,I.ptr,k)),N=new Uint32Array(F),I.ptr+=k,r>=3?null==B?a(N,g,Y,S):o(N,g,Y,S,!1,B,d,l):null==B?t(N,g,Y,S):E(N,g,Y,S,!1,B,d,l))},readTiles:function(A,I,g,B){var C=I.headerInfo,Q=C.width,E=C.height,i=Q*E,o=C.microBlockSize,e=C.imageType,t=r.getDataTypeSize(e),a=Math.ceil(Q/o),s=Math.ceil(E/o);I.pixels.numBlocksY=s,I.pixels.numBlocksX=a,I.pixels.ptr=0;var n,D,w,h,y,c,G,S,N,F,f=0,k=0,R=0,L=0,U=0,u=0,Y=0,d=0,l=0,K=0,M=0,J=0,H=0,p=0,q=0,m=new g(o*o),b=E%o||o,x=Q%o||o,v=C.numDims,O=I.pixels.resultMask,T=I.pixels.resultPixels,P=C.fileVersion>=5?14:15,Z=C.zMax;for(R=0;R<s;R++)for(U=R!==s-1?o:b,L=0;L<a;L++)for(K=R*Q*o+L*o,M=Q-(u=L!==a-1?o:x),S=0;S<v;S++){if(v>1?(F=T,K=R*Q*o+L*o,T=new g(I.pixels.resultPixels.buffer,i*S*t,i),Z=C.maxValues[S]):F=null,Y=A.byteLength-I.ptr,D={},q=0,d=(n=new DataView(A,I.ptr,Math.min(10,Y))).getUint8(0),q++,N=C.fileVersion>=5?4&d:0,l=d>>6&255,(d>>2&P)!=(L*o>>3&P))throw\"integrity issue\";if(N&&0===S)throw\"integrity issue\";if((y=3&d)>3)throw I.ptr+=q,\"Invalid block encoding (\"+y+\")\";if(2!==y)if(0===y){if(N)throw\"integrity issue\";if(I.counter.uncompressed++,I.ptr+=q,J=(J=U*u*t)<(H=A.byteLength-I.ptr)?J:H,w=new ArrayBuffer(J%t==0?J:J+t-J%t),new Uint8Array(w).set(new Uint8Array(A,I.ptr,J)),h=new g(w),p=0,O)for(f=0;f<U;f++){for(k=0;k<u;k++)O[K]&&(T[K]=h[p++]),K++;K+=M}else for(f=0;f<U;f++){for(k=0;k<u;k++)T[K++]=h[p++];K+=M}I.ptr+=p*t}else if(c=r.getDataTypeUsed(N&&e<6?4:e,l),G=r.getOnePixel(D,q,c,n),q+=r.getDataTypeSize(c),3===y)if(I.ptr+=q,I.counter.constantoffset++,O)for(f=0;f<U;f++){for(k=0;k<u;k++)O[K]&&(T[K]=N?Math.min(Z,F[K]+G):G),K++;K+=M}else for(f=0;f<U;f++){for(k=0;k<u;k++)T[K]=N?Math.min(Z,F[K]+G):G,K++;K+=M}else if(I.ptr+=q,r.decodeBits(A,I,m,G,S),q=0,N)if(O)for(f=0;f<U;f++){for(k=0;k<u;k++)O[K]&&(T[K]=m[q++]+F[K]),K++;K+=M}else for(f=0;f<U;f++){for(k=0;k<u;k++)T[K]=m[q++]+F[K],K++;K+=M}else if(O)for(f=0;f<U;f++){for(k=0;k<u;k++)O[K]&&(T[K]=m[q++]),K++;K+=M}else for(f=0;f<U;f++){for(k=0;k<u;k++)T[K++]=m[q++];K+=M}else{if(N)if(O)for(f=0;f<U;f++)for(k=0;k<u;k++)O[K]&&(T[K]=F[K]),K++;else for(f=0;f<U;f++)for(k=0;k<u;k++)T[K]=F[K],K++;I.counter.constant++,I.ptr+=q}}v>1&&!B&&(I.pixels.resultPixels=r.swapDimensionOrder(I.pixels.resultPixels,i,v,g))},formatFileInfo:function(A){return{fileIdentifierString:A.headerInfo.fileIdentifierString,fileVersion:A.headerInfo.fileVersion,imageType:A.headerInfo.imageType,height:A.headerInfo.height,width:A.headerInfo.width,numValidPixel:A.headerInfo.numValidPixel,microBlockSize:A.headerInfo.microBlockSize,blobSize:A.headerInfo.blobSize,maxZError:A.headerInfo.maxZError,pixelType:r.getPixelType(A.headerInfo.imageType),eofOffset:A.eofOffset,mask:A.mask?{numBytes:A.mask.numBytes}:null,pixels:{numBlocksX:A.pixels.numBlocksX,numBlocksY:A.pixels.numBlocksY,maxValue:A.headerInfo.zMax,minValue:A.headerInfo.zMin,noDataValue:A.noDataValue}}},constructConstantSurface:function(A,I){var g=A.headerInfo.zMax,B=A.headerInfo.zMin,C=A.headerInfo.maxValues,Q=A.headerInfo.numDims,E=A.headerInfo.height*A.headerInfo.width,i=0,o=0,e=0,t=A.pixels.resultMask,a=A.pixels.resultPixels;if(t)if(Q>1){if(I)for(i=0;i<Q;i++)for(e=i*E,g=C[i],o=0;o<E;o++)t[o]&&(a[e+o]=g);else for(o=0;o<E;o++)if(t[o])for(e=o*Q,i=0;i<Q;i++)a[e+Q]=C[i]}else for(o=0;o<E;o++)t[o]&&(a[o]=g);else if(Q>1&&B!==g)if(I)for(i=0;i<Q;i++)for(e=i*E,g=C[i],o=0;o<E;o++)a[e+o]=g;else for(o=0;o<E;o++)for(e=o*Q,i=0;i<Q;i++)a[e+i]=C[i];else for(o=0;o<E*Q;o++)a[o]=g},getDataTypeArray:function(A){var I;switch(A){case 0:I=Int8Array;break;case 1:I=Uint8Array;break;case 2:I=Int16Array;break;case 3:I=Uint16Array;break;case 4:I=Int32Array;break;case 5:I=Uint32Array;break;case 6:default:I=Float32Array;break;case 7:I=Float64Array}return I},getPixelType:function(A){var I;switch(A){case 0:I=\"S8\";break;case 1:I=\"U8\";break;case 2:I=\"S16\";break;case 3:I=\"U16\";break;case 4:I=\"S32\";break;case 5:I=\"U32\";break;case 6:default:I=\"F32\";break;case 7:I=\"F64\"}return I},isValidPixelValue:function(A,I){if(null==I)return!1;var g;switch(A){case 0:g=I>=-128&&I<=127;break;case 1:g=I>=0&&I<=255;break;case 2:g=I>=-32768&&I<=32767;break;case 3:g=I>=0&&I<=65536;break;case 4:g=I>=-2147483648&&I<=2147483647;break;case 5:g=I>=0&&I<=4294967296;break;case 6:g=I>=-34027999387901484e22&&I<=34027999387901484e22;break;case 7:g=I>=-17976931348623157e292&&I<=17976931348623157e292;break;default:g=!1}return g},getDataTypeSize:function(A){var I=0;switch(A){case 0:case 1:I=1;break;case 2:case 3:I=2;break;case 4:case 5:case 6:I=4;break;case 7:I=8;break;default:I=A}return I},getDataTypeUsed:function(A,I){var g=A;switch(A){case 2:case 4:g=A-I;break;case 3:case 5:g=A-2*I;break;case 6:g=0===I?A:1===I?2:1;break;case 7:g=0===I?A:A-2*I+1;break;default:g=A}return g},getOnePixel:function(A,I,g,B){var C=0;switch(g){case 0:C=B.getInt8(I);break;case 1:C=B.getUint8(I);break;case 2:C=B.getInt16(I,!0);break;case 3:C=B.getUint16(I,!0);break;case 4:C=B.getInt32(I,!0);break;case 5:C=B.getUInt32(I,!0);break;case 6:C=B.getFloat32(I,!0);break;case 7:C=B.getFloat64(I,!0);break;default:throw\"the decoder does not understand this pixel type\"}return C},swapDimensionOrder:function(A,I,g,B,C){var Q=0,E=0,i=0,o=0,e=A;if(g>1)if(e=new B(I*g),C)for(Q=0;Q<I;Q++)for(o=Q,i=0;i<g;i++,o+=I)e[o]=A[E++];else for(Q=0;Q<I;Q++)for(o=Q,i=0;i<g;i++,o+=I)e[E++]=A[o];return e}},s=function(A,I,g){this.val=A,this.left=I,this.right=g},{decode:function(A,I){var g=(I=I||{}).noDataValue,B=0,C={};C.ptr=I.inputOffset||0,C.pixels={},r.readHeaderInfo(A,C);var Q=C.headerInfo,E=Q.fileVersion,i=r.getDataTypeArray(Q.imageType);if(E>5)throw\"unsupported lerc version 2.\"+E;r.readMask(A,C),Q.numValidPixel===Q.width*Q.height||C.pixels.resultMask||(C.pixels.resultMask=I.maskData);var o=Q.width*Q.height;C.pixels.resultPixels=new i(o*Q.numDims),C.counter={onesweep:0,uncompressed:0,lut:0,bitstuffer:0,constant:0,constantoffset:0};var e,t=!I.returnPixelInterleavedDims;if(0!==Q.numValidPixel)if(Q.zMax===Q.zMin)r.constructConstantSurface(C,t);else if(E>=4&&r.checkMinMaxRanges(A,C))r.constructConstantSurface(C,t);else{var a=new DataView(A,C.ptr,2),s=a.getUint8(0);if(C.ptr++,s)r.readDataOneSweep(A,C,i,t);else if(E>1&&Q.imageType<=1&&Math.abs(Q.maxZError-.5)<1e-5){var n=a.getUint8(1);if(C.ptr++,C.encodeMode=n,n>2||E<4&&n>1)throw\"Invalid Huffman flag \"+n;n?r.readHuffman(A,C,i,t):r.readTiles(A,C,i,t)}else r.readTiles(A,C,i,t)}C.eofOffset=C.ptr,I.inputOffset?(e=C.headerInfo.blobSize+I.inputOffset-C.ptr,Math.abs(e)>=1&&(C.eofOffset=I.inputOffset+C.headerInfo.blobSize)):(e=C.headerInfo.blobSize-C.ptr,Math.abs(e)>=1&&(C.eofOffset=C.headerInfo.blobSize));var D={width:Q.width,height:Q.height,pixelData:C.pixels.resultPixels,minValue:Q.zMin,maxValue:Q.zMax,validPixelCount:Q.numValidPixel,dimCount:Q.numDims,dimStats:{minValues:Q.minValues,maxValues:Q.maxValues},maskData:C.pixels.resultMask};if(C.pixels.resultMask&&r.isValidPixelValue(Q.imageType,g)){var w=C.pixels.resultMask;for(B=0;B<o;B++)w[B]||(D.pixelData[B]=g);D.noDataValue=g}return C.noDataValue=g,I.returnFileInfo&&(D.fileInfo=r.formatFileInfo(C)),D},getBandCount:function(A){for(var I=0,g=0,B={ptr:0,pixels:{}};g<A.byteLength-58;)r.readHeaderInfo(A,B),g+=B.headerInfo.blobSize,I++,B.ptr=g;return I}}),y=(n=new ArrayBuffer(4),D=new Uint8Array(n),new Uint32Array(n)[0]=1,1===D[0]),c={decode:function(A,I){if(!y)throw\"Big endian system is not supported.\";var g,B,C=(I=I||{}).inputOffset||0,Q=new Uint8Array(A,C,10),E=String.fromCharCode.apply(null,Q);if(\"CntZImage\"===E.trim())g=w,B=1;else{if(\"Lerc2\"!==E.substring(0,5))throw\"Unexpected file identifier string: \"+E;g=h,B=2}for(var i,o,e,t,a,r,s=0,n=A.byteLength-10,D=[],c={width:0,height:0,pixels:[],pixelType:I.pixelType,mask:null,statistics:[]},G=0;C<n;){var S=g.decode(A,{inputOffset:C,encodedMaskData:i,maskData:e,returnMask:0===s,returnEncodedMask:0===s,returnFileInfo:!0,returnPixelInterleavedDims:I.returnPixelInterleavedDims,pixelType:I.pixelType||null,noDataValue:I.noDataValue||null});C=S.fileInfo.eofOffset,e=S.maskData,0===s&&(i=S.encodedMaskData,c.width=S.width,c.height=S.height,c.dimCount=S.dimCount||1,c.pixelType=S.pixelType||S.fileInfo.pixelType,c.mask=e),B>1&&(e&&D.push(e),S.fileInfo.mask&&S.fileInfo.mask.numBytes>0&&G++),s++,c.pixels.push(S.pixelData),c.statistics.push({minValue:S.minValue,maxValue:S.maxValue,noDataValue:S.noDataValue,dimStats:S.dimStats})}if(B>1&&G>1){for(r=c.width*c.height,c.bandMasks=D,(e=new Uint8Array(r)).set(D[0]),t=1;t<D.length;t++)for(o=D[t],a=0;a<r;a++)e[a]=e[a]&o[a];c.maskData=e}return c}};XA.exports?XA.exports=c:this.Lerc=c}();var II,gI,BI,CI=AI.exports,QI={env:{emscripten_notify_memory_growth:function(A){BI=new Uint8Array(gI.exports.memory.buffer)}}},EI=function(){function A(){w(this,A)}return y(A,[{key:\"init\",value:function(){return II||(II=\"undefined\"!=typeof fetch?fetch(\"data:application/wasm;base64,\".concat(iI)).then((function(A){return A.arrayBuffer()})).then((function(A){return WebAssembly.instantiate(A,QI)})).then(this._init):WebAssembly.instantiate(Buffer.from(iI,\"base64\"),QI).then(this._init))}},{key:\"_init\",value:function(A){gI=A.instance,QI.env.emscripten_notify_memory_growth(0)}},{key:\"decode\",value:function(A){var I=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(!gI)throw new Error(\"ZSTDDecoder: Await .init() before decoding.\");var g=A.byteLength,B=gI.exports.malloc(g);BI.set(A,B),I=I||Number(gI.exports.ZSTD_findDecompressedSize(B,g));var C=gI.exports.malloc(I),Q=gI.exports.ZSTD_decompress(C,I,B,g),E=BI.slice(C,C+Q);return gI.exports.free(B),gI.exports.free(C),E}}]),A}(),iI=\"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AikACDcACCAHIDo3AAAgEUEZSA0BIARBGGohBANAIAIpABAhOiAEIAIpABg3AAggBCA6NwAAIAIpACAhOiAEIAIpACg3ABggBCA6NwAQIAJBIGohAiAEQSBqIgQgCkkNAAsMAQsCQAJAIAUoAswCIhEgBUHgAWogJUEHcUEMbGoiDygCACICaiIHIBxLDQAgCSAPKAIEIgogAmoiBmogG0sNACAGQSBqIBQgCWtNDQELIAUgDygCCDYCoAEgBSAPKQIANwOYASAJIBQgBUGYAWogBUHMAmogHCALIBcgIhAgIQYMAQsgAiAJaiEEIA8oAgghFSARKQAAITogCSARKQAINwAIIAkgOjcAAAJAIAJBEUkNACARKQAQITogCSARKQAYNwAYIAkgOjcAECACQRBrQRFIDQAgEUEQaiECIAlBIGohEgNAIAIpABAhOiASIAIpABg3AAggEiA6NwAAIAIpACAhOiASIAIpACg3ABggEiA6NwAQIAJBIGohAiASQSBqIhIgBEkNAAsLIAQgFWshAiAFIAc2AswCIAQgC2sgFUkEQCAVIAQgF2tLDQwgIiAiIAIgC2siD2oiByAKak8EQCAKRQ0CIAQgByAK/AoAAAwCC0EAIA9rIgIEQCAEIAcgAvwKAAALIAogD2ohCiAEIA9rIQQgCyECCyAVQRBPBEAgAikAACE6IAQgAikACDcACCAEIDo3AAAgCkERSA0BIAQgCmohByAEQRBqIQQDQCACKQAQITogBCACKQAYNwAIIAQgOjcAACACKQAgITogBCACKQAoNwAYIAQgOjcAECACQSBqIQIgBEEgaiIEIAdJDQALDAELAkAgFUEHTQRAIAQgAi0AADoAACAEIAItAAE6AAEgBCACLQACOgACIAQgAi0AAzoAAyAEIAIgFUECdCIHQeAaaigCAGoiAigAADYABCACIAdBgBtqKAIAayECDAELIAQgAikAADcAAAsgCkEJSQ0AIAQgCmohDyAEQQhqIgcgAkEIaiICa0EPTARAA0AgByACKQAANwAAIAJBCGohAiAHQQhqIgcgD0kNAAwCCwALIAIpAAAhOiAHIAIpAAg3AAggByA6NwAAIApBGUgNACAEQRhqIQQDQCACKQAQITogBCACKQAYNwAIIAQgOjcAACACKQAgITogBCACKQAoNwAYIAQgOjcAECACQSBqIQIgBEEgaiIEIA9JDQALCyAGQYh/SwRAIAYhAwwLCyAFQeABaiAlQQdxQQxsaiICIA02AgggAiAMNgIEIAIgEDYCAAsgBiAJaiEJICVBAWohJSAQIC1qIAxqIS0MAQsLIAUoArABIAUoArQBRw0HIAUoAqwBQSBHDQcgDiAoayEQA0ACQCAOIBBMBEBBACECA0AgAkEDRg0CIDIgAkECdCIDaiADICZqKAIANgIAIAJBAWohAgwACwALIAVB4AFqIBBBB3FBDGxqIQoCfwJAIAgoAoTsAUECRgRAIAUoAswCIg8gCigCACIEaiIHIAgoAoDsASICSwRAIAIgD0cEQCACIA9rIgIgFCAJa0sNCyAJIA8gAhAfIAogBCACayIENgIAIAIgCWohCQsgBSAWNgLMAiAIQQA2AoTsAQJAAkACQCAEQYCABEoNACAJIAooAgQiDSAEaiIGaiAbSw0AIAZBIGogFCAJa00NAQsgBSAKKAIINgJQIAUgCikCADcDSCAJIBQgBUHIAGogBUHMAmogGSALIBcgIhAgIQYMAQsgBCAWaiEHIAQgCWohDCAKKAIIIQogFikAACE6IAkgFikACDcACCAJIDo3AAACQCAEQRFJDQAgHikAACE6IAkgHikACDcAGCAJIDo3ABAgBEEQa0ERSA0AIAlBIGohAiAeIQQDQCAEKQAQITogAiAEKQAYNwAIIAIgOjcAACAEKQAgITogAiAEKQAoNwAYIAIgOjcAECAEQSBqIQQgAkEgaiICIAxJDQALCyAMIAprIQIgBSAHNgLMAiAMIAtrIApJBEAgCiAMIBdrSw0PICIgIiACIAtrIgdqIgQgDWpPBEAgDUUNAiAMIAQgDfwKAAAMAgtBACAHayICBEAgDCAEIAL8CgAACyAHIA1qIQ0gDCAHayEMIAshAgsgCkEQTwRAIAIpAAAhOiAMIAIpAAg3AAggDCA6NwAAIA1BEUgNASAMIA1qIQcgDEEQaiEEA0AgAikAECE6IAQgAikAGDcACCAEIDo3AAAgAikAICE6IAQgAikAKDcAGCAEIDo3ABAgAkEgaiECIARBIGoiBCAHSQ0ACwwBCwJAIApBB00EQCAMIAItAAA6AAAgDCACLQABOgABIAwgAi0AAjoAAiAMIAItAAM6AAMgDCACIApBAnQiBEHgGmooAgBqIgIoAAA2AAQgAiAEQYAbaigCAGshAgwBCyAMIAIpAAA3AAALIA1BCUkNACAMIA1qIQcgDEEIaiIEIAJBCGoiAmtBD0wEQANAIAQgAikAADcAACACQQhqIQIgBEEIaiIEIAdJDQAMAgsACyACKQAAITogBCACKQAINwAIIAQgOjcAACANQRlIDQAgDEEYaiEEA0AgAikAECE6IAQgAikAGDcACCAEIDo3AAAgAikAICE6IAQgAikAKDcAGCAEIDo3ABAgAkEgaiECIARBIGoiBCAHSQ0ACwsgBkGJf08EQCAGIQMMDgsgGSEcIAYgCWoMAwsgB0EgayECAkACQCAHIBxLDQAgCSAKKAIEIhIgBGoiDGogAksNACAMQSBqIBQgCWtNDQELIAUgCigCCDYCYCAFIAopAgA3A1ggCSAUIAIgBUHYAGogBUHMAmogHCALIBcgIhAhIQwMAgsgBCAJaiEGIAooAgghCiAPKQAAITogCSAPKQAINwAIIAkgOjcAAAJAIARBEUkNACAPKQAQITogCSAPKQAYNwAYIAkgOjcAECAEQRBrQRFIDQAgD0EQaiECIAlBIGohBANAIAIpABAhOiAEIAIpABg3AAggBCA6NwAAIAIpACAhOiAEIAIpACg3ABggBCA6NwAQIAJBIGohAiAEQSBqIgQgBkkNAAsLIAYgCmshAiAFIAc2AswCIAYgC2sgCkkEQCAKIAYgF2tLDQ0gIiAiIAIgC2siB2oiBCASak8EQCASRQ0DIAYgBCAS/AoAAAwDC0EAIAdrIgIEQCAGIAQgAvwKAAALIAcgEmohEiAGIAdrIQYgCyECCyAKQRBPBEAgAikAACE6IAYgAikACDcACCAGIDo3AAAgEkERSA0CIAYgEmohByAGQRBqIQQDQCACKQAQITogBCACKQAYNwAIIAQgOjcAACACKQAgITogBCACKQAoNwAYIAQgOjcAECACQSBqIQIgBEEgaiIEIAdJDQALDAILAkAgCkEHTQRAIAYgAi0AADoAACAGIAItAAE6AAEgBiACLQACOgACIAYgAi0AAzoAAyAGIAIgCkECdCIEQeAaaigCAGoiAigAADYABCACIARBgBtqKAIAayECDAELIAYgAikAADcAAAsgEkEJSQ0BIAYgEmohByAGQQhqIgQgAkEIaiICa0EPTARAA0AgBCACKQAANwAAIAJBCGohAiAE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\",oI={315:\"Artist\",258:\"BitsPerSample\",265:\"CellLength\",264:\"CellWidth\",320:\"ColorMap\",259:\"Compression\",33432:\"Copyright\",306:\"DateTime\",338:\"ExtraSamples\",266:\"FillOrder\",289:\"FreeByteCounts\",288:\"FreeOffsets\",291:\"GrayResponseCurve\",290:\"GrayResponseUnit\",316:\"HostComputer\",270:\"ImageDescription\",257:\"ImageLength\",256:\"ImageWidth\",271:\"Make\",281:\"MaxSampleValue\",280:\"MinSampleValue\",272:\"Model\",254:\"NewSubfileType\",274:\"Orientation\",262:\"PhotometricInterpretation\",284:\"PlanarConfiguration\",296:\"ResolutionUnit\",278:\"RowsPerStrip\",277:\"SamplesPerPixel\",305:\"Software\",279:\"StripByteCounts\",273:\"StripOffsets\",255:\"SubfileType\",263:\"Threshholding\",282:\"XResolution\",283:\"YResolution\",326:\"BadFaxLines\",327:\"CleanFaxData\",343:\"ClipPath\",328:\"ConsecutiveBadFaxLines\",433:\"Decode\",434:\"DefaultImageColor\",269:\"DocumentName\",336:\"DotRange\",321:\"HalftoneHints\",346:\"Indexed\",347:\"JPEGTables\",285:\"PageName\",297:\"PageNumber\",317:\"Predictor\",319:\"PrimaryChromaticities\",532:\"ReferenceBlackWhite\",339:\"SampleFormat\",340:\"SMinSampleValue\",341:\"SMaxSampleValue\",559:\"StripRowCounts\",330:\"SubIFDs\",292:\"T4Options\",293:\"T6Options\",325:\"TileByteCounts\",323:\"TileLength\",324:\"TileOffsets\",322:\"TileWidth\",301:\"TransferFunction\",318:\"WhitePoint\",344:\"XClipPathUnits\",286:\"XPosition\",529:\"YCbCrCoefficients\",531:\"YCbCrPositioning\",530:\"YCbCrSubSampling\",345:\"YClipPathUnits\",287:\"YPosition\",37378:\"ApertureValue\",40961:\"ColorSpace\",36868:\"DateTimeDigitized\",36867:\"DateTimeOriginal\",34665:\"Exif IFD\",36864:\"ExifVersion\",33434:\"ExposureTime\",41728:\"FileSource\",37385:\"Flash\",40960:\"FlashpixVersion\",33437:\"FNumber\",42016:\"ImageUniqueID\",37384:\"LightSource\",37500:\"MakerNote\",37377:\"ShutterSpeedValue\",37510:\"UserComment\",33723:\"IPTC\",34412:\"CZ_LSMINFO\",34675:\"ICC Profile\",700:\"XMP\",42112:\"GDAL_METADATA\",42113:\"GDAL_NODATA\",34377:\"Photoshop\",33550:\"ModelPixelScale\",33922:\"ModelTiepoint\",34264:\"ModelTransformation\",34735:\"GeoKeyDirectory\",34736:\"GeoDoubleParams\",34737:\"GeoAsciiParams\",50674:\"LercParameters\"},eI={};for(var tI in oI)oI.hasOwnProperty(tI)&&(eI[oI[tI]]=parseInt(tI,10));eI.BitsPerSample,eI.ExtraSamples,eI.SampleFormat,eI.StripByteCounts,eI.StripOffsets,eI.StripRowCounts,eI.TileByteCounts,eI.TileOffsets,eI.SubIFDs;var aI={1:\"BYTE\",2:\"ASCII\",3:\"SHORT\",4:\"LONG\",5:\"RATIONAL\",6:\"SBYTE\",7:\"UNDEFINED\",8:\"SSHORT\",9:\"SLONG\",10:\"SRATIONAL\",11:\"FLOAT\",12:\"DOUBLE\",13:\"IFD\",16:\"LONG8\",17:\"SLONG8\",18:\"IFD8\"},rI={};for(var sI in aI)aI.hasOwnProperty(sI)&&(rI[aI[sI]]=parseInt(sI,10));var nI=1,DI=0,wI=1,hI=2,yI={1024:\"GTModelTypeGeoKey\",1025:\"GTRasterTypeGeoKey\",1026:\"GTCitationGeoKey\",2048:\"GeographicTypeGeoKey\",2049:\"GeogCitationGeoKey\",2050:\"GeogGeodeticDatumGeoKey\",2051:\"GeogPrimeMeridianGeoKey\",2052:\"GeogLinearUnitsGeoKey\",2053:\"GeogLinearUnitSizeGeoKey\",2054:\"GeogAngularUnitsGeoKey\",2055:\"GeogAngularUnitSizeGeoKey\",2056:\"GeogEllipsoidGeoKey\",2057:\"GeogSemiMajorAxisGeoKey\",2058:\"GeogSemiMinorAxisGeoKey\",2059:\"GeogInvFlatteningGeoKey\",2060:\"GeogAzimuthUnitsGeoKey\",2061:\"GeogPrimeMeridianLongGeoKey\",2062:\"GeogTOWGS84GeoKey\",3072:\"ProjectedCSTypeGeoKey\",3073:\"PCSCitationGeoKey\",3074:\"ProjectionGeoKey\",3075:\"ProjCoordTransGeoKey\",3076:\"ProjLinearUnitsGeoKey\",3077:\"ProjLinearUnitSizeGeoKey\",3078:\"ProjStdParallel1GeoKey\",3079:\"ProjStdParallel2GeoKey\",3080:\"ProjNatOriginLongGeoKey\",3081:\"ProjNatOriginLatGeoKey\",3082:\"ProjFalseEastingGeoKey\",3083:\"ProjFalseNorthingGeoKey\",3084:\"ProjFalseOriginLongGeoKey\",3085:\"ProjFalseOriginLatGeoKey\",3086:\"ProjFalseOriginEastingGeoKey\",3087:\"ProjFalseOriginNorthingGeoKey\",3088:\"ProjCenterLongGeoKey\",3089:\"ProjCenterLatGeoKey\",3090:\"ProjCenterEastingGeoKey\",3091:\"ProjCenterNorthingGeoKey\",3092:\"ProjScaleAtNatOriginGeoKey\",3093:\"ProjScaleAtCenterGeoKey\",3094:\"ProjAzimuthAngleGeoKey\",3095:\"ProjStraightVertPoleLongGeoKey\",3096:\"ProjRectifiedGridAngleGeoKey\",4096:\"VerticalCSTypeGeoKey\",4097:\"VerticalCitationGeoKey\",4098:\"VerticalDatumGeoKey\",4099:\"VerticalUnitsGeoKey\"},cI={};for(var GI in yI)yI.hasOwnProperty(GI)&&(cI[yI[GI]]=parseInt(GI,10));function SI(A){var I=function(){if(\"undefined\"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if(\"function\"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(A){return!1}}();return function(){var g,B=N(A);if(I){var C=N(this).constructor;g=Reflect.construct(B,arguments,C)}else g=B.apply(this,arguments);return S(this,g)}}var NI,FI,fI,kI,RI=new EI,LI=function(A){G(g,R);var I=SI(g);function g(A){var B;return w(this,g),(B=I.call(this)).planarConfiguration=void 0!==A.PlanarConfiguration?A.PlanarConfiguration:1,B.samplesPerPixel=void 0!==A.SamplesPerPixel?A.SamplesPerPixel:1,B.addCompression=A.LercParameters[nI],B}return y(g,[{key:\"decodeBlock\",value:function(A){switch(this.addCompression){case DI:break;case wI:A=ZA(new Uint8Array(A)).buffer;break;case hI:A=RI.decode(new Uint8Array(A)).buffer;break;default:throw new Error(\"Unsupported LERC additional compression method identifier: \".concat(this.addCompression))}return CI.decode(A,{returnPixelInterleavedDims:1===this.planarConfiguration}).pixels[0].buffer}}]),g}(),UI=Object.freeze({__proto__:null,zstd:RI,default:LI});function uI(A,I){var g=\"undefined\"!=typeof Symbol&&A[Symbol.iterator]||A[\"@@iterator\"];if(!g){if(Array.isArray(A)||(g=function(A,I){if(!A)return;if(\"string\"==typeof A)return YI(A,I);var g=Object.prototype.toString.call(A).slice(8,-1);\"Object\"===g&&A.constructor&&(g=A.constructor.name);if(\"Map\"===g||\"Set\"===g)return Array.from(A);if(\"Arguments\"===g||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(g))return YI(A,I)}(A))||I&&A&&\"number\"==typeof A.length){g&&(A=g);var B=0,C=function(){};return{s:C,n:function(){return B>=A.length?{done:!0}:{done:!1,value:A[B++]}},e:function(A){throw A},f:C}}throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\")}var Q,E=!0,i=!1;return{s:function(){g=g.call(A)},n:function(){var A=g.next();return E=A.done,A},e:function(A){i=!0,Q=A},f:function(){try{E||null==g.return||g.return()}finally{if(i)throw Q}}}}function YI(A,I){(null==I||I>A.length)&&(I=A.length);for(var g=0,B=new Array(I);g<I;g++)B[g]=A[g];return B}var dI={env:{emscripten_notify_memory_growth:function(A){fI=new Uint8Array(FI.exports.memory.buffer),kI=new DataView(fI.buffer)}}},lI=function(){function A(){w(this,A)}return y(A,[{key:\"init\",value:function(){return NI||(NI=\"undefined\"!=typeof fetch?fetch(\"data:application/wasm;base64,\".concat(KI)).then((function(A){return A.arrayBuffer()})).then((function(A){return WebAssembly.instantiate(A,dI)})).then(this._init):WebAssembly.instantiate(Buffer.from(KI,\"base64\"),dI).then(this._init))}},{key:\"_init\",value:function(A){FI=A.instance,dI.env.emscripten_notify_memory_growth(0)}},{key:\"decode\",value:function(A){var I=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(!FI)throw new Error(\"ZSTDDecoder: Await .init() before decoding.\");var g=A.byteLength,B=FI.exports.malloc(g);if(fI.set(A,B),0===I&&(I=Number(FI.exports.ZSTD_findDecompressedSize(B,g))),-1===I){FI.exports.free(B);var C,Q=[],E=uI(this.decodeStreaming([A]));try{for(E.s();!(C=E.n()).done;){var i=C.value;Q.push(i)}}catch(A){E.e(A)}finally{E.f()}if(1===Q.length)return Q[0];for(var o=Q.reduce((function(A,I){return A+I.byteLength}),0),e=new Uint8Array(o),t=0,a=0,r=Q;a<r.length;a++){var s=r[a];e.set(s,t),t+=s.byteLength}return e}var n=FI.exports.malloc(I),D=FI.exports.ZSTD_decompress(n,I,B,g),w=fI.slice(n,n+D);return FI.exports.free(B),FI.exports.free(n),w}},{key:\"decodeStreaming\",value:E.mark((function A(I){var g,B,C,Q,i,o,e,t,a,r,s,n,D,w;return E.wrap((function(A){for(;;)switch(A.prev=A.next){case 0:if(FI){A.next=2;break}throw new Error(\"ZSTDDecoder: Await .init() before decoding.\");case 2:g=FI.exports.ZSTD_DStreamInSize(),B=FI.exports.malloc(g),C=FI.exports.ZSTD_DStreamOutSize(),Q=FI.exports.malloc(C),i=FI.exports.ZSTD_createDCtx(),o=4,e=4,t=FI.exports.malloc(o+2*e),a=FI.exports.malloc(o+2*e),r=uI(I),A.prev=12,r.s();case 14:if((s=r.n()).done){A.next=34;break}n=s.value,D=FI.exports.malloc(n.byteLength),fI.set(n,D),kI.setInt32(t,D,!0),kI.setInt32(t+o,n.byteLength,!0),kI.setInt32(t+o+e,0,!0);case 21:if(!(kI.getUint32(t+o+e,!0)<kI.getUint32(t+o,!0))){A.next=31;break}return kI.setInt32(a,Q,!0),kI.setInt32(a+o,C,!0),kI.setInt32(a+o+e,0,!0),FI.exports.ZSTD_decompressStream(i,a,t),w=kI.getUint32(a+o+e),A.next=29,fI.slice(Q,Q+w);case 29:A.next=21;break;case 31:FI.exports.free(D);case 32:A.next=14;break;case 34:A.next=39;break;case 36:A.prev=36,A.t0=A.catch(12),r.e(A.t0);case 39:return A.prev=39,r.f(),A.finish(39);case 42:FI.exports.ZSTD_freeDCtx(i),FI.exports.free(B),FI.exports.free(Q),FI.exports.free(t),FI.exports.free(a);case 47:case\"end\":return A.stop()}}),A,null,[[12,36,39,42]])}))}]),A}(),KI=\"AGFzbQEAAAABpgEVYAF/AGADf39/AX9gA39/fwBgAX8Bf2AFf39/f38Bf2ACf38AYAABf2ACf38Bf2AEf39/fwF/YAd/f39/f39/AGAGf39/f39/AX9gB39/f39/f38Bf2AEf39/fwF+YAJ/fwF+YAF/AX5gDn9/f39/f39/f39/f39/AX9gCH9/f39/f39/AX9gCX9/f39/f39/fwF/YAN+f38BfmAFf39/f38AYAAAAicBA2Vudh9lbXNjcmlwdGVuX25vdGlmeV9tZW1vcnlfZ3Jvd3RoAAADPTwDAAMABgQLAQIHBwAICAkMBAQDBAIGAwEDAAgBDQEBAgMKBQAJAQoCDgAJDwICAhAREhMIBAcGBgEEABQEBQFwAQICBQcBAYICgIACBggBfwFBoJ8ECwepAg4GbWVtb3J5AgAPWlNURF9jcmVhdGVEQ3R4ABYNWlNURF9mcmVlREN0eAAZGVpTVERfZmluZERlY29tcHJlc3NlZFNpemUAHQ9aU1REX2RlY29tcHJlc3MANBJaU1REX0RTdHJlYW1JblNpemUANxNaU1REX0RTdHJlYW1PdXRTaXplADgVWlNURF9kZWNvbXByZXNzU3RyZWFtADkGbWFsbG9jAAEEZnJlZQACGV9faW5kaXJlY3RfZnVuY3Rpb25fdGFibGUBABlfZW1zY3JpcHRlbl9zdGFja19yZXN0b3JlAAQcZW1zY3JpcHRlbl9zdGFja19nZXRfY3VycmVudAAFIl9fY3hhX2luY3JlbWVudF9leGNlcHRpb25fcmVmY291bnQAOwkHAQBBAQsBPAwBCgrxtwM81ScBC38jAEEQayIKJAACQAJAAkACQAJAAkACQAJAAkACQCAAQfQBTQRAQagbKAIAIgRBECAAQQtqQfgDcSAAQQtJGyIGQQN2IgB2IgFBA3EEQAJAIAFBf3NBAXEgAGoiAkEDdCIBQdAbaiIAIAFB2BtqKAIAIgEoAggiBUYEQEGoGyAEQX4gAndxNgIADAELIAUgADYCDCAAIAU2AggLIAFBCGohACABIAJBA3QiAkEDcjYCBCABIAJqIgEgASgCBEEBcjYCBAwLCyAGQbAbKAIAIghNDQEgAQRAAkBBAiAAdCICQQAgAmtyIAEgAHRxaCIBQQN0IgBB0BtqIgIgAEHYG2ooAgAiACgCCCIFRgRAQagbIARBfiABd3EiBDYCAAwBCyAFIAI2AgwgAiAFNgIICyAAIAZBA3I2AgQgACAGaiIHIAFBA3QiASAGayIFQQFyNgIEIAAgAWogBTYCACAIBEAgCEF4cUHQG2ohAUG8GygCACECAn8gBEEBIAhBA3Z0IgNxRQRAQagbIAMgBHI2AgAgAQwBCyABKAIICyEDIAEgAjYCCCADIAI2AgwgAiABNgIMIAIgAzYCCAsgAEEIaiEAQbwbIAc2AgBBsBsgBTYCAAwLC0GsGygCACILRQ0BIAtoQQJ0QdgdaigCACICKAIEQXhxIAZrIQMgAiEBA0ACQCABKAIQIgBFBEAgASgCFCIARQ0BCyAAKAIEQXhxIAZrIgEgAyABIANJIgEbIQMgACACIAEbIQIgACEBDAELCyACKAIYIQkgAiACKAIMIgBHBEAgAigCCCIBIAA2AgwgACABNgIIDAoLIAIoAhQiAQR/IAJBFGoFIAIoAhAiAUUNAyACQRBqCyEFA0AgBSEHIAEiAEEUaiEFIAAoAhQiAQ0AIABBEGohBSAAKAIQIgENAAsgB0EANgIADAkLQX8hBiAAQb9/Sw0AIABBC2oiAUF4cSEGQawbKAIAIgdFDQBBHyEIQQAgBmshAyAAQfT//wdNBEAgBkEmIAFBCHZnIgBrdkEBcSAAQQF0a0E+aiEICwJAAkACQCAIQQJ0QdgdaigCACIBRQRAQQAhAAwBC0EAIQAgBkEZIAhBAXZrQQAgCEEfRxt0IQIDQAJAIAEoAgRBeHEgBmsiBCADTw0AIAEhBSAEIgMNAEEAIQMgASEADAMLIAAgASgCFCIEIAQgASACQR12QQRxaigCECIBRhsgACAEGyEAIAJBAXQhAiABDQALCyAAIAVyRQRAQQAhBUECIAh0IgBBACAAa3IgB3EiAEUNAyAAaEECdEHYHWooAgAhAAsgAEUNAQsDQCAAKAIEQXhxIAZrIgIgA0khASACIAMgARshAyAAIAUgARshBSAAKAIQIgEEfyABBSAAKAIUCyIADQALCyAFRQ0AIANBsBsoAgAgBmtPDQAgBSgCGCEIIAUgBSgCDCIARwRAIAUoAggiASAANgIMIAAgATYCCAwICyAFKAIUIgEEfyAFQRRqBSAFKAIQIgFFDQMgBUEQagshAgNAIAIhBCABIgBBFGohAiAAKAIUIgENACAAQRBqIQIgACgCECIBDQALIARBADYCAAwHCyAGQbAbKAIAIgVNBEBBvBsoAgAhAAJAIAUgBmsiAUEQTwRAIAAgBmoiAiABQQFyNgIEIAAgBWogATYCACAAIAZBA3I2AgQMAQsgACAFQQNyNgIEIAAgBWoiASABKAIEQQFyNgIEQQAhAkEAIQELQbAbIAE2AgBBvBsgAjYCACAAQQhqIQAMCQsgBkG0GygCACICSQRAQbQbIAIgBmsiATYCAEHAG0HAGygCACIAIAZqIgI2AgAgAiABQQFyNgIEIAAgBkEDcjYCBCAAQQhqIQAMCQtBACEAIAZBL2oiAwJ/QYAfKAIABEBBiB8oAgAMAQtBjB9CfzcCAEGEH0KAoICAgIAENwIAQYAfIApBDGpBcHFB2KrVqgVzNgIAQZQfQQA2AgBB5B5BADYCAEGAIAsiAWoiBEEAIAFrIgdxIgEgBk0NCEHgHigCACIFBEBB2B4oAgAiCCABaiIJIAhNIAUgCUlyDQkLAkBB5B4tAABBBHFFBEACQAJAAkACQEHAGygCACIFBEBB6B4hAANAIAAoAgAiCCAFTQRAIAUgCCAAKAIEakkNAwsgACgCCCIADQALC0EAEAMiAkF/Rg0DIAEhBEGEHygCACIAQQFrIgUgAnEEQCABIAJrIAIgBWpBACAAa3FqIQQLIAQgBk0NA0HgHigCACIABEBB2B4oAgAiBSAEaiIHIAVNIAAgB0lyDQQLIAQQAyIAIAJHDQEMBQsgBCACayAHcSIEEAMiAiAAKAIAIAAoAgRqRg0BIAIhAAsgAEF/Rg0BIAZBMGogBE0EQCAAIQIMBAtBiB8oAgAiAiADIARrakEAIAJrcSICEANBf0YNASACIARqIQQgACECDAMLIAJBf0cNAgtB5B5B5B4oAgBBBHI2AgALIAEQAyICQX9GQQAQAyIAQX9GciAAIAJNcg0FIAAgAmsiBCAGQShqTQ0FC0HYHkHYHigCACAEaiIANgIAQdweKAIAIABJBEBB3B4gADYCAAsCQEHAGygCACIDBEBB6B4hAANAIAIgACgCACIBIAAoAgQiBWpGDQIgACgCCCIADQALDAQLQbgbKAIAIgBBACAAIAJNG0UEQEG4GyACNgIAC0EAIQBB7B4gBDYCAEHoHiACNgIAQcgbQX82AgBBzBtBgB8oAgA2AgBB9B5BADYCAANAIABBA3QiAUHYG2ogAUHQG2oiBTYCACABQdwbaiAFNgIAIABBAWoiAEEgRw0AC0G0GyAEQShrIgBBeCACa0EHcSIBayIFNgIAQcAbIAEgAmoiATYCACABIAVBAXI2AgQgACACakEoNgIEQcQbQZAfKAIANgIADAQLIAIgA00gASADS3INAiAAKAIMQQhxDQIgACAEIAVqNgIEQcAbIANBeCADa0EHcSIAaiIBNgIAQbQbQbQbKAIAIARqIgIgAGsiADYCACABIABBAXI2AgQgAiADakEoNgIEQcQbQZAfKAIANgIADAMLQQAhAAwGC0EAIQAMBAtBuBsoAgAgAksEQEG4GyACNgIACyACIARqIQVB6B4hAAJAA0AgBSAAKAIAIgFHBEAgACgCCCIADQEMAgsLIAAtAAxBCHFFDQMLQegeIQADQAJAIAAoAgAiASADTQRAIAMgASAAKAIEaiIFSQ0BCyAAKAIIIQAMAQsLQbQbIARBKGsiAEF4IAJrQQdxIgFrIgc2AgBBwBsgASACaiIBNgIAIAEgB0EBcjYCBCAAIAJqQSg2AgRBxBtBkB8oAgA2AgAgAyAFQScgBWtBB3FqQS9rIgAgACADQRBqSRsiAUEbNgIEIAFB8B4pAgA3AhAgAUHoHikCADcCCEHwHiABQQhqNgIAQeweIAQ2AgBB6B4gAjYCAEH0HkEANgIAIAFBGGohAANAIABBBzYCBCAAQQhqIQIgAEEEaiEAIAIgBUkNAAsgASADRg0AIAEgASgCBEF+cTYCBCADIAEgA2siAkEBcjYCBCABIAI2AgACfyACQf8BTQRAIAJBeHFB0BtqIQACf0GoGygCACIBQQEgAkEDdnQiAnFFBEBBqBsgASACcjYCACAADAELIAAoAggLIQEgACADNgIIIAEgAzYCDEEMIQJBCAwBC0EfIQAgAkH///8HTQRAIAJBJiACQQh2ZyIAa3ZBAXEgAEEBdGtBPmohAAsgAyAANgIcIANCADcCECAAQQJ0QdgdaiEBAkACQEGsGygCACIFQQEgAHQiBHFFBEBBrBsgBCAFcjYCACABIAM2AgAMAQsgAkEZIABBAXZrQQAgAEEfRxt0IQAgASgCACEFA0AgBSIBKAIEQXhxIAJGDQIgAEEddiEFIABBAXQhACABIAVBBHFqIgQoAhAiBQ0ACyAEIAM2AhALIAMgATYCGEEIIQIgAyIBIQBBDAwBCyABKAIIIgAgAzYCDCABIAM2AgggAyAANgIIQQAhAEEYIQJBDAsgA2ogATYCACACIANqIAA2AgALQbQbKAIAIgAgBk0NAEG0GyAAIAZrIgE2AgBBwBtBwBsoAgAiACAGaiICNgIAIAIgAUEBcjYCBCAAIAZBA3I2AgQgAEEIaiEADAQLQaQbQTA2AgBBACEADAMLIAAgAjYCACAAIAAoAgQgBGo2AgQgAkF4IAJrQQdxaiIIIAZBA3I2AgQgAUF4IAFrQQdxaiIEIAYgCGoiA2shBwJAQcAbKAIAIARGBEBBwBsgAzYCAEG0G0G0GygCACAHaiIANgIAIAMgAEEBcjYCBAwBC0G8GygCACAERgRAQbwbIAM2AgBBsBtBsBsoAgAgB2oiADYCACADIABBAXI2AgQgACADaiAANgIADAELIAQoAgQiAEEDcUEBRgRAIABBeHEhCSAEKAIMIQICQCAAQf8BTQRAIAQoAggiASACRgRAQagbQagbKAIAQX4gAEEDdndxNgIADAILIAEgAjYCDCACIAE2AggMAQsgBCgCGCEGAkAgAiAERwRAIAQoAggiACACNgIMIAIgADYCCAwBCwJAIAQoAhQiAAR/IARBFGoFIAQoAhAiAEUNASAEQRBqCyEBA0AgASEFIAAiAkEUaiEBIAAoAhQiAA0AIAJBEGohASACKAIQIgANAAsgBUEANgIADAELQQAhAgsgBkUNAAJAIAQoAhwiAEECdEHYHWoiASgCACAERgRAIAEgAjYCACACDQFBrBtBrBsoAgBBfiAAd3E2AgAMAgsCQCAEIAYoAhBGBEAgBiACNgIQDAELIAYgAjYCFAsgAkUNAQsgAiAGNgIYIAQoAhAiAARAIAIgADYCECAAIAI2AhgLIAQoAhQiAEUNACACIAA2AhQgACACNgIYCyAHIAlqIQcgBCAJaiIEKAIEIQALIAQgAEF+cTYCBCADIAdBAXI2AgQgAyAHaiAHNgIAIAdB/wFNBEAgB0F4cUHQG2ohAAJ/QagbKAIAIgFBASAHQQN2dCICcUUEQEGoGyABIAJyNgIAIAAMAQsgACgCCAshASAAIAM2AgggASADNgIMIAMgADYCDCADIAE2AggMAQtBHyECIAdB////B00EQCAHQSYgB0EIdmciAGt2QQFxIABBAXRrQT5qIQILIAMgAjYCHCADQgA3AhAgAkECdEHYHWohAAJAAkBBrBsoAgAiAUEBIAJ0IgVxRQRAQawbIAEgBXI2AgAgACADNgIADAELIAdBGSACQQF2a0EAIAJBH0cbdCECIAAoAgAhAQNAIAEiACgCBEF4cSAHRg0CIAJBHXYhASACQQF0IQIgACABQQRxaiIFKAIQIgENAAsgBSADNgIQCyADIAA2AhggAyADNgIMIAMgAzYCCAwBCyAAKAIIIgEgAzYCDCAAIAM2AgggA0EANgIYIAMgADYCDCADIAE2AggLIAhBCGohAAwCCwJAIAhFDQACQCAFKAIcIgFBAnRB2B1qIgIoAgAgBUYEQCACIAA2AgAgAA0BQawbIAdBfiABd3EiBzYCAAwCCwJAIAUgCCgCEEYEQCAIIAA2AhAMAQsgCCAANgIUCyAARQ0BCyAAIAg2AhggBSgCECIBBEAgACABNgIQIAEgADYCGAsgBSgCFCIBRQ0AIAAgATYCFCABIAA2AhgLAkAgA0EPTQRAIAUgAyAGaiIAQQNyNgIEIAAgBWoiACAAKAIEQQFyNgIEDAELIAUgBkEDcjYCBCAFIAZqIgQgA0EBcjYCBCADIARqIAM2AgAgA0H/AU0EQCADQXhxQdAbaiEAAn9BqBsoAgAiAUEBIANBA3Z0IgJxRQRAQagbIAEgAnI2AgAgAAwBCyAAKAIICyEBIAAgBDYCCCABIAQ2AgwgBCAANgIMIAQgATYCCAwBC0EfIQAgA0H///8HTQRAIANBJiADQQh2ZyIAa3ZBAXEgAEEBdGtBPmohAAsgBCAANgIcIARCADcCECAAQQJ0QdgdaiEBAkACQCAHQQEgAHQiAnFFBEBBrBsgAiAHcjYCACABIAQ2AgAgBCABNgIYDAELIANBGSAAQQF2a0EAIABBH0cbdCEAIAEoAgAhAQNAIAEiAigCBEF4cSADRg0CIABBHXYhASAAQQF0IQAgAiABQQRxaiIHKAIQIgENAAsgByAENgIQIAQgAjYCGAsgBCAENgIMIAQgBDYCCAwBCyACKAIIIgAgBDYCDCACIAQ2AgggBEEANgIYIAQgAjYCDCAEIAA2AggLIAVBCGohAAwBCwJAIAlFDQACQCACKAIcIgFBAnRB2B1qIgUoAgAgAkYEQCAFIAA2AgAgAA0BQawbIAtBfiABd3E2AgAMAgsCQCACIAkoAhBGBEAgCSAANgIQDAELIAkgADYCFAsgAEUNAQsgACAJNgIYIAIoAhAiAQRAIAAgATYCECABIAA2AhgLIAIoAhQiAUUNACAAIAE2AhQgASAANgIYCwJAIANBD00EQCACIAMgBmoiAEEDcjYCBCAAIAJqIgAgACgCBEEBcjYCBAwBCyACIAZBA3I2AgQgAiAGaiIFIANBAXI2AgQgAyAFaiADNgIAIAgEQCAIQXhxQdAbaiEAQbwbKAIAIQECf0EBIAhBA3Z0IgcgBHFFBEBBqBsgBCAHcjYCACAADAELIAAoAggLIQQgACABNgIIIAQgATYCDCABIAA2AgwgASAENgIIC0G8GyAFNgIAQbAbIAM2AgALIAJBCGohAAsgCkEQaiQAIAAL3AsBCH8CQCAARQ0AIABBCGsiAyAAQQRrKAIAIgJBeHEiAGohBQJAIAJBAXENACACQQJxRQ0BIAMgAygCACIEayIDQbgbKAIASQ0BIAAgBGohAAJAAkACQEG8GygCACADRwRAIAMoAgwhASAEQf8BTQRAIAEgAygCCCICRw0CQagbQagbKAIAQX4gBEEDdndxNgIADAULIAMoAhghByABIANHBEAgAygCCCICIAE2AgwgASACNgIIDAQLIAMoAhQiAgR/IANBFGoFIAMoAhAiAkUNAyADQRBqCyEEA0AgBCEGIAIiAUEUaiEEIAEoAhQiAg0AIAFBEGohBCABKAIQIgINAAsgBkEANgIADAMLIAUoAgQiAkEDcUEDRw0DQbAbIAA2AgAgBSACQX5xNgIEIAMgAEEBcjYCBCAFIAA2AgAPCyACIAE2AgwgASACNgIIDAILQQAhAQsgB0UNAAJAIAMoAhwiBEECdEHYHWoiAigCACADRgRAIAIgATYCACABDQFBrBtBrBsoAgBBfiAEd3E2AgAMAgsCQCADIAcoAhBGBEAgByABNgIQDAELIAcgATYCFAsgAUUNAQsgASAHNgIYIAMoAhAiAgRAIAEgAjYCECACIAE2AhgLIAMoAhQiAkUNACABIAI2AhQgAiABNgIYCyADIAVPDQAgBSgCBCIEQQFxRQ0AAkACQAJAAkAgBEECcUUEQEHAGygCACAFRgRAQcAbIAM2AgBBtBtBtBsoAgAgAGoiADYCACADIABBAXI2AgQgA0G8GygCAEcNBkGwG0EANgIAQbwbQQA2AgAPC0G8GygCACIHIAVGBEBBvBsgAzYCAEGwG0GwGygCACAAaiIANgIAIAMgAEEBcjYCBCAAIANqIAA2AgAPCyAEQXhxIABqIQAgBSgCDCEBIARB/wFNBEAgBSgCCCICIAFGBEBBqBtBqBsoAgBBfiAEQQN2d3E2AgAMBQsgAiABNgIMIAEgAjYCCAwECyAFKAIYIQggASAFRwRAIAUoAggiAiABNgIMIAEgAjYCCAwDCyAFKAIUIgIEfyAFQRRqBSAFKAIQIgJFDQIgBUEQagshBANAIAQhBiACIgFBFGohBCABKAIUIgINACABQRBqIQQgASgCECICDQALIAZBADYCAAwCCyAFIARBfnE2AgQgAyAAQQFyNgIEIAAgA2ogADYCAAwDC0EAIQELIAhFDQACQCAFKAIcIgRBAnRB2B1qIgIoAgAgBUYEQCACIAE2AgAgAQ0BQawbQawbKAIAQX4gBHdxNgIADAILAkAgBSAIKAIQRgRAIAggATYCEAwBCyAIIAE2AhQLIAFFDQELIAEgCDYCGCAFKAIQIgIEQCABIAI2AhAgAiABNgIYCyAFKAIUIgJFDQAgASACNgIUIAIgATYCGAsgAyAAQQFyNgIEIAAgA2ogADYCACADIAdHDQBBsBsgADYCAA8LIABB/wFNBEAgAEF4cUHQG2ohAgJ/QagbKAIAIgRBASAAQQN2dCIAcUUEQEGoGyAAIARyNgIAIAIMAQsgAigCCAshACACIAM2AgggACADNgIMIAMgAjYCDCADIAA2AggPC0EfIQEgAEH///8HTQRAIABBJiAAQQh2ZyICa3ZBAXEgAkEBdGtBPmohAQsgAyABNgIcIANCADcCECABQQJ0QdgdaiEEAn8CQAJ/QawbKAIAIgZBASABdCICcUUEQEGsGyACIAZyNgIAIAQgAzYCAEEYIQFBCAwBCyAAQRkgAUEBdmtBACABQR9HG3QhASAEKAIAIQQDQCAEIgIoAgRBeHEgAEYNAiABQR12IQQgAUEBdCEBIAIgBEEEcWoiBigCECIEDQALIAYgAzYCEEEYIQEgAiEEQQgLIQAgAyICDAELIAIoAggiBCADNgIMIAIgAzYCCEEYIQBBCCEBQQALIQYgASADaiAENgIAIAMgAjYCDCAAIANqIAY2AgBByBtByBsoAgBBAWsiAEF/IAAbNgIACwtsAQJ/QaAbKAIAIgEgAEEHakF4cSICaiEAAkAgAkEAIAAgAU0bRQRAIAA/AEEQdE0NASAAPwBBEHRrQf//A2pBEHZAAEF/RgR/QQAFQQAQAEEBCw0BC0GkG0EwNgIAQX8PC0GgGyAANgIAIAELBgAgACQACwQAIwALuQUBDH8jAEEQayIMJAACQCAEQQdNBEAgDEIANwMIIAQEQCAMQQhqIAMgBPwKAAALQWwgACABIAIgDEEIakEIEAYiACAAIARLGyAAIABBiX9JGyEFDAELIAEoAgBBAWoiDkEBdCIIBEAgAEEAIAj8CwALIAMoAAAiBUEPcSIHQQpLBEBBVCEFDAELIAIgB0EFajYCACADIARqIgJBBGshCCACQQdrIQ0gB0EGaiEPQQQhBiAFQQR2IQVBICAHdCIJQQFyIQpBACECQQEhByADIQQDQAJAIAdBAXFFBEADQCAFQX9zQYCAgIB4cmgiB0EYSUUEQCACQSRqIQIgBCANTQR/IARBA2oFIAQgDWtBA3QgBmpBH3EhBiAICyIEKAAAIAZ2IQUMAQsLIAYgB0EecSILakECaiEGIAdBAXZBA2wgAmogBSALdkEDcWoiAiAOTw0BAn8gBCANSyAGQQN2IARqIgUgCEtxRQRAIAZBB3EhBiAFDAELIAQgCGtBA3QgBmpBH3EhBiAICyIEKAAAIAZ2IQULIAUgCUEBa3EiByAJQQF0QQFrIgsgCmsiEEkEfyAPQQFrBSAFIAtxIgUgEEEAIAUgCU4bayEHIA8LIQUgACACQQF0aiAHQQFrIgs7AQAgAkEBaiECIAUgBmohBiAJQQEgB2sgCyAHQQBKGyAKaiIKSgRAIApBAkgNAUEgIApnIgVrIQ9BASAFQR9zdCEJCyACIA5PDQAgC0EARyEHAn8gBCANSyAGQQN1IARqIgUgCEtxRQRAIAZBB3EhBiAFDAELIAYgBCAIa0EDdGpBH3EhBiAICyIEKAAAIAZ2IQUMAQsLQWwhBSAKQQFHDQAgAiAOSwRAQVAhBQwBCyAGQSBKDQAgASACQQFrNgIAIAQgBkEHakEDdWogA2shBQsgDEEQaiQAIAULrRkCEX8BfiMAQTBrIgckAEG4fyEIAkAgBUUNACAELAAAIglB/wFxIQ0CQAJAIAlBAEgEQCANQf4Aa0EBdiIGIAVPDQMgDUH/AGsiCEH/AUsNAiAEQQFqIQRBACEFA0AgBSAITwRAIAYhDQwDBSAAIAVqIg0gBCAFQQF2aiIJLQAAQQR2OgAAIA0gCS0AAEEPcToAASAFQQJqIQUMAQsACwALIAUgDU0NAiAHQf8BNgIEIAYgB0EEaiAHQQhqIARBAWoiCiANEAYiBEGIf0sEQCAEIQgMAwtBVCEIIAcoAggiC0EGSw0CIAcoAgQiBUEBdCIMQQJqrUIBIAuthiIYQQQgC3QiCUEIaq18fEILfEL8//////////8Ag0LoAlYNAkFSIQggBUH/AUsNAkHoAiAJa60gBUEBaiIQQQF0rSAYfEIIfFQNAiANIARrIRQgBCAKaiEVIAwgBkGABGoiDCAJakEEaiIWakECaiERIAZBhARqIRcgBkGGBGohE0GAgAIgC3RBEHYhCEEAIQVBASEOQQEgC3QiCkEBayISIQQDQCAFIBBGRQRAAkAgBiAFQQF0Ig9qLwEAIglB//8DRgRAIBMgBEECdGogBToAACAEQQFrIQRBASEJDAELIA5BACAIIAnBShshDgsgDyAWaiAJOwEAIAVBAWohBQwBCwsgBiAOOwGCBCAGIAs7AYAEAkAgBCASRgRAQgAhGEEAIQlBACEIA0AgCSAQRgRAIApBA3YgCkEBdmpBA2oiBkEBdCEJQQAhBEEAIQgDQCAIIApPDQQgCCARaiEQQQAhBQNAIAVBAkZFBEAgEyAFIAZsIARqIBJxQQJ0aiAFIBBqLQAAOgAAIAVBAWohBQwBCwsgCEECaiEIIAQgCWogEnEhBAwACwAFIAYgCUEBdGouAQAhBCAIIBFqIg8gGDcAAEEIIQUDQCAEIAVMRQRAIAUgD2ogGDcAACAFQQhqIQUMAQsLIBhCgYKEiJCgwIABfCEYIAlBAWohCSAEIAhqIQgMAQsACwALIApBA3YgCkEBdmpBA2ohEUEAIQhBACEFA0AgCCAQRkUEQEEAIQkgBiAIQQF0ai4BACIPQQAgD0EAShshDwNAIAkgD0ZFBEAgEyAFQQJ0aiAIOgAAA0AgBSARaiAScSIFIARLDQALIAlBAWohCQwBCwsgCEEBaiEIDAELC0F/IQggBQ0DCyALQR9rIQhBACEFA0AgBSAKRkUEQCAWIBcgBUECdGoiBC0AAkEBdGoiBiAGLwEAIgZBAWo7AQAgBCAIIAZnaiIJOgADIAQgBiAJdCAKazsBACAFQQFqIQUMAQsLAkACQCAOQf//A3EEQCAHQRxqIgQgFSAUEAgiCEGIf0sNAiAHQRRqIAQgDBAJIAdBDGogBCAMEAkgBygCICIIQSBLDQECQCAHAn8gBygCJCIEIAcoAixPBEAgByAEIAhBA3ZrIgU2AiQgCEEHcQwBCyAEIAcoAigiBUYNASAHIAQgBCAFayAIQQN2IgYgBCAGayAFSRsiBGsiBTYCJCAIIARBA3RrCyIINgIgIAcgBSgAADYCHAtBACEFA0ACQAJAIAhBIU8EQCAHQbAaNgIkDAELIAcCfyAHKAIkIgQgBygCLE8EQCAHIAQgCEEDdmsiBDYCJEEBIQkgCEEHcQwBCyAEIAcoAigiBkYNASAHIAQgCEEDdiIJIAQgBmsgBCAJayAGTyIJGyIGayIENgIkIAggBkEDdGsLNgIgIAcgBCgAADYCHCAJRSAFQfsBS3INACAAIAVqIgggB0EUaiAHQRxqIgQQCjoAACAIIAdBDGogBBAKOgABAkAgBygCICIGQSFPBEAgB0GwGjYCJAwBCyAHKAIkIgQgBygCLE8EQCAHIAZBB3E2AiAgByAEIAZBA3ZrIgQ2AiQgByAEKAAANgIcDAMLIAQgBygCKCIJRg0AIAcgBiAEIAlrIAZBA3YiBiAEIAZrIgYgCUkbIgpBA3RrNgIgIAcgBCAKayIENgIkIAcgBCgAADYCHCAGIAlPDQILIAVBAnIhBQsgAEEBaiEMAn8CQANAQbp/IQggBUH9AUsNByAAIAVqIgogB0EUaiAHQRxqEAo6AAAgBSAMaiELIAcoAiAiBkEgSw0BAkAgBwJ/IAcoAiQiBCAHKAIsTwRAIAcgBCAGQQN2ayIENgIkIAZBB3EMAQsgBCAHKAIoIglGDQEgByAEIAQgCWsgBkEDdiIOIAQgDmsgCUkbIglrIgQ2AiQgBiAJQQN0aws2AiAgByAEKAAANgIcCyAFQf0BRg0HIAsgB0EMaiAHQRxqEAo6AAAgBUECaiEFIAcoAiAiBkEgTQRAIAcCfyAHKAIkIgQgBygCLE8EQCAHIAQgBkEDdmsiCDYCJCAGQQdxDAELIAQgBygCKCIIRg0CIAcgBCAEIAhrIAZBA3YiCSAEIAlrIAhJGyIEayIINgIkIAYgBEEDdGsLNgIgIAcgCCgAADYCHAwBCwsgB0GwGjYCJCAAIAVqIAdBFGogB0EcahAKOgAAIApBA2oMAQsgB0GwGjYCJCALIAdBDGogB0EcahAKOgAAIApBAmoLIABrIQgMBAsgCCAHQRRqIAdBHGoiBBAKOgACIAggB0EMaiAEEAo6AAMgBUEEaiEFIAcoAiAhCAwACwALIAdBHGoiBCAVIBQQCCIIQYh/Sw0BIAdBFGogBCAMEAkgB0EMaiAEIAwQCSAHKAIgIghBIEsNAAJAIAcCfyAHKAIkIgQgBygCLE8EQCAHIAQgCEEDdmsiBTYCJCAIQQdxDAELIAQgBygCKCIFRg0BIAcgBCAEIAVrIAhBA3YiBiAEIAZrIAVJGyIEayIFNgIkIAggBEEDdGsLIgg2AiAgByAFKAAANgIcC0EAIQUDQAJAAkAgCEEhTwRAIAdBsBo2AiQMAQsgBwJ/IAcoAiQiBCAHKAIsTwRAIAcgBCAIQQN2ayIENgIkQQEhCSAIQQdxDAELIAQgBygCKCIGRg0BIAcgBCAIQQN2IgkgBCAGayAEIAlrIAZPIgkbIgZrIgQ2AiQgCCAGQQN0aws2AiAgByAEKAAANgIcIAlFIAVB+wFLcg0AIAAgBWoiCCAHQRRqIAdBHGoiBBALOgAAIAggB0EMaiAEEAs6AAECQCAHKAIgIgZBIU8EQCAHQbAaNgIkDAELIAcoAiQiBCAHKAIsTwRAIAcgBkEHcTYCICAHIAQgBkEDdmsiBDYCJCAHIAQoAAA2AhwMAwsgBCAHKAIoIglGDQAgByAGIAQgCWsgBkEDdiIGIAQgBmsiBiAJSRsiCkEDdGs2AiAgByAEIAprIgQ2AiQgByAEKAAANgIcIAYgCU8NAgsgBUECciEFCyAAQQFqIQwCfwJAA0BBun8hCCAFQf0BSw0GIAAgBWoiCiAHQRRqIAdBHGoQCzoAACAFIAxqIQsgBygCICIGQSBLDQECQCAHAn8gBygCJCIEIAcoAixPBEAgByAEIAZBA3ZrIgQ2AiQgBkEHcQwBCyAEIAcoAigiCUYNASAHIAQgBCAJayAGQQN2Ig4gBCAOayAJSRsiCWsiBDYCJCAGIAlBA3RrCzYCICAHIAQoAAA2AhwLIAVB/QFGDQYgCyAHQQxqIAdBHGoQCzoAACAFQQJqIQUgBygCICIGQSBNBEAgBwJ/IAcoAiQiBCAHKAIsTwRAIAcgBCAGQQN2ayIINgIkIAZBB3EMAQsgBCAHKAIoIghGDQIgByAEIAQgCGsgBkEDdiIJIAQgCWsgCEkbIgRrIgg2AiQgBiAEQQN0aws2AiAgByAIKAAANgIcDAELCyAHQbAaNgIkIAAgBWogB0EUaiAHQRxqEAs6AAAgCkEDagwBCyAHQbAaNgIkIAsgB0EMaiAHQRxqEAs6AAAgCkECagsgAGshCAwDCyAIIAdBFGogB0EcaiIEEAs6AAIgCCAHQQxqIAQQCzoAAyAFQQRqIQUgBygCICEIDAALAAtBbCEICyAIQYh/Sw0CC0EAIQUgAUEAQTT8CwAgCCEGQQAhBANAIAUgBkcEQCAAIAVqIggtAAAiCUEMSw0CIAEgCUECdGoiCSAJKAIAQQFqNgIAIAVBAWohBUEBIAgtAAB0QQF1IARqIQQMAQsLQWwhCCAERQ0BIARnIgVBHHNBC0sNASADQSAgBWsiAzYCAEGAgICAeEEBIAN0IARrIgNnIgR2IANHDQEgACAGakEgIARrIgA6AAAgASAAQQJ0aiIAIAAoAgBBAWo2AgAgASgCBCIAQQJJIABBAXFyDQEgAiAGQQFqNgIAIA1BAWohCAwBC0FsIQgLIAdBMGokACAIC/UBAQF/IAJFBEAgAEIANwIAIABBADYCECAAQgA3AghBuH8PCyAAIAE2AgwgACABQQRqNgIQIAJBBE8EQCAAIAEgAmoiAUEEayIDNgIIIAAgAygAADYCACABQQFrLQAAIgEEQCAAQQggAWdBH3NrNgIEIAIPCyAAQQA2AgRBfw8LIAAgATYCCCAAIAEtAAAiAzYCAAJAAkACQCACQQJrDgIBAAILIAAgAS0AAkEQdCADciIDNgIACyAAIAEtAAFBCHQgA2o2AgALIAEgAmpBAWstAAAiAUUEQCAAQQA2AgRBbA8LIAAgAWcgAkEDdGtBCWo2AgQgAguuAQEEfyABIAIvAQAiAyABKAIEaiIENgIEIAAgA0ECdEGwGWooAgAgASgCAEEAIARrdnE2AgACQCAEQSFPBEAgAUGwGjYCCAwBCyABKAIIIgMgASgCEE8EQCABEAwMAQsgAyABKAIMIgVGDQAgASADIAMgBWsgBEEDdiIGIAMgBmsgBUkbIgNrIgU2AgggASAEIANBA3RrNgIEIAEgBSgAADYCAAsgACACQQRqNgIEC0wBBH8gACgCBCAAKAIAQQJ0aiICLQACIQMgAi8BACEEIAEgASgCBCIFIAItAAMiAmo2AgQgACAEIAEoAgAgBXRBACACa3ZqNgIAIAMLVgEEfyAAKAIEIAAoAgBBAnRqIgItAAIhAyACLwEAIQQgASACLQADIgIgASgCBGoiBTYCBCAAIAQgAkECdEGwGWooAgAgASgCAEEAIAVrdnFqNgIAIAMLLwEBfyAAIAAoAgQiAUEHcTYCBCAAIAAoAgggAUEDdmsiATYCCCAAIAEoAAA2AgALxQkCDX8CfiMAQRBrIgskACALQQA2AgwgC0EANgIIAn8CQCADQdQJaiIFIAMgC0EIaiALQQxqIAEgAiADQegAahAHIhBBiH9LDQAgCygCCCEIQQogACgCACIJQf8BcSIHIAdBCk8bQQFqIgQgCygCDCIBTwRAAkAgASAETw0AIAQgAWshAkEAIQEDQCABIAhGBEAgBCEBA0AgASACTQRAA0AgAkUNBSADIAJBAnRqQQA2AgAgAkEBayECDAALAAUgAyABQQJ0aiADIAEgAmtBAnRqKAIANgIAIAFBAWshAQwBCwALAAUgASAFaiIKIAJBACAKLQAAIgobIApqOgAAIAFBAWohAQwBCwALAAsgBCEBC0FUIAEgB0EBaksNARogAEEEaiEKIAAgCUH/gYB4cSABQRB0QYCA/AdxcjYCACABQQFqIQ4gA0E0aiEEQQAhAUEAIQIDQCACIA5GRQRAIAMgAkECdCIAaigCACEHIAAgBGogATYCACACQQFqIQIgASAHaiEBDAELCyADQdQHaiEHIAhBA2shAUEAIQADQAJAQQAhAiAAIAFOBEADQCAAIAhODQIgBCAAIAVqLQAAQQJ0aiIBIAEoAgAiAUEBajYCACABIAdqIAA6AAAgAEEBaiEADAALAAUDQCACQQRGRQRAIAQgBSAAIAJyIglqLQAAQQJ0aiIMIAwoAgAiDEEBajYCACAHIAxqIAk6AAAgAkEBaiECDAELCyAAQQRqIQAMAgsACwsgAygCACEIQQAhAEEBIQkDQCAJIA5GDQEgDiAJayEEIAMgCUECdGooAgAhBQJAAkACQAJAAkACQEEBIAl0QQF1IgxBAWsOCAABBAIEBAQDBAtBACECIAVBACAFQQBKGyEGIAAhAQNAIAIgBkYNBSAKIAFBAXRqIg0gByACIAhqai0AADoAASANIAQ6AAAgAkEBaiECIAFBAWohAQwACwALQQAhAiAFQQAgBUEAShshDSAAIQEDQCACIA1GDQQgCiABQQF0aiIGIAcgAiAIamotAAAiDzoAAyAGIAQ6AAIgBiAPOgABIAYgBDoAACACQQFqIQIgAUECaiEBDAALAAtBACECIAVBACAFQQBKGyEGIARB/wFxrSERIAAhAQNAIAIgBkYNAyAKIAFBAXRqIAcgAiAIamoxAABCCIYgEYRCgYCEgJCAwAB+NwAAIAJBAWohAiABQQRqIQEMAAsAC0EAIQIgBUEAIAVBAEobIQYgBEH/AXGtIREgACEBA0AgAiAGRg0CIAogAUEBdGoiBCAHIAIgCGpqMQAAQgiGIBGEQoGAhICQgMAAfiISNwAIIAQgEjcAACACQQFqIQIgAUEIaiEBDAALAAtBACEBIAVBACAFQQBKGyENIARB/wFxrSESIAAhBANAIAEgDUYNASAKIARBAXRqIQ8gByABIAhqajEAAEIIhiAShEKBgISAkIDAAH4hEUEAIQIDQCACIAxORQRAIA8gAkEBdGoiBiARNwAYIAYgETcAECAGIBE3AAggBiARNwAAIAJBEGohAgwBCwsgAUEBaiEBIAQgDGohBAwACwALIAlBAWohCSAFIAhqIQggBSAMbCAAaiEADAALAAsgEAshAiALQRBqJAAgAgu1CAIdfwF+IwBBEGsiDCQAIAAoAgAhBSADQfAEaiIHQQBB8AD8CwBBVCEEAkAgBUH/AXEiDUEMSw0AIANB4AdqIg4gByAMQQhqIAxBDGogASACIANB4AlqEAciFUGIf00EQCAMKAIMIgYgDUsNASADQagFaiEIIANBpAVqIQ8gAEEEaiESIAVBgICAeHEhFiAGQQFqIhAhBCAGIQIDQCAEIgFBAWshBCACIglBAWshAiAHIAlBAnRqKAIARQ0AC0EBIAEgAUEBTRshCkEAIQJBASEEA0AgBCAKRkUEQCAHIARBAnQiAWooAgAhCyABIAhqIAI2AgAgBEEBaiEEIAIgC2ohAgwBCwsgAyACNgKoBSAIIAlBAWoiE0ECdGogAjYCACADQeAFaiELQQAhBCAMKAIIIQEDQCABIARGRQRAIAggBCAOai0AAEECdGoiAiACKAIAIgJBAWo2AgAgAiALaiAEOgAAIARBAWohBAwBCwtBACEBIAhBADYCAEELIA0gBUH/AXFBDEYbIA0gBkEMSRsiCCAGQX9zaiECQQEhBANAIAQgCkZFBEAgByAEQQJ0IgZqKAIAIQUgAyAGaiABNgIAIAUgAiAEanQgAWohASAEQQFqIQQMAQsLIAggECAJayICa0EBaiEGIAIhAQNAIAEgBk9FBEAgAyABQTRsaiEHQQEhBANAIAQgCkZFBEAgByAEQQJ0IgVqIAMgBWooAgAgAXY2AgAgBEEBaiEEDAELCyABQQFqIQEMAQsLIBAgCGshFyAJQQAgCUEAShtBAWohGEEBIQkDQCAJIBhHBEAgECAJayEEIAMgCUECdCIBaigCACEHIAEgD2ooAgAhBiAPIAlBAWoiCUECdGooAgAhDiACIAggBGsiBU0EQCATIAQgF2oiAUEBIAFBAUoiGRsiASABIBNIGyEaIAMgBEE0bGoiGyABQQJ0aiEcIAQgEGohHSAEQRB0QYCAgAhqIR5BASAFdCIfQQJrISADQCAGIA5GDQMgEiAHQQJ0aiEFIAYgC2otAAAhFCABIQQgGQRAIBQgHnKtQoGAgIAQfiEhIBwoAgAhEUEAIQQCQAJAAkACQCAgDgMBAgACCyAFICE3AQgLIAUgITcBAAwBCwNAIAQgEU4NASAFIARBAnRqIgogITcBGCAKICE3ARAgCiAhNwEIIAogITcBACAEQQhqIQQMAAsACyABIQQLA0AgBCAaRkUEQCAdIARrIQogBSAbIARBAnQiEWooAgBBAnRqIAsgDyARaigCAGogCyAPIARBAWoiBEECdGooAgBqIAogCCAUQQIQDwwBCwsgBkEBaiEGIAcgH2ohBwwACwAFIBIgB0ECdGogBiALaiALIA5qIAQgCEEAQQEQDwwCCwALCyAAIAhBEHQgFnIgDXJBgAJyNgIACyAVIQQLIAxBEGokACAEC58DAgF+AX8CQAJAAkACQAJAAkBBASAEIANrdCIIQQFrDggAAQQCBAQEAwQLIAZBGHQgA0EQdGohAwNAIAEgAkYNBSAAIAEtAAAiBCAEQQh0IAVyIAZBAUYbIANyNgEAIAFBAWohASAAQQRqIQAMAAsACyAGQRh0IANBEHRqIQMDQCABIAJGDQQgACABLQAAIgQgBEEIdCAFciAGQQFGGyADciIENgEEIAAgBDYBACABQQFqIQEgAEEIaiEADAALAAsDQCABIAJGDQMgACABLQAAIAMgBSAGEBAiBzcBCCAAIAc3AQAgAUEBaiEBIABBEGohAAwACwALA0AgASACRg0CIAAgAS0AACADIAUgBhAQIgc3ARggACAHNwEQIAAgBzcBCCAAIAc3AQAgAUEBaiEBIABBIGohAAwACwALA0AgASACRg0BIAAgCEECdGohBCABLQAAIAMgBSAGEBAhBwNAIAAgBEZFBEAgACAHNwEYIAAgBzcBECAAIAc3AQggACAHNwEAIABBIGohAAwBCwsgAUEBaiEBIAQhAAwACwALCyYAIANBGHQgAUEQdGogACAAQQh0IAJyIANBAUYbcq1CgYCAgBB+C7sGAQp/IwBBIGsiBSQAIAQvAQIhCyAFQQxqIAIgAxAIIgNBiH9NBEAgBEEEaiEIIAAgAWohCQJAAkACQCABQQRPBEAgCUEDayENQQAgC2tBH3EhDCAFKAIUIQMgBSgCGCEHIAUoAhwhDiAFKAIMIQYgBSgCECEEA0AgBEEgSwRAQbAaIQMMBAsCQCADIA5PBEAgBEEHcSECIARBA3YhBkEBIQQMAQsgAyAHRg0EIAQgBEEDdiICIAMgB2sgAyACayAHTyIEGyIGQQN0ayECCyADIAZrIgMoAAAhBiAERSAAIA1Pcg0CIAggBiACdCAMdkEBdGoiBC0AACEKIAAgBC0AAToAACAIIAYgAiAKaiICdCAMdkEBdGoiBC0AACEKIAAgBC0AAToAASACIApqIQQgAEECaiEADAALAAsgBSgCECIEQSFPBEAgBUGwGjYCFAwDCyAFKAIUIgMgBSgCHE8EQCAFIARBB3EiAjYCECAFIAMgBEEDdmsiAzYCFCAFIAMoAAA2AgwgAiEEDAMLIAMgBSgCGCICRg0CIAUgBCADIAJrIARBA3YiBCADIARrIAJJGyICQQN0ayIENgIQIAUgAyACayICNgIUIAUgAigAADYCDAwCCyACIQQLIAUgBDYCECAFIAM2AhQgBSAGNgIMC0EAIAtrQR9xIQcDQAJAIARBIU8EQCAFQbAaNgIUDAELIAUCfyAFKAIUIgIgBSgCHE8EQCAFIAIgBEEDdmsiAzYCFEEBIQYgBEEHcQwBCyACIAUoAhgiA0YNASAFIAIgBEEDdiIGIAIgA2sgAiAGayADTyIGGyICayIDNgIUIAQgAkEDdGsLIgQ2AhAgBSADKAAAIgI2AgwgBkUgACAJT3INACAIIAIgBHQgB3ZBAXRqIgItAAEhAyAFIAQgAi0AAGo2AhAgACADOgAAIABBAWohACAFKAIQIQQMAQsLA0AgACAJT0UEQCAIIAUoAgwgBSgCECICdCAHdkEBdGoiAy0AASEEIAUgAiADLQAAajYCECAAIAQ6AAAgAEEBaiEADAELC0FsQWwgASAFKAIQQSBHGyAFKAIUIAUoAhhHGyEDCyAFQSBqJAAgAwv9IQEZfyMAQdAAayIFJABBbCEGAkAgAUEGSSADQQpJcg0AAkAgAyACLwAEIgcgAi8AACIKIAIvAAIiCWpqQQZqIgtJDQAgACABQQNqQQJ2IgxqIgggDGoiDSAMaiIMIAAgAWoiEUsNACAELwECIQ4gBUE8aiACQQZqIgIgChAIIgZBiH9LDQEgBUEoaiACIApqIgIgCRAIIgZBiH9LDQEgBUEUaiACIAlqIgIgBxAIIgZBiH9LDQEgBSACIAdqIAMgC2sQCCIGQYh/Sw0BIARBBGohCiARQQNrIRICQCARIAxrQQRJBEAgDCEDIA0hAiAIIQQMAQtBACAOa0EfcSEGQQAhCSAMIQMgDSECIAghBANAIAlBAXEgAyAST3INASAAIAogBSgCPCIJIAUoAkAiC3QgBnZBAnRqIgcvAQA7AAAgBy0AAiEQIActAAMhDyAEIAogBSgCKCITIAUoAiwiFHQgBnZBAnRqIgcvAQA7AAAgBy0AAiEVIActAAMhFiACIAogBSgCFCIXIAUoAhgiGHQgBnZBAnRqIgcvAQA7AAAgBy0AAiEZIActAAMhGiADIAogBSgCACIbIAUoAgQiHHQgBnZBAnRqIgcvAQA7AAAgBy0AAiEdIActAAMhByAAIA9qIg8gCiAJIAsgEGoiCXQgBnZBAnRqIgAvAQA7AAAgBSAJIAAtAAJqNgJAIAAtAAMhCSAEIBZqIgQgCiATIBQgFWoiC3QgBnZBAnRqIgAvAQA7AAAgBSALIAAtAAJqNgIsIAAtAAMhCyACIBpqIgIgCiAXIBggGWoiEHQgBnZBAnRqIgAvAQA7AAAgBSAQIAAtAAJqNgIYIAAtAAMhECADIAdqIgcgCiAbIBwgHWoiAHQgBnZBAnRqIgMvAQA7AAAgBSAAIAMtAAJqNgIEIAkgD2ohACAEIAtqIQQgAiAQaiECIAcgAy0AA2ohAyAFQTxqEBMgBUEoahATciAFQRRqEBNyIAUQE3JBAEchCQwACwALIAAgCEsgBCANS3INAEFsIQYgAiAMSw0BAkACQCAIIABrIglBBE8EQCAIQQNrIRBBACAOa0EfcSELIAUoAkAhBgNAIAZBIU8EQCAFQbAaNgJEDAMLIAUCfyAFKAJEIgcgBSgCTE8EQCAFIAcgBkEDdmsiCTYCREEBIQcgBkEHcQwBCyAHIAUoAkgiCUYNAyAFIAcgBkEDdiIPIAcgCWsgByAPayAJTyIHGyIPayIJNgJEIAYgD0EDdGsLIgY2AkAgBSAJKAAAIgk2AjwgB0UgACAQT3INAiAAIAogCSAGdCALdkECdGoiBi8BADsAACAFIAUoAkAgBi0AAmoiBzYCQCAAIAYtAANqIgkgCiAFKAI8IAd0IAt2QQJ0aiIALwEAOwAAIAUgBSgCQCAALQACaiIGNgJAIAkgAC0AA2ohAAwACwALIAUoAkAiBkEhTwRAIAVBsBo2AkQMAgsgBSgCRCILIAUoAkxPBEAgBSAGQQdxIgc2AkAgBSALIAZBA3ZrIgY2AkQgBSAGKAAANgI8IAchBgwCCyALIAUoAkgiB0YNASAFIAYgCyAHayAGQQN2IgYgCyAGayAHSRsiB0EDdGsiBjYCQCAFIAsgB2siBzYCRCAFIAcoAAA2AjwMAQsgCCAAayEJCwJAIAlBAkkNACAIQQJrIQtBACAOa0EfcSEQA0ACQCAGQSFPBEAgBUGwGjYCRAwBCyAFAn8gBSgCRCIHIAUoAkxPBEAgBSAHIAZBA3ZrIgk2AkRBASEHIAZBB3EMAQsgByAFKAJIIglGDQEgBSAHIAZBA3YiDyAHIAlrIAcgD2sgCU8iBxsiD2siCTYCRCAGIA9BA3RrCyIGNgJAIAUgCSgAACIJNgI8IAdFIAAgC0tyDQAgACAKIAkgBnQgEHZBAnRqIgcvAQA7AAAgBSAFKAJAIActAAJqIgY2AkAgACAHLQADaiEADAELCwNAIAAgC0sNASAAIAogBSgCPCAGdCAQdkECdGoiBy8BADsAACAFIAUoAkAgBy0AAmoiBjYCQCAAIActAANqIQAMAAsACwJAIAAgCE8NACAAIAogBSgCPCAGdEEAIA5rdkECdGoiAC0AADoAACAFAn8gAC0AA0EBRgRAIAUoAkAgAC0AAmoMAQsgBSgCQCIIQR9LDQFBICAIIAAtAAJqIgAgAEEgTxsLNgJACwJAAkAgDSAEayIGQQRPBEAgDUEDayEJQQAgDmtBH3EhByAFKAIsIQADQCAAQSFPBEAgBUGwGjYCMAwDCyAFAn8gBSgCMCIIIAUoAjhPBEAgBSAIIABBA3ZrIgY2AjBBASEIIABBB3EMAQsgCCAFKAI0IgZGDQMgBSAIIABBA3YiCyAIIAZrIAggC2sgBk8iCBsiC2siBjYCMCAAIAtBA3RrCyIANgIsIAUgBigAACIGNgIoIAhFIAQgCU9yDQIgBCAKIAYgAHQgB3ZBAnRqIgAvAQA7AAAgBSAFKAIsIAAtAAJqIgg2AiwgBCAALQADaiIGIAogBSgCKCAIdCAHdkECdGoiBC8BADsAACAFIAUoAiwgBC0AAmoiADYCLCAGIAQtAANqIQQMAAsACyAFKAIsIgBBIU8EQCAFQbAaNgIwDAILIAUoAjAiByAFKAI4TwRAIAUgAEEHcSIINgIsIAUgByAAQQN2ayIANgIwIAUgACgAADYCKCAIIQAMAgsgByAFKAI0IghGDQEgBSAAIAcgCGsgAEEDdiIAIAcgAGsgCEkbIghBA3RrIgA2AiwgBSAHIAhrIgg2AjAgBSAIKAAANgIoDAELIA0gBGshBgsCQCAGQQJJDQAgDUECayEJQQAgDmtBH3EhCwNAAkAgAEEhTwRAIAVBsBo2AjAMAQsgBQJ/IAUoAjAiCCAFKAI4TwRAIAUgCCAAQQN2ayIGNgIwQQEhByAAQQdxDAELIAggBSgCNCIGRg0BIAUgCCAAQQN2IgcgCCAGayAIIAdrIAZPIgcbIghrIgY2AjAgACAIQQN0awsiADYCLCAFIAYoAAAiCDYCKCAHRSAEIAlLcg0AIAQgCiAIIAB0IAt2QQJ0aiIILwEAOwAAIAUgBSgCLCAILQACaiIANgIsIAQgCC0AA2ohBAwBCwsDQCAEIAlLDQEgBCAKIAUoAiggAHQgC3ZBAnRqIggvAQA7AAAgBSAFKAIsIAgtAAJqIgA2AiwgBCAILQADaiEEDAALAAsCQCAEIA1PDQAgBCAKIAUoAiggAHRBACAOa3ZBAnRqIgAtAAA6AAAgBQJ/IAAtAANBAUYEQCAFKAIsIAAtAAJqDAELIAUoAiwiBEEfSw0BQSAgBCAALQACaiIAIABBIE8bCzYCLAsCQAJAIAwgAmsiBkEETwRAIAxBA2shB0EAIA5rQR9xIQggBSgCGCEAA0AgAEEhTwRAIAVBsBo2AhwMAwsgBQJ/IAUoAhwiBCAFKAIkTwRAIAUgBCAAQQN2ayIGNgIcQQEhCSAAQQdxDAELIAQgBSgCICINRg0DIAUgBCAAQQN2IgYgBCANayAEIAZrIA1PIgkbIgRrIgY2AhwgACAEQQN0awsiADYCGCAFIAYoAAAiBDYCFCAJRSACIAdPcg0CIAIgCiAEIAB0IAh2QQJ0aiIALwEAOwAAIAUgBSgCGCAALQACaiIENgIYIAIgAC0AA2oiDSAKIAUoAhQgBHQgCHZBAnRqIgIvAQA7AAAgBSAFKAIYIAItAAJqIgA2AhggDSACLQADaiECDAALAAsgBSgCGCIAQSFPBEAgBUGwGjYCHAwCCyAFKAIcIgggBSgCJE8EQCAFIABBB3EiBDYCGCAFIAggAEEDdmsiADYCHCAFIAAoAAA2AhQgBCEADAILIAggBSgCICIERg0BIAUgACAIIARrIABBA3YiACAIIABrIARJGyIEQQN0ayIANgIYIAUgCCAEayIENgIcIAUgBCgAADYCFAwBCyAMIAJrIQYLAkAgBkECSQ0AIAxBAmshDUEAIA5rQR9xIQcDQAJAIABBIU8EQCAFQbAaNgIcDAELIAUCfyAFKAIcIgQgBSgCJE8EQCAFIAQgAEEDdmsiBjYCHEEBIQggAEEHcQwBCyAEIAUoAiAiCEYNASAFIAQgAEEDdiIGIAQgCGsgBCAGayAITyIIGyIEayIGNgIcIAAgBEEDdGsLIgA2AhggBSAGKAAAIgQ2AhQgCEUgAiANS3INACACIAogBCAAdCAHdkECdGoiBC8BADsAACAFIAUoAhggBC0AAmoiADYCGCACIAQtAANqIQIMAQsLA0AgAiANSw0BIAIgCiAFKAIUIAB0IAd2QQJ0aiIELwEAOwAAIAUgBSgCGCAELQACaiIANgIYIAIgBC0AA2ohAgwACwALAkAgAiAMTw0AIAIgCiAFKAIUIAB0QQAgDmt2QQJ0aiIALQAAOgAAIAUCfyAALQADQQFGBEAgBSgCGCAALQACagwBCyAFKAIYIgJBH0sNAUEgIAIgAC0AAmoiACAAQSBPGws2AhgLAkAgESADa0EETwRAQQAgDmtBH3EhBCAFKAIEIQADQCAAQSFPBEAgBUGwGjYCCAwDCyAFAn8gBSgCCCICIAUoAhBPBEAgBSACIABBA3ZrIgY2AghBASECIABBB3EMAQsgAiAFKAIMIgxGDQMgBSACIABBA3YiCCACIAxrIAIgCGsgDE8iAhsiDGsiBjYCCCAAIAxBA3RrCyIANgIEIAUgBigAACIMNgIAIAJFIAMgEk9yDQIgAyAKIAwgAHQgBHZBAnRqIgAvAQA7AAAgBSAFKAIEIAAtAAJqIgI2AgQgAyAALQADaiIDIAogBSgCACACdCAEdkECdGoiAi8BADsAACAFIAUoAgQgAi0AAmoiADYCBCADIAItAANqIQMMAAsACyAFKAIEIgBBIU8EQCAFQbAaNgIIDAELIAUoAggiBCAFKAIQTwRAIAUgAEEHcSICNgIEIAUgBCAAQQN2ayIANgIIIAUgACgAADYCACACIQAMAQsgBCAFKAIMIgJGDQAgBSAAIAQgAmsgAEEDdiIAIAQgAGsgAkkbIgJBA3RrIgA2AgQgBSAEIAJrIgI2AgggBSACKAAANgIACwJAIBEgA2tBAkkNACARQQJrIQRBACAOa0EfcSEMA0ACQCAAQSFPBEAgBUGwGjYCCAwBCyAFAn8gBSgCCCICIAUoAhBPBEAgBSACIABBA3ZrIgY2AghBASEJIABBB3EMAQsgAiAFKAIMIghGDQEgBSACIABBA3YiDSACIAhrIAIgDWsgCE8iCRsiAmsiBjYCCCAAIAJBA3RrCyIANgIEIAUgBigAACICNgIAIAlFIAMgBEtyDQAgAyAKIAIgAHQgDHZBAnRqIgIvAQA7AAAgBSAFKAIEIAItAAJqIgA2AgQgAyACLQADaiEDDAELCwNAIAMgBEsNASADIAogBSgCACAAdCAMdkECdGoiAi8BADsAACAFIAUoAgQgAi0AAmoiADYCBCADIAItAANqIQMMAAsACwJAIAMgEU8NACADIAogBSgCACAAdEEAIA5rdkECdGoiAi0AADoAACACLQADQQFGBEAgBSgCBCACLQACaiEADAELIAUoAgQiAEEfSw0AQSAgACACLQACaiIAIABBIE8bIQALQWxBbEFsQWxBbEFsQWxBbCABIABBIEcbIAUoAgggBSgCDEcbIAUoAhhBIEcbIAUoAhwgBSgCIEcbIAUoAixBIEcbIAUoAjAgBSgCNEcbIAUoAkBBIEcbIAUoAkQgBSgCSEcbIQYMAQtBbCEGCyAFQdAAaiQAIAYLGQAgACgCCCAAKAIQSQRAQQMPCyAAEAxBAAvzHAEWfyMAQdAAayIFJABBbCEIAkAgAUEGSSADQQpJcg0AAkAgAyACLwAEIgYgAi8AACIKIAIvAAIiCWpqQQZqIhJJDQAgACABQQNqQQJ2IgtqIgcgC2oiDiALaiILIAAgAWoiD0sNACAELwECIQwgBUE8aiACQQZqIgIgChAIIghBiH9LDQEgBUEoaiACIApqIgIgCRAIIghBiH9LDQEgBUEUaiACIAlqIgIgBhAIIghBiH9LDQEgBSACIAZqIAMgEmsQCCIIQYh/Sw0BIARBBGohCiAPQQNrIRICQCAPIAtrQQRJBEAgCyEDIA4hAiAHIQQMAQtBACAMa0EfcSEIQQAhBiALIQMgDiECIAchBANAIAZBAXEgAyAST3INASAKIAUoAjwiBiAFKAJAIgl0IAh2QQF0aiINLQAAIRAgACANLQABOgAAIAogBSgCKCINIAUoAiwiEXQgCHZBAXRqIhMtAAAhFSAEIBMtAAE6AAAgCiAFKAIUIhMgBSgCGCIWdCAIdkEBdGoiFC0AACEXIAIgFC0AAToAACAKIAUoAgAiFCAFKAIEIhh0IAh2QQF0aiIZLQAAIRogAyAZLQABOgAAIAogBiAJIBBqIgZ0IAh2QQF0aiIJLQABIRAgBSAGIAktAABqNgJAIAAgEDoAASAKIA0gESAVaiIGdCAIdkEBdGoiCS0AASENIAUgBiAJLQAAajYCLCAEIA06AAEgCiATIBYgF2oiBnQgCHZBAXRqIgktAAEhDSAFIAYgCS0AAGo2AhggAiANOgABIAogFCAYIBpqIgZ0IAh2QQF0aiIJLQABIQ0gBSAGIAktAABqNgIEIAMgDToAASADQQJqIQMgAkECaiECIARBAmohBCAAQQJqIQAgBUE8ahATIAVBKGoQE3IgBUEUahATciAFEBNyQQBHIQYMAAsACyAAIAdLIAQgDktyDQBBbCEIIAIgC0sNAQJAIAcgAGtBBE4EQCAHQQNrIRBBACAMa0EfcSENA0AgBSgCQCIGQSFPBEAgBUGwGjYCRAwDCyAFAn8gBSgCRCIIIAUoAkxPBEAgBSAIIAZBA3ZrIgg2AkRBASEJIAZBB3EMAQsgCCAFKAJIIglGDQMgBSAIIAZBA3YiESAIIAlrIAggEWsgCU8iCRsiEWsiCDYCRCAGIBFBA3RrCyIGNgJAIAUgCCgAACIINgI8IAlFIAAgEE9yDQIgCiAIIAZ0IA12QQF0aiIILQABIQkgBSAGIAgtAABqNgJAIAAgCToAACAKIAUoAjwgBSgCQCIGdCANdkEBdGoiCC0AASEJIAUgBiAILQAAajYCQCAAIAk6AAEgAEECaiEADAALAAsgBSgCQCIGQSFPBEAgBUGwGjYCRAwBCyAFKAJEIgkgBSgCTE8EQCAFIAZBB3EiCDYCQCAFIAkgBkEDdmsiBjYCRCAFIAYoAAA2AjwgCCEGDAELIAkgBSgCSCIIRg0AIAUgBiAJIAhrIAZBA3YiBiAJIAZrIAhJGyIIQQN0ayIGNgJAIAUgCSAIayIINgJEIAUgCCgAADYCPAtBACAMa0EfcSEIA0ACQCAGQSFPBEAgBUGwGjYCRAwBCyAFAn8gBSgCRCIJIAUoAkxPBEAgBSAJIAZBA3ZrIgw2AkRBASEJIAZBB3EMAQsgCSAFKAJIIgxGDQEgBSAJIAZBA3YiDSAJIAxrIAkgDWsgDE8iCRsiDWsiDDYCRCAGIA1BA3RrCyIGNgJAIAUgDCgAACIMNgI8IAlFIAAgB09yDQAgCiAMIAZ0IAh2QQF0aiIJLQABIQwgBSAGIAktAABqNgJAIAAgDDoAACAAQQFqIQAgBSgCQCEGDAELCwNAIAAgB09FBEAgCiAFKAI8IAUoAkAiBnQgCHZBAXRqIgktAAEhDCAFIAYgCS0AAGo2AkAgACAMOgAAIABBAWohAAwBCwsCQCAOIARrQQROBEAgDkEDayEJA0AgBSgCLCIAQSFPBEAgBUGwGjYCMAwDCyAFAn8gBSgCMCIHIAUoAjhPBEAgBSAHIABBA3ZrIgY2AjBBASEHIABBB3EMAQsgByAFKAI0IgZGDQMgBSAHIABBA3YiDCAHIAZrIAcgDGsgBk8iBxsiDGsiBjYCMCAAIAxBA3RrCyIANgIsIAUgBigAACIGNgIoIAdFIAQgCU9yDQIgCiAGIAB0IAh2QQF0aiIHLQABIQYgBSAAIActAABqNgIsIAQgBjoAACAKIAUoAiggBSgCLCIAdCAIdkEBdGoiBy0AASEGIAUgACAHLQAAajYCLCAEIAY6AAEgBEECaiEEDAALAAsgBSgCLCIAQSFPBEAgBUGwGjYCMAwBCyAFKAIwIgYgBSgCOE8EQCAFIABBB3EiBzYCLCAFIAYgAEEDdmsiADYCMCAFIAAoAAA2AiggByEADAELIAYgBSgCNCIHRg0AIAUgACAGIAdrIABBA3YiACAGIABrIAdJGyIHQQN0ayIANgIsIAUgBiAHayIHNgIwIAUgBygAADYCKAsDQAJAIABBIU8EQCAFQbAaNgIwDAELIAUCfyAFKAIwIgcgBSgCOE8EQCAFIAcgAEEDdmsiBjYCMEEBIQcgAEEHcQwBCyAHIAUoAjQiBkYNASAFIAcgAEEDdiIJIAcgBmsgByAJayAGTyIHGyIJayIGNgIwIAAgCUEDdGsLIgA2AiwgBSAGKAAAIgY2AiggB0UgBCAOT3INACAKIAYgAHQgCHZBAXRqIgctAAEhBiAFIAAgBy0AAGo2AiwgBCAGOgAAIARBAWohBCAFKAIsIQAMAQsLA0AgBCAOT0UEQCAKIAUoAiggBSgCLCIAdCAIdkEBdGoiBy0AASEGIAUgACAHLQAAajYCLCAEIAY6AAAgBEEBaiEEDAELCwJAIAsgAmtBBE4EQCALQQNrIQ4DQCAFKAIYIgBBIU8EQCAFQbAaNgIcDAMLIAUCfyAFKAIcIgQgBSgCJE8EQCAFIAQgAEEDdmsiBDYCHEEBIQYgAEEHcQwBCyAEIAUoAiAiB0YNAyAFIAQgAEEDdiIGIAQgB2sgBCAGayAHTyIGGyIHayIENgIcIAAgB0EDdGsLIgA2AhggBSAEKAAAIgQ2AhQgBkUgAiAOT3INAiAKIAQgAHQgCHZBAXRqIgQtAAEhByAFIAAgBC0AAGo2AhggAiAHOgAAIAogBSgCFCAFKAIYIgB0IAh2QQF0aiIELQABIQcgBSAAIAQtAABqNgIYIAIgBzoAASACQQJqIQIMAAsACyAFKAIYIgBBIU8EQCAFQbAaNgIcDAELIAUoAhwiByAFKAIkTwRAIAUgAEEHcSIENgIYIAUgByAAQQN2ayIANgIcIAUgACgAADYCFCAEIQAMAQsgByAFKAIgIgRGDQAgBSAAIAcgBGsgAEEDdiIAIAcgAGsgBEkbIgRBA3RrIgA2AhggBSAHIARrIgQ2AhwgBSAEKAAANgIUCwNAAkAgAEEhTwRAIAVBsBo2AhwMAQsgBQJ/IAUoAhwiBCAFKAIkTwRAIAUgBCAAQQN2ayIENgIcQQEhBiAAQQdxDAELIAQgBSgCICIHRg0BIAUgBCAAQQN2Ig4gBCAHayAEIA5rIAdPIgYbIgdrIgQ2AhwgACAHQQN0awsiADYCGCAFIAQoAAAiBDYCFCAGRSACIAtPcg0AIAogBCAAdCAIdkEBdGoiBC0AASEHIAUgACAELQAAajYCGCACIAc6AAAgAkEBaiECIAUoAhghAAwBCwsDQCACIAtPRQRAIAogBSgCFCAFKAIYIgB0IAh2QQF0aiIELQABIQcgBSAAIAQtAABqNgIYIAIgBzoAACACQQFqIQIMAQsLAkAgDyADa0EETgRAA0AgBSgCBCIAQSFPBEAgBUGwGjYCCAwDCyAFAn8gBSgCCCICIAUoAhBPBEAgBSACIABBA3ZrIgQ2AghBASECIABBB3EMAQsgAiAFKAIMIgRGDQMgBSACIABBA3YiCyACIARrIAIgC2sgBE8iAhsiC2siBDYCCCAAIAtBA3RrCyIANgIEIAUgBCgAACIENgIAIAJFIAMgEk9yDQIgCiAEIAB0IAh2QQF0aiICLQABIQQgBSAAIAItAABqNgIEIAMgBDoAACAKIAUoAgAgBSgCBCIAdCAIdkEBdGoiAi0AASEEIAUgACACLQAAajYCBCADIAQ6AAEgA0ECaiEDDAALAAsgBSgCBCIAQSFPBEAgBUGwGjYCCAwBCyAFKAIIIgQgBSgCEE8EQCAFIABBB3EiAjYCBCAFIAQgAEEDdmsiADYCCCAFIAAoAAA2AgAgAiEADAELIAQgBSgCDCICRg0AIAUgACAEIAJrIABBA3YiACAEIABrIAJJGyICQQN0ayIANgIEIAUgBCACayICNgIIIAUgAigAADYCAAsDQAJAIABBIU8EQCAFQbAaNgIIDAELIAUCfyAFKAIIIgIgBSgCEE8EQCAFIAIgAEEDdmsiBDYCCEEBIQIgAEEHcQwBCyACIAUoAgwiBEYNASAFIAIgAEEDdiILIAIgBGsgAiALayAETyICGyILayIENgIIIAAgC0EDdGsLIgA2AgQgBSAEKAAAIgQ2AgAgAkUgAyAPT3INACAKIAQgAHQgCHZBAXRqIgItAAEhBCAFIAAgAi0AAGo2AgQgAyAEOgAAIANBAWohAyAFKAIEIQAMAQsLA0AgAyAPT0UEQCAKIAUoAgAgBSgCBCIAdCAIdkEBdGoiAi0AASEEIAUgACACLQAAajYCBCADIAQ6AAAgA0EBaiEDDAELC0FsQWxBbEFsQWxBbEFsQWwgASAFKAIEQSBHGyAFKAIIIAUoAgxHGyAFKAIYQSBHGyAFKAIcIAUoAiBHGyAFKAIsQSBHGyAFKAIwIAUoAjRHGyAFKAJAQSBHGyAFKAJEIAUoAkhHGyEIDAELQWwhCAsgBUHQAGokACAICxoAIAAEQCABBEAgAiAAIAERBQAPCyAAEAILCyoBAn8jAEEQayIAJAAgAEEANgIIIABCADcDACAAEBchASAAQRBqJAAgAQvWAQECfwJAIAAoAgAiAUUgACgCBEVzDQBBwOwFIAEgACgCCBAYIgFFDQAgASAAKQIANwL86gEgAUGE6wFqIAAoAgg2AgAgAUEANgKc6wEgAUEANgKQ6wEgAUEANgLU6wEgAUEANgLE6wEgAUIANwKk6wEgAUEANgK46QEgAUEANgK87AUgAUIANwK86wEgAUEANgKs6wEgAUIBNwKU6wEgAUIANwPo6wEgAUGBgIDAADYCzOsBIAFCADcC7OoBIAFBADYCuOsBIAFCADcDsOsBIAEhAgsgAgsVACABBEAgAiAAIAERBwAPCyAAEAELrgEBBH8CQCAARQ0AIAAoApDrAQRAQUAPCyAAKAKE6wEhAiAAKAKA6wEhASAAEBogACgCwOsBIAEgAhAVIABBADYCwOsBIAAoAqzrASIDBEACQAJAAkACQCADKAIAIgQEQCABRQ0CIAIgBCABEQUADAELIAFFDQILIAIgAyABEQUADAILIAQQAgsgAxACCyAAQQA2AqzrAQsgAQRAIAIgACABEQUADAELIAAQAgtBAAtSAQN/AkAgACgCmOsBIgFFDQAgASgCACABKAK01QEiAiABKAK41QEiAxAVIAIEQCADIAEgAhEFAAwBCyABEAILIABBADYCqOsBIABCADcDmOsBC5QFAgR/An4jAEEQayIGJAACQCABIAJFckUEQEF/IQQMAQsCQEEBQQUgAxsiBCACSwRAIAJFIANBAUZyDQIgBkGo6r5pNgIMIAJFIgBFBEAgBkEMaiABIAL8CgAACyAGKAIMQajqvmlGDQIgBkHQ1LTCATYCDCAARQRAIAZBDGogASAC/AoAAAsgBigCDEFwcUHQ1LTCAUYNAgwBCyAAQQBBMPwLAEEBIQUCQCADQQFGDQAgAyEFIAEoAAAiA0Go6r5pRg0AIANBcHFB0NS0wgFHDQFBCCEEIAJBCEkNAiAAQQE2AhQgASgAACECIABBCDYCGCAAIAJB0NS0wgFrNgIcIAAgATUABDcDAEEAIQQMAgsgAiABIAIgBRAcIgJJBEAgAiEEDAILIAAgAjYCGCABIARqIgVBAWstAAAiAkEIcQRAQXIhBAwCCyACQSBxIgNFBEAgBS0AACIFQacBSwRAQXAhBAwDCyAFQQdxrUIBIAVBA3ZBCmqthiIIQgOIfiAIfCEJIARBAWohBAsgAkEGdiEFIAJBAnYhBwJAAkACQAJAIAJBA3EiAkEBaw4DAAECAwsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAdBAXEhBwJ+AkACQAJAAkAgBUEBaw4DAQIDAAtCfyADRQ0DGiABIARqMQAADAMLIAEgBGozAABCgAJ8DAILIAEgBGo1AAAMAQsgASAEaikAAAshCCAAIAc2AiAgACACNgIcIAAgCDcDAEEAIQQgAEEANgIUIAAgCCAJIAMbIgg3AwggAEKAgAggCCAIQoCACFobPgIQDAELQXYhBAsgBkEQaiQAIAQLXwEBf0G4fyEDIAFBAUEFIAIbIgFPBH8gACABakEBay0AACIAQQNxQQJ0QcAaaigCACABaiAAQQR2QQxxQdAaaigCAGogAEEgcSIBRWogAUEFdiAAQcAASXFqBUG4fwsLzQECA38CfiMAQTBrIgMkAAJAA0AgAUEFTwRAAkAgACgAAEFwcUHQ1LTCAUYEQEJ+IQUgAUEISQ0EIAAoAAQiBEF3Sw0EIARBCGoiAiABSw0EIARBgX9JDQEMBAsgAyAAIAFBABAbIQJCfiADKQMAQgAgAygCFEEBRxsgAhsiBUJ9Vg0DIAUgBnwiBiAFVCECQn4hBSACDQMgACABQQAQHiICQYh/Sw0DCyABIAJrIQEgACACaiEADAELC0J+IAYgARshBQsgA0EwaiQAIAUL4gEBAn8jAEFAaiIDJAACQAJAIAFBCEkgAnINACAAKAAAQXBxQdDUtMIBRw0AQXJBuH8gACgABCIAQQhqIgIgASACSRsgAEF3SxshAgwBCyADQRBqIAAgASACEBsiAkGIf0sNAAJAIAINACABIAMoAigiAmshASAAIAJqIQQDQCAEIAEgA0EEahAfIgJBiH9LDQIgASACQQNqIgJJDQEgASACayEBIAIgBGohBCADKAIIRQ0ACyADKAIwBH8gAUEESQ0BIARBBGoFIAQLIABrIQIMAQtBuH8hAgsgA0FAayQAIAILZAEBf0G4fyEDAkAgAUEDSQ0AIAAtAAIhASACIAAvAAAiAEEBcTYCBCACIABBAXZBA3EiAzYCACACIAAgAUEQdHJBA3YiADYCCAJAAkAgA0EBaw4DAgEAAQtBbA8LIAAhAwsgAwtNAQF/AkAgAkUNACABIAAoAqzpASICRg0AIAAgAjYCuOkBIAAgATYCrOkBIAAoArDpASEDIAAgATYCsOkBIAAgASADIAJrajYCtOkBCwsyAAJAAkACQCAAKAKo6wFBAWoOAwIAAQALIAAQGkEADwsgAEEANgKo6wELIAAoApzrAQv4CgIXfwF+IwBBgAFrIgkkAAJ/IAVFBEBBAAwBCyAFKAIIIQ0gBSgCBAsiD0EARyANQQBHcSEXIABBrNABaiEYIABBoDBqIRkgAEG40AFqIRAgAEGYIGohGiANQQhrIRsgAEGo0ABqIRwgD0EIaiERIA0gD2ohDiAAQRBqIRIgAEGQ6gFqIRMgASEMAkACQAJAA0BBAUEFIAAoAuzqASIKGyELAkADQCAEIAtJDQECQCAEQQRJIApyDQAgAygAAEFwcUHQ1LTCAUcNAEG4fyEIIARBCEkNBiADKAAEIgdBd0sEQEFyIQgMBwsgBCAHQQhqIgZJDQYgB0GAf0sEQCAGIQgMBwsgBCAGayEEIAMgBmohAwwBCwsCQCAFBEAgACAFECMMAQsgABAkIBdFDQAgDyEHAkAgDUEISQ0AIAcoAABBt8jC4X5HDQAgACAHKAAENgKg6wFBYiEIIA1BCEYNBiAcIBEgGyASEA4iBkGIf0sNBiAJQR82AnwgCSAJQfwAaiIVIAlB+ABqIhYgBiARaiIGIA4gBmsQBiIHQYh/Sw0GIAkoAnwiCkEfSw0GIAkoAngiC0EJTw0GIBogCSAKQYAKQYALIAsgEBAlIAlBNDYCfCAJIBUgFiAGIAdqIgYgDiAGaxAGIgdBiH9LDQYgCSgCfCIKQTRLDQYgCSgCeCILQQpPDQYgGSAJIApBoAtBgA0gCyAQECUgCUEjNgJ8IAkgFSAWIAYgB2oiBiAOIAZrEAYiB0GIf0sNBiAJKAJ8IgpBI0sNBiAJKAJ4IgtBCk8NBiASIAkgCkHADUHQDiALIBAQJSAGIAdqIgZBDGoiByAOSw0GIA4gB2shCkEAIQcDQCAHQQNHBEAgBigAACILQQFrIApPDQggGCAHQQJ0aiALNgIAIAdBAWohByAGQQRqIQYMAQsLIAYgD2siBkGIf0sNBiAAQoGAgIAQNwOI6gEgBiAPaiEHCyAAIAAoAqzpASIGNgK46QEgACgCsOkBIQggACAHNgKw6QEgACAONgKs6QEgACAHIAggBmtqNgK06QELIAAgDCACECBBuH8hCCAEQQVBCSAAKALs6gEiBhtJDQQgA0EBQQUgBhsgBhAcIgdBiH9LBEAgByEGDAQLIAQgB0EDakkNBCAAIAMgBxAmIgZBiH9LDQMgACgCuOsBIgYEQCAAIAAoAtDpASIIIAYgBiAISxs2AtDpAQsgAiAMaiEKIAQgB2shBCADIAdqIQMgDCEHA0AgAyAEIAkQHyIIQYh/SwRAIAghBgwFCyAIIARBA2siC0sEQEG4fyEGDAULIANBA2oiAyAKIAMgCkkbIAogAyAHTxshBEFsIQYCQAJAAkACQAJAAkACQAJAIAkoAgAOAwECAAwLIAAgByAEIAdrIAMgCEEAECchBgwECyAIIAogB2tLDQkgB0UEQCAIDQIMBQsgCCIGRQ0FIAcgAyAG/AoAAAwFCyAJKAIIIgYgBCAHa0sNCCAHDQEgBkUNAwtBtn8hBgwICyAGRQ0AIAcgAy0AACAG/AsACyAGQYh/Sw0GDAELQQAhBgsgACgC9OoBBEAgEyAHIAYQKAsgCyAIayEEIAMgCGohAyAGIAdqIQcgCSgCBEUNAAsgACkDwOkBIh1Cf1EgHSAHIAxrrFFyRQRAQWwhCAwFCyAAKALg6QEEQEFqIQggBEEESQ0FIAAoAvDqAUUEQCADKAAAIBMQKadHDQYLIARBBGshBCADQQRqIQMLIAcgDGsiBkGJf08NAyACIAZrIQIgBiAMaiEMQQEhFAwBCwsgBARAQbh/IQgMAwsgDCABayEIDAILQbp/IQYLQbh/IAYgBkF2RhsgBiAUGyEICyAJQYABaiQAIAgL4gEBAX8gAQRAIAAgACgCuOkBIAEoAgQgASgCCGpHNgKk6wEgABAkIAAgASgCqNUBNgKg6wEgACABKAIEIgI2ArTpASAAIAI2ArDpASAAIAIgASgCCGoiAjYCrOkBIAAgAjYCuOkBIAEoAqzVAQRAIABCgYCAgBA3A4jqASAAIAFBpNAAajYCDCAAIAFBlCBqNgIIIAAgAUGcMGo2AgQgACABQQxqNgIAIAAgASgCqNABNgKs0AEgACABKAKs0AE2ArDQASAAIAEoArDQATYCtNABDwsgAEIANwOI6gEPCyAAECQLuAEAIABCADcCrOkBIABCADcD8OkBIABBjICA4AA2AqhQIABBADYCoOsBIABCADcDiOoBIABBATYClOsBIABCAzcDgOoBIABBtOkBakIANwIAIABB+OkBakIANwMAIABB9A4pAgA3AqzQASAAQbTQAWpB/A4oAgA2AgAgACAAQRBqNgIAIAAgAEGgMGo2AgQgACAAQZggajYCCCAAIABBqNAAajYCDCAAQQFBBSAAKALs6gEbNgK86QELnAUCCX8BfiAAQQxqIQ8gAkEBaiENQYCAAiAFdEEQdiEMQQAhAkEBIQdBASAFdCIKQQFrIg4hCQNAIAIgDUZFBEACQCABIAJBAXQiC2ovAQAiCEH//wNGBEAgDyAJQQN0aiACNgIAIAlBAWshCUEBIQgMAQsgB0EAIAwgCMFKGyEHCyAGIAtqIAg7AQAgAkEBaiECDAELCyAAIAU2AgQgACAHNgIAAkAgCSAORgRAIAZB6gBqIQxBACEJQQAhBwNAIAkgDUYEQCAKQQN2IApBAXZqQQNqIgFBAXQhCUEAIQhBACEHA0AgByAKTw0EIAcgDGohDUEAIQIDQCACQQJGRQRAIA8gASACbCAIaiAOcUEDdGogAiANai0AADYCACACQQFqIQIMAQsLIAdBAmohByAIIAlqIA5xIQgMAAsABSABIAlBAXRqLgEAIQggByAMaiILIBA3AABBCCECA0AgAiAITkUEQCACIAtqIBA3AAAgAkEIaiECDAELCyAQQoGChIiQoMCAAXwhECAJQQFqIQkgByAIaiEHDAELAAsACyAKQQN2IApBAXZqQQNqIQxBACEHQQAhCANAIAcgDUYNAUEAIQIgASAHQQF0ai4BACILQQAgC0EAShshCwNAIAIgC0ZFBEAgDyAIQQN0aiAHNgIAA0AgCCAMaiAOcSIIIAlLDQALIAJBAWohAgwBCwsgB0EBaiEHDAALAAsgAEEIaiEHIAVBH2shBUEAIQgDQCAIIApGRQRAIAYgByAIQQN0aiIAKAIEIgFBAXRqIgIgAi8BACICQQFqOwEAIAAgBSACZ2oiCToAAyAAIAIgCXQgCms7AQAgACABIARqLQAAOgACIAAgAyABQQJ0aigCADYCBCAIQQFqIQgMAQsLC+sBACAAQcDpAWogASACIAAoAuzqARAbIgFBiH9NBH8gAQRAQbh/DwsCQCAAKAKw6wFBAUcNACAAKAKs6wFFDQAgABAqCwJAIAAoAtzpASIBRQ0AIAAoAqDrASABRg0AQWAPCwJAIAAoAuDpAQRAIAAgACgC8OoBIgFFNgL06gEgAQ0BIABBkOoBakEAQdgA/AsAIABC+erQ0OfJoeThADcDsOoBIABCz9bTvtLHq9lCNwOg6gEgAELW64Lu6v2J9eAANwOY6gEMAQsgAEEANgL06gELIAAgACkD8OkBIAKtfDcD8OkBQQAFIAELC8WoAQIofwF+IwBB0AJrIgYkAAJAAkAgACgClOsBIgcEfyAAKALQ6QEFQYCACAsgBEkNAAJAIARBAkkNACADLQAAIg5BA3EhESAHBH8gACgC0OkBBUGAgAgLIQwCQAJAAkACQAJAAkACQAJAAkACQCARQQFrDgMDAQACCyAAKAKI6gENAEFiIQgMCwsgBEEFSQ0IQQMhByADKAAAIQgCfwJ/AkACQAJAIA5BAnZBA3EiDkECaw4CAQIACyAIQQ52Qf8HcSEKIAhBBHZB/wdxIQkgDkEARwwDCyAIQRJ2IQogCEEEdkH//wBxIQlBBAwBCyADLQAEQQp0IAhBFnZyIQogCEEEdkH//w9xIQlBBQshB0EBCyELQbp/IQggAUEBIAkbRQ0KIAkgDEsNCCAJQQZJIAtxBEBBaCEIDAsLIAcgCmoiDyAESw0IIAwgAiACIAxLGyIOIAlJDQogACABIAIgCSAFIA5BABArAkAgACgCpOsBRSAJQYEGSXINAEEAIQgDQCAIQYOAAUsNASAIQUBrIQgMAAsACyARQQNGBEAgAyAHaiEOIAAoAgwiBS0AAUEIdCEHIAAoAvzrASEIIAtFBEAgBwRAIAZB4AFqIA4gChAIIgxBiH9LDQkgBUEEaiEOIAggCWohDSAFLwECIRIgCUEETwRAIA1BA2shFkEAIBJrQR9xIRMgBigC6AEhBSAGKALsASEHIAYoAvABIRAgBigC4AEhCyAGKALkASEMA0AgDEEgSwRAQbAaIQUMCgsCQCAFIBBPBEAgDEEHcSEKIAxBA3YhC0EBIQwMAQsgBSAHRg0KIAwgDEEDdiIKIAUgB2sgBSAKayAHTyIMGyILQQN0ayEKCyAFIAtrIgUoAAAhCyAMRSAIIBZPcg0IIAggDiALIAp0IBN2QQJ0aiIMLwEAOwAAIAggDC0AA2oiCCAOIAsgCiAMLQACaiIMdCATdkECdGoiCi8BADsAACAIIAotAANqIQggDCAKLQACaiEMDAALAAsgBigC5AEiDEEhTwRAIAZBsBo2AugBDAkLIAYoAugBIgcgBigC8AFPBEAgBiAMQQdxIgU2AuQBIAYgByAMQQN2ayIHNgLoASAGIAcoAAA2AuABIAUhDAwJCyAHIAYoAuwBIgVGDQggBiAMIAcgBWsgDEEDdiIKIAcgCmsgBUkbIgVBA3RrIgw2AuQBIAYgByAFayIFNgLoASAGIAUoAAA2AuABDAgLIAggCSAOIAogBRARIQwMCAsgBwRAIAggCSAOIAogBRASIQwMCAsgCCAJIA4gCiAFEBQhDAwHCyAAQazVAWohDiADIAdqIQUgAEGo0ABqIQggACgC/OsBIQcgC0UEQCAIIAUgCiAOEA0iDEGIf0sNByAKIAxNDQMgByAJIAUgDGogCiAMayAIEBEhDAwHCyAJRQRAQbp/IQwMBwsgCkUEQEFsIQwMBwtBDyELIAlBCHYiDCAJIApLBH8gCkEEdCAJbgVBDwtBBHQiDUGMCGooAgBsIA1BiAhqKAIAaiILQQV2IAtqIA1BgAhqKAIAIA1BhAhqKAIAIAxsakkEQCAIIAUgCiAOEA4iDEGIf0sNByAKIAxNDQMgByAJIAUgDGogCiAMayAIEBIhDAwHCyAIIAUgCiAOEA0iDEGIf0sNBiAKIAxNDQIgByAJIAUgDGogCiAMayAIEBQhDAwGC0ECIQkCfwJAAkACQCAOQQJ2QQNxQQFrDgMBAAIAC0EBIQkgDkEDdgwCCyADLwAAQQR2DAELIARBAkYNCEEDIQkgAy8AACADLQACQRB0ckEEdgshEEG6fyEIIAFBASAQG0UNCSAMIBBJDQcgAiAQSQ0JIAAgASACIBAgBSAMIAIgAiAMSxtBARArIAQgCSAQaiIPQSBqSQRAIAQgD0kNCCADIAlqIQUgACgC/OsBIQgCQCAAKAKE7AFBAkYEQCAQQYCABGsiDgRAIAggBSAO/AoAAAsgAEGI7AFqIAUgDmpBgIAE/AoAAAwBCyAQRQ0AIAggBSAQ/AoAAAsgACAQNgKI6wEgACAAKAL86wE2AvjqAQwHCyAAQQA2AoTsASAAIBA2AojrASAAIAMgCWoiBTYC+OoBIAAgBSAQajYCgOwBDAYLAn8CQAJAAkAgDkECdkEDcUEBaw4DAQACAAsgDkEDdiEQQQEMAgsgBEECRg0IIAMvAABBBHYhEEECDAELIARBBEkNByADLwAAIAMtAAJBEHRyQQR2IRBBAwshCUG6fyEIIAFBASAQG0UNCCAMIBBJDQYgAiAQSQ0IIAAgASACIBAgBSAMIAIgAiAMSxtBARArIAMgCWoiDi0AACEFIAAoAvzrASEIAkAgACgChOwBQQJGBEAgEEGAgARrIgcEQCAIIAUgB/wLAAsgAEGI7AFqIA4tAABBgIAE/AsADAELIBBFDQAgCCAFIBD8CwALIAAgEDYCiOsBIAAgACgC/OsBNgL46gEgCUEBaiEPDAULQbh/IQwMAwsgCiEMCyAGIAw2AuQBIAYgBTYC6AEgBiALNgLgAQsCQCANIAhrQQJJDQAgDUECayEHQQAgEmtBH3EhCgNAAkAgDEEhTwRAIAZBsBo2AugBDAELIAYCfyAGKALoASIFIAYoAvABTwRAIAYgBSAMQQN2ayIFNgLoAUEBIRkgDEEHcQwBCyAFIAYoAuwBIgtGDQEgBiAFIAxBA3YiEyAFIAtrIAUgE2sgC08iGRsiC2siBTYC6AEgDCALQQN0awsiDDYC5AEgBiAFKAAAIgU2AuABIBlFIAcgCElyDQAgCCAOIAUgDHQgCnZBAnRqIgUvAQA7AAAgBiAGKALkASAFLQACaiIMNgLkASAIIAUtAANqIQgMAQsLA0AgByAISQ0BIAggDiAGKALgASAMdCAKdkECdGoiBS8BADsAACAGIAYoAuQBIAUtAAJqIgw2AuQBIAggBS0AA2ohCAwACwALAkAgCCANTw0AIAggDiAGKALgASAMdEEAIBJrdkECdGoiBS0AADoAACAFLQADQQFGBEAgBigC5AEgBS0AAmohDAwBCyAGKALkASIMQR9LDQBBICAMIAUtAAJqIgUgBUEgTxshDAtBbEFsIAkgDEEgRxsgBigC6AEgBigC7AFHGyEMCyAAKAKE7AFBAkYEQCAAQYjsAWogACgCgOwBQYCABGtBgIAE/AoAACAJQYCABGsiBQRAIAAoAvzrASIIQeD/A2ogCCAF/AoAAAsgACAAKAL86wFB4P8DajYC/OsBIAAgACgCgOwBQSBrNgKA7AELIAxBiH9LDQEgACAJNgKI6wEgAEEBNgKI6gEgACAAKAL86wE2AvjqASARQQJGBEAgACAAQajQAGo2AgwLIA8iCEGIf0sNAwsgACgClOsBBH8gACgC0OkBBUGAgAgLIQUgBCAPRg0BIAQgD2shDiAAKAK06QEhCyADIARqIQkgACgCpOsBIQcCfwJAAn8gAyAPaiIELQAAIgzAIgNBAE4EQCAEQQFqDAELIANBf0YEQCAOQQNJDQUgBEEDaiEDIAQvAAFBgP4BaiEMDAILIA5BAUYNBCAELQABIAxBCHRyQYCAAmshDCAEQQJqCyEDIAwNAEFsIQggAyAJRw0EQQAhDCAODAELQbh/IQggA0EBaiIKIAlLDQMgAy0AACIDQQNxDQEgAEEQaiAAIANBBnZBI0EJIAogCSAKa0HADUHQDkGADyAAKAKM6gEgByAMIABBrNUBaiINECwiCEGIf0sNASAAQZggaiAAQQhqIANBBHZBA3FBH0EIIAggCmoiCiAJIAprQYAKQYALQZATIAAoAozqASAAKAKk6wEgDCANECwiEUGIf0sNAUFsIQggAEGgMGogAEEEaiADQQJ2QQNxQTRBCSAKIBFqIgMgCSADa0GgC0GADUGgFSAAKAKM6gEgACgCpOsBIAwgDRAsIglBiH9LDQMgAyAJaiAEawsiCEGIf0sNAgJAIAFBAEcgAkEAR3FFIAxBAEpxDQACQAJAIAEgAiAFIAIgBUkbIgNBACADQQBKG2ogC2siA0H8//8fTQRAIAcgA0GBgIAISXIgDEEJSHINAiAGQeABaiAAKAIIIAwQLQwBCyAGQeABaiAAKAIIIAwQLSAGKALkAUEZSyEbIAcNAQsgBigC4AFBE0shBwsgDiAIayEDIAQgCGohBSAAQQA2AqTrASAAKAKE7AEhBAJAIAcEQAJ/IARBAUYEQCAAKAL86wEMAQsgASACQQAgAkEAShtqCyEVIAYgACgC+OoBIgg2AswCIAAoAoDsASESIAxFBEAgASECDAILIAAoArjpASEUIAAoArTpASEXIAAoArDpASEOIABBATYCjOoBIABBrNABaiEkIAZB1AFqIRxBACEEA0AgBEEDRkUEQCAcIARBAnQiAmogAiAkaigCADYCACAEQQFqIQQMAQsLQWwhCCAGQagBaiICIAUgAxAIQYh/Sw0FIAZBvAFqIAIgACgCABAuIAZBxAFqIAIgACgCCBAuIAZBzAFqIAIgACgCBBAuQQggDCAMQQhOGyIlQQAgJUEAShshGSAMQQFrISYgASAOayEdIAYoArABIQQgBigC2AEhByAGKALUASEPIAYoAqwBIQMgBigCtAEhCyAGKAK4ASEYIAYoAsgBIScgBigC0AEhKCAGKALAASEpIAYoAqgBIQIgBigCxAEhEyAGKALMASEWIAYoArwBIR8gG0UhKkEAIRADQCAPIREgECAZRgRAIAYgFjYCzAEgBiAfNgK8ASAGIAQ2ArABIAYgEzYCxAEgBiACNgKoASAAQZjsAWohEyAAQYjsBWohFiAAQYjsAWohGCAVQSBrIRogG0UhHyABIQIDQCAMIBlHBEAgBigCwAEgBigCvAFBA3RqIgMtAAIhCiAGKALQASAGKALMAUEDdGoiBC0AAiERIAYoAsgBIAYoAsQBQQN0aiIFLQADIQ8gBC0AAyEbIAMtAAMhHiAFLwEAISEgBC8BACEiIAMvAQAhIyAFKAIEIQ0gAygCBCEQIAQoAgQhCQJAIAUtAAIiA0ECTwRAAkAgHyADQRlJckUEQCANIAYoAqgBIg0gBigCrAEiBHRBBSADa3ZBBXRqIQsCQCADIARqQQVrIgRBIU8EQCAGQbAaNgKwAQwBCyAGKAKwASIFIAYoArgBTwRAIAYgBEEHcSIDNgKsASAGIAUgBEEDdmsiBDYCsAEgBiAEKAAAIg02AqgBIAMhBAwBCyAFIAYoArQBIgNGDQAgBiAEIAUgA2sgBEEDdiIEIAUgBGsgA0kbIgNBA3RrIgQ2AqwBIAYgBSADayIDNgKwASAGIAMoAAAiDTYCqAELIAYgBEEFaiIHNgKsASALIA0gBHRBG3ZqIQsMAQsgBiAGKAKsASIEIANqIgc2AqwBIAYoAqgBIAR0QQAgA2t2IA1qIQsgB0EhTwRAIAZBsBo2ArABDAELIAYoArABIgQgBigCuAFPBEAgBiAHQQdxIgM2AqwBIAYgBCAHQQN2ayIENgKwASAGIAQoAAA2AqgBIAMhBwwBCyAEIAYoArQBIgNGDQAgBiAHIAQgA2sgB0EDdiIFIAQgBWsgA0kbIgNBA3RrIgc2AqwBIAYgBCADayIDNgKwASAGIAMoAAA2AqgBCyAGKQLUASEuIAYgCzYC1AEgBiAuNwLYAQwBCyAQRSEEIANFBEAgHCAQQQBHQQJ0aigCACEDIAYgHCAEQQJ0aigCACILNgLUASAGIAM2AtgBIAYoAqwBIQcMAQsgBiAGKAKsASIDQQFqIgc2AqwBAkACQCAEIA1qIAYoAqgBIAN0QR92aiIDQQNGBEAgBigC1AFBAWsiA0F/IAMbIQsMAQsgHCADQQJ0aigCACIEQX8gBBshCyADQQFGDQELIAYgBigC2AE2AtwBCyAGIAYoAtQBNgLYASAGIAs2AtQBCyAKIBFqIQMCQCARRQRAIAchBAwBCyAGIAcgEWoiBDYCrAEgBigCqAEgB3RBACARa3YgCWohCQsCQCADQRRJDQAgBEEhTwRAIAZBsBo2ArABDAELIAYoArABIgUgBigCuAFPBEAgBiAEQQdxIgM2AqwBIAYgBSAEQQN2ayIENgKwASAGIAQoAAA2AqgBIAMhBAwBCyAFIAYoArQBIgNGDQAgBiAEIAUgA2sgBEEDdiIEIAUgBGsgA0kbIgNBA3RrIgQ2AqwBIAYgBSADayIDNgKwASAGIAMoAAA2AqgBCwJAIApFBEAgBCEDDAELIAYgBCAKaiIDNgKsASAGKAKoASAEdEEAIAprdiAQaiEQCwJAIANBIU8EQEGwGiEEIAZBsBo2ArABDAELIAYoArABIgQgBigCuAFPBEAgBiADQQdxIgU2AqwBIAYgBCADQQN2ayIENgKwASAGIAQoAAA2AqgBIAUhAwwBCyAEIAYoArQBIgVGDQAgBiAEIAQgBWsgA0EDdiIHIAQgB2sgBUkbIgVrIgQ2ArABIAYgAyAFQQN0ayIDNgKsASAGIAQoAAA2AqgBCwJAIBkgJkYNACAGIB5BAnRBsBlqKAIAIAYoAqgBIgVBACADIB5qIgNrdnEgI2o2ArwBIAYgG0ECdEGwGWooAgAgBUEAIAMgG2oiA2t2cSAiajYCzAECQCADQSFPBEBBsBohBCAGQbAaNgKwAQwBCyAGKAK4ASAETQRAIAYgA0EHcSIHNgKsASAGIAQgA0EDdmsiBDYCsAEgBiAEKAAAIgU2AqgBIAchAwwBCyAEIAYoArQBIgdGDQAgBiAEIAQgB2sgA0EDdiIFIAQgBWsgB0kbIgVrIgQ2ArABIAYgAyAFQQN0ayIDNgKsASAGIAQoAAAiBTYCqAELIAYgAyAPaiIDNgKsASAGIA9BAnRBsBlqKAIAIAVBACADa3ZxICFqNgLEASADQSFPBEAgBkGwGjYCsAEMAQsgBigCuAEgBE0EQCAGIANBB3E2AqwBIAYgBCADQQN2ayIDNgKwASAGIAMoAAA2AqgBDAELIAQgBigCtAEiBUYNACAGIAMgBCAFayADQQN2IgMgBCADayAFSRsiA0EDdGs2AqwBIAYgBCADayIDNgKwASAGIAMoAAA2AqgBCwJAAkAgACgChOwBQQJGBEAgBigCzAIiBSAGQeABaiAZQQdxQQxsaiIKKAIAIgRqIg0gACgCgOwBIgNLBEAgAyAFRwRAIAMgBWsiAyAVIAJrSw0LIAIgBSADEC8gCiAEIANrIgQ2AgAgAiADaiECCyAGIBg2AswCIABBADYChOwBAkACQAJAIARBgIAESg0AIAIgCigCBCIPIARqIgdqIBpLDQAgB0EgaiAVIAJrTQ0BCyAGIAooAgg2AoABIAYgCikCADcDeCACIBUgBkH4AGogBkHMAmogFiAOIBcgFBAwIQcMAQsgBCAYaiERIAIgBGohAyAKKAIIIQUgGCkAACEuIAIgGCkACDcACCACIC43AAACQCAEQRFJDQAgEykAACEuIAIgEykACDcAGCACIC43ABAgBEEQa0ERSA0AIAJBIGohBCATIQ0DQCANKQAQIS4gBCANKQAYNwAIIAQgLjcAACANKQAgIS4gBCANKQAoNwAYIAQgLjcAECANQSBqIQ0gBEEgaiIEIANJDQALCyADIAVrIQQgBiARNgLMAiADIA5rIAVJBEAgBSADIBdrSw0PIBQgFCAEIA5rIgRqIg0gD2pPBEAgD0UNAiADIA0gD/wKAAAMAgtBACAEayIRBEAgAyANIBH8CgAACyAEIA9qIQ8gAyAEayEDIA4hBAsgBUEQTwRAIAQpAAAhLiADIAQpAAg3AAggAyAuNwAAIA9BEUgNASADIA9qIQUgA0EQaiEDA0AgBCkAECEuIAMgBCkAGDcACCADIC43AAAgBCkAICEuIAMgBCkAKDcAGCADIC43ABAgBEEgaiEEIANBIGoiAyAFSQ0ACwwBCwJAIAVBB00EQCADIAQtAAA6AAAgAyAELQABOgABIAMgBC0AAjoAAiADIAQtAAM6AAMgAyAEIAVBAnQiBUHgGmooAgBqIgQoAAA2AAQgBCAFQYAbaigCAGshBAwBCyADIAQpAAA3AAALIA9BCUkNACADIA9qIQ0gA0EIaiIFIARBCGoiBGtBD0wEQANAIAUgBCkAADcAACAEQQhqIQQgBUEIaiIFIA1JDQAMAgsACyAEKQAAIS4gBSAEKQAINwAIIAUgLjcAACAPQRlIDQAgA0EYaiEDA0AgBCkAECEuIAMgBCkAGDcACCADIC43AAAgBCkAICEuIAMgBCkAKDcAGCADIC43ABAgBEEgaiEEIANBIGoiAyANSQ0ACwsgB0GIf0sEQCAHIQgMDgsgCiALNgIIIAogCTYCBCAKIBA2AgAgECAdaiEEIBYhEgwDCyANQSBrIQMCQAJAIA0gEksNACACIAooAgQiESAEaiIHaiADSw0AIAdBIGogFSACa00NAQsgBiAKKAIINgKQASAGIAopAgA3A4gBIAIgFSADIAZBiAFqIAZBzAJqIBIgDiAXIBQQMSEHDAILIAIgBGohAyAKKAIIIQogBSkAACEuIAIgBSkACDcACCACIC43AAACQCAEQRFJDQAgBSkAECEuIAIgBSkAGDcAGCACIC43ABAgBEEQa0ERSA0AIAVBEGohBCACQSBqIQUDQCAEKQAQIS4gBSAEKQAYNwAIIAUgLjcAACAEKQAgIS4gBSAEKQAoNwAYIAUgLjcAECAEQSBqIQQgBUEgaiIFIANJDQALCyADIAprIQQgBiANNgLMAiADIA5rIApJBEAgCiADIBdrSw0NIBQgFCAEIA5rIgRqIgUgEWpPBEAgEUUNAyADIAUgEfwKAAAMAwtBACAEayINBEAgAyAFIA38CgAACyAEIBFqIREgAyAEayEDIA4hBAsgCkEQTwRAIAQpAAAhLiADIAQpAAg3AAggAyAuNwAAIBFBEUgNAiADIBFqIQUgA0EQaiEDA0AgBCkAECEuIAMgBCkAGDcACCADIC43AAAgBCkAICEuIAMgBCkAKDcAGCADIC43ABAgBEEgaiEEIANBIGoiAyAFSQ0ACwwCCwJAIApBB00EQCADIAQtAAA6AAAgAyAELQABOgABIAMgBC0AAjoAAiADIAQtAAM6AAMgAyAEIApBAnQiBUHgGmooAgBqIgQoAAA2AAQgBCAFQYAbaigCAGshBAwBCyADIAQpAAA3AAALIBFBCUkNASADIBFqIQogA0EIaiIFIARBCGoiBGtBD0wEQANAIAUgBCkAADcAACAEQQhqIQQgBUEIaiIFIApJDQAMAwsACyAEKQAAIS4gBSAEKQAINwAIIAUgLjcAACARQRlIDQEgA0EYaiEDA0AgBCkAECEuIAMgBCkAGDcACCADIC43AAAgBCkAICEuIAMgBCkAKDcAGCADIC43ABAgBEEgaiEEIANBIGoiAyAKSQ0ACwwBCwJAAkAgBigCzAIiBCAGQeABaiAZQQdxQQxsaiIFKAIAIg1qIhEgEksNACACIAUoAgQiCiANaiIHaiAaSw0AIAdBIGogFSACa00NAQsgBiAFKAIINgKgASAGIAUpAgA3A5gBIAIgFSAGQZgBaiAGQcwCaiASIA4gFyAUEDAhBwwBCyACIA1qIQMgBSgCCCEFIAQpAAAhLiACIAQpAAg3AAggAiAuNwAAAkAgDUERSQ0AIAQpABAhLiACIAQpABg3ABggAiAuNwAQIA1BEGtBEUgNACAEQRBqIQQgAkEgaiEPA0AgBCkAECEuIA8gBCkAGDcACCAPIC43AAAgBCkAICEuIA8gBCkAKDcAGCAPIC43ABAgBEEgaiEEIA9BIGoiDyADSQ0ACwsgAyAFayEEIAYgETYCzAIgAyAOayAFSQRAIAUgAyAXa0sNDCAUIBQgBCAOayIEaiINIApqTwRAIApFDQIgAyANIAr8CgAADAILQQAgBGsiEQRAIAMgDSAR/AoAAAsgBCAKaiEKIAMgBGshAyAOIQQLIAVBEE8EQCAEKQAAIS4gAyAEKQAINwAIIAMgLjcAACAKQRFIDQEgAyAKaiEFIANBEGohAwNAIAQpABAhLiADIAQpABg3AAggAyAuNwAAIAQpACAhLiADIAQpACg3ABggAyAuNwAQIARBIGohBCADQSBqIgMgBUkNAAsMAQsCQCAFQQdNBEAgAyAELQAAOgAAIAMgBC0AAToAASADIAQtAAI6AAIgAyAELQADOgADIAMgBCAFQQJ0IgVB4BpqKAIAaiIEKAAANgAEIAQgBUGAG2ooAgBrIQQMAQsgAyAEKQAANwAACyAKQQlJDQAgAyAKaiENIANBCGoiBSAEQQhqIgRrQQ9MBEADQCAFIAQpAAA3AAAgBEEIaiEEIAVBCGoiBSANSQ0ADAILAAsgBCkAACEuIAUgBCkACDcACCAFIC43AAAgCkEZSA0AIANBGGohAwNAIAQpABAhLiADIAQpABg3AAggAyAuNwAAIAQpACAhLiADIAQpACg3ABggAyAuNwAQIARBIGohBCADQSBqIgMgDUkNAAsLIAdBiH9LBEAgByEIDAsLIAZB4AFqIBlBB3FBDGxqIgMgCzYCCCADIAk2AgQgAyAQNgIAIBAgHWohBAsgAiAHaiECIBlBAWohGSAEIAlqIR0MAQsLIAYoArABIAYoArQBRw0HIAYoAqwBQSBHDQcgDCAlayEQA0ACQCAMIBBMBEBBACEEA0AgBEEDRg0CICQgBEECdCIDaiADIBxqKAIANgIAIARBAWohBAwACwALIAZB4AFqIBBBB3FBDGxqIQQCfwJAIAAoAoTsAUECRgRAIAYoAswCIgUgBCgCACIDaiINIAAoAoDsASIHSwRAIAUgB0cEQCAHIAVrIgcgFSACa0sNCyACIAUgBxAvIAQgAyAHayIDNgIAIAIgB2ohAgsgBiAYNgLMAiAAQQA2AoTsAQJAAkACQCADQYCABEoNACACIAQoAgQiCyADaiIHaiAaSw0AIAdBIGogFSACa00NAQsgBiAEKAIINgJQIAYgBCkCADcDSCACIBUgBkHIAGogBkHMAmogFiAOIBcgFBAwIQcMAQsgAyAYaiEKIAIgA2ohCSAEKAIIIQUgGCkAACEuIAIgGCkACDcACCACIC43AAACQCADQRFJDQAgEykAACEuIAIgEykACDcAGCACIC43ABAgA0EQa0ERSA0AIAJBIGohBCATIQMDQCADKQAQIS4gBCADKQAYNwAIIAQgLjcAACADKQAgIS4gBCADKQAoNwAYIAQgLjcAECADQSBqIQMgBEEgaiIEIAlJDQALCyAJIAVrIQQgBiAKNgLMAiAJIA5rIAVJBEAgBSAJIBdrSw0PIBQgFCAEIA5rIgNqIgQgC2pPBEAgC0UNAiAJIAQgC/wKAAAMAgtBACADayIKBEAgCSAEIAr8CgAACyADIAtqIQsgCSADayEJIA4hBAsgBUEQTwRAIAQpAAAhLiAJIAQpAAg3AAggCSAuNwAAIAtBEUgNASAJIAtqIQUgCUEQaiEDA0AgBCkAECEuIAMgBCkAGDcACCADIC43AAAgBCkAICEuIAMgBCkAKDcAGCADIC43ABAgBEEgaiEEIANBIGoiAyAFSQ0ACwwBCwJAIAVBB00EQCAJIAQtAAA6AAAgCSAELQABOgABIAkgBC0AAjoAAiAJIAQtAAM6AAMgCSAEIAVBAnQiA0HgGmooAgBqIgQoAAA2AAQgBCADQYAbaigCAGshBAwBCyAJIAQpAAA3AAALIAtBCUkNACAJIAtqIQUgCUEIaiIDIARBCGoiBGtBD0wEQANAIAMgBCkAADcAACAEQQhqIQQgA0EIaiIDIAVJDQAMAgsACyAEKQAAIS4gAyAEKQAINwAIIAMgLjcAACALQRlIDQAgCUEYaiEDA0AgBCkAECEuIAMgBCkAGDcACCADIC43AAAgBCkAICEuIAMgBCkAKDcAGCADIC43ABAgBEEgaiEEIANBIGoiAyAFSQ0ACwsgB0GJf08EQCAHIQgMDgsgFiESIAIgB2oMAwsgDUEgayEHAkACQCANIBJLDQAgAiAEKAIEIg8gA2oiCWogB0sNACAJQSBqIBUgAmtNDQELIAYgBCgCCDYCYCAGIAQpAgA3A1ggAiAVIAcgBkHYAGogBkHMAmogEiAOIBcgFBAxIQkMAgsgAiADaiEHIAQoAgghCiAFKQAAIS4gAiAFKQAINwAIIAIgLjcAAAJAIANBEUkNACAFKQAQIS4gAiAFKQAYNwAYIAIgLjcAECADQRBrQRFIDQAgBUEQaiEEIAJBIGohAwNAIAQpABAhLiADIAQpABg3AAggAyAuNwAAIAQpACAhLiADIAQpACg3ABggAyAuNwAQIARBIGohBCADQSBqIgMgB0kNAAsLIAcgCmshBCAGIA02AswCIAcgDmsgCkkEQCAKIAcgF2tLDQ0gFCAUIAQgDmsiA2oiBCAPak8EQCAPRQ0DIAcgBCAP/AoAAAwDC0EAIANrIgUEQCAHIAQgBfwKAAALIAMgD2ohDyAHIANrIQcgDiEECyAKQRBPBEAgBCkAACEuIAcgBCkACDcACCAHIC43AAAgD0ERSA0CIAcgD2ohBSAHQRBqIQMDQCAEKQAQIS4gAyAEKQAYNwAIIAMgLjcAACAEKQAgIS4gAyAEKQAoNwAYIAMgLjcAECAEQSBqIQQgA0EgaiIDIAVJDQALDAILAkAgCkEHTQRAIAcgBC0AADoAACAHIAQtAAE6AAEgByAELQACOgACIAcgBC0AAzoAAyAHIAQgCkECdCIDQeAaaigCAGoiBCgAADYABCAEIANBgBtqKAIAayEEDAELIAcgBCkAADcAAAsgD0EJSQ0BIAcgD2ohBSAHQQhqIgMgBEEIaiIEa0EPTARAA0AgAyAEKQAANwAAIARBCGohBCADQQhqIgMgBUkNAAwDCwALIAQpAAAhLiADIAQpAAg3AAggAyAuNwAAIA9BGUgNASAHQRhqIQMDQCAEKQAQIS4gAyAEKQAYNwAIIAMgLjcAACAEKQAgIS4gAyAEKQAoNwAYIAMgLjcAECAEQSBqIQQgA0EgaiIDIAVJDQALDAELAkACQCAGKALMAiIHIAQoAgAiCmoiDSASSw0AIAIgBCgCBCILIApqIglqIBpLDQAgCUEgaiAVIAJrTQ0BCyAGIAQoAgg2AnAgBiAEKQIANwNoIAIgFSAGQegAaiAGQcwCaiASIA4gFyAUEDAhCQwBCyACIApqIQMgBCgCCCEFIAcpAAAhLiACIAcpAAg3AAggAiAuNwAAAkAgCkERSQ0AIAcpABAhLiACIAcpABg3ABggAiAuNwAQIApBEGtBEUgNACAHQRBqIQQgAkEgaiEHA0AgBCkAECEuIAcgBCkAGDcACCAHIC43AAAgBCkAICEuIAcgBCkAKDcAGCAHIC43ABAgBEEgaiEEIAdBIGoiByADSQ0ACwsgAyAFayEEIAYgDTYCzAIgAyAOayAFSQRAIAUgAyAXa0sNDCAUIBQgBCAOayIEaiIHIAtqTwRAIAtFDQIgAyAHIAv8CgAADAILQQAgBGsiCgRAIAMgByAK/AoAAAsgBCALaiELIAMgBGshAyAOIQQLIAVBEE8EQCAEKQAAIS4gAyAEKQAINwAIIAMgLjcAACALQRFIDQEgAyALaiEFIANBEGohAwNAIAQpABAhLiADIAQpABg3AAggAyAuNwAAIAQpACAhLiADIAQpACg3ABggAyAuNwAQIARBIGohBCADQSBqIgMgBUkNAAsMAQsCQCAFQQdNBEAgAyAELQAAOgAAIAMgBC0AAToAASADIAQtAAI6AAIgAyAELQADOgADIAMgBCAFQQJ0IgVB4BpqKAIAaiIEKAAANgAEIAQgBUGAG2ooAgBrIQQMAQsgAyAEKQAANwAACyALQQlJDQAgAyALaiEHIANBCGoiBSAEQQhqIgRrQQ9MBEADQCAFIAQpAAA3AAAgBEEIaiEEIAVBCGoiBSAHSQ0ADAILAAsgBCkAACEuIAUgBCkACDcACCAFIC43AAAgC0EZSA0AIANBGGohAwNAIAQpABAhLiADIAQpABg3AAggAyAuNwAAIAQpACAhLiADIAQpACg3ABggAyAuNwAQIARBIGohBCADQSBqIgMgB0kNAAsLIAlBiH9LBEAgCSEIDAsLIAIgCWoLIQIgEEEBaiEQDAELCyAAKAKE7AEhBCAGKALMAiEIDAMFICkgH0EDdGoiBS0AAiEaICggFkEDdGoiCS0AAiEeICcgE0EDdGoiDS0AAyEhIAktAAMhIiAFLQADISMgDS8BACErIAkvAQAhLCAFLwEAIS0gDSgCBCEPIAUoAgQhBSAJKAIEIQoCQAJAIA0tAAIiCUECTwRAIAIgA3QhICAqIAlBGUlyRQRAICBBBSAJa3ZBBXQgD2ohDwJAIAMgCWpBBWsiA0EgSwRAQbAaIQQMAQsgBCAYTwRAIAYgA0EHcSIJNgKsASAEIANBA3ZrIgQoAAAhAiAJIQMMAQsgBCALRg0AIAYgAyAEIAtrIANBA3YiAiAEIAJrIAtJGyICQQN0ayIDNgKsASAEIAJrIgQoAAAhAgsgBiADQQVqIg02AqwBIA8gAiADdEEbdmohDwwCCyAGIAMgCWoiDTYCrAEgIEEAIAlrdiAPaiEPIA1BIEsEQEGwGiEEDAILIAQgGE8EQCAGIA1BB3EiAzYCrAEgBCANQQN2ayIEKAAAIQIgAyENDAILIAQgC0YNASAGIA0gBCALayANQQN2IgIgBCACayALSRsiAkEDdGsiDTYCrAEgBCACayIEKAAAIQIMAQsgBUUhICAJRQRAIBwgIEECdGooAgAhDyAcIAVBAEdBAnRqKAIAIREgAyENDAILIAYgA0EBaiINNgKsASAPIAIgA3RBH3ZqICBqIgNBA0YEQCARQQFrIgNBfyADGyEPDAELIBwgA0ECdGooAgAiCUF/IAkbIQ8gA0EBRg0BCyAGIAc2AtwBCyAaIB5qIQMgBiAPNgLUASAGIBE2AtgBAkAgHkUEQCANIQkMAQsgBiANIB5qIgk2AqwBIAIgDXRBACAea3YgCmohCgsCQCADQRRJDQAgCUEgSwRAQbAaIQQMAQsgBCAYTwRAIAYgCUEHcSIDNgKsASAEIAlBA3ZrIgQoAAAhAiADIQkMAQsgBCALRg0AIAYgCSAEIAtrIAlBA3YiAiAEIAJrIAtJGyICQQN0ayIJNgKsASAEIAJrIgQoAAAhAgsCQCAaRQRAIAkhAwwBCyAGIAkgGmoiAzYCrAEgAiAJdEEAIBprdiAFaiEFCwJAIANBIEsEQEGwGiEEDAELIAQgGE8EQCAGIANBB3EiBzYCrAEgBCADQQN2ayIEKAAAIQIgByEDDAELIAQgC0YNACAGIAMgBCALayADQQN2IgIgBCACayALSRsiAkEDdGsiAzYCrAEgBCACayIEKAAAIQILAkAgECAmRg0AICNBAnRBsBlqKAIAIAJBACADICNqIgNrdnEhByAiQQJ0QbAZaigCACACQQAgAyAiaiIDa3ZxIQ0CQAJ/AkACQCADQSBLBEBBsBohBAwBCyAEIBhPBEAgBiADQQdxIgk2AqwBIAQgA0EDdmsMAwsgBCALRw0BCyADIQkMAgsgBiADIAQgC2sgA0EDdiICIAQgAmsgC0kbIgJBA3RrIgk2AqwBIAQgAmsLIgQoAAAhAgsgByAtaiEfIA0gLGohFiAGIAkgIWoiBzYCrAEgIUECdEGwGWooAgAgAkEAIAdrdnEgK2ohEwJ/AkACQCAHQSBLBEBBsBohBAwBCyAEIBhPBEAgBiAHQQdxIgM2AqwBIAQgB0EDdmsMAwsgBCALRw0BCyAHIQMMAgsgBiAHIAQgC2sgB0EDdiICIAQgAmsgC0kbIgJBA3RrIgM2AqwBIAQgAmsLIgQoAAAhAgsgBkHgAWogEEEMbGoiByAPNgIIIAcgCjYCBCAHIAU2AgAgEEEBaiEQIAUgHWogCmohHSARIQcMAQsACwALAn8CQAJAAkAgBA4DAQIAAgsgBiAAKAL46gEiCDYCzAJBACEEIAEgAkEAIAJBAEobaiENIAAoAoDsASERAn8CQCAMRQRAIAEhBQwBCyAAKAK46QEhDyAAKAK06QEhECAAKAKw6QEhDiAAQQE2AozqASAAQazQAWohFSAGQYwCaiESA0AgBEEDRkUEQCASIARBAnQiAmogAiAVaigCADYCACAEQQFqIQQMAQsLIAZB4AFqIgIgBSADEAhBiH9LDQcgBkH0AWogAiAAKAIAEC4gBkH8AWogAiAAKAIIEC4gBkGEAmogAiAAKAIEEC4gG0UhHCABIQUCQANAIAxFDQEgBigC+AEgBigC9AFBA3RqIgItAAIhCSAGKAKIAiAGKAKEAkEDdGoiBC0AAiEWIAYoAoACIAYoAvwBQQN0aiIILQADIRQgBC0AAyEXIAItAAMhGSAILwEAIRggBC8BACEdIAIvAQAhGiAIKAIEIQcgAigCBCEDIAQoAgQhAgJAIAgtAAIiBEECTwRAAkAgHCAEQRlJckUEQCAGKALgASITIAYoAuQBIgh0QQUgBGt2QQV0IAdqIQsCQCAEIAhqQQVrIgRBIU8EQCAGQbAaNgLoAQwBCyAGKALoASIHIAYoAvABTwRAIAYgBEEHcSIINgLkASAGIAcgBEEDdmsiBDYC6AEgBiAEKAAAIhM2AuABIAghBAwBCyAHIAYoAuwBIghGDQAgBiAEIAcgCGsgBEEDdiIEIAcgBGsgCEkbIghBA3RrIgQ2AuQBIAYgByAIayIINgLoASAGIAgoAAAiEzYC4AELIAYgBEEFaiIKNgLkASALIBMgBHRBG3ZqIQsMAQsgBiAGKALkASIIIARqIgo2AuQBIAYoAuABIAh0QQAgBGt2IAdqIQsgCkEhTwRAIAZBsBo2AugBDAELIAYoAugBIgggBigC8AFPBEAgBiAKQQdxIgQ2AuQBIAYgCCAKQQN2ayIINgLoASAGIAgoAAA2AuABIAQhCgwBCyAIIAYoAuwBIgRGDQAgBiAKIAggBGsgCkEDdiIHIAggB2sgBEkbIgRBA3RrIgo2AuQBIAYgCCAEayIENgLoASAGIAQoAAA2AuABCyAGKQKMAiEuIAYgCzYCjAIgBiAuNwKQAgwBCyADRSEIIARFBEAgEiADQQBHQQJ0aigCACEEIAYgEiAIQQJ0aigCACILNgKMAiAGIAQ2ApACIAYoAuQBIQoMAQsgBiAGKALkASIEQQFqIgo2AuQBAkACQCAHIAhqIAYoAuABIAR0QR92aiIEQQNGBEAgBigCjAJBAWsiBEF/IAQbIQsMAQsgEiAEQQJ0aigCACIIQX8gCBshCyAEQQFGDQELIAYgBigCkAI2ApQCCyAGIAYoAowCNgKQAiAGIAs2AowCCyAJIBZqIQgCQCAWRQRAIAohBAwBCyAGIAogFmoiBDYC5AEgBigC4AEgCnRBACAWa3YgAmohAgsCQCAIQRRJDQAgBEEhTwRAIAZBsBo2AugBDAELIAYoAugBIgcgBigC8AFPBEAgBiAEQQdxIgg2AuQBIAYgByAEQQN2ayIENgLoASAGIAQoAAA2AuABIAghBAwBCyAHIAYoAuwBIghGDQAgBiAEIAcgCGsgBEEDdiIEIAcgBGsgCEkbIghBA3RrIgQ2AuQBIAYgByAIayIINgLoASAGIAgoAAA2AuABCwJAIAlFBEAgBCEIDAELIAYgBCAJaiIINgLkASAGKALgASAEdEEAIAlrdiADaiEDCwJAIAhBIU8EQEGwGiEEIAZBsBo2AugBDAELIAYoAugBIgQgBigC8AFPBEAgBiAIQQdxIgc2AuQBIAYgBCAIQQN2ayIENgLoASAGIAQoAAA2AuABIAchCAwBCyAEIAYoAuwBIgdGDQAgBiAEIAQgB2sgCEEDdiIJIAQgCWsgB0kbIgdrIgQ2AugBIAYgCCAHQQN0ayIINgLkASAGIAQoAAA2AuABCwJAIAxBAUYNACAGIBlBAnRBsBlqKAIAIAYoAuABIgdBACAIIBlqIghrdnEgGmo2AvQBIAYgF0ECdEGwGWooAgAgB0EAIAggF2oiCGt2cSAdajYChAICQCAIQSFPBEBBsBohBCAGQbAaNgLoAQwBCyAGKALwASAETQRAIAYgCEEHcSIJNgLkASAGIAQgCEEDdmsiBDYC6AEgBiAEKAAAIgc2AuABIAkhCAwBCyAEIAYoAuwBIglGDQAgBiAEIAQgCWsgCEEDdiIHIAQgB2sgCUkbIgdrIgQ2AugBIAYgCCAHQQN0ayIINgLkASAGIAQoAAAiBzYC4AELIAYgCCAUaiIINgLkASAGIBRBAnRBsBlqKAIAIAdBACAIa3ZxIBhqNgL8ASAIQSFPBEAgBkGwGjYC6AEMAQsgBigC8AEgBE0EQCAGIAhBB3E2AuQBIAYgBCAIQQN2ayIENgLoASAGIAQoAAA2AuABDAELIAQgBigC7AEiB0YNACAGIAggBCAHayAIQQN2IgggBCAIayAHSRsiCEEDdGs2AuQBIAYgBCAIayIENgLoASAGIAQoAAA2AuABCyAGKALMAiIEIANqIgkgACgCgOwBIgdNBEAgCUEgayEHIAYgAzYCqAEgBiACNgKsASAGIAs2ArABAkACQAJAIAkgEUsNACAFIAIgA2oiCGogB0sNACAIQSBqIA0gBWtNDQELIAZBQGsgBigCsAE2AgAgBiAGKQOoATcDOCAFIA0gByAGQThqIAZBzAJqIBEgDiAQIA8QMSEIDAELIAMgBWohByAEKQAAIS4gBSAEKQAINwAIIAUgLjcAAAJAIANBEUkNACAEKQAQIS4gBSAEKQAYNwAYIAUgLjcAECADQRBrQRFIDQAgBEEQaiEEIAVBIGohAwNAIAQpABAhLiADIAQpABg3AAggAyAuNwAAIAQpACAhLiADIAQpACg3ABggAyAuNwAQIARBIGohBCADQSBqIgMgB0kNAAsLIAcgC2shBCAGIAk2AswCIAcgDmsgC0kEQCALIAcgEGtLDQwgDyAPIAQgDmsiA2oiBCACak8EQCACRQ0CIAcgBCAC/AoAAAwCC0EAIANrIgkEQCAHIAQgCfwKAAALIAYgAiADaiICNgKsASAHIANrIQcgDiEECyALQRBPBEAgBCkAACEuIAcgBCkACDcACCAHIC43AAAgAkERSA0BIAIgB2ohAiAHQRBqIQMDQCAEKQAQIS4gAyAEKQAYNwAIIAMgLjcAACAEKQAgIS4gAyAEKQAoNwAYIAMgLjcAECAEQSBqIQQgA0EgaiIDIAJJDQALDAELAkAgC0EHTQRAIAcgBC0AADoAACAHIAQtAAE6AAEgByAELQACOgACIAcgBC0AAzoAAyAHIAQgC0ECdCIDQeAaaigCAGoiBCgAADYABCAEIANBgBtqKAIAayEEDAELIAcgBCkAADcAAAsgAkEJSQ0AIAIgB2ohCSAHQQhqIgMgBEEIaiIEa0EPTARAA0AgAyAEKQAANwAAIARBCGohBCADQQhqIgMgCUkNAAwCCwALIAQpAAAhLiADIAQpAAg3AAggAyAuNwAAIAJBGUgNACAHQRhqIQMDQCAEKQAQIS4gAyAEKQAYNwAIIAMgLjcAACAEKQAgIS4gAyAEKQAoNwAYIAMgLjcAECAEQSBqIQQgA0EgaiIDIAlJDQALCyAIQYh/Sw0MIAxBAWshDCAFIAhqIQUMAQsLIAxBAEwNCCAEIAdHBEBBun8hCCAHIARrIgcgDSAFa0sNCyAFIAQgBxAvIAUgB2ohBSADIAdrIQMLIAYgAEGI7AFqIgQ2AswCIABBADYChOwBIABBiOwFaiERIAYgAzYCqAEgBiACNgKsASAGIAs2ArABAkACQAJAIANBgIAESg0AIAUgAiADaiIIaiANQSBrSw0AIAhBIGogDSAFa00NAQsgBiAGKAKwATYCMCAGIAYpA6gBNwMoIAUgDSAGQShqIAZBzAJqIBEgDiAQIA8QMCEIDAELIAMgBGohCSADIAVqIQcgBCkAACEuIAUgBCkACDcACCAFIC43AAACQCADQRFJDQAgACkAmOwBIS4gBSAAQaDsAWopAAA3ABggBSAuNwAQIANBEGtBEUgNACAAQZjsAWohBCAFQSBqIQMDQCAEKQAQIS4gAyAEKQAYNwAIIAMgLjcAACAEKQAgIS4gAyAEKQAoNwAYIAMgLjcAECAEQSBqIQQgA0EgaiIDIAdJDQALCyAHIAtrIQQgBiAJNgLMAiAHIA5rIAtJBEAgCyAHIBBrSw0KIA8gDyAEIA5rIgNqIgQgAmpPBEAgAkUNAiAHIAQgAvwKAAAMAgtBACADayIJBEAgByAEIAn8CgAACyAGIAIgA2oiAjYCrAEgByADayEHIA4hBAsgC0EQTwRAIAQpAAAhLiAHIAQpAAg3AAggByAuNwAAIAJBEUgNASACIAdqIQIgB0EQaiEDA0AgBCkAECEuIAMgBCkAGDcACCADIC43AAAgBCkAICEuIAMgBCkAKDcAGCADIC43ABAgBEEgaiEEIANBIGoiAyACSQ0ACwwBCwJAIAtBB00EQCAHIAQtAAA6AAAgByAELQABOgABIAcgBC0AAjoAAiAHIAQtAAM6AAMgByAEIAtBAnQiA0HgGmooAgBqIgQoAAA2AAQgBCADQYAbaigCAGshBAwBCyAHIAQpAAA3AAALIAJBCUkNACACIAdqIQkgB0EIaiIDIARBCGoiBGtBD0wEQANAIAMgBCkAADcAACAEQQhqIQQgA0EIaiIDIAlJDQAMAgsACyAEKQAAIS4gAyAEKQAINwAIIAMgLjcAACACQRlIDQAgB0EYaiEDA0AgBCkAECEuIAMgBCkAGDcACCADIC43AAAgBCkAICEuIAMgBCkAKDcAGCADIC43ABAgBEEgaiEEIANBIGoiAyAJSQ0ACwsgCEGIf0sNCiAFIAhqIQUgDEEBayIKRQ0AIA1BIGshHCAbRSEYA0AgBigC+AEgBigC9AFBA3RqIgItAAIhCSAGKAKIAiAGKAKEAkEDdGoiBC0AAiETIAYoAoACIAYoAvwBQQN0aiIILQADIRQgBC0AAyEXIAItAAMhGSAILwEAIRsgBC8BACEdIAIvAQAhGiAIKAIEIQcgAigCBCEDIAQoAgQhDAJAIAgtAAIiAkECTwRAAkAgGCACQRlJckUEQCAGKALgASIWIAYoAuQBIgR0QQUgAmt2QQV0IAdqIQcCQCACIARqQQVrIgRBIU8EQCAGQbAaNgLoAQwBCyAGKALoASIIIAYoAvABTwRAIAYgBEEHcSICNgLkASAGIAggBEEDdmsiBDYC6AEgBiAEKAAAIhY2AuABIAIhBAwBCyAIIAYoAuwBIgJGDQAgBiAEIAggAmsgBEEDdiIEIAggBGsgAkkbIgJBA3RrIgQ2AuQBIAYgCCACayICNgLoASAGIAIoAAAiFjYC4AELIAYgBEEFaiILNgLkASAHIBYgBHRBG3ZqIQcMAQsgBiAGKALkASIEIAJqIgs2AuQBIAYoAuABIAR0QQAgAmt2IAdqIQcgC0EhTwRAIAZBsBo2AugBDAELIAYoAugBIgQgBigC8AFPBEAgBiALQQdxIgI2AuQBIAYgBCALQQN2ayIENgLoASAGIAQoAAA2AuABIAIhCwwBCyAEIAYoAuwBIgJGDQAgBiALIAQgAmsgC0EDdiIIIAQgCGsgAkkbIgJBA3RrIgs2AuQBIAYgBCACayICNgLoASAGIAIoAAA2AuABCyAGKQKMAiEuIAYgBzYCjAIgBiAuNwKQAgwBCyADRSEEIAJFBEAgEiADQQBHQQJ0aigCACECIAYgEiAEQQJ0aigCACIHNgKMAiAGIAI2ApACIAYoAuQBIQsMAQsgBiAGKALkASICQQFqIgs2AuQBAkACQCAEIAdqIAYoAuABIAJ0QR92aiICQQNGBEAgBigCjAJBAWsiAkF/IAIbIQcMAQsgEiACQQJ0aigCACIEQX8gBBshByACQQFGDQELIAYgBigCkAI2ApQCCyAGIAYoAowCNgKQAiAGIAc2AowCCyAJIBNqIQICQCATRQRAIAshBAwBCyAGIAsgE2oiBDYC5AEgBigC4AEgC3RBACATa3YgDGohDAsCQCACQRRJDQAgBEEhTwRAIAZBsBo2AugBDAELIAYoAugBIgggBigC8AFPBEAgBiAEQQdxIgI2AuQBIAYgCCAEQQN2ayIENgLoASAGIAQoAAA2AuABIAIhBAwBCyAIIAYoAuwBIgJGDQAgBiAEIAggAmsgBEEDdiIEIAggBGsgAkkbIgJBA3RrIgQ2AuQBIAYgCCACayICNgLoASAGIAIoAAA2AuABCwJAIAlFBEAgBCEIDAELIAYgBCAJaiIINgLkASAGKALgASAEdEEAIAlrdiADaiEDCwJAIAhBIU8EQEGwGiEEIAZBsBo2AugBDAELIAYoAugBIgQgBigC8AFPBEAgBiAIQQdxIgI2AuQBIAYgBCAIQQN2ayIENgLoASAGIAQoAAA2AuABIAIhCAwBCyAEIAYoAuwBIgJGDQAgBiAEIAQgAmsgCEEDdiIJIAQgCWsgAkkbIgJrIgQ2AugBIAYgCCACQQN0ayIINgLkASAGIAQoAAA2AuABCwJAIApBAUYNACAGIBlBAnRBsBlqKAIAIAYoAuABIgJBACAIIBlqIghrdnEgGmo2AvQBIAYgF0ECdEGwGWooAgAgAkEAIAggF2oiCGt2cSAdajYChAICQCAIQSFPBEBBsBohBCAGQbAaNgLoAQwBCyAGKALwASAETQRAIAYgCEEHcSIJNgLkASAGIAQgCEEDdmsiBDYC6AEgBiAEKAAAIgI2AuABIAkhCAwBCyAEIAYoAuwBIglGDQAgBiAEIAQgCWsgCEEDdiICIAQgAmsgCUkbIgJrIgQ2AugBIAYgCCACQQN0ayIINgLkASAGIAQoAAAiAjYC4AELIAYgCCAUaiIINgLkASAGIBRBAnRBsBlqKAIAIAJBACAIa3ZxIBtqNgL8ASAIQSFPBEAgBkGwGjYC6AEMAQsgBigC8AEgBE0EQCAGIAhBB3E2AuQBIAYgBCAIQQN2ayICNgLoASAGIAIoAAA2AuABDAELIAQgBigC7AEiAkYNACAGIAggBCACayAIQQN2IgggBCAIayACSRsiAkEDdGs2AuQBIAYgBCACayICNgLoASAGIAIoAAA2AuABCyAGIAM2AqgBIAYgDDYCrAEgBiAHNgKwAQJAAkACQCAGKALMAiIEIANqIgkgEUsNACAFIAMgDGoiCGogHEsNACAIQSBqIA0gBWtNDQELIAYgBigCsAE2AiAgBiAGKQOoATcDGCAFIA0gBkEYaiAGQcwCaiARIA4gECAPEDAhCAwBCyADIAVqIQIgBCkAACEuIAUgBCkACDcACCAFIC43AAACQCADQRFJDQAgBCkAECEuIAUgBCkAGDcAGCAFIC43ABAgA0EQa0ERSA0AIARBEGohBCAFQSBqIQMDQCAEKQAQIS4gAyAEKQAYNwAIIAMgLjcAACAEKQAgIS4gAyAEKQAoNwAYIAMgLjcAECAEQSBqIQQgA0EgaiIDIAJJDQALCyACIAdrIQQgBiAJNgLMAiACIA5rIAdJBEAgByACIBBrSw0LIA8gDyAEIA5rIgNqIgQgDGpPBEAgDEUNAiACIAQgDPwKAAAMAgtBACADayIJBEAgAiAEIAn8CgAACyAGIAMgDGoiDDYCrAEgDiEEIAIgA2shAgsgB0EQTwRAIAQpAAAhLiACIAQpAAg3AAggAiAuNwAAIAxBEUgNASACIAxqIQcgAkEQaiEDA0AgBCkAECEuIAMgBCkAGDcACCADIC43AAAgBCkAICEuIAMgBCkAKDcAGCADIC43ABAgBEEgaiEEIANBIGoiAyAHSQ0ACwwBCwJAIAdBB00EQCACIAQtAAA6AAAgAiAELQABOgABIAIgBC0AAjoAAiACIAQtAAM6AAMgAiAEIAdBAnQiA0HgGmooAgBqIgQoAAA2AAQgBCADQYAbaigCAGshBAwBCyACIAQpAAA3AAALIAxBCUkNACACIAxqIQcgAkEIaiIDIARBCGoiBGtBD0wEQANAIAMgBCkAADcAACAEQQhqIQQgA0EIaiIDIAdJDQAMAgsACyAEKQAAIS4gAyAEKQAINwAIIAMgLjcAACAMQRlIDQAgAkEYaiEDA0AgBCkAECEuIAMgBCkAGDcACCADIC43AAAgBCkAICEuIAMgBCkAKDcAGCADIC43ABAgBEEgaiEEIANBIGoiAyAHSQ0ACwsgCEGIf0sNCyAFIAhqIQUgCkEBayIKDQALCyAGKALoASAGKALsAUcNB0FsIQggBigC5AFBIEcNCUEAIQQDQCAEQQNGRQRAIBUgBEECdCICaiACIBJqKAIANgIAIARBAWohBAwBCwsgBigCzAIiCCAAKAKE7AFBAkcNARoLIBEgCGsiAiANIAVrSw0FQQAhAyAFBEAgAgRAIAUgCCAC/AoAAAsgAiAFaiEDCyAAQQA2AoTsASAAQYjsBWohESADIQUgAEGI7AFqCyEIIBEgCGsiACANIAVrSw0EIAUEfyAABEAgBSAIIAD8CgAACyAAIAVqBUEACyABayEIDAcLIAEgAkEAIAJBAEobagwBCyAAKAL86wELIQkgBiAAKAL46gEiBDYCzAIgBCAAKAKI6wFqIQ8CQCAMRQRAIAEhAgwBCyAAKAK46QEhEiAAKAK06QEhFiAAKAKw6QEhDiAAQQE2AozqASAAQazQAWohFSAGQYwCaiENQQAhBANAIARBA0ZFBEAgDSAEQQJ0IgJqIAIgFWooAgA2AgAgBEEBaiEEDAELC0FsIQggBkHgAWoiAiAFIAMQCEGIf0sNBSAGQfQBaiACIAAoAgAQLiAGQfwBaiACIAAoAggQLiAGQYQCaiACIAAoAgQQLiAJQSBrIRwgG0UhGCABIQIDQCAMBEAgBigC+AEgBigC9AFBA3RqIgAtAAIhCyAGKAKIAiAGKAKEAkEDdGoiAy0AAiERIAYoAoACIAYoAvwBQQN0aiIFLQADIRQgAy0AAyEXIAAtAAMhGSAFLwEAIRsgAy8BACEdIAAvAQAhGiAFKAIEIQcgACgCBCEEIAMoAgQhAwJAIAUtAAIiAEECTwRAAkAgGCAAQRlJckUEQCAGKALgASITIAYoAuQBIgV0QQUgAGt2QQV0IAdqIRACQCAAIAVqQQVrIgBBIU8EQCAGQbAaNgLoAQwBCyAGKALoASIHIAYoAvABTwRAIAYgAEEHcSIFNgLkASAGIAcgAEEDdmsiADYC6AEgBiAAKAAAIhM2AuABIAUhAAwBCyAHIAYoAuwBIgVGDQAgBiAAIAcgBWsgAEEDdiIAIAcgAGsgBUkbIgVBA3RrIgA2AuQBIAYgByAFayIFNgLoASAGIAUoAAAiEzYC4AELIAYgAEEFaiIKNgLkASAQIBMgAHRBG3ZqIRAMAQsgBiAGKALkASIFIABqIgo2AuQBIAYoAuABIAV0QQAgAGt2IAdqIRAgCkEhTwRAIAZBsBo2AugBDAELIAYoAugBIgUgBigC8AFPBEAgBiAKQQdxIgA2AuQBIAYgBSAKQQN2ayIFNgLoASAGIAUoAAA2AuABIAAhCgwBCyAFIAYoAuwBIgBGDQAgBiAKIAUgAGsgCkEDdiIHIAUgB2sgAEkbIgBBA3RrIgo2AuQBIAYgBSAAayIANgLoASAGIAAoAAA2AuABCyAGKQKMAiEuIAYgEDYCjAIgBiAuNwKQAgwBCyAERSEFIABFBEAgDSAEQQBHQQJ0aigCACEAIAYgDSAFQQJ0aigCACIQNgKMAiAGIAA2ApACIAYoAuQBIQoMAQsgBiAGKALkASIAQQFqIgo2AuQBAkACQCAFIAdqIAYoAuABIAB0QR92aiIAQQNGBEAgBigCjAJBAWsiAEF/IAAbIRAMAQsgDSAAQQJ0aigCACIFQX8gBRshECAAQQFGDQELIAYgBigCkAI2ApQCCyAGIAYoAowCNgKQAiAGIBA2AowCCyALIBFqIQUCQCARRQRAIAohAAwBCyAGIAogEWoiADYC5AEgBigC4AEgCnRBACARa3YgA2ohAwsCQCAFQRRJDQAgAEEhTwRAIAZBsBo2AugBDAELIAYoAugBIgcgBigC8AFPBEAgBiAAQQdxIgU2AuQBIAYgByAAQQN2ayIANgLoASAGIAAoAAA2AuABIAUhAAwBCyAHIAYoAuwBIgVGDQAgBiAAIAcgBWsgAEEDdiIAIAcgAGsgBUkbIgVBA3RrIgA2AuQBIAYgByAFayIFNgLoASAGIAUoAAA2AuABCwJAIAtFBEAgACEFDAELIAYgACALaiIFNgLkASAGKALgASAAdEEAIAtrdiAEaiEECwJAIAVBIU8EQEGwGiEAIAZBsBo2AugBDAELIAYoAugBIgAgBigC8AFPBEAgBiAFQQdxIgc2AuQBIAYgACAFQQN2ayIANgLoASAGIAAoAAA2AuABIAchBQwBCyAAIAYoAuwBIgdGDQAgBiAAIAAgB2sgBUEDdiIKIAAgCmsgB0kbIgdrIgA2AugBIAYgBSAHQQN0ayIFNgLkASAGIAAoAAA2AuABCwJAIAxBAUYNACAGIBlBAnRBsBlqKAIAIAYoAuABIgtBACAFIBlqIgVrdnEgGmo2AvQBIAYgF0ECdEGwGWooAgAgC0EAIAUgF2oiBWt2cSAdajYChAICQCAFQSFPBEBBsBohACAGQbAaNgLoAQwBCyAGKALwASAATQRAIAYgBUEHcSIHNgLkASAGIAAgBUEDdmsiADYC6AEgBiAAKAAAIgs2AuABIAchBQwBCyAAIAYoAuwBIgdGDQAgBiAAIAAgB2sgBUEDdiIKIAAgCmsgB0kbIgdrIgA2AugBIAYgBSAHQQN0ayIFNgLkASAGIAAoAAAiCzYC4AELIAYgBSAUaiIFNgLkASAGIBRBAnRBsBlqKAIAIAtBACAFa3ZxIBtqNgL8ASAFQSFPBEAgBkGwGjYC6AEMAQsgBigC8AEgAE0EQCAGIAVBB3E2AuQBIAYgACAFQQN2ayIANgLoASAGIAAoAAA2AuABDAELIAAgBigC7AEiB0YNACAGIAUgACAHayAFQQN2IgUgACAFayAHSRsiBUEDdGs2AuQBIAYgACAFayIANgLoASAGIAAoAAA2AuABCyAGIAQ2AqgBIAYgAzYCrAEgBiAQNgKwAQJAAkACQCAGKALMAiIAIARqIgcgD0sNACACIAMgBGoiC2ogHEsNACALQSBqIAkgAmtNDQELIAYgBigCsAE2AhAgBiAGKQOoATcDCCACIAkgBkEIaiAGQcwCaiAPIA4gFiASEDAhCwwBCyACIARqIQUgACkAACEuIAIgACkACDcACCACIC43AAACQCAEQRFJDQAgACkAECEuIAIgACkAGDcAGCACIC43ABAgBEEQa0ERSA0AIABBEGohACACQSBqIQQDQCAAKQAQIS4gBCAAKQAYNwAIIAQgLjcAACAAKQAgIS4gBCAAKQAoNwAYIAQgLjcAECAAQSBqIQAgBEEgaiIEIAVJDQALCyAFIBBrIQAgBiAHNgLMAiAFIA5rIBBJBEAgECAFIBZrSw0JIBIgEiAAIA5rIgBqIgQgA2pPBEAgA0UNAiAFIAQgA/wKAAAMAgtBACAAayIHBEAgBSAEIAf8CgAACyAGIAAgA2oiAzYCrAEgBSAAayEFIA4hAAsgEEEQTwRAIAApAAAhLiAFIAApAAg3AAggBSAuNwAAIANBEUgNASADIAVqIQMgBUEQaiEEA0AgACkAECEuIAQgACkAGDcACCAEIC43AAAgACkAICEuIAQgACkAKDcAGCAEIC43ABAgAEEgaiEAIARBIGoiBCADSQ0ACwwBCwJAIBBBB00EQCAFIAAtAAA6AAAgBSAALQABOgABIAUgAC0AAjoAAiAFIAAtAAM6AAMgBSAAIBBBAnQiBEHgGmooAgBqIgAoAAA2AAQgACAEQYAbaigCAGshAAwBCyAFIAApAAA3AAALIANBCUkNACADIAVqIQcgBUEIaiIEIABBCGoiAGtBD0wEQANAIAQgACkAADcAACAAQQhqIQAgBEEIaiIEIAdJDQAMAgsACyAAKQAAIS4gBCAAKQAINwAIIAQgLjcAACADQRlIDQAgBUEYaiEEA0AgACkAECEuIAQgACkAGDcACCAEIC43AAAgACkAICEuIAQgACkAKDcAGCAEIC43ABAgAEEgaiEAIARBIGoiBCAHSQ0ACwsgC0GIf0sEQCALIQgMCAUgDEEBayEMIAIgC2ohAgwCCwALCyAGKALoASAGKALsAUcNBSAGKALkAUEgRw0FQQAhAANAIABBA0ZFBEAgFSAAQQJ0IgNqIAMgDWooAgA2AgAgAEEBaiEADAELCyAGKALMAiEEC0G6fyEIIA8gBGsiACAJIAJrSw0EIAIEfyAABEAgAiAEIAD8CgAACyAAIAJqBUEACyABayEIDAQLIARBAkYEQCASIAhrIgMgFSACa0sNASACBH8gAwRAIAIgCCAD/AoAAAsgAiADagVBAAshAiAAQYjsBWohEiAAQYjsAWohCAsgEiAIayIAIBUgAmtLDQAgAgR/IAAEQCACIAggAPwKAAALIAAgAmoFQQALIAFrIQgMAwtBun8hCAwCC0FsIQgMAQtBuH8hCAsgBkHQAmokACAIC7sEAgJ/BH4CQCABRQ0AIAAgACkDACACrXw3AwAgACgCSCIDIAJqQR9NBEAgAgRAIAAgA2pBKGogASAC/AoAAAsgACAAKAJIIAJqNgJIDwsgASACaiECIAMEQEEgIANrIgQEQCAAQShqIANqIAEgBPwKAAALIAAoAkghAyAAQQA2AkggACAAKQMIIAApAChCz9bTvtLHq9lCfnxCH4lCh5Wvr5i23puef343AwggACAAKQMQIAApADBCz9bTvtLHq9lCfnxCH4lCh5Wvr5i23puef343AxAgACAAKQMYIAApADhCz9bTvtLHq9lCfnxCH4lCh5Wvr5i23puef343AxggACAAKQMgIAApAEBCz9bTvtLHq9lCfnxCH4lCh5Wvr5i23puef343AyAgASADa0EgaiEBCyACIAFBIGpPBEAgAkEgayEDIAApAyAhBSAAKQMYIQYgACkDECEHIAApAwghCANAIAAgASkAAELP1tO+0ser2UJ+IAh8Qh+JQoeVr6+Ytt6bnn9+Igg3AwggACABKQAIQs/W077Sx6vZQn4gB3xCH4lCh5Wvr5i23puef34iBzcDECAAIAEpABBCz9bTvtLHq9lCfiAGfEIfiUKHla+vmLbem55/fiIGNwMYIAAgASkAGELP1tO+0ser2UJ+IAV8Qh+JQoeVr6+Ytt6bnn9+IgU3AyAgAUEgaiIBIANNDQALCyABIAJPDQAgAiABayICBEAgAEEoaiABIAL8CgAACyAAIAI2AkgLC7YCAQV+An4gACkDACICQiBaBEAgACkDECIBQgeJIAApAwgiA0IBiXwgACkDGCIEQgyJfCAAKQMgIgVCEol8IANCz9bTvtLHq9lCfkIfiUKHla+vmLbem55/foVCh5Wvr5i23puef35CnaO16oOxjYr6AH0gAULP1tO+0ser2UJ+Qh+JQoeVr6+Ytt6bnn9+hUKHla+vmLbem55/fkKdo7Xqg7GNivoAfSAEQs/W077Sx6vZQn5CH4lCh5Wvr5i23puef36FQoeVr6+Ytt6bnn9+Qp2jteqDsY2K+gB9IAVCz9bTvtLHq9lCfkIfiUKHla+vmLbem55/foVCh5Wvr5i23puef35CnaO16oOxjYr6AH0MAQsgACkDGELFz9my8eW66id8CyEBIAEgAnwgAEEoaiACpxAyC74BAQd/IwBBEGsiAyQAAkAgACgCnOsBRQ0AIAAoAqzrASIBKAIEIQIgAyAAKALc6QEiBDYCDCACQQFrIgVCyc/ZsvHluuonIANBDGpBBBAyp3EhAiABKAIAIQYDQCAEIAYgAkECdGooAgAiAQR/IAEoAqjVAQVBAAsiB0cEQCACIAVxQQFqIQIgBw0BCwsgAUUNACAAEBogAEF/NgKo6wEgACABNgKc6wEgACAAKALc6QE2AqDrAQsgA0EQaiQAC7IBAQF/IAACfyAEIAIgACgClOsBBH8gACgC0OkBBUGAgAgLIgcgA2pBQGtNckUEQCAAIAEgB2pBIGoiATYC/OsBIAEgA2ohA0EBDAELIANBgIAETQRAIAAgAEGI7AFqIgE2AvzrASABIANqIQNBAAwBCyAAIAEgBWoiASADayICQeD/A2oiBCACIAYbNgL86wEgAyAEakGAgARrIAEgBhshA0ECCzYChOwBIAAgAzYCgOwBC68CAQF/IwBBgAFrIg4kACAOIAM2AnwCQAJAAkACQAJAAkAgAkEBaw4DAAMCAQsgBkUEQEG4fyEKDAULIAMgBS0AACICSQ0DIAIgCGotAAAhAyAHIAJBAnRqKAIAIQIgAEEAOgALIABCADcCACAAIAI2AgwgACADOgAKIABBADsBCCABIAA2AgBBASEKDAQLIAEgCTYCAEEAIQoMAwsgCkUNAUEAIQogC0UgDEEZSXINAkEIIAR0QQhyIQBBACEDA0AgACADTQ0DIANBQGshAwwACwALQWwhCiAOIA5B/ABqIA5B+ABqIAUgBhAGIgJBiH9LDQEgDigCeCIDIARLDQEgACAOIA4oAnwgByAIIAMgDRAlIAEgADYCACACIQoMAQtBbCEKCyAOQYABaiQAIAoLcAEEfyAAQgA3AgAgAgRAIAFBCmohBiABKAIEIQRBACECQQAhAQNAIAEgBHZFBEAgAiAGIAFBA3RqLQAAIgUgAiAFSxshAiABQQFqIQEgAyAFQRZLaiEDDAELCyAAIAI2AgQgACADQQggBGt0NgIACwuuAQEEfyABIAIoAgQiAyABKAIEaiIENgIEIAAgA0ECdEGwGWooAgAgASgCAEEAIARrdnE2AgACQCAEQSFPBEAgAUGwGjYCCAwBCyABKAIIIgMgASgCEE8EQCABEAwMAQsgAyABKAIMIgVGDQAgASADIAMgBWsgBEEDdiIGIAMgBmsgBUkbIgNrIgU2AgggASAEIANBA3RrNgIEIAEgBSgAADYCAAsgACACQQhqNgIEC40CAgN/AX4gACACaiEEAkACQCACQQhOBEAgACABayICQXlIDQELA0AgACAETw0CIAAgAS0AADoAACAAQQFqIQAgAUEBaiEBDAALAAsCQAJAIAJBb0sNACAAIARBIGsiAksNACABKQAAIQYgACABKQAINwAIIAAgBjcAACACIABrIgVBEU4EQCAAQRBqIQAgASEDA0AgAykAECEGIAAgAykAGDcACCAAIAY3AAAgAykAICEGIAAgAykAKDcAGCAAIAY3ABAgA0EgaiEDIABBIGoiACACSQ0ACwsgASAFaiEBDAELIAAhAgsDQCACIARPDQEgAiABLQAAOgAAIAJBAWohAiABQQFqIQEMAAsACwvfAQEGf0G6fyEKAkAgAigCBCIIIAIoAgAiCWoiDSABIABrSw0AQWwhCiAJIAQgAygCACILa0sNACAAIAlqIgQgAigCCCIMayECIAAgAUEgayIBIAsgCUEAEDMgAyAJIAtqNgIAAkACQCAEIAVrIAxPBEAgAiEFDAELIAwgBCAGa0sNAiAHIAcgAiAFayIDaiICIAhqTwRAIAhFDQIgBCACIAj8CgAADAILQQAgA2siAARAIAQgAiAA/AoAAAsgAyAIaiEIIAQgA2shBAsgBCABIAUgCEEBEDML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\";function MI(A){var I=function(){if(\"undefined\"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if(\"function\"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(A){return!1}}();return function(){var g,B=N(A);if(I){var C=N(this).constructor;g=Reflect.construct(B,arguments,C)}else g=B.apply(this,arguments);return S(this,g)}}var JI=new lI,HI=function(A){G(g,R);var I=MI(g);function g(){return w(this,g),I.apply(this,arguments)}return y(g,[{key:\"decodeBlock\",value:function(A){return JI.decode(new Uint8Array(A)).buffer}}]),g}(),pI=Object.freeze({__proto__:null,zstd:JI,default:HI});function qI(A){var I=function(){if(\"undefined\"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if(\"function\"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(A){return!1}}();return function(){var g,B=N(A);if(I){var C=N(this).constructor;g=Reflect.construct(B,arguments,C)}else g=B.apply(this,arguments);return S(this,g)}}var mI=function(A){G(C,R);var I,g=qI(C);function C(){var A;if(w(this,C),A=g.call(this),\"undefined\"==typeof createImageBitmap)throw new Error(\"Cannot decode WebImage as `createImageBitmap` is not available\");if(\"undefined\"==typeof document&&\"undefined\"==typeof OffscreenCanvas)throw new Error(\"Cannot decode WebImage as neither `document` nor `OffscreenCanvas` is not available\");return A}return y(C,[{key:\"decode\",value:(I=B(E.mark((function A(I,g){var B,C,Q,i;return E.wrap((function(A){for(;;)switch(A.prev=A.next){case 0:return B=new Blob([g]),A.next=3,createImageBitmap(B);case 3:return C=A.sent,\"undefined\"!=typeof document?((Q=document.createElement(\"canvas\")).width=C.width,Q.height=C.height):Q=new OffscreenCanvas(C.width,C.height),(i=Q.getContext(\"2d\")).drawImage(C,0,0),A.abrupt(\"return\",i.getImageData(0,0,C.width,C.height).data.buffer);case 8:case\"end\":return A.stop()}}),A)}))),function(A,g){return I.apply(this,arguments)})}]),C}(),bI=Object.freeze({__proto__:null,default:mI});";
  return new web_worker__WEBPACK_IMPORTED_MODULE_0__["default"](typeof Buffer !== 'undefined' 
    ? 'data:application/javascript;base64,' + Buffer.from(source, 'binary').toString('base64')
    : URL.createObjectURL(new Blob([source], { type: 'application/javascript' })));
}


/***/ }),

/***/ "./node_modules/quick-lru/index.js":
/*!*****************************************!*\
  !*** ./node_modules/quick-lru/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ QuickLRU)
/* harmony export */ });
class QuickLRU extends Map {
	constructor(options = {}) {
		super();

		if (!(options.maxSize && options.maxSize > 0)) {
			throw new TypeError('`maxSize` must be a number greater than 0');
		}

		if (typeof options.maxAge === 'number' && options.maxAge === 0) {
			throw new TypeError('`maxAge` must be a number greater than 0');
		}

		// TODO: Use private class fields when ESLint supports them.
		this.maxSize = options.maxSize;
		this.maxAge = options.maxAge || Number.POSITIVE_INFINITY;
		this.onEviction = options.onEviction;
		this.cache = new Map();
		this.oldCache = new Map();
		this._size = 0;
	}

	// TODO: Use private class methods when targeting Node.js 16.
	_emitEvictions(cache) {
		if (typeof this.onEviction !== 'function') {
			return;
		}

		for (const [key, item] of cache) {
			this.onEviction(key, item.value);
		}
	}

	_deleteIfExpired(key, item) {
		if (typeof item.expiry === 'number' && item.expiry <= Date.now()) {
			if (typeof this.onEviction === 'function') {
				this.onEviction(key, item.value);
			}

			return this.delete(key);
		}

		return false;
	}

	_getOrDeleteIfExpired(key, item) {
		const deleted = this._deleteIfExpired(key, item);
		if (deleted === false) {
			return item.value;
		}
	}

	_getItemValue(key, item) {
		return item.expiry ? this._getOrDeleteIfExpired(key, item) : item.value;
	}

	_peek(key, cache) {
		const item = cache.get(key);

		return this._getItemValue(key, item);
	}

	_set(key, value) {
		this.cache.set(key, value);
		this._size++;

		if (this._size >= this.maxSize) {
			this._size = 0;
			this._emitEvictions(this.oldCache);
			this.oldCache = this.cache;
			this.cache = new Map();
		}
	}

	_moveToRecent(key, item) {
		this.oldCache.delete(key);
		this._set(key, item);
	}

	* _entriesAscending() {
		for (const item of this.oldCache) {
			const [key, value] = item;
			if (!this.cache.has(key)) {
				const deleted = this._deleteIfExpired(key, value);
				if (deleted === false) {
					yield item;
				}
			}
		}

		for (const item of this.cache) {
			const [key, value] = item;
			const deleted = this._deleteIfExpired(key, value);
			if (deleted === false) {
				yield item;
			}
		}
	}

	get(key) {
		if (this.cache.has(key)) {
			const item = this.cache.get(key);

			return this._getItemValue(key, item);
		}

		if (this.oldCache.has(key)) {
			const item = this.oldCache.get(key);
			if (this._deleteIfExpired(key, item) === false) {
				this._moveToRecent(key, item);
				return item.value;
			}
		}
	}

	set(key, value, {maxAge = this.maxAge} = {}) {
		const expiry =
			typeof maxAge === 'number' && maxAge !== Number.POSITIVE_INFINITY ?
				Date.now() + maxAge :
				undefined;
		if (this.cache.has(key)) {
			this.cache.set(key, {
				value,
				expiry
			});
		} else {
			this._set(key, {value, expiry});
		}

		return this;
	}

	has(key) {
		if (this.cache.has(key)) {
			return !this._deleteIfExpired(key, this.cache.get(key));
		}

		if (this.oldCache.has(key)) {
			return !this._deleteIfExpired(key, this.oldCache.get(key));
		}

		return false;
	}

	peek(key) {
		if (this.cache.has(key)) {
			return this._peek(key, this.cache);
		}

		if (this.oldCache.has(key)) {
			return this._peek(key, this.oldCache);
		}
	}

	delete(key) {
		const deleted = this.cache.delete(key);
		if (deleted) {
			this._size--;
		}

		return this.oldCache.delete(key) || deleted;
	}

	clear() {
		this.cache.clear();
		this.oldCache.clear();
		this._size = 0;
	}

	resize(newSize) {
		if (!(newSize && newSize > 0)) {
			throw new TypeError('`maxSize` must be a number greater than 0');
		}

		const items = [...this._entriesAscending()];
		const removeCount = items.length - newSize;
		if (removeCount < 0) {
			this.cache = new Map(items);
			this.oldCache = new Map();
			this._size = items.length;
		} else {
			if (removeCount > 0) {
				this._emitEvictions(items.slice(0, removeCount));
			}

			this.oldCache = new Map(items.slice(removeCount));
			this.cache = new Map();
			this._size = 0;
		}

		this.maxSize = newSize;
	}

	* keys() {
		for (const [key] of this) {
			yield key;
		}
	}

	* values() {
		for (const [, value] of this) {
			yield value;
		}
	}

	* [Symbol.iterator]() {
		for (const item of this.cache) {
			const [key, value] = item;
			const deleted = this._deleteIfExpired(key, value);
			if (deleted === false) {
				yield [key, value.value];
			}
		}

		for (const item of this.oldCache) {
			const [key, value] = item;
			if (!this.cache.has(key)) {
				const deleted = this._deleteIfExpired(key, value);
				if (deleted === false) {
					yield [key, value.value];
				}
			}
		}
	}

	* entriesDescending() {
		let items = [...this.cache];
		for (let i = items.length - 1; i >= 0; --i) {
			const item = items[i];
			const [key, value] = item;
			const deleted = this._deleteIfExpired(key, value);
			if (deleted === false) {
				yield [key, value.value];
			}
		}

		items = [...this.oldCache];
		for (let i = items.length - 1; i >= 0; --i) {
			const item = items[i];
			const [key, value] = item;
			if (!this.cache.has(key)) {
				const deleted = this._deleteIfExpired(key, value);
				if (deleted === false) {
					yield [key, value.value];
				}
			}
		}
	}

	* entriesAscending() {
		for (const [key, value] of this._entriesAscending()) {
			yield [key, value.value];
		}
	}

	get size() {
		if (!this._size) {
			return this.oldCache.size;
		}

		let oldCacheSize = 0;
		for (const key of this.oldCache.keys()) {
			if (!this.cache.has(key)) {
				oldCacheSize++;
			}
		}

		return Math.min(this._size + oldCacheSize, this.maxSize);
	}

	entries() {
		return this.entriesAscending();
	}

	forEach(callbackFunction, thisArgument = this) {
		for (const [key, value] of this.entriesAscending()) {
			callbackFunction.call(thisArgument, value, key, this);
		}
	}

	get [Symbol.toStringTag]() {
		return JSON.stringify([...this.entriesAscending()]);
	}
}


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/web-worker/src/browser/index.js":
/*!******************************************************!*\
  !*** ./node_modules/web-worker/src/browser/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (typeof Worker !== 'undefined' ? Worker : undefined);


/***/ }),

/***/ "./node_modules/xml-utils/count-substring.mjs":
/*!****************************************************!*\
  !*** ./node_modules/xml-utils/count-substring.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ countSubstring)
/* harmony export */ });
function countSubstring(string, substring) {
  const pattern = new RegExp(substring, "g");
  const match = string.match(pattern);
  return match ? match.length : 0;
}


/***/ }),

/***/ "./node_modules/xml-utils/find-tag-by-name.mjs":
/*!*****************************************************!*\
  !*** ./node_modules/xml-utils/find-tag-by-name.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ findTagByName)
/* harmony export */ });
/* harmony import */ var _index_of_match_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-of-match.mjs */ "./node_modules/xml-utils/index-of-match.mjs");
/* harmony import */ var _index_of_match_end_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index-of-match-end.mjs */ "./node_modules/xml-utils/index-of-match-end.mjs");
/* harmony import */ var _count_substring_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./count-substring.mjs */ "./node_modules/xml-utils/count-substring.mjs");




function findTagByName(xml, tagName, options) {
  const debug = (options && options.debug) || false;
  const nested = !(options && typeof options.nested === false);

  const startIndex = (options && options.startIndex) || 0;

  if (debug) console.log("[xml-utils] starting findTagByName with", tagName, " and ", options);

  const start = (0,_index_of_match_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(xml, `\<${tagName}[ \n\>\/]`, startIndex);
  if (debug) console.log("[xml-utils] start:", start);
  if (start === -1) return undefined;

  const afterStart = xml.slice(start + tagName.length);

  let relativeEnd = (0,_index_of_match_end_mjs__WEBPACK_IMPORTED_MODULE_1__["default"])(afterStart, "^[^<]*[ /]>", 0);

  const selfClosing = relativeEnd !== -1 && afterStart[relativeEnd - 1] === "/";
  if (debug) console.log("[xml-utils] selfClosing:", selfClosing);

  if (selfClosing === false) {
    // check if tag has subtags with the same name
    if (nested) {
      let startIndex = 0;
      let openings = 1;
      let closings = 0;
      while ((relativeEnd = (0,_index_of_match_end_mjs__WEBPACK_IMPORTED_MODULE_1__["default"])(afterStart, "[ /]" + tagName + ">", startIndex)) !== -1) {
        const clip = afterStart.substring(startIndex, relativeEnd + 1);
        openings += (0,_count_substring_mjs__WEBPACK_IMPORTED_MODULE_2__["default"])(clip, "<" + tagName + "[ \n\t>]");
        closings += (0,_count_substring_mjs__WEBPACK_IMPORTED_MODULE_2__["default"])(clip, "</" + tagName + ">");
        // we can't have more openings than closings
        if (closings >= openings) break;
        startIndex = relativeEnd;
      }
    } else {
      relativeEnd = (0,_index_of_match_end_mjs__WEBPACK_IMPORTED_MODULE_1__["default"])(afterStart, "[ /]" + tagName + ">", 0);
    }
  }

  const end = start + tagName.length + relativeEnd + 1;
  if (debug) console.log("[xml-utils] end:", end);
  if (end === -1) return undefined;

  const outer = xml.slice(start, end);
  // tag is like <gml:identifier codeSpace="OGP">urn:ogc:def:crs:EPSG::32617</gml:identifier>

  let inner;
  if (selfClosing) {
    inner = null;
  } else {
    inner = outer.slice(outer.indexOf(">") + 1, outer.lastIndexOf("<"));
  }

  return { inner, outer, start, end };
}


/***/ }),

/***/ "./node_modules/xml-utils/find-tags-by-name.mjs":
/*!******************************************************!*\
  !*** ./node_modules/xml-utils/find-tags-by-name.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ findTagsByName)
/* harmony export */ });
/* harmony import */ var _find_tag_by_name_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./find-tag-by-name.mjs */ "./node_modules/xml-utils/find-tag-by-name.mjs");


function findTagsByName(xml, tagName, options) {
  const tags = [];
  const debug = (options && options.debug) || false;
  const nested = options && typeof options.nested === "boolean" ? options.nested : true;
  let startIndex = (options && options.startIndex) || 0;
  let tag;
  while ((tag = (0,_find_tag_by_name_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(xml, tagName, { debug, startIndex }))) {
    if (nested) {
      startIndex = tag.start + 1 + tagName.length;
    } else {
      startIndex = tag.end;
    }
    tags.push(tag);
  }
  if (debug) console.log("findTagsByName found", tags.length, "tags");
  return tags;
}


/***/ }),

/***/ "./node_modules/xml-utils/get-attribute.mjs":
/*!**************************************************!*\
  !*** ./node_modules/xml-utils/get-attribute.mjs ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getAttribute)
/* harmony export */ });
function getAttribute(tag, attributeName, options) {
  const debug = (options && options.debug) || false;
  if (debug) console.log("[xml-utils] getting " + attributeName + " in " + tag);

  const xml = typeof tag === "object" ? tag.outer : tag;

  // only search for attributes in the opening tag
  const opening = xml.slice(0, xml.indexOf(">") + 1);

  const quotechars = ['"', "'"];
  for (let i = 0; i < quotechars.length; i++) {
    const char = quotechars[i];
    const pattern = attributeName + "\\=" + char + "([^" + char + "]*)" + char;
    if (debug) console.log("[xml-utils] pattern:", pattern);

    const re = new RegExp(pattern);
    const match = re.exec(opening);
    if (debug) console.log("[xml-utils] match:", match);
    if (match) return match[1];
  }
}


/***/ }),

/***/ "./node_modules/xml-utils/index-of-match-end.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/xml-utils/index-of-match-end.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ indexOfMatchEnd)
/* harmony export */ });
function indexOfMatchEnd(xml, pattern, startIndex) {
  const re = new RegExp(pattern);
  const match = re.exec(xml.slice(startIndex));
  if (match) return startIndex + match.index + match[0].length - 1;
  else return -1;
}


/***/ }),

/***/ "./node_modules/xml-utils/index-of-match.mjs":
/*!***************************************************!*\
  !*** ./node_modules/xml-utils/index-of-match.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ indexOfMatch)
/* harmony export */ });
function indexOfMatch(xml, pattern, startIndex) {
  const re = new RegExp(pattern);
  const match = re.exec(xml.slice(startIndex));
  if (match) return startIndex + match.index;
  else return -1;
}


/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style.css */ "./src/style.css");
/* harmony import */ var _geotiff_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./geotiff-utils.js */ "./src/js/geotiff-utils.js");
/* harmony import */ var _terrain_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./terrain.js */ "./src/js/terrain.js");
/* harmony import */ var _osm_tile_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./osm-tile-utils.js */ "./src/js/osm-tile-utils.js");
 // Import CSS for webpack processing




window.addEventListener('DOMContentLoaded', () => {
  const demInput = document.getElementById('demFile');
  const tileFolderInput = document.getElementById('tileFolder');
  const folderStatus = document.getElementById('folderStatus');
  const latitudeInput = document.getElementById('latitude');
  const longitudeInput = document.getElementById('longitude');
  const modelSizeInput = document.getElementById('modelSize');
  const zoomLevelSelect = document.getElementById('zoomLevel');
  const heightScaleSelect = document.getElementById('heightScale');
  const terrainResolutionSelect = document.getElementById('terrainResolution');
  const renderBtn = document.getElementById('renderBtn');

  // Progress bar elements
  const progressContainer = document.getElementById('progress-container');
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const progressPercentage = document.getElementById('progress-percentage');

  let selectedFiles = null;
  let availableZoomLevels = [];

  // Initialize hamburger menu functionality
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const menuContainer = document.getElementById('upload-container');
  const speedControl = document.getElementById('speed-control');

  // Hamburger menu toggle
  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    menuContainer.classList.toggle('collapsed');
  });

  // Initialize speed slider immediately
  const speedSlider = document.getElementById('movementSpeed');
  const speedValue = document.getElementById('speedValue');
  
  if (speedSlider && speedValue) {
    // Update speed value display when slider changes
    speedSlider.addEventListener('input', (event) => {
      speedValue.textContent = parseFloat(event.target.value).toFixed(3);
    });
    
    // Set initial value
    speedValue.textContent = parseFloat(speedSlider.value).toFixed(3);
  }

  // Initialize rotation speed slider immediately
  const rotationSpeedSlider = document.getElementById('rotationSpeed');
  const rotationSpeedValue = document.getElementById('rotationSpeedValue');
  
  if (rotationSpeedSlider && rotationSpeedValue) {
    // Update rotation speed value display when slider changes
    rotationSpeedSlider.addEventListener('input', (event) => {
      rotationSpeedValue.textContent = parseFloat(event.target.value).toFixed(3);
    });
    
    // Set initial value
    rotationSpeedValue.textContent = parseFloat(rotationSpeedSlider.value).toFixed(3);
  }

  // Progress management functions
  function showProgress() {
    progressContainer.style.display = 'block';
    updateProgress(0, 'Inicializace...');
  }

  function hideProgress() {
    progressContainer.style.display = 'none';
  }

  function updateProgress(percentage, message) {
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = message;
    progressPercentage.textContent = `${Math.round(percentage)}%`;
  }

  // Handle folder selection
  tileFolderInput.addEventListener('change', async (event) => {
    try {
      const files = event.target.files;
      if (files && files.length > 0) {
        selectedFiles = files;
        
        // Get folder name from the first file's path
        const firstFile = files[0];
        const folderName = firstFile.webkitRelativePath.split('/')[0];
        
        folderStatus.textContent = `Vybrána: ${folderName}`;
        folderStatus.style.color = 'green';
        
        // Detect available zoom levels
        console.log('Detekuji dostupné zoom levely...');
        availableZoomLevels = await (0,_osm_tile_utils_js__WEBPACK_IMPORTED_MODULE_3__.detectAvailableZoomLevelsFromFiles)(selectedFiles);
        console.log(`Nalezené zoom levely: [${availableZoomLevels.join(', ')}]`);
        
        // Update zoom level dropdown
        updateZoomLevelOptions(availableZoomLevels);
      } else {
        selectedFiles = null;
        folderStatus.textContent = 'Žádná složka nevybrána';
        folderStatus.style.color = '';
        availableZoomLevels = [];
        updateZoomLevelOptions([]);
      }
    } catch (error) {
      console.error('Chyba při výběru složky:', error);
      folderStatus.textContent = 'Chyba při výběru složky';
      folderStatus.style.color = 'red';
    }
  });

  // Update zoom level dropdown based on available levels
  function updateZoomLevelOptions(availableZooms) {
    // Clear existing options except "auto"
    const autoOption = zoomLevelSelect.querySelector('option[value="auto"]');
    zoomLevelSelect.innerHTML = '';
    zoomLevelSelect.appendChild(autoOption);
    
    if (availableZooms.length > 0) {
      // Add available zoom levels
      availableZooms.forEach(zoom => {
        const option = document.createElement('option');
        option.value = zoom;
        option.textContent = `${zoom} (${getZoomDescription(zoom)})`;
        zoomLevelSelect.appendChild(option);
      });
      
      // Enable render button when valid zoom levels are available
      renderBtn.disabled = false;
      renderBtn.textContent = 'Zobrazit terén';
    } else {
      // No zoom levels detected - disable render button
      renderBtn.disabled = true;
      renderBtn.textContent = 'Nejprve vyberte platnou složku s OSM dlaždicemi';
      
      // Clear zoom level dropdown (keep only auto option)
      // Don't add default levels if no OSM tiles are detected
    }
  }

  // Get description for zoom level
  function getZoomDescription(zoom) {
    if (zoom <= 10) return 'nízké rozlišení';
    if (zoom <= 12) return 'střední rozlišení';
    if (zoom <= 14) return 'vysoké rozlišení';
    return 'velmi vysoké rozlišení';
  }

  // Analyze DEM resolution and populate terrain resolution options
  function analyzeDEMAndSetResolutionOptions(demData) {
    const { width, height, geoTransform, bbox } = demData;
    
    // Calculate DEM pixel size in meters
    const METERS_PER_DEGREE = 111000;
    const pixelSizeXMeters = Math.abs(geoTransform.pixelSizeX) * METERS_PER_DEGREE;
    const pixelSizeYMeters = Math.abs(geoTransform.pixelSizeY) * METERS_PER_DEGREE;
    const demResolution = Math.max(pixelSizeXMeters, pixelSizeYMeters);
    
    console.log(`DEM rozlišení: ${demResolution.toFixed(1)}m per pixel`);
    
    // Calculate geographic area
    const [west, south, east, north] = bbox;
    const areaWidthMeters = Math.abs(east - west) * METERS_PER_DEGREE;
    const areaHeightMeters = Math.abs(north - south) * METERS_PER_DEGREE;
    
    console.log(`Oblast: ${areaWidthMeters.toFixed(0)}m x ${areaHeightMeters.toFixed(0)}m`);
    
    // Generate resolution options based on DEM quality
    const resolutionOptions = [];
    
    // Start with DEM native resolution, then add multiples and fractions
    const baseResolution = Math.round(demResolution);
    
    // Add finer resolutions (if DEM supports it)
    if (baseResolution > 20) {
      resolutionOptions.push(Math.round(baseResolution / 4));
      resolutionOptions.push(Math.round(baseResolution / 2));
    } else if (baseResolution > 10) {
      resolutionOptions.push(Math.round(baseResolution / 2));
    }
    
    // Add native resolution
    resolutionOptions.push(baseResolution);
    
    // Add coarser resolutions
    resolutionOptions.push(baseResolution * 2);
    resolutionOptions.push(baseResolution * 4);
    
    // Add some standard options
    const standardOptions = [10, 20, 30, 50, 100];
    standardOptions.forEach(option => {
      if (!resolutionOptions.includes(option)) {
        resolutionOptions.push(option);
      }
    });
    
    // Sort and remove duplicates
    const uniqueOptions = [...new Set(resolutionOptions)].sort((a, b) => a - b);
    
    // Populate the select element
    const terrainResolutionSelect = document.getElementById('terrainResolution');
    terrainResolutionSelect.innerHTML = '';
    terrainResolutionSelect.disabled = false;
    
    uniqueOptions.forEach(resolution => {
      const option = document.createElement('option');
      option.value = resolution;
      
      let description = '';
      if (resolution <= baseResolution / 2) {
        description = 'velmi vysoké rozlišení';
      } else if (resolution <= baseResolution) {
        description = 'vysoké rozlišení (nativní DEM)';
      } else if (resolution <= baseResolution * 2) {
        description = 'střední rozlišení';
      } else {
        description = 'nízké rozlišení';
      }
      
      option.textContent = `${resolution}m (${description})`;
      
      // Set as selected if it matches or is close to DEM resolution
      if (resolution === baseResolution) {
        option.selected = true;
      }
      
      terrainResolutionSelect.appendChild(option);
    });
    
    console.log(`Nastaveny možnosti rozlišení terénu: [${uniqueOptions.join(', ')}]m`);
    console.log(`Výchozí rozlišení: ${baseResolution}m (nativní DEM)`);
  }

  // Handle DEM file selection - analyze resolution immediately
  demInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) {
      // Reset terrain resolution if no file selected
      terrainResolutionSelect.innerHTML = '<option value="">Načtěte DEM pro analýzu rozlišení...</option>';
      terrainResolutionSelect.disabled = true;
      return;
    }

    try {
      console.log('Analyzuji DEM soubor pro rozlišení...');
      terrainResolutionSelect.innerHTML = '<option value="">Analyzuji rozlišení...</option>';
      terrainResolutionSelect.disabled = true;
      
      // Use fast metadata analysis instead of loading full raster data
      const demMetadata = await (0,_geotiff_utils_js__WEBPACK_IMPORTED_MODULE_1__.analyzeGeoTIFFMetadata)(file);
      analyzeDEMAndSetResolutionOptions(demMetadata);
      
    } catch (error) {
      console.error('Chyba při analýze DEM souboru:', error);
      terrainResolutionSelect.innerHTML = '<option value="">Chyba při analýze DEM</option>';
      terrainResolutionSelect.disabled = true;
      alert('Chyba při analýze DEM souboru. Zkontrolujte, že je soubor platný GeoTIFF.');
    }
  });

  renderBtn.addEventListener('click', async () => {
    // Set loading cursor and show progress
    document.body.style.cursor = 'wait';
    renderBtn.disabled = true;
    renderBtn.textContent = 'Načítám...';
    showProgress();

    const demFile = demInput.files[0];
    const latitude = parseFloat(latitudeInput.value);
    const longitude = parseFloat(longitudeInput.value);
    const modelSize = parseFloat(modelSizeInput.value);
    const zoomLevel = zoomLevelSelect.value;
    const heightScaleMultiplier = parseFloat(heightScaleSelect.value);
    const terrainResolution = parseFloat(terrainResolutionSelect.value);

    // Validation
    if (!demFile) {
      alert('Nahrajte DEM GeoTIFF soubor');
      return;
    }

    if (!selectedFiles) {
      alert('Vyberte složku s OSM dlaždicemi');
      return;
    }

    if (isNaN(latitude) || isNaN(longitude)) {
      alert('Zadejte platné souřadnice (zeměpisná šířka a délka)');
      return;
    }

    if (isNaN(modelSize) || modelSize <= 0) {
      alert('Zadejte platnou velikost modelu v kilometrech');
      return;
    }

    try {
      updateProgress(10, 'Načítám DEM soubor...');
      console.log('Načítám DEM...');
      const demData = await (0,_geotiff_utils_js__WEBPACK_IMPORTED_MODULE_1__.loadGeoTIFF)(demFile);
      
      updateProgress(20, 'Zpracovávám DEM data...');
      
      // Analyze DEM resolution and populate terrain resolution options
      analyzeDEMAndSetResolutionOptions(demData);
      
      // Determine zoom level
      let finalZoomLevel;
      if (zoomLevel === 'auto') {
        finalZoomLevel = (0,_osm_tile_utils_js__WEBPACK_IMPORTED_MODULE_3__.getOptimalZoomLevel)(modelSize, availableZoomLevels, 100);
        console.log(`Automaticky vybraný zoom level: ${finalZoomLevel} (z dostupných: [${availableZoomLevels.join(', ')}])`);
      } else {
        finalZoomLevel = parseInt(zoomLevel);
        
        // Check if selected zoom level is available
        if (availableZoomLevels.length > 0 && !availableZoomLevels.includes(finalZoomLevel)) {
          const proceed = confirm(
            `Vybraný zoom level ${finalZoomLevel} není dostupný ve složce.\n` +
            `Dostupné zoom levely: [${availableZoomLevels.join(', ')}]\n\n` +
            'Chcete pokračovat s nejbližším dostupným zoom levelem?'
          );
          if (!proceed) return;
          
          // Find closest available zoom level
          finalZoomLevel = availableZoomLevels.reduce((prev, curr) => 
            Math.abs(curr - finalZoomLevel) < Math.abs(prev - finalZoomLevel) ? curr : prev
          );
          console.log(`Použit nejbližší dostupný zoom level: ${finalZoomLevel}`);
        }
      }

      updateProgress(30, 'Výpočet rozsahu dlaždic...');
      // Calculate tile range
      console.log(`Výpočet rozsahu dlaždic pro oblast ${modelSize}km kolem [${latitude}, ${longitude}]`);
      const tileRange = (0,_osm_tile_utils_js__WEBPACK_IMPORTED_MODULE_3__.calculateTileRange)(latitude, longitude, modelSize, finalZoomLevel);
      console.log('Rozsah dlaždic:', tileRange);

      // Calculate number of tiles
      const tilesWide = tileRange.maxX - tileRange.minX + 1;
      const tilesHigh = tileRange.maxY - tileRange.minY + 1;
      const totalTiles = tilesWide * tilesHigh;
      
      console.log(`Načítám ${totalTiles} dlaždic (${tilesWide}x${tilesHigh})`);

      // Load tile mosaic with progress tracking
      console.log('Načítám OSM dlaždice...');
      const textureImageData = await (0,_osm_tile_utils_js__WEBPACK_IMPORTED_MODULE_3__.loadTileMosaicFromFiles)(selectedFiles, tileRange, 256, (loaded, total, message) => {
        const tileProgress = 30 + (loaded / total) * 50; // 30% to 80% for tile loading
        updateProgress(tileProgress, message);
      });
      
      updateProgress(85, 'Získávám geografické hranice...');
      // Get geographic bounds of the tile area
      const tileBounds = (0,_osm_tile_utils_js__WEBPACK_IMPORTED_MODULE_3__.getTileAreaBounds)(tileRange);
      console.log('Geografické hranice dlaždic:', tileBounds);

      updateProgress(90, 'Převzorkování DEM dat...');
      // Resample DEM data to match tile texture dimensions
      console.log('Převzorkování DEM dat na rozměry textury...');
      const resampledDemData = resampleDEMToTexture(demData, textureImageData, tileBounds);

      updateProgress(95, 'Generování 3D terénu...');
      console.log(`Výšková exagerace: ${heightScaleMultiplier}x`);
      console.log(`Rozlišení terénu: ${terrainResolution}m`);
      console.log('Generuji 3D terén...');

      // Hide menu and show hamburger button after successful model load
      menuContainer.classList.add('collapsed');
      hamburgerBtn.style.display = 'flex';
      speedControl.style.display = 'block';

      (0,_terrain_js__WEBPACK_IMPORTED_MODULE_2__.generateTerrain)(resampledDemData, textureImageData, heightScaleMultiplier, terrainResolution);
      
      updateProgress(100, 'Hotovo!');
      
      // Hide progress after a short delay
      setTimeout(() => {
        hideProgress();
      }, 1000);
      
    } catch (error) {
      console.error('Chyba při načítání nebo zpracování dat:', error);
      alert('Chyba při načítání nebo zpracování dat. Podívejte se do konzole pro více informací.');
    } finally {
      // Restore cursor and button state
      document.body.style.cursor = 'default';
      renderBtn.disabled = false;
      renderBtn.textContent = 'Zobrazit terén';
    }
  });
});

/**
 * Resample DEM data to match texture dimensions and geographic bounds
 * @param {Object} demData - Original DEM data
 * @param {ImageData} textureImageData - Tile texture data
 * @param {Array} tileBounds - Geographic bounds [west, south, east, north]
 * @returns {Object} Resampled DEM data structure
 */
function resampleDEMToTexture(demData, textureImageData, tileBounds) {
  const { rasters, width: demWidth, height: demHeight, geoTransform: demGeoTransform, bbox: demBbox } = demData;
  const elevationData = rasters[0] || rasters;
  
  const textureWidth = textureImageData.width;
  const textureHeight = textureImageData.height;
  
  console.log(`Převzorkování DEM z ${demWidth}x${demHeight} na ${textureWidth}x${textureHeight}`);
  console.log('DEM bbox:', demBbox);
  console.log('Tile bounds:', tileBounds);
  
  // Create new elevation array matching texture dimensions
  const newElevationData = new Float32Array(textureWidth * textureHeight);
  
  // Calculate geographic bounds and pixel sizes for the tile area
  const [west, south, east, north] = tileBounds;
  const tilePixelSizeX = (east - west) / textureWidth;
  const tilePixelSizeY = (north - south) / textureHeight;
  
  // Fill the new elevation array by sampling from the original DEM
  for (let row = 0; row < textureHeight; row++) {
    for (let col = 0; col < textureWidth; col++) {
      // Calculate geographic coordinates for this pixel in the tile texture
      const lon = west + col * tilePixelSizeX;
      const lat = north - row * tilePixelSizeY; // Note: north - row because image coordinates are flipped
      
      // Sample elevation from the original DEM at this geographic location
      const elevation = sampleDEMAtCoordinate(elevationData, demWidth, demHeight, demGeoTransform, demBbox, lon, lat);
      
      const index = row * textureWidth + col;
      newElevationData[index] = elevation;
    }
  }
  
  // Create new DEM data structure matching the tile texture
  return {
    ...demData,
    rasters: [newElevationData],
    width: textureWidth,
    height: textureHeight,
    bbox: tileBounds,
    geoTransform: {
      originX: west,
      originY: north,
      pixelSizeX: tilePixelSizeX,
      pixelSizeY: -tilePixelSizeY // Negative because Y increases downward in image coordinates
    }
  };
}

/**
 * Sample elevation from DEM at a specific geographic coordinate
 * @param {TypedArray} elevationData - DEM elevation data
 * @param {number} width - DEM width
 * @param {number} height - DEM height
 * @param {Object} geoTransform - DEM geotransform
 * @param {Array} bbox - DEM bounding box [west, south, east, north]
 * @param {number} lon - Longitude to sample
 * @param {number} lat - Latitude to sample
 * @returns {number} Elevation value or 0 if outside bounds
 */
function sampleDEMAtCoordinate(elevationData, width, height, geoTransform, bbox, lon, lat) {
  // Check if coordinate is within DEM bounds
  if (lon < bbox[0] || lon > bbox[2] || lat < bbox[1] || lat > bbox[3]) {
    return 0; // Outside DEM bounds
  }
  
  // Convert geographic coordinates to pixel coordinates
  const x = (lon - geoTransform.originX) / geoTransform.pixelSizeX;
  const y = (lat - geoTransform.originY) / geoTransform.pixelSizeY;
  
  const col = Math.floor(x);
  const row = Math.floor(y);
  
  // Check pixel bounds
  if (col < 0 || col >= width || row < 0 || row >= height) {
    return 0;
  }
  
  // Simple nearest neighbor sampling
  const index = row * width + col;
  const elevation = elevationData[index];
  
  // Return elevation or 0 for invalid values
  return (isFinite(elevation) && elevation > -1000 && elevation < 10000) ? elevation : 0;
}


/***/ }),

/***/ "./src/js/geotiff-utils.js":
/*!*********************************!*\
  !*** ./src/js/geotiff-utils.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   analyzeGeoTIFFMetadata: () => (/* binding */ analyzeGeoTIFFMetadata),
/* harmony export */   cropDEMToOrthophoto: () => (/* binding */ cropDEMToOrthophoto),
/* harmony export */   loadGeoTIFF: () => (/* binding */ loadGeoTIFF),
/* harmony export */   resampleTextureToDEM: () => (/* binding */ resampleTextureToDEM)
/* harmony export */ });
/* harmony import */ var geotiff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! geotiff */ "./node_modules/geotiff/dist-module/geotiff.js");
// js/geotiff-utils.js


async function loadGeoTIFF(file) {
  const tiff = await (0,geotiff__WEBPACK_IMPORTED_MODULE_0__.fromBlob)(file);
  const image = await tiff.getImage();
  
  // Check if this is a DEM (single band) or orthophoto (multi-band)
  const samplesPerPixel = image.getSamplesPerPixel();
  console.log(`Loading GeoTIFF: ${image.getWidth()}x${image.getHeight()}, ${samplesPerPixel} bands`);
  
  let rasters;
  if (samplesPerPixel === 1) {
    // DEM - single band, no interleaving needed
    const rasterData = await image.readRasters();
    console.log('Raw raster data type:', typeof rasterData);
    console.log('Raw raster data constructor:', rasterData.constructor.name);
    console.log('Raw raster data length/size:', rasterData.length || 'no length property');
    console.log('Is array?', Array.isArray(rasterData));
    
    // Handle different possible return formats
    if (Array.isArray(rasterData)) {
      rasters = rasterData;
      console.log(`DEM loaded: ${rasterData[0]?.length || 0} elevation values in first band`);
    } else if (rasterData && typeof rasterData.length === 'number') {
      // Single TypedArray
      rasters = [rasterData];
      console.log(`DEM loaded: ${rasterData.length} elevation values`);
    } else {
      console.error('Unexpected raster data format:', rasterData);
      rasters = [];
    }
  } else {
    // Orthophoto - multiple bands, keep separate
    rasters = await image.readRasters({ interleave: false });
    console.log(`Orthophoto loaded: ${rasters.length} bands`);
  }

  const [originX, originY, pixelSizeX, pixelSizeY] = getGeoTransform(image);

  return {
    image,
    rasters,
    width: image.getWidth(),
    height: image.getHeight(),
    bbox: image.getBoundingBox(),
    geoTransform: { originX, originY, pixelSizeX, pixelSizeY },
    samplesPerPixel
  };
}

function getGeoTransform(image) {
  const tiepoint = image.getTiePoints()[0];
  const pixelScale = image.getFileDirectory().ModelPixelScale;

  const originX = tiepoint.x;
  const originY = tiepoint.y;
  const pixelSizeX = pixelScale[0];
  const pixelSizeY = -pixelScale[1];

  return [originX, originY, pixelSizeX, pixelSizeY];
}

async function resampleTextureToDEM(demData, orthoData) {
  const { width, height, geoTransform: demTransform, bbox: demBbox } = demData;
  const { rasters: orthoRasters, geoTransform: orthoTransform, samplesPerPixel, bbox: orthoBbox } = orthoData;

  console.log('DEM extent:', demBbox);
  console.log('Orthophoto extent:', orthoBbox);
  
  // Zkontroluj překryv mezi DEM a orthophoto
  const overlapMinX = Math.max(demBbox[0], orthoBbox[0]);
  const overlapMinY = Math.max(demBbox[1], orthoBbox[1]);
  const overlapMaxX = Math.min(demBbox[2], orthoBbox[2]);
  const overlapMaxY = Math.min(demBbox[3], orthoBbox[3]);
  
  const hasOverlap = overlapMinX < overlapMaxX && overlapMinY < overlapMaxY;
  
  if (!hasOverlap) {
    console.warn('DEM a orthophoto se nepřekrývají geograficky!');
    console.warn('DEM:', demBbox);
    console.warn('Orthophoto:', orthoBbox);
  }
  
  const overlapArea = hasOverlap ? 
    (overlapMaxX - overlapMinX) * (overlapMaxY - overlapMinY) : 0;
  const demArea = (demBbox[2] - demBbox[0]) * (demBbox[3] - demBbox[1]);
  const coveragePercent = (overlapArea / demArea * 100).toFixed(1);
  
  console.log(`Orthophoto pokrývá ${coveragePercent}% DEM oblasti`);

  const textureData = new Uint8ClampedArray(width * height * 4);

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const lon = demTransform.originX + col * demTransform.pixelSizeX;
      const lat = demTransform.originY + row * demTransform.pixelSizeY;

      let r, g, b;
      
      // Zkontroluj, zda je pixel v oblasti orthophoto
      if (hasOverlap && 
          lon >= orthoBbox[0] && lon <= orthoBbox[2] && 
          lat >= orthoBbox[1] && lat <= orthoBbox[3]) {
        // Pixel je v oblasti orthophoto - použij skutečnou barvu
        [r, g, b] = sampleOrthoRGB(orthoRasters, lon, lat, orthoTransform, orthoData.width, orthoData.height, samplesPerPixel);
      } else {
        // Pixel je mimo orthophoto - použij neutrální barvu nebo gradient
        // Můžeš použít výšku pro vytvoření výškového gradientu
        const elevation = getElevationAtCoordinate(demData, lon, lat);
        [r, g, b] = createElevationGradient(elevation);
      }

      const i = (row * width + col) * 4;
      textureData[i + 0] = r;
      textureData[i + 1] = g;
      textureData[i + 2] = b;
      textureData[i + 3] = 255;
    }
  }

  return new ImageData(textureData, width, height);
}

// Pomocná funkce pro získání výšky na konkrétní souřadnici
function getElevationAtCoordinate(demData, lon, lat) {
  const { rasters, width, height, geoTransform } = demData;
  const elevationData = rasters[0] || rasters;
  
  const x = (lon - geoTransform.originX) / geoTransform.pixelSizeX;
  const y = (lat - geoTransform.originY) / geoTransform.pixelSizeY;
  
  const col = Math.floor(x);
  const row = Math.floor(y);
  
  if (col < 0 || col >= width || row < 0 || row >= height) return 0;
  
  const i = row * width + col;
  return elevationData[i] || 0;
}

// Vytvoř barevný gradient na základě výšky
function createElevationGradient(elevation) {
  // Normalizuj výšku pro barevný gradient (upravit podle tvých dat)
  const normalizedHeight = Math.max(0, Math.min(1, (elevation + 100) / 1000));
  
  if (normalizedHeight < 0.3) {
    // Nízké oblasti - zelená/modrá
    return [50, 120, 80];
  } else if (normalizedHeight < 0.6) {
    // Střední oblasti - žlutá/hnědá
    return [150, 130, 80];
  } else {
    // Vysoké oblasti - bílá/šedá
    return [200, 200, 200];
  }
}

function sampleOrthoRGB(rasters, lon, lat, transform, width, height, samplesPerPixel) {
  const x = (lon - transform.originX) / transform.pixelSizeX;
  const y = (lat - transform.originY) / transform.pixelSizeY;

  const col = Math.floor(x);
  const row = Math.floor(y);

  if (col < 0 || col >= width || row < 0 || row >= height) return [0, 0, 0];
  
  const i = row * width + col;
  
  if (samplesPerPixel >= 3) {
    // RGB orthophoto
    return [
      rasters[0][i] || 0,
      rasters[1][i] || 0,
      rasters[2][i] || 0
    ];
  } else if (samplesPerPixel === 1) {
    // Grayscale - use same value for R, G, B
    const gray = rasters[0][i] || 0;
    return [gray, gray, gray];
  } else {
    return [0, 0, 0];
  }
}

// Lightweight function to analyze GeoTIFF metadata for resolution analysis
// This only reads metadata, not the actual raster data, making it very fast
async function analyzeGeoTIFFMetadata(file) {
  const tiff = await (0,geotiff__WEBPACK_IMPORTED_MODULE_0__.fromBlob)(file);
  const image = await tiff.getImage();
  
  // Get basic metadata without reading raster data
  const width = image.getWidth();
  const height = image.getHeight();
  const bbox = image.getBoundingBox();
  const samplesPerPixel = image.getSamplesPerPixel();
  const [originX, originY, pixelSizeX, pixelSizeY] = getGeoTransform(image);
  
  console.log(`GeoTIFF metadata: ${width}x${height}, ${samplesPerPixel} bands`);
  
  return {
    width,
    height,
    bbox,
    geoTransform: { originX, originY, pixelSizeX, pixelSizeY },
    samplesPerPixel
  };
}

// Ořízne DEM na oblast orthophoto pro lepší vizualizaci
function cropDEMToOrthophoto(demData, orthoData) {
  const { rasters, width, height, geoTransform, bbox: demBbox } = demData;
  const { bbox: orthoBbox } = orthoData;
  const elevationData = rasters[0] || rasters;
  
  // Vypočítej překryv
  const cropMinX = Math.max(demBbox[0], orthoBbox[0]);
  const cropMinY = Math.max(demBbox[1], orthoBbox[1]);
  const cropMaxX = Math.min(demBbox[2], orthoBbox[2]);
  const cropMaxY = Math.min(demBbox[3], orthoBbox[3]);
  
  // Převeď geografické souřadnice na pixelové indexy v DEM
  const startCol = Math.max(0, Math.floor((cropMinX - demBbox[0]) / Math.abs(geoTransform.pixelSizeX)));
  const endCol = Math.min(width - 1, Math.ceil((cropMaxX - demBbox[0]) / Math.abs(geoTransform.pixelSizeX)));
  const startRow = Math.max(0, Math.floor((demBbox[3] - cropMaxY) / Math.abs(geoTransform.pixelSizeY)));
  const endRow = Math.min(height - 1, Math.ceil((demBbox[3] - cropMinY) / Math.abs(geoTransform.pixelSizeY)));
  
  const cropWidth = endCol - startCol + 1;
  const cropHeight = endRow - startRow + 1;
  
  console.log(`Ořezávám DEM z ${width}x${height} na ${cropWidth}x${cropHeight}`);
  console.log(`Pixelové indexy: cols ${startCol}-${endCol}, rows ${startRow}-${endRow}`);
  
  // Vytvoř ořezaná data
  const croppedElevationData = new Float32Array(cropWidth * cropHeight);
  
  for (let row = 0; row < cropHeight; row++) {
    for (let col = 0; col < cropWidth; col++) {
      const sourceRow = startRow + row;
      const sourceCol = startCol + col;
      const sourceIndex = sourceRow * width + sourceCol;
      const targetIndex = row * cropWidth + col;
      
      croppedElevationData[targetIndex] = elevationData[sourceIndex];
    }
  }
  
  // Aktualizuj geoTransform pro ořezanou oblast
  const newOriginX = demBbox[0] + startCol * Math.abs(geoTransform.pixelSizeX);
  const newOriginY = demBbox[3] - startRow * Math.abs(geoTransform.pixelSizeY);
  
  const croppedGeoTransform = {
    originX: newOriginX,
    originY: newOriginY,
    pixelSizeX: geoTransform.pixelSizeX,
    pixelSizeY: geoTransform.pixelSizeY
  };
  
  // Aktualizuj bbox
  const croppedBbox = [
    newOriginX,
    newOriginY + cropHeight * geoTransform.pixelSizeY,
    newOriginX + cropWidth * Math.abs(geoTransform.pixelSizeX),
    newOriginY
  ];
  
  return {
    ...demData,
    rasters: [croppedElevationData],
    width: cropWidth,
    height: cropHeight,
    geoTransform: croppedGeoTransform,
    bbox: croppedBbox
  };
}


/***/ }),

/***/ "./src/js/osm-tile-utils.js":
/*!**********************************!*\
  !*** ./src/js/osm-tile-utils.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateTileRange: () => (/* binding */ calculateTileRange),
/* harmony export */   detectAvailableZoomLevels: () => (/* binding */ detectAvailableZoomLevels),
/* harmony export */   detectAvailableZoomLevelsFromFiles: () => (/* binding */ detectAvailableZoomLevelsFromFiles),
/* harmony export */   getOptimalZoomLevel: () => (/* binding */ getOptimalZoomLevel),
/* harmony export */   getTileAreaBounds: () => (/* binding */ getTileAreaBounds),
/* harmony export */   latLonToTile: () => (/* binding */ latLonToTile),
/* harmony export */   loadTileMosaic: () => (/* binding */ loadTileMosaic),
/* harmony export */   loadTileMosaicFromFiles: () => (/* binding */ loadTileMosaicFromFiles),
/* harmony export */   tileToBounds: () => (/* binding */ tileToBounds)
/* harmony export */ });
// js/osm-tile-utils.js
// Utilities for loading and processing OpenStreetMap tiles in z/y/x format

/**
 * Convert latitude/longitude to tile coordinates at given zoom level
 * @param {number} lat - Latitude in degrees
 * @param {number} lon - Longitude in degrees  
 * @param {number} zoom - Zoom level
 * @returns {object} Tile coordinates {x, y, z}
 */
function latLonToTile(lat, lon, zoom) {
  const latRad = lat * Math.PI / 180;
  const n = Math.pow(2, zoom);
  const x = Math.floor((lon + 180) / 360 * n);
  const y = Math.floor((1 - Math.asinh(Math.tan(latRad)) / Math.PI) / 2 * n);
  return { x, y, z: zoom };
}

/**
 * Convert tile coordinates to latitude/longitude bounds
 * @param {number} x - Tile X coordinate
 * @param {number} y - Tile Y coordinate
 * @param {number} z - Zoom level
 * @returns {object} Bounds {north, south, east, west}
 */
function tileToBounds(x, y, z) {
  const n = Math.pow(2, z);
  const west = x / n * 360 - 180;
  const east = (x + 1) / n * 360 - 180;
  const north = Math.atan(Math.sinh(Math.PI * (1 - 2 * y / n))) * 180 / Math.PI;
  const south = Math.atan(Math.sinh(Math.PI * (1 - 2 * (y + 1) / n))) * 180 / Math.PI;
  return { north, south, east, west };
}

/**
 * Detect available zoom levels in the OSM tile folder
 * @param {FileSystemDirectoryHandle} folderHandle - Folder containing tiles
 * @returns {Promise<number[]>} Array of available zoom levels, sorted from lowest to highest
 */
async function detectAvailableZoomLevels(folderHandle) {
  const availableZooms = [];
  
  try {
    for await (const [name, handle] of folderHandle.entries()) {
      if (handle.kind === 'directory') {
        const zoomLevel = parseInt(name);
        if (!isNaN(zoomLevel) && zoomLevel >= 0 && zoomLevel <= 20) {
          availableZooms.push(zoomLevel);
        }
      }
    }
  } catch (error) {
    console.warn('Error detecting zoom levels:', error);
  }
  
  return availableZooms.sort((a, b) => a - b);
}

/**
 * Detect available zoom levels from FileList (webkitdirectory)
 * @param {FileList} files - Files from webkitdirectory input
 * @returns {Promise<number[]>} Array of available zoom levels, sorted from lowest to highest
 */
async function detectAvailableZoomLevelsFromFiles(files) {
  const availableZooms = new Set();
  
  try {
    for (const file of files) {
      const pathParts = file.webkitRelativePath.split('/');
      if (pathParts.length >= 2) {
        const zoomLevel = parseInt(pathParts[1]); // First part is folder name, second is zoom level
        if (!isNaN(zoomLevel) && zoomLevel >= 0 && zoomLevel <= 20) {
          availableZooms.add(zoomLevel);
        }
      }
    }
  } catch (error) {
    console.warn('Error detecting zoom levels from files:', error);
  }
  
  return Array.from(availableZooms).sort((a, b) => a - b);
}

/**
 * Calculate tile range needed to cover an area
 * @param {number} centerLat - Center latitude
 * @param {number} centerLon - Center longitude
 * @param {number} sizeKm - Size in kilometers
 * @param {number} zoom - Zoom level
 * @returns {object} Tile range {minX, maxX, minY, maxY, zoom}
 */
function calculateTileRange(centerLat, centerLon, sizeKm, zoom) {
  // Convert km to degrees (approximate)
  const kmPerDegree = 111.32; // at equator
  const latOffset = (sizeKm / 2) / kmPerDegree;
  const lonOffset = (sizeKm / 2) / (kmPerDegree * Math.cos(centerLat * Math.PI / 180));
  
  const northLat = centerLat + latOffset;
  const southLat = centerLat - latOffset;
  const eastLon = centerLon + lonOffset;
  const westLon = centerLon - lonOffset;
  
  const nw = latLonToTile(northLat, westLon, zoom);
  const se = latLonToTile(southLat, eastLon, zoom);
  
  return {
    minX: Math.min(nw.x, se.x),
    maxX: Math.max(nw.x, se.x),
    minY: Math.min(nw.y, se.y),
    maxY: Math.max(nw.y, se.y),
    zoom: zoom
  };
}

/**
 * Load tiles from folder and create a mosaic texture
 * @param {FileSystemDirectoryHandle} folderHandle - Folder containing tiles
 * @param {object} tileRange - Tile range to load
 * @param {number} tileSize - Size of individual tiles (default 256)
 * @param {Function} onProgress - Optional progress callback (loaded, total, message)
 * @returns {Promise<ImageData>} Mosaic texture as ImageData
 */
async function loadTileMosaic(folderHandle, tileRange, tileSize = 256, onProgress = null) {
  const { minX, maxX, minY, maxY, zoom } = tileRange;
  const tilesWide = maxX - minX + 1;
  const tilesHigh = maxY - minY + 1;
  const totalTiles = tilesWide * tilesHigh;
  const mosaicWidth = tilesWide * tileSize;
  const mosaicHeight = tilesHigh * tileSize;
  
  console.log(`Loading ${tilesWide}x${tilesHigh} tiles (${mosaicWidth}x${mosaicHeight} pixels)`);
  
  // Create canvas for mosaic
  const canvas = document.createElement('canvas');
  canvas.width = mosaicWidth;
  canvas.height = mosaicHeight;
  const ctx = canvas.getContext('2d');
  
  // Fill with default color in case some tiles are missing
  ctx.fillStyle = '#8FBC8F'; // Default green color
  ctx.fillRect(0, 0, mosaicWidth, mosaicHeight);
  
  const loadPromises = [];
  let loadedTiles = 0;
  
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const promise = loadSingleTile(folderHandle, zoom, x, y, tileSize)
        .then(img => {
          if (img) {
            const canvasX = (x - minX) * tileSize;
            const canvasY = (y - minY) * tileSize;
            ctx.drawImage(img, canvasX, canvasY, tileSize, tileSize);
          }
          
          // Update progress
          loadedTiles++;
          if (onProgress) {
            onProgress(loadedTiles, totalTiles, `Načítám dlaždice: ${loadedTiles}/${totalTiles}`);
          }
        })
        .catch(err => {
          console.warn(`Failed to load tile ${zoom}/${x}/${y}:`, err);
          
          // Still count as "loaded" for progress tracking
          loadedTiles++;
          if (onProgress) {
            onProgress(loadedTiles, totalTiles, `Načítám dlaždice: ${loadedTiles}/${totalTiles}`);
          }
        });
      
      loadPromises.push(promise);
    }
  }
  
  await Promise.all(loadPromises);
  
  // Return ImageData
  return ctx.getImageData(0, 0, mosaicWidth, mosaicHeight);
}

/**
 * Load tiles from FileList and create a mosaic texture
 * @param {FileList} files - Files from webkitdirectory input
 * @param {object} tileRange - Tile range to load
 * @param {number} tileSize - Size of individual tiles (default 256)
 * @param {Function} onProgress - Optional progress callback (loaded, total, message)
 * @returns {Promise<ImageData>} Mosaic texture as ImageData
 */
async function loadTileMosaicFromFiles(files, tileRange, tileSize = 256, onProgress = null) {
  const { minX, maxX, minY, maxY, zoom } = tileRange;
  const tilesWide = maxX - minX + 1;
  const tilesHigh = maxY - minY + 1;
  const totalTiles = tilesWide * tilesHigh;
  const mosaicWidth = tilesWide * tileSize;
  const mosaicHeight = tilesHigh * tileSize;
  
  console.log(`Loading ${tilesWide}x${tilesHigh} tiles (${mosaicWidth}x${mosaicHeight} pixels)`);
  
  // Create file lookup map for faster access
  const fileMap = new Map();
  for (const file of files) {
    const pathParts = file.webkitRelativePath.split('/');
    if (pathParts.length >= 4) {
      const z = pathParts[1];
      const x = pathParts[2];
      const y = pathParts[3].replace('.jpg', ''); // Remove extension
      const key = `${z}/${x}/${y}`;
      fileMap.set(key, file);
    }
  }
  
  // Create canvas for mosaic
  const canvas = document.createElement('canvas');
  canvas.width = mosaicWidth;
  canvas.height = mosaicHeight;
  const ctx = canvas.getContext('2d');
  
  // Fill with default color (light gray)
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, mosaicWidth, mosaicHeight);
  
  let loadedTiles = 0;
  const loadPromises = [];
  
  for (let tileY = minY; tileY <= maxY; tileY++) {
    for (let tileX = minX; tileX <= maxX; tileX++) {
      const promise = (async () => {
        try {
          const img = await loadSingleTileFromFiles(fileMap, zoom, tileX, tileY, tileSize);
          if (img) {
            const canvasX = (tileX - minX) * tileSize;
            const canvasY = (tileY - minY) * tileSize;
            ctx.drawImage(img, canvasX, canvasY, tileSize, tileSize);
          }
        } catch (error) {
          console.warn(`Failed to load tile ${zoom}/${tileX}/${tileY}:`, error);
        }
        
        loadedTiles++;
        if (onProgress) {
          onProgress(loadedTiles, totalTiles, `Načítám dlaždice: ${loadedTiles}/${totalTiles}`);
        }
      })();
      
      loadPromises.push(promise);
    }
  }
  
  await Promise.all(loadPromises);
  
  // Return ImageData
  return ctx.getImageData(0, 0, mosaicWidth, mosaicHeight);
}

/**
 * Load a single tile from the folder structure
 * @param {FileSystemDirectoryHandle} folderHandle - Root folder handle
 * @param {number} z - Zoom level
 * @param {number} x - Tile X coordinate
 * @param {number} y - Tile Y coordinate
 * @param {number} tileSize - Expected tile size
 * @returns {Promise<HTMLImageElement|null>} Loaded image or null if not found
 */
async function loadSingleTile(folderHandle, z, x, y, tileSize) {
  try {
    // Navigate folder structure: z/x/y.jpg
    const zHandle = await folderHandle.getDirectoryHandle(z.toString());
    const xHandle = await zHandle.getDirectoryHandle(x.toString());
    const fileHandle = await xHandle.getFileHandle(`${y}.jpg`);
    
    const file = await fileHandle.getFile();
    const url = URL.createObjectURL(file);
    
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error(`Failed to load image`));
      };
      img.src = url;
    });
  } catch (error) {
    return null; // Tile not found
  }
}

/**
 * Load a single tile from FileList
 * @param {Map} fileMap - Map of tile paths to File objects
 * @param {number} z - Zoom level
 * @param {number} x - Tile X coordinate
 * @param {number} y - Tile Y coordinate
 * @param {number} tileSize - Expected tile size
 * @returns {Promise<HTMLImageElement|null>} Loaded image or null if not found
 */
async function loadSingleTileFromFiles(fileMap, z, x, y, tileSize) {
  try {
    const key = `${z}/${x}/${y}`;
    const file = fileMap.get(key);
    
    if (!file) {
      return null; // Tile not found
    }
    
    const url = URL.createObjectURL(file);
    
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error(`Failed to load image`));
      };
      img.src = url;
    });
  } catch (error) {
    return null; // Tile not found
  }
}

/**
 * Calculate geographic bounds for the loaded tile area
 * @param {object} tileRange - Tile range
 * @returns {object} Geographic bounds [west, south, east, north]
 */
function getTileAreaBounds(tileRange) {
  const { minX, maxX, minY, maxY, zoom } = tileRange;
  
  const nw = tileToBounds(minX, minY, zoom);
  const se = tileToBounds(maxX, maxY, zoom);
  
  return [nw.west, se.south, se.east, nw.north]; // [west, south, east, north]
}

/**
 * Determine optimal zoom level based on area size and available zoom levels
 * @param {number} sizeKm - Area size in kilometers
 * @param {number[]} availableZooms - Available zoom levels in the folder
 * @param {number} maxTiles - Maximum number of tiles to load (default 100)
 * @returns {number} Optimal zoom level
 */
function getOptimalZoomLevel(sizeKm, availableZooms = [], maxTiles = 100) {
  // If no available zooms provided, use the original logic
  if (availableZooms.length === 0) {
    return getOptimalZoomLevelOriginal(sizeKm, maxTiles);
  }
  
  // Sort available zooms from highest to lowest (prefer higher detail)
  const sortedZooms = [...availableZooms].sort((a, b) => b - a);
  
  // At zoom level z, each tile covers approximately (40075 / 2^z) km at equator
  const kmPerTileAtEquator = 40075; // Earth circumference in km
  
  for (const zoom of sortedZooms) {
    const kmPerTile = kmPerTileAtEquator / Math.pow(2, zoom);
    const tilesNeeded = Math.pow(Math.ceil(sizeKm / kmPerTile), 2);
    
    if (tilesNeeded <= maxTiles) {
      console.log(`Selected zoom level ${zoom} from available levels: [${availableZooms.join(', ')}]`);
      return zoom;
    }
  }
  
  // If all zoom levels require too many tiles, use the lowest available zoom
  const lowestZoom = Math.min(...availableZooms);
  console.log(`All zoom levels require too many tiles, using lowest available: ${lowestZoom}`);
  return lowestZoom;
}

/**
 * Original zoom level calculation (fallback when no folder is scanned)
 * @param {number} sizeKm - Area size in kilometers
 * @param {number} maxTiles - Maximum number of tiles to load (default 100)
 * @returns {number} Optimal zoom level
 */
function getOptimalZoomLevelOriginal(sizeKm, maxTiles = 100) {
  // At zoom level z, each tile covers approximately (40075 / 2^z) km at equator
  const kmPerTileAtEquator = 40075; // Earth circumference in km
  
  for (let zoom = 1; zoom <= 18; zoom++) {
    const kmPerTile = kmPerTileAtEquator / Math.pow(2, zoom);
    const tilesNeeded = Math.pow(Math.ceil(sizeKm / kmPerTile), 2);
    
    if (tilesNeeded <= maxTiles) {
      return zoom;
    }
  }
  
  return 10; // Fallback zoom level
}


/***/ }),

/***/ "./src/js/terrain.js":
/*!***************************!*\
  !*** ./src/js/terrain.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateTerrain: () => (/* binding */ generateTerrain)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.core.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls.js */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
// src/js/terrain.js



let scene, camera, renderer, controls;
let keyboardControlsInitialized = false;

// Aircraft-style keyboard controls
let keyStates = {};
let movementSpeed = 0.1; // Changed to match HTML default
let rotationSpeed = 0.02;
let isKeyboardControlActive = false;

// Movement vectors
let velocity = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
let cameraDirection = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
let cameraRight = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
let cameraUp = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();

function generateTerrain(demData, textureImageData, heightScaleMultiplier = 1, terrainResolution = 30) {
  const { width, height, rasters, geoTransform, samplesPerPixel, bbox } = demData;

  // Ochrany proti špatným datům
  if (width < 2 || height < 2) {
    console.error("DEM má neplatné rozměry:", width, height);
    alert("DEM GeoTIFF má příliš malý rozměr (minimálně 2x2 pixelů)");
    return;
  }

  // Pro DEM by měl být samplesPerPixel = 1
  if (samplesPerPixel !== 1) {
    console.error("DEM by měl mít pouze 1 band, má:", samplesPerPixel);
    alert("Nahraný soubor není platný DEM (výškový model)");
    return;
  }

  // DEM data jsou nyní v rasters[0] (první a jediný band)
  const elevationData = rasters[0] || rasters;
  
  if (!elevationData || elevationData.length !== width * height) {
    console.error("DEM data neodpovídají rozměrům:", elevationData?.length, width * height);
    alert("DEM GeoTIFF má neplatná výšková data");
    return;
  }

  // Analýza výškových dat pro lepší škálování
  let minElevation = Infinity;
  let maxElevation = -Infinity;
  let validValues = 0;
  
  for (let i = 0; i < elevationData.length; i++) {
    const value = elevationData[i];
    // Ignoruj NoData hodnoty (často -9999, NaN, nebo extrémní hodnoty)
    if (isFinite(value) && value > -1000 && value < 10000) {
      minElevation = Math.min(minElevation, value);
      maxElevation = Math.max(maxElevation, value);
      validValues++;
    }
  }
  
  console.log(`DEM analýza: min=${minElevation}m, max=${maxElevation}m, platných hodnot=${validValues}/${elevationData.length}`);
  
  if (validValues === 0) {
    alert("DEM neobsahuje platné výškové hodnoty");
    return;
  }

  // Calculate terrain dimensions based on geographic bounds and user-specified resolution
  const [west, south, east, north] = bbox;
  const METERS_PER_DEGREE = 111000;
  const geographicWidth = Math.abs(east - west) * METERS_PER_DEGREE;
  const geographicHeight = Math.abs(north - south) * METERS_PER_DEGREE;
  
  // Calculate terrain mesh dimensions based on desired resolution
  const terrainWidth = Math.ceil(geographicWidth / terrainResolution);
  const terrainHeight = Math.ceil(geographicHeight / terrainResolution);
  
  console.log(`Geografické rozměry: ${geographicWidth.toFixed(0)}m x ${geographicHeight.toFixed(0)}m`);
  console.log(`Rozlišení terénu: ${terrainResolution}m -> mřížka ${terrainWidth}x${terrainHeight}`);
  
  // Limit maximum terrain dimensions for performance
  const MAX_TERRAIN_DIMENSION = 1024;
  let finalTerrainWidth = terrainWidth;
  let finalTerrainHeight = terrainHeight;
  
  if (terrainWidth > MAX_TERRAIN_DIMENSION || terrainHeight > MAX_TERRAIN_DIMENSION) {
    const scaleFactor = Math.min(
      MAX_TERRAIN_DIMENSION / terrainWidth,
      MAX_TERRAIN_DIMENSION / terrainHeight
    );
    finalTerrainWidth = Math.floor(terrainWidth * scaleFactor);
    finalTerrainHeight = Math.floor(terrainHeight * scaleFactor);
    const actualResolution = Math.max(
      geographicWidth / finalTerrainWidth,
      geographicHeight / finalTerrainHeight
    );
    
    console.log(`Omezuji rozměry terénu na ${finalTerrainWidth}x${finalTerrainHeight} (skutečné rozlišení: ${actualResolution.toFixed(1)}m)`);
  }

  initThree();

  // Create texture from ImageData
  const texture = new three__WEBPACK_IMPORTED_MODULE_0__.CanvasTexture(imageDataToCanvas(textureImageData));
  texture.needsUpdate = true;

  // Create high-resolution terrain geometry
  const geometry = new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(1, 1, finalTerrainWidth - 1, finalTerrainHeight - 1);
  const positions = geometry.attributes.position.array;

  // Sample elevation data at high resolution
  const pixelSizeX = (east - west) / finalTerrainWidth;
  const pixelSizeY = (north - south) / finalTerrainHeight;
  
  for (let i = 0, j = 0; i < positions.length; i += 3, j++) {
    const row = Math.floor(j / finalTerrainWidth);
    const col = j % finalTerrainWidth;
    
    // Calculate geographic coordinates for this vertex
    const lon = west + col * pixelSizeX;
    const lat = north - row * pixelSizeY;
    
    // Sample elevation from original DEM data
    const elevation = sampleDEMAtCoordinate(elevationData, width, height, geoTransform, bbox, lon, lat);
    
    // Apply elevation with scaling
    if (isFinite(elevation) && elevation > -1000 && elevation < 10000) {
      positions[i + 2] = (elevation - minElevation) * getHeightScale(geographicWidth, geographicHeight, maxElevation - minElevation, heightScaleMultiplier);
    } else {
      positions[i + 2] = 0;
    }
  }

  geometry.computeVertexNormals();

  const material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshPhongMaterial({ 
    map: texture,
    side: three__WEBPACK_IMPORTED_MODULE_0__.DoubleSide
  });
  const mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry, material);
  mesh.rotateX(-Math.PI / 2);

  // Scale mesh to match geographic dimensions
  const SCENE_SCALE = 1000;
  const finalScaleX = geographicWidth / SCENE_SCALE;
  const finalScaleY = geographicHeight / SCENE_SCALE;
  
  mesh.scale.set(finalScaleX, finalScaleY, 1);
  mesh.position.set(0, 0, 0);
  
  console.log(`3D scéna škálování: ${finalScaleX.toFixed(2)} x ${finalScaleY.toFixed(2)}`);
  
  scene.add(mesh);
  
  // Position camera appropriately
  const maxDimension = Math.max(finalScaleX, finalScaleY);
  const cameraDistance = maxDimension * 2;
  
  camera.position.set(0, cameraDistance * 0.8, cameraDistance * 0.6);
  camera.lookAt(0, 0, 0);
  
  controls.target.set(0, 0, 0);
  controls.update();
  
  console.log(`Kamera pozice: ${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)}`);
  console.log(`Kamera vzdálenost: ${cameraDistance.toFixed(2)} jednotek`);
}

// Helper function to calculate appropriate height scaling
function getHeightScale(geographicWidth, geographicHeight, elevationRange, heightScaleMultiplier) {
  const SCENE_SCALE = 1000;
  const horizontalScale = Math.max(geographicWidth, geographicHeight) / SCENE_SCALE;
  const baseHeightScale = elevationRange > 0 ? (horizontalScale * 0.01) / elevationRange : 0.001;
  return baseHeightScale * heightScaleMultiplier;
}

// Helper function to sample DEM elevation at geographic coordinates
function sampleDEMAtCoordinate(elevationData, width, height, geoTransform, bbox, lon, lat) {
  const [west, south, east, north] = bbox;
  
  // Check if coordinate is within DEM bounds
  if (lon < west || lon > east || lat < south || lat > north) {
    return 0;
  }
  
  // Convert geographic coordinates to pixel coordinates
  const x = (lon - geoTransform.originX) / geoTransform.pixelSizeX;
  const y = (lat - geoTransform.originY) / geoTransform.pixelSizeY;
  
  const col = Math.floor(x);
  const row = Math.floor(y);
  
  // Check pixel bounds
  if (col < 0 || col >= width || row < 0 || row >= height) {
    return 0;
  }
  
  // Simple nearest neighbor sampling
  const index = row * width + col;
  const elevation = elevationData[index];
  
  // Return elevation or 0 for invalid values
  return (isFinite(elevation) && elevation > -1000 && elevation < 10000) ? elevation : 0;
}

function initThree() {
  if (scene) {
    // Scene already exists, but ensure keyboard controls are initialized
    if (!keyboardControlsInitialized) {
      initKeyboardControls();
    }
    return;
  }

  scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();
  scene.background = new three__WEBPACK_IMPORTED_MODULE_0__.Color(0xbfd1e5);

  const aspect = window.innerWidth / window.innerHeight;
  camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(60, aspect, 0.1, 10000);
  camera.position.set(0, 100, 100);

  renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer({
    canvas: document.getElementById('three-canvas'),
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new three_examples_jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_2__.OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.update();

  const light = new three__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight(0xffffff, 1);
  light.position.set(100, 200, 100);
  scene.add(light);
  scene.add(new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(0xffffff, 0.5));

  // Initialize keyboard controls
  initKeyboardControls();

  animate();
}

function initKeyboardControls() {
  keyboardControlsInitialized = true;
  // Initialize speed slider
  const speedSlider = document.getElementById('movementSpeed');
  const speedValue = document.getElementById('speedValue');
  
  if (speedSlider && speedValue) {
    // Update movement speed when slider changes
    speedSlider.addEventListener('input', (event) => {
      movementSpeed = parseFloat(event.target.value);
      speedValue.textContent = movementSpeed.toFixed(3);
    });
    
    // Set initial value
    movementSpeed = parseFloat(speedSlider.value);
    speedValue.textContent = movementSpeed.toFixed(3);
  }

  // Initialize rotation speed slider
  const rotationSpeedSlider = document.getElementById('rotationSpeed');
  const rotationSpeedValue = document.getElementById('rotationSpeedValue');
  
  if (rotationSpeedSlider && rotationSpeedValue) {
    // Update rotation speed when slider changes
    rotationSpeedSlider.addEventListener('input', (event) => {
      rotationSpeed = parseFloat(event.target.value);
      rotationSpeedValue.textContent = rotationSpeed.toFixed(3);
    });
    
    // Set initial value
    rotationSpeed = parseFloat(rotationSpeedSlider.value);
    rotationSpeedValue.textContent = rotationSpeed.toFixed(3);
  }

  // Keyboard event listeners
  document.addEventListener('keydown', (event) => {
    const key = event.code;
    keyStates[key] = true;
    
    // Check if any movement keys are pressed
    const movementKeys = ['KeyW', 'KeyS', 'KeyA', 'KeyD', 'KeyQ', 'KeyE', 'KeyR', 'KeyF', 'KeyT', 'KeyG'];
    if (movementKeys.includes(key)) {
      isKeyboardControlActive = true;
      controls.enabled = false; // Disable OrbitControls when using keyboard
      event.preventDefault();
    }
  });

  document.addEventListener('keyup', (event) => {
    const key = event.code;
    keyStates[key] = false;
    event.preventDefault();
  });

  // Mouse click event to restore mouse controls
  renderer.domElement.addEventListener('mousedown', (event) => {
    if (isKeyboardControlActive) {
      // Check if no movement keys are currently pressed
      const movementKeys = ['KeyW', 'KeyS', 'KeyA', 'KeyD', 'KeyQ', 'KeyE', 'KeyR', 'KeyF', 'KeyT', 'KeyG'];
      const anyMovementKeyPressed = movementKeys.some(k => keyStates[k]);
      
      if (!anyMovementKeyPressed) {
        isKeyboardControlActive = false;
        controls.enabled = true; // Re-enable OrbitControls on mouse click
        controls.update();
      }
    }
  });

  // Handle window focus/blur to reset key states
  window.addEventListener('blur', () => {
    keyStates = {};
    isKeyboardControlActive = false;
    controls.enabled = true;
  });
}

function updateKeyboardControls() {
  if (!isKeyboardControlActive) return;

  // Level the camera (set roll to 0) before applying keyboard controls
  // levelCameraRoll(); // Temporarily disabled to fix upside-down issue

  // Reset velocity
  velocity.set(0, 0, 0);

  // Get camera direction vectors AFTER leveling
  camera.getWorldDirection(cameraDirection);
  
  // Calculate horizontal right vector for consistent pitch behavior
  const horizontalForward = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(cameraDirection.x, 0, cameraDirection.z).normalize();
  const horizontalRight = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3().crossVectors(horizontalForward, new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 1, 0)).normalize();
  
  // Use the leveled camera's up vector for yaw
  cameraUp.copy(camera.up);

  // Movement controls (WASD)
  if (keyStates['KeyW']) { // Forward (horizontal movement only)
    // Use horizontal forward direction, ignoring camera pitch
    velocity.add(horizontalForward.clone().multiplyScalar(movementSpeed));
  }
  if (keyStates['KeyS']) { // Backward (horizontal movement only)
    // Use horizontal forward direction, ignoring camera pitch
    velocity.add(horizontalForward.clone().multiplyScalar(-movementSpeed));
  }
  if (keyStates['KeyA']) { // Strafe left
    velocity.add(horizontalRight.clone().multiplyScalar(-movementSpeed));
  }
  if (keyStates['KeyD']) { // Strafe right
    velocity.add(horizontalRight.clone().multiplyScalar(movementSpeed));
  }

  // Apply movement
  camera.position.add(velocity);

  // Hover controls (vertical movement)
  const hoverMovementScale = 0.5;
  if (keyStates['KeyT']) { // Hover up (climb)
    camera.position.y += hoverMovementScale * movementSpeed;
  }
  if (keyStates['KeyG']) { // Hover down (descent)
    camera.position.y -= hoverMovementScale * movementSpeed;
  }

  // Rotation controls using consistent vectors
  if (keyStates['KeyQ']) { // Yaw left (around world Y-axis)
    camera.rotateOnWorldAxis(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 1, 0), rotationSpeed);
  }
  if (keyStates['KeyE']) { // Yaw right (around world Y-axis)
    camera.rotateOnWorldAxis(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 1, 0), -rotationSpeed);
  }
  if (keyStates['KeyR']) { // Pitch up (using horizontal right vector)
    camera.rotateOnWorldAxis(horizontalRight, rotationSpeed);
  }
  if (keyStates['KeyF']) { // Pitch down (using horizontal right vector)
    camera.rotateOnWorldAxis(horizontalRight, -rotationSpeed);
  }
}

function levelCameraRoll() {
  // Get the camera's current forward direction
  const forward = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
  camera.getWorldDirection(forward);
  
  // Create a target up vector (world up)
  const worldUp = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 1, 0);
  
  // Calculate the right vector (perpendicular to forward and world up)
  const right = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3().crossVectors(forward, worldUp).normalize();
  
  // Calculate the corrected up vector (perpendicular to forward and right)
  const correctedUp = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3().crossVectors(right, forward.negate()).normalize();
  
  // Create a rotation matrix with the corrected orientation
  const matrix = new three__WEBPACK_IMPORTED_MODULE_0__.Matrix4();
  matrix.makeBasis(right, correctedUp, forward.negate());
  
  // Apply the rotation to the camera
  camera.rotation.setFromRotationMatrix(matrix);
}

function animate() {
  requestAnimationFrame(animate);
  
  // Update keyboard controls
  updateKeyboardControls();
  
  // Update OrbitControls only when keyboard is not active
  if (!isKeyboardControlActive) {
    controls.update();
  }
  
  // Update compass rotation based on camera azimuth
  updateCompassRotation();
  
  renderer.render(scene, camera);
}

/**
 * Update the 2D compass rotation to match the camera's azimuth angle
 */
function updateCompassRotation() {
  const compassElement = document.getElementById('north-arrow');
  if (!compassElement || !controls) return;
  
  // Calculate camera azimuth (horizontal rotation around Y axis)
  const cameraDirection = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
  camera.getWorldDirection(cameraDirection);
  
  // Project camera direction onto horizontal plane (ignore Y component)
  const horizontalDirection = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(cameraDirection.x, 0, cameraDirection.z).normalize();
  
  // Calculate angle from North (positive Z axis)
  // In our coordinate system, North is positive Z direction
  // But we need to calculate the angle from where North should be relative to camera
  let azimuthAngle = Math.atan2(horizontalDirection.x, horizontalDirection.z);
  
  // Convert to degrees
  let azimuthDegrees = azimuthAngle * (180 / Math.PI);
  
  // Add 180 degrees to flip the direction (since we want North relative to camera, not camera relative to North)
  azimuthDegrees += 180;
  
  // Rotate the compass rose to point North correctly
  const compassRose = compassElement.querySelector('.compass-rose');
  if (compassRose) {
    compassRose.style.transform = `rotate(${azimuthDegrees}deg)`;
  }
}

function imageDataToCanvas(imageData) {
  const canvas = document.createElement('canvas');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext('2d');
  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

function downsampleImageData(imageData, factor) {
  const newWidth = Math.floor(imageData.width / factor);
  const newHeight = Math.floor(imageData.height / factor);
  const newImageData = new ImageData(newWidth, newHeight);

  for (let y = 0; y < newHeight; y++) {
    for (let x = 0; x < newWidth; x++) {
      const sourceX = Math.floor(x * factor);
      const sourceY = Math.floor(y * factor);
      const sourceIndex = (sourceY * imageData.width * 4) + (sourceX * 4);
      const targetIndex = (y * newWidth * 4) + (x * 4);
      newImageData.data[targetIndex] = imageData.data[sourceIndex];
      newImageData.data[targetIndex + 1] = imageData.data[sourceIndex + 1];
      newImageData.data[targetIndex + 2] = imageData.data[sourceIndex + 2];
      newImageData.data[targetIndex + 3] = imageData.data[sourceIndex + 3];
    }
  }

  return newImageData;
}


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "?4e4d":
/*!*********************!*\
  !*** url (ignored) ***!
  \*********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?662e":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?753a":
/*!***********************!*\
  !*** https (ignored) ***!
  \***********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?cdec":
/*!**********************!*\
  !*** http (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "3d-leaflet:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk_3d_leaflet"] = self["webpackChunk_3d_leaflet"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-three"], () => (__webpack_require__("./src/js/app.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;