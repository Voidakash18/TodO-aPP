const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

let todos = [];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { todos });
});

app.post('/add', (req, res) => {
    const { todo, priority } = req.body;
    if (todo.trim() !== '') {
        todos.push({ text: todo, priority, done: false });
    }
    res.redirect('/');
});

app.post('/delete', (req, res) => {
    const index = req.body.index;
    todos.splice(index, 1);
    res.redirect('/');
});

app.post('/toggle', (req, res) => {
    const index = req.body.index;
    todos[index].done = !todos[index].done;
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
