const container = document.getElementById("pokemonContainer");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
 
// Função para buscar Pokémon por ID ou nome
async function fetchPokemon(pokemon) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!response.ok) throw new Error("Pokémon não encontrado!");
    const data = await response.json();
    showPokemon(data);
  } catch (error) {
    container.innerHTML = `<p class="error">${error.message}</p>`;
  }
}
 
// Função para exibir um Pokémon na tela
function showPokemon(pokemon) {
  container.innerHTML = `
    <div class="pokemon-card">
      <h2>${pokemon.name.toUpperCase()}</h2>
      <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
      <div class="types">
        ${pokemon.types.map(t => `<span class="type ${t.type.name}">${t.type.name}</span>`).join("")}
      </div>
    </div>
  `;
}
 
// Função para carregar vários Pokémons (10 primeiros)
async function loadInitialPokemons() {
  container.innerHTML = "";
  for (let i = 1; i <= 10; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = await response.json();
    const card = document.createElement("div");
    card.classList.add("pokemon-card");
    card.innerHTML = `
      <h2>${data.name.toUpperCase()}</h2>
      <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}">
      <div class="types">
        ${data.types.map(t => `<span class="type ${t.type.name}">${t.type.name}</span>`).join("")}
      </div>
    `;
    container.appendChild(card);
  }
}
 
// Evento de busca
searchButton.addEventListener("click", () => {
  const value = searchInput.value.trim().toLowerCase();
  if (value) fetchPokemon(value);
});
 
// Também buscar com Enter
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const value = searchInput.value.trim().toLowerCase();
    if (value) fetchPokemon(value);
  }
});
 
// Carrega os 10 primeiros Pokémons ao iniciar
window.addEventListener("load", loadInitialPokemons);
 
 