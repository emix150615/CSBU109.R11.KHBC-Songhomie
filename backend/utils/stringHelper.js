function normalizeUTF8(text) {
  if (!text) return '';
  try {
    let decoded = String(text);
    decoded = decoded
      .replace(/Ã©/g, 'é')
      .replace(/Ã /g, 'à')
      .replace(/Ã¡/g, 'á')
      .replace(/Ã¢/g, 'â')
      .replace(/Ã£/g, 'ã');
    return decoded.normalize('NFC').trim() || 'Untitled';
  } catch (e) {
    return String(text).trim() || 'Untitled';
  }
}

module.exports = { normalizeUTF8 };