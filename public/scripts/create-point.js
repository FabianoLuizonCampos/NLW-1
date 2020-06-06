function populateUFs() {

    const ufSelect = document.querySelector("select[name=uf]");

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados`

    fetch(url)
    .then( (res) => { return res.json() })
    .then( states => {

        for( const state of states) {

            ufSelect.innerHTML += `<option value="${state.id} ">${state.nome}</option>`;
        }
        
    })

    // Pode se escrever desse jeito
    //fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then( res => res.json() );
     
}

populateUFs()

function getCities(event) {

    //console.log("Entrei");

    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const ufValue = event.target.value;

    //console.log(ufValue);

    const urlCities = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios/`;

    //console.log(urlCities);

    const indexOfSelectState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectState].text;

    citySelect.innerHTML = `<option value="">Selecione a Cidade<option>`;
    citySelect.disabled = true;

    fetch(urlCities)
    .then( res => res.json() )
    .then( cities => {

        for( const city of cities) {

            citySelect.innerHTML += `<option value="${city.nome} ">${city.nome}</option>`;
        }
        
        citySelect.disabled = false;
    })

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)      
 

    // 1h48min

// Itens de Coleta
// pegar todos li´s

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem);
}

// atualizar o campo escondido com os itens selecionados
const collectedItems = document.querySelector("input[name=items");

let selectedItems = [];

function handleSelectedItem(event) {
    const itemLi = event.target;

    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;




    // verificar se existem itens selecionados, se sim
    // pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item =>  item == itemId);

    // se já estiver selecionado, tirar da seleção

    if ( alreadySelected != -1 ) {
        // tirar da seleção
        const filteredItems = selectedItems.filter ( item => { 
            
            const itemIsDifferent = item != itemId;
            return false;               
        });
        
        selectedItems = filteredItems;
    } else {     // se não estiver selecionado, adicionar à seleção
       //adicionar à seleção
       selectedItems.push(itemId);
    }

    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems;
     
    
}

// 35min 