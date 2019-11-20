import React, { Component } from 'react';
import './UserDashboard.css';

export default class UserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showScreen: '',
            users: [],
            rightBlockHeader: 'Welcome !!!',
            gender: '',
            age: '',
            name: '',
            address: '',
            showUserId: '',
            selectedUsers: [],
            id: 0,
            showEditOverlay: false,
            editId: '',
            showError: false,
            errorMessage: '',
            showSuccess: false,
            successMessage: ''
        }
    }
    changeTab = (value) => {
        this.setState({
            showScreen: value,
            rightBlockHeader: value + " User"
        })
    }
    genderChange = (e) => {
        this.setState({
            gender: e.currentTarget.value
        });
    }
    addUser() {
        var valid = true;
        var fieldsEmpty = false;
        if (this.state.name !== '') {
            var pattern = /^[a-zA-Z ]*$/;
            if (!pattern.test(this.state.name)) {
                valid = false;
            }
        }
        if (this.state.age !== '') {
            var pattern = /^[0-9\b]+$/;
            if (!pattern.test(this.state.age) && parseInt(this.state.age) < 15) {
                valid = false;
            }
        }
        if (this.state.gender !== '' && this.state.address !== '' && this.state.name !== '' && this.state.age !== '') {
            fieldsEmpty = false;
        } else {
            fieldsEmpty = true
        }
        if (valid && !fieldsEmpty) {
            this.setState({
                showError: false,
                errorMessage: ''
            })
            var dataObj = {
                "id": this.state.id,
                "name": this.state.name,
                "age": this.state.age,
                "address": this.state.address,
                "gender": this.state.gender
            }
            let { users, id } = this.state;
            id = id + 1;
            users.push(dataObj);
            this.setState({
                users,
                id
            })
            this.setState({
                gender: '',
                age: '',
                name: '',
                address: '',
            })
            alert("User added successfully !")
        } else if (!valid) {
            this.setState({
                showError: true,
                errorMessage: 'Values entered is invalid.Please check !'
            })
        } else if (fieldsEmpty) {
            this.setState({
                showError: true,
                errorMessage: 'Fields cannot be empty.Please check !'
            })
        }
    }
    saveName = event => {
        this.setState({
            name: event.target.value
        })
    }
    saveAge = event => {
        this.setState({
            age: event.target.value
        })
    }
    saveAddress = event => {
        this.setState({
            address: event.target.value
        })
    }
    showUserDetails = (index) => {
        if (index === this.state.showUserId) {
            this.setState({
                showUserId: ''
            })
        } else {
            this.setState({
                showUserId: index
            })
        }
    }
    selectUsers = (id, elem) => {
        let selectedUsers = this.state.selectedUsers;
        if (this.state.selectedUsers.includes(id)) {
            elem.currentTarget.classList.remove("selected");
            var array = selectedUsers;
            var index = array.indexOf(id)
            if (index !== -1) {
                array.splice(index, 1);
                selectedUsers = array;
            }
        } else {
            elem.currentTarget.classList.add("selected");
            selectedUsers.push(id);
        }
        this.setState({
            selectedUsers
        })
    }
    deleteUsers = () => {
        var users = this.state.users;
        var newArray = [];
        this.state.selectedUsers.map((id, index) => {
            newArray = this.removeByAttr(users, 'id', id);
        })
        this.setState({
            users: newArray
        })
        var elements = document.querySelectorAll('.table-button');
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove("selected")
        }
    }
    removeByAttr = (arr, attr, value) => {
        var i = arr.length;
        while (i--) {
            if (arr[i]
                && arr[i].hasOwnProperty(attr)
                && (arr[i][attr] === value)) {
                arr.splice(i, 1);
            }
        }
        return arr;
    }
    cancelEdit() {
        var elem = document.querySelector('.right-block');
        elem.style.background = 'none';
        var elem1 = document.querySelector('.my-border');
        elem1.style.borderBottom = '1px solid #ffffff;';
        this.setState({
            gender: '',
            age: '',
            name: '',
            address: '',
            showEditOverlay: false,
            editId: ''
        })
    }
    editUser = (id) => {
        this.setState({
            showEditOverlay: true,
            editId: id
        })
        var elem = document.querySelector('.right-block');
        elem.style.background = 'rgba(0, 0, 0, 0.54)';
        var elem1 = document.querySelector('.my-border');
        elem1.style.borderBottom = 'none';
        this.state.users.map((item, index) => {
            if (item.id === id) {
                this.setState({
                    gender: item.gender,
                    age: item.age,
                    name: item.name,
                    address: item.address,
                })
            }
        })

    }
    editUserSubmit = () => {
        var valid = true;
        var fieldsEmpty = false;
        if (this.state.name !== '') {
            var pattern = /^[a-zA-Z ]*$/;
            if (!pattern.test(this.state.name)) {
                valid = false;
            }
        }
        if (this.state.age !== '') {
            var pattern = /^[0-9\b]+$/;
            if (!pattern.test(this.state.age) && parseInt(this.state.age) < 15) {
                valid = false;
            }
        }
        if (this.state.gender !== '' && this.state.address !== '' && this.state.name !== '' && this.state.age !== '') {
            fieldsEmpty = false;
        } else {
            fieldsEmpty = true
        }
        if (valid && !fieldsEmpty) {
            this.setState({
                showError: false,
                errorMessage: ''
            })
            let users = this.state.users;
            users.map((item, index) => {
                if (item.id === this.state.editId) {
                    item.address = this.state.address
                    item.age = this.state.age
                    item.name = this.state.name
                    item.gender = this.state.gender
                }
            })
            this.setState({
                users
            })
            this.setState({
                gender: '',
                age: '',
                name: '',
                address: '',
                showEditOverlay: false,
                editId: ''
            })
            var elem = document.querySelector('.right-block');
            elem.style.background = 'none';
            var elem1 = document.querySelector('.my-border');
            elem1.style.borderBottom = '1px solid #ffffff;';
            alert("User edited successfully !")
        } else if (!valid) {
            this.setState({
                showError: true,
                errorMessage: 'Values entered is invalid.Please check !'
            })
        } else if (fieldsEmpty) {
            this.setState({
                showError: true,
                errorMessage: 'Fields cannot be empty.Please check !'
            })
        }

    }
    render() {
        return (
            <div className="dashboard-container">
                <div className="left-block">
                    <div className="container-header">User Options</div>
                    <div className="my-border"></div>
                    <div className="options-block">
                        <div className="each-option" onClick={this.changeTab.bind(this, "Add")}>Add User</div>
                        <div className="my-border"></div>
                        <div className="each-option" onClick={this.changeTab.bind(this, "View")}>View Users</div>
                        <div className="my-border"></div>
                        <div className="each-option" onClick={this.changeTab.bind(this, "Edit")}>Edit User</div>
                        <div className="my-border"></div>
                        <div className="each-option" onClick={this.changeTab.bind(this, "Delete")}>Delete User</div>
                        <div className="my-border"></div>
                    </div>
                </div>
                <div className="right-block">
                    <div className="container-header right-header">{this.state.rightBlockHeader}
                        {this.state.showScreen === 'Delete' ? <button className="table-button" onClick={this.deleteUsers.bind(this)}>Delete</button> : null}
                    </div>
                    <div className="my-border"></div>
                    {this.state.showEditOverlay ?
                        <div className="overlay">
                            <div className="overlay-block">
                                <div className="each-div">
                                    <div className="each-label">Name</div>
                                    <input className="each-input" onChange={this.saveName} type="text" value={this.state.name} />
                                </div>
                                <div className="each-div">
                                    <div className="each-label">Age</div>
                                    <input className="each-input" onChange={this.saveAge} type="number" value={this.state.age} />
                                </div>
                                <div className="each-div">
                                    <div className="each-label">Gender</div>
                                    <div className="radio-input">
                                        <label><input type="radio" onChange={this.genderChange} checked={this.state.gender === "Male"} className="each-radio-input" value="Male" />Male</label>
                                        <label><input type="radio" onChange={this.genderChange} checked={this.state.gender === "Female"} className="each-radio-input" value="Female" />Female</label>
                                    </div>
                                </div>
                                <div className="each-div">
                                    <div className="each-label">Address</div>
                                    <textarea className="each-textarea" onChange={this.saveAddress} value={this.state.address}></textarea>
                                </div>
                                <div className="each-div">
                                <button type="button" className="button-edit" onClick={this.editUserSubmit}>Done</button>
                                <button type="button" className="button-edit" onClick={this.cancelEdit.bind(this)}>Cancel</button>
                            </div>
                            </div>
                        </div>
                        : null
                    }
                    {this.state.showScreen === '' ?
                        <div className="right-container">
                            <div className="empty-screen">
                                No screen selected
                            </div>
                        </div>
                        : null
                    }
                    {
                        this.state.showScreen === 'Add' ?
                            <div className="right-container">
                                <div className="add-user-block">
                                    {this.state.showSuccess ? <div className="success-text">{this.state.successMessage}</div> : null}
                                    {this.state.showError ? <div className="error-text">{this.state.errorMessage}</div> : null}
                                    <div className="each-div">
                                        <div className="each-label">Name</div>
                                        <input className="each-input" onChange={this.saveName} type="text" value={this.state.name} />
                                    </div>
                                    <div className="each-div">
                                        <div className="each-label">Age</div>
                                        <input className="each-input" onChange={this.saveAge} type="number" value={this.state.age} />
                                    </div>
                                    <div className="each-div">
                                        <div className="each-label">Gender</div>
                                        <div className="radio-input">
                                            <label><input type="radio" onChange={this.genderChange} checked={this.state.gender === "Male"} className="each-radio-input" value="Male" />Male</label>
                                            <label><input type="radio" onChange={this.genderChange} checked={this.state.gender === "Female"} className="each-radio-input" value="Female" />Female</label>
                                        </div>
                                    </div>
                                    <div className="each-div">
                                        <div className="each-label">Address</div>
                                        <textarea className="each-textarea" onChange={this.saveAddress} value={this.state.address}></textarea>
                                    </div>
                                    <button type="button" className="button-add" onClick={this.addUser.bind(this)}>Add</button>
                                </div>
                            </div>
                            : null
                    }
                    {
                        this.state.showScreen === 'View' ?
                            <div className="user-view-block">
                                <table className="user-view-row">
                                    <tbody>
                                    <tr >
                                        <th className="each-title">S.No</th>
                                        <th className="each-title">Name</th>
                                        <th className="each-title">Age</th>
                                        <th className="each-title">Gender</th>
                                        <th className="each-title">Address</th>
                                    </tr>

                                    {
                                        this.state.users.length > 0 && this.state.users.map((eachUser, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="each-user-value">{index + 1}</td>
                                                    <td className="each-user-value">{eachUser.name}</td>
                                                    <td className="each-user-value">{eachUser.age}</td>
                                                    <td className="each-user-value">{eachUser.gender}</td>
                                                    <td className="each-user-value">{eachUser.address}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                            : null
                    }
                    {
                        this.state.showScreen === 'Edit' ?
                            <div className="user-edit-block">
                                <table className="user-view-row">
                                <tbody>
                                    <tr>
                                        <th className="each-title">S.No</th>
                                        <th className="each-title">Name</th>
                                        <th className="each-title">Age</th>
                                        <th className="each-title">Gender</th>
                                        <th className="each-title">Address</th>
                                        <th className="each-title">Action</th>
                                    </tr>

                                    {
                                        this.state.users.length > 0 && this.state.users.map((eachUser, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="each-user-value">{index + 1}</td>
                                                    <td className="each-user-value">{eachUser.name}</td>
                                                    <td className="each-user-value">{eachUser.age}</td>
                                                    <td className="each-user-value">{eachUser.gender}</td>
                                                    <td className="each-user-value">{eachUser.address}</td>
                                                    <td className="each-user-value table-button" onClick={this.editUser.bind(this, eachUser.id)}>Edit</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                            : null
                    }
                    {
                        this.state.showScreen === 'Delete' ?
                            <div className="user-delete-block">
                                <table className="user-view-row">
                                <tbody>
                                    <tr>
                                        <th className="each-title">Select</th>
                                        <th className="each-title">S.No</th>
                                        <th className="each-title">Name</th>
                                        <th className="each-title">Age</th>
                                        <th className="each-title">Gender</th>
                                        <th className="each-title">Address</th>
                                    </tr>

                                    {
                                        this.state.users.length > 0 && this.state.users.map((eachUser, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="each-user-value table-button" onClick={this.selectUsers.bind(this, eachUser.id)}>Select</td>
                                                    <td className="each-user-value">{index + 1}</td>
                                                    <td className="each-user-value">{eachUser.name}</td>
                                                    <td className="each-user-value">{eachUser.age}</td>
                                                    <td className="each-user-value">{eachUser.gender}</td>
                                                    <td className="each-user-value">{eachUser.address}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                            : null
                    }
                </div>
            </div>
        )
    }
}
