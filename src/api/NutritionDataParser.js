/* 
NUTRIENT DATA PARSER FOR FOOD DATA CENTRAL API
*/

import { NUTRIENT_IDS } from "../constants/nutrientIds";
const STANDARD_SERVING_SIZE = 100;

export const parse_data_food_portions = (foodData) => {
    if (foodData.foodPortions && foodData.foodPortions.length > 0) {
        const nutrientMap = getFullNutrientMap(foodData.foodNutrients);
        const sortedFoodPortions = [...foodData.foodPortions].sort((a, b) => a.gramWeight - b.gramWeight);
        let coreNutritionArr = [];
        for (let sortedFoodPortion of sortedFoodPortions) {
            let coreNutritionData = getCoreNutritionData(nutrientMap, sortedFoodPortion.gramWeight, STANDARD_SERVING_SIZE);
            coreNutritionData['gramWeight'] = sortedFoodPortion.gramWeight
            coreNutritionData['portionDescription'] = sortedFoodPortion.portionDescription ? sortedFoodPortion.portionDescription : sortedFoodPortion.modifier;
            coreNutritionArr.push(coreNutritionData);
        }
        return coreNutritionArr;
    }
    return null;
}

export const parse_data_serving_size = (foodData) => {
    if (foodData.servingSize && foodData.servingSizeUnit) {
        const nutrientMap = getFullNutrientMap(foodData.foodNutrients);
        if (foodData.servingSizeUnit == 'g' || foodData.servingSizeUnit == 'ml' || foodData.servingSizeUnit == 'MLT') {
            let coreNutritionData = getCoreNutritionData(nutrientMap, foodData.servingSize, STANDARD_SERVING_SIZE);
            coreNutritionData['gramWeight'] = foodData.servingSize
            coreNutritionData['portionDescription'] = "serving size"
            return coreNutritionData;
        }
        throw new Error('Got serving size that is not gram or ml');
    }
    return null;
}

export const parse_data_standard_serving = (foodData) => {
    const nutrientMap = getFullNutrientMap(foodData.foodNutrients);
    let coreNutritionData = getCoreNutritionData(nutrientMap, STANDARD_SERVING_SIZE, STANDARD_SERVING_SIZE);   
    coreNutritionData['gramWeight'] = STANDARD_SERVING_SIZE;
    coreNutritionData['portionDescription'] = "default serving size of 100g/ml";
    return coreNutritionData;
}

// HELPER FUNCTIONS

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

export const getCoreNutritionData = (nutrientMap, gramWeight, standardServingSize) => {
    return {
        calories: getNutrient(nutrientMap, NUTRIENT_IDS.CALORIES, gramWeight, standardServingSize),
        totalFat: getNutrient(nutrientMap, NUTRIENT_IDS.TOTAL_FAT, gramWeight, standardServingSize, NUTRIENT_IDS.TOTAL_FAT_NLEA),
        saturatedFat: getNutrient(nutrientMap, NUTRIENT_IDS.SATURATED_FAT, gramWeight, standardServingSize),
        transFat: getNutrient(nutrientMap, NUTRIENT_IDS.TRANS_FAT, gramWeight, standardServingSize),
        cholesterol: getNutrient(nutrientMap, NUTRIENT_IDS.CHOLESTEROL, gramWeight, standardServingSize),
        sodium: getNutrient(nutrientMap, NUTRIENT_IDS.SODIUM, gramWeight, standardServingSize),
        totalCarbohydrate: getNutrient(nutrientMap, NUTRIENT_IDS.TOTAL_CARB, gramWeight, standardServingSize),
        dietaryFiber: getNutrient(nutrientMap, NUTRIENT_IDS.DIETARY_FIBER, gramWeight, standardServingSize),
        totalSugar: getNutrient(nutrientMap, NUTRIENT_IDS.TOTAL_SUGAR, gramWeight, standardServingSize, NUTRIENT_IDS.TOTAL_SUGAR_NLEA),
        addedSugars: getNutrient(nutrientMap, NUTRIENT_IDS.ADDED_SUGAR, gramWeight, standardServingSize),
        protein: getNutrient(nutrientMap, NUTRIENT_IDS.PROTEIN, gramWeight, standardServingSize),
        vitaminD: getNutrient(nutrientMap, NUTRIENT_IDS.VITAMIN_D, gramWeight, standardServingSize),
        calcium: getNutrient(nutrientMap, NUTRIENT_IDS.CALCIUM, gramWeight, standardServingSize),
        iron: getNutrient(nutrientMap, NUTRIENT_IDS.IRON, gramWeight, standardServingSize),
        potassium: getNutrient(nutrientMap, NUTRIENT_IDS.POTASSIUM, gramWeight, standardServingSize),
    };
}

const getNutrient = (nutrientMap, primaryId, gramWeight, standardServingSize, secondaryId=null) => {
    
    const scaleAmount = (amount) => {
        if (!standardServingSize || standardServingSize === 0) {
            return amount;
        }
        return (amount * gramWeight) / standardServingSize;
    }

    const primaryNutrient = nutrientMap[primaryId];
    if (primaryNutrient) {
        return {
            amount: scaleAmount(primaryNutrient.amount),
            unit: primaryNutrient.unit
        };
    } else if (secondaryId) {
        const secondaryNutrient = nutrientMap[secondaryId];    
        if (secondaryNutrient) {
            return {
                amount: scaleAmount(secondaryNutrient.amount),
                unit: secondaryNutrient.unit
            };
        }
    }

}

