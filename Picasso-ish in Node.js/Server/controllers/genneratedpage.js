const { response } = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: '',
  port: ''
});

const putSave = async (req, res = response) => {
    const { id } = req.body;
    try {
      // update the boolean value of saved for the image to what it is not
      connection.query(
        'UPDATE image SET i_saved = CASE i_saved WHEN 0 THEN 1 WHEN 1 THEN 0 END WHERE i_id = ?',
        [id],
        (error, results) => {
          if (error) {
            console.error(error);
            res
              .status(500)
              .send('Error saving the image to the profile in the database');
          } else {
            res.status(200).send('Image saved successfully');
          }
        }
      );
    } catch (err) {
    console.error(err);
        res.status(500).send('Error saving the image to the profile in the database');
    }
};

const putShare = async (req, res = response) => {
  const { id } = req.body;
    try {
        // update the boolean value of shared for the image to what it is not
        connection.query(
            'UPDATE image SET i_shared = CASE i_shared WHEN 0 THEN 1 WHEN 1 THEN 0 END WHERE i_id = ?',
            [id],
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).send('Error updating shared image');
                } else {
                    res.status(200).send('Image shared successfully');
                }
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating shared image');
    }
};

const postSaveShareStutus = async (req, res = response) => {
  const { id } = req.body;
    try {
      // get the boolean values for whether the image is liked and shared
      connection.query(
      'SELECT i_saved, i_shared FROM image WHERE i_id = ?',
      [id],
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).send('Error retrieving profiles from database');
          return;
        }
        res.json(results);

      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving profiles from database');
  }
};

const postImageOwner = async (req, res = response) => {
  const { email, id } = req.body;
   try {
    // get the email for the accunt that gennerated the image
    connection.query(
      'SELECT profile_p_email FROM image WHERE i_id = ?',
      [id],
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).send('Error retrieving profiles from database');
          return;
        }

        let retVal = false;
        // check if the loged in user is the user who gennerated the page
        if (results[0].profile_p_email == email) { 
          retVal = true;
        }
        res.json(retVal);
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving profiles from database');
  }
};

const updateLikes = async (req, res = response) => {
    const { numLikes, id } = req.body;
    try {
        // Update the number of likes based on the image id
        connection.query('UPDATE image SET i_likes = ? WHERE i_id = ?', [numLikes, id], (error, results) => {
            if (error) {
                console.error(error);
                console.log('Error updating image likes');
            } else {
                console.log('Image likes updated successfully');
            }
        });
    } catch (error) {
        
    }   
};

module.exports = {
  putSave,
  putShare,
  postSaveShareStutus,
  postImageOwner,
  updateLikes,
};
