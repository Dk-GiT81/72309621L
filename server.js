const express = require('express');
const axios = require('axios');
const app = express();


const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ5MDI0MzAzLCJpYXQiOjE3NDkwMjQwMDMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjNjMjc4NTdiLTllN2QtNDE3NS1hYjhmLWJhMzEwZTI1ODBmMCIsInN1YiI6ImRna2FrYWQwOUBnbWFpbC5jb20ifSwiZW1haWwiOiJkZ2tha2FkMDlAZ21haWwuY29tIiwibmFtZSI6ImRhcnNoYW4gZ2FqYW5hbiBrYWthZCIsInJvbGxObyI6IjcyMzA5NjIxbCIsImFjY2Vzc0NvZGUiOiJLUmpVVVUiLCJjbGllbnRJRCI6IjNjMjc4NTdiLTllN2QtNDE3NS1hYjhmLWJhMzEwZTI1ODBmMCIsImNsaWVudFNlY3JldCI6ImNrQ21qZnVndUNjZEdkZXUifQ.wyey8sYYgpNpkJ3QUQXE1ZHC_NiC67WMYAejzParv_Q';
const PORT = 9876;


let numberWindow = [];
const WINDOW_SIZE = 10;

const apiURLs = {
  p: 'http://20.244.56.144/evaluation-service/primes',
  f: 'http://20.244.56.144/evaluation-service/fibo',
  e: 'http://20.244.56.144/evaluation-service/even',
  r: 'http://20.244.56.144/evaluation-service/rand',
};

app.get('/numbers/:numberid', async (req, res) => {
  const { numberid } = req.params;
  const url = apiURLs[numberid];

  if (!url) {
    return res.status(400).json({ error: 'Invalid number type' });
  }

  let numbers = [];

  try {
    const source = axios.CancelToken.source();
    setTimeout(() => source.cancel(), 800); // timeout

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      cancelToken: source.token,
    });

    numbers = response.data.numbers || [];
  } catch (err) {
    return res.json({
      windowPrevState: [...numberWindow],
      windowCurrState: [...numberWindow],
      numbers: [],
      avg: 0,
      error: 'Failed to fetch numbers from API or request timed out',
    });
  }

  const windowPrevState = [...numberWindow];

 
  for (let num of numbers) {
    if (!numberWindow.includes(num)) {
      numberWindow.push(num);
    }
  }


  while (numberWindow.length > WINDOW_SIZE) {
    numberWindow.shift();
  }


  const avg =
    numberWindow.length > 0
      ? (
          numberWindow.reduce((acc, val) => acc + val, 0) / numberWindow.length
        ).toFixed(2)
      : 0;

  res.json({
    windowPrevState,
    windowCurrState: [...numberWindow],
    numbers,
    avg: parseFloat(avg),
  });
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
