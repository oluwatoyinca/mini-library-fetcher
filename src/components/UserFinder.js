import { Fragment, useState, useEffect, Component } from 'react';
import {useQuery, useLazyQuery, useMutation, gql} from '@apollo/client'

import Users from './Users';
import classes from './UserFinder.module.css';

const DUMMY_USERS = []

const QUERY_ALL_AUTHORS = gql`
query allAuthors{
    authors{
        _id
        name
    }
}`;

const QUERY_BOOK_BY_ID = gql`
query Book($name: String!){
    book(name: $name) {
        _id
        name
        isbn
    }
}`;

const UserFinder = () => {
    const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
    const [searchedBookData, setSearchedBookData] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [bookSearched, setBookSearched] = useState('')
    
    //using useQuery for GraphQL
    useQuery(QUERY_ALL_AUTHORS, {onCompleted: (data) => {
        data.authors.map(author => 
            DUMMY_USERS.push({ id: author._id, name: author.name.toLowerCase() }))
        setFilteredUsers(DUMMY_USERS)
    }})

    const [searchBook] = useLazyQuery(QUERY_BOOK_BY_ID, {
        variables: {
            name: bookSearched
        },
        onCompleted: (data) => {
            setSearchedBookData(data.book)
            console.log(data.book)
    }})

    // useEffect(() => {
    // //     //using fetch for restAPI
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //     .then(res => res.json())
    //     .then(json => {
    //         json.map(user => 
    //             DUMMY_USERS.push({ id: user.id, name: user.username.toLowerCase() }))
    //             setFilteredUsers(DUMMY_USERS)
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
    // }, [])

    useEffect(() => {
        setFilteredUsers(
        DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
        );
    }, [searchTerm]);

    const searchChangeHandler = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    return (
        <Fragment>
            <div className={classes.finder}>
                <input type='search' onChange={searchChangeHandler} />
            </div>
            <Users users={filteredUsers} />
            {/* <button onclick={}>Show Books</button> */}
            <div>
                <input type='text' placeholder='Singing Dove' onChange={(e)=> setBookSearched(e.target.value)}/>
                <button onClick={searchBook}>Search Book</button>
                <div>
                    <h1>{searchedBookData._id}</h1>
                    <h1>{searchedBookData.name}</h1>
                    <h1>{searchedBookData.isbn}</h1>
                </div>
            </div>
        </Fragment>
    );
};

export default UserFinder