import React, { Component } from 'react'
import Layout from '../layout'

export default class NoMatch extends Component {
    render() {
        return (
            <Layout>
                <div className="h-alt-hf d-flex flex-column align-items-center justify-content-center text-center">
                    <h1 className="page-error color-fusion-500">
                        <span className="text-gradient"></span>
                        <small className="fw-500">
                            Something <u>went</u> wrong!
                        </small>
                    </h1>
                    <h3 className="fw-500 mb-5">
                        You have experienced a technical error. We apologize.
                    </h3>
                </div>
            </Layout>
        )
    }
}
