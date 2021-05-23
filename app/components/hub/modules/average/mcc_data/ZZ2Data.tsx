import { SubjectData, UEData, SectorData, SemesterData, Year } from "../types"

const ZZ2_Semester1: SemesterData = {
  sectors: [
    {
      name: "Tronc commun",
      ues: [
        {
          name: "Sciences Humaines et Sociales",
          subjects: [
            {
              name: "Anglais",
              coef: 4.0,
            },
            {
              name: "LV2",
              coef: 4.0,
            },
            {
              name: "Droit",
              coef: 2.0,
            },
            {
              name: "Communication",
              coef: 2.0,
            },
            {
              name: "Gestion",
              coef: 2.0,
            },
            {
              name: "Conduite de projets",
              coef: 2.0,
            },
          ],
          ects: 8,
        },
        {
          name: "Scientifique",
          subjects: [
            {
              name: "C++",
              coef: 4.0,
            },
            {
              name: "UML",
              coef: 2.0,
            },
            {
              name: "Java",
              coef: 2.0,
            },
            {
              name: "Internet des Objets",
              coef: 1.0,
            },
            {
              name: "Réseaux",
              coef: 2.0,
            },
          ],
          ects: 6,
        },
      ],
    },
    {
      name: "F1",
      ues: [
        {
          name: "Systèmes embarqués et temps réel",
          subjects: [
            {
              name: "Linux embarqué",
              coef: 3.0,
            },
            {
              name: "Architecture avancée",
              coef: 2.0,
            },
            {
              name: "Design",
              coef: 2.0,
            },
            {
              name: "Systèmes embarqués",
              coef: 3.0,
            },
            {
              name: "Séminaire Systèmes d'Exploitation Embarqués",
              coef: 2.0,
            },
          ],
          ects: 6,
        },
        {
          name: "Traitement des informations",
          subjects: [
            {
              name: "Traitement numérique du signal",
              coef: 2.0,
            },
            {
              name: "Transmission de données sécurisée",
              coef: 2.0,
            },
            {
              name: "Imagerie vision",
              coef: 2.0,
            },
            {
              name: "Capteurs",
              coef: 2.0,
            },
          ],
          ects: 5,
        },
        {
          name: "Systèmes intelligents",
          subjects: [
            {
              name: "Robotique",
              coef: 2.0,
            },
            {
              name: "Réalité virtuelle",
              coef: 2.0,
            },
            {
              name: "Réalité immersive",
              coef: 2.0,
            },
            {
              name: "Cybernétique Automatique",
              coef: 2.0,
            },
          ],
          ects: 4,
        },
      ],
    },
    {
      name: "F2",
      ues: [
        {
          name: "Systèmes et réseaux",
          subjects: [
            {
              name: "Systèmes d'exploitation",
              coef: 2.0,
            },
            {
              name: "Sécurité et systèmes d'information",
              coef: 2.0,
            },
            {
              name: "Services Web .NET C#",
              coef: 3.0,
            },
          ],
          ects: 5,
        },
        {
          name: "Génie logiciel et développement",
          subjects: [
            {
              name: "Forges logicielles",
              coef: 2.0,
            },
            {
              name: "Développement .NET C#",
              coef: 2.0,
            },
            {
              name: "Développement d'applications Web",
              coef: 3.0,
            },
            {
              name: "Architectures logicielles et qualité",
              coef: 2.0,
            },
          ],
          ects: 5,
        },
        {
          name: "Outils",
          subjects: [
            {
              name: "Simulation",
              coef: 2.0,
            },
            {
              name: "Ergonomie des IHM",
              coef: 2.0,
            },
            {
              name: "Développement de bases de données",
              coef: 2.0,
            },
            {
              name: "Outils d'aide à la décision",
              coef: 3.0,
            },
          ],
          ects: 5,
        },
      ],
    },
    {
      name: "F3",
      ues: [
        {
          name: "Connaissances de l'entreprise",
          subjects: [
            {
              name: "Sécurité et systèmes d'Information",
              coef: 2.0,
            },
            {
              name: "Outil de développement mobile pour le SI de l'entreprise",
              coef: 2.0,
            },
            {
              name: "Architectures logicielles et qualités",
              coef: 2.0,
            },
            {
              name: "Développement Web",
              coef: 2.0,
            },
          ],
          ects: 4,
        },
        {
          name: "Systèmes d'information",
          subjects: [
            {
              name: "Développement de Bases de Données",
              coef: 2.0,
            },
            {
              name: "Analyse et fouille de données",
              coef: 4.0,
            },
            {
              name: "Fondements des Bases de Données",
              coef: 3.0,
            },
          ],
          ects: 5,
        },
        {
          name: "RO et Aide à la décision",
          subjects: [
            {
              name: "Simulation à flux discrets",
              coef: 4.0,
            },
            {
              name: "Modélisation des processus aléatoires",
              coef: 2.0,
            },
            {
              name: "Outils d'aide à la décision",
              coef: 3.0,
            },
            {
              name: "Recherche Opérationnelle",
              coef: 2.0,
            },
          ],
          ects: 6,
        },
      ],
    },
    {
      name: "F4",
      ues: [
        {
          name: "Science des données",
          subjects: [
            {
              name: "Bases de données et fouille de données",
              coef: 2.0,
            },
            {
              name: "Statistiques",
              coef: 2.0,
            },
            {
              name: "Matlab",
              coef: 2.0,
            },
            {
              name: "Imagerie Vision",
              coef: 2.0,
            },
            {
              name: "Apprentissage statistique",
              coef: 2.5,
            },
          ],
          ects: 5,
        },
        {
          name: "Calcul scientifique",
          subjects: [
            {
              name: "Éléments finis",
              coef: 4.0,
            },
            {
              name: "Méthodes de différences finies",
              coef: 1.5,
            },
            {
              name: "Mécanique du solide",
              coef: 2.0,
            },
            {
              name: "Intégration et Distributions",
              coef: 4.0,
            },
          ],
          ects: 6,
        },
        {
          name: "Recherche opérationnelle et optimisation",
          subjects: [
            {
              name: "Recherche Opérationnelle",
              coef: 3.5,
            },
            {
              name: "Modélisation des processus aléatoires",
              coef: 2.0,
            },
            {
              name: "Optimisation",
              coef: 1.5,
            },
          ],
          ects: 4,
        },
      ],
    },
    {
      name: "F5",
      ues: [
        {
          name: "Informatique avancée",
          subjects: [
            {
              name: "Certification industrielle",
              coef: 2.0,
            },
            {
              name: "Services Web .NET C#",
              coef: 3.0,
            },
            {
              name: "Cloud",
              coef: 2.0,
            },
            {
              name: "Intégration continue pour le web",
              coef: 2.0,
            },
          ],
          ects: 5,
        },
        {
          name: "Sécurité des couches réseaux",
          subjects: [
            {
              name: "Sécurisation des protocoles réseaux",
              coef: 2.0,
            },
            {
              name: "Sécurité des objets connectés",
              coef: 2.0,
            },
            {
              name: "Sécurisation active des systèmes en réseau",
              coef: 2.0,
            },
            {
              name: "Transmission de données sécurisée",
              coef: 2.0,
            },
          ],
          ects: 5,
        },
        {
          name: "Sécurité des couches applicatives",
          subjects: [
            {
              name: "Sécurité Web",
              coef: 2.0,
            },
            {
              name: "Systèmes d'exploitation",
              coef: 2.0,
            },
            {
              name: "Analyse de malware - Rétroingénierie",
              coef: 2.0,
            },
            {
              name: "Tests d'intrusion (pentest)",
              coef: 2.0,
            },
          ],
          ects: 5,
        },
      ],
    },
  ],
}

const ZZ2_Semester2: SemesterData = {
  sectors: [
    {
      name: "Tronc commun",
      ues: [
        {
          name: "Projet",
          subjects: [
            {
              name: "Projet",
              coef: 1.0,
            },
          ],
          ects: 3,
        },
        {
          name: "Stage",
          subjects: [
            {
              name: "Stage",
              coef: 1.0,
            },
          ],
          ects: 27,
        },
      ],
    },
  ],
}

const ZZ2Data: Year = {
  name: "ZZ2",
  semesters: [ZZ2_Semester1, ZZ2_Semester2],
}

export default ZZ2Data
