const express = require("express");
const app = express();

const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");
app.use(methodOverride("_method")); //the express will track the query string having _method

app.use(express.urlencoded({extended:true}));

app.set("view engine", "ejs");//sets view engine to ejs, view engine == template engine --> voh package jo humare template ko create krne mein kaam aayega 

app.set("views", path.join(__dirname, "views")); //basically hum keh rhe hai ki jo humara views naam ka folder hai voh aapko aisa nhi hai jahaan se aap server run krenge vahaan par milega hum bata rhe hai ki jo yeh views naam ka folder hai yeh hume iss jagah par milega (/delta/rest/views) --> we are trying to show the path of views folder / __dirname is current working directory of file where we have written our code, also we are telling our express to not search our views folder from where we have started our server

app.use(express.static(path.join(__dirname, "public"))); //public serves static files (css and js)

let posts = [
    {
        id: uuidv4(),
        username: "shwetayadav",
        content: "give me suggestions for spicy vegeterian recipes."
    },
    {
        id: uuidv4(),
        username: "rutujawankhede",
        content: "suggest me some old songs."
    },
    {
        id: uuidv4(), //gives a random unique id
        username: "preetididi",
        content: "suggest me suspense novels."
    },
]

app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
})

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/posts", (req, res) => {
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.render("index.ejs", {posts}); //we can also use res.redirect("/posts")
})

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("detail.ejs", {post});
})

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post);
    res.render("form.ejs", { post });
})

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});