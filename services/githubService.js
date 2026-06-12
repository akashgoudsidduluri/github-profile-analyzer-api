const axios = require("axios");
async function fetchGithubProfile(username){
    const response = await axios.get(
        `https://api.github.com/users/${username}`
    );
    return response.data;
}

module.exports = {
    fetchGithubProfile
};