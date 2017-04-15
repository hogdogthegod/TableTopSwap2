import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div className="HogDog">
        {this.props.text}
      </div>
    );
  }
}

About.propTypes = {
  text: React.PropTypes.string.isRequired
};

export default About;