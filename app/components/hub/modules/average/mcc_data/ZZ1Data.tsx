import { SubjectData, UEData, SectorData, SemesterData, Year } from "../types"

const ZZ1_Semester1: SemesterData = {
  sectors: [
    {
      name: "Tronc commun",
      ues: [
        {
          name: "Sciences Humaines et Sociales",
          subjects: [
            {
              name: "Anglais",
              coef: 1.0,
            },
            {
              name: "LV2",
              coef: 1.0,
            },
            {
              name: "Management et organisation des entreprises",
              coef: 1.0,
            },
          ],
          ects: 5,
        },
        {
          name: "Informatique",
          subjects: [
            {
              name: "C / Unix",
              coef: 2.5,
            },
            {
              name: "SDD",
              coef: 2.5,
            },
            {
              name: "Programmation fonctionnelle",
              coef: 1.0,
            },
            {
              name: "Automates",
              coef: 1.0,
            },
          ],
          ects: 12,
        },
        {
          name: "Sciences de l'ingénieur",
          subjects: [
            {
              name: "Physique",
              coef: 1.0,
            },
            {
              name: "Transmission de données",
              coef: 1.0,
            },
            {
              name: "Traitement du signal",
              coef: 1.0,
            },
            {
              name: "Conception de systèmes numériques",
              coef: 1.5,
            },
          ],
          ects: 8,
        },
        {
          name: "Maths",
          subjects: [
            {
              name: "Graphes",
              coef: 1.0,
            },
            {
              name: "Probabilités",
              coef: 1.0,
            },
            {
              name: "Analyse numérique",
              coef: 1.0,
            },
            {
              name: "Soutien maths",
              coef: 2.0,
            },
          ],
          ects: 5,
        },
      ],
    },
  ],
}

const ZZ1_Semester2: SemesterData = {
  sectors: [
    {
      name: "Tronc commun",
      ues: [
        {
          name: "Sciences Humaines et Sociales",
          subjects: [
            {
              name: "Anglais",
              coef: 1.0,
            },
            {
              name: "LV2",
              coef: 1.0,
            },
            {
              name: "Communication",
              coef: 1.0,
            },
          ],
          ects: 5,
        },
        {
          name: "Informatique",
          subjects: [
            {
              name: "SDD",
              coef: 1.5,
            },
            {
              name: "Bases de données",
              coef: 1.0,
            },
            {
              name: "Cybersécurité",
              coef: 1.0,
            },
            {
              name: "Systèmes d'exploitation",
              coef: 1.0,
            },
          ],
          ects: 9,
        },
        {
          name: "Sciences de l'ingénieur",
          subjects: [
            {
              name: "TPs Physique",
              coef: 3.0,
            },
            {
              name: "TPs Transmission de données",
              coef: 3.0,
            },
            {
              name: "Automatique",
              coef: 4.0,
            },
          ],
          ects: 5,
        },
        {
          name: "Maths",
          subjects: [
            {
              name: "Analyse numérique",
              coef: 1.0,
            },
            {
              name: "Calcul diff",
              coef: 1.0,
            },
            {
              name: "Programmation linéaire",
              coef: 1.0,
            },
            {
              name: "Analyse de données",
              coef: 1.0,
            },
            {
              name: "Probabilités",
              coef: 1.0,
            },
            {
              name: "Soutien maths",
              coef: 1.0,
            },
          ],
          ects: 8,
        },
        {
          name: "Professionalisation",
          subjects: [
            {
              name: "Projet / Stage",
              coef: 1.0,
            },
          ],
          ects: 2,
        },
      ],
    },
  ],
}

const ZZ1Data: Year = {
  name: "ZZ1",
  semesters: [ZZ1_Semester1, ZZ1_Semester2],
}

export default ZZ1Data
