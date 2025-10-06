<script setup>
function getNames() {
  fetch('http://localhost:3309/api/data')
    .then((res) => res.json)
    .then((data) => {
      document.getElementsByClassName('name').textContent = JSON.stringify(data, null, 2)
    })
    .catch((err) => console.error('Erreur', err))
}
</script>
<template>
  <div class="formModifierAssoWrapper">
    <div class="addVolunteer">
      <button>Ajouter un.e bénévole</button>
    </div>
    <div class="searchFilters">
      <div class="searchByName">
        <input
          type="text"
          class="inputName"
          placeholder="Rechercher un.e bénévole"
          @keydown="getNames()"
        />
      </div>
      <div class="searchByLocation">
        <select name="city" id="cityVolunteers">
          <option value="Toutes les villes"></option>
          <option value="Paris">Paris</option>
          <option value="Lyon">Lyon</option>
          <option value="Nantes">Nantes</option>
        </select>
      </div>
    </div>
  </div>

  <div class="volunteerWrapper">
    <div class="volunteerItems">
      <button class="editButton">Edit</button>
      <button class="eraseButton">Erase</button>
    </div>
  </div>
</template>

<style scoped></style>
