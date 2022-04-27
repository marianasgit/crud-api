'use strict'

import { openModal, closeModal } from './modal.js'
import { readCustomers, createCustomer, deleteCustomer } from './customers.js'

/*** Funções ***/

const createRow = (customer) => {
    const row = document.createElement('tr')
    row.innerHTML = `
        <td>${customer.nome}</td>
        <td>${customer.email}</td>
        <td>${customer.celular}</td>
        <td>${customer.cidade}</td>
        <td>
            <button type="button" class="button green" id="editar-${customer.id}">Editar</button>
            <button type="button" class="button red" id="excluir-${customer.id}">Excluir</button>
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

const saveCustomer = async () => {
    // Criar um json com as informações do cliente
    const customer = {

        "id"      : "",
        "nome"    : document.getElementById('nome').value,
        "email"   : document.getElementById('email').value,
        "celular" : document.getElementById('celular').value,
        "cidade"  : document.getElementById('cidade').value

    }

    // Enviar json para o Servidor API
    await createCustomer(customer)

    // Fechar a modal
    closeModal()

    // Atualizar dados da tabela
    updateTable()
}

const actionCustomer = async (event) => {
    if (event.target.type == 'button') {

        const [action, customerId] = event.target.id.split('-')

        if (action == 'editar') {
            // Função para editar o cliente


        } else if (action == 'excluir') {
            // Função para deletar o cliente
            await deleteCustomer(customerId)
            updateTable()

        }

        console.log(action)
    }

}

updateTable()

/*** Eventos ***/

document.getElementById('cadastrarCliente').addEventListener('click', openModal)

document.getElementById('salvar').addEventListener('click', saveCustomer)

document.getElementById('customers-container').addEventListener('click', actionCustomer)