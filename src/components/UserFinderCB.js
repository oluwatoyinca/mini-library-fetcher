import { Fragment, Component } from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';
import UsersContext from '../context/users-context';
import ErrorBoundary from './ErrorBoundary';

// const DUMMY_USERS = []

class UserFinder extends Component {
    //using context instead of fetching
    static contextType = UsersContext

    constructor() {
        super()
        this.state = {
            filteredUsers: [],
            searchTerm: ''
        }
    }

    componentDidMount() {
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //     .then(res => res.json())
    //     .then(json => {
    //         json.map(user => 
    //             DUMMY_USERS.push({ id: user.id, name: user.username.toLowerCase() }))
    //             this.setState({filteredUsers: DUMMY_USERS})
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
        this.setState({filteredUsers: this.context.users})
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.searchTerm !== this.state.searchTerm)
        {
            this.setState({filteredUsers: this.context.users.filter(user => user.name.includes(this.state.searchTerm))})
        }
    }

    searchChangeHandler(event) {
        this.setState({searchTerm: event.target.value.toLowerCase()})
    }

    render() {
        return (
            <Fragment>
                <div className={classes.finder}>
                    <input type='search' onChange={this.searchChangeHandler.bind(this)} />
                </div>
                <ErrorBoundary>
                    <Users users={this.state.filteredUsers} />
                </ErrorBoundary>
            </Fragment>
        )
    }
}

export default UserFinder;