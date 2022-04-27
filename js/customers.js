'use strict'

const url = 'https://testeleonid.herokuapp.com/clientes'

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

const readCustomers = async () => {

    const response = await fetch( url )

    return await response.json() 

}

const deleteCustomer = async (customerId) => {
    const options = {
        'method': 'DELETE'
    }

    const response = await fetch(`${url}/${customerId}`, options)
    console.log(response.ok)
}

export{ readCustomers, createCustomer, deleteCustomer } 

