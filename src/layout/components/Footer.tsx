import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <footer className="page-footer" role="contentinfo">
                <div className="d-flex align-items-center flex-1 text-muted">
                    <span className="hidden-md-down fw-700">Test for a Reddit Post</span>
                </div>
                <div>
                    <ul className="list-table m-0">
                        <li className='hidden-md-down fw-700'>Crated by J.N</li>
                    </ul>
                </div>
            </footer>
        )
    }
}
