const axios = require('axios');

const chalk  = require('chalk');

// var urlRoot = "https://api.github.com";
// NCSU Enterprise endpoint:
var urlRoot = "https://github.ncsu.edu/api/v3";

var config = {};
// Retrieve our api token from the environment variables.
config.token = process.env.GITHUBTOKEN;

if( !config.token )
{
	console.log(chalk`{red.bold GITHUBTOKEN is not defined!}`);
	console.log(`Please set your environment variables with appropriate token.`);
	console.log(chalk`{italic You may need to refresh your shell in order for your changes to take place.}`);
	process.exit(1);
}

console.log(chalk.green(`Your token is: ${config.token.substring(0,4)}...`));


if (process.env.NODE_ENV != 'test')
{
	(async () => {
		//await listAuthenicatedUserRepos();
		await listBranches(user, repo);
		//await createRepo(user, newrepo);
		//await createIssue(user, repo, issueName, issueBody);
		//await enableWikiSupport(user,repo);

	})()
}

function getDefaultOptions(endpoint, method)
{
	var options = {
		url: urlRoot + endpoint,
		method: method,
		headers: {
			"User-Agent": "CSC510-REST-WORKSHOP",
			"content-type": "application/json",
			"Authorization": `token ${config.token}`
		}
	};
	return options;
}

async function getUser()
{
	let options = getDefaultOptions("/user", "GET");

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function(resolve, reject)
	{
		axios(options)
			.then(function (response) {
				resolve(response.data.login);
		});
	});
}

function listAuthenicatedUserRepos()
{
	let options = getDefaultOptions("/user/repos?visibility=all", "GET");

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function(resolve, reject)
	{
		axios(options)
			.then(function (response) {
				var obj = response.data;
				for( var i = 0; i < obj.length; i++ )
				{
					var name = obj[i].name;
					console.log(name);
				}
				resolve( obj );
			})
			.catch(function (error) {
				console.log(chalk.red(error));
				reject(error);
				return; // Terminate execution.
		});
	});
};


// 1. Write code for listBranches in a given repo under an user. See list branches
async function listBranches(user, repo)
{
	let options = getDefaultOptions("repos/user/repo/branches?visibility=all", "GET");

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function(resolve, reject)
	{
		axios(options)
		  .then(function (response) {
			var obj = response;
			for( var i = 0; i < obj.length; i++ )
			{
				var name = obj[i].name;
				console.log(name);
			}
			resolve( obj );
		})
		.catch(function (error) {
			console.log(chalk.red(error));
			reject(error);
			return; // Terminate execution.
		});
	});
}

// 2. Write code to create a new repo
async function createRepo(user, newrepo)
{
	let options = getDefaultOptions(`user/repos`, "POST", {name: newrepo});

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function(resolve, reject)
	{
		axios(options, data: {
			user: 'user',
			name: 'newrepo'
		  })
		  .then(function (response) {
			if(response.statusCode == 201)
			{console.log(chalk.green("Success"));
		}		
			resolve(response.statusCode);
		})
		.catch(function (error) {
			console.log(chalk.red(error));
			reject(error);
			return; // Terminate execution.
		});	
	});
};
// 3. Write code for creating an issue for an existing repo.
async function createIssue(user, repo, issueName, issueBody)
{
	let options = getDefaultOptions(`repos/user/repo/issues?visibility=all`, "POST");

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function(resolve, reject)
	{
		axios(options)
		await user.request('POST /repos/user/repo/issues', {
			user: 'user',
			repo: 'repo',
			title: 'issueName',
			body: 'issueBody'
		  })
		  .then(function (response) {
			if(response.statusCode == 201)
			{console.log(chalk.green("Success"));
		}		
			resolve(response.statusCode);
		})
		.catch(function (error) {
			console.log(chalk.red(error));
			reject(error);
			return; // Terminate execution.
		});
	});
}

// 4. Write code for editing a repo to enable wiki support.
async function enableWikiSupport(user,repo)
{
	let options = getDefaultOptions(`repos/user/repo?visibility=all`, "PATCH");

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function(resolve, reject)
	{
		axios(options)
		await octokit.request('PATCH /repos/user/repo', {
			user: 'user',
			repo: 'repo',
			has_wiki: 'true'
		  })
		  .then(function (response) {
			var obj = response.data
			if(obj.has_wiki == true)
			{console.log(chalk.green("Success"));
		}		
			resolve(response.statusCode);
		})
		.catch(function (error) {
			console.log(chalk.red(error));
			reject(error);
			return; // Terminate execution.
		});
	});	
}

module.exports.getUser = getUser;
module.exports.listAuthenicatedUserRepos = listAuthenicatedUserRepos;
module.exports.listBranches = listBranches;
module.exports.createRepo = createRepo;
module.exports.createIssue = createIssue;
module.exports.enableWikiSupport = enableWikiSupport;


