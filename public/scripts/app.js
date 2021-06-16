
let photographers= {};



fetch("./scripts/FishEyeData.json")
    .then(function(resp){
        return resp.json();
    })
    .then(function(data){
        for (let photographer in data.photographers){
            photographers[photographer] = data.photographers[photographer];
            console.log(photographers[photographer])
        }
    });
    