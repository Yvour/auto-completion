import React from 'react';

/**
 * A counter button: tap the button to increase the count.
 */
class AutoCompletion extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <div
        onClick={() => {
          this.setState({ count: this.state.count + 1 });
        }}
      >
        AutoComplete: {this.state.count}
      </div>
    );
  }
}
export default AutoCompletion;
