import Ember from 'ember';

export default function(){
  this.transition(
    this.fromRoute('index'),
    this.toRoute('play'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('play.index'),
    this.toRoute('play.menu'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}
