import * as types from "../../types";

export const mockCompanies: types.Company[] = [
    {
        id: "0", name: "Zeroth Company", imgUrl: "zeroth-company.jpg", 
        description: "This is the zeroth company", comments: [],
        jobs: [
            {
                id: "0", name: "Software Engineer I", 
                description: "This is software engineer I",
                salary: 100312, location: "Mumbai, Maharashtra"
            },
            {
                id: "1", name: "SDE III", 
                description: "This is an SDE 3",
                salary: 910312, location: "Kochi, Kerala"
            }
        ]
    },
    {
        id: "1", name: "First Company", imgUrl: "first-company.jpg", 
        description: "This is the first company", comments: [],
        jobs: [
            {
                id: "2", name: "Test Engineer", 
                description: "Test our software",
                salary: 100312, location: "Dubai, UAE"
            }
        ]
    },
    {
        id: "2", name: "Second Company", imgUrl: "second-company.jpg", 
        description: "This is the second company", comments: [],
        jobs: []
    },
    {
        id: "3", name: "Third Company", imgUrl: "third-company.jpg", 
        description: "This is the third company", comments: [],
        jobs: [
            {
                id: "3", name: "Computer Scientist IV", 
                description: "compute science is amazing",
                salary: 50010, location: "Bangalore"
            }
        ]
    }
];