
import React, {Fragment, useEffect} from 'react'
import {connect} from 'react-redux'

import {usersAction} from '../actions/usersAction'


function App(props){
    
    useEffect(()=>{
        props.usersAction()
    }, [])

    //console.log(props.state) => [...{users}]

    //needs to check length, since network request takes time to complete
    //else, Array.map function won't work because there is no array
    const usersItem = props.state.length > 0 ? (
        props.state.map(user => {
            return (
                <div className="main-container-items" key={user.id}>
                    <div className="itemsinfo">
                        <img src={user.avatar} alt=""/>
                        <p><strong>First Name:</strong> {user.first_name}</p>
                        <p><strong>Last Name:</strong> {user.last_name}</p>
                        <div className="close-btn">X</div>
                    </div>
                    <div className="edit-btn">
                        EDIT
                    </div>
                </div>
            )
        })
    ) : (
        <p>loading...</p>
    )

    return (
        <Fragment>
            <div className="topbar">
                User Management System
            </div>
            <div className="main-container">
               {usersItem}
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        state: state.users
    }
}

export default connect(mapStateToProps, {usersAction})(App);