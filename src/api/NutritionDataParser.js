/* 
NUTRIENT DATA PARSER FOR FOOD DATA CENTRAL API
*/

import { NUTRIENT_IDS } from "../constants/nutrientIds";
const STANDARD_SERVING_SIZE = 100;

export const getPortions = (foodData) => {
    if (foodData.foodPortions && foodData.foodPortions.length > 0) {
        const sortedFoodPortions = [...foodData.foodPortions].sort((a, b) => a.gramWeight - b.gramWeight);
        return sortedFoodPortions.map((portion) => {
            return {
                description: portion.portionDescription || portion.modifier,
                amount: portion.gramWeight,
                unit: 'g'
            };
        });
    } else if (foodData.servingSize && foodData.servingSizeUnit) {
        console.log(foodData.servingSizeUnit);
        if (!(foodData.servingSizeUnit == 'g' || foodData.servingSizeUnit == 'ml' || foodData.servingSizeUnit == 'MLT')) {
            throw new Error('Got serving size that is not gram or ml');
        }
        return [{
            description: "Standard Serving Size",
            amount: foodData.servingSize,
            unit: foodData.servingSizeUnit
        }];
    } else {
        throw new Error('You found a special food');
    }
}

export const getRatioFullNutrientMap = (standardSizeFullNutrientMap, gramWeight) => {
    console.log(standardSizeFullNutrientMap);
    const ratio = gramWeight / STANDARD_SERVING_SIZE;
    const ratioNutrientMap = {};

    Object.entries(standardSizeFullNutrientMap).forEach(([nutrientId, nutrientInfo]) => {
        if (nutrientInfo.amount !== undefined) {
            ratioNutrientMap[nutrientId] = {
                ...nutrientInfo,
                amount: parseFloat((nutrientInfo.amount * ratio))
            };
        } else {
            ratioNutrientMap[nutrientId] = { ...nutrientInfo };
        }
    });
    return ratioNutrientMap;
}

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
        calories: getNutrient(nutrientMap, NUTRIENT_IDS.CALORIES),
        totalFat: getNutrient(nutrientMap, NUTRIENT_IDS.TOTAL_FAT, NUTRIENT_IDS.TOTAL_FAT_NLEA),
        saturatedFat: getNutrient(nutrientMap, NUTRIENT_IDS.SATURATED_FAT),
        transFat: getNutrient(nutrientMap, NUTRIENT_IDS.TRANS_FAT),
        cholesterol: getNutrient(nutrientMap, NUTRIENT_IDS.CHOLESTEROL),
        sodium: getNutrient(nutrientMap, NUTRIENT_IDS.SODIUM),
        totalCarbohydrate: getNutrient(nutrientMap, NUTRIENT_IDS.TOTAL_CARB),
        dietaryFiber: getNutrient(nutrientMap, NUTRIENT_IDS.DIETARY_FIBER),
        totalSugar: getNutrient(nutrientMap, NUTRIENT_IDS.TOTAL_SUGAR, NUTRIENT_IDS.TOTAL_SUGAR_NLEA),
        addedSugars: getNutrient(nutrientMap, NUTRIENT_IDS.ADDED_SUGAR),
        protein: getNutrient(nutrientMap, NUTRIENT_IDS.PROTEIN),
        vitaminD: getNutrient(nutrientMap, NUTRIENT_IDS.VITAMIN_D),
        calcium: getNutrient(nutrientMap, NUTRIENT_IDS.CALCIUM),
        iron: getNutrient(nutrientMap, NUTRIENT_IDS.IRON),
        potassium: getNutrient(nutrientMap, NUTRIENT_IDS.POTASSIUM),
    };
}

const getNutrient = (nutrientMap, primaryId, secondaryId=null) => {
    const primaryNutrient = nutrientMap[primaryId];
    if (primaryNutrient) {
        return {
            amount: primaryNutrient.amount,
            unit: primaryNutrient.unit
        };
    } else if (secondaryId) {
        const secondaryNutrient = nutrientMap[secondaryId];    
        if (secondaryNutrient) {
            return {
                amount: secondaryNutrient.amount,
                unit: secondaryNutrient.unit
            };
        }
    }

}

