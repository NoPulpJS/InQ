const db = require('../data/models');

module.exports = {
  submit: (req, res, next) => {
    // query to insert question to database
    // req.body will contain question, user id, categories, companies
    const { question, _id } = req.body;

    // insert query to questions table need ( question, user id)
    // SELECT from _id from questions where question equals question
    const insertQuestion = {
      text:
        'INSERT INTO questions (question, created_by) VALUES ($1, $2) RETURNING _id',
      values: [question, _id],
    };

    db.query(insertQuestion)
      .then((data) => {
        // console.log('insertQuestion: ', data.rows[0]._id);
        res.locals.question_id = data.rows[0]._id;
        return next();
        // keep store of question of res.local
      })
      .catch((e) => next({
        message: `Error inside questionsController.submit: ${e}`,
        error: e,
      }));
  },
  // insert query to joined table questions & categories
  // creating relationship between questions and categories (could be multiple categories)
  categories: (req, res, next) => {
    const { categories } = req.body;

    const arrayOfCategories = categories.map((categoryId) => {
      const query = {
        text:
          'INSERT INTO questions_in_categories (question_id, category_id) VALUES ($1, $2)',
        values: [res.locals.question_id, categoryId],
      };
      return db.query(query);
    });

    Promise.all(arrayOfCategories)
      .then((data) => {
        // console.log('arrayofCategories: ', data);
      })
      .then((data) => next())
      .catch((e) => next({
        message: `Error with questionsController.categories: ${e}`,
        error: e,
      }));
  },
  // insert query to joined table questions & companies
  // creating relationship between questions and companies (could be multiple companies)
  companies: (req, res, next) => {
    const { companies } = req.body;

    const arrayOfCompanies = companies.map((companyId) => {
      const query = {
        text:
          'INSERT INTO questions_in_companies (question_id, company_id) VALUES ($1, $2)',
        values: [res.locals.question_id, companyId],
      };
      return db.query(query);
    });

    Promise.all(arrayOfCompanies)
      .then((data) => {
        // console.log('arrayOfCompanies', data);
      })
      .then((data) => next())
      .catch((e) => next({
        message: `Error with questionsController.companies: ${e}`,
        error: e,
      }));
  },
};
