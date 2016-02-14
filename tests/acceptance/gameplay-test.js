import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'croissant-runner-ember/tests/helpers/start-app';

module('Acceptance | gameplay', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('touching pizzas means points', function(assert) {
  visit('/play/1');

  andThen(function() {
    assert.equal(currentURL(), '/play/1');

    var pizzaCount = parseInt($('.js-pizza-count').text());
    assert.equal(pizzaCount, 0);

    spewPizzasLikeCrazy();

    var done = assert.async();
    Ember.run.later(function() {
      pizzaCount = parseInt($('.js-pizza-count').text());
      assert.ok(pizzaCount > 0);
      done();
    }, 3000);
  });
});
