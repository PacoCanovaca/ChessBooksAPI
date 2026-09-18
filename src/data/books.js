const mongoose = require("mongoose");

// 1. ObjectIds de los autores para la referencia en los libros
const authorIds = {
    grau: new mongoose.Types.ObjectId(),
    capablanca: new mongoose.Types.ObjectId(),
    kasparov: new mongoose.Types.ObjectId(),
    chernev: new mongoose.Types.ObjectId(),
    kotov: new mongoose.Types.ObjectId(),
    nimzowitsch: new mongoose.Types.ObjectId(),
    bronstein: new mongoose.Types.ObjectId(),
    fischer: new mongoose.Types.ObjectId(),
    margulies: new mongoose.Types.ObjectId(),
    mosenfelder: new mongoose.Types.ObjectId(),
    silman: new mongoose.Types.ObjectId(),
    dvoretsky: new mongoose.Types.ObjectId(),
    philidor: new mongoose.Types.ObjectId(),
    renaud: new mongoose.Types.ObjectId(),
    kahn: new mongoose.Types.ObjectId(),
    tartakower: new mongoose.Types.ObjectId(),
    giffard: new mongoose.Types.ObjectId(),
    bienabe: new mongoose.Types.ObjectId(),
    leLionnais: new mongoose.Types.ObjectId()
};

// 2. Semilla de Autores
const authorsSeed = [
    {
        _id: authorIds.grau,
        fullName: "Roberto Grau",
        nationality: "Argentinian",
        birthYear: 1900,
        passingYear: 1944
    },
    {
        _id: authorIds.capablanca,
        fullName: "José Raúl Capablanca",
        nationality: "Cuban",
        birthYear: 1888,
        passingYear: 1942,
        title: "GM"
    },
    {
        _id: authorIds.kasparov,
        fullName: "Garry Kasparov",
        nationality: "Russian",
        birthYear: 1963,
        title: "GM"
    },
    {
        _id: authorIds.chernev,
        fullName: "Irving Chernev",
        nationality: "American",
        birthYear: 1900,
        passingYear: 1981
    },
    {
        _id: authorIds.kotov,
        fullName: "Alexander Kotov",
        nationality: "Russian",
        birthYear: 1913,
        passingYear: 1981,
        title: "GM"
    },
    {
        _id: authorIds.nimzowitsch,
        fullName: "Aron Nimzowitsch",
        nationality: "Latvian",
        birthYear: 1886,
        passingYear: 1935
    },
    {
        _id: authorIds.bronstein,
        fullName: "David Bronstein",
        nationality: "Russian",
        birthYear: 1924,
        passingYear: 2006,
        title: "GM"
    },
    {
        _id: authorIds.fischer,
        fullName: "Bobby Fischer",
        nationality: "American",
        birthYear: 1943,
        passingYear: 2008,
        title: "GM"
    },
    {
        _id: authorIds.margulies,
        fullName: "Stuart Margulies",
        nationality: "American"
    },
    {
        _id: authorIds.mosenfelder,
        fullName: "Don Mosenfelder",
        nationality: "American"
    },
    {
        _id: authorIds.silman,
        fullName: "Jeremy Silman",
        nationality: "American",
        birthYear: 1954,
        passingYear: 2023,
        title: "IM"
    },
    {
        _id: authorIds.dvoretsky,
        fullName: "Mark Dvoretsky",
        nationality: "Russian",
        birthYear: 1947,
        passingYear: 2016,
        title: "IM"
    },
    {
        _id: authorIds.philidor,
        fullName: "François-André Danican Philidor",
        nationality: "French",
        birthYear: 1726,
        passingYear: 1795
    },
    {
        _id: authorIds.renaud,
        fullName: "Georges Renaud",
        nationality: "French",
        birthYear: 1893,
        passingYear: 1953
    },
    {
        _id: authorIds.kahn,
        fullName: "Victor Kahn",
        nationality: "French",
        birthYear: 1889,
        passingYear: 1971
    },
    {
        _id: authorIds.tartakower,
        fullName: "Xavier Tartakower",
        nationality: "French",
        birthYear: 1887,
        passingYear: 1956,
        title: "GM"
    },
    {
        _id: authorIds.giffard,
        fullName: "Nicolas Giffard",
        nationality: "French",
        birthYear: 1950,
        title: "IM"
    },
    {
        _id: authorIds.bienabe,
        fullName: "Alain Biénabe",
        nationality: "French"
    },
    {
        _id: authorIds.leLionnais,
        fullName: "François Le Lionnais",
        nationality: "French",
        birthYear: 1901,
        passingYear: 1984
    }
];

// 3. Semilla de Libros (referenciando los ObjectIds anteriores)
const booksSeed = [
    // --- Libros en Español ---
    {
        title: "Tratado General de Ajedrez",
        synopsis: "Obra monumental y clásica en la literatura ajedrecística, ideal para la formación estructurada desde el nivel principiante hasta el avanzado.",
        year: 1940,
        language: "Spanish",
        authors: [authorIds.grau],
        purchase_links: ["https://ejemplo.com/comprar/tratado-grau"],
        book_images: ["https://ejemplo.com/img/tratado-grau.jpg"],
        publisher: "Ediciones Sopena"
    },
    {
        title: "Fundamentos del Ajedrez",
        synopsis: "Uno de los mejores libros de todos los tiempos escrito por el tercer campeón mundial, explicando los principios básicos del juego y los finales.",
        year: 1921,
        language: "Spanish",
        authors: [authorIds.capablanca],
        purchase_links: ["https://ejemplo.com/comprar/fundamentos-capablanca"],
        book_images: ["https://ejemplo.com/img/fundamentos-capablanca.jpg"],
        publisher: "La Casa del Ajedrez"
    },
    {
        title: "Mis geniales predecesores",
        synopsis: "Un análisis profundo y exhaustivo de la historia del campeonato del mundo y las partidas de los grandes campeones que le precedieron.",
        year: 2003,
        language: "Spanish",
        authors: [authorIds.kasparov],
        purchase_links: ["https://ejemplo.com/comprar/predecesores-kasparov"],
        book_images: ["https://ejemplo.com/img/predecesores.jpg"],
        publisher: "Ediciones Merán"
    },
    {
        title: "Ajedrez lógico paso a paso",
        synopsis: "El autor explica 33 partidas magistrales jugada a jugada, revelando la lógica, los planes y las ideas detrás de cada movimiento.",
        year: 1957,
        language: "Spanish",
        authors: [authorIds.chernev],
        purchase_links: ["https://ejemplo.com/comprar/ajedrez-logico"],
        book_images: ["https://ejemplo.com/img/ajedrez-logico.jpg"],
        publisher: "Ediciones Tutor"
    },
    {
        title: "Piense como un gran maestro",
        synopsis: "Explora los métodos de análisis, el cálculo de variantes y el proceso mental que debe seguir un jugador durante una partida de torneo.",
        year: 1971,
        language: "Spanish",
        authors: [authorIds.kotov],
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
        authors: [authorIds.nimzowitsch],
        purchase_links: ["https://example.com/buy/my-system"],
        book_images: ["https://example.com/img/my-system.jpg"],
        publisher: "Quality Chess"
    },
    {
        title: "Zurich International Chess Tournament 1953",
        synopsis: "Considered one of the greatest tournament books ever written, featuring brilliant annotations of every game from the legendary Candidates tournament.",
        year: 1953,
        language: "English",
        authors: [authorIds.bronstein],
        purchase_links: ["https://example.com/buy/zurich-1953"],
        book_images: [],
        publisher: "Dover Publications"
    },
    {
        title: "Bobby Fischer Teaches Chess",
        synopsis: "A programmed learning book that effectively teaches chess tactics, focusing primarily on back-rank checkmates and basic combinations.",
        year: 1966,
        language: "English",
        authors: [authorIds.fischer, authorIds.margulies, authorIds.mosenfelder],
        purchase_links: ["https://example.com/buy/fischer-teaches"],
        book_images: ["https://example.com/img/fischer.jpg"],
        publisher: "Bantam Books"
    },
    {
        title: "How to Reassess Your Chess",
        synopsis: "A modern classic designed to help club players understand positional imbalances and improve their strategic planning abilities.",
        year: 1993,
        language: "English",
        authors: [authorIds.silman],
        purchase_links: ["https://example.com/buy/reassess"],
        book_images: ["https://example.com/img/reassess.jpg"],
        publisher: "Siles Press"
    },
    {
        title: "Dvoretsky's Endgame Manual",
        synopsis: "The ultimate reference guide on endgame theory, presenting both fundamental positions and highly complex practical examples.",
        year: 2003,
        language: "English",
        authors: [authorIds.dvoretsky],
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
        authors: [authorIds.philidor],
        purchase_links: ["https://exemple.fr/acheter/analyse-philidor"],
        book_images: ["https://exemple.fr/img/philidor.jpg"],
        publisher: "Jean-Toussaint Trattner"
    },
    {
        title: "L'art de faire mat",
        synopsis: "Un classique indispensable pour découvrir et maîtriser les différents tableaux de mat et les combinaisons tactiques.",
        year: 1947,
        language: "French",
        authors: [authorIds.renaud, authorIds.kahn],
        purchase_links: ["https://exemple.fr/acheter/art-de-faire-mat"],
        book_images: [],
        publisher: "Payot"
    },
    {
        title: "Le jeu des échecs",
        synopsis: "Une exploration poétique et stratégique par l'un des pionniers de l'école hypermoderne, célèbre pour ses aphorismes.",
        year: 1951,
        language: "French",
        authors: [authorIds.tartakower],
        purchase_links: [],
        book_images: ["https://exemple.fr/img/tartakower.jpg"],
        publisher: "Stock"
    },
    {
        title: "Le guide des échecs",
        synopsis: "Une véritable encyclopédie traitant de l'histoire, de la stratégie, de la tactique et incluant un dictionnaire biographique complet.",
        year: 1993,
        language: "French",
        authors: [authorIds.giffard, authorIds.bienabe],
        purchase_links: ["https://exemple.fr/acheter/guide-des-echecs"],
        book_images: ["https://exemple.fr/img/guide-echecs.jpg"],
        publisher: "Robert Laffont"
    },
    {
        title: "Les prix de beauté aux échecs",
        synopsis: "Une anthologie captivante rassemblant des parties historiques récompensées pour leur esthétique et leurs combinaisons brillantes.",
        year: 1939,
        language: "French",
        authors: [authorIds.leLionnais],
        purchase_links: ["https://exemple.fr/acheter/prix-beaute"],
        book_images: [],
        publisher: "Payot"
    }
];

module.exports = { authorsSeed, booksSeed };