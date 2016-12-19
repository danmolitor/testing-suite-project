const assert = require('assert');
const User = require('../src/users');

describe('Validating records',  () => {
  it('requires a user name', () => {
    let user = new User({ name: undefined });
    let validationResult = user.validateSync();
    let message = validationResult.errors.name.message;
    assert(message === "Name is required.");
  });

  it('requires a user\'s name longer than 2 characters', function () {
    let user = new User({ name: 'Al'});
    let validationResult = user.validateSync();
    let message = validationResult.errors.name.message;

    assert(message === 'Name must be longer than 2 characters.');
  });

  it('disallows invalid records from being saved', (done) => {
    let user = new User({ name: 'Al'});
    user.save()
      .catch((validationResult) => {
        let message = validationResult.errors.name.message;
        assert(message === 'Name must be longer than 2 characters.');
        done();
      })
  });
});