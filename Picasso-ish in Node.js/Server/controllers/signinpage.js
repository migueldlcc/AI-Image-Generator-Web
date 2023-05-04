const { response } = require("express");
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: '',
    port: ''
});

const postSignIn = async (req, res = response) => {
    const { email, password } = req.body;
    //create query to see if email and password matches with profile info in database
    try {
        connection.query('SELECT COUNT(*) as count FROM profile WHERE p_email = ? AND p_password = ?', [email, password], (error, results, fields) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error checking profile in the database');
                return;
            } else {
                if (results[0].count == 1) {
                    res.status(200).send('Profile exists');
                }
                else {
                    res.status(400).send('Error no account');
                }
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Error checking profile');
    }
};



module.exports = {
    postSignIn
};