
import React from 'react'
import {connect} from 'react-redux'

import {hideForm, clearIndex} from '../actions'
import FormikComponent from './FormField'


function FormWrapper(props) {
    console.log(props.userIndexToEdit)
    const showForm = props.state.display ? "show" : "hide"

    const hideForm = () => {
        props.hideForm();
        props.clearIndex()
    }

    const hideFormParent = (e) => {
        if(e.target.dataset.name === 'parent'){
            props.hideForm();
            props.clearIndex()
        }
    }
    const ln = props.allUsers.users.length + 1
    console.log(ln)
    const FormikMount = () => {
        if(props.userIndexToEdit != undefined && props.writeMode === 'edit_mode'){
            return (
                <FormikComponent 
                    first_name={props.allUsers.users[props.userIndexToEdit].first_name} 
                    last_name={props.allUsers.users[props.userIndexToEdit].last_name}
                    avatar={props.allUsers.users[props.userIndexToEdit].avatar}
                    id={props.allUsers.users[props.userIndexToEdit].id}
                />
            ) 
        }else if(props.userIndexToEdit === undefined && props.writeMode === 'add_mode'){
            return (
                <FormikComponent 
                    first_name="" 
                    last_name=""
                    avatar=""
                    id={ln}
                />
            )
        }
        else{
            return null
        }
    }
    
    return (
        //using data-set to get the element
        <div data-name="parent" className={"form-wrapper-fixed " + showForm} onClick={hideFormParent}>
            <div className="form-container">
                {FormikMount()}   
                <div className="close-form" onClick={hideForm}>X</div>
            </div>
        </div>
    )
}

const mapStateToProps = (store) => {
    return {
        state: store.formDisplayReducer,
        allUsers: store.usersReducer,
        userIndexToEdit: store.editUserReducer.userIndexToEdit,
        writeMode: store.editUserReducer.writeMode
    }
}


export default connect(mapStateToProps, {hideForm, clearIndex})(FormWrapper)
