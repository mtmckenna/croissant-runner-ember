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

  this.transition(
    this.fromRoute('play.menu'),
    this.toRoute('index'),
    this.use('toRight')
  );

  this.transition(
    this.fromRoute('play.menu.index'),
    this.toRoute(function(routeName){ return /^play\.menu/.test(routeName); }),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}
