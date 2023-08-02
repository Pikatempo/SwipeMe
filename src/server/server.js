const express = require('express');
const app = express();
const PORT = 3000;
const taskRouter = require('./router/taskRouter.js');
const userRouter = require('./router/userRouter.js');

app.use(express.json());
app.use(express());

app.get('/', (req, res) => {
  return res.status(200).send('Great Server Page');
});

app.use('/api/task', taskRouter);
app.use('/api/user', userRouter);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on Port: ${PORT}`);
});

module.exports = app;
