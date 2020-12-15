import React, { Component } from 'react';
import Gantt from './components/Gantt';
import Toolbar from './components/Toolbar';
import MessageArea from './components/MessageArea';
import './App.css';

const data = {
  data: [
    { id: 1, text: 'Task #1', start_date: '2020-02-12', duration: 3, progress: 0.6 },
    { id: 2, text: 'Task #2', start_date: '2020-02-17', duration: 4, progress: 0.2 },
    { id: 3, text: 'Task #3', start_date: '2020-02-18', duration: 5, progress: 0.3 },
    { id: 4, text: 'Task #4', start_date: '2020-02-19', duration: 6, progress: 0.6 },
    { id: 5, text: 'Task #5', start_date: '2020-02-20', duration: 7, progress: 0.8 },
  ],
  links: [
    { id: 1, source: 1, target: 2, type: '0' }
  ]
};
class App extends Component {
  state = {
    currentZoom: 'Days',
    messages: []
  };

  addMessage(message) {
    const maxLogLength = 5;
    const newMessate = { message };
    const messages = [
      newMessate,
      ...this.state.messages
    ];

    if (messages.length > maxLogLength) {
      messages.length = maxLogLength;
    }
    this.setState({ messages });
  }

  logDataUpdate = (type, action, item, id) => {
    let text = item && item.text ? ` (${item.text})` : '';
    let message = `${type} ${action}: ${id} ${text}`;
    if (type === 'link' && action !== 'delete') {
      message += ` ( source: ${item.source}, target: ${item.target} )`;
    }
    this.addMessage(message);
  }

  handleZoomChange = (zoom) => {
    this.setState({
      currentZoom: zoom
    });
  }

  render() {
    const { currentZoom, messages } = this.state;
    return (
      <div>
        <div className="zoom-bar">
          <Toolbar
            zoom={currentZoom}
            onZoomChange={this.handleZoomChange}
          />
        </div>
        <div className="gantt-container">
          <Gantt
            tasks={data}
            zoom={currentZoom}
            onDataUpdated={this.logDataUpdate}
          />
        </div>
        <MessageArea
          messages={messages}
        />
      </div>
    );
  }
}

export default App;

