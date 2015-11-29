import Ember from 'ember';

// https://www.emberscreencasts.com/posts/84-remember-your-session-with-cookies#code
export default Ember.Service.extend({
  currentUser: null,
  store: Ember.inject.service(),

  logout() {
    this.set('currentUser', null)
    Cookies.remove('userId')
    Cookies.remove('password')
  },

  initializeFromCookie: function() {
    let currentUser = null;
    var userId = Cookies.get('userId');

    if (userId && userId !=='null') {
      this.getUserFromParse(userId);
    } else {
      this.createUser();
    }
  }.on('init'),

  setCurrentUser(user) {
    if (!user) { return; }
    Cookies.set('userId', user.get('id'))
    Cookies.set('password', user.get('password'))
    this.set('currentUser', user)
  },

  getUserFromParse(userId) {
    this.get('store').findRecord('user', userId).then((user) => {
      this.setCurrentUser(user);
    });
  },

  createUser() {
    let user = this.get('store').createRecord('user', {
      username: this.newGuid(),
      level: '1',
      password: this.newGuid()
    });

    user.save();
    user.on('didCreate', () => {
      this.setCurrentUser(user);
    });

    return user;
  },

  // http://guid.us/GUID/JavaScript
  newGuid() {
    return (this.s4() + this.s4() + "-" + this.s4() + "-4" + this.s4().substr(0,3) + "-" + this.s4() + "-" + this.s4() + this.s4() + this.s4()).toLowerCase();
  },

  s4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }
});
