

class EmployeeService {
    constructor(eventBroker) {
        this.eventBroker = eventBroker;
        this.attachEvents();
    }

    attachEvents() {
        this.eventBroker.subscribe(this.getEmployees.bind(this), EventMessageType.GET_EMPLOYEES);
        this.eventBroker.subscribe(this.getEmployee.bind(this), EventMessageType.GET_EMPLOYEE);
        this.eventBroker.subscribe(this.addEmployee.bind(this), EventMessageType.ADD_EMPLOYEE);
        this.eventBroker.subscribe(this.updateEmployee.bind(this), EventMessageType.UPDATE_EMPLOYEE);
        this.eventBroker.subscribe(this.deleteEmployee.bind(this), EventMessageType.DELETE_EMPLOYEE);
    }

    getEmployees() {
        var endpoint = `employees`;
        fetch(endpoint, this.createRequestObject('GET', null))
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(emp => {
                this.eventBroker.broadcast(EventMessageType.EMPLOYEES_RETRIEVED, emp);
            })
            .catch(err => console.error('Error during fetch:', err));
    }

    getEmployee(id) {
        var endpoint = `employees/${id}`;
        fetch(endpoint, this.createRequestObject('GET', null))
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(emp => {
                this.eventBroker.broadcast(EventMessageType.EMPLOYEE_RETRIEVED, emp);
            })
            .catch(err => console.error('Error during fetch:', err));
    }

    addEmployee(emp) {
        var endpoint = `employees`;
        fetch(endpoint, this.createRequestObject('POST', emp))
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(emp => {
                this.eventBroker.broadcast(EventMessageType.EMPLOYEE_ADDED, emp);
            })
            .catch(err => console.error('Error during fetch:', err));
    }

    updateEmployee(emp) {
        var endpoint = `employees/${emp.EmployeeId}`;
        fetch(endpoint, this.createRequestObject('PUT', emp))
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(emp => {
                this.eventBroker.broadcast(EventMessageType.EMPLOYEE_UPDATED, emp);
            })
            .catch(err => console.error('Error during fetch:', err));
    }

    deleteEmployee(id) {
        var endpoint = `employees/${id}`;
        fetch(endpoint, this.createRequestObject('DELETE', null))
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(emp => {
                this.eventBroker.broadcast(EventMessageType.EMPLOYEE_DELETED, emp);
            })
            .catch(err => console.error('Error during fetch:', err));
    }

    createRequestObject(verb, model) {
        var body = model != null ? JSON.stringify(model) : null;
        var headers = new Headers();
        headers.append("Content-Type", 'application/json');
        return {
            method: verb,
            body: body,
            headers: headers
        };
    }
}