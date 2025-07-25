let songs = [];



fetch('aiko.json')
  .then(res => res.json())
  .then(data => songs = data);
function getCheckedValues(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(el => el.value);
}

function searchSongs() {
  const situations = getCheckedValues('situation');
  const seasons = getCheckedValues('season');
  const tastes = getCheckedValues('taste');
  const emotions = getCheckedValues('emotion');

  const matched = songs.filter(song =>
    (situations.length === 0 || situations.some(val => song.situation.includes(val))) &&
    (seasons.length === 0 || seasons.some(val => song.season.includes(val))) &&
    (tastes.length === 0 || tastes.some(val => song.taste.includes(val))) &&
    (emotions.length === 0 || emotions.some(val => song.emotion.includes(val)))
  );

  const results = document.getElementById('results');
  if (matched.length === 0) {
    results.innerHTML = "<p>ごめんね、ぴったりの曲が見つからなかったよ…もっとたくさんチェックいれてみて！</p>";
    return;
  }

  results.innerHTML = matched.map(song => `
    <div class="card">
      <h3>${song.title}</h3>
      
      ${song.youtubeId ? `
        <div class="video-container">
          <iframe width="100%" height="315"
            src="https://www.youtube.com/embed/${song.youtubeId}"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
      ` : ''}
      <p>${song.comment || "この曲があなたに寄り添いますように♡"}</p>
    </div>
  `).join('');}