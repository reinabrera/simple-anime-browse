import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import 'dotenv/config';

const app = express();
const port = process.env.port || 3000;
const API_URL = "https://api.jikan.moe/v4/"
const d = new Date();
const year = d.getFullYear()-1;
const month = d.getMonth();
const day = d.getDate();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const topAiring = await axios.get(`${API_URL}top/anime?filter=airing&limit=10&sfw`);
        const topLastYear = await axios.get(`${API_URL}anime?filter=complete&order_by=popularity&sort=asc&start_date=${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}&limit=10&sfw`);
        const upcomingAnime = await axios.get(`${API_URL}anime?filter=upcoming&order_by=popularity&sort=asc&limit=10&sfw`);
        res.render("index.ejs", {
            topAiring : topAiring.data["data"],
            topLastYear : topLastYear.data["data"],
            upcomingAnime : upcomingAnime.data["data"]
        });
    } catch (error) {
        console.log(error)
    }
});

app.post("/search", async (req, res) => {
    const query = req.body["query"];
    try {
        const result = await axios.get(`${API_URL}anime/?q=${query}`);
        res.render("query.ejs", {
            query : result.data["data"],
            pagination : result.data["pagination"],
        });
    } catch (error) {
        console.log(error);
    }

});

app.listen(port, () => {
    console.log(`App is running at port ${port}`);
});

