import React from 'react';
import Header from '../Components/Common/Header';
import Footer from '../Components/Common/Footer';
import Sidebar from '../Components/Common/sidebar';
import { withRouter } from 'react-router-dom';


class DefaultLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            headerPermission: false
        }
    }

    handleToggle = () => {
        this.setState({ expanded: !this.state.expanded })
    }

    handleSelect = (selected) => {
        this.props.history.push("/" + selected);
    }

    render() {
        const { expanded} = this.state;

        return (
            <React.Fragment>
                <Header />
                <Sidebar handleToggle={this.handleToggle} handleSelect={this.handleSelect} />
                <div className={(expanded === true ? 'sidebarOpen' : 'sidebarClose')}>
                    {this.props.children}
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}
export default withRouter(DefaultLayout);