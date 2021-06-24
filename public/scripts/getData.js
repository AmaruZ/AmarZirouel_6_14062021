export async function fetchPhotographersJSON(){
    const response = await fetch("/public/scripts/FishEyeData.json");
    const data = await response.json();
    return data;
}