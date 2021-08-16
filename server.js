const app = require('./src/index');

const port = 3001;

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});