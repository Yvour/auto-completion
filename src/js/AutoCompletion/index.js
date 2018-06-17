import React from 'react';
import "./styles.css";

const NO_RESULTS = [];
const SEND_INTERVAL = 5000;


class AutoCompletion extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0
      , lastSent: (new Date()).valueOf()
      , results: NO_RESULTS
      , search: "",

    };
  }

  getSearchResult() {
    const search = this.state.search;
    const timeDifference = (new Date()).valueOf() - this.state.lastSent
    if (timeDifference > SEND_INTERVAL) {
      this.setState(Object.assign(this.state, {
        lastSent: (new Date()).valueOf()
      }));
      fetch(`query/${search}`)

        .then(response => response.json())
        .then(result => {

          this.setState(Object.assign(this.state, {
            results: result
          }));
        })
    } else
      setTimeout(this.getSearchResult.bind(this), SEND_INTERVAL - timeDifference)
  }

  renderSearchInput() {
    return <input onChange = {
            e => {
              const value = e.target.value;
              this.setState(Object.assign(this.state, {
                 search: value,
                 results: (value && value.length ? this.state.results : NO_RESULTS)
                }));
              if (value && value.length){
              this.getSearchResult();
              }
              
            }
          }
          />;
  }


  renderSearchResult() {
    const arr = this.state.results || NO_RESULTS;

    if (!Array.isArray(arr)) return null
    else return (<div className="search-result-container">
{arr.map((x, i) =>
        (<div key={i} className = "search-result-item" > {x} </div>))}
    </div>);
  }


  render() {
    return (<div>
            {this.renderSearchInput()}
    {this.renderSearchResult()}
   </div>);
  }
}
export default AutoCompletion;
