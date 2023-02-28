import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';


const AppContext = React.createContext();

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=a'
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'


const AppProvider = ({ children }) => {

    // const [meals, setMeals] = useState(JSON.parse(localStorage.getItem('mealsList')) ||  )
    const [loading, setLoading] = useState(false);
    const [meals, setMeals] = useState([]);

    // const fetchMeals = async () => {
    //     try {
    //         const response = await fetch('www.themealdb.com/api/json/v1/1/search.php?s=a')
    //         const data = await response.json();
    //         console.log(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     fetchMeals();
    // }, []);

    const fetchMeals = async (url) => {
        setLoading(true);
        try {
            const {data} = await axios(url)
            
            if (data.meals) {
                setMeals(data.meals);
            } else {
                setMeals([]);
            }
            
        } catch (error) {
            console.log(error.response)
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchMeals(allMealsUrl)
    }, [])

    return <AppContext.Provider value={{ loading, meals }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider };
