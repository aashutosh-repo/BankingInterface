const open = require('open');

// Wait a bit to ensure dev server is up
setTimeout(() => {
  open('http://localhost:4200/homepage');
}, 3000);
