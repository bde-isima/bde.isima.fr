interface SubjectData {
  coefficient: number
  mark: number | null
  name: string
}

interface UEData {
  name: string
  subjects: SubjectData[]
}

interface SectorData {
  name: string
  semesters: UEData[][]
}

interface MCCData {
  ZZ1: UEData[][]
  ZZ2: SectorData[]
  ZZ3: SectorData[]
}

export let AverageData: MCCData = {
  ZZ1: [
    [
      {
        name: "Sciences Humaines et Sociales",
        subjects: [
          {
            name: "Anglais",
            mark: 5,
            coefficient: 1,
          },
          {
            name: "LV2",
            mark: null,
            coefficient: 1,
          },
          {
            name: "Management et organisation des entreprises",
            mark: null,
            coefficient: 1,
          },
        ],
      },
      {
        name: "Informatique",
        subjects: [
          {
            name: "Language C et Unix",
            mark: null,
            coefficient: 2.5,
          },
          {
            name: "SDD",
            mark: null,
            coefficient: 2.5,
          },
          {
            name: "Programmation fonctionnelle",
            mark: null,
            coefficient: 1,
          },
          {
            name: "Automates",
            mark: null,
            coefficient: 1,
          },
        ],
      },
      {
        name: "Sciences de l'ingénieur",
        subjects: [
          {
            name: "Physique",
            mark: null,
            coefficient: 1,
          },
          {
            name: "Transmission de données",
            mark: null,
            coefficient: 1,
          },
          {
            name: "Traitement du signal",
            mark: null,
            coefficient: 1,
          },
          {
            name: "Conception de systèmes numériques",
            mark: null,
            coefficient: 1.5,
          },
        ],
      },
      {
        name: "Aide à la décision et mathématiques appliquées",
        subjects: [
          {
            name: "Graphes",
            mark: null,
            coefficient: 1,
          },
          {
            name: "Probabilités",
            mark: null,
            coefficient: 1,
          },
          {
            name: "Analyse numérique",
            mark: null,
            coefficient: 1,
          },
          {
            name: "Soutien maths",
            mark: null,
            coefficient: 2,
          },
        ],
      },
    ],
    [
      {
        name: "Sciences Humaines et Sociales",
        subjects: [
          {
            name: "Anglais",
            mark: null,
            coefficient: 1,
          },
          {
            name: "LV2",
            mark: null,
            coefficient: 1,
          },
          {
            name: "Communication",
            mark: null,
            coefficient: 1,
          },
        ],
      },
      {
        name: "Informatique",
        subjects: [
          {
            name: "SDD",
            mark: null,
            coefficient: 1.5,
          },
          {
            name: "Base de données",
            mark: null,
            coefficient: 1,
          },
          {
            name: "Sensibilisation à la cybersécurité",
            mark: null,
            coefficient: 1,
          },
          {
            name: "Systèmes d'exploitation",
            mark: null,
            coefficient: 1,
          },
        ],
      },
      {
        name: "Sciences de l'ingénieur",
        subjects: [
          {
            name: "TP Physique",
            mark: null,
            coefficient: 3,
          },
          {
            name: "TP Transmission de données",
            mark: null,
            coefficient: 3,
          },
          {
            name: "Automatique",
            mark: null,
            coefficient: 4,
          },
        ],
      },
      {
        name: "Aide à la décision et mathématiques appliquées",
        subjects: [
          {
            name: "Analyse numérique",
            mark: null,
            coefficient: 1,
          },
          {
            name: "Calcul différentiel",
            mark: null,
            coefficient: 1,
          },
          {
            name: "Programmation linéaire",
            mark: null,
            coefficient: 1,
          },
          {
            name: "Analyse de données",
            mark: null,
            coefficient: 1,
          },
          {
            name: "Probabilités",
            mark: null,
            coefficient: 1,
          },
          {
            name: "Soutien maths",
            mark: null,
            coefficient: 1,
          },
        ],
      },
    ],
  ],
  ZZ2: [
    {
      name: "Tronc commun",
      semesters: [
        [
          {
            name: "Sciences humaines et sociales",
            subjects: [
              {
                name: "Anglais",
                coefficient: 4,
                mark: null,
              },
              {
                name: "LV2",
                coefficient: 4,
                mark: null,
              },
              {
                name: "Droit",
                coefficient: 2,
                mark: null,
              },
              {
                name: "Expression et communication",
                coefficient: 2,
                mark: null,
              },
              {
                name: "Gestion",
                coefficient: 2,
                mark: null,
              },
              {
                name: "Conduite de projet",
                coefficient: 2,
                mark: null,
              },
            ],
          },
        ],
      ],
    },
  ],
  ZZ3: [],
}

export default AverageData
export type { SubjectData, UEData, MCCData }
