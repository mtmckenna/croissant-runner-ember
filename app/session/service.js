import Ember from 'ember';

// https://www.emberscreencasts.com/posts/84-remember-your-session-with-cookies#code
export default Ember.Service.extend({
  currentUser: null,
  store: Ember.inject.service(),
  initialized: false,

  logout() {
    this.set('currentUser', null)
    Cookies.remove('userId')
    Cookies.remove('username')
    Cookies.remove('password')
  },

  initializeFromCookie: function() {
    if (this.get('initialized')) { return; }
    this.set('initialized', true);
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
    const modelClass = 'user';
    const store = this.get('store');
    store.adapterFor(modelClass).loginUser(username, password).
      then((data) => {
        var serializer = store.serializerFor(modelClass);
        var json = serializer.normalizeSingleResponse(store, modelClass, data, data.id);
        store.push(json);

        const user = store.peekRecord('user', json.data.id);
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
