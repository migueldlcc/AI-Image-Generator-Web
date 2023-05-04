const mysql = require('mysql');
const { response } = require("express");

/* Connection to database */
const connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: '',
    port: ''
});
/* Insert a card in the database. It takes the card number, cvc, expiration date, card type, user's address and email. */
const insertCard = async (req, res = response) => {
    const { cardNumber, cvc, expirationDate, type, address, email} = req.body;
    try {
        connection.query('INSERT INTO card (c_nr, c_cvv, c_expdate, c_type, c_billing, profile_p_email) VALUES (?, ?, ?, ?, ?, ?)',[cardNumber, cvc, expirationDate, type, address, email], (err, result) => {
            if (err) throw err;
            console.log('Card inserted successfully.');
    
        });
    } catch (err) {
        console.log(err);
    }
    
};

/* Verify a card exists in our database. It counts the number of rows in the card table where the card number, cvc, expiration date, and address match the entered inputs by the user */
const validateCard = async (req, res = response) => {
    const { cardNumber, cvc, expirationDate, address} = req.body;
    try {
        connection.query('SELECT COUNT(*) as count FROM card WHERE c_nr = ? AND c_cvv = ? AND c_expdate = ? AND c_billing = ?', [cardNumber, cvc, expirationDate, address], (error, results, fields) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error retrieving card from database');
                return;
            } else {
                if (results[0].count > 0) {
                    console.log('Credit card found');
                    res.status(200).send('Credit card exists');
                } else {
                    console.log('Credit card not found');
                    res.status(400).send('Credit card not found');
                }
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving card from database');
    }
};

/* Update the image table once an order is completed. The query updates the i_bought, profile_p_email, and i_orderid colums of the row that belongs to the image bought */
const orderInImage = async (req, res = response) => {
    const { email, orderId, imageId } = req.body;
    try {
        connection.query('UPDATE image SET i_bought = 1, profile_p_email = ?, i_orderid = ? WHERE i_id IN (?)', [email, orderId, imageId], (error, results, fields) => {
            if (error) {
              console.error(error);
            }
          }
        );
      console.log("Order added successfully to image table");
    } catch (error) {
      console.log(error);
    }
};

module.exports = {
    validateCard,
    insertCard,
    orderInImage,
};