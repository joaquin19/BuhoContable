import React, { Component } from 'react'


interface Props extends React.Props<RowCards>{
    cards: Array<any>;
}

export default class RowCards extends Component<Props> {
    render() {
        return (
            <div className='row'>
                {
                    this.props.cards.map((card: any, key: number) => (
                        <InfoCard {...card} />
                    ))
                }
            </div>
        )
    }
}

export const InfoCard = ({ title, subtitle, icon, background }) => (
    <div className="col-sm-6 col-xl-3">
        <div className={`p-3 bg-${background}-300 rounded overflow-hidden position-relative text-white mb-g`}>
            <div className="">
                <h3 className="display-4 d-block l-h-n m-0 fw-500">
                    {title}
                    <small className="m-0 l-h-n">{subtitle}</small>
                </h3>
            </div>
            <i className={`${icon} position-absolute pos-right pos-bottom opacity-15 mb-n1 mr-n1`} style={{fontSize: "6rem"}}></i>
        </div>
    </div>
);
