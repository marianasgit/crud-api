'use strict'

import { openModal, closeModal } from './modal.js'
import { readCustomers, createCustomer, deleteCustomer, updateCustomer } from './customers.js'

/*** Funções ***/

const createRow = ({nome, email, celular, cidade, id}) => {
    const row = document.createElement('tr')
    row.innerHTML = `
        <td>${nome}</td>
        <td>${email}</td>
        <td>${celular}</td>
        <td>${cidade}</td>
        <td>
            <button type="button" class="button green" onclick="editCustomer(${id})">editar</button>
            <button type="button" class="button red" onclick="delCustomer(${id})">excluir</button>
        </td>
    `

    return row

}

const updateTable = async () => {

    const customersContainer = document.getElementById('customers-container')

    // Ler a API e armazenar os resultados em uma variável 
    const customers = await readCustomers()

    // Preencher a tabela com as informações
    const rows = customers.map(createRow)

    customersContainer.replaceChildren(...rows)

}

const isEdit = () => document.getElementById('nome').hasAttribute('data-id')


const saveCustomer = async () => {

    const form = document.getElementById('modal-form');

    // Criar um json com as informações do cliente
    const customer = {

        "id"      : "",
        "nome"    : document.getElementById('nome').value,
        "email"   : document.getElementById('email').value,
        "celular" : document.getElementById('celular').value,
        "cidade"  : document.getElementById('cidade').value,
        "foto"    : document.getElementById('modal-image').src

    }

    if (form.reportValidity()){
        
        if (isEdit()){
            customer.id = document.getElementById('nome').dataset.id
            await updateCustomer(customer)
    
        } else {
            createCustomer(customer)
        }

    }


    // Fechar a modal
    closeModal()

    // Atualizar dados da tabela
    updateTable()
}

const fillForm = (customer) => {
    document.getElementById('nome').value = customer.nome
    document.getElementById('email').value = customer.email
    document.getElementById('celular').value = customer.celular
    document.getElementById('cidade').value = customer.cidade
    document.getElementById('nome').dataset.id = customer.id
    document.getElementById('modal-image').src = customer.foto
}

globalThis.editCustomer = async (id) => {
    // Armazenar as informações do cliente selecionado em uma variável
    const customer = await readCustomers(id)

    console.log(customer)
    // Preencher o formulário com as informações
    fillForm(customer)
    // Abrir a modal no estado de edição

    openModal()
}

globalThis.delCustomer = async (id) => {

    await deleteCustomer(id)
    updateTable()
}

// const actionCustomer = async (event) => {
//     if (event.target.type == 'button') {

//         const [action, customerId] = event.target.id.split('-')

//         if (action == 'editar') {
//             //Função para editar o cliente
            

//         } else if (action == 'excluir') {
//             // Função para deletar o cliente
//             await deleteCustomer(customerId)
//             updateTable()

//         }

//         console.log(action)
//     }

// }

const maskCelular = ({target}) => {
    
    let text = target.value

    text = text.replace(/[^0-9]/g,'')
    text = text.replace(/(.{2})(.{5})(.{4})/,'($1) $2-$3')
    text = text.replace(/(.{15})(.*)/, '$1')
    
    target.value = text
}

updateTable()

/*** Eventos ***/

document.getElementById('cadastrarCliente').addEventListener('click', openModal)

document.getElementById('salvar').addEventListener('click', saveCustomer)

document.getElementById('celular').addEventListener('keyup', maskCelular)

// document.getElementById('customers-container').addEventListener('click', actionCustomer)