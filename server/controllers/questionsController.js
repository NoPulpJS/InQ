const db = require('../data/models')
module.exports = {
  submit: (req, res, next) => {
    //query to insert question to database
    //req.body will contain question, user id, categories, companies
    const { question, _id, categories, companies } = req.body;

    //insert query to questions table need ( question, user id)
    //SELECT from _id from questions where question equals question
    const insertQuestion = {
      text: 'INSERT INTO questions (question, created_by) VALUES ($1, $2) RETURNING _id',
      values: [question, _id]
    }

    db.query(insertQuestion).then((data) => console.log('insertQuestion: ', data.rows[0]._id))

    //insert query to joined table questions & categories
      //questions_id and categories_id
    //insert query to joined table questions & companies
    return next();
  },
}