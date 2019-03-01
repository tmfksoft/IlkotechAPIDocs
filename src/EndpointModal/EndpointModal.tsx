import React, { Component } from 'react';
import './EndpointModal.scss';
import Showdown from 'showdown';
import Highlight from 'react-highlight';

export interface IArticleProps {
    show: boolean,
    closeCb: any,
    endpoint: any,
}
export interface IArticleState {
    focusedResponse: string,
    focusedParameter: string,
}
class EndpointModal extends Component<IArticleProps, IArticleState> {

    constructor( props: IArticleProps) {
		super(props);
		this.state = {
            focusedResponse: '',
            focusedParameter: '',
		};
    }
    
	public componentWillReceiveProps(nextProps: IArticleProps) {
		this.setState({
            focusedResponse: this.props.endpoint.responses[0].code,
            focusedParameter: Object.keys(this.props.endpoint.params)[0],
        });
    }

    focusCode(code: string) {
        this.setState({
            focusedResponse: code
        });
    }
    focusParameter(param: string) {
        this.setState({
            focusedParameter: param
        });
    }

    render() {
        if (this.props.show) {
            return (
                <div className="modalBackground">
                    <div className="modal">
                        <div className="modalHeader">
                            <div className="endpointMethod">{this.props.endpoint.method}</div>
                            <div className="endpointSecure"></div>
                            <div className="endpointPath">{( this.props.endpoint.secure===true ? 'https' : 'http' )}://accounts.ilkotech.co.uk/<strong>{this.props.endpoint.url}</strong></div>
                            <div className="modalClose"  onClick={this.props.closeCb}>Close</div>
                        </div>
                        <div className="modalContent">
                            <div className="endpointParams">
                                {Object.keys(this.props.endpoint.params).map( (param: string, ind:number) => {
                                    return (
                                        <div key={ind} className={(this.state.focusedParameter === param ? 'paramName paramName__active' : 'paramName')} onClick={this.focusParameter.bind(this, param)}>{param}</div>
                                    );
                                })}
                                {Object.keys(this.props.endpoint.params).map( (param: string, ind:number) => {
                                    let parameters = this.props.endpoint.params[param];
                                    return (
                                        <div key={ind} className={(this.state.focusedParameter === param ? 'content content__active' : 'content')}>
                                            <table>
                                                <tbody>
                                                    {parameters.map( (p: any, ind: number) => {
                                                        return (
                                                            <tr key={ind}>
                                                                <td className={(p.required===true ? 'name required' : 'name')}>{p.name}</td>
                                                                <td className="description" >{p.description}</td>
                                                                <td className="type">{p.type}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="endpointResponses">
                                <div className="responseCodes">
                                    {this.props.endpoint.responses.map( (r: any, ind: number) => {
                                        return (
                                            <div className={( this.state.focusedResponse === r.code ? 'responseCode responseCode__active' : 'responseCode')} onClick={this.focusCode.bind(this, r.code)} key={ind}>{r.code}</div>
                                        );
                                    })}
                                </div>
                                {this.props.endpoint.responses.map( (r: any, ind: number) => {
                                    return (
                                        <div className={( this.state.focusedResponse === r.code ? 'responseBody responseBody__active' : 'responseBody')} key={ind}>
                                            <Highlight className="json">
                                                {JSON.stringify(JSON.parse(r.body), null ,2)}
                                            </Highlight>
                                        </div>
                                    );
                                })}
                            </div>
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