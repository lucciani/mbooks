const app = require('./src/index');

const port = 3001;

// app.get('/', (req, res) => res.json({ ok: true}));

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});