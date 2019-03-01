import React, { Component } from 'react';

import './App.scss';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Section from './Pages/Section/Section';
import Article from './Pages/Article/Article';

import Request from 'request-promise';
import { NavLink } from 'react-router-dom';

import { Switch, Route} from 'react-router-dom';

class App extends Component<{}, { categories: any[] }> {
	constructor(props: {}) {
		super(props);
		this.state = {
			categories: [],
		};
	}

	async componentDidMount() {
		try {
			const docs = await Request({
				uri: "https://accounts.ilkotech.co.uk/api/v2/docs",
				json: true,
			});
			console.log("I dun got meself some categories");
			this.setState({
				categories: docs.categories
			});
		} catch (e) {
			
		}
	}

	getDefaultArticle = (props: any): JSX.Element => {
		return <Article categories={this.state.categories} categorySlug="general" articleSlug="intro"></Article>;
	}
	getArticle = (props: any): JSX.Element => {
		console.log(props);
		return <Article categories={this.state.categories} categorySlug={props.match.params.category} articleSlug={props.match.params.section} ></Article>;
	}
	getSection = (props: any): JSX.Element => {
		return <Section categories={this.state.categories}></Section>
	}

	getSidebar = () => {
		return <div className="sidebarContent">
			{this.state.categories.map( c => {
				return <div key={c.slug} className="category">
					<div className="categoryTitle">{c.title}</div>
					{c.sections.map( (s: any) => {
						return <NavLink exact key={s.slug} to={`/${c.slug}/${s.slug}`} className="section">{s.title}</NavLink>;
					})}
				</div>;
			})}
		</div>;
	}

	render() {
		return (
			<div className="App">
				<div className="sidebar">
					<Header></Header>
					{this.getSidebar()}
					<Footer></Footer>
				</div>
				<div className="article">
					<Switch>
						<Route exact={true} path="/" render={this.getDefaultArticle} />
						<Route exact={true} path="/:category" component={this.getSection} />
						<Route exact={true} path="/:category/:section" component={this.getArticle} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default App;
