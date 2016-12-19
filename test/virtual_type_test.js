const assert = require('assert');
const User = require('../src/users');

describe('Virtual types', function () {
  it('postCount returns number of posts', function (done) {
    let joe = new User({
      name: 'Joe',
      posts: [{ title: 'PostTitle' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.postCount === 1);
        done();
      });
  });
});