var React = require('react');
var SessionActions = require('../../actions/session_actions');

var AccountButtons = React.createClass({
    handleLogOut: function(e) {
        e.preventDefault();
        this.props.history.pushState(null, '/');
        SessionActions.logOut();
    },

    render: function() {
        return (
          <ul className='nav navbar-nav navbar-right'>
            <li className='dropdown'>
              <a
                 className='dropdown-toggle'
                 data-toggle='dropdown'
                 role='button'
                 aria-haspopup='true'
                 aria-expanded='false'
                 style={hasProfilePic ? {paddingTop:"5px", paddingBottom:"5px"} : {}}>
                  {userProfile.fname + " "}
                  {hasProfilePic ? (<img
                    className="img-circle"
                    width="35px"
                    height="35px"
                    src={profilePicUrl} />) : ""}
                <span className='caret'></span>
              </a>
              <ul className='dropdown-menu'>
                <li><a href="#/trips/">Your Trips</a></li>
                <li role="separator" className="divider"></li>
                <li onClick={this.handleLogOut}><a href="#">
                  <span className="glyphicon glyphicon-log-out" /> Log Out
                </a></li>
              </ul>
            </li>
          </ul>
        );
    }

});
