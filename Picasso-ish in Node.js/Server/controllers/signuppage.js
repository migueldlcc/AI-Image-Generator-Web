const { response } = require("express");
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: '',
    port: ''
});

const postSignUp = async (req, res = response) => {
    
    const { email, firstname, lastname, dateofbirth, password } = req.body;
    //create query to see if the email is already in the database
    try {
        connection.query(
            'SELECT COUNT(*) as count FROM profile WHERE p_email = ?',
            [email],
            (error, results, fields) => {
                if (error) {
                    console.error(error);
                    res.status(500).send('Error checking profile');
                } else {
                    if (results[0].count > 0) {
                        res.status(409).send('Profile with email already exists');
                    }
                    //create query to insert the information into a new row in the profile table
                    else {
                        connection.query(
                            'INSERT INTO profile (p_email, p_password, p_firstname, p_lastname, p_dob) VALUES (?, ?, ?, ?, ?)',
                            [email, password, firstname, lastname, dateofbirth],
                            (error, results, fields) => {
                                if (error) {
                                    console.error(error);
                                    res.status(500).send('Error inserting profile');
                                } else {
                                    res.status(200).send('Profile inserted successfully');
                                }
                            }
                        );
                    }
                }
            }
        );

    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating profile.');
    }
};



module.exports = {
    postSignUp
};