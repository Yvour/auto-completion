import React from 'react';
import ReactDOM from 'react-dom';
import AutoCompletion from './AutoCompletion';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(AutoCompletion),
    document.getElementById('auto-completion')
  );
});
