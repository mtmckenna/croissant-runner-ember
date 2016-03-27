import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
   initials: function() {
     return faker.hacker.abbreviation().substring(0,3).toUpperCase();
   },

   score: function() {
     return faker.random.number({
       'min': 10,
       'max': 1000
     });
   },

   "created-at": function() {
     return faker.date.past();
   }
});
