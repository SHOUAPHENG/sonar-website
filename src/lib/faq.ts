export type QA = { q: string; a: string };

export const faqs: QA[] = [
  {
    q: 'Qu’est-ce que SONAR exactement ?',
    a: 'SONAR transforme votre bibliothèque musicale en une carte 3D intelligente. Chaque morceau devient une étoile, positionnée selon son groove, son énergie et sa tonalité. Vous explorez votre catalogue par ressemblance plutôt que par ordre alphabétique.',
  },
  {
    q: 'Avec quels logiciels SONAR est-il compatible ?',
    a: 'Rekordbox et Serato sont pris en charge nativement : playlists, crates, notes, couleurs et commentaires sont lus puis réécrits en toute sécurité (avec sauvegardes). Vous pouvez aussi importer un simple dossier de fichiers audio.',
  },
  {
    q: 'Mes fichiers et mes données sont-ils en sécurité ?',
    a: 'Oui. L’analyse s’effectue en local sur votre machine. SONAR crée des sauvegardes avant toute écriture dans vos bibliothèques Rekordbox/Serato, et n’altère jamais vos fichiers audio originaux.',
  },
  {
    q: 'Comment fonctionne la similarité entre morceaux ?',
    a: 'Un modèle d’apprentissage contrastif encode chaque morceau en un vecteur. La distance entre deux vecteurs traduit leur ressemblance sonore. La carte 3D et la recherche de voisins reposent sur ces embeddings.',
  },
  {
    q: 'Puis-je essayer avant de payer ?',
    a: 'Bien sûr. L’offre Free vous permet d’explorer jusqu’à 500 morceaux avec la carte 3D et la recherche par similarité, sans carte bancaire.',
  },
  {
    q: 'Sur quelles plateformes l’application fonctionne-t-elle ?',
    a: 'SONAR est une application de bureau pour Windows et macOS. Une version web de démonstration est également disponible pour découvrir l’expérience.',
  },
  {
    q: 'Puis-je changer ou annuler mon abonnement ?',
    a: 'À tout moment, depuis votre tableau de bord. Les changements de formule sont calculés au prorata et l’annulation prend effet à la fin de la période en cours.',
  },
];
