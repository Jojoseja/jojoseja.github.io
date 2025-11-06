class repository{
    //ToDo: Add repository class
}

async function loadRepositories(){
    try {
        const response = await fetch(`https://api.github.com/users/jojoseja/repos?sort=updated&per_page=20`);
        var res = await response.json();
        console.log(typeof(res));
        res.forEach(element => {
            console.log(element);
        });
        return res;
    } catch (error){
        console.log("Error");
    }
}

loadRepositories();

