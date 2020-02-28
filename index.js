const fs = require('fs');
const readline = require('readline');

const data = [];
const result = [];

function calculateMaxSum() {

  // Initialize first line
  result.push([data[0][0]]);

  for (let i = 1; i < data.length; i++) {
    const lineSum = [];
    for (let j = 0; j < data[i].length; j++) {
      // Calculate max sum to this position
      if (j === 0) {
        lineSum.push(result[i - 1][j] + data[i][j]);
      } else if (j === data[i].length - 1) {
        lineSum.push(result[i - 1][j - 1] + data[i][j]);
      } else {
        lineSum.push(Math.max(result[i - 1][j - 1], result[i - 1][j]) + data[i][j]);
      }
    }
    result.push(lineSum);
  }

  // Get largest item from last line
  const maxSum = Math.max(...result[data.length - 1]);
  console.log('Max sum: ', maxSum);
}

const readInterface = readline.createInterface({
  input: fs.createReadStream('data.txt'),
  output: process.stdout,
  terminal: false,
});

readInterface.on('line', function (line) {
  const lineData = line.trim().split(' ').map(Number);
  data.push(lineData);
}).on('close', function () {
  calculateMaxSum();
});
