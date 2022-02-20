exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
  .then(function () {
    // Inserts seed entries
    return knex('users').insert([
      {
        id: 1,
        name: 'amit',
        email: 'amit@yopmail.com',
        mobile: '7894561230'
      },
      {
        id: 2,
        name: 'aakash',
        email: 'aakash@yopmail.com',
        mobile: '7410852963'
      },
      {
        id: 3,
        name: 'Jai',
        email: 'jai@yopmail.com',
        mobile: '9876543210'
      }
    ]);
  });
};