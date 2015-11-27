import Ember from 'ember';

export default function(){
  this.transition(
    this.matchSelector('.ember-full-screen-view'),
    this.use('toLeft'),
    this.reverse('toRight'),
    this.debug()
  );
}
