import React, { Component } from 'react';
import './Article.scss';
import Showdown from 'showdown';
import MaterialIcon from '@material/react-material-icon';
import EndpointModal from '../../EndpointModal/EndpointModal';

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
	focusedEndpoint: number,
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
			focusedEndpoint: -1,
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
	
	closeEndpoint = () => {
		this.setState({
			focusedEndpoint: -1
		});
	}
	openEndpoint(endpointId: number) {
		this.setState({
			focusedEndpoint: endpointId
		});
		return false;
	}

    render() {
        if (this.state.ready === true) {
			
			const convertor = new Showdown.Converter();
            return (
                <header className="App-header">
					<h1>{this.state.title}</h1>
					<div dangerouslySetInnerHTML={{ __html: convertor.makeHtml(this.state.description) }}></div>

					{this.state.endpoints.map( (endpoint, ind) => {
						return (
							<div key={ind}>
								<EndpointModal closeCb={this.closeEndpoint} show={(this.state.focusedEndpoint === ind ? true : false)} endpoint={endpoint}></EndpointModal>
								<div key={ind} className="endpoint">
									<div className="endpointPath" onClick={this.openEndpoint.bind(this,ind)}>
										<div className="endpointMethod">{endpoint.method}</div>
										{endpoint.url}
									</div>
									<div className="endpointDescription" dangerouslySetInnerHTML={{ __html: convertor.makeHtml(endpoint.description) }} ></div>
								</div>
							</div>
						);
					})}
                </header>
            );
        } else {
            return (
                <header className="App-header">
                    Just searching for that... please wait!
                </header>
            );
        }
    }
}

export default Article;
