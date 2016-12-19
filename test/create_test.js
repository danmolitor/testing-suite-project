const assert = require('assert');
const User = require('../src/users');

describe('Creating records', () => {
  it('saves a user', (done) => {
    let dan = new User({ name: 'Dan' });


    dan.save()
      .then(() => {
        // Has dan been saved successfully?
        assert(!dan.isNew);
        done();
      });
  });
});