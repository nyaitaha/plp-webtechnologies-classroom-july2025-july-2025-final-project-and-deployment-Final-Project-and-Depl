(() => {
  const movies = [
    { title:"Oppenheimer", img:"https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg", trailer:"https://www.youtube.com/embed/uYPbbksJxIg" },
    { title:"Barbie", img:"https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg", trailer:"https://www.youtube.com/embed/pBk4NYhWNMM" },
    { title:"Dune: Part Two", img:"https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg", trailer:"https://www.youtube.com/embed/U2Qp5pL3ovA" },
    { title:"Spider-Man: Across the Spider-Verse", img:"https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg", trailer:"https://www.youtube.com/embed/cqGjhVJWtEg" },
    { title:"Avatar: The Way of Water", img:"https://image.tmdb.org/t/p/w500/94xxm5701CzOdJdUEdIuwqZaowx.jpg", trailer:"https://www.youtube.com/embed/d9MyW72ELq0" },
    { title:"The Batman", img:"https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg", trailer:"https://www.youtube.com/embed/mqqft2x_Aa4" }
  ];

  // HOME PAGE
  const trendingRow = document.getElementById('trendingRow');
  const popularGrid = document.getElementById('popularGrid');
  const tpl = document.getElementById('cardTpl');
  if (tpl && trendingRow) {
    movies.forEach(m => trendingRow.appendChild(makeCard(m, tpl)));
  }
  if (tpl && popularGrid) {
    movies.forEach(m => popularGrid.appendChild(makeCard(m, tpl)));
  }

  // MOVIES PAGE
  const moviesGrid = document.getElementById('moviesGrid');
  const movieCardTpl = document.getElementById('movieCard');
  if (moviesGrid && movieCardTpl) {
    movies.forEach(m => moviesGrid.appendChild(makeCard(m, movieCardTpl, 'modal2')));
  }

  function makeCard(movie, tpl, modalId='modal') {
    const el = tpl.content.firstElementChild.cloneNode(true);
    el.querySelector('.card-img').src = movie.img;
    el.querySelector('.card-img').alt = movie.title;
    el.addEventListener('click', () => openModal(movie.trailer, modalId));
    return el;
  }

  // MODAL logic
  function openModal(url, which='modal') {
    const modal = document.getElementById(which);
    const videoWrap = modal.querySelector('.video-wrap');
    modal.setAttribute('aria-hidden','false');
    videoWrap.innerHTML = `<iframe src="${url}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  }
  function closeModal(which) {
    const modal = document.getElementById(which);
    const videoWrap = modal.querySelector('.video-wrap');
    modal.setAttribute('aria-hidden','true');
    videoWrap.innerHTML = "";
  }

  // Hook up close buttons
  const modal = document.getElementById('modal');
  const modal2 = document.getElementById('modal2');
  if (modal) {
    modal.addEventListener('click', e => { if (e.target===modal) closeModal('modal'); });
    document.getElementById('modalClose').addEventListener('click', () => closeModal('modal'));
  }
  if (modal2) {
    modal2.addEventListener('click', e => { if (e.target===modal2) closeModal('modal2'); });
    modal2.querySelector('.modal-close').addEventListener('click', () => closeModal('modal2'));
  }

  // Hero trailer
  const watchTrailer = document.getElementById('watchTrailer');
  if (watchTrailer) {
    watchTrailer.addEventListener('click', () => openModal(movies[0].trailer));
  }

  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      document.getElementById('formMsg').textContent = "Thanks! We'll reply soon.";
      contactForm.reset();
    });
  }

  // Footer year
  document.querySelectorAll('[id^=year]').forEach(el => el.textContent = new Date().getFullYear());
})();
