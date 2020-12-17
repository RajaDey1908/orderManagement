import React,{useState} from 'react';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';;        

export default class Header extends React.Component {
    render() {
        return (
        <React.Fragment>
            <header className="mainHeader">
                <Row className="no-gutters">
                    <Col sm={12} className="pl-0 header-sec">
                    </Col>
                </Row>
            </header>
        </React.Fragment>
        )
    }
}