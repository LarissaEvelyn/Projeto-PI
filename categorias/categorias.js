function scrollCategories(direction) {
    const container = document.getElementById('categoryContainer');
    const scrollAmount = 300; // ajuste a distância do scroll aqui
    container.scrollLeft += direction * scrollAmount;
  }
  