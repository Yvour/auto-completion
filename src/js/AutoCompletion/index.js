import React from 'react';
import  "./styles.css";

const NO_RESULTS = [];


class AutoCompletion extends React.Component {
    constructor() {
      super();
      this.state = {
        count: 0,
        lastSend: (new Date()).valueOf(),
        results: NO_RESULTS
      };
    }

    getSearchResult(search) {
      fetch(`query/${search}`)
        
      .then(response=>response.json())
      .then(result => {
        console.log(result);
   console.log(this.state);
console.log('setting state');
        this.setState(Object.assign(this.state, {
          results: result
        }));
      })

    }


    renderSearchResult(arr) {
console.log('render');
console.log(arr);
      if (!Array.isArray(arr)) return null
      else return (<div className="search-result-container">
{arr.map((x, i) =>
        (<div key={i} className = "search-result-item" > {x} </div>))}
    </div>
);
      }


      render() {
        return ( <div onClick = {
            () => {
              this.setState({
                count: this.state.count + 1
              });
            }
          } >
          AutoComplete: {   this.state.count     } 
            <input onChange = {
            e => {
              const value = e.target.value
              if (value && value.length)
              this.getSearchResult(e.target.value);
              else this.setState(Object.assign(this.state, {results: NO_RESULTS}))
            }
          }
          />
    {this.renderSearchResult(this.state.results)}
   </div>
        );
      }
    }
    export default AutoCompletion;
