export const getRecipe = async (healthData) => {
    // Replace localhost with  deployed server URL 
    const response = await fetch('http://localhost:3000/recipe', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          calories: healthData.calories || 2000,  // 2000 if no data
      }),
    });
    const data = await response.json();
    return data.recipe;  
  };
  