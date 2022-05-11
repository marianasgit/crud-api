'use strict'

const url = 'http://testeleonid.herokuapp.com/clientes'

const createCustomer = async (customer) => {
    const options = {
        'method': 'POST',
        'body': JSON.stringify ( customer ),
        'headers': {
            'content-type': 'application/json'
        } 
    }
    
    const response = await fetch( url, options )
    console.log(response.ok)
}

const readCustomers = async (id='') => {
    
    const response = await fetch( `${url}/${id}` )
    
    return await response.json() 
    
}


const deleteCustomer = async (customerId) => {
    const options = {
        'method': 'DELETE'
    }
    
    const response = await fetch(`${url}/${customerId}`, options)
    console.log(response.ok)
}

const updateCustomer = async (customer) => {
    const options = {
        'method': 'PUT',
        'body': JSON.stringify(customer),
        'headers': {
            'content-type': 'application/json'
        }
    }

    const response = await fetch(`${url}/${customer.id}`, options)
    console.log('UPDATE', response.ok)
}

export{ readCustomers, createCustomer, deleteCustomer, updateCustomer } 


