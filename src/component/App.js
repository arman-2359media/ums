
import React, {Fragment, useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {usersAction, showForm, getIndex, clearIndex, editMode, addMode, deleteUser} from '../actions'
import FormWrapper from './FormWrapper'


function App(props){
    
    useEffect(()=>{
        props.usersAction()
    }, [])

    const editForm = (index) => {
        props.showForm()
        props.getIndex(index)
        props.editMode()
    }

    const addForm = () => {
        props.showForm()
        props.clearIndex()
        props.addMode()
    }

    const currentUsers = [...props.state.users]
    const confirmDeletion = (idxToDelete) =>{
        if(window.confirm('Delete user?')){
            props.deleteUser(currentUsers, idxToDelete)
            console.log(props.isDelete)
        }else{
            
        }

       
    }

    let isOneLeft = "show-delete-btn"
    if(props.state.users.length < 2){
        isOneLeft = "hide-delete-btn"
    }else{
        isOneLeft = "show-delete-btn"
    }
   
    //console.log(props.state.users)

    //needs to check length, since network request takes time to complete
    //else, Array.map function won't work because there is no array
    const usersItem = props.state.users.length > 0 ? (
        props.state.users.map((user, index) => {
            return (
                <div className="main-container-items" key={index}>
                    <div className="itemsinfo">
                        <img src={user.avatar} alt=""/>
                        <p><strong>First Name:</strong> {user.first_name}</p>
                        <p><strong>Last Name:</strong> {user.last_name}</p>
                        <div onClick={()=>confirmDeletion(index)} className={"close-btn "+ isOneLeft}>X</div>
                    </div>
                    <div onClick={() => editForm(index)} className="edit-btn ">
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
           <FormWrapper/>
            <div className="topbar">
                User Management System
                <button className="add-btn" onClick={addForm}>Add user</button>
            </div>
            <div className="main-container">
               {usersItem}
            </div>
        </Fragment>
    )
}

const mapStateToProps = (store) => {
    return {
        state: store.usersReducer,
        userIndexToEdit: store.editUserReducer.userIndexToEdit, 
        isDelete: store.editUserReducer.isDelete
    }
}



export default connect(mapStateToProps, {usersAction, showForm, getIndex, clearIndex, editMode, addMode, deleteUser})(App);