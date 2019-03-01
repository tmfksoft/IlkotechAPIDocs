import React, { Component } from 'react';
import './EndpointModal.scss';
import Showdown from 'showdown';
export interface IArticleProps {
    show: boolean,
    closeCb: any,
    endpoint: any,
}
export interface IArticleState {
	ready: boolean,
    title: string,
    description: string,
    slug: string,
    endpoints: any[],
}
class EndpointModal extends Component<IArticleProps, IArticleState> {

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
		
    }

    render() {
        if (this.props.show) {
            return (
                <div className="modalBackground">
                    <div className="modal">
                        <div className="modalHeader">
                            <div className="endpointMethod">{this.props.endpoint.method}</div>
                            <div className="endpointSecure"></div>
                            <div className="endpointPath">{( this.props.endpoint.secure===true ? 'https' : 'http' )}://accounts.ilkotech.co.uk/{this.props.endpoint.url}</div>
                            <div className="modalClose"  onClick={this.props.closeCb}>Close</div>
                        </div>
                        <div className="modalContent">
                            <div className="endpointParams"></div>
                            <div className="endpointResponses"></div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <></>;
        }
    }
}

export default EndpointModal;