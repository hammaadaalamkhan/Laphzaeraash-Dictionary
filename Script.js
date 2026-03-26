let dictionary = [];

fetch('Words/Sheen.json')
  .then(response => response.json())
  .then(data => {
    dictionary = data;
    displayWords(dictionary);
  })
  .catch(err => console.error("Error loading JSON:", err));

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = dictionary.filter(entry => entry.word.toLowerCase().includes(query));
  displayWords(filtered);
});

function displayWords(words) {
  const container = document.getElementById('dictionary');
  container.innerHTML = '';
  if (words.length === 0) {
    container.innerHTML = '<p>No words found.</p>';
    return;
  }
  words.forEach(entry => {
    const card = document.createElement('div');
    card.className = 'word-card';
    card.innerHTML = `
      <h2>${entry.word} <small>(${entry.part_of_speech})</small></h2>
      <p><strong>Meaning:</strong> ${entry.meaning}</p>
      <p><strong>Example:</strong> ${entry.example_sentence}</p>
      ${entry.notes ? `<p><strong>Notes:</strong> ${entry.notes}</p>` : ''}
      ${entry.audio ? `<audio controls src="${entry.audio}"></audio>` : ''}
    `;
    container.appendChild(card);
  });
}