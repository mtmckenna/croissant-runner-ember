export default function(){
  this.transition(
    this.toRoute('play'),
    this.fromRoute('index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.toRoute('play.menu'),
    this.fromRoute('play.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.toRoute('play.menu.hi-scores'),
    this.fromRoute('play.menu.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.toRoute('play.menu.initials'),
    this.fromRoute('play.menu.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.toRoute('index'),
    this.fromRoute('play.menu'),
    this.use('toRight')
  );
}
