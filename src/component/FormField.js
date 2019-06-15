
import React from 'react'
import {withFormik, Field, Form} from 'formik'
import {connect} from 'react-redux'
import * as Yup from 'yup'

import {hideForm, newUsersEdit, clearIndex, newUsersAdd, clearMode} from '../actions'

const FormField = ({touched, errors, values, hideForm, state, newUsersEdit, users, userIndexToEdit, clearIndex, clearMode, newUsersAdd, writeMode}) => {
    
    let currentUsers = [...users]
    console.log(errors)
    const throwForm = (id,)=> {
        //hide form and clear everything
        if(values.first_name == '' || values.last_name == '' || values.avatar == ''){
            //hideForm()
            return null
        }else{
            if(writeMode === 'edit_mode'){
                //newUsers[userIndexToEdit] = values
                newUsersEdit(currentUsers, id, userIndexToEdit, values, hideForm)
            }else if(writeMode === 'add_mode'){
                //newUsers.push(values)
                newUsersAdd(currentUsers, values, hideForm)
            }
            hideForm()
            clearIndex()
            clearMode()
        }
        //hideForm()
        // clearIndex()
        // clearMode()
    }

    console.log(values)
    return (
        <Form className="form">
            <p>FIRST NAME</p>
            {touched.first_name && errors.first_name && <p className="required">{errors.first_name}</p>}
            <Field type="text" name="first_name" placeholder="First Name"/>

            <p>LAST NAME</p>
            {touched.last_name && errors.last_name && <p className="required">{errors.last_name}</p>}
            <Field type="text" name="last_name" placeholder="Last Name"/>

            <p>Avatar URL</p>
            {touched.avatar && errors.avatar && <p className="required">{errors.avatar}</p>}
            <Field type="text" name="avatar" placeholder="Avatar URL"/>

            <button onClick={()=>throwForm(values.id)}>SUBMIT</button>
        </Form>
    )
}

const FormikComponent = withFormik({
    mapPropsToValues({first_name, last_name, avatar, id}){
        return {
            first_name,
            last_name, 
            avatar,
            id
        }
    }, 
    
    validationSchema : Yup.object().shape({
        first_name: Yup.string().required('required'),
        last_name: Yup.string().required('required'),
        avatar: Yup.string().required('required')
    }),

    handleSubmit(values, {resetForm, setErrors, setSubmitting}){
        if(values.first_name !== '' && values.last_name !== '' && values.avatar !== ''){
            hideForm()
            clearIndex()
            clearMode()
            resetForm()
          
            
        }else{
            setErrors({first_name: "required"})
           
        }
        
    }
})(FormField)

const mapStateToProps = (store) => {
    return {
        state: store.formDisplayReducer,
        users: store.usersReducer.users,
        userIndexToEdit: store.editUserReducer.userIndexToEdit,
        writeMode: store.editUserReducer.writeMode
    }
}

export default connect(mapStateToProps, {hideForm, newUsersEdit, clearIndex, newUsersAdd, clearMode}) (FormikComponent)