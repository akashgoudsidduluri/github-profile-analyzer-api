const connection = require("../config/db");
const { fetchGithubProfile } = require("../services/githubService");

async function getGithubProfile(req, res) {
    try {
        const username = req.params.username;
        const data = await fetchGithubProfile(username);

        res.json({
            username: data.login,
            name: data.name,
            followers: data.followers,
            following: data.following,
            publicRepos: data.public_repos,
            publicGists: data.public_gists,
            profileUrl: data.html_url,
            avatarUrl: data.avatar_url,
            accountCreated: data.created_at
        });
    } catch (error) {
        res.status(404).json({
            message: "User not found"
        });
    }
}

async function postGithubProfile(req,res){
    try{
        const username = req.params.username;
        const data = await fetchGithubProfile(username);
        
        const values = [
        data.login,
        data.name,
        data.followers,
        data.following,
        data.public_repos,
        data.public_gists,
        data.html_url,
        data.avatar_url,
        new Date(data.created_at)
        ];
        const query = `INSERT INTO github_profiles(
        username,
        name,
        followers,
        following,
        public_repos,
        public_gists,
        profile_url,
        avatar_url,
        account_created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)

        ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        followers = VALUES(followers),
        following = VALUES(following),
        public_repos = VALUES(public_repos),
        public_gists = VALUES(public_gists),
        profile_url = VALUES(profile_url),
        avatar_url = VALUES(avatar_url),
        account_created_at = VALUES(account_created_at)
        `;
        connection.query(query, values, (err, result) => {
            if(err){
                return res.status(500).json({
                    message: err.message
                });
            }
            res.json({
                message: "Profile stored successfully"
            });
        });
    }
    catch(error){
        if(error.response?.status === 404){
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(500).json({
            message: "Something went wrong"
        });
    }
}
async function getAllProfiles(req,res){
    const query = "SELECT * FROM github_profiles";
    connection.query(query, (err, results) => {
        if(err){
            return res.status(500).json({
                message: err.message
            });
        }
        res.json(results);
    });
}
async function getSingleProfile(req, res) {
    const username = req.params.username;

    const query = `
    SELECT * FROM github_profiles
    WHERE username = ?
    `;

    connection.query(query, [username], (err, result) => {
        if(err){
            return res.status(500).json({
                message: err.message
            });
        }

        if(result.length === 0){
            return res.status(404).json({
                message: "Profile not found"
            });
        }
        res.json(result[0]);
    });
}
module.exports = {
    getGithubProfile,
    postGithubProfile,
    getAllProfiles,
    getSingleProfile
};

