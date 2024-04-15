const diapazons = {
  1: {
    min: 48,
    max: 57,
  },
  2: {
    min: 65,
    max: 90,
  },
  3: {
    min: 97,
    max: 122,
  },
};

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function symbolGenerator() {
  const firstdiap = randomNumber(1, 3);
  const code = randomNumber(diapazons[firstdiap].min, diapazons[firstdiap].max);
  return String.fromCharCode(code);
}

function generateHash(quantity) {
  let bufer = '';
  for (let i = 0; i < quantity; i++) {
    bufer = bufer + symbolGenerator();
  }
  return bufer;
}

module.exports = { generateHash };
