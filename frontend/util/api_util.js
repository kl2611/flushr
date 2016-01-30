var UserActions = require('../actions/user_actions');

var ApiUtil = {
    fetchUser: function(userId) {
        $.ajax({
            url: "api/users/" + userId,
            data: userId,
            success: function(user) {
                UserActions.receiveCurrentUser(user);
            }
        })
    },

    destroySession: function(id) {
        $ajax({
            url: "/session",
            type: "DELETE",
            data: id,
            success: function () {
                window.location = "/";
            }
        });
    }
};

module.exports = ApiUtil;
