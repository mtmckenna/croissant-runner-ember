import Ember from 'ember';

// https://www.emberscreencasts.com/posts/84-remember-your-session-with-cookies#code
export default Ember.Service.extend({
  currentUser: null,
  store: Ember.inject.service(),

  logout() {
    this.set('currentUser', null)
    Cookies.remove('userId')
    Cookies.remove('username')
    Cookies.remove('password')
  },

  initializeFromCookie: function() {
    console.log('init');
    let currentUser = null;
    const userId = Cookies.get('userId');
    const username = Cookies.get('username');
    const password = Cookies.get('password');

    if (username && username !=='null') {
      this.loginUserToParse(username, password);
    } else {
      this.createUser();
    }
  }.on('init'),

  setCurrentUser(user) {
    if (!user) { return; }
    Cookies.set('userId', user.get('id'))
    Cookies.set('username', user.get('username'))

    if (user.get('password')) {
      Cookies.set('password', user.get('password'))
    }

    this.set('currentUser', user)
  },

  loginUserToParse(username, password) {
    this.get('store').adapterFor('user').loginUser(username, password).
      then((pushData) => {
        const store = this.get('store');
        store.pushPayload('user', pushData);
        const user = store.peekRecord('user', pushData.objectId);
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
