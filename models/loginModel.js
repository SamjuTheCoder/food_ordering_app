const con = require('../db/connections')
const argon2 = require('argon2');


// login logic
async function loginLogic(phone, password) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM users WHERE phone = ?`;
      con.query(query, [phone], async (error, results) => {
        if (error) {
          reject(error);
        } else {
                if (results.length > 0) {
                  const hashedPasswordFromDB = results[0].password;
                  //const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDB);
                  const passwordMatch = await argon2.verify(hashedPasswordFromDB, password);
                  resolve(passwordMatch); // Resolves true if passwords match, otherwise resolves false
                } else {
                  resolve(false); // User not found, resolves false
              }
          }
      });
    });
}
  
module.exports = {
    loginLogic,
}
