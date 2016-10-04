
var React = require('react');
import { Router } from 'react-router';
import { push } from 'react-router-redux';
import { hashHistory } from 'react-router'


//creates a stateful component named 'List'
var Header = React.createClass({
    getInitialState: function() {
        return {
            welcome: 'Welcome to LocalSpot!',
            name: '',
            hide:false,
            show:false
        };
    },
    onAddInputChanged: function(event) {
        this.setState({
            name: event.target.value
            });
    },
    //button clicking callback function, contains all the logic for updating the state
    onAddSubmit: function(event) {
        var name = this.state.name.trim();
        event.preventDefault();
            this.setState({
                welcome: "Welcome " + name + ". Here's your local events!",
                hide: !this.state.hide,
                show: !this.state.show,
            });
            //hashHistory.push('/events');
    },
    render: function (){
        return (
            <div className="header">

            <h2>{this.state.welcome}</h2>

                <div className={'hide-' + this.state.hide}>
                <p>LocalSpot - the place for fun, local events.  Enter your name below, and 'allow' the browser
                to find your current location.  We'll pick a list of cool events near you and map them for you.</p>

                 <form onSubmit={this.onAddSubmit}>
                 <input type="text" value={this.state.name} placeholder="your name" onChange={this.onAddInputChanged} />

                 <input type="submit" value="Go" />

                 </form>
                 </div>

                 <div className={'show-' + this.state.show}>

                 </div>

            </div>

        );
    }
});

module.exports = Header;
