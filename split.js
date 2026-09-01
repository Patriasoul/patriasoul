// PatriaSoul – univerzalni split/chunk utility (Faza 2)
// Sigurno dijeljenje nizova i tekstualnih podataka bez dodatnih biblioteka.

function normalizeSize(size, fallback = 1) {
  const value = Number(size);
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : fallback;
}

function splitArray(value, size = 1) {
  if (!Array.isArray(value)) return [];
  const chunkSize = normalizeSize(size);
  const result = [];
  for (let i = 0; i < value.length; i += chunkSize) {
    result.push(value.slice(i, i + chunkSize));
  }
  return result;
}

function splitText(value, separator = /\s+/, limit = Infinity) {
  if (value === null || value === undefined) return [];
  const text = String(value).trim();
  if (!text) return [];
  return text.split(separator, limit);
}

function splitIntoParts(value, parts = 1) {
  if (!Array.isArray(value) || !value.length) return [];
  const count = Math.min(normalizeSize(parts), value.length);
  const result = [];
  const baseSize = Math.floor(value.length / count);
  const remainder = value.length % count;
  let index = 0;

  for (let i = 0; i < count; i += 1) {
    const currentSize = baseSize + (i < remainder ? 1 : 0);
    result.push(value.slice(index, index + currentSize));
    index += currentSize;
  }
  return result;
}

function splitTextByLength(value, maxLength = 1000) {
  if (value === null || value === undefined) return [];
  const text = String(value).trim();
  if (!text) return [];
  const length = normalizeSize(maxLength, 1000);
  const result = [];
  for (let i = 0; i < text.length; i += length) {
    result.push(text.slice(i, i + length));
  }
  return result;
}

function splitByPredicate(value, predicate) {
  if (!Array.isArray(value) || typeof predicate !== 'function') return [];
  const groups = [];
  let current = [];

  value.forEach((item, index) => {
    if (predicate(item, index, value)) {
      if (current.length) groups.push(current);
      current = [];
    } else {
      current.push(item);
    }
  });

  if (current.length) groups.push(current);
  return groups;
}

export const split = {
  array: splitArray,
  chunk: splitArray,
  text: splitText,
  parts: splitIntoParts,
  textByLength: splitTextByLength,
  byPredicate: splitByPredicate
};

if (typeof window !== 'undefined') {
  window.PATRIA_SPLIT = split;
}

export default split;
