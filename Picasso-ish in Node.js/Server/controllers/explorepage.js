const { response } = require("express");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: '',
    port: ''
});
//function to fetch images in order based on most likes
const postMostLikes = async (req, res = response) => {
    const { numberOfImages } = req.body;
    const imagesToGet = numberOfImages + 9
    const query = `SELECT i_id, i_link FROM picasso_ish.image WHERE i_shared = 1 ORDER BY i_likes DESC LIMIT ?`;
    try {
        connection.query(query, [imagesToGet], (error, results, fields) => {
            if (error) {
                console.error(error);
                res.status(500).send("Error retrieving orders from database");
                return;
            }
            const filteredResults = results.slice(numberOfImages);
            res.json(filteredResults);
            
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving images from database");
    }
};
//function to fetch images in order based on least likes
const postLeastLikes = async (req, res = response) => {
    const { numberOfImages } = req.body;
    const imagesToGet = numberOfImages + 9
    const query = `SELECT i_id, i_link FROM picasso_ish.image WHERE i_shared = 1 ORDER BY i_likes ASC LIMIT ?`;
    try {
        connection.query(query, [imagesToGet], (error, results, fields) => {
            if (error) {
                console.error(error);
                res.status(500).send("Error retrieving orders from database");
                return;
            }
            const filteredResults = results.slice(numberOfImages);
            res.json(filteredResults);

        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving images from database");
    }
};
//images in order based on when they got generated
const postNewImages = async (req, res = response) => {
    const { numberOfImages } = req.body;
    const imagesToGet = numberOfImages + 9
    const query = `SELECT i_id, i_link FROM picasso_ish.image WHERE i_shared = 1 ORDER BY i_id DESC LIMIT ?`;
    try {
        connection.query(query, [imagesToGet], (error, results, fields) => {
            if (error) {
                console.error(error);
                res.status(500).send("Error retrieving orders from database");
                return;
            }
            const filteredResults = results.slice(numberOfImages);
            res.json(filteredResults);

        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving images from database");
    }
};

module.exports = {
    postMostLikes,
    postLeastLikes,
    postNewImages
};