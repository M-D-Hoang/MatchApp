import DB from '../db/db.js';

const users = [
  {
    name: 'Bob',
    comments: [
      { text: 'hello', time: '2024-01-19T12:30:00' },
      { text: 'bye', time: '2024-01-19T13:45:00' }
    ],
    picture: 'uri-to-picture'
  },
  {
    name: 'Alice',
    comments: [
      { text: 'comment', time: '2024-01-19T14:15:00' }
    ],
    picture: ''
  }
];

(async () => {
  let db;
  try {
    db = new DB();
    users.forEach(async (user) => {
      console.log(`inserting ${user.name}`);
      await db.createUser(user);
    });
    console.log(`Inserted ${users.length} user rows`);

    const response = await db.readAllUsers();
    console.log(response);
  } catch (e) {
    console.error('could not seed rip :(');
    console.dir(e);
  } finally {
    process.exit();
  }
})();