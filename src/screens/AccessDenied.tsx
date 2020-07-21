import React, { Component } from 'react'
import Layout from '../layout'

const breadcrumb = [
    {
        target: '/',
        name: 'Home',
        active: true
    }
]
export default class AccessDenied extends Component {
    render() {
        return (
            <Layout breadcrumb={breadcrumb} >
                <div className="h-alt-hf d-flex flex-column align-items-center justify-content-center text-center">
                    <h1 className="page-error color-fusion-500">
                        ERROR <span className="text-gradient">403</span>
                        <small className="fw-500">
                            <strong>Forbidden: Access is denied.</strong>
                        </small>
                    </h1>
                    <h3 className="fw-500 mb-5">
                    You do not have permission to view this directory or page using the credentials that you supplied.
                    </h3>
                </div>
            </Layout>
        )
    }
}
