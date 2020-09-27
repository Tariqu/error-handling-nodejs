const pool = require("../../config/database");

module.exports = {
  create: (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `insert into registration(firstName, lastName, gender, email, password, number) 
                  values(?,?,?,?,?,?)`,
        [
          data.first_name,
          data.last_name,
          data.gender,
          data.email,
          data.password,
          data.number,
        ],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        }
      );
    })
  },

  getUserByUserEmail: (email) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `select * from registration where email = ?`,
        [email],
        (error, results, fields) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        }
      );
    })
  },

  getUserByUserId: (id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `select id,firstName,lastName,gender,email,number from registration where id = ?`,
        [id],
        (error, results, fields) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        }
      );
    })
  },

  getUsers: () => {
    return new Promise((resolve, reject) => {
      pool.query(
        `select id,firstName,lastName,gender,email,number from registration`,
        [],
        (error, results, fields) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        }
      );
    });
  },

  updateUser: (id, data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?`,
        [
          data.first_name,
          data.last_name,
          data.gender,
          data.email,
          data.password,
          data.number,
          id,
        ],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        }
      );
    })
  },

  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `delete from registration where id = ?`,
        [id],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        }
      );
    })
  },
};