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
    
    const json = this.load('json')
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

  render() {

    return (
      <div className="App">
        { this.renderToolbar() }
        <div id="workarea">
          { this.renderEditor() }
          { this.renderVisual() }
        </div>
      </div>
    );
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
              this.setState({"visual_state": "graph"})
            }}>
            Visual
          </button>
        </div>
        <div id="toolbar-right">
          <button
            disabled={!hasChange}
            onClick={() => {
              this.setState({"last_loaded_value": this.state.value});
              const json = yaml.safeLoad(this.state.value)
              const savedValue = this.store('json', json)
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
      const label = row['name'];
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

    const json = yaml.safeLoad(this.state.value)
    const projects = json["projects"]
    const rows = this.renderVisualProjects(projects)

    console.log("projects", projects);

    return (
      <div className="visual">
        { rows }
      </div>
    )
  }
}

export default App;
