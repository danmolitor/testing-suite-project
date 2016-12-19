const assert = require('assert');
const User = require('../src/users');

describe('Subdocuments', () => {
  it('can create a subdocument', (done) => {
    let joe = new User({
      name: 'Joe',
      posts: [{ title: 'PostTitle' }]
    });

    joe.save()
      .then(() => { User.findOne({ name: 'Joe' })
        .then((user) => {
          assert(user.posts[0].title === 'PostTitle');
          done();
        })
      })

  });

  it('Can add subdocuments to an existing record', (done) => {
    let joe = new User({
      name: 'Joe',
      posts: []
    });

    joe.save()
      .then(() => { User.findOne({ name: 'Joe' })
      .then((user) => {
        user.posts.push({ title: 'New Post'});
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'New Post');
        done();
      });
    });
  });

  it('can remove an existing subdocument', (done) =>  {
    let joe = new User({
      name: 'Joe',
      posts: [{ title: 'New Title'}]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({name: 'Joe' }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      })
  });

});