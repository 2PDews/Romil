window.onload = function() {
    const tournamentName = localStorage.getItem('tournamentName');
    //const tournamentName = sessionStorage.getItem('tournamentName');
    if (tournamentName) {
      document.getElementById('tournamentTitle').innerText = tournamentName;  // Set the tournament name in the title
    }
  }