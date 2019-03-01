import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import '../../App.scss';
import Request from 'request-promise';
import './Section.scss';

class Section extends Component<{ categories: any[] }, { google: any, ready: boolean }> {
    constructor(props: { categories: any[] }) {
        super(props);
    
        this.state = {
            ready: false,
            google: "i no here",
        };
    }

  render() {
      console.log("HI");
      
    return (
        <header className="App-header">
            <Helmet>
                <title>Some Website | About</title>
            </Helmet>
            {this.getArticle()}
        
        </header>
    );
  }

  getArticle() {
    if (this.state.ready) {
        return (
            <div>
                <div className="article-title">
                    <div className="author">
                        <div className="avatar">
                            <img src={this.state.google.user.avatar}/>
                        </div>
                        <div className="username">{this.state.google.user.username}</div>
                    </div>
                    {this.state.google.title}
                </div>
                <div className="article" dangerouslySetInnerHTML={{ __html : this.state.google.body}}></div>
            </div>
        );
    } else {
        return ( <strong>I'm busy.. okay!</strong> );
    }
  }
  async componentDidMount() {
    try {
        const Google = await Request({
            uri: "https://control.streamjar.tv/api/v2/help/articles/19",
            json: true,
        });
        this.setState({
            google: Google,
            ready: true,
        });
    } catch (e) {
        // Do nothing
    }
  }
}

export default Section;
