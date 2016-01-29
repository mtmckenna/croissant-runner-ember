import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

moduleForComponent('sorted-scores', 'Integration | Component | sorted scores', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(3);

  this.set('scores', [
    {createdAt: moment().subtract(3, 'days').toDate(), score: 3},
    {createdAt: moment().subtract(1, 'days').toDate(), score: 1},
    {createdAt: moment().subtract(2, 'days').toDate(), score: 2},
  ]);

  this.render(hbs`{{sorted-scores scores=scores}}`);

  var oldestScore = this.$().find('.js-score')[2].innerText;
  var middleScore = this.$().find('.js-score')[1].innerText;
  var newestScore = this.$().find('.js-score')[0].innerText;

  assert.equal(oldestScore, '3');
  assert.equal(middleScore, '2');
  assert.equal(newestScore, '1');
});
