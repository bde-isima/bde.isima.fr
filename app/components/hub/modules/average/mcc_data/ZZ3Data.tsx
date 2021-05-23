import { SubjectData, UEData, SectorData, SemesterData, Year } from "../types"

const ZZ3_Semester1: SemesterData = {
  sectors: [
    {
      name: "Tronc commun",
      ues: [
        {
          name: "Langues",
          subjects: [
            {
              name: "Anglais",
              coef: 2.0,
            },
            {
              name: "LV2",
              coef: 2.0,
            },
          ],
          ects: 3,
        },
        {
          name: "Tertiaire",
          subjects: [
            {
              name: "Droit",
              coef: 2.0,
            },
            {
              name: "Communication",
              coef: 3.0,
            },
            {
              name: "Intelligence économique",
              coef: 1.0,
            },
            {
              name: "Ethique, déontologie et développement durable",
              coef: 2.0,
            },
          ],
          ects: 4,
        },
        {
          name: "Méthodes et outils de développement logiciel",
          subjects: [
            {
              name: "Méthodes et outils de développement logiciel",
              coef: 4.0,
            },
          ],
          ects: 3,
        },
        {
          name: "Projet",
          subjects: [
            {
              name: "Projet",
              coef: 5.0,
            },
          ],
          ects: 5,
        },
      ],
    },
    {
      name: "F1",
      ues: [
        {
          name: "Programmation avancée",
          subjects: [
            {
              name: "Programmation d'applications mobiles",
              coef: 3.0,
            },
            {
              name: "Sécurité des systèmes embarqués",
              coef: 2.0,
            },
          ],
          ects: 3,
        },
        {
          name: "Programmation embarquée",
          subjects: [
            {
              name: "Programmation FPGA - VHDL",
              coef: 3.0,
            },
            {
              name: "Programmation temps réel",
              coef: 3.0,
            },
          ],
          ects: 4,
        },
        {
          name: "Outils et méthodes de réalité virtuelle",
          subjects: [
            {
              name: "Programmation GPGPU",
              coef: 2.0,
            },
            {
              name: "Réalité augmentée et mixte",
              coef: 3.0,
            },
            {
              name: "Géométrie algorithmique",
              coef: 2.0,
            },
          ],
          ects: 4,
        },
        {
          name: "Systèmes interactifs",
          subjects: [
            {
              name: "Intégration capteurs pour la robotique",
              coef: 2.0,
            },
            {
              name: "Objets connectés",
              coef: 2.0,
            },
            {
              name: "Robotique mobile",
              coef: 3.0,
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
              name: "Sécurité réseaux",
              coef: 2.0,
            },
            {
              name: "Ecosystèmes Javascript",
              coef: 4.0,
            },
          ],
          ects: 3,
        },
        {
          name: "Génie logiciel et développement",
          subjects: [
            {
              name: "DevOps",
              coef: 2.0,
            },
            {
              name: "Programmation d'applications mobiles (PAM)",
              coef: 3.0,
            },
            {
              name: "Ingénierie des Modèles et Simulation",
              coef: 3.0,
            },
            {
              name: "Algorithmique pour le calcul parallèle",
              coef: 2.0,
            },
          ],
          ects: 5,
        },
        {
          name: "Modélisation et calcul",
          subjects: [
            {
              name: "Grilles de Calcul et Cloud",
              coef: 2.0,
            },
            {
              name: "Apprentissage profond",
              coef: 2.0,
            },
            {
              name: "Algorithmique de l'aide à la décision",
              coef: 2.0,
            },
          ],
          ects: 3,
        },
        {
          name: "Informatique pour l'entreprise",
          subjects: [
            {
              name: "Intégration d'applications",
              coef: 3.0,
            },
            {
              name: "Administration sécurisée des bases de données",
              coef: 3.0,
            },
            {
              name: "Conception d'applications Java Professionnelles",
              coef: 2.0,
            },
          ],
          ects: 4,
        },
      ],
    },
    {
      name: "F3",
      ues: [
        {
          name: "Connaissances et modélisation des entreprises",
          subjects: [
            {
              name: "Modélisation et Gestion intégrée de la chaîne logistique",
              coef: 3.0,
            },
            {
              name: "R.O. et I.A. pour la productique",
              coef: 2.0,
            },
            {
              name: "Business Intelligence",
              coef: 4.0,
            },
          ],
          ects: 5,
        },
        {
          name: "Ingénierie des systèmes d'information",
          subjects: [
            {
              name: "Intégration d'applicationss",
              coef: 2.0,
            },
            {
              name: "Web Services",
              coef: 2.0,
            },
            {
              name: "Systèmes d'information",
              coef: 2.0,
            },
            {
              name: "Administration des bases de données",
              coef: 4.0,
            },
          ],
          ects: 6,
        },
        {
          name: "Modélisation pour l'aide à la décision",
          subjects: [
            {
              name: "Algorithmique de l'aide à la décision",
              coef: 2.0,
            },
            {
              name: "Big Data",
              coef: 2.0,
            },
            {
              name: "Evaluation et optimisation des systèmes",
              coef: 2.0,
            },
          ],
          ects: 4,
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
              name: "Apprentissage profond",
              coef: 2.0,
            },
            {
              name: "Big mcc_data",
              coef: 2.0,
            },
          ],
          ects: 3,
        },
        {
          name: "Recherche opérationnelle et optimisation",
          subjects: [
            {
              name: "Etude de cas en R.O.",
              coef: 3.0,
            },
            {
              name: "Optimisation des systèmes complexes",
              coef: 2.0,
            },
            {
              name: "Programmation Non Linéaire",
              coef: 2.0,
            },
            {
              name: "Optimisation Convexe",
              coef: 1.5,
            },
          ],
          ects: 5,
        },
        {
          name: "Calcul scientifique",
          subjects: [
            {
              name: "Equations aux Dérivées Partielles",
              coef: 4.0,
            },
            {
              name: "Algorithmique pour le Calcul Parallèle",
              coef: 2.5,
            },
            {
              name: "Méthodes de décomposition de domaines",
              coef: 1.0,
            },
          ],
          ects: 4,
        },
        {
          name: "Langage et Applications",
          subjects: [
            {
              name: "Compléments de Génie Logiciel (JAVA)",
              coef: 1.5,
            },
            {
              name: "Eléments de CAO",
              coef: 1.5,
            },
            {
              name: "Mécanique du solide",
              coef: 2,
            },
          ],
          ects: 3,
        },
      ],
    },
    {
      name: "F5",
      ues: [
        {
          name: "Réseaux",
          subjects: [
            {
              name: "Certification industrielle",
              coef: 2.0,
            },
            {
              name: "Routage",
              coef: 2.0,
            },
          ],
          ects: 3,
        },
        {
          name: "Informatique des réseaux",
          subjects: [
            {
              name: "Administration sécurisée des bases de données",
              coef: 2.0,
            },
            {
              name: "Développement web (JEE)",
              coef: 2.0,
            },
            {
              name: "Programmation objet avancée",
              coef: 2.0,
            },
            {
              name: "Technologie des conteneurs",
              coef: 2.0,
            },
            {
              name: "Programmation d'applications mobiles",
              coef: 3.0,
            },
          ],
          ects: 6,
        },
        {
          name: "Sécurité",
          subjects: [
            {
              name: "Théorie des codes et cryptographie",
              coef: 3.0,
            },
            {
              name: "Politique de sécurité",
              coef: 2.0,
            },
            {
              name: "Analyse post-mortem (Forensic)",
              coef: 2.0,
            },
            {
              name: "Sécurité réseaux",
              coef: 2.0,
            },
            {
              name: "Architecture d'un réseau sécurisé",
              coef: 2.0,
            },
          ],
          ects: 6,
        },
      ],
    },
  ],
}

const ZZ3_Semester2: SemesterData = {
  sectors: [
    {
      name: "Tronc commun",
      ues: [
        {
          name: "Projet de fin d'étude",
          subjects: [
            {
              name: "Projet de fin d'étude",
              coef: 1.0,
            },
          ],
          ects: 30,
        },
      ],
    },
  ],
}

const ZZ3Data: Year = {
  name: "ZZ3",
  semesters: [ZZ3_Semester1, ZZ3_Semester2],
}

export default ZZ3Data
