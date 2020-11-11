// Slighty modified from this example https://stackoverflow.com/a/39906526/5610404.
const units = ['_bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

const prettyKib = (x) => {
  x = x * 1024

  let l = 0;
  let n = parseInt(x, 10) || 0;

  while (n >= 1024 && ++l) {
      n = n/1024;
  }

  return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}

export default prettyKib;