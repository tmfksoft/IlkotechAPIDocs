import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.scss';

export interface IArticleProps {
	categories: any[],
	categorySlug: string,
	articleSlug: string,
}
export interface IArticleState {
	ready: boolean,
    title: string,
    description: string,
    slug: string,
    endpoints: any[],
}

class Article extends Component<IArticleProps, IArticleState> {

    constructor( props: IArticleProps) {
		super(props);
		this.state = {
			ready: false,
			title: '',
			description: '',
			slug: '',
			endpoints: [],
		};
    }
    
	public componentWillReceiveProps(nextProps: IArticleProps) {
		console.log("got dem props", nextProps.categories);
        if (nextProps.categories.length > 0) {
            let catSlug = this.props.categorySlug;
			let sectionSlug = this.props.articleSlug;
			
			console.log(`Traversing categories looking for ${catSlug}/${sectionSlug}`);

            for (let c of nextProps.categories) {
                if (c.slug.toLowerCase() === catSlug) {
                    for (let s of c.sections) {
                        if (s.slug.toLowerCase() === sectionSlug) {
							console.log("Found Article Content");
                            this.setState({
								ready: true,
								title: s.title,
								description: s.description,
								slug: s.slug,
								endpoints: s.endpoints,
							});
							break;
                        }
                    }
                    break;
                }
            }

        }
    }

    render() {
        if (this.state.ready === true) {
            return (
                <header className="App-header">
                    {this.state.title}
                </header>
            );
        } else {
            return (
                <header className="App-header">
                    Let me just get that for you...
                </header>
            );
        }
    }
}

export default Article;
