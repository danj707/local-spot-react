var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;
var Link = router.Link;

var Layout = require('./components/Layout');
var Events = require('./components/Events');
var GoogleMap = require('./components/GoogleMap');

var routes = (
    <Router history={hashHistory}>
      <Route path="/" component={Layout} />
    </Router>
);

//Doc listener and React renderer
document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(routes, document.getElementById('app'));
});
