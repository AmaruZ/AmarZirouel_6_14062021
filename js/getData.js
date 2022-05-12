export async function fetchPhotographersJSON(){
    const response = await fetch("../assets/data/FishEyeData.json");
    const data = await response.json();
    return data;
}