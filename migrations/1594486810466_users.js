/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable("users",{
        id:"id",
        firstName:"text",
        lastName: "text",
        email: "text",
        password:"text"
    })
};

exports.down = pgm => {pgm.dropTable("users")};
