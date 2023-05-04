const { response } = require("express");
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: '',
    port: ''
});

const postProfile = async (req, res = response) => {
    const { email } = req.body;
    try {
        // get all the imformation about the account for the logged in email
        connection.query('SELECT * FROM profile WHERE p_email = ?', [email], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error retrieving profiles from database');
                return;
            }
            res.json(results);
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving profiles from database');
    }
};

const updateProfile = async (req, res = response) => {
    const { email, password, firstname, lastname } = req.body;
    try {
        // update the new password, first, and last names
        connection.query(
        'UPDATE profile SET p_password = ?, p_firstname = ?, p_lastname = ? WHERE p_email = ?',
        [password, firstname, lastname, email],
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error updating profile');
            } else {
                res.status(200).send('Profile updated successfully');
            }
        } );
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating profile');
    }
};

const postSaved = async (req, res = response) => {
    const { email } = req.body;
    try {
        // // get six saved images, this wil be the firs six in the image table
        connection.query('SELECT i_linkmedium FROM image WHERE profile_p_email = ? AND i_saved = 1 LIMIT 6', [email], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error retrieving images from database');
                return;
            }
            // decode the images to base64 files
            const imageArray = results.map((result) => {
                const imageBuffer = result.i_linkmedium;
                const base64String = imageBuffer.toString('base64');
                return base64String;
            });
            res.json(imageArray);
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving images from database');
    }
};

const postShared = async (req, res = response) => {
    const { email } = req.body;
    try {
        // get six shared images, this wil be the firs six in the image table
        connection.query('SELECT i_linkmedium FROM image WHERE profile_p_email = ? AND i_shared = 1 LIMIT 6', [email], (error, results,) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error retrieving images from database');
                return;
            }
            // decode the images to base64 files
            const imageArray = results.map((result) => {
                const imageBuffer = result.i_linkmedium;
                const base64String = imageBuffer.toString('base64');
                return base64String;
            });
            res.json(imageArray);
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving images from database');
    }
};

const postAllCards = async (req, res = response) => {
    const { email } = req.body;
    // get all the card details for all cards of the user
    const query = `SELECT c_id, c_nr, c_cvv, c_expdate FROM picasso_ish.card WHERE profile_p_email = ?`;
    try {
        connection.query(query, [email], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send("Error retrieving orders from database");
                return;
            }
            // extract the nessesary info and place the in json objects in an array
            const cards = results.map(result => ({
                number: result.c_nr,
                cvv: result.c_cvv,
                expiry: result.c_expdate
            }));
            res.json(cards);
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving orders from database");
    }
};





module.exports = {
    postProfile,
    updateProfile,
    postSaved,
    postShared,
    postAllCards
};