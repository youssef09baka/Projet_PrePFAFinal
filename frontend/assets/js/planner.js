/* ==========================================================
   ANIMATION D’APPARITION DU FORMULAIRE
========================================================== */
window.addEventListener("load", () => {
  const form = document.getElementById("plannerForm");
  form.classList.add("show");
});


/* ==========================================================
   CHANGEMENT DE L’IMAGE DE FOND SELON LA DESTINATION
========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("plannerHero");
  const destinationInput = document.getElementById("to");

  // Classes CSS disponibles pour les backgrounds
  const cityClasses = [
    "bg-casa",
    "bg-rabat",
    "bg-marrakech",
    "bg-fes",
    "bg-tanger",
    "bg-agadir",
    "bg-tetouan",
    "bg-kenitra"
  ];

  destinationInput.addEventListener("input", () => {
    const city = destinationInput.value.toLowerCase().trim();

    // Supprimer tous les backgrounds existants
    hero.classList.remove(...cityClasses);

    // Ajouter la classe correspondant à la ville si elle existe
    if (cityClasses.includes(`bg-${city}`)) {
      hero.classList.add(`bg-${city}`);
    }
  });
});


/* ==========================================================
   SOUMISSION DU FORMULAIRE & APPEL BACKEND
========================================================== */
document.getElementById("plannerForm").addEventListener("submit", (e) => {
  e.preventDefault();

  // Récupération des champs
  const from = document.getElementById("from");
  const to = document.getElementById("to");
  const budget = document.getElementById("budget");
  const startDate = document.getElementById("startDate");
  const endDate = document.getElementById("endDate");
  const result = document.getElementById("result");

  /* =========================
     VALIDATION DES DATES
  ========================= */
  if (!startDate.value || !endDate.value) {
    result.innerHTML = `
      <p class="text-danger text-center">
        Veuillez sélectionner les dates de voyage.
      </p>
    `;
    return;
  }

  /* =========================
     SPINNER DE CHARGEMENT
  ========================= */
  result.innerHTML = `
    <div class="text-center">
      <div class="spinner-border text-primary"></div>
      <p class="mt-3">Analyse en cours…</p>
    </div>
  `;

  /* =========================
     APPEL À L’API BACKEND
  ========================= */
  fetch("http://localhost:3000/api/plans", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      from: from.value,
      to: to.value,
      budget: Number(budget.value),
      startDate: startDate.value,
      endDate: endDate.value
    })
  })
    .then((res) => res.json())
    .then((data) => {

      // Message métier renvoyé par le backend
      if (data.message) {
        result.innerHTML = `
          <p class="text-danger text-center">${data.message}</p>
        `;
        return;
      }

      /* =========================
         AFFICHAGE DES RÉSULTATS
      ========================= */
      result.innerHTML = `
        <div class="row g-4">

          <!-- TRANSPORT -->
          <div class="col-md-6">
            <div class="card shadow-sm h-100">
              <div class="card-body">
                <h5 class="card-title">🚌 Transport recommandé</h5>
                <p><strong>Type :</strong> ${data.transport.type}</p>
                <p><strong>Compagnie :</strong> ${data.transport.company}</p>
                <p><strong>Durée :</strong> ${data.transport.duration}</p>
                <p class="fw-bold text-primary mb-3">
                  ${data.transport.price} DH
                </p>

                <!-- Carte du trajet -->
                <div class="ratio ratio-16x9 rounded overflow-hidden">
                  <iframe
                    src="https://maps.google.com/maps?output=embed&saddr=${encodeURIComponent(
                      data.transport.from
                    )}&daddr=${encodeURIComponent(
                      data.transport.to
                    )}"
                    loading="lazy"
                    style="border:0;"
                    allowfullscreen>
                  </iframe>
                </div>
              </div>
            </div>
          </div>

          <!-- HÔTEL -->
          <div class="col-md-6">
            <div class="card shadow-sm h-100">
              <img src="${data.hotel.image}" class="card-img-top" alt="Hotel image">
              <div class="card-body">
                <h5 class="card-title">🏨 ${data.hotel.name}</h5>
                <p>
                  ${"⭐".repeat(Math.round(data.hotel.rating))}
                  (${data.hotel.rating})
                </p>
                <p>${data.hotel.description}</p>
                <p><strong>Nuits :</strong> ${data.nights}</p>
                <p class="fw-bold text-primary">
                  ${data.hotel.price} DH × ${data.nights} nuits
                </p>

                <!-- Redirection réservation -->
                <a
                  href="https://www.booking.com/searchresults.fr.html?ss=${encodeURIComponent(
                    data.hotel.name + " " + data.transport.to
                  )}"
                  target="_blank"
                  class="btn btn-success w-100 mt-3"
                >
                  🏨 Réserver sur Booking
                </a>
              </div>
            </div>
          </div>

          <!-- TOTAL -->
          <div class="col-12">
            <div class="alert alert-success text-center fs-5">
              💰 <strong>Total :</strong> ${data.total} DH
            </div>
          </div>

        </div>
      `;
    })
    .catch((error) => {
      console.error(error);
      result.innerHTML = `
        <p class="text-danger text-center">
          ❌ Une erreur est survenue.
        </p>
      `;
    });
});
