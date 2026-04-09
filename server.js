const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('🚀 Dashboard đang chạy');
});

app.listen(3000, () => console.log('Dashboard chạy cổng 3000'));