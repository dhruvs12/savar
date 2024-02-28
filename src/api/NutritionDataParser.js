import { NUTRIENT_IDS } from "../constants/nutrientIds";

export const getFullNutrientMap = (foodNutrients) => {
    const nutrientMap = foodNutrients.reduce((acc, item) => {
        const nutrientId = item.nutrient.id;
        acc[nutrientId] = {
            name: item.nutrient.name,
            amount: item.amount,
            unit: item.nutrient.unitName
        };
        return acc;
    }, {});
    return nutrientMap;
}

export const getCoreNutritionData = (nutrientMap) => {
    return {
        calories: getNutrientValue(nutrientMap, NUTRIENT_IDS.CALORIES),  
        totalFat: getNutrientValue(nutrientMap, NUTRIENT_IDS.TOTAL_FAT, NUTRIENT_IDS.TOTAL_FAT_NLEA),  
        saturatedFat: getNutrientValue(nutrientMap, NUTRIENT_IDS.SATURATED_FAT),  
        transFat: getNutrientValue(nutrientMap, NUTRIENT_IDS.TRANS_FAT),  
        cholesterol: getNutrientValue(nutrientMap, NUTRIENT_IDS.CHOLESTEROL),  
        sodium: getNutrientValue(nutrientMap, NUTRIENT_IDS.SODIUM),  
        totalCarbohydrate: getNutrientValue(nutrientMap, NUTRIENT_IDS.TOTAL_CARB),  
        dietaryFiber: getNutrientValue(nutrientMap, NUTRIENT_IDS.DIETARY_FIBER),  
        totalSugar: getNutrientValue(nutrientMap, NUTRIENT_IDS.TOTAL_SUGAR, NUTRIENT_IDS.TOTAL_SUGAR_NLEA),  
        addedSugars: getNutrientValue(nutrientMap, NUTRIENT_IDS.ADDED_SUGAR),  
        protein: getNutrientValue(nutrientMap, NUTRIENT_IDS.PROTEIN),  
        vitaminD: getNutrientValue(nutrientMap, NUTRIENT_IDS.VITAMIN_D),  
        calcium: getNutrientValue(nutrientMap, NUTRIENT_IDS.CALCIUM),  
        iron: getNutrientValue(nutrientMap, NUTRIENT_IDS.IRON),  
        potassium: getNutrientValue(nutrientMap, NUTRIENT_IDS.POTASSIUM),  
    };
}

const getNutrientValue = (nutrients, primaryId, secondaryId = null) => {
    const primaryNutrient = nutrients[primaryId];
    if (primaryNutrient) {
        return {
            amount: primaryNutrient.amount,
            unit: primaryNutrient.unit
        };
    } else if (secondaryId) {
        const secondaryNutrient = nutrients[secondaryId];
        if (secondaryNutrient) {
            return {
                amount: secondaryNutrient.amount,
                unit: secondaryNutrient.unit
            };
        }
    }
    return 'N/A'
};

