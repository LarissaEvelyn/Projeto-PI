function scrollCategories(direction) {
    const container = document.getElementById('categoryContainer');
    const scrollAmount = 300;//%
    container.scrollLeft += direction * scrollAmount;
  }
