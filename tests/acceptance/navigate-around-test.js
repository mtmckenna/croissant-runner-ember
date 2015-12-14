import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'croissant-runner-ember/tests/helpers/start-app';

module('Acceptance | navigate around', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('menu pages are navigable', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentPath(), 'index');
    click('a:contains("PLAY!")');

    andThen(function() {
      assert.equal(currentPath(), 'play.index');
      assert.equal(currentURL(), '/play/1');

      click('.play--menu-button__link');

      andThen(function() {
        assert.equal(currentPath(), 'play.menu.index');

        click('a:contains("HI SCORES")');

        andThen(function() {
          assert.equal(currentPath(), 'play.menu.hi-scores');

          click('a:contains("BACK")');

          andThen(function() {
            assert.equal(currentPath(), 'play.menu.index');

            click('a:contains("INITIALS")');

            andThen(function() {
              assert.equal(currentPath(), 'play.menu.initials');

              click('a:contains("BACK")');

              andThen(function() {
                assert.equal(currentPath(), 'play.menu.index');

                click('a:contains("PLAY")');

                andThen(function() {
                  assert.equal(currentPath(), 'play.index');
                  click('.play--menu-button__link');

                  andThen(function() {
                    assert.equal(currentPath(), 'play.menu.index');
                    click('a:contains("HOME")');

                    andThen(function() {
                      assert.equal(currentPath(), 'index');
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
