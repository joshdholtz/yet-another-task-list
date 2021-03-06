import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import _ from 'lodash';
import yaml from 'js-yaml';

import { Controlled as CodeMirror } from 'react-codemirror2';
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/yaml/yaml.js');

class App extends Component {
  constructor(props) {
    super(props)
    
    let json = this.load('json')
    if (!json) {
      json = JSON.parse('{"projects":{"project 1":[{"task":"task 1"},{"name":"task 2","subtasks":[{"name":"subtask 1"},{"name":"tsubtask 2"}]}],"project 2":[{"name":"task 1","priority":3},{"name":"task 2","priority":3,"subtasks":[{"name":"subtask 1","priority":5,"effort":5},{"name":"tsubtask 2","priority":1,"effort":1,"complete":true}]}]}}')
    }

    const value = yaml.safeDump (json)
    
    this.state = {
      "last_loaded_value": value,
      "value": value,
      "visual_state": "editor"
    }

  }

  store(key, data) {
    return window.localStorage.setItem(key, JSON.stringify(data))
  }

  load(key) {
    var data = window.localStorage.getItem(key)
    return JSON.parse(data)
  }

  isEditor() {
    return this.state.visual_state === "editor"
  }

  jsonTheYaml() {
    let json = null;
    try {
      json = yaml.safeLoad(this.state.value)
      this.setState({error: null, errorHide: false, json: json})
    } catch (error) {
      this.setState({error: error.toString(), errorHide: false})
      return null
    }
  }

  render() {
    return (
      <div className="App">
        { this.renderToolbar() }
        <div id="workarea">
          { this.renderError() }
          { this.renderEditor() }
          { this.renderVisual() }
        </div>
      </div>
    );
  }

  renderError() {
    if (!this.state.error || this.state.errorHide) {
      return null
    }

    return (
      <div className="error">
        <div className="error-message">
          { this.state.error }
        </div>
        <button onClick={() => {
          this.setState({errorHide: true}) 
          }}>X</button>
      </div>
    )
  }

  renderToolbar() {
    const hasChange = this.state.value !== this.state.last_loaded_value

    return (
      <div id="toolbar">
        <div id="toolbar-left">
          <button
            disabled={this.isEditor()}
            onClick={() => {
              this.setState({"visual_state": "editor"})
            }}>
            Editor
          </button>
          <button
            disabled={!this.isEditor()}
            onClick={() => {
              this.jsonTheYaml()
              this.setState({"visual_state": "graph"})
            }}>
            Visual
          </button>
        </div>
        <div id="toolbar-right">
          <button
            disabled={!hasChange}
            onClick={() => {
              this.jsonTheYaml()

              if (this.state.json) {
                this.setState({"last_loaded_value": this.state.value});
                const savedValue = this.store('json', this.state.json)
              }
            }}>
            Save
          </button>
        </div>
      </div>
    )
  }

  renderEditor() {
    if (!this.isEditor()) {
      return null;
    }

    const options = {
      mode: 'yaml',
      theme: 'material',
      lineNumbers: true,
      height: 'auto'
    }

    return (
      <CodeMirror
        value={this.state.value}
        options={options}
        onBeforeChange={(editor, data, value) => {
          this.setState({value})
        }}
        onChange={(editor, data, value) => {

        }}
      />
    )
  }

  renderVisualRows(rows) {
    return _.map(rows, (row) => {
      const label = row['task'];
      const subtasks = row['subtasks'] || [];
      const effort = row['effort'] || 1;
      const priority = row['priority'] || 1;
      const completed = row['completed'] || false;

      let subRows = null
      if (subtasks.length > 0) {
        subRows = this.renderVisualRows(subtasks);
      }

      let opacity = 0.3
      switch (priority) {
        case 1:
          opacity = 0.4
          break;
        case 2:
          opacity = 0.5
          break;
        case 3:
          opacity = 0.6
          break;
        case 4:
          opacity = 0.8
          break;
        case 5:
          opacity = 1.0
          break;
        default:
          opacity = 0.3
          break;
      }

      let vertPadding = 5
      switch (effort) {
        case 1:
          vertPadding = 5
          break;
        case 2:
          vertPadding = 10
          break;
        case 3:
          vertPadding = 20
          break;
        case 4:
          vertPadding = 30
          break;
        case 5:
          vertPadding = 40
          break;
        default:
          vertPadding = 5
          break;
      }

      let textDecoration = ""
      if (completed) {
        textDecoration = "line-through"
      }

      const style = {
        opacity: opacity,
        padding: `${vertPadding}px 10px`,
        textDecoration: textDecoration
      }

      return (
        <div className="visual-row" key={label}>
          <div className="visual-row-label" style={style}>
            { label }
          </div>
          <div className="visual-row-content">
            { subRows }
          </div>
        </div>
        )
    });
  }

  renderVisualProjects(projects) {
    const rows = _.transform(projects, (result, value, key) => {
      const subRows = this.renderVisualRows(value)

      const el = (
        <div className="visual-row" key={key}>
          <div className="visual-row-label">
            { key }
          </div>
          <div className="visual-row-content">
            { subRows }
          </div>
        </div>
        )
      result.push(el)
    }, []);

    return rows
  }

  renderVisual() {
    if (this.isEditor()) {
      return null;
    }
    if (this.state.error) {
      return null
    }

    const json = this.state.json
    const projects = json["projects"]
    const rows = this.renderVisualProjects(projects)

    return (
      <div className="visual">
        { rows }
      </div>
    )
  }
}

export default App;
