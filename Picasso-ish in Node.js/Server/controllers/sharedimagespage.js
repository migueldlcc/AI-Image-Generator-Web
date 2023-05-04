const { response } = require("express");
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: '',
    port: ''
});

const postSharedImages = async (req, res = response) => {
    const { email, iterations } = req.body;
    const limit = (12 * iterations) + 12; // get the number of images to return
    try {
        connection.query('SELECT i_id, i_linkmedium FROM image WHERE profile_p_email = ? AND i_shared = 1 AND i_bought = 0 LIMIT ?', [email, limit], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error retrieving images from database');
                return;
            }

            const images = results.map(result => ({
                id: result.i_id,
                // decode image
                link: result.i_linkmedium.toString('base64')
            }));

            res.json(images);

        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving images from database');
    }
};


module.exports = {
    postSharedImages,
};