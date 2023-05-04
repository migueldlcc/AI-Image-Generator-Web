const { response } = require("express");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: '',
  port: ''
});

/* Insert orders into the database. It takes the amount paid, date of purchase, and user's email. */
const insertOrders = async (req, res = response) => {
  const { price, email } = req.body;
  var date = new Date();
  var setYear = date.toLocaleDateString("default", { year: "numeric" }); // String format year to '2000'
  var setMonth = date.toLocaleDateString("default", { month: "2-digit" }); // Stirng format month to '01'
  var setDay = date.toLocaleDateString("default", { day: "2-digit" }); // String format day to '01'
  const dateFormatted = setYear + "-" + setMonth + "-" + setDay;
  try {
    connection.query("INSERT INTO picasso_ish.order (o_price, o_date, o_email) VALUES (?, ?, ?)", [price, dateFormatted, email], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            success: false,
            message: "An error occurred while inserting the order.",
          });
        }
        console.log("order inserted successfully.");
        // Once the order is in the order table, we select the id of last order inserted for a future use to update the image table
        connection.query(
          "SELECT o_id FROM picasso_ish.order ORDER BY o_id DESC LIMIT 1",
          (err, results) => {
            if (err) {
              console.error(err);
              res.status(500).send("Error retrieving id from database");
              return;
            }
            const orderId = results[0].o_id;  // Access the first object in the results array and retrieve the value of the o_id property
            console.log(`Order id ${orderId} retrieved successfully`);
            // Send JSON response to the HTTP request made by the user
            res.json({
              success: true,
              message: "Order inserted successfully",
              orderId,
            });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Error inserting order into database");
  }
};

const postAllOrders = async (req, res = response) => {
  const { email } = req.body;
  // select the order id, order price, order date, medum image, searchword, and date
  // do this by joining the order and image table where the order ids match
  const query = `SELECT o.o_id, o.o_price, o.o_date, i.i_linkmedium, i.i_searchword, i.i_date
                   FROM picasso_ish.order o
                   JOIN picasso_ish.image i ON o.o_id = i.i_orderid
                   WHERE o.o_email = ?`;
  try {
    connection.query(query, [email], (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error retrieving orders from database");
        return;
        }
      
      const orders = {};
        for (const result of results) {
            // check it it is empty
            if (!orders[result.o_id]) {
              orders[result.o_id] = [];
            }
            // make sumb array  
            orders[result.o_id].push({
              id: result.o_id,
              image: result.i_linkmedium.toString("base64"),
              prompt: result.i_searchword,
              generateddate: result.i_date,
              orderdate: result.o_date,
            });
        }
        // make it only sub arrays no id
        const orderList = Object.values(orders);
      res.json(orderList);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving orders from database");
  }
};

module.exports = {
  insertOrders,
  postAllOrders,
};