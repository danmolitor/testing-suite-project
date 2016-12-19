const assert = require('assert');
const User = require('../src/users');

describe('Reading users out of the database', function () {

  let joe, dan, jeff, zach;

  beforeEach((done) => {
    dan = new User({ name: 'Dan' });
    jeff = new User({ name: 'Jeff' });
    joe = new User({ name: 'Joe' });
    zach = new User({ name: 'Zach' });

    Promise.all([joe.save(), dan.save(), jeff.save(), zach.save()])
      .then(() => done());
  });

  it('finds all users with a name of joe', (done) => {
    User.find({ name: 'Joe' })
      .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
  });

  it('find a user with a particular id', (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user.name === 'Joe');
        done();
      });
  });

  it('can skip and limit the result set ', (done) => {
    User.find({})
      .sort({
        name: 1
      })
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === 'Jeff');
        assert(users[1].name === 'Joe');
        done();
      });
  });
});