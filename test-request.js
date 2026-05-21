const fs = require('fs');
(async () => {
  try {
    const data = fs.readFileSync('test-image.png');
    if (typeof FormData === 'undefined' || typeof Blob === 'undefined') {
      console.log('FormData/Blob not available in this Node runtime; Node version:', process.version);
      process.exit(0);
    }
    const form = new FormData();
    form.append('image', new Blob([data]), 'test-image.png');
    const res = await fetch('http://localhost:3000/api/analyze', { method: 'POST', body: form });
    const text = await res.text();
    console.log('STATUS', res.status);
    console.log('BODY', text);
  } catch (e) {
    console.error('ERROR', e);
    process.exit(1);
  }
})();
