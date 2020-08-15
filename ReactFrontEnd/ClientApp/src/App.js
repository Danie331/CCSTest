import React, { useState, useEffect } from 'react';
import './App.css';
import { forwardRef } from 'react';
import Grid from '@material-ui/core/Grid'

import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const api = axios.create({
    baseURL: `https://localhost:44300/`
})

function App() {

    var columns = [
        { title: "Employee Id", field: "EmployeeId", hidden: true },
        { title: "First Name", field: "FirstName" },
        { title: "Last Name", field: "LastName" },
        { title: "Birth Date", field: "BirthDate", type: 'date', dateSetting: { locale: "en-ZA" } },
        { title: "Employee Num", field: "EmployeeNum" },
        { title: "Employed Date", field: "EmployedDate", type: 'date', dateSetting: { locale: "en-ZA" } },
        { title: "Terminated Date", field: "TerminatedDate", type: 'date', dateSetting: { locale: "en-ZA" }, readonly: true },
    ]
    const [data, setData] = useState([]); //table data

    //for error handling
    const [iserror, setIserror] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])

    useEffect(() => {
        api.get("/employees")
            .then(res => {
                setData(res.data)
            })
            .catch(error => {
                console.log("Error")
            })
    }, [])

    function preValidate(newData) {
        let errorList = []
        if (newData.FirstName === undefined || !newData.FirstName) {
            errorList.push("Please enter first name")
        }
        if (newData.LastName === undefined || !newData.LastName) {
            errorList.push("Please enter last name")
        }
        if (newData.BirthDate === undefined || !newData.BirthDate) {
            errorList.push("Please enter birth date")
        }
        if (newData.EmployeeNum === undefined || !newData.EmployeeNum) {
            errorList.push("Please enter employee num")
        }
        if (newData.EmployedDate === undefined || !newData.EmployedDate) {
            errorList.push("Please enter employee date")
        }

        return errorList
    }

    const handleRowUpdate = (newData, oldData, resolve) => {    
        let errorList = preValidate(newData)
        if (errorList.length < 1) {
            api.put(`/employees/${newData.EmployeeId}`, newData)
                .then(res => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setData([...dataUpdate]);
                    resolve()
                    setIserror(false)
                    setErrorMessages([])
                })
                .catch(error => {
                    setErrorMessages(["Update failed! Server error"])
                    setIserror(true)
                    resolve()

                })
        } else {
            setErrorMessages(errorList)
            setIserror(true)
            resolve()
        }
    }

    const handleRowAdd = (newData, resolve) => {
        let errorList = preValidate(newData)
        if (errorList.length < 1) { //no error
            api.post("/employees", newData)
                .then(res => {
                    let dataToAdd = [...data];
                    dataToAdd.push(res.data);
                    setData(dataToAdd);
                    resolve()
                    setErrorMessages([])
                    setIserror(false)
                })
                .catch(error => {
                    setErrorMessages(["Cannot add data. Server error!"])
                    setIserror(true)
                    resolve()
                })
        } else {
            setErrorMessages(errorList)
            setIserror(true)
            resolve()
        }


    }

    const handleRowDelete = (oldData, resolve) => {
        api.delete(`/employees/${oldData.EmployeeId}`)
            .then(res => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete[index] = res.data;
                setData([...dataDelete]);
                resolve()
            })
            .catch(error => {
                setErrorMessages(["Delete failed! Server error"])
                setIserror(true)
                resolve()
            })
    }


    return (
        <div className="App">

            <Grid container spacing={1}>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <div>
                        {iserror &&
                            <Alert severity="error">
                                {errorMessages.map((msg, i) => {
                                    return <div key={i}>{msg}</div>
                                })}
                            </Alert>
                        }
                    </div>
                    <MaterialTable
                        title="CCS React test"
                        localization={{
                        body: {
                            editRow: {
                                saveTooltip: "Save Employee",
                                cancelTooltip: "Cancel Edit",
                                deleteText: "Are you sure you want to terminate this employee?"
                            },
                            addTooltip: "Add Employee",
                            deleteTooltip: "Terminate Employee",
                            editTooltip: "Edit Employee"
                        }
                        }}
                        columns={columns}
                        data={data}
                        icons={tableIcons}
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve) => {
                                    handleRowUpdate(newData, oldData, resolve);

                                }),
                            onRowAdd: (newData) =>
                                new Promise((resolve) => {
                                    handleRowAdd(newData, resolve)
                                }),
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    handleRowDelete(oldData, resolve)
                                }),
                        }}
                    />
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
        </div>
    );
}

export default App;