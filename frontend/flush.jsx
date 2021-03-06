var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;
var Redirect = ReactRouter.Redirect;

// components
var SpotForm = require('./components/spots/SpotsForm');
var SpotShow = require('./components/spots/SpotsShow');
var ReviewForm = require('./components/reviews/ReviewsForm');
var Review = require('./components/reviews/Review');

var SearchIndex= require('./components/home/SearchIndex');
var LandingPage = require('./components/home/LandingPage');
var MapActions = require('./actions/map_actions');

var NavBar = require('./components/nav/Navbar');
var SearchBar = require('./components/nav/Search');
var Home = require('./components/home/Home');
var Footer = require('./components/home/Footer');

var App = React.createClass({
  render: function() {
    return (
        <div>
          <NavBar history={this.props.history} location={this.props.location} />
            {this.props.children}
          <Footer />
        </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/search/:loc" component={SearchIndex} />
    <Redirect path="/search" to="/search/morningside-heights" />
    <Route path="spots/new" component={SpotForm} />
    <Route path="spots/:spotId" component={SpotShow}>
      <Route path="review" components={ReviewForm} />
    </Route>
  </Route>
);

var checkLibStatus = function() {
  if (window.MapsStatus) {
    MapActions.mapsReady();
  } else {
    document.getElementById('map').addEventListener('load', MapActions.mapsReady);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // checkLibStatus();
  var root = document.getElementById('root');
  ReactDOM.render(<Router history={browserHistory}>{routes}</Router>, root);
});
