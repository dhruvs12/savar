
import Axios from "axios";
import { getDiaryNamesFromPastWeek } from "./FirestoreService";

const APP_ID = "89467cf5";
const APP_KEY = "3e6786aaf09b0d7c07ec39a962ab08e5";

export const fetchRecipes = async (query) => {
    try {
        const response = await Axios.get(
            `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&to=10`
        );
        const validRecipes = response.data.hits.filter(
            (hit) => hit.recipe && hit.recipe.image
        );
        return validRecipes;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        Alert.alert("Error", "Failed to fetch recipes. Please try again later.");
    }
};

export const fetchRecipesFromDiaryEntries = async () => {
    const diaryEntries = await getDiaryNamesFromPastWeek();
    console.log(diaryEntries);
    try {
        const response = await Axios.post(
            'http://127.0.0.1:5000/generate-recipes',
            JSON.stringify(diaryEntries),
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response.data.recipes; // Assuming the server responds with an object that includes a `recipes` array
    } catch (error) {
        console.error("Error fetching recipes from diary:", error);
        Alert.alert("Error", "Failed to fetch diary-based recipes. Please try again later.");
    }
};