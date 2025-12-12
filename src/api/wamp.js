// takes an array of data and create a unique options array of object (label / value) for use in the crud table
import Vue from 'vue'
export default {
  subscribe (channel, callback) {
    Vue.Wamp.subscribe(channel, function (args, kwArgs, details) {
      callback(kwArgs)
    }, {
      acknowledge: true // option needed for promise, automatically added
    }).then(function (subscription) {
      console.warn('Subscribing', channel)
      this.wampSubscription = subscription
    })
  },
  publish (channel, payload, selfPublish) {
    console.warn('Publishing', channel)
    Vue.Wamp.publish(channel, [], payload, { exclude_me: !selfPublish })
  }
}
