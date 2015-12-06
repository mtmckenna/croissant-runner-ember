import Ember from 'ember';

export default Ember.Route.extend({
  game: Ember.inject.service(),

  titleToken: function(model) {
    return `Level ${model}`;
  },

  model(params) {
    return parseInt(params.level_id);
  },

  afterModel(level) {
    const game = this.get('game');
    game.changeLevel(level);
  }
});
