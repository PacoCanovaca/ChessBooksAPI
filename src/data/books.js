const booksSeed = [
    // --- Libros en Español ---
    {
        title: "Tratado General de Ajedrez",
        synopsis: "Obra monumental y clásica en la literatura ajedrecística, ideal para la formación estructurada desde el nivel principiante hasta el avanzado.",
        year: 1940,
        language: "Spanish",
        authors: ["Roberto Grau"],
        purchase_links: ["https://ejemplo.com/comprar/tratado-grau"],
        book_images: ["https://ejemplo.com/img/tratado-grau.jpg"],
        publisher: "Ediciones Sopena"
    },
    {
        title: "Fundamentos del Ajedrez",
        synopsis: "Uno de los mejores libros de todos los tiempos escrito por el tercer campeón mundial, explicando los principios básicos del juego y los finales.",
        year: 1921,
        language: "Spanish",
        authors: ["José Raúl Capablanca"],
        purchase_links: ["https://ejemplo.com/comprar/fundamentos-capablanca"],
        book_images: ["https://ejemplo.com/img/fundamentos-capablanca.jpg"],
        publisher: "La Casa del Ajedrez"
    },
    {
        title: "Mis geniales predecesores",
        synopsis: "Un análisis profundo y exhaustivo de la historia del campeonato del mundo y las partidas de los grandes campeones que le precedieron.",
        year: 2003,
        language: "Spanish",
        authors: ["Garry Kasparov"],
        purchase_links: ["https://ejemplo.com/comprar/predecesores-kasparov"],
        book_images: ["https://ejemplo.com/img/predecesores.jpg"],
        publisher: "Ediciones Merán"
    },
    {
        title: "Ajedrez lógico paso a paso",
        synopsis: "El autor explica 33 partidas magistrales jugada a jugada, revelando la lógica, los planes y las ideas detrás de cada movimiento.",
        year: 1957,
        language: "Spanish",
        authors: ["Irving Chernev"],
        purchase_links: ["https://ejemplo.com/comprar/ajedrez-logico"],
        book_images: ["https://ejemplo.com/img/ajedrez-logico.jpg"],
        publisher: "Ediciones Tutor"
    },
    {
        title: "Piense como un gran maestro",
        synopsis: "Explora los métodos de análisis, el cálculo de variantes y el proceso mental que debe seguir un jugador durante una partida de torneo.",
        year: 1971,
        language: "Spanish",
        authors: ["Alexander Kotov"],
        purchase_links: [],
        book_images: [],
        publisher: "Ediciones Tutor"
    },

    // --- Libros en Inglés ---
    {
        title: "My System",
        synopsis: "A foundational book introducing hypermodern chess concepts like overprotection, prophylaxis, and control of the center from a distance.",
        year: 1925,
        language: "English",
        authors: ["Aron Nimzowitsch"],
        purchase_links: ["https://example.com/buy/my-system"],
        book_images: ["https://example.com/img/my-system.jpg"],
        publisher: "Quality Chess"
    },
    {
        title: "Zurich International Chess Tournament 1953",
        synopsis: "Considered one of the greatest tournament books ever written, featuring brilliant annotations of every game from the legendary Candidates tournament.",
        year: 1953,
        language: "English",
        authors: ["David Bronstein"],
        purchase_links: ["https://example.com/buy/zurich-1953"],
        book_images: [],
        publisher: "Dover Publications"
    },
    {
        title: "Bobby Fischer Teaches Chess",
        synopsis: "A programmed learning book that effectively teaches chess tactics, focusing primarily on back-rank checkmates and basic combinations.",
        year: 1966,
        language: "English",
        authors: ["Bobby Fischer", "Stuart Margulies", "Don Mosenfelder"],
        purchase_links: ["https://example.com/buy/fischer-teaches"],
        book_images: ["https://example.com/img/fischer.jpg"],
        publisher: "Bantam Books"
    },
    {
        title: "How to Reassess Your Chess",
        synopsis: "A modern classic designed to help club players understand positional imbalances and improve their strategic planning abilities.",
        year: 1993,
        language: "English",
        authors: ["Jeremy Silman"],
        purchase_links: ["https://example.com/buy/reassess"],
        book_images: ["https://example.com/img/reassess.jpg"],
        publisher: "Siles Press"
    },
    {
        title: "Dvoretsky's Endgame Manual",
        synopsis: "The ultimate reference guide on endgame theory, presenting both fundamental positions and highly complex practical examples.",
        year: 2003,
        language: "English",
        authors: ["Mark Dvoretsky"],
        purchase_links: [],
        book_images: ["https://example.com/img/dvoretsky.jpg"],
        publisher: "Russell Enterprises"
    },

    // --- Libros en Francés ---
    {
        title: "Analyse du jeu des Échecs",
        synopsis: "L'un des premiers grands traités d'échecs, célèbre pour son affirmation selon laquelle les pions sont l'âme du jeu.",
        year: 1749,
        language: "French",
        authors: ["François-André Danican Philidor"],
        purchase_links: ["https://exemple.fr/acheter/analyse-philidor"],
        book_images: ["https://exemple.fr/img/philidor.jpg"],
        publisher: "Jean-Toussaint Trattner"
    },
    {
        title: "L'art de faire mat",
        synopsis: "Un classique indispensable pour découvrir et maîtriser les différents tableaux de mat et les combinaisons tactiques.",
        year: 1947,
        language: "French",
        authors: ["Georges Renaud", "Victor Kahn"],
        purchase_links: ["https://exemple.fr/acheter/art-de-faire-mat"],
        book_images: [],
        publisher: "Payot"
    },
    {
        title: "Le jeu des échecs",
        synopsis: "Une exploration poétique et stratégique par l'un des pionniers de l'école hypermoderne, célèbre pour ses aphorismes.",
        year: 1951,
        language: "French",
        authors: ["Xavier Tartakower"],
        purchase_links: [],
        book_images: ["https://exemple.fr/img/tartakower.jpg"],
        publisher: "Stock"
    },
    {
        title: "Le guide des échecs",
        synopsis: "Une véritable encyclopédie traitant de l'histoire, de la stratégie, de la tactique et incluant un dictionnaire biographique complet.",
        year: 1993,
        language: "French",
        authors: ["Nicolas Giffard", "Alain Biénabe"],
        purchase_links: ["https://exemple.fr/acheter/guide-des-echecs"],
        book_images: ["https://exemple.fr/img/guide-echecs.jpg"],
        publisher: "Robert Laffont"
    },
    {
        title: "Les prix de beauté aux échecs",
        synopsis: "Une anthologie captivante rassemblant des parties historiques récompensées pour leur esthétique et leurs combinaisons brillantes.",
        year: 1939,
        language: "French",
        authors: ["François Le Lionnais"],
        purchase_links: ["https://exemple.fr/acheter/prix-beaute"],
        book_images: [],
        publisher: "Payot"
    }
];

module.exports = booksSeed;