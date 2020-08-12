
const EventMessageType = {
    // HTTP event hooks
    GET_EMPLOYEES: 'GET_EMPLOYEES',
    GET_EMPLOYEE: 'GET_EMPLOYEE',
    ADD_EMPLOYEE: 'ADD_EMPLOYEE',
    UPDATE_EMPLOYEE: 'UPDATE_EMPLOYEE',
    DELETE_EMPLOYEE: 'DELETE_EMPLOYEE',

    // Callback events
    EMPLOYEES_RETRIEVED: 'EMPLOYEES_RETRIEVED',
    EMPLOYEE_RETRIEVED: 'EMPLOYEE_RETRIEVED',
    EMPLOYEE_ADDED: 'EMPLOYEE_ADDED',
    EMPLOYEE_UPDATED: 'EMPLOYEE_UPDATED',
    EMPLOYEE_DELETED: 'EMPLOYEE_DELETED'
}

class MessageBroker {
    constructor() {
        this.events = {
            GET_EMPLOYEES: [],
            GET_EMPLOYEE: [],
            ADD_EMPLOYEE: [],
            UPDATE_EMPLOYEE: [],
            DELETE_EMPLOYEE: [],
            EMPLOYEES_RETRIEVED: [],
            EMPLOYEE_RETRIEVED: [],
            EMPLOYEE_ADDED: [],
            EMPLOYEE_UPDATED: [],
            EMPLOYEE_DELETED: []
        };
    }

    subscribe(fn, eventType, ordinality) {
        var eventSubscribers = this.events[eventType];
        if (ordinality && ordinality === 1) {
            eventSubscribers.unshift(fn);
        } else
            eventSubscribers.push(fn);
    }

    unsubscribe(fn, eventType) {
        var eventSubscribers = this.events[eventType];
        for (var i = 0; i < eventSubscribers.length; i++) {
            if (eventSubscribers[i].name === fn.name)
                eventSubscribers.splice(i, 1);
        }
    }

    broadcast(eventType, args) {
        console.log(`${eventType} event broadcast by MessageBroker`);
        var eventSubscribers = this.events[eventType];
        for (var i = 0; i < eventSubscribers.length; i++) {
            eventSubscribers[i](args);
        }
    }
}