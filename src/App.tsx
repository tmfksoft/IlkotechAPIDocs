import React, { Component } from 'react';

import './App.scss';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Section from './Pages/Section/Section';
import Article from './Pages/Article/Article';

import Request from 'request-promise';
import { NavLink } from 'react-router-dom';
import MaterialIcon from '@material/react-material-icon';

import {
	BrowserView,
	MobileView,
	isBrowser,
	isMobile
  } from "react-device-detect";

import { Switch, Route} from 'react-router-dom';

export interface IAppState {
	categories: any[],
	showSidebar: boolean,
}

class App extends Component<{}, IAppState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			categories: [],
			showSidebar: !isMobile,
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
		if (!this.state.showSidebar) return <></>;
		return (
			<div className="sidebar">
				<Header></Header>
				<div className="sidebarContent">
					{this.state.categories.map( c => {
						return <div key={c.slug} className="category">
							<div className="categoryTitle">{c.title}</div>
							{c.sections.map( (s: any) => {
								return <NavLink exact key={s.slug} to={`/${c.slug}/${s.slug}`} className="section" activeClassName="section__active">{s.title}</NavLink>;
							})}
						</div>;
					})}
				</div>
				<Footer></Footer>
			</div>
		);
	}

	toggleSidebar = ()=>{
		this.setState({
			showSidebar: !this.state.showSidebar,
		});
	}

	render() {
		return (
			<div className="App">
				{this.getSidebar()}
				{isMobile &&
					<div className="sidebarToggle">
						<MaterialIcon icon="menu" onClick={this.toggleSidebar} className="toggleButton"></MaterialIcon>
					</div>
				}
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
