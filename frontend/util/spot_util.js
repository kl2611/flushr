var SpotActions = require('../actions/spot_actions.js');
var FilterParamsStore = require('../stores/filter_params');

var SpotUtil = {
    fetchSpots: function() {
        var filter = FilterParamsStore.params();
        $.get('api/spots', filter, function(spots){
          SpotActions.receiveAllSpots(spots);
        });
    },

    updateSingleSpot: function(id){
        $.ajax({
            url: 'api/spots/' + id,
            success: function(spot) {
                SpotActions.updateSingleSpot(spot);
            }
        });
    },

    fetchSingleSpot: function(id) {
        $.ajax({
            url: 'api/spots/' + id,
            success: function(spot) {
                SpotActions.receiveSingleSpot(spot);
            }
        });
    },

    createSpot: function(data){
        $.post('api/spots', { spot: data }, function(spot) {
            SpotActions.receiveAllSpots([spot]);
        });
    },

    createReview: function(data) {
        $.post('api/reviews', { review: data }, function (spot) {
            SpotActions.receiveAllSpots([spot]);
        });
  }
};

module.exports = SpotUtil;
